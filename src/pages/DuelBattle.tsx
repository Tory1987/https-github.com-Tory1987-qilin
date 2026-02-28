import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Swords, CheckCircle2, XCircle, Timer, Loader2 } from 'lucide-react';
import duelLoadingImg from '@/assets/qilin-loading.png';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useDuel } from '@/hooks/useDuel';
import { Exercise } from '@/types/curriculum';
import { playCorrectSound, playWrongSound } from '@/lib/sfx';
import { supabase } from '@/integrations/supabase/client';

export default function DuelBattle() {
  const { duelId } = useParams<{ duelId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { duel, submitAnswer, completeDuel, fetchDuel } = useDuel(duelId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | string[] | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [myScore, setMyScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const timeStartRef = useRef(Date.now());
  const [elapsedMs, setElapsedMs] = useState(0);
  const timerRef = useRef<NodeJS.Timeout>();

  // Sentence order state
  const [orderedWords, setOrderedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);

  const exercises: Exercise[] = (duel?.exercises as Exercise[]) || [];
  const ex = exercises[currentIndex];
  const isChallenger = duel?.challenger_id === user?.id;
  const totalQ = duel?.total_questions || 5;

  // Timer
  useEffect(() => {
    if (finished || !duel) return;
    timeStartRef.current = Date.now();
    timerRef.current = setInterval(() => {
      setElapsedMs(Date.now() - timeStartRef.current);
    }, 100);
    return () => clearInterval(timerRef.current);
  }, [finished, duel, currentIndex]);

  // Reset sentence-order state when exercise changes
  useEffect(() => {
    if (ex?.type === 'sentence-order' && ex.options) {
      setAvailableWords([...ex.options].sort(() => Math.random() - 0.5));
      setOrderedWords([]);
    }
  }, [currentIndex, ex?.type]);

  // For turnbased: check if challenger already played
  const [opponentAnswers, setOpponentAnswers] = useState<any[]>([]);
  useEffect(() => {
    if (!duelId || !duel) return;
    if (duel.mode === 'realtime') {
      const channel = supabase
        .channel(`duel-answers-${duelId}`)
        .on('postgres_changes', {
          event: 'INSERT',
          schema: 'public',
          table: 'duel_answers',
          filter: `duel_id=eq.${duelId}`,
        }, (payload: any) => {
          if (payload.new.user_id !== user?.id) {
            setOpponentAnswers(prev => [...prev, payload.new]);
          }
        })
        .subscribe();
      return () => { supabase.removeChannel(channel); };
    }
  }, [duelId, duel, user]);

  const handleSelect = async (option: string) => {
    if (showResult || !ex || !duelId) return;
    const timeMs = Date.now() - timeStartRef.current;
    setSelected(option);
    setShowResult(true);

    const isCorrect = option === ex.correctAnswer;
    if (isCorrect) {
      setMyScore(s => s + 1);
      playCorrectSound();
    } else {
      playWrongSound();
    }

    await submitAnswer(duelId, currentIndex, option, isCorrect, timeMs);
  };

  const handleSentenceOrderSubmit = async () => {
    if (showResult || !ex || !duelId) return;
    const timeMs = Date.now() - timeStartRef.current;
    setSelected(orderedWords);
    setShowResult(true);

    const correctArr = Array.isArray(ex.correctAnswer) ? ex.correctAnswer : [ex.correctAnswer];
    const isCorrect = JSON.stringify(orderedWords) === JSON.stringify(correctArr);
    if (isCorrect) {
      setMyScore(s => s + 1);
      playCorrectSound();
    } else {
      playWrongSound();
    }

    await submitAnswer(duelId, currentIndex, orderedWords, isCorrect, timeMs);
  };

  const addWord = (word: string, index: number) => {
    if (showResult) return;
    setOrderedWords(prev => [...prev, word]);
    setAvailableWords(prev => prev.filter((_, i) => i !== index));
  };

  const removeWord = (word: string, index: number) => {
    if (showResult) return;
    setAvailableWords(prev => [...prev, word]);
    setOrderedWords(prev => prev.filter((_, i) => i !== index));
  };

  const handleNext = async () => {
    if (currentIndex >= totalQ - 1) {
      setFinished(true);
      clearInterval(timerRef.current);
      await completeDuel(duelId!);
      navigate(`/duel/${duelId}/result`, { replace: true });
      return;
    }
    setCurrentIndex(i => i + 1);
    setSelected(null);
    setShowResult(false);
    timeStartRef.current = Date.now();
  };

  if (!duel) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] gap-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="relative"
        >
          <motion.img
            src={duelLoadingImg}
            alt="Song Đấu Loading"
            className="w-72 h-72 object-cover rounded-3xl shadow-2xl"
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute inset-0 rounded-3xl border-2 border-primary/40"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center space-y-2"
        >
          <p className="text-lg font-extrabold text-primary">Đang tải trận đấu...</p>
          <Loader2 className="h-6 w-6 animate-spin text-primary mx-auto" />
        </motion.div>
      </div>
    );
  }

  if (!ex) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">Không có bài tập</p>
      </div>
    );
  }

  return (
    <div className="py-4 space-y-4 pb-24">
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Swords className="h-5 w-5 text-destructive" />
          <span className="text-sm font-extrabold">Song Đấu</span>
        </div>
        <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
          <Timer className="h-4 w-4" />
          <span>{Math.floor(elapsedMs / 1000)}s</span>
        </div>
      </div>

      {/* Score bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 text-center">
          <p className="text-xs font-bold text-muted-foreground truncate">{isChallenger ? (duel.challenger_name || 'Bạn') : (duel.opponent_name || 'Bạn')}</p>
          <p className="text-2xl font-extrabold text-primary">{myScore}</p>
        </div>
        <div className="text-sm font-extrabold text-muted-foreground">VS</div>
        <div className="flex-1 text-center">
          <p className="text-xs font-bold text-muted-foreground truncate">{isChallenger ? (duel.opponent_name || 'Đối thủ') : (duel.challenger_name || 'Đối thủ')}</p>
          <p className="text-2xl font-extrabold text-destructive">
            {isChallenger ? duel.opponent_score : duel.challenger_score}
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="flex gap-1">
        {Array.from({ length: totalQ }).map((_, i) => (
          <div key={i} className={cn(
            'flex-1 h-2 rounded-full transition-colors',
            i < currentIndex ? 'bg-primary' : i === currentIndex ? 'bg-primary/50' : 'bg-muted'
          )} />
        ))}
      </div>

      {/* Question */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-4"
      >
        <div className="rounded-2xl border border-border bg-card p-4">
          <p className="text-xs font-bold text-muted-foreground mb-1">Câu {currentIndex + 1}/{totalQ}</p>
          <p className="text-lg font-bold">{ex.question}</p>
        </div>

        {/* Multiple choice */}
        {ex.type === 'multiple-choice' && ex.options && (
          <div className="space-y-2">
            {ex.options.map(option => {
              const isCorrect = option === ex.correctAnswer;
              return (
                <button
                  key={option}
                  onClick={() => handleSelect(option)}
                  disabled={showResult}
                  className={cn(
                    'w-full text-left rounded-2xl border-2 p-4 font-semibold transition-all',
                    !showResult && 'border-border bg-card hover:border-primary/50 active:scale-[0.98]',
                    showResult && isCorrect && 'border-primary bg-primary/10 text-primary',
                    showResult && selected === option && !isCorrect && 'border-destructive bg-destructive/10 text-destructive',
                    showResult && selected !== option && !isCorrect && 'opacity-50',
                  )}
                >
                  <div className="flex items-center justify-between">
                    {option}
                    {showResult && isCorrect && <CheckCircle2 className="h-5 w-5 text-primary" />}
                    {showResult && selected === option && !isCorrect && <XCircle className="h-5 w-5 text-destructive" />}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Fill blank - with options */}
        {ex.type === 'fill-blank' && ex.options && (
          <div className="space-y-2">
            {ex.options.map(option => {
              const isCorrect = option === ex.correctAnswer;
              return (
                <button
                  key={option}
                  onClick={() => handleSelect(option)}
                  disabled={showResult}
                  className={cn(
                    'w-full text-left rounded-2xl border-2 p-4 font-semibold transition-all',
                    !showResult && 'border-border bg-card hover:border-primary/50',
                    showResult && isCorrect && 'border-primary bg-primary/10 text-primary',
                    showResult && selected === option && !isCorrect && 'border-destructive bg-destructive/10 text-destructive',
                    showResult && selected !== option && !isCorrect && 'opacity-50',
                  )}
                >
                  <div className="flex items-center justify-between">
                    {option}
                    {showResult && isCorrect && <CheckCircle2 className="h-5 w-5 text-primary" />}
                    {showResult && selected === option && !isCorrect && <XCircle className="h-5 w-5 text-destructive" />}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Fill blank - no options (auto-award point and show next) */}
        {ex.type === 'fill-blank' && !ex.options && !showResult && (
          <div className="space-y-3 text-center">
            <p className="text-sm text-muted-foreground">Đáp án: <span className="font-bold text-primary text-lg">{ex.correctAnswer}</span></p>
            <Button className="w-full h-12 rounded-2xl font-extrabold text-base" onClick={async () => {
              setShowResult(true);
              setMyScore(s => s + 1);
              const timeMs = Date.now() - timeStartRef.current;
              await submitAnswer(duelId!, currentIndex, ex.correctAnswer, true, timeMs);
            }}>
              Đã hiểu ✓
            </Button>
          </div>
        )}

        {/* Sentence order */}
        {ex.type === 'sentence-order' && (
          <div className="space-y-3">
            {/* Ordered words (answer area) */}
            <div className="min-h-[56px] rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 p-3 flex flex-wrap gap-2">
              {orderedWords.length === 0 && !showResult && (
                <p className="text-xs text-muted-foreground">Nhấn vào từ bên dưới để sắp xếp câu</p>
              )}
              {orderedWords.map((word, i) => (
                <button
                  key={`ordered-${i}`}
                  onClick={() => removeWord(word, i)}
                  disabled={showResult}
                  className={cn(
                    'px-3 py-2 rounded-xl font-bold text-sm transition-all',
                    !showResult && 'bg-primary text-primary-foreground hover:bg-primary/80',
                    showResult && 'bg-primary/20 text-primary cursor-default',
                  )}
                >
                  {word}
                </button>
              ))}
            </div>

            {/* Available words */}
            {!showResult && (
              <div className="flex flex-wrap gap-2">
                {availableWords.map((word, i) => (
                  <button
                    key={`avail-${i}`}
                    onClick={() => addWord(word, i)}
                    className="px-3 py-2 rounded-xl border-2 border-border bg-card font-bold text-sm hover:border-primary/50 active:scale-95 transition-all"
                  >
                    {word}
                  </button>
                ))}
              </div>
            )}

            {/* Show correct answer after submit */}
            {showResult && (
              <div className="space-y-2">
                {JSON.stringify(orderedWords) === JSON.stringify(Array.isArray(ex.correctAnswer) ? ex.correctAnswer : [ex.correctAnswer]) ? (
                  <div className="flex items-center gap-2 text-primary font-bold text-sm">
                    <CheckCircle2 className="h-5 w-5" />
                    Chính xác!
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-destructive font-bold text-sm">
                      <XCircle className="h-5 w-5" />
                      Sai rồi!
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Đáp án: <span className="font-bold text-primary">{(Array.isArray(ex.correctAnswer) ? ex.correctAnswer : [ex.correctAnswer]).join('')}</span>
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Submit button for sentence order */}
            {!showResult && orderedWords.length > 0 && availableWords.length === 0 && (
              <Button className="w-full h-12 rounded-2xl font-extrabold text-base" onClick={handleSentenceOrderSubmit}>
                Kiểm tra
              </Button>
            )}
          </div>
        )}

        {/* Matching/Listening fallback - treat as auto-skip with correct answer shown */}
        {(ex.type === 'matching' || ex.type === 'listening') && !showResult && (
          <div className="space-y-3 text-center">
            <p className="text-sm text-muted-foreground">Dạng bài này không hỗ trợ trong Song Đấu</p>
            <Button variant="outline" className="rounded-2xl font-bold" onClick={() => {
              setShowResult(true);
              setMyScore(s => s + 1);
              submitAnswer(duelId!, currentIndex, 'auto-correct', true, 0);
            }}>
              Bỏ qua (+1 điểm)
            </Button>
          </div>
        )}

        {/* Next / explain */}
        <AnimatePresence>
          {showResult && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
              {ex.explanation && (
                <div className="rounded-xl bg-muted/50 p-3">
                  <p className="text-xs text-muted-foreground">💡 {ex.explanation}</p>
                </div>
              )}
              <Button className="w-full h-12 rounded-2xl font-extrabold text-base" onClick={handleNext}>
                {currentIndex >= totalQ - 1 ? 'Xem kết quả 🏆' : 'Câu tiếp →'}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}