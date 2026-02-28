import { motion } from 'framer-motion';
import qilinExcited from '@/assets/qilin-excited.png';
import qilinSad from '@/assets/qilin-sad.png';
import qilinSleepy from '@/assets/qilin-sleepy.png';
import qilinProud from '@/assets/qilin-proud.png';
const qilinEncouraging = qilinExcited;
import qilinDefault from '@/assets/qilin-mascot.png';
import qilinSurprised from '@/assets/qilin-surprised.png';

export type QilinMoodType = 'excited' | 'sad' | 'sleepy' | 'proud' | 'encouraging' | 'surprised' | 'default';

const moodImages: Record<QilinMoodType, string> = {
  excited: qilinExcited,
  sad: qilinSad,
  sleepy: qilinSleepy,
  proud: qilinProud,
  encouraging: qilinEncouraging,
  surprised: qilinSurprised,
  default: qilinDefault,
};

const moodAnimations: Record<QilinMoodType, { y?: number[]; rotate?: number[]; scale?: number[] }> = {
  excited: { y: [0, -8, 0], rotate: [0, -3, 3, 0] },
  sad: { y: [0, 2, 0], rotate: [0, -1, 0] },
  sleepy: { y: [0, 3, 0], scale: [1, 0.97, 1] },
  proud: { scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] },
  encouraging: { y: [0, -4, 0], scale: [1, 1.03, 1] },
  surprised: { scale: [1, 1.1, 1], y: [0, -5, 0] },
  default: { y: [0, -3, 0] },
};

interface QilinMoodProps {
  mood: QilinMoodType;
  message: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function QilinMood({ mood, message, size = 'md', className = '' }: QilinMoodProps) {
  const sizeClasses = {
    sm: 'h-16 w-16',
    md: 'h-24 w-24',
    lg: 'h-32 w-32',
  };

  const bubbleSize = {
    sm: 'max-w-[180px] text-xs',
    md: 'max-w-[240px] text-sm',
    lg: 'max-w-[280px] text-sm',
  };

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      {/* Speech bubble */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 300, damping: 20 }}
        className={`relative rounded-2xl bg-card border border-border px-4 py-3 shadow-md ${bubbleSize[size]}`}
      >
        <p className="text-center font-semibold text-foreground leading-relaxed">{message}</p>
        {/* Triangle pointer */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-border" />
        <div className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-card" />
      </motion.div>

      {/* Qilin image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <motion.img
          src={moodImages[mood]}
          alt={`Qilin ${mood}`}
          className={`${sizeClasses[size]} object-contain drop-shadow-lg`}
          animate={moodAnimations[mood]}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </div>
  );
}

/**
 * Determine Qilin's mood based on user progress and context.
 */
export function getQilinMood(progress: {
  streak: number;
  hearts: number;
  maxHearts: number;
  xp: number;
  level: number;
  completedLessons: string[];
}): { mood: QilinMoodType; message: string } {
  const h = new Date().getHours();

  // Late night → sleepy
  if (h >= 23 || h < 5) {
    return { mood: 'sleepy', message: '夜深了！Khuya rồi, nghỉ sớm nhé! 💤' };
  }

  // Low hearts → sad
  if (progress.hearts <= 1) {
    return { mood: 'sad', message: '💔 Hết tim rồi... Cẩn thận hơn nhé!' };
  }

  // High level or lots of XP → proud
  if (progress.level >= 5 || progress.xp >= 300) {
    return { mood: 'proud', message: `🎓 Cấp ${progress.level}! Bạn giỏi quá đi!` };
  }

  // Good streak → excited
  if (progress.streak >= 7) {
    return { mood: 'excited', message: `🔥 Streak ${progress.streak} ngày! Siêu tuyệt!` };
  }

  // Has some progress → encouraging
  if (progress.completedLessons.length > 0) {
    return { mood: 'encouraging', message: '👍 Tiếp tục phát huy nhé! Bạn làm tốt lắm!' };
  }

  // No streak → sad/encouraging
  if (progress.streak === 0) {
    return { mood: 'sad', message: '🌱 Lâu rồi không thấy bạn... Học 1 bài nào!' };
  }

  // Morning greeting
  if (h < 12) {
    return { mood: 'excited', message: '☀️ 早安！Buổi sáng tốt lành! Sẵn sàng học chưa?' };
  }

  return { mood: 'encouraging', message: '加油！Cố lên nào! Qilin cổ vũ bạn! 💪' };
}
