import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { curriculum } from '@/data/curriculum';
import { Exercise } from '@/types/curriculum';

export interface Duel {
  id: string;
  challenger_id: string;
  opponent_id: string | null;
  status: string;
  mode: string;
  room_code: string | null;
  exercises: any;
  challenger_score: number;
  opponent_score: number;
  challenger_time_ms: number;
  opponent_time_ms: number;
  winner_id: string | null;
  xp_reward: number;
  total_questions: number;
  created_at: string;
  started_at: string | null;
  completed_at: string | null;
}

export interface DuelWithProfiles extends Duel {
  challenger_name?: string;
  opponent_name?: string;
  challenger_avatar?: string;
  opponent_avatar?: string;
}

function generateRoomCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

function getRandomExercises(count: number = 5): Exercise[] {
  const allExercises: Exercise[] = [];
  // Only include types that work well in duel format
  const supportedTypes = ['multiple-choice', 'fill-blank', 'sentence-order'];
  for (const book of curriculum) {
    for (const lesson of book.lessons) {
      for (const section of lesson.sections) {
        if (section.exercises) {
          allExercises.push(...section.exercises.filter(e => supportedTypes.includes(e.type)));
        }
      }
    }
  }
  // Shuffle and pick
  const shuffled = allExercises.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

const DAILY_DUEL_LIMIT = 3;

export function useDuel(duelId?: string) {
  const { user } = useAuth();
  const [duel, setDuel] = useState<DuelWithProfiles | null>(null);
  const [loading, setLoading] = useState(false);
  const [myDuels, setMyDuels] = useState<Duel[]>([]);
  const [duelsToday, setDuelsToday] = useState(0);

  // Count today's duels
  const fetchDuelsToday = useCallback(async () => {
    if (!user) return 0;
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const { count } = await supabase
      .from('duels')
      .select('id', { count: 'exact', head: true })
      .or(`challenger_id.eq.${user.id},opponent_id.eq.${user.id}`)
      .gte('created_at', todayStart.toISOString());
    const c = count || 0;
    setDuelsToday(c);
    return c;
  }, [user]);

  const canDuelToday = useCallback(async () => {
    const count = await fetchDuelsToday();
    return count < DAILY_DUEL_LIMIT;
  }, [fetchDuelsToday]);

  // Fetch a single duel
  const fetchDuel = useCallback(async (id: string) => {
    const { data } = await supabase
      .from('duels')
      .select('*')
      .eq('id', id)
      .single();
    if (data) {
      const d = data as unknown as Duel;
      // Fetch profiles
      const ids = [d.challenger_id, d.opponent_id].filter(Boolean) as string[];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('user_id, display_name, avatar_url')
        .in('user_id', ids);
      const pMap = Object.fromEntries((profiles || []).map(p => [p.user_id, p]));
      setDuel({
        ...d,
        challenger_name: pMap[d.challenger_id]?.display_name || 'Người chơi',
        opponent_name: d.opponent_id ? pMap[d.opponent_id]?.display_name || 'Người chơi' : undefined,
        challenger_avatar: pMap[d.challenger_id]?.avatar_url || undefined,
        opponent_avatar: d.opponent_id ? pMap[d.opponent_id]?.avatar_url || undefined : undefined,
      });
    }
    return data as unknown as Duel | null;
  }, []);

  // Subscribe to duel changes
  useEffect(() => {
    if (!duelId) return;
    fetchDuel(duelId);
    
    const channel = supabase
      .channel(`duel-${duelId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'duels',
        filter: `id=eq.${duelId}`,
      }, () => {
        fetchDuel(duelId);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [duelId, fetchDuel]);

  // Create a new duel
  const createDuel = useCallback(async (mode: 'realtime' | 'turnbased', opponentId?: string) => {
    if (!user) return null;
    if (!(await canDuelToday())) return 'limit' as any;
    const exercises = getRandomExercises(5);
    const roomCode = generateRoomCode();
    
    const { data, error } = await supabase
      .from('duels')
      .insert({
        challenger_id: user.id,
        opponent_id: opponentId || null,
        mode,
        room_code: roomCode,
        exercises: exercises as any,
        status: 'pending',
        total_questions: exercises.length,
      } as any)
      .select()
      .single();

    if (error) { console.error('Create duel error:', error); return null; }
    return data as unknown as Duel;
  }, [user]);

  // Join a duel by room code
  const joinByCode = useCallback(async (code: string) => {
    if (!user) return null;
    if (!(await canDuelToday())) return 'limit' as any;
    const { data: found } = await supabase
      .from('duels')
      .select('*')
      .eq('room_code', code.toUpperCase())
      .eq('status', 'pending')
      .is('opponent_id', null)
      .single();

    if (!found) return null;
    const d = found as unknown as Duel;
    if (d.challenger_id === user.id) return null; // Can't join own duel

    const { data: updated } = await supabase
      .from('duels')
      .update({
        opponent_id: user.id,
        status: 'active',
        started_at: new Date().toISOString(),
      } as any)
      .eq('id', d.id)
      .eq('status', 'pending')
      .select()
      .single();

    if (!updated) return null; // someone else joined first
    return updated as unknown as Duel;
  }, [user]);

  // Join random pending duel or create one
  const findRandomMatch = useCallback(async (mode: 'realtime' | 'turnbased') => {
    if (!user) return null;
    if (!(await canDuelToday())) return 'limit' as any;
    
    // Look for existing pending duels
    const { data: pending } = await supabase
      .from('duels')
      .select('*')
      .eq('status', 'pending')
      .eq('mode', mode)
      .is('opponent_id', null)
      .neq('challenger_id', user.id)
      .limit(1);

    if (pending && pending.length > 0) {
      const d = pending[0] as unknown as Duel;
      const { data: updated } = await supabase
        .from('duels')
        .update({
          opponent_id: user.id,
          status: 'active',
          started_at: new Date().toISOString(),
        } as any)
        .eq('id', d.id)
        .eq('status', 'pending')
        .select()
        .single();

      // If someone else claimed it first, just create a new duel
      if (!updated || (updated as any).opponent_id !== user.id) {
        return createDuel(mode);
      }
      return updated as unknown as Duel;
    }

    // No match found, create new
    return createDuel(mode);
  }, [user, createDuel]);

  // Submit answer
  const submitAnswer = useCallback(async (duelId: string, exerciseIndex: number, answer: any, isCorrect: boolean, timeMs: number) => {
    if (!user) return;
    await supabase.from('duel_answers').insert({
      duel_id: duelId,
      user_id: user.id,
      exercise_index: exerciseIndex,
      answer,
      is_correct: isCorrect,
      time_ms: timeMs,
    } as any);

    // Update score on duel
    if (!duel) return;
    const isChallenger = duel.challenger_id === user.id;
    const scoreField = isChallenger ? 'challenger_score' : 'opponent_score';
    const timeField = isChallenger ? 'challenger_time_ms' : 'opponent_time_ms';
    
    if (isCorrect) {
      await supabase
        .from('duels')
        .update({
          [scoreField]: (isChallenger ? duel.challenger_score : duel.opponent_score) + 1,
          [timeField]: (isChallenger ? duel.challenger_time_ms : duel.opponent_time_ms) + timeMs,
        } as any)
        .eq('id', duelId);
    } else {
      await supabase
        .from('duels')
        .update({
          [timeField]: (isChallenger ? duel.challenger_time_ms : duel.opponent_time_ms) + timeMs,
        } as any)
        .eq('id', duelId);
    }
  }, [user, duel]);

  // Complete duel (determine winner)
  const completeDuel = useCallback(async (duelId: string) => {
    if (!user) return;
    const fresh = await fetchDuel(duelId);
    if (!fresh) return;

    const isChallenger = fresh.challenger_id === user.id;

    // For turnbased: if opponent hasn't played yet, just update own score/time and wait
    if (fresh.mode === 'turnbased' && fresh.opponent_id) {
      // Check if the other player has submitted answers
      const otherUserId = isChallenger ? fresh.opponent_id : fresh.challenger_id;
      const { data: otherAnswers } = await supabase
        .from('duel_answers')
        .select('id')
        .eq('duel_id', duelId)
        .eq('user_id', otherUserId)
        .limit(1);

      if (!otherAnswers || otherAnswers.length === 0) {
        // Other player hasn't played yet, don't complete
        return;
      }
    }

    // For turnbased without opponent: don't complete yet
    if (fresh.mode === 'turnbased' && !fresh.opponent_id) {
      return;
    }

    let winnerId: string | null = null;
    if (fresh.challenger_score > fresh.opponent_score) winnerId = fresh.challenger_id;
    else if (fresh.opponent_score > fresh.challenger_score) winnerId = fresh.opponent_id;
    else if (fresh.challenger_time_ms < fresh.opponent_time_ms) winnerId = fresh.challenger_id;
    else if (fresh.opponent_time_ms < fresh.challenger_time_ms) winnerId = fresh.opponent_id;

    await supabase
      .from('duels')
      .update({
        status: 'completed',
        winner_id: winnerId,
        completed_at: new Date().toISOString(),
      } as any)
      .eq('id', duelId);

    // Update duel stats for both players
    if (fresh.opponent_id) {
      await updateDuelStats(fresh.challenger_id, fresh.opponent_id, winnerId);
    }

    // Return winner info so caller can award heart
    return winnerId;
  }, [user, fetchDuel]);

  // Fetch my recent duels
  const fetchMyDuels = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data } = await supabase
      .from('duels')
      .select('*')
      .or(`challenger_id.eq.${user.id},opponent_id.eq.${user.id}`)
      .order('created_at', { ascending: false })
      .limit(20);
    setMyDuels((data || []) as unknown as Duel[]);
    setLoading(false);
  }, [user]);

  return {
    duel,
    loading,
    myDuels,
    duelsToday,
    duelsRemaining: Math.max(0, DAILY_DUEL_LIMIT - duelsToday),
    createDuel,
    joinByCode,
    findRandomMatch,
    submitAnswer,
    completeDuel,
    fetchDuel,
    fetchMyDuels,
    fetchDuelsToday,
  };
}

// ELO rating update
async function updateDuelStats(challengerId: string, opponentId: string, winnerId: string | null) {
  const { data: stats } = await supabase
    .from('duel_stats')
    .select('*')
    .in('user_id', [challengerId, opponentId]);

  const sMap = Object.fromEntries((stats || []).map((s: any) => [s.user_id, s]));
  
  // Ensure stats exist
  for (const uid of [challengerId, opponentId]) {
    if (!sMap[uid]) {
      await supabase.from('duel_stats').insert({ user_id: uid } as any);
      sMap[uid] = { wins: 0, losses: 0, draws: 0, win_streak: 0, best_streak: 0, rating: 1000 };
    }
  }

  const cStats = sMap[challengerId];
  const oStats = sMap[opponentId];

  // ELO calculation
  const K = 32;
  const expectedC = 1 / (1 + Math.pow(10, (oStats.rating - cStats.rating) / 400));
  const expectedO = 1 - expectedC;

  let scoreC: number, scoreO: number;
  if (winnerId === challengerId) {
    scoreC = 1; scoreO = 0;
  } else if (winnerId === opponentId) {
    scoreC = 0; scoreO = 1;
  } else {
    scoreC = 0.5; scoreO = 0.5;
  }

  const newRatingC = Math.round(cStats.rating + K * (scoreC - expectedC));
  const newRatingO = Math.round(oStats.rating + K * (scoreO - expectedO));

  // Update challenger
  const cUpdate: any = { rating: newRatingC };
  if (winnerId === challengerId) {
    cUpdate.wins = cStats.wins + 1;
    cUpdate.win_streak = cStats.win_streak + 1;
    cUpdate.best_streak = Math.max(cStats.best_streak, cStats.win_streak + 1);
  } else if (winnerId === opponentId) {
    cUpdate.losses = cStats.losses + 1;
    cUpdate.win_streak = 0;
  } else {
    cUpdate.draws = cStats.draws + 1;
    cUpdate.win_streak = 0;
  }
  await supabase.from('duel_stats').update(cUpdate).eq('user_id', challengerId);

  // Update opponent
  const oUpdate: any = { rating: newRatingO };
  if (winnerId === opponentId) {
    oUpdate.wins = oStats.wins + 1;
    oUpdate.win_streak = oStats.win_streak + 1;
    oUpdate.best_streak = Math.max(oStats.best_streak, oStats.win_streak + 1);
  } else if (winnerId === challengerId) {
    oUpdate.losses = oStats.losses + 1;
    oUpdate.win_streak = 0;
  } else {
    oUpdate.draws = oStats.draws + 1;
    oUpdate.win_streak = 0;
  }
  await supabase.from('duel_stats').update(oUpdate).eq('user_id', opponentId);
}
