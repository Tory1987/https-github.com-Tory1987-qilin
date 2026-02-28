import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import qilinMascot from '@/assets/qilin-mascot.png';

interface TourStepProps {
  content: string;
  stepIndex: number;
  totalSteps: number;
  position: { top: number; left: number };
  onNext: () => void;
  onSkip: () => void;
}

export default function TourStep({ content, stepIndex, totalSteps, position, onNext, onSkip }: TourStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 8 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className="fixed z-[110] w-[280px] rounded-2xl border border-primary/30 bg-card shadow-2xl p-4"
      style={{ top: position.top, left: position.left }}
    >
      <div className="flex items-start gap-2.5">
        <img src={qilinMascot} alt="QiLin" className="h-10 w-10 shrink-0 object-contain" />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-primary mb-1">QiLin hướng dẫn</p>
          <p className="text-xs text-foreground leading-relaxed">{content}</p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-3">
        <span className="text-[10px] text-muted-foreground font-semibold">{stepIndex + 1}/{totalSteps}</span>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="h-7 text-xs px-3" onClick={onSkip}>
            Bỏ qua
          </Button>
          <Button size="sm" className="h-7 text-xs px-3 font-bold" onClick={onNext}>
            {stepIndex < totalSteps - 1 ? 'Tiếp →' : 'Xong ✓'}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
