
-- Add weekly XP tracking columns
ALTER TABLE public.user_progress 
ADD COLUMN weekly_xp INTEGER NOT NULL DEFAULT 0,
ADD COLUMN weekly_xp_reset_at DATE NOT NULL DEFAULT CURRENT_DATE;

-- Create a view for leaderboard (public read, no sensitive data)
CREATE OR REPLACE VIEW public.leaderboard_view
WITH (security_invoker = on) AS
SELECT 
  up.user_id,
  p.display_name,
  p.avatar_url,
  up.xp,
  up.level,
  up.streak,
  up.weekly_xp,
  up.weekly_xp_reset_at,
  array_length(up.completed_lessons, 1) as completed_lessons_count
FROM public.user_progress up
JOIN public.profiles p ON p.user_id = up.user_id;

-- Allow all authenticated users to read leaderboard view
CREATE POLICY "Authenticated users can read leaderboard"
  ON public.user_progress FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can read profiles for leaderboard"
  ON public.profiles FOR SELECT
  USING (auth.uid() IS NOT NULL);
