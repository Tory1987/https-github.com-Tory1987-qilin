import { useEffect, useState, useRef, useCallback } from 'react';
import { registerSW } from 'virtual:pwa-register';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

const UPDATE_CHECK_INTERVAL = 30 * 1000; // Check every 30 seconds

export default function UpdateNotification() {
  const [needRefresh, setNeedRefresh] = useState(false);
  const updateSWRef = useRef<(reloadPage?: boolean) => Promise<void>>();
  const registeredRef = useRef(false);

  const doUpdate = useCallback(() => {
    updateSWRef.current?.(true);
  }, []);

  useEffect(() => {
    if (registeredRef.current) return;
    registeredRef.current = true;

    const sw = registerSW({
      onNeedRefresh() {
        console.log('[PWA] New version available');
        setNeedRefresh(true);
      },
      onRegistered(registration) {
        console.log('[PWA] Service Worker registered');
        if (!registration) return;

        // Check immediately on first load
        registration.update().catch(() => {});

        // Periodic check for new SW
        setInterval(async () => {
          if (registration.installing) return;
          if ('connection' in navigator && !(navigator as any).onLine) return;
          try {
            await registration.update();
          } catch {
            // Network error, skip this cycle
          }
        }, UPDATE_CHECK_INTERVAL);
      },
      onOfflineReady() {
        console.log('[PWA] App ready for offline use');
      },
    });
    updateSWRef.current = sw;
  }, []);

  // Also check for waiting SW on page visibility change (user returns to tab/app)
  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible' && navigator.serviceWorker?.controller) {
        navigator.serviceWorker.getRegistration().then((reg) => {
          if (reg?.waiting) {
            console.log('[PWA] Found waiting SW on visibility change');
            setNeedRefresh(true);
          } else {
            reg?.update().catch(() => {});
          }
        });
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, []);

  // Auto-reload after 4 seconds when update detected
  useEffect(() => {
    if (needRefresh) {
      const timer = setTimeout(doUpdate, 4000);
      return () => clearTimeout(timer);
    }
  }, [needRefresh, doUpdate]);

  return (
    <AnimatePresence>
      {needRefresh && (
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-center gap-3 bg-primary px-4 py-3 text-primary-foreground text-sm font-medium shadow-lg"
        >
          <RefreshCw className="h-4 w-4 animate-spin" />
          <span>Phiên bản mới! Đang cập nhật...</span>
          <button
            onClick={doUpdate}
            className="ml-2 rounded-md bg-primary-foreground/20 px-3 py-1 text-xs font-semibold hover:bg-primary-foreground/30 transition-colors"
          >
            Cập nhật ngay
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}