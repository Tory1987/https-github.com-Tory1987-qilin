
-- Create purchases table
CREATE TABLE public.purchases (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  type text NOT NULL,
  amount integer NOT NULL,
  hearts_qty integer,
  status text NOT NULL DEFAULT 'pending',
  order_code text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz
);

-- Add premium_until to user_progress
ALTER TABLE public.user_progress ADD COLUMN premium_until timestamptz;

-- Enable RLS
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users can view own purchases"
  ON public.purchases FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own purchases"
  ON public.purchases FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Service role can update (for webhook)
CREATE POLICY "Service role can update purchases"
  ON public.purchases FOR UPDATE
  USING (true);
