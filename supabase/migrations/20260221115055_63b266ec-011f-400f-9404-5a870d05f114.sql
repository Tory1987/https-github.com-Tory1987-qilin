
-- Table to track individual vocabulary word review schedules (SM-2 algorithm)
CREATE TABLE public.vocabulary_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  word_id TEXT NOT NULL, -- e.g. "b1-l1-你"
  word_traditional TEXT NOT NULL,
  word_pinyin TEXT NOT NULL,
  word_meaning TEXT NOT NULL,
  word_example TEXT,
  word_example_meaning TEXT,
  ease_factor REAL NOT NULL DEFAULT 2.5,
  interval_days INTEGER NOT NULL DEFAULT 0,
  repetitions INTEGER NOT NULL DEFAULT 0,
  next_review_date DATE NOT NULL DEFAULT CURRENT_DATE,
  last_reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, word_id)
);

ALTER TABLE public.vocabulary_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own reviews"
ON public.vocabulary_reviews FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own reviews"
ON public.vocabulary_reviews FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews"
ON public.vocabulary_reviews FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own reviews"
ON public.vocabulary_reviews FOR DELETE
USING (auth.uid() = user_id);

CREATE TRIGGER update_vocabulary_reviews_updated_at
BEFORE UPDATE ON public.vocabulary_reviews
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
