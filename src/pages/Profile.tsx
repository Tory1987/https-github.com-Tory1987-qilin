import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flame, Zap, Trophy, Heart, BookOpen, Star, LogOut, Camera, Shield, ShoppingBag } from 'lucide-react';
import { useProgress } from '@/contexts/ProgressContext';
import { useAuth } from '@/contexts/AuthContext';
import { curriculum } from '@/data/curriculum';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { getXpProgress, XP_PER_LEVEL } from '@/data/curriculum';
import QilinMood, { getQilinMood } from '@/components/QilinMood';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { playClickSound } from '@/lib/sfx';
import { takePhoto } from '@/hooks/useNative';
import { Capacitor } from '@capacitor/core';
import { useAchievements } from '@/hooks/useAchievements';
import { cn } from '@/lib/utils';
import { useAdminRole } from '@/hooks/useAdminRole';
import { Switch } from '@/components/ui/switch';
import { isQilinBotEnabled, setQilinBotEnabled } from '@/components/QiLinBot';
import { resetAllTours } from '@/data/tourSteps';
import { usePushNotifications } from '@/hooks/usePushNotifications';
import { scheduleStudyReminder, cancelStudyReminder } from '@/hooks/useNative';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { progress } = useProgress();
  const { user, signOut } = useAuth();
  const xpInLevel = getXpProgress(progress.xp);
  const totalLessons = curriculum.reduce((sum, b) => sum + b.lessons.length, 0);
  const { mood, message } = getQilinMood(progress);
  const { all: allAchievements } = useAchievements();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const { isAdmin } = useAdminRole();
  const [botEnabled, setBotEnabled] = useState(isQilinBotEnabled);
  const { isSupported: pushSupported, permission: pushPermission, isSubscribed: pushSubscribed, subscribe: pushSubscribe, unsubscribe: pushUnsubscribe, isIOS } = usePushNotifications();
  const [pushLoading, setPushLoading] = useState(false);
  const isNative = Capacitor.isNativePlatform();
  const [reminderEnabled, setReminderEnabled] = useState(() => localStorage.getItem('study-reminder-enabled') === 'true');
  const [reminderHour, setReminderHour] = useState(() => localStorage.getItem('study-reminder-hour') || '20');
  const [reminderMinute, setReminderMinute] = useState(() => localStorage.getItem('study-reminder-minute') || '0');

  // Load avatar from profile
  useEffect(() => {
    if (!user) return;
    supabase.from('profiles').select('avatar_url').eq('user_id', user.id).single()
      .then(({ data }) => {
        if (data?.avatar_url) setAvatarUrl(data.avatar_url);
      });
  }, [user]);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    await uploadAvatarFile(file);
  };

  const uploadAvatarFile = async (file: File | Blob, ext = 'jpg') => {
    if (file.size > 2 * 1024 * 1024) {
      toast({ title: 'Ảnh quá lớn', description: 'Vui lòng chọn ảnh dưới 2MB', variant: 'destructive' });
      return;
    }
    if (!user) return;
    setUploading(true);
    try {
      const fileExt = file instanceof File ? (file.name.split('.').pop() || ext) : ext;
      const path = `${user.id}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(path, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(path);
      const urlWithCache = `${publicUrl}?t=${Date.now()}`;

      await supabase.from('profiles').update({ avatar_url: urlWithCache }).eq('user_id', user.id);
      setAvatarUrl(urlWithCache);
      toast({ title: '✅ Đã cập nhật ảnh đại diện!' });
    } catch (err: any) {
      toast({ title: 'Lỗi upload', description: err.message, variant: 'destructive' });
    } finally {
      setUploading(false);
    }
  };

  const handleAvatarClick = async () => {
    playClickSound();
    if (Capacitor.isNativePlatform()) {
      const dataUrl = await takePhoto();
      if (dataUrl) {
        // Convert data URL to blob
        const res = await fetch(dataUrl);
        const blob = await res.blob();
        await uploadAvatarFile(blob, 'jpg');
      }
    } else {
      fileInputRef.current?.click();
    }
  };

  const stats = [
    { icon: Zap, label: 'Tổng XP', value: progress.xp, color: 'text-xp' },
    { icon: Flame, label: 'Streak', value: `${progress.streak} ngày`, color: 'text-streak' },
    { icon: Trophy, label: 'Cấp độ', value: progress.level, color: 'text-secondary' },
    { icon: Heart, label: 'Tim', value: `${progress.hearts}/${progress.maxHearts}`, color: 'text-heart' },
    { icon: BookOpen, label: 'Bài hoàn thành', value: `${progress.completedLessons.length}/${totalLessons}`, color: 'text-primary' },
    { icon: Star, label: 'Từ đã thuộc', value: progress.vocabularyMastered.length, color: 'text-warning' },
  ];

  const initial = (user?.user_metadata?.display_name || user?.email || 'H')[0].toUpperCase();

  const handlePushToggle = async (checked: boolean) => {
    try {
      setPushLoading(true);
      if (checked) {
        // Bật thông báo
        localStorage.removeItem('push-prompt-dismissed');
        console.log('[Push] Starting subscribe, permission:', pushPermission, 'isIOS:', isIOS);
        const result = await pushSubscribe();
        console.log('[Push] Subscribe result:', result);
        if (result.success) {
          toast({ title: '✅ Đã bật thông báo nhắc học!' });
        } else if (result.error === 'permission_denied') {
          toast({
            title: '⚠️ Cần cấp quyền thông báo',
            description: isIOS
              ? 'Vào Cài đặt iPhone > Safari > Thông báo > Cho phép'
              : 'Cho phép thông báo trong cài đặt trình duyệt.',
            variant: 'destructive',
            duration: 6000,
          });
        } else {
          toast({ title: `❌ Lỗi: ${result.error}`, variant: 'destructive' });
        }
      } else {
        // Tắt thông báo
        console.log('[Push] Starting unsubscribe');
        const result = await pushUnsubscribe();
        console.log('[Push] Unsubscribe result:', result);
        if (result.success) {
          toast({ title: '🔕 Đã tắt thông báo nhắc học.' });
        } else {
          toast({ title: `❌ Lỗi: ${result.error}`, variant: 'destructive' });
        }
      }
    } catch (e: any) {
      console.error('[Push] Toggle error:', e);
      toast({ title: '❌ Lỗi kỹ thuật, thử lại sau.', variant: 'destructive' });
    } finally {
      setPushLoading(false);
    }
  };

  const getPushStatusText = () => {
    if (pushSubscribed) return 'Qilin sẽ nhắc bạn học mỗi ngày';
    if (pushPermission === 'denied') {
      return isIOS
        ? 'Quyền bị từ chối. Vào Cài đặt > Safari > Thông báo để bật lại'
        : 'Quyền bị từ chối. Bật lại trong cài đặt trình duyệt';
    }
    return 'Nhận nhắc học & thông báo quan trọng';
  };

  return (
    <div className="py-4 space-y-6">
      {/* Qilin Mascot with mood */}
      <QilinMood mood={mood} message={message} size="md" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <div className="relative mx-auto w-fit">
          <div
            className="h-20 w-20 rounded-full bg-primary/15 border-2 border-primary/30 flex items-center justify-center shadow-md overflow-hidden cursor-pointer"
            onClick={handleAvatarClick}
          >
            {avatarUrl ? (
              <img src={avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
            ) : (
              <span className="text-3xl font-extrabold text-primary">{initial}</span>
            )}
          </div>
          <button
            onClick={handleAvatarClick}
            className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md border-2 border-background"
            disabled={uploading}
          >
            <Camera className="h-3.5 w-3.5" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarUpload}
          />
        </div>
        {uploading && <p className="text-xs text-muted-foreground mt-1 animate-pulse">Đang tải lên...</p>}
        <h2 className="mt-3 text-xl font-extrabold">{user?.user_metadata?.display_name || 'Học viên'}</h2>
        <p className="text-sm text-muted-foreground">{user?.email}</p>
        <p className="text-xs text-muted-foreground">Cấp {progress.level} · {progress.xp} XP</p>
        <Button variant="outline" className="mt-3 rounded-xl h-10 font-bold border-secondary/30 px-6" onClick={() => navigate('/shop')}>
          <ShoppingBag className="mr-2 h-4 w-4 text-secondary" /> Cửa hàng
        </Button>
      </motion.div>

      <div className="rounded-2xl bg-card p-4 border border-border shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold">Cấp {progress.level} → {progress.level + 1}</span>
          <span className="text-xs text-muted-foreground">{xpInLevel}/{XP_PER_LEVEL} XP</span>
        </div>
        <Progress value={(xpInLevel / XP_PER_LEVEL) * 100} className="h-3" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl bg-card p-4 border border-border shadow-sm"
          >
            <stat.icon className={`h-6 w-6 ${stat.color}`} />
            <p className={`mt-2 text-xl font-extrabold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-muted-foreground font-semibold">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Achievements */}
      <div className="space-y-3">
        <h3 data-tour="achievements" className="text-lg font-extrabold flex items-center gap-2">🏅 Huy hiệu ({progress.badges.length}/{allAchievements.length})</h3>
        <div className="grid grid-cols-2 gap-3">
          {allAchievements.map((a, i) => {
            const earned = progress.badges.includes(a.id);
            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className={cn(
                  'rounded-2xl p-3 border shadow-sm text-center',
                  earned ? 'bg-card border-secondary/30' : 'bg-muted/30 border-border opacity-50'
                )}
              >
                <span className={cn("text-2xl", !earned && "grayscale")}>{a.icon}</span>
                <p className="text-xs font-extrabold mt-1">{a.name}</p>
                <p className="text-[10px] text-muted-foreground">{a.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Push Notification Toggle */}
      {pushSupported && (
        <div className="rounded-2xl bg-card p-4 border border-border shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold">🔔 Thông báo nhắc học</p>
              <p className="text-xs text-muted-foreground">
                {getPushStatusText()}
              </p>
            </div>
            <Switch
              checked={pushSubscribed}
              disabled={pushLoading}
              onCheckedChange={handlePushToggle}
            />
          </div>
          {pushPermission === 'denied' && !pushSubscribed && (
            <p className="text-xs text-muted-foreground bg-muted/50 rounded-xl p-2">
              {isIOS
                ? '📱 Để bật lại: Vào Cài đặt → Safari → Thông báo → Cho phép'
                : '🔧 Để bật lại: Vào cài đặt trình duyệt → Thông báo → Cho phép'}
            </p>
          )}
        </div>
      )}

      {/* Native Local Notification Reminder */}
      {isNative && (
        <div className="rounded-2xl bg-card p-4 border border-border shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold">⏰ Nhắc học hàng ngày</p>
              <p className="text-xs text-muted-foreground">
                {reminderEnabled ? `Nhắc lúc ${reminderHour.padStart(2, '0')}:${reminderMinute.padStart(2, '0')} mỗi ngày` : 'Đặt giờ nhắc học offline'}
              </p>
            </div>
            <Switch
              checked={reminderEnabled}
              onCheckedChange={async (checked) => {
                setReminderEnabled(checked);
                localStorage.setItem('study-reminder-enabled', String(checked));
                if (checked) {
                  const ok = await scheduleStudyReminder(Number(reminderHour), Number(reminderMinute));
                  toast({ title: ok ? '✅ Đã bật nhắc học!' : '❌ Không thể bật nhắc học', variant: ok ? 'default' : 'destructive' });
                } else {
                  await cancelStudyReminder();
                  toast({ title: '🔕 Đã tắt nhắc học.' });
                }
              }}
            />
          </div>
          {reminderEnabled && (
            <div className="flex items-center gap-2">
              <Select value={reminderHour} onValueChange={async (v) => {
                setReminderHour(v);
                localStorage.setItem('study-reminder-hour', v);
                await scheduleStudyReminder(Number(v), Number(reminderMinute));
              }}>
                <SelectTrigger className="w-20 h-9 rounded-xl text-sm font-bold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 24 }, (_, i) => (
                    <SelectItem key={i} value={String(i)}>{String(i).padStart(2, '0')}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="text-lg font-bold text-muted-foreground">:</span>
              <Select value={reminderMinute} onValueChange={async (v) => {
                setReminderMinute(v);
                localStorage.setItem('study-reminder-minute', v);
                await scheduleStudyReminder(Number(reminderHour), Number(v));
              }}>
                <SelectTrigger className="w-20 h-9 rounded-xl text-sm font-bold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[0, 15, 30, 45].map((m) => (
                    <SelectItem key={m} value={String(m)}>{String(m).padStart(2, '0')}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      )}

      {isAdmin && (
        <Button variant="outline" className="w-full rounded-xl h-12 font-bold border-primary/30" onClick={() => navigate('/admin')}>
          <Shield className="mr-2 h-5 w-5 text-primary" /> Quản lý người dùng
        </Button>
      )}

      {/* Guided Tour Toggle */}
      <div className="rounded-2xl bg-card p-4 border border-border shadow-sm flex items-center justify-between">
        <div>
          <p className="text-sm font-bold">🦄 Hướng dẫn sử dụng</p>
          <p className="text-xs text-muted-foreground">Tour hướng dẫn khi vào trang mới</p>
        </div>
        <Switch
          checked={botEnabled}
          onCheckedChange={(checked) => {
            setBotEnabled(checked);
            setQilinBotEnabled(checked);
            window.dispatchEvent(new Event('qilin-bot-toggle'));
          }}
        />
      </div>
      <Button
        variant="ghost"
        className="w-full rounded-xl h-10 text-xs text-muted-foreground"
        onClick={() => {
          resetAllTours();
          toast({ title: '✅ Đã reset hướng dẫn! Vào lại các trang để xem lại.' });
        }}
      >
        🔄 Xem lại hướng dẫn tất cả trang
      </Button>

      <Button variant="outline" className="w-full rounded-xl h-12 font-bold" onClick={signOut}>
        <LogOut className="mr-2 h-5 w-5" /> Đăng xuất
      </Button>
    </div>
  );
}
