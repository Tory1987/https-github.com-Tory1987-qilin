import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { VocabularyWord } from '@/types/curriculum';

export interface ReviewCard {
  id: string;
  word_id: string;
  word_traditional: string;
  word_pinyin: string;
  word_meaning: string;
  word_example: string | null;
  word_example_meaning: string | null;
  ease_factor: number;
  interval_days: number;
  repetitions: number;
  next_review_date: string;
}

// SM-2 quality ratings
export type Quality = 0 | 1 | 2 | 3 | 4 | 5;
// 0 = complete blackout
// 1 = incorrect, remembered upon seeing answer
// 2 = incorrect, but answer seemed easy to recall
// 3 = correct with serious difficulty
// 4 = correct with some hesitation
// 5 = perfect recall

function sm2(
  quality: Quality,
  repetitions: number,
  easeFactor: number,
  intervalDays: number
): { repetitions: number; easeFactor: number; intervalDays: number } {
  let newEF = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (newEF < 1.3) newEF = 1.3;

  if (quality < 3) {
    return { repetitions: 0, easeFactor: newEF, intervalDays: 1 };
  }

  let newInterval: number;
  if (repetitions === 0) {
    newInterval = 1;
  } else if (repetitions === 1) {
    newInterval = 6;
  } else {
    newInterval = Math.round(intervalDays * newEF);
  }

  return {
    repetitions: repetitions + 1,
    easeFactor: newEF,
    intervalDays: newInterval,
  };
}

function addDays(date: Date, days: number): string {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

export function useSpacedRepetition() {
  const { user } = useAuth();
  const [dueCards, setDueCards] = useState<ReviewCard[]>([]);
  const [allCards, setAllCards] = useState<ReviewCard[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCards = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const today = new Date().toISOString().split('T')[0];

    const { data: due } = await supabase
      .from('vocabulary_reviews')
      .select('*')
      .eq('user_id', user.id)
      .lte('next_review_date', today)
      .order('next_review_date', { ascending: true });

    const { data: all } = await supabase
      .from('vocabulary_reviews')
      .select('*')
      .eq('user_id', user.id)
      .order('next_review_date', { ascending: true });

    setDueCards((due as ReviewCard[]) || []);
    setAllCards((all as ReviewCard[]) || []);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  const addWordsToReview = useCallback(
    async (words: VocabularyWord[], lessonId: string) => {
      if (!user) return;

      const rows = words.map((w) => ({
        user_id: user.id,
        word_id: `${lessonId}-${w.id}`,
        word_traditional: w.traditional,
        word_pinyin: w.pinyin,
        word_meaning: w.meaning,
        word_example: w.exampleSentence || null,
        word_example_meaning: w.exampleMeaning || null,
      }));

      await supabase
        .from('vocabulary_reviews')
        .upsert(rows, { onConflict: 'user_id,word_id', ignoreDuplicates: true });

      await fetchCards();
    },
    [user, fetchCards]
  );

  const reviewCard = useCallback(
    async (cardId: string, quality: Quality) => {
      const card = dueCards.find((c) => c.id === cardId);
      if (!card || !user) return;

      const result = sm2(quality, card.repetitions, card.ease_factor, card.interval_days);
      const nextDate = addDays(new Date(), result.intervalDays);

      await supabase
        .from('vocabulary_reviews')
        .update({
          ease_factor: result.easeFactor,
          interval_days: result.intervalDays,
          repetitions: result.repetitions,
          next_review_date: nextDate,
          last_reviewed_at: new Date().toISOString(),
        })
        .eq('id', cardId);

      setDueCards((prev) => prev.filter((c) => c.id !== cardId));
    },
    [dueCards, user]
  );

  return {
    dueCards,
    allCards,
    loading,
    addWordsToReview,
    reviewCard,
    refreshCards: fetchCards,
    dueCount: dueCards.length,
    totalCount: allCards.length,
  };
}
