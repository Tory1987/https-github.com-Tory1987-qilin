import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Swords, Zap, Clock, Users, Copy, Check, Loader2, Shuffle, ArrowLeft, Trophy, History, Heart, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useProgress } from '@/contexts/ProgressContext';
import { useDuel, Duel } from '@/hooks/useDuel';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { playClickSound } from '@/lib/sfx';
import qilinExcited from '@/assets/qilin-excited.png';
import qilinSleepy from '@/assets/qilin-sleepy.png';
import duelLoadingImg from '@/assets/qilin-loading.png';

export default function DuelLobby() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { progress } = useProgress();
  const duelUnlocked = progress.completedLessons.includes('b1-l3');
  const { createDuel, joinByCode, findRandomMatch, fetchMyDuels, myDuels, loading, duelsRemaining, fetchDuelsToday } = useDuel();
  
  const [tab, setTab] = useState<'create' | 'join' | 'history'>('create');
  const [mode, setMode] = useState<'realtime' | 'turnbased'>('turnbased');
  const [roomCode, setRoomCode] = useState('');
  const [creating, setCreating] = useState(false);
  const [joining, setJoining] = useState(false);
  const [matching, setMatching] = useState(false);
  const [createdDuel, setCreatedDuel] = useState<Duel | null>(null);
  const [copied, setCopied] = useState(false);

  // Pre-fill opponent from leaderboard
  const opponentId = searchParams.get('opponent');

  useEffect(() => {
    fetchMyDuels();
    fetchDuelsToday();
  }, [fetchMyDuels, fetchDuelsToday]);

  // Listen for opponent joining created duel
  useEffect(() => {
    if (!createdDuel) return;
    const channel = supabase
      .channel(`lobby-${createdDuel.id}`)
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'duels',
        filter: `id=eq.${createdDuel.id}`,
      }, (payload: any) => {
        if (payload.new.status === 'active') {
          navigate(`/duel/${createdDuel.id}`);
        }
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [createdDuel, navigate]);

  const handleCreate = async () => {
    setCreating(true);
    const duel = await createDuel(mode, opponentId || undefined);
    if (duel === 'limit') {
      toast.error('Bạn đã hết lượt song đấu hôm nay (3/3)');
    } else if (duel) {
      setCreatedDuel(duel);
      if (opponentId) {
        toast.success('Đã gửi lời mời thách đấu!');
      }
    } else {
      toast.error('Không thể tạo trận đấu');
    }
    setCreating(false);
  };

  const handleJoin = async () => {
    if (!roomCode.trim()) return;
    setJoining(true);
    const duel = await joinByCode(roomCode.trim());
    if (duel === 'limit') {
      toast.error('Bạn đã hết lượt song đấu hôm nay (3/3)');
    } else if (duel) {
      navigate(`/duel/${duel.id}`);
    } else {
      toast.error('Không tìm thấy phòng đấu hoặc phòng đã đầy');
    }
    setJoining(false);
  };

  const handleRandomMatch = async () => {
    setMatching(true);
    const duel = await findRandomMatch(mode);
    if (duel === 'limit') {
      toast.error('Bạn đã hết lượt song đấu hôm nay (3/3)');
    } else if (duel) {
      if (duel.status === 'active') {
        navigate(`/duel/${duel.id}`);
      } else {
        setCreatedDuel(duel);
        toast.info('Đang chờ đối thủ...');
      }
    }
    setMatching(false);
  };

  const copyCode = () => {
    if (createdDuel?.room_code) {
      navigator.clipboard.writeText(createdDuel.room_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

    if (!duelUnlocked) {
      return (
        <div className="space-y-6 py-4 pb-24">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-3 pt-8">
            <div className="mx-auto h-20 w-20 rounded-full bg-muted flex items-center justify-center">
              <Lock className="h-10 w-10 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-extrabold">Song Đấu bị khoá</h1>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              Hoàn thành <span className="font-extrabold text-primary">Bài 3: Cuối tuần làm gì?</span> để mở khoá tính năng Song Đấu!
            </p>
          </motion.div>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.15 }} className="flex justify-center">
            <img src={qilinSleepy} alt="QiLin" className="h-32 w-32 object-contain drop-shadow-lg opacity-70" />
          </motion.div>
          <div className="px-4">
            <Button className="w-full h-12 rounded-2xl font-extrabold text-base" onClick={() => { playClickSound(); navigate('/learn'); }}>
              📖 Đi học Bài 3
            </Button>
          </div>
        </div>
      );
    }

    return (
    <div className="space-y-5 py-4 pb-24">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-1">
        <div className="flex items-center justify-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => { playClickSound(); navigate(-1); }} className="absolute left-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Swords className="h-7 w-7 text-destructive" />
          <h1 className="text-2xl font-extrabold">Song Đấu</h1>
        </div>
        <p className="text-sm text-muted-foreground">Thách đấu bạn bè hoặc tìm đối thủ ngẫu nhiên!</p>
        <div className="flex items-center justify-center gap-3 mt-1">
          <span className={cn('text-xs font-bold px-2 py-0.5 rounded-full', duelsRemaining > 0 ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive')}>
            ⚔️ Còn {duelsRemaining}/3 lượt hôm nay
          </span>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-heart/10 text-heart">
            <Heart className="h-3 w-3 inline mr-0.5 fill-heart" />Thắng +1 tim
          </span>
        </div>
      </motion.div>

      {/* Mascot */}
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }} className="flex justify-center">
        <img src={qilinExcited} alt="QiLin" className="h-24 w-24 object-contain drop-shadow-lg" />
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 px-1">
        {[
          { key: 'create' as const, label: 'Tạo phòng', icon: Swords },
          { key: 'join' as const, label: 'Nhập mã', icon: Users },
          { key: 'history' as const, label: 'Lịch sử', icon: History },
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              'flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-colors',
              tab === t.key ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted text-muted-foreground'
            )}
          >
            <t.icon className="h-3.5 w-3.5" />
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {tab === 'create' && (
          <motion.div key="create" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
            {/* Mode selector */}
            <div className="space-y-2">
              <p className="text-sm font-bold text-foreground">Chế độ chơi</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setMode('realtime')}
                  className={cn(
                    'rounded-2xl border-2 p-4 text-center transition-all',
                    mode === 'realtime' ? 'border-primary bg-primary/5' : 'border-border bg-card'
                  )}
                >
                  <Zap className={cn('h-6 w-6 mx-auto mb-1', mode === 'realtime' ? 'text-primary' : 'text-muted-foreground')} />
                  <p className="text-sm font-bold">Real-time</p>
                  <p className="text-[10px] text-muted-foreground">Đấu cùng lúc</p>
                </button>
                <button
                  onClick={() => setMode('turnbased')}
                  className={cn(
                    'rounded-2xl border-2 p-4 text-center transition-all',
                    mode === 'turnbased' ? 'border-primary bg-primary/5' : 'border-border bg-card'
                  )}
                >
                  <Clock className={cn('h-6 w-6 mx-auto mb-1', mode === 'turnbased' ? 'text-primary' : 'text-muted-foreground')} />
                  <p className="text-sm font-bold">Lượt chơi</p>
                  <p className="text-[10px] text-muted-foreground">Chơi lần lượt</p>
                </button>
              </div>
            </div>

            {/* Created duel waiting */}
            {createdDuel ? (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-5 text-center space-y-4">
                <motion.img
                  src={duelLoadingImg}
                  alt="Song Đấu"
                  className="w-48 h-48 object-cover rounded-2xl shadow-lg mx-auto"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                />
                <p className="text-sm font-bold">Đang chờ đối thủ...</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl font-extrabold tracking-[0.3em] text-primary">{createdDuel.room_code}</span>
                  <button onClick={copyCode} className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors">
                    {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4 text-primary" />}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">Chia sẻ mã này cho bạn bè để tham gia</p>
              </motion.div>
            ) : (
              <div className="space-y-2">
                <Button data-tour="duel-start" className="w-full h-12 rounded-2xl font-extrabold text-base" onClick={handleCreate} disabled={creating}>
                  {creating ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Swords className="h-5 w-5 mr-2" />}
                  {opponentId ? 'Thách đấu' : 'Tạo phòng đấu'}
                </Button>
                <Button variant="outline" className="w-full h-12 rounded-2xl font-extrabold text-base" onClick={handleRandomMatch} disabled={matching}>
                  {matching ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Shuffle className="h-5 w-5 mr-2" />}
                  Ghép ngẫu nhiên
                </Button>
              </div>
            )}
          </motion.div>
        )}

        {tab === 'join' && (
          <motion.div key="join" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
            <p className="text-sm font-bold text-foreground">Nhập mã phòng đấu</p>
            <Input
              value={roomCode}
              onChange={e => setRoomCode(e.target.value.toUpperCase())}
              placeholder="VD: ABC123"
              className="text-center text-2xl font-extrabold tracking-[0.3em] h-14 rounded-2xl"
              maxLength={6}
            />
            <Button className="w-full h-12 rounded-2xl font-extrabold text-base" onClick={handleJoin} disabled={joining || roomCode.length < 6}>
              {joining ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Users className="h-5 w-5 mr-2" />}
              Tham gia
            </Button>
          </motion.div>
        )}

        {tab === 'history' && (
          <motion.div key="history" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-2">
            {loading ? (
              <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
            ) : myDuels.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Swords className="h-10 w-10 mx-auto mb-2 opacity-30" />
                <p className="font-bold text-sm">Chưa có trận đấu nào</p>
              </div>
            ) : (
              myDuels.map(d => {
                const isChallenger = d.challenger_id === user?.id;
                const myScore = isChallenger ? d.challenger_score : d.opponent_score;
                const theirScore = isChallenger ? d.opponent_score : d.challenger_score;
                const won = d.winner_id === user?.id;
                const draw = d.status === 'completed' && !d.winner_id;
                return (
                  <button
                    key={d.id}
                    onClick={() => {
                      if (d.status === 'active') navigate(`/duel/${d.id}`);
                      else if (d.status === 'completed') navigate(`/duel/${d.id}/result`);
                      else if (d.status === 'pending' && isChallenger) {
                        setTab('create');
                        setCreatedDuel(d);
                      }
                    }}
                    className={cn(
                      'w-full flex items-center gap-3 rounded-2xl border p-3 text-left transition-colors',
                      d.status === 'active' ? 'border-primary/30 bg-primary/5' : 'border-border bg-card'
                    )}
                  >
                    <div className={cn(
                      'h-10 w-10 rounded-full flex items-center justify-center shrink-0',
                      won ? 'bg-primary/10' : draw ? 'bg-muted' : d.status === 'completed' ? 'bg-destructive/10' : 'bg-muted'
                    )}>
                      {d.status === 'active' ? <Zap className="h-5 w-5 text-primary" /> :
                       d.status === 'pending' ? <Clock className="h-5 w-5 text-muted-foreground" /> :
                       won ? <Trophy className="h-5 w-5 text-primary" /> :
                       <Swords className="h-5 w-5 text-muted-foreground" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold truncate">
                        {d.status === 'pending' ? 'Đang chờ...' :
                         d.status === 'active' ? 'Đang đấu!' :
                         won ? 'Thắng!' : draw ? 'Hòa' : 'Thua'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {d.mode === 'realtime' ? '⚡ Real-time' : '🔄 Lượt chơi'} • {myScore}-{theirScore}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-muted-foreground">
                      {new Date(d.created_at).toLocaleDateString('vi-VN')}
                    </span>
                  </button>
                );
              })
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
