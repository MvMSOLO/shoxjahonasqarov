import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Trophy, RotateCcw, CheckCircle2, XCircle, Zap, ChevronRight, Star } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { cn } from "@/lib/utils";
import { generateQuiz, type QuizQuestion } from "@/lib/ai-client";
import { toast } from "sonner";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "AI Quiz — EduPro v6" },
      { name: "description", content: "AI yordamida bilimingizni sinang va XP yig'ing." },
    ],
  }),
  component: QuizPage,
});

const TOPICS = [
  { id: "react", label: "React", emoji: "⚛️", color: "from-cyan-500 to-blue-500", xp: 150 },
  { id: "javascript", label: "JavaScript", emoji: "🟡", color: "from-yellow-500 to-amber-500", xp: 120 },
  { id: "typescript", label: "TypeScript", emoji: "🔷", color: "from-blue-500 to-indigo-500", xp: 180 },
  { id: "python", label: "Python", emoji: "🐍", color: "from-green-500 to-emerald-500", xp: 130 },
  { id: "css", label: "CSS & Tailwind", emoji: "🎨", color: "from-pink-500 to-rose-500", xp: 100 },
  { id: "node", label: "Node.js", emoji: "🟢", color: "from-emerald-500 to-teal-500", xp: 140 },
];

type QuizState = "select" | "loading" | "active" | "result";

function QuizPage() {
  const [state, setState] = useState<QuizState>("select");
  const [selectedTopic, setSelectedTopic] = useState<(typeof TOPICS)[0] | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [totalXP, setTotalXP] = useState(0);

  const startQuiz = async (topic: (typeof TOPICS)[0]) => {
    setSelectedTopic(topic);
    setState("loading");
    try {
      const qs = await generateQuiz(topic.id);
      setQuestions(qs);
      setCurrent(0);
      setAnswers([]);
      setSelected(null);
      setRevealed(false);
      setState("active");
    } catch {
      toast.error("Quiz yuklanmadi. Qayta urinib ko'ring.");
      setState("select");
    }
  };

  const selectAnswer = (idx: number) => {
    if (revealed) return;
    setSelected(idx);
    setRevealed(true);
    const correct = questions[current]?.correct === idx;
    if (correct) {
      toast.success("+50 XP! Zo'r! 🎉", { duration: 1500 });
      setTotalXP((x) => x + 50);
    }
  };

  const nextQuestion = () => {
    setAnswers((a) => [...a, selected ?? -1]);
    if (current + 1 >= questions.length) {
      setState("result");
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setRevealed(false);
    }
  };

  const q = questions[current];
  const score = answers.filter((a, i) => a === questions[i]?.correct).length;
  const percent = questions.length ? Math.round((score / questions.length) * 100) : 0;

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl space-y-4">
        {/* Header */}
        <PageHero
          image="/images/quiz-hero.png"
          title="AI Quiz"
          subtitle="Bilimingizni sinang — XP yig'ing va o'sib boring"
          badge="🧠 AI Quiz · v6"
          badgeClass="bg-violet-500/20 border border-violet-500/30 text-violet-300"
          height="min-h-[120px]"
        >
          {totalXP > 0 && (
            <div className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-warning px-3 py-1.5 text-xs font-bold text-warning-foreground">
              <Zap className="h-3.5 w-3.5" /> +{totalXP} XP
            </div>
          )}
        </PageHero>

        <AnimatePresence mode="wait">
          {/* Topic select */}
          {state === "select" && (
            <motion.div key="select" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
              <div className="glass rounded-2xl p-4 shadow-card md:p-5">
                <h2 className="mb-4 text-sm font-bold">Mavzu tanlang</h2>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {TOPICS.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => startQuiz(t)}
                      className="group relative overflow-hidden rounded-2xl border border-border bg-card/60 p-4 text-left transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow"
                    >
                      <div className={`absolute -right-4 -top-4 h-16 w-16 rounded-full bg-gradient-to-br ${t.color} opacity-10 blur-xl transition-opacity group-hover:opacity-20`} />
                      <div className="text-2xl">{t.emoji}</div>
                      <div className="mt-2 text-sm font-bold">{t.label}</div>
                      <div className="mt-1 text-[10px] text-muted-foreground">+{t.xp} XP gacha</div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Loading */}
          {state === "loading" && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="glass flex flex-col items-center gap-4 rounded-2xl p-12 shadow-card text-center">
              <div className="relative h-16 w-16">
                <div className="absolute inset-0 animate-ping rounded-full bg-primary/30" />
                <div className="relative grid h-16 w-16 place-items-center rounded-full bg-gradient-primary shadow-glow">
                  <Brain className="h-8 w-8 text-white" />
                </div>
              </div>
              <div>
                <div className="font-bold">AI savollar tayyorlamoqda...</div>
                <div className="text-xs text-muted-foreground">{selectedTopic?.label} mavzusida</div>
              </div>
            </motion.div>
          )}

          {/* Active quiz */}
          {state === "active" && q && (
            <motion.div key={`q-${current}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="space-y-3">
              {/* Progress */}
              <div className="glass rounded-2xl p-4 shadow-card">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Savol {current + 1} / {questions.length}</span>
                  <span className={cn("font-bold", selectedTopic && `text-transparent bg-clip-text bg-gradient-to-r ${selectedTopic.color}`)}>{selectedTopic?.label}</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${selectedTopic?.color}`}
                    animate={{ width: `${((current + 1) / questions.length) * 100}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="glass rounded-2xl p-5 shadow-card md:p-6">
                <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{q.topic}</div>
                <h2 className="text-base font-bold leading-snug md:text-lg">{q.question}</h2>
                <div className="mt-4 space-y-2.5">
                  {q.options.map((opt, i) => {
                    const isCorrect = i === q.correct;
                    const isSelected = i === selected;
                    return (
                      <button
                        key={i}
                        onClick={() => selectAnswer(i)}
                        disabled={revealed}
                        className={cn(
                          "relative w-full rounded-xl border p-3.5 text-left text-sm font-medium transition-all",
                          !revealed && "hover:border-primary/50 hover:bg-accent border-border bg-card/60",
                          revealed && isCorrect && "border-success/60 bg-success/10 text-success",
                          revealed && isSelected && !isCorrect && "border-destructive/60 bg-destructive/10 text-destructive",
                          revealed && !isSelected && !isCorrect && "border-border/40 bg-card/30 opacity-50"
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className={cn(
                            "grid h-6 w-6 shrink-0 place-items-center rounded-full border text-xs font-bold",
                            revealed && isCorrect ? "border-success bg-success/20 text-success" :
                            revealed && isSelected && !isCorrect ? "border-destructive bg-destructive/20 text-destructive" :
                            "border-border bg-card"
                          )}>
                            {revealed && isCorrect ? <CheckCircle2 className="h-4 w-4" /> :
                             revealed && isSelected && !isCorrect ? <XCircle className="h-4 w-4" /> :
                             String.fromCharCode(65 + i)}
                          </span>
                          {opt}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                <AnimatePresence>
                  {revealed && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                      className="mt-3 overflow-hidden rounded-xl border border-primary/20 bg-primary/5 p-3.5">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-primary">Tushuntirish</div>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{q.explanation}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {revealed && (
                  <button
                    onClick={nextQuestion}
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.01]"
                  >
                    {current + 1 >= questions.length ? "Natijani ko'rish" : "Keyingi savol"}
                    <ChevronRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* Result */}
          {state === "result" && (
            <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-2xl p-6 shadow-card text-center md:p-8">
              <div className={cn(
                "mx-auto mb-4 grid h-20 w-20 place-items-center rounded-3xl shadow-glow",
                percent >= 80 ? "bg-gradient-success" : percent >= 50 ? "bg-gradient-warning" : "bg-gradient-rose"
              )}>
                <Trophy className="h-10 w-10 text-white" />
              </div>
              <div className="text-3xl font-bold">{score} / {questions.length}</div>
              <div className={cn(
                "mt-1 text-lg font-semibold",
                percent >= 80 ? "text-success" : percent >= 50 ? "text-warning" : "text-destructive"
              )}>
                {percent >= 80 ? "Ajoyib natija! 🏆" : percent >= 50 ? "Yaxshi urinish! 👍" : "Ko'proq mashq kerak 💪"}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">{percent}% to'g'ri javoblar</div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="rounded-xl border border-border bg-card p-3">
                  <div className="text-xl font-bold text-success">{score}</div>
                  <div className="text-[10px] text-muted-foreground">To'g'ri</div>
                </div>
                <div className="rounded-xl border border-border bg-card p-3">
                  <div className="text-xl font-bold text-destructive">{questions.length - score}</div>
                  <div className="text-[10px] text-muted-foreground">Noto'g'ri</div>
                </div>
                <div className="rounded-xl border border-border bg-card p-3">
                  <div className="text-xl font-bold text-warning">+{totalXP}</div>
                  <div className="text-[10px] text-muted-foreground">XP yig'ildi</div>
                </div>
              </div>

              {percent >= 70 && (
                <div className="mt-4 flex justify-center gap-1">
                  {[...Array(Math.ceil(percent / 25))].map((_, i) => (
                    <Star key={i} className="h-6 w-6 fill-warning text-warning" />
                  ))}
                </div>
              )}

              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => selectedTopic && startQuiz(selectedTopic)}
                  className="flex-1 rounded-xl bg-gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.01]"
                >
                  <RotateCcw className="mr-1.5 inline h-3.5 w-3.5" /> Qayta boshlash
                </button>
                <button
                  onClick={() => { setState("select"); setTotalXP(0); }}
                  className="flex-1 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  Mavzu o'zgartirish
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppShell>
  );
}
