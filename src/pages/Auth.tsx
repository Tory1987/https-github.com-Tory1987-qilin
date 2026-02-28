import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isSignUp) {
      const { error } = await signUp(email, password, displayName);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Đăng ký thành công! Vui lòng kiểm tra email để xác nhận tài khoản.');
      }
    } else {
      const { error } = await signIn(email, password);
      if (error) {
        toast.error(error.message);
      } else {
        navigate('/home');
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm space-y-8">

        {/* Logo */}
        <div className="text-center space-y-2">
          <img alt="QiLin mascot" className="mx-auto h-20 w-20 object-contain drop-shadow-lg" src="/lovable-uploads/f0f2e2ef-285c-4af1-961c-ea0a40b88c95.png" />
          <h1 className="text-2xl font-extrabold text-primary">Qilin</h1>
          <p className="text-sm text-muted-foreground">Học tiếng Trung phồn thể theo giáo trình Đương Đại</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp &&
          <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
              placeholder="Tên hiển thị"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="pl-10 h-12 rounded-xl" />

            </div>
          }
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-10 h-12 rounded-xl" />

          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="pl-10 h-12 rounded-xl" />

          </div>

          <Button type="submit" size="lg" className="w-full h-12 rounded-xl font-extrabold text-base" disabled={loading}>
            {loading ? 'Đang xử lý...' : isSignUp ? 'Đăng ký' : 'Đăng nhập'}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </form>


        {!isSignUp &&
        <div className="text-center">
            <Link to="/forgot-password" className="text-sm text-muted-foreground hover:text-primary hover:underline">
              Quên mật khẩu?
            </Link>
          </div>
        }

        <div className="text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm text-primary font-semibold hover:underline">

            {isSignUp ? 'Đã có tài khoản? Đăng nhập' : 'Chưa có tài khoản? Đăng ký'}
          </button>
        </div>
      </motion.div>
    </div>);

}