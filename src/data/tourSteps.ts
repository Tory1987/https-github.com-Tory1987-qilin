export interface TourStep {
  selector: string;
  content: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

export const tourSteps: Record<string, TourStep[]> = {
  '/': [
    { selector: '[data-tour="stat-streak"]', content: '🔥 Đây là chuỗi ngày học (Streak). Học mỗi ngày để tăng streak!', position: 'bottom' },
    { selector: '[data-tour="stat-xp"]', content: '⚡ Điểm XP — hoàn thành bài học và bài tập để nhận thêm XP!', position: 'bottom' },
    { selector: '[data-tour="stat-level"]', content: '🏆 Cấp độ của bạn. XP đủ sẽ tự động lên cấp!', position: 'bottom' },
    { selector: '[data-tour="continue-btn"]', content: '📚 Nhấn nút này để học bài tiếp theo ngay!', position: 'top' },
  ],
  '/learn': [
    { selector: '[data-tour="lesson-list"]', content: '🗺️ Đây là danh sách bài học theo giáo trình. Nhấn vào bài bất kỳ để bắt đầu!', position: 'top' },
    { selector: '[data-tour="nav-learn"]', content: '📖 Nhấn vào đây bất cứ lúc nào để quay lại trang Học.', position: 'top' },
  ],
  '/review': [
    { selector: '[data-tour="review-area"]', content: '🧠 Ôn tập từ vựng theo thuật toán SM-2. Lật thẻ để xem nghĩa, rồi đánh giá mức nhớ!', position: 'top' },
    { selector: '[data-tour="nav-review"]', content: '✨ Nhấn đây để vào trang Ôn tập bất cứ lúc nào.', position: 'top' },
  ],
  '/leaderboard': [
    { selector: '[data-tour="leaderboard"]', content: '🏆 Bảng xếp hạng! Xem thứ hạng XP, tuần, bài học và PvP.', position: 'top' },
    { selector: '[data-tour="nav-leaderboard"]', content: '🥇 Nhấn đây để xem bảng xếp hạng.', position: 'top' },
  ],
  '/duel': [
    { selector: '[data-tour="duel-start"]', content: '⚔️ Nhấn để tạo phòng Song Đấu! Mỗi ngày có 3 lượt, thắng được +1 tim.', position: 'top' },
    { selector: '[data-tour="nav-duel"]', content: '🗡️ Nhấn đây để vào Song Đấu bất cứ lúc nào.', position: 'top' },
  ],
  '/profile': [
    { selector: '[data-tour="achievements"]', content: '🏅 Huy hiệu của bạn. Hoàn thành thành tích để mở khoá!', position: 'top' },
  ],
};

export function getRouteKey(pathname: string): string {
  if (pathname === '/home') return '/';
  if (pathname.startsWith('/lesson/')) return '/lesson';
  if (pathname.startsWith('/duel')) return '/duel';
  return pathname;
}

export function getSeenTours(): string[] {
  try {
    return JSON.parse(localStorage.getItem('qilin-tour-seen') || '[]');
  } catch { return []; }
}

export function markTourSeen(routeKey: string) {
  const seen = getSeenTours();
  if (!seen.includes(routeKey)) {
    seen.push(routeKey);
    localStorage.setItem('qilin-tour-seen', JSON.stringify(seen));
  }
}

export function resetAllTours() {
  localStorage.removeItem('qilin-tour-seen');
}
