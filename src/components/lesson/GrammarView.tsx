import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GrammarPoint } from '@/types/curriculum';
import { speakChinese } from '@/lib/tts';
import { playClickSound } from '@/lib/sfx';
import ChineseText from '@/components/ChineseText';
import ChineseTokenized from '@/components/ChineseTokenized';
import { curriculum } from '@/data/curriculum';
import { buildVocabMap } from '@/lib/chineseTokenizer';

interface Props {
  points: GrammarPoint[];
  lessonId: string;
  onComplete: () => void;
  onBack: () => void;
}

export default function GrammarView({ points, lessonId, onComplete, onBack }: Props) {
  const vocabMap = buildVocabMap(lessonId);
  const [index, setIndex] = useState(0);
  const point = points[index];

  const next = () => {
    playClickSound();
    if (index >= points.length - 1) { onComplete(); return; }
    setIndex(i => i + 1);
  };

  return (
    <div className="py-4 space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <span className="text-sm font-bold text-muted-foreground">{index + 1}/{points.length}</span>
        <div className="w-10" />
      </div>

      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <motion.div className="h-full bg-primary rounded-full" animate={{ width: `${((index + 1) / points.length) * 100}%` }} />
      </div>

      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border-2 border-border bg-card p-6 shadow-lg space-y-4"
      >
        <div className="text-center">
          <p className="text-2xl font-semibold text-primary"><ChineseTokenized text={point.pattern} vocabMap={vocabMap} /></p>
        </div>
        <p className="text-sm leading-relaxed">{point.explanation}</p>

        <div className="space-y-2">
          <p className="text-xs font-bold text-muted-foreground uppercase">Ví dụ</p>
          {point.examples.map((ex, i) => (
            <div key={i} className="rounded-xl bg-muted/50 p-3 flex items-start gap-2">
              <div className="flex-1">
                <p className="text-lg font-semibold"><ChineseTokenized text={ex.sentence} vocabMap={vocabMap} /></p>
                <p className="text-sm text-muted-foreground font-pinyin">{ex.pinyin}</p>
                <p className="text-sm text-primary font-semibold">{ex.meaning}</p>
              </div>
              <button
                className="mt-1 p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors active:scale-95 shrink-0"
                onClick={() => speakChinese(ex.sentence)}
              >
                <Volume2 className="h-4 w-4 text-primary" />
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="flex justify-end">
        <Button size="lg" onClick={next} className="rounded-xl">
          {index === points.length - 1 ? 'Hoàn thành' : 'Tiếp'} <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
