import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Capacitor } from '@capacitor/core';

// Use a safe version that won't throw during HMR
function useSafeUser() {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);
  return user;
}

export type SubscribeResult = { success: boolean; error?: string };

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

async function saveTokenToBackend(token: string, platform: string, accessToken: string | undefined) {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  const res = await fetch(
    `${supabaseUrl}/functions/v1/heart-regen?action=subscribe-native`,
    {
      method: 'POST',
      headers: {
        'apikey': anonKey,
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, platform }),
    }
  );

  if (!res.ok) {
    console.error('Failed to save native push token:', res.status, await res.text());
    return false;
  }
  return true;
}

function isIOS(): boolean {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

export function usePushNotifications() {
  const user = useSafeUser();
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const isNative = Capacitor.isNativePlatform();

  // Refresh permission state (useful when user returns from Settings)
  const refreshStatus = useCallback(() => {
    if (isNative) return;
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, [isNative]);

  useEffect(() => {
    if (isNative) {
      setIsSupported(true);
      return;
    }
    const supported = 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
    setIsSupported(supported);
    if (supported) {
      setPermission(Notification.permission);
    }
  }, [isNative]);

  // Refresh permission when app becomes visible (user may have changed Settings)
  useEffect(() => {
    if (isNative) return;
    const handler = () => {
      if (document.visibilityState === 'visible') {
        refreshStatus();
      }
    };
    document.addEventListener('visibilitychange', handler);
    return () => document.removeEventListener('visibilitychange', handler);
  }, [isNative, refreshStatus]);

  // Check existing web subscription
  useEffect(() => {
    if (isNative || !isSupported || !user) return;
    navigator.serviceWorker.ready.then((reg: any) => {
      reg.pushManager?.getSubscription().then((sub: any) => {
        setIsSubscribed(!!sub);
      });
    });
  }, [isNative, isSupported, user]);

  // Native Capacitor push setup
  useEffect(() => {
    if (!isNative || !user) return;

    let cleanup: (() => void) | undefined;

    (async () => {
      const { PushNotifications } = await import('@capacitor/push-notifications');

      const permResult = await PushNotifications.checkPermissions();
      if (permResult.receive === 'granted') {
        setPermission('granted');
        setIsSubscribed(true);
      }

      const regListener = await PushNotifications.addListener('registration', async (token) => {
        console.log('Native push token:', token.value);
        const session = (await supabase.auth.getSession()).data.session;
        const platform = Capacitor.getPlatform();
        await saveTokenToBackend(token.value, platform, session?.access_token);
        setIsSubscribed(true);
      });

      const errListener = await PushNotifications.addListener('registrationError', (err) => {
        console.error('Native push registration error:', err);
      });

      cleanup = () => {
        regListener.remove();
        errListener.remove();
      };
    })();

    return () => cleanup?.();
  }, [isNative, user]);

  const subscribe = useCallback(async (): Promise<SubscribeResult> => {
    if (!isSupported) return { success: false, error: 'not_supported' };
    if (!user) return { success: false, error: 'not_authenticated' };

    // --- Native path ---
    if (isNative) {
      try {
        const { PushNotifications } = await import('@capacitor/push-notifications');
        const permResult = await PushNotifications.requestPermissions();
        if (permResult.receive !== 'granted') {
          setPermission('denied');
          return { success: false, error: 'permission_denied' };
        }
        setPermission('granted');
        await PushNotifications.register();
        return { success: true };
      } catch (e: any) {
        console.error('Native push subscribe failed:', e);
        return { success: false, error: `native_error: ${e.message}` };
      }
    }

    // --- Web Push path ---
    try {
      const perm = await Notification.requestPermission();
      setPermission(perm);
      if (perm !== 'granted') {
        return { success: false, error: 'permission_denied' };
      }

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

      const vapidRes = await fetch(
        `${supabaseUrl}/functions/v1/heart-regen?action=get-vapid-key`,
        { headers: { 'apikey': anonKey, 'Content-Type': 'application/json' } }
      );
      
      if (!vapidRes.ok) {
        const txt = await vapidRes.text();
        console.error('Failed to get VAPID key:', vapidRes.status, txt);
        return { success: false, error: `vapid_error: ${vapidRes.status}` };
      }
      
      const { publicKey } = await vapidRes.json();
      if (!publicKey) return { success: false, error: 'no_vapid_key' };

      const reg: any = await navigator.serviceWorker.ready;
      const subscription = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      });

      const session = (await supabase.auth.getSession()).data.session;
      const subRes = await fetch(
        `${supabaseUrl}/functions/v1/heart-regen?action=subscribe`,
        {
          method: 'POST',
          headers: {
            'apikey': anonKey,
            'Authorization': `Bearer ${session?.access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ subscription: subscription.toJSON() }),
        }
      );

      if (!subRes.ok) {
        const txt = await subRes.text();
        console.error('Failed to subscribe:', subRes.status, txt);
        return { success: false, error: `subscribe_error: ${subRes.status}` };
      }

      setIsSubscribed(true);
      return { success: true };
    } catch (e: any) {
      console.error('Push subscription failed:', e);
      return { success: false, error: `exception: ${e.message}` };
    }
  }, [isSupported, isNative, user]);

  const unsubscribe = useCallback(async (): Promise<SubscribeResult> => {
    if (!user) return { success: false, error: 'not_authenticated' };

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
      const session = (await supabase.auth.getSession()).data.session;

      // Unsubscribe from browser push if web
      if (!isNative && 'serviceWorker' in navigator) {
        try {
          const reg = await navigator.serviceWorker.ready;
          const sub = await (reg as any).pushManager?.getSubscription();
          if (sub) {
            await sub.unsubscribe();
          }
        } catch (e) {
          console.warn('Failed to unsubscribe from browser push:', e);
        }
      }

      // Native: unregister from Capacitor
      if (isNative) {
        try {
          const { PushNotifications } = await import('@capacitor/push-notifications');
          await PushNotifications.unregister();
        } catch (e) {
          console.warn('Failed to unregister native push:', e);
        }
      }

      // Remove all subscriptions from backend
      const res = await fetch(
        `${supabaseUrl}/functions/v1/heart-regen?action=unsubscribe-all`,
        {
          method: 'POST',
          headers: {
            'apikey': anonKey,
            'Authorization': `Bearer ${session?.access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!res.ok) {
        const txt = await res.text();
        console.error('Failed to unsubscribe:', res.status, txt);
        return { success: false, error: `unsubscribe_error: ${res.status}` };
      }

      setIsSubscribed(false);
      return { success: true };
    } catch (e: any) {
      console.error('Push unsubscribe failed:', e);
      return { success: false, error: `exception: ${e.message}` };
    }
  }, [user, isNative]);

  return { isSupported, permission, isSubscribed, subscribe, unsubscribe, isIOS: isIOS() };
}
