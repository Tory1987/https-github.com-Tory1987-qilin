import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Share, PlusSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const STORAGE_KEY = 'pwa-install-dismissed';

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const standalone = window.matchMedia('(display-mode: standalone)').matches
      || (navigator as any).standalone === true;
    setIsStandalone(standalone);

    if (standalone || localStorage.getItem(STORAGE_KEY)) return;

    const ua = navigator.userAgent;
    const ios = /iphone|ipad|ipod/i.test(ua);
    setIsIos(ios);

    if (ios) {
      // Show iOS guide after short delay
      const timer = setTimeout(() => setShowBanner(true), 2000);
      return () => clearTimeout(timer);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setTimeout(() => setShowBanner(true), 2000);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      dismiss();
    }
    setDeferredPrompt(null);
  };

  const dismiss = () => {
    setShowBanner(false);
    localStorage.setItem(STORAGE_KEY, 'true');
  };

  if (isStandalone || !showBanner) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md"
      >
        <div className="rounded-2xl bg-card border border-border p-4 shadow-xl">
          <div className="flex items-start gap-3">
            <img
              src="/pwa-icon-192.png"
              alt="Qilin"
              className="w-12 h-12 rounded-xl shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-foreground text-sm">Cài Qilin lên màn hình chính</h3>
                <button onClick={dismiss} className="text-muted-foreground hover:text-foreground -mt-1 -mr-1 p-1">
                  <X className="h-4 w-4" />
                </button>
              </div>

              {isIos ? (
                <div className="mt-1.5">
                  <p className="text-xs text-muted-foreground">
                    Bấm <Share className="inline h-3.5 w-3.5 text-primary -mt-0.5" /> rồi chọn{' '}
                    <span className="font-bold text-foreground">"Thêm vào MH chính"</span>{' '}
                    <PlusSquare className="inline h-3.5 w-3.5 text-primary -mt-0.5" />
                  </p>
                </div>
              ) : (
                <div className="mt-2">
                  <p className="text-xs text-muted-foreground mb-2">Truy cập nhanh hơn, trải nghiệm như app thật!</p>
                  <Button size="sm" className="h-8 text-xs font-bold rounded-xl" onClick={handleInstall}>
                    <Download className="h-3.5 w-3.5 mr-1" />
                    Cài đặt ngay
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
