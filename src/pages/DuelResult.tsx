import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Swords, Frown, Handshake, Loader2, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useDuel } from '@/hooks/useDuel';
import { useProgress } from '@/contexts/ProgressContext';
import { fireLevelUpConfetti } from '@/lib/confetti';
import { playFanfare, playClickSound } from '@/lib/sfx';
import qilinCelebrate from '@/assets/qilin-celebrate.png';
import qilinSad from '@/assets/qilin-sad.png';
import qilinExcited from '@/assets/qilin-excited.png';

function HeartRewardPopup({ playerName, onClose }: { playerName: string; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[150] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative mx-4 rounded-3xl bg-card border border-primary/30 p-8 text-center shadow-2xl max-w-sm w-full"
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: [0, 1.1, 1], rotate: [0, 5, -3, 0] }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating hearts background */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-destructive/40"
            style={{ left: `${15 + i * 13}%`, top: '50%' }}
            initial={{ y: 0, opacity: 0.8, scale: 0.6 }}
            animate={{ y: -120 - i * 20, opacity: 0, scale: 1.2 }}
            transition={{ duration: 2, delay: 0.3 + i * 0.15, repeat: Infinity, repeatDelay: 1 }}
          >
            <Heart className="h-5 w-5 fill-current" />
          </motion.div>
        ))}

        {/* Big heart icon */}
        <motion.div
          className="mx-auto mb-4 h-20 w-20 rounded-full bg-destructive/10 border-2 border-destructive/30 flex items-center justify-center"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 0.5 }}
        >
          <Heart className="h-10 w-10 text-destructive fill-destructive" />
        </motion.div>

        <motion.p
          className="text-2xl font-extrabold text-primary mb-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          🎉 Chúc mừng!
        </motion.p>

        <motion.p
          className="text-base font-bold text-foreground mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          {playerName} đã chiến thắng!
        </motion.p>

        <motion.div
          className="inline-flex items-center gap-2 rounded-full bg-destructive/10 border border-destructive/30 px-5 py-2 mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Heart className="h-5 w-5 text-destructive fill-destructive" />
          <span className="text-lg font-extrabold text-destructive">+1 Tim</span>
        </motion.div>

        <motion.p
          className="text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
        >
          Tiếp tục chiến đấu để nhận thêm tim! 💪
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

export default function DuelResult() {
  const { duelId } = useParams<{ duelId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { duel } = useDuel(duelId);
  const { addXp, gainHeart } = useProgress();
  const [xpAwarded, setXpAwarded] = useState(false);
  const [showHeartPopup, setShowHeartPopup] = useState(false);

  const isChallenger = duel?.challenger_id === user?.id;
  const myScore = isChallenger ? duel?.challenger_score || 0 : duel?.opponent_score || 0;
  const theirScore = isChallenger ? duel?.opponent_score || 0 : duel?.challenger_score || 0;
  const won = duel?.winner_id === user?.id;
  const draw = duel?.status === 'completed' && !duel?.winner_id;
  const lost = duel?.status === 'completed' && duel?.winner_id && duel.winner_id !== user?.id;

  const myName = (isChallenger ? (duel as any)?.challenger_name : (duel as any)?.opponent_name) || 'Bạn';

  useEffect(() => {
    if (!duel || xpAwarded) return;
    if (duel.status === 'completed') {
      const xp = won ? duel.xp_reward : draw ? Math.floor(duel.xp_reward / 2) : Math.floor(duel.xp_reward / 4);
      if (xp > 0) addXp(xp);
      if (won) gainHeart(1);
      setXpAwarded(true);
      
      if (won) {
        fireLevelUpConfetti();
        playFanfare();
        setTimeout(() => setShowHeartPopup(true), 800);
      }
    }
  }, [duel, won, draw, xpAwarded, addXp]);

  if (!duel) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (duel.status !== 'completed') {
    return (
      <div className="py-16 text-center space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto" />
        <p className="font-bold">Đang chờ đối thủ hoàn thành...</p>
        <p className="text-sm text-muted-foreground">Trận đấu sẽ tự cập nhật khi đối thủ xong</p>
        <Button variant="outline" onClick={() => { playClickSound(); navigate('/duel'); }}>Quay lại</Button>
      </div>
    );
  }

  const resultImage = won ? qilinCelebrate : draw ? qilinExcited : qilinSad;
  const resultTitle = won ? '🎉 Chiến thắng!' : draw ? '🤝 Hòa!' : '😤 Thua rồi!';
  const resultColor = won ? 'text-primary' : draw ? 'text-foreground' : 'text-destructive';
  const xpEarned = won ? duel.xp_reward : draw ? Math.floor(duel.xp_reward / 2) : Math.floor(duel.xp_reward / 4);

  return (
    <div className="py-8 pb-24 text-center space-y-5">
      <AnimatePresence>
        {showHeartPopup && (
          <HeartRewardPopup playerName={myName} onClose={() => setShowHeartPopup(false)} />
        )}
      </AnimatePresence>

      <motion.img
        src={resultImage}
        alt="QiLin"
        className="h-32 w-32 mx-auto object-contain drop-shadow-xl"
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: [0, 1.2, 1], rotate: [0, 10, -5, 0] }}
        transition={{ duration: 0.8 }}
      />

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={cn('text-3xl font-extrabold', resultColor)}
      >
        {resultTitle}
      </motion.h1>

      {/* Score comparison */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="flex items-center justify-center gap-6"
      >
        <div className="text-center">
          <div className={cn(
            'h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-1 border-2',
            won ? 'border-primary bg-primary/10' : 'border-border bg-card'
          )}>
            {duel.challenger_avatar || duel.opponent_avatar ? (
              <img src={isChallenger ? duel.challenger_avatar : duel.opponent_avatar} className="h-full w-full rounded-full object-cover" alt="" />
            ) : (
              <span className="text-xl font-bold text-primary">
                {((isChallenger ? duel.challenger_name : duel.opponent_name) || 'B')[0].toUpperCase()}
              </span>
            )}
          </div>
          <p className="text-xs font-bold truncate max-w-[80px]">{isChallenger ? duel.challenger_name : duel.opponent_name || 'Bạn'}</p>
          <p className="text-2xl font-extrabold text-primary">{myScore}</p>
        </div>

        <span className="text-lg font-extrabold text-muted-foreground">VS</span>

        <div className="text-center">
          <div className={cn(
            'h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-1 border-2',
            !won && !draw ? 'border-destructive bg-destructive/10' : 'border-border bg-card'
          )}>
            {(isChallenger ? duel.opponent_avatar : duel.challenger_avatar) ? (
              <img src={isChallenger ? duel.opponent_avatar : duel.challenger_avatar} className="h-full w-full rounded-full object-cover" alt="" />
            ) : (
              <span className="text-xl font-bold text-muted-foreground">
                {((isChallenger ? duel.opponent_name : duel.challenger_name) || 'Đ')[0].toUpperCase()}
              </span>
            )}
          </div>
          <p className="text-xs font-bold truncate max-w-[80px]">{isChallenger ? duel.opponent_name : duel.challenger_name || 'Đối thủ'}</p>
          <p className="text-2xl font-extrabold text-destructive">{theirScore}</p>
        </div>
      </motion.div>

      {/* Rewards */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex items-center justify-center gap-3"
      >
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/30 px-5 py-2">
          <span className="text-xl font-extrabold text-primary">+{xpEarned}</span>
          <span className="text-sm font-bold text-muted-foreground">XP</span>
        </div>
        {won && (
          <motion.div
            className="inline-flex items-center gap-2 rounded-full bg-destructive/10 border border-destructive/30 px-4 py-2"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ delay: 0.8, duration: 0.4 }}
          >
            <Heart className="h-4 w-4 text-destructive fill-destructive" />
            <span className="text-lg font-extrabold text-destructive">+1</span>
          </motion.div>
        )}
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="space-y-2 px-4"
      >
        <Button className="w-full h-12 rounded-2xl font-extrabold text-base" onClick={() => { playClickSound(); navigate('/duel'); }}>
          <Swords className="h-5 w-5 mr-2" />
          Đấu tiếp
        </Button>
        <Button variant="outline" className="w-full h-11 rounded-2xl font-bold" onClick={() => { playClickSound(); navigate('/home'); }}>
          Về trang chủ
        </Button>
      </motion.div>
    </div>
  );
}
