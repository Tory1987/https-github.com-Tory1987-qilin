import { Outlet } from 'react-router-dom';
import TopBar from './TopBar';
import BottomNav from './BottomNav';
import PushNotificationPrompt from '@/components/PushNotificationPrompt';
import { useSwipeNavigation } from '@/hooks/useSwipeNavigation';
import GuidedTour from '@/components/GuidedTour';

export default function AppLayout() {
  useSwipeNavigation();

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <PushNotificationPrompt />
      <main className="mx-auto max-w-lg px-4 pb-24" style={{ paddingTop: 'calc(4rem + env(safe-area-inset-top, 0px))' }}>
        <Outlet />
      </main>
      <BottomNav />
      <GuidedTour />
    </div>
  );
}
