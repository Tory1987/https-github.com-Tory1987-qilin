import { useState, useEffect, useRef } from 'react';
import { Flame, Heart, Home, Zap, X, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useProgress } from '@/contexts/ProgressContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { AnimatePresence, motion } from 'framer-motion';
import { playClickSound } from '@/lib/sfx';

type InfoType = 'streak' | 'xp' | 'hearts' | null;

interface InfoItem {
  title: string;
  emoji: string;
  lines: string[];
  action?: { label: string; icon: typeof ShoppingBag; route: string };
}

const infoContent: Record<Exclude<InfoType, null>, InfoItem> = {
  streak: {
    title: 'Chuỗi ngày học (Streak)',
    emoji: '🔥',
    lines: [
      'Streak tăng khi bạn học mỗi ngày liên tiếp.',
      'Nếu bỏ 1 ngày, streak sẽ bị reset về 0.',
      'Streak cao giúp bạn lên bảng xếp hạng!',
      'Premium bảo vệ streak — không sợ mất chuỗi!',
    ],
  },
  xp: {
    title: 'Điểm kinh nghiệm (XP)',
    emoji: '⚡',
    lines: [
      'Nhận XP khi hoàn thành bài học và bài tập.',
      'Combo trả lời đúng liên tiếp: x1.5 → x2 → x3 XP.',
      'Thắng Song Đấu cũng nhận thêm XP bonus.',
      'XP quyết định cấp độ (Level) của bạn.',
      'Bài tập mini cũng cho XP.',
    ],
  },
  hearts: {
    title: 'Tim (Hearts)',
    emoji: '❤️',
    lines: [
      'Trả lời sai trong bài tập: −1 tim.',
      'Hết tim → không thể học tiếp.',
      '⚔️ Thắng Song Đấu: +1 tim.',
      '⏳ Tự hồi phục +1 tim mỗi 60 phút.',
      '🛒 Mua thêm tim trong Cửa hàng.',
      '👑 Premium = tim vô hạn!',
    ],
    action: { label: 'Vào Cửa hàng', icon: ShoppingBag, route: '/shop' },
  },
};

export default function TopBar() {
  const { progress } = useProgress();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState<InfoType>(null);
  const [xpDelta, setXpDelta] = useState<number | null>(null);
  const prevXpRef = useRef(progress.xp);

  useEffect(() => {
    if (!user) return;
    supabase.from('profiles').select('avatar_url').eq('user_id', user.id).single()
      .then(({ data }) => { if (data?.avatar_url) setAvatarUrl(data.avatar_url); });
  }, [user]);

  // Detect XP changes and show floating animation
  useEffect(() => {
    const diff = progress.xp - prevXpRef.current;
    if (diff > 0) {
      setXpDelta(diff);
      const timer = setTimeout(() => setXpDelta(null), 1200);
      prevXpRef.current = progress.xp;
      return () => clearTimeout(timer);
    }
    prevXpRef.current = progress.xp;
  }, [progress.xp]);

  const initial = (user?.user_metadata?.display_name || user?.email || 'H')[0].toUpperCase();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-card/95 backdrop-blur-sm safe-area-pt">
        <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <Link to="/home" onClick={() => playClickSound()} className="text-primary hover:text-primary/80 transition-colors">
              <Home className="h-5 w-5" />
            </Link>
            <h1 className="text-lg font-extrabold text-primary">Qilin</h1>
          </div>
          <div className="flex items-center gap-4">
            <button data-tour="stat-streak" onClick={() => { playClickSound(); setShowInfo(showInfo === 'streak' ? null : 'streak'); }} className="flex items-center gap-1 transition-transform active:scale-90">
              <Flame className="h-5 w-5 text-streak" />
              <span className="text-sm font-bold text-streak">{progress.streak}</span>
            </button>
            <button data-tour="stat-xp" onClick={() => { playClickSound(); setShowInfo(showInfo === 'xp' ? null : 'xp'); }} className="relative flex items-center gap-1 transition-transform active:scale-90">
              <motion.div
                key={`zap-${progress.xp}`}
                animate={xpDelta ? { scale: [1, 1.4, 1], rotate: [0, -15, 15, 0] } : {}}
                transition={{ duration: 0.5 }}
              >
                <Zap className="h-5 w-5 text-xp" />
              </motion.div>
              <motion.span
                key={progress.xp}
                initial={{ scale: 1.4, color: 'hsl(var(--xp))' }}
                animate={{ scale: [1.4, 1] }}
                transition={{ type: 'spring', stiffness: 300, damping: 12 }}
                className="text-sm font-bold text-xp"
              >
                {progress.xp}
              </motion.span>
              {/* Pulse ring */}
              <AnimatePresence>
                {xpDelta && (
                  <motion.span
                    key={`pulse-${Date.now()}`}
                    initial={{ scale: 0.8, opacity: 0.7 }}
                    animate={{ scale: 2.2, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="absolute inset-0 rounded-full bg-xp/20 pointer-events-none"
                  />
                )}
              </AnimatePresence>
              <AnimatePresence>
                {xpDelta && (
                  <motion.span
                    key={`xp-delta-${Date.now()}`}
                    initial={{ opacity: 1, y: 0, scale: 0.8 }}
                    animate={{ opacity: 0, y: -28, scale: 1.1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="absolute -top-1 left-1/2 -translate-x-1/2 text-xs font-extrabold text-xp pointer-events-none whitespace-nowrap drop-shadow-md"
                  >
                    +{xpDelta}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <button data-tour="stat-hearts" onClick={() => { playClickSound(); setShowInfo(showInfo === 'hearts' ? null : 'hearts'); }} className="flex items-center gap-1 transition-transform active:scale-90">
              <Heart className="h-5 w-5 text-heart fill-heart" />
              <span className="text-sm font-bold text-heart">{progress.hearts}</span>
            </button>
            <Link to="/profile" onClick={() => playClickSound()} className="h-7 w-7 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center overflow-hidden">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
              ) : (
                <span className="text-xs font-extrabold text-primary">{initial}</span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Info tooltip dropdown */}
      <AnimatePresence>
        {showInfo && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[55]"
              onClick={() => setShowInfo(null)}
            />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="fixed top-16 left-4 right-4 z-[60] mx-auto w-auto max-w-sm rounded-2xl border border-border bg-card shadow-xl p-4 space-y-2 max-h-[70vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="min-w-0 text-sm font-extrabold flex items-center gap-1.5 break-words">
                  <span className="text-lg shrink-0">{infoContent[showInfo].emoji}</span>
                  <span className="min-w-0">{infoContent[showInfo].title}</span>
                </h3>
                <button onClick={() => setShowInfo(null)} className="p-1 rounded-lg hover:bg-muted transition-colors shrink-0">
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
              <ul className="space-y-1.5">
                {infoContent[showInfo].lines.map((line, i) => (
                  <li key={i} className="min-w-0 text-xs text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-0.5 shrink-0">•</span>
                    <span className="min-w-0 break-words whitespace-normal">{line}</span>
                  </li>
                ))}
              </ul>
              {infoContent[showInfo].action && (
                <button
                  onClick={() => { setShowInfo(null); navigate(infoContent[showInfo].action!.route); }}
                  className="mt-2 w-full flex items-center justify-center gap-2 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold py-2 transition-colors"
                >
                  {(() => { const Icon = infoContent[showInfo].action!.icon; return <Icon className="h-4 w-4" />; })()}
                  {infoContent[showInfo].action!.label}
                </button>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
