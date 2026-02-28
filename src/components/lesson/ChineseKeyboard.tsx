import { motion, AnimatePresence } from 'framer-motion';
import { Delete, Space, CornerDownLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useMemo, useCallback } from 'react';
import PINYIN_MAP from '@/data/pinyinMap';

interface ChineseKeyboardProps {
  candidates: string[];
  onSelect: (char: string) => void;
  onBackspace: () => void;
  disabled: boolean;
}

const PINYIN_TONES: Record<string, string[]> = {
  a: ['ā', 'á', 'ǎ', 'à'],
  e: ['ē', 'é', 'ě', 'è'],
  i: ['ī', 'í', 'ǐ', 'ì'],
  o: ['ō', 'ó', 'ǒ', 'ò'],
  u: ['ū', 'ú', 'ǔ', 'ù'],
  ü: ['ǖ', 'ǘ', 'ǚ', 'ǜ'],
};

const QWERTY_ROWS = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
];

type KeyboardMode = 'pinyin-ime' | 'pinyin-tones' | 'hanzi';

export default function ChineseKeyboard({ candidates, onSelect, onBackspace, disabled }: ChineseKeyboardProps) {
  const [mode, setMode] = useState<KeyboardMode>('hanzi');
  const [pinyinBuffer, setPinyinBuffer] = useState('');

  // Get matching characters for current pinyin buffer
  const imeCandidates = useMemo(() => {
    if (!pinyinBuffer) return [];
    // Exact match first, then prefix matches
    const exact = PINYIN_MAP[pinyinBuffer] || [];
    const prefixMatches: string[] = [];
    if (exact.length === 0) {
      for (const [key, chars] of Object.entries(PINYIN_MAP)) {
        if (key.startsWith(pinyinBuffer) && key !== pinyinBuffer) {
          prefixMatches.push(...chars.slice(0, 3));
        }
        if (prefixMatches.length >= 20) break;
      }
    }
    return exact.length > 0 ? exact : prefixMatches;
  }, [pinyinBuffer]);

  const handlePinyinKey = useCallback((key: string) => {
    setPinyinBuffer(prev => prev + key);
  }, []);

  const handlePinyinBackspace = useCallback(() => {
    if (pinyinBuffer.length > 0) {
      setPinyinBuffer(prev => prev.slice(0, -1));
    } else {
      onBackspace();
    }
  }, [pinyinBuffer, onBackspace]);

  const handleIMESelect = useCallback((char: string) => {
    onSelect(char);
    setPinyinBuffer('');
  }, [onSelect]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="space-y-2"
    >
      {/* Mode toggle */}
      <div className="flex items-center justify-center gap-1">
        {([
          { key: 'hanzi' as const, label: '漢字' },
          { key: 'pinyin-ime' as const, label: '拼音' },
          { key: 'pinyin-tones' as const, label: 'Dấu thanh' },
        ]).map(({ key, label }) => (
          <button
            key={key}
            onClick={() => { setMode(key); setPinyinBuffer(''); }}
            className={cn(
              'px-3 py-1 text-xs font-bold rounded-full transition-all',
              mode === key
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            )}
            disabled={disabled}
          >
            {label}
          </button>
        ))}
      </div>

      {mode === 'hanzi' && (
        /* Quick character grid from lesson */
        <div className="flex flex-wrap gap-2 justify-center">
          {candidates.map((char, i) => (
            <motion.button
              key={`${char}-${i}`}
              whileTap={{ scale: 0.9 }}
              onClick={() => onSelect(char)}
              disabled={disabled}
              className={cn(
                'h-12 w-12 rounded-xl border-2 text-xl font-bold transition-all font-hanzi',
                'border-border bg-card hover:border-primary/50 hover:bg-primary/5 active:bg-primary/10',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              {char}
            </motion.button>
          ))}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onBackspace}
            disabled={disabled}
            className={cn(
              'h-12 w-12 rounded-xl border-2 flex items-center justify-center transition-all',
              'border-border bg-muted hover:border-destructive/50 hover:bg-destructive/5',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            <Delete className="h-5 w-5 text-muted-foreground" />
          </motion.button>
        </div>
      )}

      {mode === 'pinyin-ime' && (
        <div className="space-y-2">
          {/* Pinyin buffer display */}
          {pinyinBuffer && (
            <div className="text-center">
              <span className="inline-block bg-primary/10 border border-primary/30 rounded-lg px-3 py-1 text-sm font-bold text-primary">
                {pinyinBuffer}
              </span>
            </div>
          )}

          {/* IME candidates bar */}
          <AnimatePresence>
            {imeCandidates.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="flex gap-1.5 overflow-x-auto pb-1 px-1 scrollbar-hide">
                  {imeCandidates.map((char, i) => (
                    <motion.button
                      key={`${char}-${i}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.02 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleIMESelect(char)}
                      disabled={disabled}
                      className={cn(
                        'shrink-0 h-10 min-w-[2.5rem] px-2 rounded-lg border-2 text-lg font-bold transition-all font-hanzi',
                        'border-primary/30 bg-card hover:border-primary hover:bg-primary/5 active:bg-primary/10',
                        disabled && 'opacity-50 cursor-not-allowed'
                      )}
                    >
                      {char}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* QWERTY keyboard */}
          <div className="space-y-1">
            {QWERTY_ROWS.map((row, rowIdx) => (
              <div key={rowIdx} className="flex justify-center gap-1">
                {row.map(key => (
                  <motion.button
                    key={key}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handlePinyinKey(key)}
                    disabled={disabled}
                    className={cn(
                      'h-10 w-8 sm:w-9 rounded-lg border text-sm font-bold transition-all',
                      'border-border bg-card hover:bg-primary/5 active:bg-primary/10 shadow-sm',
                      disabled && 'opacity-50 cursor-not-allowed'
                    )}
                  >
                    {key}
                  </motion.button>
                ))}
                {rowIdx === 2 && (
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handlePinyinBackspace}
                    disabled={disabled}
                    className={cn(
                      'h-10 w-12 rounded-lg border flex items-center justify-center transition-all',
                      'border-border bg-muted hover:border-destructive/50 hover:bg-destructive/5 shadow-sm',
                      disabled && 'opacity-50 cursor-not-allowed'
                    )}
                  >
                    <Delete className="h-4 w-4 text-muted-foreground" />
                  </motion.button>
                )}
              </div>
            ))}
            {/* Space + backspace row */}
            <div className="flex justify-center gap-1">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => { if (pinyinBuffer) setPinyinBuffer(''); }}
                disabled={disabled || !pinyinBuffer}
                className={cn(
                  'h-10 px-6 rounded-lg border text-xs font-bold transition-all',
                  'border-border bg-muted/50 shadow-sm',
                  pinyinBuffer ? 'hover:bg-destructive/5 text-muted-foreground' : 'opacity-40 cursor-not-allowed'
                )}
              >
                Xóa pinyin
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onBackspace}
                disabled={disabled}
                className={cn(
                  'h-10 px-4 rounded-lg border text-xs font-bold transition-all flex items-center gap-1',
                  'border-border bg-muted/50 hover:bg-destructive/5 shadow-sm',
                  disabled && 'opacity-50 cursor-not-allowed'
                )}
              >
                <Delete className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-muted-foreground">Xóa chữ</span>
              </motion.button>
            </div>
          </div>
        </div>
      )}

      {mode === 'pinyin-tones' && (
        /* Pinyin tone bar */
        <div className="space-y-1.5">
          {Object.entries(PINYIN_TONES).map(([base, tones]) => (
            <div key={base} className="flex items-center gap-1.5 justify-center">
              <span className="w-5 text-center text-xs font-bold text-muted-foreground">{base}</span>
              {tones.map(tone => (
                <motion.button
                  key={tone}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onSelect(tone)}
                  disabled={disabled}
                  className={cn(
                    'h-10 w-10 rounded-lg border-2 text-base font-bold transition-all',
                    'border-border bg-card hover:border-primary/50 hover:bg-primary/5',
                    disabled && 'opacity-50 cursor-not-allowed'
                  )}
                >
                  {tone}
                </motion.button>
              ))}
            </div>
          ))}
          <div className="flex justify-center mt-1">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onBackspace}
              disabled={disabled}
              className={cn(
                'h-10 px-4 rounded-lg border-2 flex items-center gap-1.5 transition-all',
                'border-border bg-muted hover:border-destructive/50 hover:bg-destructive/5',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              <Delete className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-bold text-muted-foreground">Xóa</span>
            </motion.button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
