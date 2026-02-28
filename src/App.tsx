import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ProgressProvider } from "@/contexts/ProgressContext";
import AppLayout from "@/components/layout/AppLayout";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import Learn from "./pages/Learn";
import LessonDetail from "./pages/LessonDetail";
import Profile from "./pages/Profile";
import Review from "./pages/Review";
import Auth from "./pages/Auth";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import Leaderboard from "./pages/Leaderboard";
import DuelLobby from "./pages/DuelLobby";
import DuelBattle from "./pages/DuelBattle";
import DuelResult from "./pages/DuelResult";
import Onboarding from "./pages/Onboarding";
import Shop from "./pages/Shop";
import LoadingScreen from "./components/LoadingScreen";
import UpdateNotification from "./components/UpdateNotification";
import { useOnboardingCheck } from "./hooks/useOnboardingCheck";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const { needsOnboarding, checking } = useOnboardingCheck();

  if (loading || checking) return <LoadingScreen />;
  if (!user) return <Navigate to="/" replace />;
  if (needsOnboarding) return <Navigate to="/onboarding" replace />;
  return <>{children}</>;
}

function OnboardingRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/" replace />;
  return <>{children}</>;
}

function AuthRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to="/home" replace />;
  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <ProgressProvider>
          <Toaster />
          <Sonner />
          <UpdateNotification />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/auth" element={<AuthRoute><Auth /></AuthRoute>} />
              <Route path="/forgot-password" element={<AuthRoute><ForgotPassword /></AuthRoute>} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/onboarding" element={<OnboardingRoute><Onboarding /></OnboardingRoute>} />
              <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
                <Route path="/home" element={<Index />} />
                <Route path="/learn" element={<Learn />} />
                <Route path="/lesson/:lessonId" element={<LessonDetail />} />
                <Route path="/review" element={<Review />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/duel" element={<DuelLobby />} />
                <Route path="/duel/:duelId" element={<DuelBattle />} />
                <Route path="/duel/:duelId/result" element={<DuelResult />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/admin" element={<Admin />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ProgressProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
