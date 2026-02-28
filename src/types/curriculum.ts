export interface VocabularyWord {
  id: string;
  traditional: string;
  simplified?: string;
  pinyin: string;
  zhuyin: string;
  meaning: string; // Vietnamese
  partOfSpeech?: string;
  exampleSentence?: string;
  exampleMeaning?: string;
  audioUrl?: string;
}

export interface GrammarPoint {
  id: string;
  pattern: string;
  explanation: string;
  examples: {
    sentence: string;
    pinyin: string;
    meaning: string;
  }[];
}

export interface Exercise {
  id: string;
  type: 'multiple-choice' | 'matching' | 'fill-blank' | 'sentence-order' | 'listening';
  question: string;
  questionAudio?: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
}

export interface Section {
  id: string;
  title: string;
  type: 'vocabulary' | 'grammar' | 'exercise' | 'review';
  vocabulary?: VocabularyWord[];
  grammar?: GrammarPoint[];
  exercises?: Exercise[];
  completed?: boolean;
  isMini?: boolean; // Mini exercises don't cost hearts
}

export interface Lesson {
  id: string;
  number: number;
  title: string;
  titleChinese: string;
  sections: Section[];
  unlocked: boolean;
  completed: boolean;
  xpReward: number;
}

export interface Book {
  id: string;
  number: number;
  title: string;
  titleChinese: string;
  description: string;
  lessons: Lesson[];
  color: string;
}

export interface UserProgress {
  currentBook: number;
  currentLesson: number;
  xp: number;
  level: number;
  streak: number;
  hearts: number;
  maxHearts: number;
  completedLessons: string[];
  vocabularyMastered: string[];
  badges: string[];
  lastStudyDate?: string;
  crownLevels: Record<string, number>; // lessonId -> crown level (0-5)
  premiumUntil?: string; // ISO date string for premium expiry
}

export interface DailyQuest {
  id: string;
  questType: 'xp' | 'lessons' | 'perfect';
  questTitle: string;
  target: number;
  progress: number;
  completed: boolean;
  xpReward: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: (progress: UserProgress) => boolean;
}
