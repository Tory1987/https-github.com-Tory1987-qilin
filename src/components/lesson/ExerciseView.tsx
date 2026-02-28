import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, XCircle, ArrowRight, Volume2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Exercise } from '@/types/curriculum';
import { useProgress } from '@/contexts/ProgressContext';
import { useAuth } from '@/contexts/AuthContext';
import { fireConfetti } from '@/lib/confetti';
import { playCorrectSound, playWrongSound, playFanfare, playClickSound } from '@/lib/sfx';
import { hapticSuccess, hapticError } from '@/hooks/useNative';
import { supabase } from '@/integrations/supabase/client';
import { curriculum } from '@/data/curriculum';
import ChineseKeyboard from '@/components/lesson/ChineseKeyboard';
import { buildVocabMap } from '@/lib/chineseTokenizer';
import ChineseText from '@/components/ChineseText';
import ChineseTokenized from '@/components/ChineseTokenized';
import { speakChinese } from '@/lib/tts';
import qilinExcited from '@/assets/qilin-excited.png';
import qilinSad from '@/assets/qilin-sad.png';
import qilinProud from '@/assets/qilin-proud.png';
const qilinEncouraging = qilinExcited;
import OutOfHeartsModal from '@/components/lesson/OutOfHeartsModal';

interface Props {
  exercises: Exercise[];
  lessonId: string;
  onComplete: (bonusXp?: number) => void;
  onBack: () => void;
  isMini?: boolean;
}

// ── Matching sub-component ──
function MatchingExercise({
  pairs,
  showResult,
  onComplete,
  vocabMap,
}: {
  pairs: string[]; // ["你|bạn", "好|tốt", ...]
  showResult: boolean;
  onComplete: (correct: boolean) => void;
  vocabMap: Record<string, string>;
}) {
  const [leftItems] = useState(() => pairs.map(p => p.split('|')[0]).sort(() => Math.random() - 0.5));
  const [rightItems] = useState(() => pairs.map(p => p.split('|')[1]).sort(() => Math.random() - 0.5));
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matched, setMatched] = useState<Record<string, string>>({});
  const [wrongPair, setWrongPair] = useState<{ l: string; r: string } | null>(null);

  const correctMap = Object.fromEntries(pairs.map(p => { const [l, r] = p.split('|'); return [l, r]; }));

  const handleLeftTap = (item: string) => {
    if (showResult || matched[item]) return;
    playClickSound();
    setSelectedLeft(item);
    setWrongPair(null);
  };

  const handleRightTap = (item: string) => {
    if (showResult || !selectedLeft || Object.values(matched).includes(item)) return;
    playClickSound();
    if (correctMap[selectedLeft] === item) {
      setMatched(prev => ({ ...prev, [selectedLeft]: item }));
      setSelectedLeft(null);
      if (Object.keys(matched).length + 1 === pairs.length) {
        onComplete(true);
      }
    } else {
      setWrongPair({ l: selectedLeft, r: item });
      setTimeout(() => { setWrongPair(null); setSelectedLeft(null); }, 600);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="space-y-2">
        {leftItems.map(item => {
          const hasChinese = /[\u4E00-\u9FFF]/.test(item);
          return (
            <button
              key={item}
              onClick={() => handleLeftTap(item)}
              className={cn(
                'w-full rounded-xl border-2 p-4 text-center font-semibold text-4xl transition-all font-hanzi',
                matched[item] ? 'border-primary bg-primary/10 text-primary opacity-60' :
                selectedLeft === item ? 'border-primary bg-primary/5 ring-2 ring-primary/30' :
                wrongPair?.l === item ? 'border-destructive bg-destructive/10 animate-shake' :
                'border-border bg-card hover:border-primary/50',
              )}
              disabled={!!matched[item] || showResult}
            >
              {hasChinese ? (
                <ChineseTokenized text={item} vocabMap={vocabMap} />
              ) : item}
            </button>
          );
        })}
      </div>
      <div className="space-y-2">
        {rightItems.map(item => (
          <button
            key={item}
            onClick={() => handleRightTap(item)}
            className={cn(
              'w-full rounded-xl border-2 p-4 text-center font-semibold text-2xl transition-all',
              Object.values(matched).includes(item) ? 'border-primary bg-primary/10 text-primary opacity-60' :
              wrongPair?.r === item ? 'border-destructive bg-destructive/10 animate-shake' :
              'border-border bg-card hover:border-primary/50',
            )}
            disabled={Object.values(matched).includes(item) || showResult}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
// ── Listening sub-component ──
function ListeningExercise({
  exercise,
  showResult,
  onAnswer,
}: {
  exercise: Exercise;
  showResult: boolean;
  onAnswer: (option: string) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);

  const speak = useCallback(() => {
    const text = exercise.questionAudio || exercise.question;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'zh-TW';
    utter.rate = 0.8;
    speechSynthesis.speak(utter);
  }, [exercise]);

  // Auto-play on mount
  useEffect(() => { speak(); }, [speak]);

  const handleSelect = (option: string) => {
    if (showResult) return;
    playClickSound();
    setSelected(option);
    onAnswer(option);
  };

  const isCorrect = (option: string) => option === exercise.correctAnswer;

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <button
          onClick={speak}
          className="flex items-center gap-3 rounded-2xl bg-primary/10 border-2 border-primary/30 px-8 py-5 transition-all hover:bg-primary/20 active:scale-95"
        >
          <Volume2 className="h-10 w-10 text-primary" />
          <span className="text-sm font-bold text-primary">Nhấn để nghe</span>
        </button>
      </div>

      <div className="space-y-2">
        {exercise.options?.map(option => (
          <button
            key={option}
            onClick={() => handleSelect(option)}
            className={cn(
              'w-full text-left rounded-2xl border-2 p-4 font-semibold text-2xl transition-all',
              !showResult && 'border-border bg-card hover:border-primary/50 hover:bg-primary/5 active:scale-[0.98]',
              showResult && isCorrect(option) && 'border-primary bg-primary/10 text-primary',
              showResult && selected === option && !isCorrect(option) && 'border-destructive bg-destructive/10 text-destructive animate-shake',
              showResult && selected !== option && !isCorrect(option) && 'opacity-50',
            )}
            disabled={showResult}
          >
            <div className="flex items-center justify-between">
              {option}
              {showResult && isCorrect(option) && <CheckCircle2 className="h-5 w-5 text-primary" />}
              {showResult && selected === option && !isCorrect(option) && <XCircle className="h-5 w-5 text-destructive" />}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}


// ── Main ExerciseView ──
const normalizeAnswer = (s: string) =>
  s
    .trim()
    .normalize('NFC')
    .toLowerCase()
    .replace(/[\s]+/g, ' ')
    .replace(/[.,!?;:。，！？；：…""''\"\']+$/g, '');

// Word tile with hover/tap tooltip + auto voice
function WordTile({ word, vocabMap, onClick, className, disabled, children }: {
  word: string;
  vocabMap: Record<string, string>;
  onClick: () => void;
  className: string;
  disabled?: boolean;
  children?: React.ReactNode;
}) {
  const meaning = vocabMap[word];
  const hasChinese = /[\u4E00-\u9FFF]/.test(word);
  const [showTip, setShowTip] = useState(false);
  const spokeRef = useRef(false);

  const wrapperRef = useRef<HTMLSpanElement>(null);

  const toggle = useCallback(() => {
    setShowTip(prev => {
      if (!prev) {
        if (!spokeRef.current && hasChinese) {
          spokeRef.current = true;
          speakChinese(word);
        }
        return true;
      }
      spokeRef.current = false;
      return false;
    });
  }, [hasChinese, word]);

  // Close when clicking outside
  useEffect(() => {
    if (!showTip) return;
    const handler = (e: MouseEvent | TouchEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowTip(false);
        spokeRef.current = false;
      }
    };
    document.addEventListener('mousedown', handler, true);
    document.addEventListener('touchstart', handler, true);
    return () => {
      document.removeEventListener('mousedown', handler, true);
      document.removeEventListener('touchstart', handler, true);
    };
  }, [showTip]);

  return (
    <span
      ref={wrapperRef}
      className="relative inline-block"
      onClick={(e) => { e.stopPropagation(); toggle(); }}
      onTouchStart={(e) => { e.stopPropagation(); }}
    >
      <button onClick={onClick} className={cn(className, /[\u4E00-\u9FFF]/.test(word) && 'font-hanzi')} disabled={disabled}>
        {children || word}
      </button>
      <AnimatePresence>
        {showTip && meaning && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-[100] whitespace-nowrap rounded-xl bg-card text-foreground text-sm font-semibold px-3 py-2 shadow-lg border border-border pointer-events-none"
          >
            <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-card border-l border-t border-border" />
            {meaning}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

export default function ExerciseView({ exercises, lessonId, onComplete, onBack, isMini = false }: Props) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const vocabMap = buildVocabMap(lessonId);
  const [wrongExercises, setWrongExercises] = useState<Exercise[]>([]);
  const [retryMode, setRetryMode] = useState(false);
  const [retryIndex, setRetryIndex] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [totalBonusXp, setTotalBonusXp] = useState(0);
  const [xpPopup, setXpPopup] = useState<{ amount: number; multiplier: number; key: number } | null>(null);
  const { loseHeart, progress, addXp } = useProgress();
  const { user } = useAuth();
  const [outOfHearts, setOutOfHearts] = useState(false);
  const fillBlankOptionsRef = useRef<{ key: string; options: string[] } | null>(null);

  // Current exercise: either normal or retry
  const currentExercises = retryMode ? wrongExercises : exercises;
  const currentIndex = retryMode ? retryIndex : index;
  const ex = currentExercises[currentIndex];

  const getComboMultiplier = (c: number) => {
    if (c >= 10) return 3;
    if (c >= 5) return 2;
    if (c >= 3) return 1.5;
    return 1;
  };

  const handleCorrect = () => {
    if (!retryMode) {
      setCorrectCount(c => c + 1);
      const newCombo = combo + 1;
      setCombo(newCombo);
      setMaxCombo(m => Math.max(m, newCombo));
      const multiplier = getComboMultiplier(newCombo);
      const baseXp = 10;
      const earned = Math.round(baseXp * multiplier);
      if (multiplier > 1) {
        const bonus = Math.round((multiplier - 1) * baseXp);
        setTotalBonusXp(prev => prev + bonus);
      }
      // Award XP immediately per correct answer
      addXp(earned);
      // Show floating +XP popup
      setXpPopup({ amount: earned, multiplier, key: Date.now() });
    }
    playCorrectSound();
    hapticSuccess();
  };

  const handleWrong = () => {
    if (!retryMode) {
      const hasHearts = loseHeart();
      if (!hasHearts) {
        setOutOfHearts(true);
      }
    }
    setCombo(0);
    trackWrongExercise(ex);
    playWrongSound();
    hapticError();
  };

  const trackWrongExercise = (exercise: Exercise) => {
    if (!retryMode) {
      setWrongExercises(prev => {
        if (prev.find(e => e.id === exercise.id)) return prev;
        return [...prev, exercise];
      });
    }
  };

  // Save wrong exercises to SRS database
  const saveWrongToSRS = async () => {
    if (!user || wrongExercises.length === 0) return;
    for (const ex of wrongExercises) {
      await supabase.from('exercise_reviews' as any).upsert({
        user_id: user.id,
        exercise_id: ex.id,
        lesson_id: lessonId,
        question: ex.question,
        exercise_type: ex.type,
        options: ex.options || null,
        correct_answer: ex.correctAnswer,
        explanation: ex.explanation || null,
        next_review_date: new Date().toISOString().split('T')[0],
        repetitions: 0,
        interval_days: 0,
        ease_factor: 2.5,
      }, { onConflict: 'user_id,exercise_id' });
    }
  };

  const handleSelect = (option: string) => {
    if (showResult) return;
    playClickSound();
    setSelected(option);
    setShowResult(true);
    const correct = ex.type === 'fill-blank'
      ? normalizeAnswer(option) === normalizeAnswer(String(ex.correctAnswer))
      : option === ex.correctAnswer;
    if (correct) {
      handleCorrect();
    } else {
      handleWrong();
    }
  };

  const handleNext = () => {
    if (retryMode) {
      // In retry mode
      if (retryIndex >= wrongExercises.length - 1) {
        // Finished retrying, save to SRS and complete
        saveWrongToSRS();
        setFinished(true);
        setRetryMode(false);
        return;
      }
      setSelected(null);
      setShowResult(false);
      setOrderedWords([]);
      setAvailableWords([]);
      setRetryIndex(i => i + 1);
      return;
    }

    if (index >= exercises.length - 1) {
      if (wrongExercises.length > 0) {
        // Enter retry mode
        setRetryMode(true);
        setRetryIndex(0);
        setSelected(null);
        setShowResult(false);
        setOrderedWords([]);
        setAvailableWords([]);
        return;
      }
      setFinished(true);
      return;
    }
    setSelected(null);
    setShowResult(false);
    setOrderedWords([]);
    setAvailableWords([]);
    setIndex(i => i + 1);
  };

  // Sentence ordering state
  const [orderedWords, setOrderedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const sentenceInitRef = useRef<string | null>(null);

  // Initialize sentence-order words via effect to avoid setState during render
  useEffect(() => {
    const key = `${retryMode ? 'retry' : 'normal'}-${currentIndex}`;
    if (ex?.type === 'sentence-order' && ex.options && sentenceInitRef.current !== key) {
      sentenceInitRef.current = key;
      const shuffled = [...ex.options].sort(() => Math.random() - 0.5);
      setOrderedWords([]);
      setAvailableWords(shuffled);
    }
  }, [ex, currentIndex, retryMode]);

  const handleWordTap = (word: string) => {
    if (showResult) return;
    playClickSound();
    setOrderedWords(prev => [...prev, word]);
    setAvailableWords(prev => { const i = prev.indexOf(word); return [...prev.slice(0, i), ...prev.slice(i + 1)]; });
  };

  const handleWordRemove = (word: string, idx: number) => {
    if (showResult) return;
    playClickSound();
    setAvailableWords(prev => [...prev, word]);
    setOrderedWords(prev => [...prev.slice(0, idx), ...prev.slice(idx + 1)]);
  };

  const checkSentenceOrder = () => {
    setShowResult(true);
    if (JSON.stringify(orderedWords) === JSON.stringify(ex.correctAnswer)) {
      handleCorrect();
    } else {
      handleWrong();
    }
  };

  // Matching handler
  const handleMatchingComplete = (correct: boolean) => {
    setShowResult(true);
    if (correct) {
      handleCorrect();
    } else {
      handleWrong();
    }
  };

  // Listening handler
  const handleListeningAnswer = (option: string) => {
    setSelected(option);
    setShowResult(true);
    if (option === ex.correctAnswer) {
      handleCorrect();
    } else {
      handleWrong();
    }
  };

  const isCurrentCorrect = () => {
    if (ex.type === 'multiple-choice' || ex.type === 'listening' || ex.type === 'fill-blank') return normalizeAnswer(selected || '') === normalizeAnswer(String(ex.correctAnswer));
    if (ex.type === 'sentence-order') return JSON.stringify(orderedWords) === JSON.stringify(ex.correctAnswer);
    if (ex.type === 'matching') return true;
    return false;
  };

  // Fire confetti when finishing with perfect score
  useEffect(() => {
    if (finished && correctCount === exercises.length) {
      const t = setTimeout(() => { fireConfetti(); playFanfare(); }, 300);
      return () => clearTimeout(t);
    }
  }, [finished, correctCount, exercises.length]);

  const navigateToDuel = useNavigate();
  const duelUnlocked = progress.completedLessons.includes('b1-l3');

  if (outOfHearts) {
    return (
      <>
        <div className="py-8 text-center">
          <Button variant="outline" className="rounded-xl" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại
          </Button>
        </div>
        <OutOfHeartsModal
          open={true}
          onClose={onBack}
          correctCount={correctCount}
          totalCount={exercises.length}
          duelUnlocked={duelUnlocked}
        />
      </>
    );
  }

  if (finished) {
    const isPerfect = correctCount === exercises.length;
    const isGood = correctCount > exercises.length / 2;
    const finishImage = isPerfect ? qilinProud : isGood ? qilinExcited : qilinEncouraging;
    const finishMsg = isPerfect ? '完美！Hoàn hảo! Qilin tự hào lắm!' : isGood ? '不錯！Tốt lắm! Tiếp tục phát huy!' : '加油！Cố thêm chút nữa nhé!';

    return (
      <div className="py-8 text-center space-y-4">
        <motion.img
          src={finishImage}
          alt="Qilin"
          className="h-28 w-28 mx-auto rounded-full border-2 border-primary/30 shadow-lg object-cover bg-card"
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-sm font-bold text-primary"
        >
          {finishMsg}
        </motion.p>
        <h2 className="text-2xl font-extrabold">Kết quả</h2>
        <p className="text-lg">Đúng <span className="text-primary font-extrabold">{correctCount}</span>/{exercises.length} câu</p>
        
        {/* Combo & Bonus XP */}
        {maxCombo >= 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 rounded-full bg-secondary/10 border border-secondary/30 px-4 py-2"
          >
            <span className="text-lg">🔥</span>
            <span className="text-sm font-bold text-secondary">Combo tối đa: x{maxCombo}</span>
            {totalBonusXp > 0 && (
              <span className="text-xs font-bold text-xp bg-xp/10 px-2 py-0.5 rounded-full">+{totalBonusXp} XP bonus</span>
            )}
          </motion.div>
        )}

        {wrongExercises.length > 0 && (
          <p className="text-sm text-muted-foreground">📝 {wrongExercises.length} câu sai đã được lưu vào ôn tập</p>
        )}
        <Button size="lg" className="rounded-xl" onClick={() => onComplete(totalBonusXp)}>Tiếp tục</Button>
      </div>
    );
  }

  return (
    <div className="pb-20 space-y-1.5">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={onBack}><ArrowLeft className="h-5 w-5" /></Button>
        <span className="text-sm font-bold text-muted-foreground">
          {retryMode ? `🔄 Ôn lại ${retryIndex + 1}/${wrongExercises.length}` : `${index + 1}/${exercises.length}`}
        </span>
        <div className="w-10" />
      </div>

      {retryMode && (
        <div className="rounded-xl bg-destructive/10 border border-destructive/30 px-3 py-2 text-center">
          <p className="text-xs font-bold text-destructive">🔄 Ôn lại các câu sai — Trả lời đúng để tiếp tục!</p>
        </div>
      )}

      {/* Floating +XP popup */}
      <div className="relative flex justify-center h-0">
        <AnimatePresence>
          {xpPopup && (
            <motion.div
              key={xpPopup.key}
              initial={{ opacity: 0, y: 0, scale: 0.5 }}
              animate={{ opacity: 1, y: -24, scale: 1 }}
              exit={{ opacity: 0, y: -48, scale: 0.8 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              onAnimationComplete={() => setXpPopup(null)}
              className="absolute z-50 pointer-events-none"
            >
              <span className={cn(
                "text-sm font-extrabold drop-shadow-lg",
                xpPopup.multiplier >= 3 ? "text-destructive" :
                xpPopup.multiplier >= 2 ? "text-secondary" :
                "text-primary"
              )}>
                +{xpPopup.amount} XP
                {xpPopup.multiplier > 1 && (
                  <span className="text-xs ml-0.5">x{xpPopup.multiplier}</span>
                )}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Combo indicator - inline with progress bar */}
      {!retryMode && combo >= 3 && (
        <motion.div
          key={combo}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex items-center justify-center"
        >
          <span className="text-xs font-bold text-secondary bg-secondary/10 border border-secondary/30 rounded-full px-2.5 py-0.5">
            🔥 Combo x{combo}! {getComboMultiplier(combo) > 1 && `(${getComboMultiplier(combo)}x XP)`}
          </span>
        </motion.div>
      )}

      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <motion.div className={cn("h-full rounded-full", retryMode ? "bg-destructive" : "bg-primary")} animate={{ width: `${((currentIndex + 1) / currentExercises.length) * 100}%` }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={`${retryMode ? 'retry' : 'normal'}-${currentIndex}`} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
          <p className={cn("font-bold mb-4", /[\u4E00-\u9FFF]/.test(ex.question) ? "text-3xl" : "text-xl")}>
            {ex.type === 'listening' ? '🔊 Nghe và chọn đáp án đúng' : (
              /[\u4E00-\u9FFF]/.test(ex.question) ? (
                <ChineseTokenized text={ex.question.replace(/["\u201C\u201D]/g, '')} vocabMap={vocabMap} autoSpeak />
              ) : ex.question
            )}
          </p>

          {/* Multiple choice */}
          {ex.type === 'multiple-choice' && ex.options && (
            <div className="space-y-2">
              {ex.options.map(option => {
                const hasChinese = /[\u4E00-\u9FFF]/.test(option);
                const meaning = hasChinese ? vocabMap[option] : undefined;
                return (
                  <WordTile
                    key={option}
                    word={option}
                    vocabMap={vocabMap}
                    onClick={() => handleSelect(option)}
                    className={cn(
                      `w-full text-left rounded-2xl border-2 p-4 font-semibold transition-all ${hasChinese ? 'text-4xl' : 'text-2xl'}`,
                      !showResult && 'border-border bg-card hover:border-primary/50 hover:bg-primary/5 active:scale-[0.98]',
                      showResult && option === ex.correctAnswer && 'border-primary bg-primary/10 text-primary',
                      showResult && selected === option && option !== ex.correctAnswer && 'border-destructive bg-destructive/10 text-destructive animate-shake',
                      showResult && selected !== option && option !== ex.correctAnswer && 'opacity-50',
                    )}
                    disabled={showResult}
                  >
                    <div className="flex items-center justify-between">
                      {option}
                      {showResult && option === ex.correctAnswer && <CheckCircle2 className="h-5 w-5 text-primary" />}
                      {showResult && selected === option && option !== ex.correctAnswer && <XCircle className="h-5 w-5 text-destructive" />}
                    </div>
                  </WordTile>
                );
              })}
            </div>
          )}

          {/* Matching */}
          {ex.type === 'matching' && (
            <MatchingExercise
              pairs={Array.isArray(ex.correctAnswer) ? ex.correctAnswer as string[] : ex.options || []}
              showResult={showResult}
              onComplete={handleMatchingComplete}
              vocabMap={vocabMap}
            />
          )}

          {/* Listening */}
          {ex.type === 'listening' && (
            <ListeningExercise
              exercise={ex}
              showResult={showResult}
              onAnswer={handleListeningAnswer}
            />
          )}

          {/* Sentence order */}
          {ex.type === 'sentence-order' && (
            <div className="space-y-4">
              <div className="min-h-[64px] rounded-2xl border-2 border-dashed border-border p-3 flex flex-wrap gap-2">
                {orderedWords.map((w, i) => (
                  <WordTile
                    key={`${w}-${i}`}
                    word={w}
                    vocabMap={vocabMap}
                    onClick={() => handleWordRemove(w, i)}
                    className={cn(
                      'rounded-xl px-4 py-3 text-4xl font-bold border-2 transition-all',
                      showResult && JSON.stringify(orderedWords) === JSON.stringify(ex.correctAnswer)
                        ? 'bg-primary/10 border-primary text-primary'
                        : showResult ? 'bg-destructive/10 border-destructive text-destructive'
                        : 'bg-primary/10 border-primary/30',
                    )}
                  />
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {availableWords.map((w, i) => (
                  <WordTile
                    key={`${w}-${i}`}
                    word={w}
                    vocabMap={vocabMap}
                    onClick={() => handleWordTap(w)}
                    className="rounded-xl px-4 py-3 text-4xl font-bold border-2 border-border bg-card hover:border-primary/50 transition-all"
                    disabled={showResult}
                  />
                ))}
              </div>
              {!showResult && availableWords.length === 0 && orderedWords.length > 0 && (
                <Button onClick={checkSentenceOrder} className="w-full rounded-xl">Kiểm tra</Button>
              )}
            </div>
          )}

          {/* Fill blank — shown as 4-option multiple choice */}
          {ex.type === 'fill-blank' && (() => {
            const correctStr = String(ex.correctAnswer);
            const cacheKey = `${retryMode ? 'retry' : 'normal'}-${currentIndex}`;

            // Cache options so they don't regenerate on re-render
            if (!fillBlankOptionsRef.current || fillBlankOptionsRef.current.key !== cacheKey) {
              const lesson = curriculum.flatMap(b => b.lessons).find(l => l.id === lessonId);
              const pool = new Set<string>();

              if (lesson) {
                for (const section of lesson.sections) {
                  if (section.vocabulary) {
                    for (const word of section.vocabulary) {
                      pool.add(word.traditional);
                      pool.add(word.meaning);
                    }
                  }
                  if (section.exercises) {
                    for (const exercise of section.exercises) {
                      const ans = String(exercise.correctAnswer);
                      if (ans && ans !== correctStr) pool.add(ans);
                    }
                  }
                }
              }
              pool.delete(correctStr);

              const isChinese = /[\u4E00-\u9FFF]/.test(correctStr);
              let candidates = Array.from(pool).filter(c => {
                const cIsChinese = /[\u4E00-\u9FFF]/.test(c);
                if (isChinese !== cIsChinese) return false;
                if (Math.abs(c.length - correctStr.length) > 3) return false;
                return true;
              });

              for (let i = candidates.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
              }
              const distractors = candidates.slice(0, 3);

              const fillers = isChinese
                ? ['不知道', '沒有', '可以', '謝謝', '喜歡', '學生']
                : ['không biết', 'có thể', 'cảm ơn', 'thích', 'sinh viên', 'xin chào'];
              while (distractors.length < 3) {
                const f = fillers[distractors.length];
                if (f && f !== correctStr) distractors.push(f);
                else break;
              }

              const all = [correctStr, ...distractors];
              for (let i = all.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [all[i], all[j]] = [all[j], all[i]];
              }
              fillBlankOptionsRef.current = { key: cacheKey, options: all };
            }

            const options = fillBlankOptionsRef.current.options;

            return (
              <div className="space-y-2">
                {options.map(option => {
                  const isCorrect = normalizeAnswer(option) === normalizeAnswer(correctStr);
                  const isSelected = selected === option;
                  const hasChinese = /[\u4E00-\u9FFF]/.test(option);
                  return (
                    <button
                      key={option}
                      onClick={() => handleSelect(option)}
                      className={cn(
                        `w-full text-left rounded-2xl border-2 p-4 font-semibold transition-all ${hasChinese ? 'text-4xl' : 'text-2xl'}`,
                        !showResult && 'border-border bg-card hover:border-primary/50 hover:bg-primary/5 active:scale-[0.98]',
                        showResult && isCorrect && 'border-primary bg-primary/10 text-primary',
                        showResult && isSelected && !isCorrect && 'border-destructive bg-destructive/10 text-destructive animate-shake',
                        showResult && !isSelected && !isCorrect && 'opacity-50',
                      )}
                      disabled={showResult}
                    >
                      <div className="flex items-center justify-between">
                        {hasChinese ? <ChineseTokenized text={option} vocabMap={vocabMap} /> : option}
                        {showResult && isCorrect && <CheckCircle2 className="h-5 w-5 text-primary" />}
                        {showResult && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-destructive" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            );
          })()}

          {/* Result feedback */}
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn('mt-4 rounded-2xl p-4 flex items-center gap-3', isCurrentCorrect() ? 'bg-primary/10' : 'bg-destructive/10')}
            >
              <motion.img
                src={isCurrentCorrect() ? qilinExcited : qilinSad}
                alt="Qilin reaction"
                className="h-12 w-12 rounded-full object-cover border border-primary/20 bg-card shrink-0"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              />
              <div>
                <p className="font-bold">{isCurrentCorrect() ? '✅ Chính xác!' : '❌ Chưa đúng rồi...'}</p>
                {ex.explanation && <p className="text-sm text-muted-foreground mt-1">{ex.explanation}</p>}
                {!isCurrentCorrect() && <p className="text-xs text-muted-foreground mt-1">Đáp án: <span className="font-bold text-foreground font-hanzi">{typeof ex.correctAnswer === 'string' ? ex.correctAnswer : (ex.correctAnswer as string[]).join(' ')}</span></p>}
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {showResult && (
        <div className="fixed bottom-[calc(4rem+env(safe-area-inset-bottom,0px))] left-0 right-0 px-4 pb-2 z-40">
          <div className="mx-auto max-w-lg">
            <Button size="lg" className="w-full rounded-xl shadow-lg" onClick={handleNext}>
              {retryMode
                ? (retryIndex === wrongExercises.length - 1 ? 'Xem kết quả' : 'Câu tiếp theo')
                : (index === exercises.length - 1 ? (wrongExercises.length > 0 ? '🔄 Ôn lại câu sai' : 'Xem kết quả') : 'Câu tiếp theo')
              } <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
