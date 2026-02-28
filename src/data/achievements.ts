import { Achievement } from '@/types/curriculum';

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-lesson',
    name: 'Bước đầu tiên',
    description: 'Hoàn thành bài học đầu tiên',
    icon: '🎯',
    condition: (p) => p.completedLessons.length >= 1,
  },
  {
    id: 'five-lessons',
    name: 'Siêng năng',
    description: 'Hoàn thành 5 bài học',
    icon: '📚',
    condition: (p) => p.completedLessons.length >= 5,
  },
  {
    id: 'ten-lessons',
    name: 'Học giả',
    description: 'Hoàn thành 10 bài học',
    icon: '🎓',
    condition: (p) => p.completedLessons.length >= 10,
  },
  {
    id: 'streak-3',
    name: 'Lửa nhỏ',
    description: 'Đạt streak 3 ngày',
    icon: '🔥',
    condition: (p) => p.streak >= 3,
  },
  {
    id: 'streak-7',
    name: 'Tuần lửa',
    description: 'Đạt streak 7 ngày liên tiếp',
    icon: '🔥',
    condition: (p) => p.streak >= 7,
  },
  {
    id: 'streak-30',
    name: 'Tháng rực cháy',
    description: 'Đạt streak 30 ngày liên tiếp',
    icon: '💎',
    condition: (p) => p.streak >= 30,
  },
  {
    id: 'xp-100',
    name: 'Tích lũy',
    description: 'Đạt 100 XP',
    icon: '⚡',
    condition: (p) => p.xp >= 100,
  },
  {
    id: 'xp-500',
    name: 'Năng lượng',
    description: 'Đạt 500 XP',
    icon: '⚡',
    condition: (p) => p.xp >= 500,
  },
  {
    id: 'xp-1000',
    name: 'Siêu năng lượng',
    description: 'Đạt 1000 XP',
    icon: '🌟',
    condition: (p) => p.xp >= 1000,
  },
  {
    id: 'vocab-10',
    name: 'Từ vựng mới',
    description: 'Thuộc 10 từ vựng',
    icon: '📝',
    condition: (p) => p.vocabularyMastered.length >= 10,
  },
  {
    id: 'vocab-50',
    name: 'Kho từ vựng',
    description: 'Thuộc 50 từ vựng',
    icon: '📖',
    condition: (p) => p.vocabularyMastered.length >= 50,
  },
  {
    id: 'level-5',
    name: 'Lên cấp',
    description: 'Đạt cấp độ 5',
    icon: '🏆',
    condition: (p) => p.level >= 5,
  },
  {
    id: 'level-10',
    name: 'Cao thủ',
    description: 'Đạt cấp độ 10',
    icon: '👑',
    condition: (p) => p.level >= 10,
  },
  {
    id: 'crown-5',
    name: 'Ngôi sao vàng',
    description: 'Đạt 5 vương miện ở 1 bài học',
    icon: '👑',
    condition: (p) => Object.values(p.crownLevels).some(v => v >= 5),
  },
  {
    id: 'book-1-done',
    name: 'Chinh phục Quyển 1',
    description: 'Hoàn thành toàn bộ Quyển 1',
    icon: '🐉',
    condition: (p) => {
      // Check if all book1 lessons are completed (they start with 'b1-')
      const book1Lessons = p.completedLessons.filter(id => id.startsWith('b1-'));
      return book1Lessons.length >= 15; // approximate
    },
  },
];
