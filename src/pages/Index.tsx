import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Flame, Zap, Trophy, ArrowRight, Target, CheckCircle2, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useProgress } from '@/contexts/ProgressContext';
import { curriculum, getXpProgress, XP_PER_LEVEL } from '@/data/curriculum';
import QilinMood, { getQilinMood } from '@/components/QilinMood';
import { fireLevelUpConfetti } from '@/lib/confetti';
import { playFanfare, playClickSound } from '@/lib/sfx';
import { useDailyQuests } from '@/hooks/useDailyQuests';
import { useAchievements } from '@/hooks/useAchievements';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

export default function Index() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { progress } = useProgress();
  const xpInLevel = getXpProgress(progress.xp);
  const totalLessons = curriculum.reduce((sum, b) => sum + b.lessons.length, 0);
  const completedCount = progress.completedLessons.length;
  const { mood, message } = getQilinMood(progress);
  const prevLevelRef = useRef(progress.level);
  const { quests } = useDailyQuests();
  const { totalEarned, all } = useAchievements();
  const [topUsers, setTopUsers] = useState<any[]>([]);

  // Load mini leaderboard
  useEffect(() => {
    supabase
      .from('leaderboard_view' as any)
      .select('*')
      .then(({ data }) => {
        if (data) {
          const sorted = (data as any[]).sort((a, b) => b.xp - a.xp).slice(0, 5);
          setTopUsers(sorted);
        }
      });
  }, []);

  // Detect level up
  useEffect(() => {
    if (progress.level > prevLevelRef.current) {
      fireLevelUpConfetti();
      playFanfare();
    }
    prevLevelRef.current = progress.level;
  }, [progress.level]);

  // Find next lesson
  const nextLesson = curriculum
    .flatMap(b => b.lessons)
    .find(l => l.unlocked && !progress.completedLessons.includes(l.id))
    || curriculum[0].lessons[0];

  const questIcons: Record<string, string> = { xp: '⚡', lessons: '📚', perfect: '🎯' };

  return (
    <div className="space-y-6 py-4">
      {/* Qilin Mascot */}
      <QilinMood mood={mood} message={message} size="lg" />

      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-extrabold text-foreground">Chào bạn! 👋</h2>
        <p className="mt-1 text-muted-foreground">Hãy tiếp tục học tiếng Trung nào!</p>
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-3"
      >
        <div data-tour="stat-streak" className="flex flex-col items-center rounded-2xl bg-card p-3 shadow-sm border border-border">
          <Flame className="h-7 w-7 text-streak" />
          <span className="mt-1 text-xl font-extrabold text-streak">{progress.streak}</span>
          <span className="text-[11px] font-semibold text-muted-foreground">Streak</span>
        </div>
        <div data-tour="stat-xp" className="flex flex-col items-center rounded-2xl bg-card p-3 shadow-sm border border-border">
          <Zap className="h-7 w-7 text-xp" />
          <span className="mt-1 text-xl font-extrabold text-xp">{progress.xp}</span>
          <span className="text-[11px] font-semibold text-muted-foreground">XP</span>
        </div>
        <div data-tour="stat-level" className="flex flex-col items-center rounded-2xl bg-card p-3 shadow-sm border border-border">
          <Trophy className="h-7 w-7 text-secondary" />
          <span className="mt-1 text-xl font-extrabold text-secondary">Lv.{progress.level}</span>
          <span className="text-[11px] font-semibold text-muted-foreground">Cấp độ</span>
        </div>
      </motion.div>

      {/* Continue button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }}
      >
        <Button
          data-tour="continue-btn"
          size="lg"
          className="w-full h-14 text-lg font-extrabold rounded-2xl shadow-lg animate-pulse-glow"
          onClick={() => { playClickSound(); navigate(`/learn?focus=${nextLesson.id}`); }}
        >
          <BookOpen className="mr-2 h-6 w-6" />
          Học tiếp — {nextLesson.titleChinese}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </motion.div>

      {/* Daily Quests */}
      {quests.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="rounded-2xl bg-card p-4 shadow-sm border border-border space-y-3"
        >
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-secondary" />
            <h3 className="text-sm font-extrabold">Nhiệm vụ hôm nay</h3>
          </div>
          {quests.map(quest => (
            <div key={quest.id} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base">{questIcons[quest.questType] || '🎯'}</span>
                  <span className="text-xs font-bold">{quest.questTitle}</span>
                </div>
                {quest.completed ? (
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                ) : (
                  <span className="text-xs text-muted-foreground font-bold">{quest.progress}/{quest.target}</span>
                )}
              </div>
              <Progress
                value={quest.target > 0 ? (quest.progress / quest.target) * 100 : 0}
                className="h-2"
              />
            </div>
          ))}
        </motion.div>
      )}

      {/* Level progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="rounded-2xl bg-card p-4 shadow-sm border border-border"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold">Cấp {progress.level}</span>
          <span className="text-xs text-muted-foreground">{xpInLevel}/{XP_PER_LEVEL} XP</span>
        </div>
        <Progress value={(xpInLevel / XP_PER_LEVEL) * 100} className="h-3" />
      </motion.div>

      {/* Achievements summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22 }}
        className="rounded-2xl bg-card p-4 shadow-sm border border-border cursor-pointer hover:shadow-md transition-shadow"
        onClick={() => { playClickSound(); navigate('/profile'); }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">🏅</span>
            <span className="text-sm font-extrabold">Huy hiệu</span>
          </div>
          <span className="text-xs font-bold text-muted-foreground">{totalEarned}/{all.length}</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {all.slice(0, 8).map(a => (
            <span
              key={a.id}
              className={`text-lg ${progress.badges.includes(a.id) ? '' : 'grayscale opacity-30'}`}
              title={a.name}
            >
              {a.icon}
            </span>
          ))}
          {all.length > 8 && <span className="text-xs text-muted-foreground self-center ml-1">+{all.length - 8}</span>}
        </div>
      </motion.div>

      {/* Mini Leaderboard */}
      {topUsers.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24 }}
          className="rounded-2xl bg-card p-4 shadow-sm border border-border cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => { playClickSound(); navigate('/leaderboard'); }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-secondary" />
              <span className="text-sm font-extrabold">Bảng xếp hạng</span>
            </div>
            <span className="text-xs font-bold text-primary">Xem tất cả →</span>
          </div>
          <div className="space-y-2">
            {topUsers.map((u: any, i: number) => {
              const isMe = u.user_id === user?.id;
              const emojis = ['🥇', '🥈', '🥉'];
              return (
                <div key={u.user_id} className={cn('flex items-center gap-2 py-1', isMe && 'text-primary')}>
                  <span className="w-5 text-center text-sm">{i < 3 ? emojis[i] : `${i + 1}`}</span>
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden shrink-0">
                    {u.avatar_url ? (
                      <img src={u.avatar_url} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-[10px] font-bold text-primary">
                        {(u.display_name || '?')[0].toUpperCase()}
                      </span>
                    )}
                  </div>
                  <span className={cn('text-xs font-bold flex-1 truncate', isMe && 'text-primary')}>
                    {u.display_name || 'Học viên'}{isMe ? ' (bạn)' : ''}
                  </span>
                  <span className="text-xs font-extrabold">{u.xp} XP</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Overall progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="rounded-2xl bg-card p-4 shadow-sm border border-border"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold">Tiến độ tổng thể</span>
          <span className="text-xs text-muted-foreground">{completedCount}/{totalLessons} bài</span>
        </div>
        <Progress value={totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0} className="h-3" />
      </motion.div>

      {/* Books overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-3"
      >
        <h3 className="text-lg font-extrabold">Giáo trình Đương Đại</h3>
        {curriculum.map((book) => {
          const bookCompleted = book.lessons.filter(l => progress.completedLessons.includes(l.id)).length;
          return (
            <div
              key={book.id}
              className="flex items-center gap-3 rounded-2xl bg-card p-3 shadow-sm border border-border cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => { playClickSound(); navigate('/learn'); }}
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-${book.color}/10 text-${book.color}`}>
                <span className="text-xl font-extrabold">{book.number}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">{book.titleChinese} {book.title}</p>
                <p className="text-xs text-muted-foreground truncate">{book.description}</p>
              </div>
              <span className="text-xs font-semibold text-muted-foreground">{bookCompleted}/{book.lessons.length}</span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
