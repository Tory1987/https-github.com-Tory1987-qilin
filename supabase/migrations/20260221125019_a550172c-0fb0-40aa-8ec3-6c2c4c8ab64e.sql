
-- Create table for storing wrong exercise answers for SRS review
CREATE TABLE public.exercise_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  exercise_id TEXT NOT NULL,
  lesson_id TEXT NOT NULL,
  question TEXT NOT NULL,
  exercise_type TEXT NOT NULL,
  options JSONB,
  correct_answer JSONB NOT NULL,
  explanation TEXT,
  ease_factor REAL NOT NULL DEFAULT 2.5,
  interval_days INTEGER NOT NULL DEFAULT 0,
  repetitions INTEGER NOT NULL DEFAULT 0,
  next_review_date DATE NOT NULL DEFAULT CURRENT_DATE,
  last_reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, exercise_id)
);

ALTER TABLE public.exercise_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own exercise reviews"
ON public.exercise_reviews FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own exercise reviews"
ON public.exercise_reviews FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own exercise reviews"
ON public.exercise_reviews FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own exercise reviews"
ON public.exercise_reviews FOR DELETE
USING (auth.uid() = user_id);

CREATE TRIGGER update_exercise_reviews_updated_at
BEFORE UPDATE ON public.exercise_reviews
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
