import { useState, useEffect, useCallback } from 'react';
import { DailyQuest } from '@/types/curriculum';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const DAILY_QUEST_TEMPLATES = [
  { quest_type: 'xp', quest_title: 'Kiếm {target} XP hôm nay', target: 30, xp_reward: 10 },
  { quest_type: 'lessons', quest_title: 'Hoàn thành {target} bài học', target: 2, xp_reward: 15 },
  { quest_type: 'perfect', quest_title: 'Đạt điểm tuyệt đối {target} lần', target: 1, xp_reward: 20 },
];

export function useDailyQuests() {
  const { user } = useAuth();
  const [quests, setQuests] = useState<DailyQuest[]>([]);
  const [loading, setLoading] = useState(true);

  const today = new Date().toISOString().split('T')[0];

  const fetchOrCreateQuests = useCallback(async () => {
    if (!user) return;
    setLoading(true);

    const { data } = await supabase
      .from('daily_quests')
      .select('*')
      .eq('user_id', user.id)
      .eq('quest_date', today);

    if (data && data.length > 0) {
      setQuests(data.map(q => ({
        id: q.id,
        questType: q.quest_type as DailyQuest['questType'],
        questTitle: q.quest_title,
        target: q.target,
        progress: q.progress,
        completed: q.completed,
        xpReward: q.xp_reward,
      })));
    } else {
      // Create today's quests
      const newQuests = DAILY_QUEST_TEMPLATES.map(t => ({
        user_id: user.id,
        quest_date: today,
        quest_type: t.quest_type,
        quest_title: t.quest_title.replace('{target}', String(t.target)),
        target: t.target,
        progress: 0,
        completed: false,
        xp_reward: t.xp_reward,
      }));

      const { data: inserted } = await supabase
        .from('daily_quests')
        .insert(newQuests)
        .select();

      if (inserted) {
        setQuests(inserted.map(q => ({
          id: q.id,
          questType: q.quest_type as DailyQuest['questType'],
          questTitle: q.quest_title,
          target: q.target,
          progress: q.progress,
          completed: q.completed,
          xpReward: q.xp_reward,
        })));
      }
    }
    setLoading(false);
  }, [user, today]);

  useEffect(() => {
    fetchOrCreateQuests();
  }, [fetchOrCreateQuests]);

  const updateQuestProgress = useCallback(async (questType: string, increment: number) => {
    if (!user) return;

    const quest = quests.find(q => q.questType === questType && !q.completed);
    if (!quest) return;

    const newProgress = Math.min(quest.progress + increment, quest.target);
    const completed = newProgress >= quest.target;

    await supabase
      .from('daily_quests')
      .update({ progress: newProgress, completed })
      .eq('id', quest.id);

    setQuests(prev => prev.map(q =>
      q.id === quest.id ? { ...q, progress: newProgress, completed } : q
    ));

    return completed ? quest.xpReward : 0;
  }, [user, quests]);

  return { quests, loading, updateQuestProgress, refetch: fetchOrCreateQuests };
}
