import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Volume2, ArrowRight, Sparkles, BookOpen, Clock, GraduationCap } from 'lucide-react';
import { speakChinese } from '@/lib/tts';
import { fireConfetti } from '@/lib/confetti';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { playClickSound } from '@/lib/sfx';

import qilinExcited from '@/assets/qilin-excited.png';
import qilinMascot from '@/assets/qilin-mascot.png';
import qilinProud from '@/assets/qilin-proud.png';
import qilinCelebrate from '@/assets/qilin-celebrate.png';
const qilinEncouraging = qilinExcited;

const TOTAL_STEPS = 5;

const SAMPLE_WORDS = [
  { traditional: '你好', pinyin: 'nǐ hǎo', meaning: 'Xin chào' },
  { traditional: '謝謝', pinyin: 'xiè xiè', meaning: 'Cảm ơn' },
  { traditional: '再見', pinyin: 'zài jiàn', meaning: 'Tạm biệt' },
];

const QUIZ_QUESTION = {
  question: '"謝謝" có nghĩa là gì?',
  options: ['Xin chào', 'Cảm ơn', 'Tạm biệt'],
  correctIndex: 1,
};

export default function OnboardingWizard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [chineseLevel, setChineseLevel] = useState<string | null>(null);
  const [dailyGoal, setDailyGoal] = useState<number | null>(null);
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [saving, setSaving] = useState(false);

  const nextStep = () => {
    playClickSound();
    setStep(s => s + 1);
  };

  const handleFlashcardNext = () => {
    playClickSound();
    if (flashcardIndex < SAMPLE_WORDS.length - 1) {
      setFlipped(false);
      setFlashcardIndex(i => i + 1);
    } else {
      setShowQuiz(true);
    }
  };

  const handleQuizAnswer = (idx: number) => {
    playClickSound();
    setQuizAnswer(idx);
    if (idx === QUIZ_QUESTION.correctIndex) {
      setTimeout(() => nextStep(), 800);
    }
  };

  const handleComplete = async () => {
    setSaving(true);
    fireConfetti();
    if (user) {
      await supabase
        .from('profiles')
        .update({
          onboarding_completed: true,
          chinese_level: chineseLevel,
          daily_goal_minutes: dailyGoal ?? 10,
        } as any)
        .eq('user_id', user.id);
    }
    setTimeout(() => navigate('/home', { replace: true }), 1500);
  };

  const stepImages = [qilinExcited, qilinMascot, qilinEncouraging, qilinProud, qilinCelebrate];

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Progress */}
      <div className="p-4 pt-[calc(1rem+env(safe-area-inset-top,0px))]">
        <Progress value={((step + 1) / TOTAL_STEPS) * 100} className="h-2" />
        <p className="text-xs text-muted-foreground text-center mt-1">{step + 1}/{TOTAL_STEPS}</p>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 overflow-hidden">
        <AnimatePresence mode="wait" custom={1}>
          <motion.div
            key={step}
            custom={1}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-full max-w-sm flex flex-col items-center text-center gap-6"
          >
            {/* Mascot */}
            <motion.img
              src={stepImages[step]}
              alt="Qilin"
              className="w-32 h-32 object-contain"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            />

            {/* Step 0: Welcome */}
            {step === 0 && (
              <>
                <h1 className="text-2xl font-extrabold text-foreground">Chào bạn! 👋</h1>
                <p className="text-muted-foreground">
                  Mình là <span className="font-bold text-primary">Qilin</span>, bạn đồng hành học tiếng Trung của bạn!
                </p>
                <p className="text-sm text-muted-foreground">Cùng bắt đầu hành trình nào!</p>
                <Button size="lg" className="w-full rounded-xl mt-4" onClick={nextStep}>
                  Bắt đầu <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </>
            )}

            {/* Step 1: Level */}
            {step === 1 && (
              <>
                <h2 className="text-xl font-bold text-foreground">Bạn đã biết tiếng Trung chưa?</h2>
                <div className="w-full space-y-3">
                  {[
                    { value: 'beginner', label: 'Mới hoàn toàn', icon: Sparkles, desc: 'Chưa biết gì cả' },
                    { value: 'basic', label: 'Biết chút ít', icon: BookOpen, desc: 'Biết vài từ cơ bản' },
                    { value: 'intermediate', label: 'Đã học rồi', icon: GraduationCap, desc: 'Đã học qua một thời gian' },
                  ].map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => { playClickSound(); setChineseLevel(opt.value); }}
                      className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                        chineseLevel === opt.value
                          ? 'border-primary bg-primary/10 shadow-md'
                          : 'border-border bg-card hover:border-primary/40'
                      }`}
                    >
                      <opt.icon className={`h-6 w-6 ${chineseLevel === opt.value ? 'text-primary' : 'text-muted-foreground'}`} />
                      <div className="text-left">
                        <p className="font-bold text-foreground">{opt.label}</p>
                        <p className="text-xs text-muted-foreground">{opt.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
                <Button
                  size="lg"
                  className="w-full rounded-xl mt-2"
                  disabled={!chineseLevel}
                  onClick={nextStep}
                >
                  Tiếp tục <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </>
            )}

            {/* Step 2: Daily goal */}
            {step === 2 && (
              <>
                <h2 className="text-xl font-bold text-foreground">Mỗi ngày bạn muốn học bao lâu?</h2>
                <div className="w-full space-y-3">
                  {[
                    { value: 5, label: 'Nhẹ nhàng', desc: '5 phút/ngày', emoji: '🌱' },
                    { value: 10, label: 'Vừa phải', desc: '10 phút/ngày', emoji: '🌿' },
                    { value: 20, label: 'Chăm chỉ', desc: '20 phút/ngày', emoji: '🌳' },
                  ].map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => { playClickSound(); setDailyGoal(opt.value); }}
                      className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                        dailyGoal === opt.value
                          ? 'border-primary bg-primary/10 shadow-md'
                          : 'border-border bg-card hover:border-primary/40'
                      }`}
                    >
                      <span className="text-2xl">{opt.emoji}</span>
                      <div className="text-left">
                        <p className="font-bold text-foreground">{opt.label}</p>
                        <p className="text-xs text-muted-foreground">{opt.desc}</p>
                      </div>
                      <Clock className={`ml-auto h-5 w-5 ${dailyGoal === opt.value ? 'text-primary' : 'text-muted-foreground'}`} />
                    </button>
                  ))}
                </div>
                <Button
                  size="lg"
                  className="w-full rounded-xl mt-2"
                  disabled={!dailyGoal}
                  onClick={nextStep}
                >
                  Tiếp tục <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </>
            )}

            {/* Step 3: Mini lesson */}
            {step === 3 && !showQuiz && (
              <>
                <h2 className="text-xl font-bold text-foreground">Thử ngay 3 từ đầu tiên! 🎯</h2>
                <div
                  className="w-full min-h-[200px] rounded-3xl border-2 shadow-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-card border-border"
                  onClick={() => { playClickSound(); setFlipped(!flipped); }}
                >
                  {!flipped ? (
                    <div className="text-center space-y-3">
                      <p className="text-7xl font-extrabold font-hanzi">{SAMPLE_WORDS[flashcardIndex].traditional}</p>
                      <p className="text-lg text-muted-foreground">{SAMPLE_WORDS[flashcardIndex].pinyin}</p>
                      <p className="text-xs text-muted-foreground">Chạm để lật</p>
                    </div>
                  ) : (
                    <div className="text-center space-y-3">
                      <p className="text-4xl font-extrabold font-hanzi">{SAMPLE_WORDS[flashcardIndex].traditional}</p>
                      <p className="text-sm text-muted-foreground">{SAMPLE_WORDS[flashcardIndex].pinyin}</p>
                      <div className="h-px bg-border w-16 mx-auto" />
                      <p className="text-xl font-bold text-primary">{SAMPLE_WORDS[flashcardIndex].meaning}</p>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                    onClick={(e) => { e.stopPropagation(); speakChinese(SAMPLE_WORDS[flashcardIndex].traditional); }}
                  >
                    <Volume2 className="h-5 w-5" />
                  </Button>
                  <span className="text-sm text-muted-foreground">{flashcardIndex + 1}/{SAMPLE_WORDS.length}</span>
                  <Button size="lg" className="rounded-xl" onClick={handleFlashcardNext}>
                    {flashcardIndex < SAMPLE_WORDS.length - 1 ? 'Tiếp' : 'Làm quiz'} <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </>
            )}

            {/* Step 3: Quiz */}
            {step === 3 && showQuiz && (
              <>
                <h2 className="text-xl font-bold text-foreground">Câu hỏi nhanh! 🤔</h2>
                <p className="text-lg font-semibold">{QUIZ_QUESTION.question}</p>
                <div className="w-full space-y-3">
                  {QUIZ_QUESTION.options.map((opt, idx) => {
                    const isCorrect = idx === QUIZ_QUESTION.correctIndex;
                    const isSelected = quizAnswer === idx;
                    let borderClass = 'border-border bg-card hover:border-primary/40';
                    if (isSelected) {
                      borderClass = isCorrect
                        ? 'border-primary bg-primary/10'
                        : 'border-destructive bg-destructive/10';
                    }
                    return (
                      <button
                        key={idx}
                        onClick={() => quizAnswer === null && handleQuizAnswer(idx)}
                        disabled={quizAnswer !== null}
                        className={`w-full p-4 rounded-2xl border-2 transition-all text-left font-semibold ${borderClass}`}
                      >
                        {opt}
                        {isSelected && isCorrect && <span className="ml-2">✅</span>}
                        {isSelected && !isCorrect && <span className="ml-2">❌</span>}
                      </button>
                    );
                  })}
                </div>
                {quizAnswer !== null && quizAnswer !== QUIZ_QUESTION.correctIndex && (
                  <Button variant="outline" onClick={() => setQuizAnswer(null)} className="rounded-xl">
                    Thử lại
                  </Button>
                )}
              </>
            )}

            {/* Step 4: Complete */}
            {step === 4 && (
              <>
                <h1 className="text-2xl font-extrabold text-foreground">Tuyệt vời! 🎉</h1>
                <p className="text-muted-foreground">
                  Bạn vừa học được <span className="font-bold text-primary">3 từ tiếng Trung</span> đầu tiên!
                </p>
                <p className="text-sm text-muted-foreground">Hành trình chinh phục tiếng Trung bắt đầu từ đây.</p>
                <Button
                  size="lg"
                  className="w-full rounded-xl mt-4"
                  onClick={handleComplete}
                  disabled={saving}
                >
                  {saving ? 'Đang lưu...' : 'Bắt đầu hành trình'} 🚀
                </Button>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
