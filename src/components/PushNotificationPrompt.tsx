import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePushNotifications } from '@/hooks/usePushNotifications';
import { toast } from '@/hooks/use-toast';

const STORAGE_KEY = 'push-prompt-dismissed';

export default function PushNotificationPrompt() {
  const { isSupported, permission, isSubscribed, subscribe, isIOS } = usePushNotifications();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isSupported || isSubscribed || permission === 'denied') return;
    if (localStorage.getItem(STORAGE_KEY)) return;

    const timer = setTimeout(() => setShow(true), 3000);
    return () => clearTimeout(timer);
  }, [isSupported, isSubscribed, permission]);

  const handleEnable = async () => {
    setLoading(true);
    const result = await subscribe();
    setLoading(false);

    if (result.success) {
      setShow(false);
      toast({ title: '✅ Đã bật thông báo nhắc học!' });
      return;
    }

    // Handle errors with specific guidance
    if (result.error === 'permission_denied') {
      if (isIOS) {
        toast({
          title: '⚠️ Cần cấp quyền thông báo',
          description: 'Vào Cài đặt iPhone > Safari > Thông báo > Cho phép để bật thông báo cho ứng dụng này.',
          variant: 'destructive',
          duration: 8000,
        });
      } else {
        toast({
          title: '⚠️ Quyền thông báo bị từ chối',
          description: 'Vui lòng cho phép thông báo trong cài đặt trình duyệt rồi thử lại.',
          variant: 'destructive',
          duration: 6000,
        });
      }
    } else {
      toast({
        title: '❌ Không thể bật thông báo',
        description: 'Đã xảy ra lỗi kỹ thuật. Vui lòng thử lại sau.',
        variant: 'destructive',
      });
    }
  };

  const dismiss = () => {
    setShow(false);
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
  };

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -80, opacity: 0 }}
        className="fixed top-2 left-4 right-4 z-50 mx-auto max-w-md"
      >
        <div className="rounded-2xl bg-card border border-border p-4 shadow-xl">
          <div className="flex items-start gap-3">
            <div className="bg-primary/10 rounded-xl p-2 shrink-0">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-foreground text-sm">Bật thông báo nhắc học</h3>
                <button onClick={dismiss} className="text-muted-foreground hover:text-foreground -mt-1 -mr-1 p-1">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Qilin sẽ nhắc bạn học mỗi ngày để duy trì streak! 🔥
              </p>
              <div className="mt-2 flex gap-2">
                <Button
                  size="sm"
                  className="h-8 text-xs font-bold rounded-xl"
                  onClick={handleEnable}
                  disabled={loading}
                >
                  {loading ? 'Đang bật...' : 'Bật ngay'}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 text-xs rounded-xl"
                  onClick={dismiss}
                >
                  Để sau
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
