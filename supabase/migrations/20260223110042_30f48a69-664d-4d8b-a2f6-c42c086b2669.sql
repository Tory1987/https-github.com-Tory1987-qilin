
-- Fix security definer view
DROP VIEW IF EXISTS public.duel_leaderboard_view;
CREATE VIEW public.duel_leaderboard_view
WITH (security_invoker = on) AS
SELECT
  ds.user_id,
  p.display_name,
  p.avatar_url,
  ds.wins,
  ds.losses,
  ds.draws,
  ds.win_streak,
  ds.best_streak,
  ds.rating
FROM public.duel_stats ds
JOIN public.profiles p ON p.user_id = ds.user_id
WHERE ds.wins + ds.losses + ds.draws > 0
ORDER BY ds.rating DESC;

-- Also fix the original leaderboard_view if it has same issue
DROP VIEW IF EXISTS public.leaderboard_view;
CREATE VIEW public.leaderboard_view
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
