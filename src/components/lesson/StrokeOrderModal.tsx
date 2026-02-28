import { useState, useEffect, useRef, useCallback } from 'react';
import { Play, PenTool, RotateCcw, Check, BookOpen, X, EyeOff } from 'lucide-react';
import { fireConfetti } from '@/lib/confetti';
import { Button } from '@/components/ui/button';
import HanziWriter from 'hanzi-writer';

const STROKE_RULES = [
  { rule: '先横後豎', vi: 'Ngang trước, dọc sau', example: '十、干' },
  { rule: '先撇後捺', vi: 'Phẩy trước, mác sau', example: '人、八' },
  { rule: '從上到下', vi: 'Trên xuống dưới', example: '三、言' },
  { rule: '從左到右', vi: 'Trái sang phải', example: '你、他' },
  { rule: '先外後內', vi: 'Ngoài trước, trong sau', example: '月、同' },
  { rule: '先進後關', vi: 'Vào trước, đóng sau', example: '國、四' },
  { rule: '先中間後兩邊', vi: 'Giữa trước, hai bên sau', example: '小、水' },
];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  characters: string;
}

export default function StrokeOrderModal({ open, onOpenChange, characters }: Props) {
  const chars = [...characters];
  const [charIndex, setCharIndex] = useState(0);
  const [mode, setMode] = useState<'animate' | 'quiz' | 'free'>('animate');
  const [quizComplete, setQuizComplete] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);
  const writerRef = useRef<HanziWriter | null>(null);

  const currentChar = chars[charIndex] ?? '';

  const initWriter = useCallback(() => {
    if (!targetRef.current || !currentChar) return;
    targetRef.current.innerHTML = '';
    writerRef.current = HanziWriter.create(targetRef.current, currentChar, {
      width: 280,
      height: 280,
      padding: 10,
      showOutline: true,
      showHintAfterMisses: 2,
      highlightOnComplete: true,
      drawingWidth: 30,
      strokeHighlightSpeed: 0.25,
      strokeAnimationSpeed: 0.5,
      delayBetweenStrokes: 600,
      acceptBackwardsStrokes: true,
      leniency: 1.2,
      charDataLoader: (char: string) =>
        fetch(`https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0/${char}.json`)
          .then((r) => r.json()),
    });
  }, [currentChar]);

  useEffect(() => {
    if (!open) return;
    setCharIndex(0);
    setMode('animate');
    setQuizComplete(false);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      initWriter();
    }, 100);
    return () => {
      clearTimeout(t);
      writerRef.current = null;
    };
  }, [open, currentChar, initWriter]);

  const handleAnimate = () => {
    setMode('animate');
    initWriter();
    setTimeout(() => writerRef.current?.animateCharacter(), 120);
  };

  const handleQuiz = () => {
    setMode('quiz');
    setQuizComplete(false);
    initWriter();
    setTimeout(() => {
      writerRef.current?.quiz({
        onComplete: () => {
          setQuizComplete(true);
          fireConfetti();
        },
      });
    }, 120);
  };

  const handleFreeWrite = () => {
    setMode('free');
    setQuizComplete(false);
    if (!targetRef.current || !currentChar) return;
    targetRef.current.innerHTML = '';
    writerRef.current = HanziWriter.create(targetRef.current, currentChar, {
      width: 280,
      height: 280,
      padding: 10,
      showOutline: false,
      showCharacter: false,
      showHintAfterMisses: false,
      highlightOnComplete: true,
      drawingWidth: 30,
      strokeHighlightSpeed: 0.5,
      strokeAnimationSpeed: 1,
      delayBetweenStrokes: 300,
      acceptBackwardsStrokes: true,
      leniency: 1.2,
      charDataLoader: (char: string) =>
        fetch(`https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0/${char}.json`)
          .then((r) => r.json()),
    });
    setTimeout(() => {
      writerRef.current?.quiz({
        onComplete: () => {
          setQuizComplete(true);
          fireConfetti();
        },
      });
    }, 120);
  };

  const handleReplay = () => {
    setQuizComplete(false);
    if (mode === 'free') {
      handleFreeWrite();
    } else if (mode === 'quiz') {
      writerRef.current?.quiz({
        onComplete: () => {
          setQuizComplete(true);
          fireConfetti();
        },
      });
    } else {
      writerRef.current?.animateCharacter();
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-background flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 border-b border-border shrink-0" style={{ paddingTop: 'calc(0.75rem + env(safe-area-inset-top, 0px))', paddingBottom: '0.75rem' }}>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold font-hanzi">{currentChar}</span>
          {chars.length > 1 && (
            <span className="text-sm text-muted-foreground">
              ({charIndex + 1}/{chars.length})
            </span>
          )}
        </div>
        <button
          onClick={() => onOpenChange(false)}
          className="h-8 w-8 rounded-full bg-muted flex items-center justify-center"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto flex flex-col">
        {/* 1. Stroke order rules - always visible */}
        <div className="px-4 pt-3 shrink-0">
          <div className="flex items-center gap-1.5 mb-2">
            <BookOpen className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-bold text-primary">Quy tắc bút thuận 筆順規則</span>
          </div>
          <div className="rounded-xl bg-muted/50 border border-border p-2.5 space-y-1.5">
            {STROKE_RULES.map((r, i) => (
              <div key={i} className="flex items-start gap-2 text-[11px]">
                <span className="font-bold text-primary shrink-0 w-4 text-center">{i + 1}</span>
                <div className="min-w-0">
                  <span className="font-bold font-hanzi">{r.rule}</span>
                  <span className="text-muted-foreground text-[0.85em] font-medium"> — {r.vi}</span>
                  <span className="text-muted-foreground/70 ml-1 font-hanzi">({r.example})</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Character navigation + Controls */}
        <div className="flex flex-col items-center px-4 pt-3 gap-3 shrink-0">
          {chars.length > 1 && (
            <div className="flex gap-2 justify-center">
              {chars.map((c, i) => (
                <button
                  key={i}
                  onClick={() => { setCharIndex(i); setMode('animate'); }}
                  className={`w-10 h-10 rounded-lg text-lg font-bold transition-colors font-hanzi ${
                    i === charIndex
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-accent'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
          <div className="flex gap-3 justify-center flex-wrap">
            <Button variant={mode === 'animate' ? 'default' : 'outline'} className="rounded-xl" onClick={handleAnimate}>
              <Play className="h-4 w-4 mr-1" /> Xem
            </Button>
            <Button variant={mode === 'quiz' ? 'default' : 'outline'} className="rounded-xl" onClick={handleQuiz}>
              <PenTool className="h-4 w-4 mr-1" /> Luyện viết
            </Button>
            <Button variant={mode === 'free' ? 'default' : 'outline'} className="rounded-xl" onClick={handleFreeWrite}>
              <EyeOff className="h-4 w-4 mr-1" /> Viết tự do
            </Button>
            <Button variant="ghost" size="sm" onClick={handleReplay} className="text-muted-foreground">
              <RotateCcw className="h-4 w-4 mr-1" /> Lại
            </Button>
          </div>
          {quizComplete && (
            <div className="flex items-center gap-2 text-primary font-bold animate-scale-in">
              <Check className="h-5 w-5" />
              <span>Tuyệt vời! Viết đúng rồi! 🎉</span>
            </div>
          )}
        </div>

        {/* 3. HanziWriter target - bottom */}
        <div className="flex flex-col items-center px-4 pb-6 pt-3 shrink-0">
          <div
            ref={targetRef}
            className="w-[280px] h-[280px] rounded-2xl border-2 border-border bg-card flex items-center justify-center touch-none"
          />
        </div>
      </div>
    </div>
  );
}
