import { Book, UserProgress } from '@/types/curriculum';
import { book1Lessons } from './books/book1';
import { book2Lessons } from './books/book2';
import { book3Lessons } from './books/book3';
import { book4Lessons } from './books/book4';

export const defaultUserProgress: UserProgress = {
  currentBook: 1,
  currentLesson: 1,
  xp: 0,
  level: 1,
  streak: 3,
  hearts: 5,
  maxHearts: 5,
  completedLessons: [],
  vocabularyMastered: [],
  badges: [],
  lastStudyDate: new Date().toISOString().split('T')[0],
  crownLevels: {},
};

export const curriculum: Book[] = [
  {
    id: 'book-1',
    number: 1,
    title: 'Quyển 1',
    titleChinese: '第一冊',
    description: 'Cơ bản — Chào hỏi, gia đình, hoạt động, mua sắm, ẩm thực, giao thông, thời tiết, sức khỏe (TOCFL Novice)',
    color: 'primary',
    lessons: book1Lessons,
  },
  {
    id: 'book-2',
    number: 2,
    title: 'Quyển 2',
    titleChinese: '第二冊',
    description: 'Sơ trung cấp — Hỏi đường, giao thông, học tập, công việc, đám cưới, mua sắm, thể thao (TOCFL Band A)',
    color: 'secondary',
    lessons: book2Lessons,
  },
  {
    id: 'book-3',
    number: 3,
    title: 'Quyển 3',
    titleChinese: '第三冊',
    description: 'Trung cấp — Học tập, mua sắm, thời tiết, văn hóa, thời trang, nông thôn, thú cưng, bản thân, mua sắm online, bệnh viện, lịch sử, bầu cử (TOCFL Band B)',
    color: 'accent',
    lessons: book3Lessons,
  },
  {
    id: 'book-4',
    number: 4,
    title: 'Quyển 4',
    titleChinese: '第四冊',
    description: 'Trung cao cấp — Văn hóa, xã hội, môi trường, công nghệ, truyền thông, kinh tế, giáo dục (TOCFL Band B)',
    color: 'xp',
    lessons: book4Lessons,
  },
];

export const XP_PER_LEVEL = 100;

export function getLevel(xp: number): number {
  return Math.floor(xp / XP_PER_LEVEL) + 1;
}

export function getXpProgress(xp: number): number {
  return xp % XP_PER_LEVEL;
}
