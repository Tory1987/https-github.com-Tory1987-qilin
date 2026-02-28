import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Mail, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      setSent(true);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <BookOpen className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-extrabold text-foreground">Quên mật khẩu</h1>
          <p className="text-sm text-muted-foreground">Nhập email để nhận link đặt lại mật khẩu</p>
        </div>

        {sent ? (
          <div className="rounded-2xl bg-primary/10 border border-primary/30 p-6 text-center space-y-3">
            <p className="text-4xl">📧</p>
            <p className="font-bold text-foreground">Đã gửi email!</p>
            <p className="text-sm text-muted-foreground">Kiểm tra hộp thư <span className="font-semibold text-foreground">{email}</span> để đặt lại mật khẩu.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="pl-10 h-12 rounded-xl" />
            </div>
            <Button type="submit" size="lg" className="w-full h-12 rounded-xl font-extrabold text-base" disabled={loading}>
              {loading ? 'Đang gửi...' : 'Gửi link đặt lại'} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>
        )}

        <div className="text-center">
          <Link to="/auth" className="inline-flex items-center text-sm text-primary font-semibold hover:underline">
            <ArrowLeft className="mr-1 h-4 w-4" /> Quay lại đăng nhập
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
