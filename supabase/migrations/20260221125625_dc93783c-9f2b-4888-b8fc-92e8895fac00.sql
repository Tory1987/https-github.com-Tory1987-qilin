
-- Add crown_levels JSONB to user_progress (stores {"lesson-id": crown_level_number})
ALTER TABLE public.user_progress ADD COLUMN IF NOT EXISTS crown_levels jsonb NOT NULL DEFAULT '{}'::jsonb;

-- Create daily_quests table
CREATE TABLE public.daily_quests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  quest_date DATE NOT NULL DEFAULT CURRENT_DATE,
  quest_type TEXT NOT NULL, -- 'xp', 'lessons', 'perfect'
  quest_title TEXT NOT NULL,
  target INTEGER NOT NULL,
  progress INTEGER NOT NULL DEFAULT 0,
  completed BOOLEAN NOT NULL DEFAULT false,
  xp_reward INTEGER NOT NULL DEFAULT 10,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, quest_date, quest_type)
);

ALTER TABLE public.daily_quests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own daily quests" ON public.daily_quests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own daily quests" ON public.daily_quests FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own daily quests" ON public.daily_quests FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own daily quests" ON public.daily_quests FOR DELETE USING (auth.uid() = user_id);
