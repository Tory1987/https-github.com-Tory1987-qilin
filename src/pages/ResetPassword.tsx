import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isRecovery, setIsRecovery] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for PASSWORD_RECOVERY event
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setIsRecovery(true);
      }
    });

    // Also check hash for type=recovery
    const hash = window.location.hash;
    if (hash.includes('type=recovery')) {
      setIsRecovery(true);
    }

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Mật khẩu xác nhận không khớp!');
      return;
    }
    if (password.length < 6) {
      toast.error('Mật khẩu phải có ít nhất 6 ký tự!');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      toast.error(error.message);
    } else {
      setSuccess(true);
      setTimeout(() => navigate('/home'), 2000);
    }
  };

  if (!isRecovery) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm text-center space-y-4">
          <p className="text-4xl">🔒</p>
          <p className="text-muted-foreground">Link đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.</p>
          <Button onClick={() => navigate('/auth')} variant="outline" className="rounded-xl">Quay lại đăng nhập</Button>
        </motion.div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-sm text-center space-y-4">
          <CheckCircle2 className="mx-auto h-16 w-16 text-primary" />
          <h2 className="text-2xl font-extrabold text-foreground">Đổi mật khẩu thành công!</h2>
          <p className="text-sm text-muted-foreground">Đang chuyển hướng...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <BookOpen className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-extrabold text-foreground">Đặt lại mật khẩu</h1>
          <p className="text-sm text-muted-foreground">Nhập mật khẩu mới của bạn</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input type="password" placeholder="Mật khẩu mới" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} className="pl-10 h-12 rounded-xl" />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input type="password" placeholder="Xác nhận mật khẩu" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required minLength={6} className="pl-10 h-12 rounded-xl" />
          </div>
          <Button type="submit" size="lg" className="w-full h-12 rounded-xl font-extrabold text-base" disabled={loading}>
            {loading ? 'Đang xử lý...' : 'Đặt lại mật khẩu'} <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
