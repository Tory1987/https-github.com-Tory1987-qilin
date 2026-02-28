import { Exercise } from '@/types/curriculum';

/**
 * Crown difficulty modifiers per level:
 * Level 0: Normal (first time)
 * Level 1: Remove 1 wrong option from multiple choice
 * Level 2: Shuffle exercises, hide explanations
 * Level 3: Convert some MC to fill-blank, add time pressure label
 * Level 4: Convert more MC to fill-blank, reverse question/answer on some
 * Level 5: Max — everything is fill-blank or sentence-order, no hints
 */

export const CROWN_LABELS = [
  { label: 'Cơ bản', color: 'text-muted-foreground', emoji: '🥉' },
  { label: 'Quen thuộc', color: 'text-primary', emoji: '🥈' },
  { label: 'Thành thạo', color: 'text-secondary', emoji: '🥇' },
  { label: 'Nâng cao', color: 'text-accent', emoji: '💪' },
  { label: 'Bậc thầy', color: 'text-xp', emoji: '🔥' },
];

export function getCrownLabel(crownLevel: number) {
  return CROWN_LABELS[Math.min(crownLevel, CROWN_LABELS.length - 1)];
}

export function applyDifficulty(exercises: Exercise[], crownLevel: number): Exercise[] {
  if (crownLevel <= 0) return exercises;

  let modified = exercises.map(ex => ({ ...ex }));

  // Shuffle exercise order for crown 1+
  if (crownLevel >= 1) {
    modified = modified.sort(() => Math.random() - 0.5);
  }

  // Crown 2+: remove explanations (no hints)
  if (crownLevel >= 2) {
    modified = modified.map(ex => ({ ...ex, explanation: undefined }));
  }

  // Crown 3+: convert ~40% of multiple-choice to fill-blank
  if (crownLevel >= 3) {
    modified = modified.map((ex, i) => {
      if (ex.type === 'multiple-choice' && typeof ex.correctAnswer === 'string' && i % 3 === 0) {
        return {
          ...ex,
          type: 'fill-blank' as const,
          options: undefined,
        };
      }
      return ex;
    });
  }

  // Crown 4+: convert ~70% of remaining MC to fill-blank
  if (crownLevel >= 4) {
    modified = modified.map((ex, i) => {
      if (ex.type === 'multiple-choice' && typeof ex.correctAnswer === 'string' && i % 2 === 0) {
        return {
          ...ex,
          type: 'fill-blank' as const,
          options: undefined,
        };
      }
      return ex;
    });
  }

  return modified;
}

export function getCrownXpMultiplier(crownLevel: number): number {
  // Higher crown = more XP reward
  return 1 + crownLevel * 0.25; // 1x, 1.25x, 1.5x, 1.75x, 2x
}
