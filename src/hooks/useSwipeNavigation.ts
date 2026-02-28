import { useRef, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { playClickSound } from '@/lib/sfx';

const SWIPE_THRESHOLD = 60; // minimum px to trigger
const SWIPE_MAX_Y = 80; // max vertical movement allowed
const EDGE_ZONE = 30; // px from screen edge to start swipe-back

// Tab order for bottom nav swipe left/right
const TAB_ORDER = ['/duel', '/leaderboard', '/learn', '/review'];

export function useSwipeNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const touchStart = useRef<{ x: number; y: number; time: number } | null>(null);
  const isLessonPage = location.pathname.startsWith('/lesson/');

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY, time: Date.now() };
  }, []);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (!touchStart.current) return;

    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStart.current.x;
    const dy = touch.clientY - touchStart.current.y;
    const elapsed = Date.now() - touchStart.current.time;
    const startX = touchStart.current.x;

    touchStart.current = null;

    // Must be fast enough and horizontal enough
    if (elapsed > 500 || Math.abs(dy) > SWIPE_MAX_Y || Math.abs(dx) < SWIPE_THRESHOLD) return;

    // On lesson pages: swipe right from left edge = go back
    if (isLessonPage) {
      if (dx > 0 && startX < EDGE_ZONE) {
        playClickSound();
        navigate(-1);
      }
      return;
    }

    // On tab pages: swipe between tabs
    const currentIndex = TAB_ORDER.indexOf(location.pathname);
    if (currentIndex === -1) return;

    if (dx > 0 && currentIndex > 0) {
      // Swipe right → previous tab
      playClickSound();
      navigate(TAB_ORDER[currentIndex - 1]);
    } else if (dx < 0 && currentIndex < TAB_ORDER.length - 1) {
      // Swipe left → next tab
      playClickSound();
      navigate(TAB_ORDER[currentIndex + 1]);
    }
  }, [navigate, location.pathname, isLessonPage]);

  useEffect(() => {
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchEnd]);
}
