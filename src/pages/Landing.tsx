import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Flame, Brain, Trophy, Star, Smartphone, ArrowRight, CheckCircle2, X, Share, PlusSquare, MousePointerClick, Headphones, PenTool, BarChart3, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import qilinMascot from '@/assets/qilin-excited.png';
import PwaInstallPrompt from '@/components/PwaInstallPrompt';

const features = [
{ icon: BookOpen, title: 'Giáo trình Đương Đại', desc: '4 quyển sách với hàng trăm bài học từ cơ bản đến nâng cao' },
{ icon: Brain, title: 'Ôn tập thông minh', desc: 'Hệ thống lặp lại ngắt quãng giúp ghi nhớ lâu dài' },
{ icon: Flame, title: 'Streak & XP', desc: 'Duy trì chuỗi học mỗi ngày, tích lũy XP lên cấp' },
{ icon: Trophy, title: 'Huy hiệu & Thành tích', desc: 'Mở khóa huy hiệu khi đạt các mốc quan trọng' }];


const highlights = [
'Bàn phím Pinyin IME tích hợp',
'Flashcard từ vựng & ngữ pháp',
'Bài tập đa dạng: điền từ, chọn đáp án, ghép câu',
'Nhiệm vụ hàng ngày',
'Theo dõi tiến độ chi tiết',
'Hoàn toàn miễn phí'];


export default function Landing() {
  const navigate = useNavigate();
  const [showIosGuide, setShowIosGuide] = useState(false);
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Hero */}
      <section className="relative px-4 pt-12 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-6 w-32 h-32">

          <img alt="Qilin mascot" className="w-full h-full object-contain drop-shadow-lg" src={qilinMascot} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-black text-foreground leading-tight">

          Học tiếng Trung
          <br />
          <span className="text-primary">cùng Qilin</span> 🐉
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-lg text-muted-foreground max-w-md mx-auto">

          Ứng dụng học tiếng Trung theo giáo trình Đương Đại — vui, hiệu quả và dễ học.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center">

          <Button
            size="lg"
            className="h-14 px-8 text-lg font-extrabold rounded-2xl shadow-lg animate-pulse-glow"
            onClick={() => navigate('/auth')}>

            Bắt đầu học ngay
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>

        {/* App Store buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center">

          <button
            onClick={() => setShowIosGuide(true)}
            className="flex items-center gap-3 rounded-2xl bg-foreground text-background px-6 py-3 font-bold hover:opacity-90 transition-opacity">

            <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <div className="text-left">
              <div className="text-[10px] leading-none opacity-80">Cài đặt cho</div>
              <div className="text-base leading-tight">iPhone / iPad</div>
            </div>
          </button>

          <a
            href="/downloads/qilin.apk"
            download="Qilin.apk"
            className="flex items-center gap-3 rounded-2xl bg-foreground text-background px-6 py-3 font-bold hover:opacity-90 transition-opacity">

            <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current">
              <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.3 2.3-8.636-8.632z" />
            </svg>
            <div className="text-left">
              <div className="text-[10px] leading-none opacity-80">Tải file APK</div>
              <div className="text-base leading-tight">Android</div>
            </div>
          </a>
        </motion.div>
      </section>

      {/* Features */}
      <section className="px-4 py-12 max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-2xl font-extrabold text-center mb-8">

          Tính năng nổi bật
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f, i) =>
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl bg-card border border-border p-5 shadow-sm">

              <f.icon className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-extrabold text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{f.desc}</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Highlights checklist */}
      <section className="px-4 py-12 max-w-md mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-2xl font-extrabold text-center mb-6">

          Qilin có gì?
        </motion.h2>

        <div className="space-y-3">
          {highlights.map((h, i) =>
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="flex items-center gap-3">

              <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
              <span className="font-bold text-foreground">{h}</span>
            </motion.div>
          )}
        </div>
      </section>

      {/* Hướng dẫn sử dụng */}
      <section className="px-4 py-12 max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-2xl font-extrabold text-center mb-2">
          Cách sử dụng Qilin
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm text-muted-foreground text-center mb-8">
          Chỉ 4 bước đơn giản để bắt đầu hành trình
        </motion.p>

        <div className="space-y-4">
          {[
          { step: 1, icon: MousePointerClick, title: 'Đăng ký tài khoản', desc: 'Tạo tài khoản miễn phí bằng email. Tiến độ học sẽ được lưu và đồng bộ trên mọi thiết bị.' },
          { step: 2, icon: BookOpen, title: 'Chọn bài học & học từ vựng', desc: 'Vào Hành trình học, chọn bài theo thứ tự. Mỗi bài gồm flashcard từ vựng (chạm để lật xem nghĩa), ngữ pháp và bài tập.' },
          { step: 3, icon: PenTool, title: 'Làm bài tập đa dạng', desc: 'Trắc nghiệm, điền từ, ghép câu, nghe chọn — mỗi dạng giúp bạn rèn luyện kỹ năng khác nhau. Sai mất ❤️ tim, hết tim phải chờ hồi phục!' },
          { step: 4, icon: Brain, title: 'Ôn tập & duy trì streak', desc: 'Mục Ôn tập sử dụng thuật toán lặp lại ngắt quãng (SRS) để nhắc bạn ôn đúng lúc. Học mỗi ngày để giữ 🔥 streak!' }].
          map((item, i) =>
          <motion.div
            key={item.step}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex gap-4 items-start rounded-2xl bg-card border border-border p-5 shadow-sm">

              <div className="flex flex-col items-center gap-1 shrink-0">
                <div className="bg-primary text-primary-foreground rounded-full w-9 h-9 flex items-center justify-center text-sm font-extrabold">
                  {item.step}
                </div>
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-extrabold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 rounded-2xl bg-primary/5 border border-primary/20 p-5">

          <h3 className="font-extrabold text-foreground flex items-center gap-2 mb-3">
            💡 Mẹo học hiệu quả
          </h3>
          <div className="space-y-2">
            {[
            'Học mỗi ngày 10-15 phút thay vì nhồi nhét một lần',
            'Bật âm thanh để luyện nghe phát âm chuẩn',
            'Hoàn thành nhiệm vụ hàng ngày để nhận XP bonus',
            'Ôn tập đúng lịch — đừng bỏ qua thông báo nhắc ôn!'].
            map((tip, i) =>
            <div key={i} className="flex items-start gap-2">
                <Star className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{tip}</span>
              </div>
            )}
          </div>
        </motion.div>
      </section>

      {/* Screenshots / Phone mockup placeholder */}
      <section className="px-4 py-12 text-center max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-card border border-border p-8 shadow-lg">

          <Smartphone className="h-16 w-16 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-extrabold mb-2">Học mọi lúc, mọi nơi</h3>
          <p className="text-muted-foreground text-sm">
            Trên điện thoại, máy tính bảng hay máy tính — Qilin luôn sẵn sàng cùng bạn chinh phục tiếng Trung.
          </p>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}>

          <h2 className="text-3xl font-black text-foreground mb-4">
            Sẵn sàng chưa? 🚀
          </h2>
          <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
            Tham gia cùng hàng nghìn người đang học tiếng Trung với Qilin!
          </p>
          <Button
            size="lg"
            className="h-14 px-10 text-lg font-extrabold rounded-2xl shadow-lg"
            onClick={() => navigate('/auth')}>

            Đăng ký miễn phí
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 text-center border-t border-border">
        <p className="text-sm text-muted-foreground">
          © 2026 Qilin — Học tiếng Trung vui vẻ 🐉
        </p>
      </footer>
      {/* iOS Add to Home Screen Guide */}
      <AnimatePresence>
        {showIosGuide &&
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center p-4"
          onClick={() => setShowIosGuide(false)}>

            <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="bg-card rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-border"
            onClick={(e) => e.stopPropagation()}>

              <div className="flex justify-between items-center mb-5">
                <h3 className="text-lg font-extrabold text-foreground">Cài lên màn hình chính</h3>
                <button onClick={() => setShowIosGuide(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold shrink-0">1</div>
                  <div>
                    <p className="font-bold text-foreground">Mở bằng Safari</p>
                    <p className="text-sm text-muted-foreground">Truy cập trang web này bằng trình duyệt Safari trên iPhone/iPad.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold shrink-0">2</div>
                  <div>
                    <p className="font-bold text-foreground flex items-center gap-1">Bấm nút Chia sẻ <Share className="h-4 w-4 text-primary" /></p>
                    <p className="text-sm text-muted-foreground">Nhấn vào biểu tượng chia sẻ ở thanh dưới cùng của Safari.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold shrink-0">3</div>
                  <div>
                    <p className="font-bold text-foreground flex items-center gap-1">Chọn "Thêm vào MH chính" <PlusSquare className="h-4 w-4 text-primary" /></p>
                    <p className="text-sm text-muted-foreground">Cuộn xuống và chọn "Thêm vào Màn hình chính", rồi bấm "Thêm".</p>
                  </div>
                </div>
              </div>

              <p className="mt-5 text-xs text-muted-foreground text-center">
                🎉 Xong! Ứng dụng Qilin sẽ xuất hiện trên màn hình chính như app thật.
              </p>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>
      <PwaInstallPrompt />
    </div>);

}