import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Brain, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSpacedRepetition, Quality, ReviewCard } from '@/hooks/useSpacedRepetition';
import LoadingScreen from '@/components/LoadingScreen';
import { speakChinese } from '@/lib/tts';

function ReviewCardUI({
  card,
  onRate,
}: {
  card: ReviewCard;
  onRate: (quality: Quality) => void;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, x: -200 }}
      className="space-y-6"
    >
      <div
        className={`relative min-h-[280px] rounded-3xl border-2 shadow-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${
          flipped ? 'bg-primary/5 border-primary/30' : 'bg-card border-border'
        }`}
        onClick={() => setFlipped(!flipped)}
      >
        {!flipped ? (
          <div className="text-center space-y-3">
            <p className="text-6xl font-extrabold font-hanzi">{card.word_traditional}</p>
            <p className="text-lg text-muted-foreground">{card.word_pinyin}</p>
            <p className="text-sm text-muted-foreground/70 mt-4">Chạm để xem đáp án</p>
          </div>
        ) : (
          <div className="text-center space-y-3">
            <p className="text-4xl font-extrabold font-hanzi">{card.word_traditional}</p>
            <p className="text-sm text-muted-foreground">{card.word_pinyin}</p>
            <div className="h-px bg-border w-16 mx-auto" />
            <p className="text-xl font-bold text-primary">{card.word_meaning}</p>
            {card.word_example && (
              <div className="mt-3 rounded-xl bg-muted/50 p-3">
                <p className="text-sm font-semibold font-hanzi">{card.word_example}</p>
                <p className="text-xs text-muted-foreground">{card.word_example_meaning}</p>
              </div>
            )}
          </div>
        )}

        <button
          className="absolute top-4 right-4 p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors active:scale-95"
          onClick={(e) => {
            e.stopPropagation();
            speakChinese(card.word_traditional);
          }}
        >
          <Volume2 className="h-5 w-5 text-primary" />
        </button>
      </div>

      {flipped && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <p className="text-sm font-bold text-center text-muted-foreground">Bạn nhớ tốt không?</p>
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant="outline"
              className="flex-col h-auto py-3 border-destructive/30 hover:bg-destructive/10 text-destructive"
              onClick={() => onRate(1)}
            >
              <span className="text-lg">😓</span>
              <span className="text-xs font-bold">Quên</span>
            </Button>
            <Button
              variant="outline"
              className="flex-col h-auto py-3 border-yellow-500/30 hover:bg-yellow-500/10 text-yellow-600"
              onClick={() => onRate(3)}
            >
              <span className="text-lg">🤔</span>
              <span className="text-xs font-bold">Khó</span>
            </Button>
            <Button
              variant="outline"
              className="flex-col h-auto py-3 border-green-500/30 hover:bg-green-500/10 text-green-600"
              onClick={() => onRate(5)}
            >
              <span className="text-lg">😊</span>
              <span className="text-xs font-bold">Dễ</span>
            </Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function Review() {
  const { dueCards, loading, reviewCard, dueCount, totalCount } = useSpacedRepetition();
  const [reviewedCount, setReviewedCount] = useState(0);
  const [sessionComplete, setSessionComplete] = useState(false);

  const handleRate = async (quality: Quality) => {
    if (dueCards.length === 0) return;
    await reviewCard(dueCards[0].id, quality);
    setReviewedCount((c) => c + 1);
    if (dueCards.length <= 1) {
      setSessionComplete(true);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoadingScreen />
      </div>
    );
  }

  return (
    <div className="pb-24 px-4 max-w-lg mx-auto space-y-6" data-tour="review-area">
      {/* Header */}
      <div className="text-center space-y-2 pt-2">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5">
          <Brain className="h-5 w-5 text-primary" />
          <span className="text-sm font-bold text-primary">Ôn tập</span>
        </div>
        <h1 className="text-2xl font-extrabold">Spaced Repetition</h1>
        <p className="text-sm text-muted-foreground">
          Ôn lại từ vựng đã học theo thuật toán SM-2
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-2xl bg-card border border-border p-3 text-center">
          <p className="text-2xl font-extrabold text-primary">{dueCount}</p>
          <p className="text-xs text-muted-foreground font-bold">Cần ôn</p>
        </div>
        <div className="rounded-2xl bg-card border border-border p-3 text-center">
          <p className="text-2xl font-extrabold text-green-500">{reviewedCount}</p>
          <p className="text-xs text-muted-foreground font-bold">Đã ôn</p>
        </div>
        <div className="rounded-2xl bg-card border border-border p-3 text-center">
          <p className="text-2xl font-extrabold">{totalCount}</p>
          <p className="text-xs text-muted-foreground font-bold">Tổng từ</p>
        </div>
      </div>

      {/* Review Area */}
      {sessionComplete || (dueCount === 0 && !loading) ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl border-2 border-primary/20 bg-primary/5 p-8 text-center space-y-4"
        >
          {totalCount === 0 ? (
            <>
              <Sparkles className="h-12 w-12 text-primary mx-auto" />
              <h2 className="text-xl font-extrabold">Chưa có từ nào!</h2>
              <p className="text-sm text-muted-foreground">
                Hãy học bài từ vựng trước, từ sẽ tự động thêm vào danh sách ôn tập.
              </p>
            </>
          ) : (
            <>
              <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto" />
              <h2 className="text-xl font-extrabold">Tuyệt vời! 🎉</h2>
              <p className="text-sm text-muted-foreground">
                Bạn đã ôn xong {reviewedCount} từ hôm nay. Hẹn gặp lại lần sau!
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSessionComplete(false);
                  setReviewedCount(0);
                }}
                className="rounded-xl"
              >
                <RotateCcw className="mr-2 h-4 w-4" /> Ôn lại
              </Button>
            </>
          )}
        </motion.div>
      ) : (
        <AnimatePresence mode="wait">
          {dueCards[0] && (
            <ReviewCardUI key={dueCards[0].id} card={dueCards[0]} onRate={handleRate} />
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
