
-- Drop the existing restrictive SELECT policies on duels
DROP POLICY IF EXISTS "Authenticated users can view pending duels for matchmaking" ON public.duels;
DROP POLICY IF EXISTS "Users can view own duels" ON public.duels;

-- Recreate as PERMISSIVE policies (default)
CREATE POLICY "Users can view own duels"
ON public.duels
FOR SELECT
USING (auth.uid() = challenger_id OR auth.uid() = opponent_id);

CREATE POLICY "Authenticated users can view pending duels for matchmaking"
ON public.duels
FOR SELECT
USING (auth.uid() IS NOT NULL AND status = 'pending' AND opponent_id IS NULL);
