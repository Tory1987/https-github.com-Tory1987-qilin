import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Swords, ShoppingBag, ArrowLeft, Timer } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import qilinSad from '@/assets/qilin-sad.png';

interface OutOfHeartsModalProps {
  open: boolean;
  onClose: () => void;
  correctCount?: number;
  totalCount?: number;
  duelUnlocked: boolean;
}

const HEART_REGEN_MINUTES = 60;

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState(() => {
    const lastLost = localStorage.getItem('lastHeartLostAt');
    if (!lastLost) return HEART_REGEN_MINUTES * 60;
    const elapsed = Math.floor((Date.now() - parseInt(lastLost, 10)) / 1000);
    return Math.max(0, HEART_REGEN_MINUTES * 60 - elapsed);
  });

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Save timestamp when modal opens and no timestamp exists
  useEffect(() => {
    if (!localStorage.getItem('lastHeartLostAt')) {
      localStorage.setItem('lastHeartLostAt', Date.now().toString());
    }
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return { timeLeft, display };
}

export default function OutOfHeartsModal({ open, onClose, correctCount, totalCount, duelUnlocked }: OutOfHeartsModalProps) {
  const navigate = useNavigate();
  const { timeLeft, display } = useCountdown();

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="max-w-sm rounded-3xl border-destructive/20 p-6 text-center gap-0">
        <DialogTitle className="sr-only">Hết tim</DialogTitle>

        {/* Qilin sad */}
        <motion.img
          src={qilinSad}
          alt="Qilin buồn"
          className="h-24 w-24 mx-auto rounded-full border-2 border-destructive/30 shadow-lg object-cover bg-card mb-4"
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        />

        {/* Title */}
        <h2 className="text-xl font-extrabold mb-1">💔 Hết tim rồi!</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Nghỉ một chút nhé! Qilin cũng cần sạc pin 🔋
        </p>

        {/* Score if available */}
        {correctCount !== undefined && totalCount !== undefined && (
          <div className="rounded-2xl bg-muted/50 p-3 mb-4">
            <p className="text-sm">
              Đúng <span className="text-primary font-extrabold">{correctCount}</span>/{totalCount} câu · Giỏi lắm! 💪
            </p>
          </div>
        )}

        {/* Countdown */}
        <div className="rounded-2xl bg-destructive/5 border border-destructive/10 p-3 mb-5 flex items-center justify-center gap-2">
          <Timer className="h-4 w-4 text-destructive" />
          {timeLeft > 0 ? (
            <p className="text-sm font-bold">
              Tim tiếp theo sau: <span className="text-destructive font-mono">{display}</span>
            </p>
          ) : (
            <p className="text-sm font-bold text-primary">
              ✨ Tim đang được hồi phục!
            </p>
          )}
        </div>

        {/* Hearts display */}
        <div className="flex items-center justify-center gap-1 mb-5">
          <Heart className="h-4 w-4 text-destructive fill-destructive/20" />
          <span className="text-xs text-muted-foreground">0 tim · Hồi 1 tim mỗi 60 phút</span>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-2.5">
          {duelUnlocked && (
            <Button
              size="lg"
              className="rounded-xl w-full gap-2"
              onClick={() => { onClose(); navigate('/duel'); }}
            >
              <Swords className="h-4 w-4" />
              Vào Song Đấu
            </Button>
          )}
          <Button
            size="lg"
            variant="secondary"
            className="rounded-xl w-full gap-2"
            onClick={() => { onClose(); navigate('/shop'); }}
          >
            <ShoppingBag className="h-4 w-4" />
            Mua thêm tim
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className="rounded-xl w-full gap-2 text-muted-foreground"
            onClick={onClose}
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
