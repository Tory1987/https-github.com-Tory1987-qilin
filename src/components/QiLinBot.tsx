import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, GraduationCap } from 'lucide-react';
import { useProgress } from '@/contexts/ProgressContext';
import { curriculum } from '@/data/curriculum';
import { useLocation } from 'react-router-dom';
import { getQilinMood } from '@/components/QilinMood';
import { playClickSound } from '@/lib/sfx';
import qilinExcited from '@/assets/qilin-excited.png';
import qilinSad from '@/assets/qilin-sad.png';
import qilinSleepy from '@/assets/qilin-sleepy.png';
import qilinProud from '@/assets/qilin-proud.png';
const qilinEncouraging = qilinExcited;
import qilinDefault from '@/assets/qilin-mascot.png';
import qilinSurprised from '@/assets/qilin-surprised.png';

const moodImages: Record<string, string> = { excited: qilinExcited, sad: qilinSad, sleepy: qilinSleepy, proud: qilinProud, encouraging: qilinEncouraging, surprised: qilinSurprised, default: qilinDefault };

// Tutorial messages per route
const TUTORIAL_MESSAGES: Record<string, string> = {
  '/': '📚 Đây là trang chủ! Bạn có thể xem streak, XP và bài học tiếp theo ở đây.',
  '/learn': '🗺️ Đây là danh sách bài học. Nhấn vào bài bất kỳ để bắt đầu học!',
  '/lesson': '✏️ Trong bài học, bạn sẽ học từ vựng, ngữ pháp và làm bài tập. Nhấn nút 🔊 để nghe phát âm, nút ✍️ để luyện viết chữ!',
  '/review': '🔄 Đây là phần ôn tập. Các từ vựng bạn đã học sẽ xuất hiện ở đây để ôn lại!',
  '/leaderboard': '🏆 Bảng xếp hạng hiển thị thứ hạng của bạn so với người chơi khác!',
  '/duel': '⚔️ Song đấu cho bạn thi đấu với người chơi khác. Cần hoàn thành Bài 3 để mở khóa!',
  '/profile': '👤 Đây là trang cá nhân. Xem thành tích, huy hiệu và cài đặt tại đây!',
};

function getRouteKey(pathname: string): string {
  if (pathname.startsWith('/lesson/')) return '/lesson';
  if (pathname.startsWith('/duel')) return '/duel';
  return pathname;
}

function getSeenTutorials(): string[] {
  try {
    return JSON.parse(localStorage.getItem('qilin-tutorial-seen') || '[]');
  } catch { return []; }
}

function markTutorialSeen(routeKey: string) {
  const seen = getSeenTutorials();
  if (!seen.includes(routeKey)) {
    seen.push(routeKey);
    localStorage.setItem('qilin-tutorial-seen', JSON.stringify(seen));
  }
}

export function isQilinBotEnabled(): boolean {
  return localStorage.getItem('qilin-bot-enabled') !== 'false';
}

export function setQilinBotEnabled(enabled: boolean) {
  localStorage.setItem('qilin-bot-enabled', enabled ? 'true' : 'false');
}

// Helper to get current hour-based greeting
function getTimeGreeting(): string {
  const h = new Date().getHours();
  if (h < 6) return '夜深了！Khuya rồi, nghỉ sớm nhé! 🌙';
  if (h < 12) return '早安！Buổi sáng tốt lành! ☀️';
  if (h < 18) return '午安！Buổi chiều vui vẻ! 🌤️';
  return '晚安！Buổi tối yên lành! 🌙';
}

// Vocabulary tips from current lesson
function getVocabTip(completedLessons: string[]): string | null {
  const allLessons = curriculum.flatMap(b => b.lessons);
  const currentLesson = allLessons.find(l => l.unlocked && !completedLessons.includes(l.id));
  if (!currentLesson) return null;
  const vocabSection = currentLesson.sections.find(s => s.type === 'vocabulary');
  if (!vocabSection?.vocabulary?.length) return null;
  const word = vocabSection.vocabulary[Math.floor(Math.random() * vocabSection.vocabulary.length)];
  const tips = [
    `💡 Bạn biết không? "${word.traditional}" (${word.pinyin}) nghĩa là "${word.meaning}"!`,
    `📝 Từ mới: ${word.traditional} — ${word.pinyin} — ${word.meaning}`,
    `🧠 Nhớ từ này nhé: "${word.traditional}" đọc là "${word.pinyin}"`,
  ];
  if (word.exampleSentence) {
    tips.push(`✍️ Thử nói: "${word.exampleSentence}" — ${word.exampleMeaning}`);
  }
  return tips[Math.floor(Math.random() * tips.length)];
}

// Grammar tips from current lesson
function getGrammarTip(completedLessons: string[]): string | null {
  const allLessons = curriculum.flatMap(b => b.lessons);
  const currentLesson = allLessons.find(l => l.unlocked && !completedLessons.includes(l.id));
  if (!currentLesson) return null;
  const grammarSection = currentLesson.sections.find(s => s.type === 'grammar');
  if (!grammarSection?.grammar?.length) return null;
  const point = grammarSection.grammar[Math.floor(Math.random() * grammarSection.grammar.length)];
  const example = point.examples[Math.floor(Math.random() * point.examples.length)];
  return `📖 Mẫu câu: ${point.pattern}\nVD: "${example.sentence}" — ${example.meaning}`;
}

function getMilestoneMessage(progress: { xp: number; level: number; streak: number; hearts: number; maxHearts: number; completedLessons: string[]; vocabularyMastered: string[]; }): string | null {
  const completed = progress.completedLessons.length;
  const totalLessons = curriculum.reduce((sum, b) => sum + b.lessons.length, 0);
  const pct = totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;
  if (progress.level >= 10) return `🐉 Cấp ${progress.level}! Bạn là Rồng Tiếng Trung rồi!`;
  if (progress.level >= 5) return `⚔️ Cấp ${progress.level}! Bạn đang tiến bộ rất nhanh!`;
  if (pct >= 75) return `🏅 ${pct}% giáo trình hoàn thành! Sắp chinh phục xong rồi!`;
  if (pct >= 50) return `🎯 Đã đi được nửa đường! ${completed}/${totalLessons} bài hoàn thành!`;
  if (pct >= 25) return `📊 ${pct}% tiến độ! Cứ tiếp tục nhé!`;
  const mastered = progress.vocabularyMastered.length;
  if (mastered >= 50) return `📚 ${mastered} từ đã thuộc! Vốn từ đáng nể!`;
  if (mastered >= 20) return `✨ ${mastered} từ vựng đã master! Tuyệt lắm!`;
  return null;
}

function getHeartMessage(hearts: number, maxHearts: number): string | null {
  if (hearts <= 1) return `💔 Chỉ còn ${hearts} tim! Cẩn thận nhé, đọc kỹ đề trước khi trả lời!`;
  if (hearts <= 2) return `❤️ Còn ${hearts} tim thôi. Bình tĩnh, suy nghĩ kỹ nhé!`;
  if (hearts === maxHearts) return `❤️❤️❤️ Tim đầy! Sẵn sàng chiến đấu thôi! 💪`;
  return null;
}

function getBookMessage(completedLessons: string[]): string | null {
  for (const book of curriculum) {
    const bookCompleted = book.lessons.filter(l => completedLessons.includes(l.id)).length;
    if (bookCompleted === book.lessons.length && book.lessons.length > 0) {
      return `🎊 Hoàn thành ${book.titleChinese} ${book.title}! Xuất sắc!`;
    }
    if (bookCompleted > 0 && bookCompleted < book.lessons.length) {
      return `📖 ${book.titleChinese}: ${bookCompleted}/${book.lessons.length} bài. Cố thêm chút nữa!`;
    }
  }
  return null;
}

export default function QiLinBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isTutorial, setIsTutorial] = useState(false);
  const { progress } = useProgress();
  const { mood } = getQilinMood(progress);
  const currentMoodImage = moodImages[mood] || moodImages.default;
  const location = useLocation();

  const routeKey = getRouteKey(location.pathname);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Reset message index when route changes
  useEffect(() => {
    setMessageIndex(0);
    setDismissed(false);
  }, [routeKey]);

  // Check if tutorial should show for current route
  const tutorialMessage = useMemo(() => {
    const seen = getSeenTutorials();
    if (seen.includes(routeKey)) return null;
    return TUTORIAL_MESSAGES[routeKey] || null;
  }, [routeKey]);

  // Collect regular messages
  const regularMessages = useMemo(() => {
    const pool: string[] = [];
    pool.push(getTimeGreeting());

    const heartMsg = getHeartMessage(progress.hearts, progress.maxHearts);
    if (heartMsg) pool.push(heartMsg);

    if (progress.streak >= 30) pool.push(`🐉 Streak ${progress.streak} ngày! Bạn là huyền thoại!`);
    else if (progress.streak >= 14) pool.push(`🔥🔥 ${progress.streak} ngày liên tục! Không gì cản được bạn!`);
    else if (progress.streak >= 7) pool.push(`🔥 1 tuần liên tục! Streak ${progress.streak} ngày!`);
    else if (progress.streak >= 3) pool.push(`✨ Streak ${progress.streak} ngày rồi! Giữ vững nhé!`);
    else if (progress.streak === 0) pool.push('🌱 Bắt đầu streak mới nào! Học 1 bài để khởi động!');

    const milestone = getMilestoneMessage(progress);
    if (milestone) pool.push(milestone);
    const bookMsg = getBookMessage(progress.completedLessons);
    if (bookMsg) pool.push(bookMsg);
    const vocabTip = getVocabTip(progress.completedLessons);
    if (vocabTip) pool.push(vocabTip);
    const grammarTip = getGrammarTip(progress.completedLessons);
    if (grammarTip) pool.push(grammarTip);

    if (progress.xp >= 500) pool.push(`💎 ${progress.xp} XP! Bạn là siêu sao!`);
    else if (progress.xp >= 200) pool.push(`🚀 ${progress.xp} XP! Tiến bộ vượt bậc!`);
    else if (progress.xp >= 50) pool.push(`⭐ ${progress.xp} XP! Đang trên đà phát triển!`);
    else if (progress.xp === 0) pool.push('⭐ Hãy hoàn thành bài đầu tiên để nhận XP nào!');

    pool.push(
      '加油！Cố lên bạn ơi! 💪',
      '學中文很有趣！Học tiếng Trung thú vị lắm! 🎊',
      '一步一步來！Từng bước một nhé! 🐾',
      '你很棒！Bạn giỏi lắm! 🌟',
      'QiLin luôn ở đây cổ vũ bạn! 🦄',
      '每天進步一點點！Mỗi ngày tiến bộ một chút! 📈',
    );

    return pool;
  }, [progress]);

  // Determine current message
  const currentMessage = useMemo(() => {
    if (tutorialMessage && messageIndex === 0) {
      setIsTutorial(true);
      return tutorialMessage;
    }
    setIsTutorial(false);
    const idx = tutorialMessage ? messageIndex - 1 : messageIndex;
    return regularMessages[idx % regularMessages.length];
  }, [tutorialMessage, messageIndex, regularMessages]);

  const handleTap = () => {
    playClickSound();
    if (dismissed || !isOpen) {
      setDismissed(false);
      setIsOpen(true);
    } else {
      // If showing tutorial, mark as seen when moving to next
      if (tutorialMessage && messageIndex === 0) {
        markTutorialSeen(routeKey);
      }
      setMessageIndex(i => i + 1);
    }
  };

  return (
    <div className="fixed bottom-20 right-4 z-50 flex flex-col items-end gap-2">
      <AnimatePresence>
        {isOpen && !dismissed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className={`relative max-w-[240px] rounded-2xl border p-3 shadow-xl backdrop-blur-md ${
              isTutorial
                ? 'bg-background/95 border-primary/40'
                : 'bg-background/95 border-border'
            }`}
          >
            <button
              onClick={() => setDismissed(true)}
              className="absolute -top-2 -right-2 rounded-full bg-muted p-0.5"
            >
              <X className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
            <div className="flex items-center gap-1.5 mb-1">
              {isTutorial && <GraduationCap className="h-3.5 w-3.5 text-primary" />}
              <p className="text-xs font-bold text-primary">
                {isTutorial ? 'Hướng dẫn' : 'QiLin 麒麟'}
              </p>
            </div>
            <p className="text-xs text-foreground leading-relaxed whitespace-pre-line">{currentMessage}</p>
            {isTutorial && (
              <p className="text-[10px] text-muted-foreground mt-1.5 italic">Nhấn QiLin để tiếp tục →</p>
            )}
            <div className="absolute -bottom-2 right-6 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-border" />
            <div className={`absolute -bottom-[6px] right-6 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-background/95`} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
        whileTap={{ scale: 0.9 }}
        onClick={handleTap}
        className="h-16 w-16 overflow-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={mood}
            src={currentMoodImage}
            alt="QiLin mascot"
            className="h-full w-full object-contain drop-shadow-lg"
            initial={{ scale: 0.5, rotate: -10, opacity: 0 }}
            animate={{ scale: [1, 1.15, 1], rotate: [0, 6, -6, 0], opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          />
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
