import React from 'react';
import { tokenizeChinese } from '@/lib/chineseTokenizer';
import ChineseText from '@/components/ChineseText';
import { cn } from '@/lib/utils';

interface Props {
  text: string;
  vocabMap: Record<string, string>;
  autoSpeak?: boolean;
  className?: string;
}

/**
 * Renders a string with Chinese text split into individual clickable tokens,
 * each with its own tooltip from vocabMap.
 */
export default function ChineseTokenized({ text, vocabMap, autoSpeak = false, className }: Props) {
  if (!text || !/[\u4E00-\u9FFF]/.test(text)) {
    return <span className={className}>{text}</span>;
  }

  const segments = tokenizeChinese(text, vocabMap);

  return (
    <span className={className}>
      {segments.map((seg, i) => {
        if (seg.isChinese && seg.meaning) {
          return (
            <ChineseText key={i} translation={seg.meaning} autoSpeak={autoSpeak}>
              {seg.text}
            </ChineseText>
          );
        }
        return <span key={i} className="text-[0.7em] font-medium align-baseline">{seg.text}</span>;
      })}
    </span>
  );
}
