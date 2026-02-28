import { useEffect, useRef } from 'react';
import { useProgress } from '@/contexts/ProgressContext';
import { ACHIEVEMENTS } from '@/data/achievements';
import { toast } from '@/hooks/use-toast';
import { playFanfare } from '@/lib/sfx';

export function useAchievements() {
  const { progress, addBadge } = useProgress();
  const checkedRef = useRef(false);

  useEffect(() => {
    // Only check after initial load
    if (!progress.lastStudyDate) return;
    
    for (const achievement of ACHIEVEMENTS) {
      if (progress.badges.includes(achievement.id)) continue;
      if (achievement.condition(progress)) {
        addBadge(achievement.id);
        // Small delay so toast doesn't stack
        setTimeout(() => {
          playFanfare();
          toast({
            title: `${achievement.icon} Huy hiệu mới!`,
            description: `${achievement.name} — ${achievement.description}`,
          });
        }, checkedRef.current ? 500 : 1000);
        checkedRef.current = true;
      }
    }
  }, [progress.completedLessons.length, progress.xp, progress.streak, progress.level, progress.vocabularyMastered.length, progress.crownLevels]);

  return {
    earned: ACHIEVEMENTS.filter(a => progress.badges.includes(a.id)),
    all: ACHIEVEMENTS,
    totalEarned: progress.badges.filter(b => ACHIEVEMENTS.find(a => a.id === b)).length,
  };
}
