import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Crown, Sparkles, ShieldCheck, Flame, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProgress } from '@/contexts/ProgressContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { formatVND } from '@/lib/vietqr';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import PayOSCheckout from '@/components/PayOSCheckout';
import QilinMood from '@/components/QilinMood';

const HEART_PACKAGES = [
  { id: 'hearts_5', hearts: 5, price: 10000, popular: false },
  { id: 'hearts_15', hearts: 15, price: 20000, popular: true },
  { id: 'hearts_50', hearts: 50, price: 30000, popular: false },
];

const PREMIUM_PRICE = 499000;

export default function ShopPage() {
  const { progress } = useProgress();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<string | null>(null);
  const [checkout, setCheckout] = useState<{
    checkoutUrl: string;
    qrCode?: string;
    amount: number;
    orderCode: number;
  } | null>(null);

  const isPremium = progress.premiumUntil && new Date(progress.premiumUntil) > new Date();

  const handlePurchase = async (packageType: string) => {
    if (!user) return;
    setLoading(packageType);
    try {
      const { data, error } = await supabase.functions.invoke('create-qilin-payment', {
        body: { package_type: packageType },
      });

      if (error || !data?.success) {
        toast.error(data?.error || 'Không thể tạo thanh toán');
        return;
      }

      setCheckout({
        checkoutUrl: data.checkoutUrl,
        qrCode: data.qrCode,
        amount: data.amount,
        orderCode: data.orderCode,
      });
    } catch (err) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setLoading(null);
    }
  };

  if (checkout) {
    return (
      <div className="py-4">
        <PayOSCheckout
          checkoutUrl={checkout.checkoutUrl}
          qrCode={checkout.qrCode}
          amount={checkout.amount}
          orderCode={checkout.orderCode}
          onCancel={() => setCheckout(null)}
        />
        <Button variant="ghost" className="w-full" onClick={() => setCheckout(null)}>
          ← Quay lại cửa hàng
        </Button>
      </div>
    );
  }

  return (
    <div className="py-4 space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-extrabold">🏪 Cửa hàng</h1>
      </div>

      <QilinMood mood="excited" message="Mua thêm tim để học không giới hạn nhé!" size="sm" />

      {/* Premium Section */}
      {!isPremium && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-2xl border-2 border-secondary/50 bg-gradient-to-br from-secondary/10 to-secondary/5 p-5 overflow-hidden"
        >
          <div className="absolute top-3 right-3">
            <span className="bg-secondary text-secondary-foreground text-[10px] font-bold px-2 py-1 rounded-full">
              ⭐ HOT
            </span>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="h-12 w-12 rounded-xl bg-secondary/20 flex items-center justify-center">
              <Crown className="h-7 w-7 text-secondary" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold">Premium 1 năm</h2>
              <p className="text-2xl font-extrabold text-secondary">{formatVND(PREMIUM_PRICE)}</p>
            </div>
          </div>
          <div className="space-y-2 mb-4">
            {[
              { icon: Heart, text: 'Tim vô hạn — học thoải mái' },
              { icon: ShieldCheck, text: 'Bảo vệ streak — không mất chuỗi' },
              { icon: Sparkles, text: 'Hỗ trợ phát triển Qilin 🐉' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <item.icon className="h-4 w-4 text-secondary" />
                <span className="text-sm">{item.text}</span>
              </div>
            ))}
          </div>
          <Button
            className="w-full h-12 text-base font-bold bg-secondary hover:bg-secondary/90 text-secondary-foreground"
            onClick={() => handlePurchase('premium_year')}
            disabled={loading === 'premium_year'}
          >
            {loading === 'premium_year' ? 'Đang xử lý...' : 'Mua Premium'}
          </Button>
        </motion.div>
      )}

      {isPremium && (
        <div className="rounded-2xl border border-secondary/30 bg-secondary/5 p-4 text-center">
          <Crown className="h-8 w-8 text-secondary mx-auto mb-2" />
          <p className="font-bold text-secondary">Bạn đang là Premium! 🎉</p>
          <p className="text-xs text-muted-foreground">
            Hết hạn: {new Date(progress.premiumUntil!).toLocaleDateString('vi-VN')}
          </p>
        </div>
      )}

      {/* Hearts Section */}
      <div>
        <h2 className="text-lg font-extrabold mb-3 flex items-center gap-2">
          <Heart className="h-5 w-5 text-heart" /> Mua thêm tim
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Hiện có: <span className="font-bold text-heart">{isPremium ? '∞' : progress.hearts}</span> tim
        </p>
        <div className="space-y-3">
          {HEART_PACKAGES.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-2xl border p-4 flex items-center justify-between ${
                pkg.popular ? 'border-primary/50 bg-primary/5' : 'border-border bg-card'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: Math.min(pkg.hearts, 5) }).map((_, j) => (
                    <Heart key={j} className="h-4 w-4 text-heart fill-heart" />
                  ))}
                  {pkg.hearts > 5 && <span className="text-xs font-bold text-heart ml-1">×{pkg.hearts}</span>}
                </div>
                <div>
                  <p className="font-bold">{pkg.hearts} tim</p>
                  {pkg.popular && (
                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">
                      Phổ biến
                    </span>
                  )}
                </div>
              </div>
              <Button
                variant={pkg.popular ? 'default' : 'outline'}
                className="font-bold"
                onClick={() => handlePurchase(pkg.id)}
                disabled={loading === pkg.id}
              >
                {loading === pkg.id ? '...' : formatVND(pkg.price)}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      <p className="text-[11px] text-center text-muted-foreground">
        Thanh toán qua VietQR · Tự động cập nhật sau khi chuyển khoản
      </p>
    </div>
  );
}
