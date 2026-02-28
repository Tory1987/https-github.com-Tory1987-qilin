import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Volume2, PenLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VocabularyWord } from '@/types/curriculum';
import { speakChinese } from '@/lib/tts';
import { playClickSound } from '@/lib/sfx';
import ChineseText from '@/components/ChineseText';
import ChineseTokenized from '@/components/ChineseTokenized';
import { curriculum } from '@/data/curriculum';
import { buildVocabMap } from '@/lib/chineseTokenizer';
import StrokeOrderModal from './StrokeOrderModal';

interface Props {
  words: VocabularyWord[];
  lessonId: string;
  onComplete: () => void;
  onBack: () => void;
}

export default function FlashcardView({ words, lessonId, onComplete, onBack }: Props) {
  const vocabMap = buildVocabMap(lessonId);
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [strokeOpen, setStrokeOpen] = useState(false);
  const word = words[index];

  const next = () => {
    playClickSound();
    if (index >= words.length - 1) { onComplete(); return; }
    setDir(1); setIndex(i => i + 1);
  };

  const prev = () => {
    if (index <= 0) return;
    playClickSound();
    setDir(-1); setIndex(i => i - 1);
  };

  return (
    <div className="flex flex-col h-[calc(100dvh-11rem)] py-2">
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <span className="text-sm font-bold text-muted-foreground">{index + 1}/{words.length}</span>
        <div className="w-10" />
      </div>

      {/* Progress bar */}
      <div className="h-2 rounded-full bg-muted overflow-hidden mt-2 shrink-0">
        <motion.div
          className="h-full bg-primary rounded-full"
          animate={{ width: `${((index + 1) / words.length) * 100}%` }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      </div>

      {/* Card content - fills remaining space */}
      <div className="flex-1 min-h-0 mt-3 overflow-y-auto">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={index}
            custom={dir}
            initial={{ x: dir * 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -dir * 200, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="h-full flex flex-col"
          >
            {/* Chinese character area */}
              <div className="relative flex-1 min-h-0 rounded-2xl border-2 border-border bg-card flex flex-col items-center justify-center p-2 overflow-hidden">
              <span className="text-2xl text-muted-foreground font-pinyin mb-1">{word.pinyin}</span>
              {word.zhuyin && (
                <p className="text-sm text-muted-foreground/50 mb-2">{word.zhuyin}</p>
              )}
              <div className="h-px bg-border w-2/3 mb-2" />
              <p className="text-[clamp(4rem,28vw,8rem)] font-medium leading-tight text-center break-all font-hanzi">
                <ChineseText translation={word.meaning} autoSpeak>{word.traditional}</ChineseText>
              </p>
              {/* Meaning inside card */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
                <span className="text-xl font-bold text-primary text-center whitespace-pre-line">
                  {word.meaning.replace(/\s*(\()/g, '\n$1')}
                </span>
                {word.partOfSpeech && (
                  <span className="text-sm text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    {word.partOfSpeech}
                  </span>
                )}
              </div>
              <button
                className="absolute bottom-3 left-3 p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors active:scale-95"
                onClick={() => setStrokeOpen(true)}
              >
                <PenLine className="h-8 w-8 text-primary" />
              </button>
              <button
                className="absolute bottom-3 right-3 p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors active:scale-95"
                onClick={() => speakChinese(word.traditional)}
              >
                <Volume2 className="h-8 w-8 text-primary" />
              </button>
            </div>


            {/* Example sentence - always rendered to keep stable layout */}
            <div className="rounded-xl bg-muted/50 border border-border p-4 mt-3 min-h-[6rem] flex items-start gap-2 shrink-0">
              {word.exampleSentence ? (
                <>
                  <div className="flex-1 min-w-0">
                    <p className="text-2xl font-semibold">
                      <ChineseTokenized text={word.exampleSentence!} vocabMap={vocabMap} />
                    </p>
                    <p className="text-xl text-muted-foreground mt-2">{word.exampleMeaning}</p>
                  </div>
                  <button
                    className="shrink-0 p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors active:scale-95"
                    onClick={() => speakChinese(word.exampleSentence!)}
                  >
                    <Volume2 className="h-6 w-6 text-primary" />
                  </button>
                </>
              ) : (
                <p className="text-sm text-muted-foreground italic">Không có câu ví dụ</p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-3 mt-3 shrink-0">
        <Button variant="outline" size="lg" onClick={prev} disabled={index === 0} className="rounded-xl">
          <ArrowLeft className="mr-1 h-4 w-4" /> Trước
        </Button>
        <Button size="lg" onClick={next} className="rounded-xl flex-1">
          {index === words.length - 1 ? 'Hoàn thành' : 'Tiếp'} <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>

      <StrokeOrderModal open={strokeOpen} onOpenChange={setStrokeOpen} characters={word.traditional} />
    </div>
  );
}
