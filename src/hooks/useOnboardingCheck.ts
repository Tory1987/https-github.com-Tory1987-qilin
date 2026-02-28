import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export function useOnboardingCheck() {
  const { user } = useAuth();
  const [needsOnboarding, setNeedsOnboarding] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!user) {
      setChecking(false);
      return;
    }

    const check = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('onboarding_completed')
        .eq('user_id', user.id)
        .single();

      setNeedsOnboarding(!(data as any)?.onboarding_completed);
      setChecking(false);
    };

    check();
  }, [user]);

  return { needsOnboarding, checking };
}
