import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fireLevelUpConfetti } from '@/lib/confetti';
import { playFanfare } from '@/lib/sfx';
import { hapticSuccess, shareText } from '@/hooks/useNative';
import qilinCelebrate from '@/assets/qilin-celebrate.png';

interface CelebrationModalProps {
  open: boolean;
  xpEarned: number;
  crownLevel: number;
  lessonTitle: string;
  onClose: () => void;
}

export default function CelebrationModal({ open, xpEarned, crownLevel, lessonTitle, onClose }: CelebrationModalProps) {
  useEffect(() => {
    if (open) {
      fireLevelUpConfetti();
      playFanfare();
      hapticSuccess();
    }
  }, [open]);

  const handleShare = () => {
    shareText(
      'Qilin - Học tiếng Trung',
      `🎉 Tôi vừa hoàn thành "${lessonTitle}" và kiếm được ${xpEarned} XP trên Qilin! 🐉🔥`,
      'https://qilin.lovable.app'
    );
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.5, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.5, y: 50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="relative w-full max-w-sm rounded-3xl bg-card border border-border p-6 shadow-2xl text-center space-y-4"
          >
            {/* QiLin image */}
            <motion.img
              src={qilinCelebrate}
              alt="QiLin chúc mừng"
              className="mx-auto h-36 w-36 object-contain drop-shadow-xl"
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: [0, 1.2, 1], rotate: [0, 10, -5, 0] }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-extrabold text-primary">🎉 Xuất sắc!</h2>
              <p className="text-sm text-muted-foreground mt-1">{lessonTitle}</p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center gap-6"
            >
              <div className="flex flex-col items-center">
                <span className="text-3xl font-extrabold text-xp">+{xpEarned}</span>
                <span className="text-xs font-bold text-muted-foreground">XP</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl">⭐</span>
                <span className="text-xs font-bold text-muted-foreground">Cấp {Math.min(crownLevel + 1, 5)}</span>
              </div>
            </motion.div>

            {/* Encouragement */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-sm font-bold text-foreground"
            >
              {crownLevel >= 4 ? '🐉 Bạn đã đạt cấp tối đa! Tuyệt vời!' :
               crownLevel >= 2 ? '🔥 Cứ tiếp tục, bạn sắp thành master rồi!' :
               '✨ Hãy làm lại để nâng cấp Crown nhé!'}
            </motion.p>

            {/* Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <Button
                size="lg"
                className="w-full h-12 text-base font-extrabold rounded-2xl"
                onClick={onClose}
              >
                Tiếp tục 🚀
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="w-full h-10 text-sm font-bold rounded-2xl gap-2"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4" />
                Chia sẻ thành tích
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
