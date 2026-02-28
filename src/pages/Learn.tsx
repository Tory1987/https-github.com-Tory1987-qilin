import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Lock, CheckCircle2, Star, Sparkles, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { curriculum } from '@/data/curriculum';
import { useProgress } from '@/contexts/ProgressContext';
import { playClickSound } from '@/lib/sfx';

const bookEmojis = ['🐉', '🏮', '🎋', '🏯'];

const bookGradients: Record<string, string> = {
  primary: 'from-primary/20 to-primary/5',
  secondary: 'from-secondary/20 to-secondary/5',
  accent: 'from-accent/20 to-accent/5',
  xp: 'from-xp/20 to-xp/5',
};

const bookBorders: Record<string, string> = {
  primary: 'border-primary/40',
  secondary: 'border-secondary/40',
  accent: 'border-accent/40',
  xp: 'border-xp/40',
};

const bookBadgeBg: Record<string, string> = {
  primary: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  accent: 'bg-accent text-accent-foreground',
  xp: 'bg-xp text-xp-foreground',
};

const lessonNodeBg: Record<string, string> = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  accent: 'bg-accent',
  xp: 'bg-xp',
};

const lessonNodeRing: Record<string, string> = {
  primary: 'ring-primary/30',
  secondary: 'ring-secondary/30',
  accent: 'ring-accent/30',
  xp: 'ring-xp/30',
};

function CrownIndicator({ level }: { level: number }) {
  if (level === 0) return null;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={cn("text-xs", i < level ? "opacity-100" : "opacity-20")}>⭐</span>
      ))}
    </div>
  );
}

export default function Learn() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const focusLessonId = searchParams.get('focus');
  const { progress } = useProgress();
  const lessonRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Scroll to focused lesson
  useEffect(() => {
    if (focusLessonId && lessonRefs.current[focusLessonId]) {
      setTimeout(() => {
        lessonRefs.current[focusLessonId]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 400);
    }
  }, [focusLessonId]);
  return (
    <div className="space-y-8 pb-24 px-2" data-tour="lesson-list">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center pt-2 space-y-1"
      >
        <h1 className="text-2xl font-extrabold flex items-center justify-center gap-2">
          <Sparkles className="h-6 w-6 text-secondary" />
          Hành trình học
          <Sparkles className="h-6 w-6 text-secondary" />
        </h1>
        <p className="text-sm text-muted-foreground">Chinh phục từng bài để lên cấp!</p>
      </motion.div>

      {curriculum.map((book, bi) => {
        const completedCount = book.lessons.filter((l) =>
          progress.completedLessons.includes(l.id)
        ).length;
        const totalLessons = book.lessons.length;
        const progressPercent = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;

        return (
          <motion.div
            key={book.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: bi * 0.15, type: 'spring', stiffness: 200, damping: 20 }}
            className="space-y-4"
          >
            {/* Book header card */}
            <div
              className={cn(
                'rounded-3xl border-2 p-4 bg-gradient-to-br shadow-sm',
                bookGradients[book.color],
                bookBorders[book.color]
              )}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  className="text-4xl"
                  animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  {bookEmojis[bi]}
                </motion.div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        'text-xs font-extrabold px-2 py-0.5 rounded-full',
                        bookBadgeBg[book.color]
                      )}
                    >
                      {book.titleChinese}
                    </span>
                    <span className="text-sm font-bold">{book.title}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">
                    {book.description}
                  </p>
                </div>
                {progressPercent === 100 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <Trophy className="h-6 w-6 text-secondary" />
                  </motion.div>
                )}
              </div>

              {/* Progress bar */}
              <div className="mt-3 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-muted-foreground">
                    Tiến độ
                  </span>
                  <span className="font-extrabold">
                    {completedCount}/{totalLessons} bài
                  </span>
                </div>
                <div className="h-3 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className={cn('h-full rounded-full', lessonNodeBg[book.color])}
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.8, delay: bi * 0.15 + 0.3, ease: 'easeOut' }}
                  />
                </div>
                {progressPercent > 0 && progressPercent < 100 && (
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalLessons }).map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          'h-1.5 flex-1 rounded-full transition-colors',
                          i < completedCount
                            ? lessonNodeBg[book.color]
                            : 'bg-muted'
                        )}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Lesson nodes - winding path */}
            <div className="relative pl-6">
              {/* Vertical path line */}
              <div className="absolute left-10 top-0 bottom-0 w-0.5 bg-border" />

              <div className="space-y-3">
                {book.lessons.map((lesson, li) => {
                  const completed = progress.completedLessons.includes(lesson.id);
                  const prevCompleted =
                    li > 0 && progress.completedLessons.includes(book.lessons[li - 1].id);
                  const prevBookLastCompleted =
                    li === 0 && bi > 0
                      ? progress.completedLessons.includes(
                          curriculum[bi - 1].lessons[curriculum[bi - 1].lessons.length - 1].id
                        )
                      : false;
                  const unlocked =
                    lesson.unlocked ||
                    completed ||
                    (li === 0 && bi === 0) ||
                    prevCompleted ||
                    prevBookLastCompleted;
                  const isCurrent = unlocked && !completed;
                  const crownLevel = progress.crownLevels[lesson.id] || 0;

                  // Zigzag offset
                  const offsetX = li % 2 === 0 ? 0 : 40;

                  return (
                    <motion.div
                      key={lesson.id}
                      ref={(el) => { lessonRefs.current[lesson.id] = el; }}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: bi * 0.15 + li * 0.08,
                        type: 'spring',
                        stiffness: 250,
                        damping: 20,
                      }}
                      style={{ marginLeft: offsetX }}
                      className="relative"
                    >
                      {/* Node circle on the path */}
                      <div
                        className={cn(
                          'absolute -left-6 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full border-2 z-10',
                          completed && `${lessonNodeBg[book.color]} border-card`,
                          isCurrent && `${lessonNodeBg[book.color]} border-card ring-4 ${lessonNodeRing[book.color]}`,
                          !unlocked && 'bg-muted border-border'
                        )}
                        style={{ left: -offsetX - 24 }}
                      >
                        {completed && (
                          <CheckCircle2 className="h-full w-full text-card p-0.5" />
                        )}
                      </div>

                      {/* Lesson card */}
                      <motion.div
                        whileHover={unlocked ? { scale: 1.03, y: -2 } : {}}
                        whileTap={unlocked ? { scale: 0.97 } : {}}
                        className={cn(
                          'flex items-center gap-3 rounded-2xl p-3.5 border-2 transition-all cursor-pointer',
                          completed && `bg-card border-primary/20 shadow-sm`,
                          isCurrent && `bg-card border-primary shadow-md`,
                          !unlocked && 'bg-muted/30 border-border opacity-50 cursor-not-allowed'
                        )}
                        onClick={() => { if (unlocked) { playClickSound(); navigate(`/lesson/${lesson.id}`); } }}
                      >
                        {/* Lesson number bubble */}
                        <div
                          className={cn(
                            'flex h-11 w-11 items-center justify-center rounded-2xl font-extrabold text-base shrink-0 transition-colors',
                            completed && `${lessonNodeBg[book.color]} text-card`,
                            isCurrent && `${lessonNodeBg[book.color]} text-card`,
                            !unlocked && 'bg-muted text-muted-foreground'
                          )}
                        >
                          {completed ? (
                            <Star className="h-5 w-5 fill-current" />
                          ) : !unlocked ? (
                            <Lock className="h-4 w-4" />
                          ) : (
                            lesson.number
                          )}
                        </div>

                        {/* Lesson info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-extrabold truncate">
                            {lesson.titleChinese}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {lesson.title}
                          </p>
                          {/* Crown indicator */}
                          {crownLevel > 0 && <CrownIndicator level={crownLevel} />}
                        </div>

                        {/* Status indicators */}
                        {completed && crownLevel >= 5 ? (
                          <span className="text-xs font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded-full shrink-0">
                            ⭐ Max
                          </span>
                        ) : completed ? (
                          <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full shrink-0">
                            ✓ Xong
                          </span>
                        ) : null}
                        {isCurrent && (
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="shrink-0"
                          >
                            <span className="text-xs font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">
                              ▶ Học
                            </span>
                          </motion.div>
                        )}
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
