import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Flame, Zap, BookOpen, Crown, Medal, ArrowLeft, Loader2, Swords } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { fireLevelUpConfetti } from '@/lib/confetti';

interface LeaderboardEntry {
  user_id: string;
  display_name: string | null;
  avatar_url: string | null;
  xp: number;
  level: number;
  streak: number;
  weekly_xp: number;
  completed_lessons_count: number | null;
}

type TabKey = 'xp' | 'weekly' | 'lessons' | 'pvp';

const tabs: { key: TabKey; label: string; icon: typeof Zap }[] = [
  { key: 'xp', label: 'XP Tổng', icon: Zap },
  { key: 'weekly', label: 'Tuần này', icon: Crown },
  { key: 'lessons', label: 'Bài học', icon: BookOpen },
  { key: 'pvp', label: 'PvP', icon: Swords },
];

const rankColors = ['text-yellow-500', 'text-gray-400', 'text-amber-600'];
const rankBg = ['bg-yellow-500/10', 'bg-gray-400/10', 'bg-amber-600/10'];
const rankEmojis = ['🥇', '🥈', '🥉'];

function getSortedData(data: LeaderboardEntry[], tab: TabKey) {
  return [...data].sort((a, b) => {
    switch (tab) {
      case 'xp': return b.xp - a.xp;
      case 'weekly': return b.weekly_xp - a.weekly_xp;
      case 'lessons': return (b.completed_lessons_count || 0) - (a.completed_lessons_count || 0);
      case 'pvp': return 0;
    }
  });
}

function getValue(entry: LeaderboardEntry, tab: TabKey): string {
  switch (tab) {
    case 'xp': return `${entry.xp} XP`;
    case 'weekly': return `${entry.weekly_xp} XP`;
    case 'lessons': return `${entry.completed_lessons_count || 0} bài`;
    case 'pvp': return '';
  }
}

export default function Leaderboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState<LeaderboardEntry[]>([]);
  const [pvpData, setPvpData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabKey>('xp');

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      const [{ data: rows }, { data: pvpRows }] = await Promise.all([
        supabase.from('leaderboard_view' as any).select('*'),
        supabase.from('duel_leaderboard_view' as any).select('*'),
      ]);
      if (rows) setData(rows as unknown as LeaderboardEntry[]);
      if (pvpRows) setPvpData(pvpRows as any[]);
      setLoading(false);
    };
    fetchAll();
  }, []);

  const sorted = getSortedData(data, activeTab);
  const myRank = sorted.findIndex(e => e.user_id === user?.id) + 1;

  // Fire confetti when user is #1
  useEffect(() => {
    if (!loading && myRank === 1) {
      fireLevelUpConfetti();
    }
  }, [loading, myRank]);

  return (
    <div className="space-y-5 py-4 pb-24" data-tour="leaderboard">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-1"
      >
        <h1 className="text-2xl font-extrabold flex items-center justify-center gap-2">
          <Trophy className="h-6 w-6 text-secondary" />
          Bảng xếp hạng
        </h1>
        {myRank > 0 && (
          <p className="text-sm text-muted-foreground">
            Bạn đang ở vị trí <span className="font-extrabold text-primary">#{myRank}</span>
          </p>
        )}
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 px-1">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors shrink-0',
              activeTab === tab.key
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            )}
          >
            <tab.icon className="h-3.5 w-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : activeTab === 'pvp' ? (
        <div className="space-y-2">
          {pvpData.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <Swords className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p className="font-bold">Chưa có ai đấu</p>
              <button onClick={() => navigate('/duel')} className="mt-3 text-sm font-bold text-primary underline">Bắt đầu Song Đấu →</button>
            </div>
          ) : (
            pvpData.map((entry: any, i: number) => {
              const isMe = entry.user_id === user?.id;
              const isVoSong = i === 0;
              return (
                <motion.div
                  key={entry.user_id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className={cn(
                    'flex items-center gap-3 rounded-2xl border p-3',
                    isVoSong ? 'bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border-yellow-500/40 shadow-md' :
                    isMe ? 'bg-primary/5 border-primary/30 shadow-sm' : 'bg-card border-border'
                  )}
                >
                  <span className={cn('w-8 text-center font-extrabold text-sm', isVoSong ? 'text-yellow-500' : 'text-muted-foreground')}>
                    {isVoSong ? '👑' : i + 1}
                  </span>
                  <div className="relative shrink-0">
                    <div className={cn(
                      'h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden',
                      isVoSong && 'ring-2 ring-yellow-500 ring-offset-1 ring-offset-background'
                    )}>
                      {entry.avatar_url ? (
                        <img src={entry.avatar_url} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <span className="text-sm font-bold text-primary">{(entry.display_name || '?')[0].toUpperCase()}</span>
                      )}
                    </div>
                    {isVoSong && (
                      <span className="absolute -top-2 -right-2 text-xs bg-yellow-500 text-white px-1 rounded-full font-extrabold leading-tight shadow">
                        VS
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className={cn('text-sm font-bold truncate', isVoSong ? 'text-yellow-600 dark:text-yellow-400' : isMe ? 'text-primary' : '')}>
                        {entry.display_name || 'Người chơi'}
                        {isMe && ' (bạn)'}
                      </p>
                      {isVoSong && (
                        <span className="text-[10px] font-extrabold bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 px-1.5 py-0.5 rounded-full whitespace-nowrap">
                          Vô Song
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{entry.wins}W {entry.losses}L • 🔥{entry.win_streak}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={cn('text-sm font-extrabold', isVoSong && 'text-yellow-600 dark:text-yellow-400')}>{entry.rating}</span>
                    {!isMe && (
                      <button
                        onClick={() => navigate(`/duel?opponent=${entry.user_id}`)}
                        className="p-1.5 rounded-lg bg-destructive/10 hover:bg-destructive/20 transition-colors"
                      >
                        <Swords className="h-4 w-4 text-destructive" />
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      ) : (
        <div className="space-y-2">
          {/* Top 3 podium */}
          {sorted.length >= 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-end justify-center gap-3 py-4"
            >
              <PodiumCard entry={sorted[1]} rank={2} tab={activeTab} isMe={sorted[1]?.user_id === user?.id} />
              <PodiumCard entry={sorted[0]} rank={1} tab={activeTab} isMe={sorted[0]?.user_id === user?.id} />
              <PodiumCard entry={sorted[2]} rank={3} tab={activeTab} isMe={sorted[2]?.user_id === user?.id} />
            </motion.div>
          )}

          {/* Rest of the list */}
          {sorted.slice(3).map((entry, i) => {
            const rank = i + 4;
            const isMe = entry.user_id === user?.id;
            return (
              <motion.div
                key={entry.user_id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className={cn(
                  'flex items-center gap-3 rounded-2xl border p-3',
                  isMe ? 'bg-primary/5 border-primary/30 shadow-sm' : 'bg-card border-border'
                )}
              >
                <span className="w-8 text-center font-extrabold text-sm text-muted-foreground">{rank}</span>
                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0 overflow-hidden">
                  {entry.avatar_url ? (
                    <img src={entry.avatar_url} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-sm font-bold text-primary">{(entry.display_name || '?')[0].toUpperCase()}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn('text-sm font-bold truncate', isMe && 'text-primary')}>
                    {entry.display_name || 'Học viên'}
                    {isMe && ' (bạn)'}
                  </p>
                  <p className="text-xs text-muted-foreground">Lv.{entry.level}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-sm font-extrabold">{getValue(entry, activeTab)}</span>
                  {!isMe && (
                    <button
                      onClick={() => navigate(`/duel?opponent=${entry.user_id}`)}
                      className="p-1.5 rounded-lg bg-destructive/10 hover:bg-destructive/20 transition-colors"
                    >
                      <Swords className="h-4 w-4 text-destructive" />
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}

          {sorted.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <Trophy className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p className="font-bold">Chưa có dữ liệu</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function PodiumCard({ entry, rank, tab, isMe }: { entry: LeaderboardEntry; rank: number; tab: TabKey; isMe: boolean }) {
  const heights = { 1: 'h-28', 2: 'h-20', 3: 'h-16' };
  const sizes = { 1: 'h-16 w-16', 2: 'h-12 w-12', 3: 'h-12 w-12' };

  return (
    <div className={cn('flex flex-col items-center gap-1', rank === 1 ? 'order-2' : rank === 2 ? 'order-1' : 'order-3')}>
      <div className="relative">
        <div className={cn(
          'rounded-full flex items-center justify-center shrink-0 overflow-hidden border-2',
          sizes[rank as 1 | 2 | 3],
          isMe ? 'border-primary' : 'border-border'
        )}>
          {entry.avatar_url ? (
            <img src={entry.avatar_url} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className={cn('font-bold text-primary', rank === 1 ? 'text-xl' : 'text-sm')}>
              {(entry.display_name || '?')[0].toUpperCase()}
            </span>
          )}
        </div>
        <span className="absolute -bottom-1 -right-1 text-lg">{rankEmojis[rank - 1]}</span>
      </div>
      <p className={cn('text-xs font-bold truncate max-w-[80px] text-center', isMe && 'text-primary')}>
        {entry.display_name || 'Học viên'}
      </p>
      <span className="text-xs font-extrabold">{getValue(entry, tab)}</span>
      <div className={cn(
        'w-16 rounded-t-xl',
        heights[rank as 1 | 2 | 3],
        rank === 1 ? 'bg-yellow-500/20' : rank === 2 ? 'bg-gray-400/15' : 'bg-amber-600/15'
      )} />
    </div>
  );
}
