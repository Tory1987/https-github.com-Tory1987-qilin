import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { speakChinese } from '@/lib/tts';

interface Props {
  children: string;
  translation: string;
  className?: string;
  autoSpeak?: boolean;
}

export default function ChineseText({ children, translation, className, autoSpeak = false }: Props) {
  const [show, setShow] = useState(false);
  const wrapperRef = useRef<HTMLSpanElement>(null);

  const chineseOnly = children.match(/[\u4E00-\u9FFF]+/g)?.join('') || '';

  const toggle = useCallback(() => {
    setShow(prev => {
      if (!prev) {
        if (chineseOnly) {
          speakChinese(chineseOnly);
        }
        return true;
      }
      return false;
    });
  }, [chineseOnly]);

  // Close when clicking outside
  useEffect(() => {
    if (!show) return;
    const handler = (e: MouseEvent | TouchEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShow(false);
      }
    };
    document.addEventListener('mousedown', handler, true);
    document.addEventListener('touchstart', handler, true);
    return () => {
      document.removeEventListener('mousedown', handler, true);
      document.removeEventListener('touchstart', handler, true);
    };
  }, [show]);

  return (
    <span
      ref={wrapperRef}
      className={cn(
        'relative inline border-b border-dashed border-primary/40 cursor-pointer select-none',
        className
      )}
      onClick={(e) => { e.stopPropagation(); toggle(); }}
      onTouchStart={(e) => { e.stopPropagation(); }}
    >
      <span className="font-hanzi">{children}</span>
      <AnimatePresence>
        {show && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-[100] whitespace-nowrap rounded-xl bg-card text-foreground text-base font-semibold px-4 py-2.5 shadow-lg border-2 border-primary pointer-events-none"
          >
            <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-card border-r border-b border-primary" />
            {translation}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
