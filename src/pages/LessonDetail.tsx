import { useParams, useNavigate } from 'react-router-dom';
import { playClickSound } from '@/lib/sfx';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { ArrowLeft, BookOpen, PenLine, Dumbbell, RotateCcw, HeartCrack, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { curriculum } from '@/data/curriculum';
import { useProgress } from '@/contexts/ProgressContext';
import { useSpacedRepetition } from '@/hooks/useSpacedRepetition';
import FlashcardView from '@/components/lesson/FlashcardView';
import GrammarView from '@/components/lesson/GrammarView';
import ExerciseView from '@/components/lesson/ExerciseView';
import { applyDifficulty, getCrownLabel, getCrownXpMultiplier } from '@/lib/crownDifficulty';
import CelebrationModal from '@/components/lesson/CelebrationModal';
import OutOfHeartsModal from '@/components/lesson/OutOfHeartsModal';
import { Exercise, Section } from '@/types/curriculum';

// Wrapper to memoize applyDifficulty so exercises don't reshuffle on re-render
function MemoizedExerciseSection({ exercises, lessonId, currentCrown, handleComplete, setActiveSectionIndex, isMini }: {
  exercises: Exercise[];
  lessonId: string;
  currentCrown: number;
  handleComplete: () => void;
  setActiveSectionIndex: (i: number | null) => void;
  isMini?: boolean;
}) {
  const adjustedExercises = useMemo(() => applyDifficulty(exercises, currentCrown), [exercises, currentCrown]);
  return <ExerciseView exercises={adjustedExercises} lessonId={lessonId} onComplete={handleComplete} onBack={() => setActiveSectionIndex(null)} isMini={isMini} />;
}

const sectionIcons = {
  vocabulary: BookOpen,
  grammar: PenLine,
  exercise: Dumbbell,
  review: RotateCcw,
};

const sectionColors = {
  vocabulary: { bg: 'bg-primary/5', border: 'border-l-primary', icon: 'text-primary', iconBg: 'bg-primary/10', badge: 'bg-primary/15 text-primary', label: 'Từ vựng' },
  grammar: { bg: 'bg-purple-50 dark:bg-purple-500/10', border: 'border-l-purple-500', icon: 'text-purple-500', iconBg: 'bg-purple-500/10', badge: 'bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400', label: 'Ngữ pháp' },
  exercise: { bg: 'bg-orange-50 dark:bg-orange-500/10', border: 'border-l-orange-500', icon: 'text-orange-500', iconBg: 'bg-orange-500/10', badge: 'bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400', label: 'Luyện tập' },
  'exercise-full': { bg: 'bg-red-50 dark:bg-red-500/10', border: 'border-l-red-500', icon: 'text-red-500', iconBg: 'bg-red-500/10', badge: 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400', label: 'Kiểm tra' },
  review: { bg: 'bg-blue-50 dark:bg-blue-500/10', border: 'border-l-blue-500', icon: 'text-blue-500', iconBg: 'bg-blue-500/10', badge: 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400', label: 'Ôn tập' },
};

function getSectionColor(section: Section) {
  if (section.type === 'exercise' && !section.isMini) return sectionColors['exercise-full'];
  return sectionColors[section.type];
}

export default function LessonDetail() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { progress, addXp, completeLesson, setCrownLevel } = useProgress();
  const { addWordsToReview } = useSpacedRepetition();
  const [activeSectionIndex, setActiveSectionIndex] = useState<number | null>(null);
  const [celebration, setCelebration] = useState<{ xp: number; crown: number } | null>(null);
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set());
  const [showOutOfHeartsModal, setShowOutOfHeartsModal] = useState(false);
  const duelUnlocked = progress.completedLessons.includes('b1-l3');

  const lesson = curriculum.flatMap(b => b.lessons).find(l => l.id === lessonId);
  if (!lesson) return <div className="py-8 text-center">Không tìm thấy bài học.</div>;

  const currentCrown = progress.crownLevels[lesson.id] || 0;

  const activeSection = activeSectionIndex !== null ? lesson.sections[activeSectionIndex] : null;

  if (activeSection) {
    const handleComplete = () => {
      // Auto-add vocabulary words to spaced repetition
      if (activeSection.type === 'vocabulary' && activeSection.vocabulary) {
        addWordsToReview(activeSection.vocabulary, lesson.id);
      }

      // XP is now awarded per correct answer in ExerciseView, no need to add here

      setCompletedSections(prev => new Set(prev).add(activeSectionIndex!));
      const isLastSection = activeSectionIndex === lesson.sections.length - 1;
      if (isLastSection) {
        completeLesson(lesson.id);
        setCrownLevel(lesson.id, currentCrown + 1);
        setActiveSectionIndex(null);
        setCelebration({ xp: 0, crown: currentCrown });
        return;
      }
      setActiveSectionIndex(null);
    };

    if (activeSection.type === 'vocabulary' && activeSection.vocabulary) {
      return <FlashcardView words={activeSection.vocabulary} lessonId={lesson.id} onComplete={handleComplete} onBack={() => setActiveSectionIndex(null)} />;
    }
    if (activeSection.type === 'grammar' && activeSection.grammar) {
      return <GrammarView points={activeSection.grammar} lessonId={lesson.id} onComplete={handleComplete} onBack={() => setActiveSectionIndex(null)} />;
    }
    if ((activeSection.type === 'exercise' || activeSection.type === 'review') && activeSection.exercises) {
      return <MemoizedExerciseSection exercises={activeSection.exercises} lessonId={lesson.id} currentCrown={currentCrown} handleComplete={handleComplete} setActiveSectionIndex={setActiveSectionIndex} isMini={activeSection.isMini} />;
    }

    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground">Nội dung đang được cập nhật...</p>
        <Button variant="outline" className="mt-4" onClick={() => setActiveSectionIndex(null)}>Quay lại</Button>
      </div>
    );
  }

  return (
    <div className="py-4 space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => { playClickSound(); navigate('/learn'); }}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h2 className="text-xl font-extrabold">{lesson.titleChinese}</h2>
          <p className="text-sm text-muted-foreground">{lesson.title} · +{lesson.xpReward} XP</p>
        </div>
      </div>

      {/* Crown progress */}
      <div className="rounded-2xl bg-card border border-border p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-center gap-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.span
              key={i}
              initial={i === currentCrown - 1 ? { scale: 0 } : {}}
              animate={{ scale: 1 }}
              className={cn("text-2xl transition-all", i < currentCrown ? "opacity-100" : "opacity-20 grayscale")}
            >
              ⭐
            </motion.span>
          ))}
        </div>
        {currentCrown < 5 ? (
          <div className="text-center space-y-1">
            <p className="text-sm font-extrabold">
              {getCrownLabel(currentCrown).emoji} Cấp tiếp: <span className={getCrownLabel(currentCrown).color}>{getCrownLabel(currentCrown).label}</span>
            </p>
            <p className="text-xs text-muted-foreground">
              XP thưởng: x{getCrownXpMultiplier(currentCrown)} · {currentCrown >= 2 ? 'Không có gợi ý' : currentCrown >= 1 ? 'Thứ tự ngẫu nhiên' : 'Bình thường'}
            </p>
          </div>
        ) : (
          <p className="text-center text-sm font-extrabold text-secondary">🌟 Đã đạt cấp tối đa!</p>
        )}
      </div>

      <div className="space-y-3">
        {lesson.sections.map((section, i) => {
          const Icon = sectionIcons[section.type];
          const colors = getSectionColor(section);
          const done = completedSections.has(i);
          const hasContent = (section.vocabulary && section.vocabulary.length > 0) ||
            (section.grammar && section.grammar.length > 0) ||
            (section.exercises && section.exercises.length > 0);
          const noHearts = progress.hearts <= 0;

          return (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                'flex items-center gap-3 rounded-2xl p-4 border-l-4 border border-border shadow-sm cursor-pointer transition-all',
                colors.border,
                noHearts ? 'bg-destructive/5 opacity-70 cursor-not-allowed' :
                done ? 'bg-primary/5 opacity-80' :
                hasContent ? `${colors.bg} hover:shadow-md` : 'bg-muted/30 opacity-60 cursor-not-allowed',
              )}
              onClick={() => {
                if (noHearts) {
                  setShowOutOfHeartsModal(true);
                  return;
                }
                if (hasContent) {
                  playClickSound();
                  setActiveSectionIndex(i);
                }
              }}
            >
              <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl', colors.iconBg)}>
                <Icon className={cn('h-5 w-5', colors.icon)} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold">{section.title}</p>
                  <span className={cn('text-[10px] font-bold px-1.5 py-0.5 rounded-full', colors.badge)}>
                    {colors.label}
                  </span>
                  {done && <Check className="h-3.5 w-3.5 text-primary" />}
                </div>
                <p className="text-xs text-muted-foreground">
                  {noHearts ? '💔 Hết tim' :
                    section.type === 'vocabulary' && section.vocabulary ? `${section.vocabulary.length} từ` :
                    section.type === 'grammar' && section.grammar ? `${section.grammar.length} điểm ngữ pháp` :
                      section.exercises ? `${section.exercises.length} câu hỏi` :
                        'Sắp có'}
                </p>
              </div>
              {noHearts && <HeartCrack className="h-5 w-5 text-destructive shrink-0" />}
            </motion.div>
          );
        })}
      </div>
      <CelebrationModal
        open={!!celebration}
        xpEarned={celebration?.xp || 0}
        crownLevel={celebration?.crown || 0}
        lessonTitle={`${lesson.titleChinese} ${lesson.title}`}
        onClose={() => setCelebration(null)}
      />
      <OutOfHeartsModal
        open={showOutOfHeartsModal}
        onClose={() => setShowOutOfHeartsModal(false)}
        duelUnlocked={duelUnlocked}
      />
    </div>
  );
}
