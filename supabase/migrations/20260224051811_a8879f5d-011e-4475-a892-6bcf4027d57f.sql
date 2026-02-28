-- Create a function to regenerate hearts (+1 per call, capped at max_hearts)
CREATE OR REPLACE FUNCTION public.regen_hearts()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  UPDATE public.user_progress
  SET hearts = LEAST(hearts + 1, max_hearts)
  WHERE hearts < max_hearts;
$$;

-- Enable pg_cron and pg_net extensions
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;