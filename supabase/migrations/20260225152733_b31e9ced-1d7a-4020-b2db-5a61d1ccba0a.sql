
-- Add onboarding columns to profiles
ALTER TABLE public.profiles
ADD COLUMN onboarding_completed boolean NOT NULL DEFAULT false,
ADD COLUMN chinese_level text,
ADD COLUMN daily_goal_minutes integer NOT NULL DEFAULT 10;
