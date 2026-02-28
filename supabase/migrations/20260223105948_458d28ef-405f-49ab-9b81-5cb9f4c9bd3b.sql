
-- Duel stats per user (ELO, win/loss, streaks)
CREATE TABLE public.duel_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  wins integer NOT NULL DEFAULT 0,
  losses integer NOT NULL DEFAULT 0,
  draws integer NOT NULL DEFAULT 0,
  win_streak integer NOT NULL DEFAULT 0,
  best_streak integer NOT NULL DEFAULT 0,
  rating integer NOT NULL DEFAULT 1000,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.duel_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone authenticated can read duel stats"
  ON public.duel_stats FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can insert own duel stats"
  ON public.duel_stats FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own duel stats"
  ON public.duel_stats FOR UPDATE
  USING (auth.uid() = user_id);

CREATE TRIGGER update_duel_stats_updated_at
  BEFORE UPDATE ON public.duel_stats
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Duels table
CREATE TYPE public.duel_status AS ENUM ('pending', 'active', 'completed', 'declined', 'expired');
CREATE TYPE public.duel_mode AS ENUM ('realtime', 'turnbased');

CREATE TABLE public.duels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  challenger_id uuid NOT NULL,
  opponent_id uuid,
  status public.duel_status NOT NULL DEFAULT 'pending',
  mode public.duel_mode NOT NULL DEFAULT 'turnbased',
  room_code text UNIQUE,
  exercises jsonb NOT NULL DEFAULT '[]'::jsonb,
  challenger_score integer NOT NULL DEFAULT 0,
  opponent_score integer NOT NULL DEFAULT 0,
  challenger_time_ms integer NOT NULL DEFAULT 0,
  opponent_time_ms integer NOT NULL DEFAULT 0,
  winner_id uuid,
  xp_reward integer NOT NULL DEFAULT 20,
  total_questions integer NOT NULL DEFAULT 5,
  created_at timestamptz NOT NULL DEFAULT now(),
  started_at timestamptz,
  completed_at timestamptz
);

ALTER TABLE public.duels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own duels"
  ON public.duels FOR SELECT
  USING (auth.uid() = challenger_id OR auth.uid() = opponent_id);

CREATE POLICY "Authenticated users can view pending duels for matchmaking"
  ON public.duels FOR SELECT
  USING (auth.uid() IS NOT NULL AND status = 'pending' AND opponent_id IS NULL);

CREATE POLICY "Users can create duels"
  ON public.duels FOR INSERT
  WITH CHECK (auth.uid() = challenger_id);

CREATE POLICY "Participants can update duels"
  ON public.duels FOR UPDATE
  USING (auth.uid() = challenger_id OR auth.uid() = opponent_id);

-- Enable realtime for duels
ALTER PUBLICATION supabase_realtime ADD TABLE public.duels;

-- Duel answers table
CREATE TABLE public.duel_answers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  duel_id uuid NOT NULL REFERENCES public.duels(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  exercise_index integer NOT NULL,
  answer jsonb NOT NULL,
  is_correct boolean NOT NULL DEFAULT false,
  time_ms integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.duel_answers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Duel participants can view answers"
  ON public.duel_answers FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.duels
      WHERE id = duel_id
      AND (challenger_id = auth.uid() OR opponent_id = auth.uid())
    )
  );

CREATE POLICY "Users can insert own answers"
  ON public.duel_answers FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Enable realtime for duel_answers
ALTER PUBLICATION supabase_realtime ADD TABLE public.duel_answers;

-- Auto-create duel_stats for new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email));
  
  INSERT INTO public.user_progress (user_id)
  VALUES (NEW.id);

  INSERT INTO public.duel_stats (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$;

-- Create duel_stats view for PvP leaderboard
CREATE OR REPLACE VIEW public.duel_leaderboard_view AS
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
