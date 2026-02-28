import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { UserProgress } from '@/types/curriculum';
import { defaultUserProgress, getLevel } from '@/data/curriculum';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface ProgressContextType {
  progress: UserProgress;
  loading: boolean;
  addXp: (amount: number) => void;
  completeLesson: (lessonId: string) => void;
  loseHeart: () => boolean;
  gainHeart: (amount?: number) => void;
  resetHearts: () => void;
  masterWord: (wordId: string) => void;
  setCrownLevel: (lessonId: string, level: number) => void;
  addBadge: (badgeId: string) => void;
}

const ProgressContext = createContext<ProgressContextType | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgress>(defaultUserProgress);
  const [loading, setLoading] = useState(true);
  const loadedFromDb = useRef(false);

  // Load from DB when user logs in
  useEffect(() => {
    if (!user) {
      setProgress(defaultUserProgress);
      setLoading(false);
      loadedFromDb.current = false;
      return;
    }

    const fetchProgress = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (data && !error) {
        setProgress({
          currentBook: data.current_book,
          currentLesson: data.current_lesson,
          xp: data.xp,
          level: data.level,
          streak: data.streak,
          hearts: data.hearts,
          maxHearts: data.max_hearts,
          completedLessons: data.completed_lessons || [],
          vocabularyMastered: data.vocabulary_mastered || [],
          badges: data.badges || [],
          lastStudyDate: data.last_study_date || undefined,
          crownLevels: (data as any).crown_levels || {},
          premiumUntil: (data as any).premium_until || undefined,
        });
        loadedFromDb.current = true;
      }
      setLoading(false);
    };

    fetchProgress();
  }, [user]);

  // Save to DB — only specific fields to prevent overwriting unrelated data
  const saveFieldsToDb = useCallback(async (fields: Record<string, any>) => {
    if (!user || !loadedFromDb.current) return;
    await supabase
      .from('user_progress')
      .update(fields as any)
      .eq('user_id', user.id);
  }, [user]);

  // Full save — guarded against saving before DB load
  const saveToDb = useCallback(async (p: UserProgress) => {
    if (!user || !loadedFromDb.current) return;
    await supabase
      .from('user_progress')
      .update({
        current_book: p.currentBook,
        current_lesson: p.currentLesson,
        xp: p.xp,
        level: p.level,
        streak: p.streak,
        hearts: p.hearts,
        max_hearts: p.maxHearts,
        completed_lessons: p.completedLessons,
        vocabulary_mastered: p.vocabularyMastered,
        badges: p.badges,
        last_study_date: p.lastStudyDate || new Date().toISOString().split('T')[0],
        crown_levels: p.crownLevels,
      } as any)
      .eq('user_id', user.id);
  }, [user]);

  const updateAndSave = useCallback((updater: (prev: UserProgress) => UserProgress) => {
    if (!loadedFromDb.current) return; // Never save before data is loaded
    setProgress(prev => {
      const next = updater(prev);
      if (next === prev) return prev; // No change, skip save
      saveToDb(next);
      return next;
    });
  }, [saveToDb]);

  // Helper to update daily quest progress
  const updateDailyQuest = useCallback(async (questType: string, increment: number) => {
    if (!user) return;
    const today = new Date().toISOString().split('T')[0];
    const { data } = await supabase
      .from('daily_quests')
      .select('*')
      .eq('user_id', user.id)
      .eq('quest_date', today)
      .eq('quest_type', questType)
      .eq('completed', false)
      .limit(1);

    if (data && data.length > 0) {
      const quest = data[0];
      const newProgress = Math.min(quest.progress + increment, quest.target);
      await supabase
        .from('daily_quests')
        .update({ progress: newProgress, completed: newProgress >= quest.target })
        .eq('id', quest.id);
    }
  }, [user]);

  const addXp = useCallback((amount: number) => {
    updateAndSave(prev => ({
      ...prev,
      xp: prev.xp + amount,
      level: getLevel(prev.xp + amount),
      lastStudyDate: new Date().toISOString().split('T')[0],
    }));
    // Also increment weekly XP
    if (user && loadedFromDb.current) {
      const today = new Date().toISOString().split('T')[0];
      supabase
        .from('user_progress')
        .select('weekly_xp, weekly_xp_reset_at')
        .eq('user_id', user.id)
        .single()
        .then(({ data }) => {
          if (!data) return;
          const resetAt = (data as any).weekly_xp_reset_at;
          const resetDate = new Date(resetAt);
          const now = new Date();
          // Reset if it's a new week (Monday)
          const daysSinceReset = Math.floor((now.getTime() - resetDate.getTime()) / (1000 * 60 * 60 * 24));
          const currentDay = now.getDay(); // 0=Sun
          const needsReset = daysSinceReset >= 7 || (daysSinceReset > 0 && currentDay === 1);
          
          if (needsReset) {
            saveFieldsToDb({ weekly_xp: amount, weekly_xp_reset_at: today } as any);
          } else {
            saveFieldsToDb({ weekly_xp: ((data as any).weekly_xp || 0) + amount } as any);
          }
        });
    }
    // Auto-update daily quest for XP
    updateDailyQuest('xp', amount);
  }, [updateAndSave, updateDailyQuest, user, saveFieldsToDb]);

  const completeLesson = useCallback((lessonId: string) => {
    updateAndSave(prev => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      return { ...prev, completedLessons: [...prev.completedLessons, lessonId] };
    });
    // Auto-update daily quest for lessons
    updateDailyQuest('lessons', 1);
  }, [updateAndSave, updateDailyQuest]);

  const loseHeart = useCallback(() => {
    if (!loadedFromDb.current) return true;
    // Premium users don't lose hearts
    if (progress.premiumUntil && new Date(progress.premiumUntil) > new Date()) return true;
    let hasHearts = true;
    setProgress(prev => {
      if (prev.hearts <= 0) { hasHearts = false; return prev; }
      hasHearts = prev.hearts - 1 > 0;
      const newHearts = prev.hearts - 1;
      saveFieldsToDb({ hearts: newHearts });
      return { ...prev, hearts: newHearts };
    });
    return hasHearts;
  }, [saveFieldsToDb, progress.premiumUntil]);

  const resetHearts = useCallback(async () => {
    if (!loadedFromDb.current) return;
    setProgress(prev => ({ ...prev, hearts: prev.maxHearts }));
    // Only update hearts column, never touch other fields
    saveFieldsToDb({ hearts: progress.maxHearts });
  }, [saveFieldsToDb, progress.maxHearts]);

  const gainHeart = useCallback((amount: number = 1) => {
    if (!loadedFromDb.current) return;
    setProgress(prev => {
      const newHearts = Math.min(prev.hearts + amount, prev.maxHearts);
      if (newHearts === prev.hearts) return prev;
      saveFieldsToDb({ hearts: newHearts });
      return { ...prev, hearts: newHearts };
    });
  }, [saveFieldsToDb]);

  const masterWord = useCallback((wordId: string) => {
    updateAndSave(prev => {
      if (prev.vocabularyMastered.includes(wordId)) return prev;
      return { ...prev, vocabularyMastered: [...prev.vocabularyMastered, wordId] };
    });
  }, [updateAndSave]);

  const setCrownLevel = useCallback((lessonId: string, level: number) => {
    updateAndSave(prev => {
      const current = prev.crownLevels[lessonId] || 0;
      if (level <= current) return prev;
      return { ...prev, crownLevels: { ...prev.crownLevels, [lessonId]: Math.min(level, 5) } };
    });
  }, [updateAndSave]);

  const addBadge = useCallback((badgeId: string) => {
    updateAndSave(prev => {
      if (prev.badges.includes(badgeId)) return prev;
      return { ...prev, badges: [...prev.badges, badgeId] };
    });
  }, [updateAndSave]);

  return (
    <ProgressContext.Provider value={{ progress, loading, addXp, completeLesson, loseHeart, gainHeart, resetHearts, masterWord, setCrownLevel, addBadge }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    // Fallback for HMR / edge cases where provider hasn't mounted yet
    return {
      progress: defaultUserProgress,
      loading: true,
      addXp: () => {},
      completeLesson: () => {},
      loseHeart: () => true,
      gainHeart: () => {},
      resetHearts: () => {},
      masterWord: () => {},
      setCrownLevel: () => {},
      addBadge: () => {},
    } as ProgressContextType;
  }
  return ctx;
}
