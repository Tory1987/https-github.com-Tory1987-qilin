import { curriculum } from '@/data/curriculum';

/**
 * Greedy longest-match tokenizer for Chinese text.
 */

export interface ChineseSegment {
  text: string;
  isChinese: boolean;
  meaning?: string;
}

// Split Chinese chars from everything else, including CJK punctuation
// Group 1: runs of CJK ideographs
// Group 2: individual CJK / fullwidth punctuation marks (separated so they don't glue Chinese segments together)
const SPLIT_RE = /([\u4E00-\u9FFF]+|[\u3000-\u303F\uFF00-\uFFEF\u2014\u2015\u2500\u2501\u2E3A\u2E3B]+)/g;

export function tokenizeChinese(
  input: string,
  vocabMap: Record<string, string> = {},
  maxWordLen = 6
): ChineseSegment[] {
  if (!input) return [];

  const parts = input.split(SPLIT_RE);
  const segments: ChineseSegment[] = [];

  for (const part of parts) {
    if (!part) continue;

    if (/[\u4E00-\u9FFF]/.test(part)) {
      // Chinese characters – do greedy match
      let pos = 0;
      while (pos < part.length) {
        let matched = false;
        for (let len = Math.min(part.length - pos, maxWordLen); len >= 2; len--) {
          const word = part.substring(pos, pos + len);
          if (vocabMap[word]) {
            segments.push({ text: word, isChinese: true, meaning: vocabMap[word] });
            pos += len;
            matched = true;
            break;
          }
        }
        if (!matched) {
          const char = part[pos];
          const meaning = vocabMap[char] || undefined;
          segments.push({ text: char, isChinese: true, meaning });
          pos++;
        }
      }
    } else {
      // Non-Chinese (including separated punctuation)
      segments.push({ text: part, isChinese: false });
    }
  }

  return segments;
}

/**
 * Build a vocabulary lookup map from all vocabulary in a lesson.
 */
export function buildVocabMap(lessonId: string): Record<string, string> {
  const map: Record<string, string> = {};
  const lesson = curriculum.flatMap(b => b.lessons).find(l => l.id === lessonId);
  if (!lesson) return map;
  for (const section of lesson.sections) {
    if (section.vocabulary) {
      for (const word of section.vocabulary) {
        map[word.traditional] = word.meaning;
        if (word.traditional.length > 1) {
          for (const ch of word.traditional) {
            if (!map[ch]) map[ch] = '';
          }
        }
      }
    }
    if (section.exercises) {
      for (const ex of section.exercises) {
        if (ex.type === 'sentence-order' && ex.options && ex.explanation) {
          const q = ex.question;
          if (/[\u4E00-\u9FFF]/.test(q) && !map[q]) {
            map[q] = ex.explanation;
          }
        }
      }
    }
  }
  return map;
}
