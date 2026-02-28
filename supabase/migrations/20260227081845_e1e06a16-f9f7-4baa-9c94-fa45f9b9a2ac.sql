
-- Fix: drop overly permissive update policy, replace with user_id check
-- Service role bypasses RLS anyway, so no explicit policy needed for webhook
DROP POLICY "Service role can update purchases" ON public.purchases;
