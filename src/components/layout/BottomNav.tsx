import { BookOpen, Sparkles, Trophy, Swords, Lock } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useProgress } from '@/contexts/ProgressContext';
import { playClickSound } from '@/lib/sfx';
import { toast } from 'sonner';

const navItems = [
  { path: '/duel', icon: Swords, label: 'Song đấu', requiresLesson3: true },
  { path: '/leaderboard', icon: Trophy, label: 'Xếp hạng' },
  { path: '/learn', icon: BookOpen, label: 'Học' },
  { path: '/review', icon: Sparkles, label: 'Ôn tập' },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { progress } = useProgress();
  const duelUnlocked = progress.completedLessons.includes('b1-l3');

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-sm safe-area-pb">
      <div className="mx-auto flex max-w-lg items-center justify-around py-2">
        {navItems.map(item => {
          const active = location.pathname === item.path;
          const locked = item.requiresLesson3 && !duelUnlocked;
          return (
            <button
              key={item.path}
              data-tour={`nav-${item.path.slice(1)}`}
              onClick={() => {
                playClickSound();
                if (locked) {
                  toast('🔒 Hoàn thành Bài 3 để mở khoá Song Đấu!', { duration: 2500 });
                } else {
                  navigate(item.path);
                }
              }}
              className={cn(
                'flex flex-col items-center gap-0.5 px-4 py-1 rounded-xl transition-colors relative',
                locked ? 'text-muted-foreground/40' :
                active ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {locked ? (
                <div className="relative">
                  <item.icon className="h-6 w-6 opacity-40" />
                  <Lock className="h-3 w-3 absolute -top-1 -right-1 text-muted-foreground" />
                </div>
              ) : (
                <item.icon className={cn('h-6 w-6', active && 'fill-primary/20')} />
              )}
              <span className="text-[11px] font-bold">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
