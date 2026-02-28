import { motion } from 'framer-motion';
import qilinLoading from '@/assets/qilin-loading.png';

export default function LoadingScreen() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background gap-4">
      <motion.img
        src={qilinLoading}
        alt="QiLin loading"
        className="h-32 w-32 object-contain drop-shadow-lg"
        animate={{ y: [0, -10, 0], rotate: [0, 3, -3, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.p
        className="text-lg font-extrabold text-primary"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Đang tải...
      </motion.p>
    </div>
  );
}
