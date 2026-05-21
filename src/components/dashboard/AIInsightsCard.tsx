import { motion } from "framer-motion";
import { Sparkles, TrendingUp, BookOpen, Target, ChevronRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { profile, courseProgress } from "@/lib/mock-data";

const insights = [
  {
    icon: TrendingUp,
    color: "text-success",
    bg: "bg-success/10",
    title: "Streak davom ettirilmoqda",
    desc: `${profile.streak} kun ketma-ket — top 5% studentlar ichida!`,
  },
  {
    icon: BookOpen,
    color: "text-info",
    bg: "bg-info/10",
    title: "Keyingi o'quv tavsiyasi",
    desc: "React Hooks tugaganidan so'ng — Zustand state management boshlang.",
  },
  {
    icon: Target,
    color: "text-warning",
    bg: "bg-warning/10",
    title: "Maqsad: bu hafta",
    desc: `Frontend Engineering ${courseProgress.percent}% → 75% ga yetkazish uchun 3 dars qoldi.`,
  },
];

export function AIInsightsCard() {
  return (
    <div className="glass rounded-2xl p-4 shadow-card md:p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 shadow-glow">
            <Sparkles className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="text-sm font-bold">AI Tavsiyalar</span>
          <span className="rounded-md bg-primary/15 px-1.5 py-0.5 text-[9px] font-bold text-primary">v6</span>
        </div>
        <Link
          to="/ai-assistant"
          className="inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:underline"
        >
          AI bilan suhbat <ChevronRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="space-y-2.5">
        {insights.map((ins, i) => {
          const Icon = ins.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i }}
              className="flex items-start gap-2.5 rounded-xl border border-border/60 bg-card/50 p-2.5"
            >
              <div className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg ${ins.bg}`}>
                <Icon className={`h-3.5 w-3.5 ${ins.color}`} />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold">{ins.title}</div>
                <div className="text-[11px] text-muted-foreground leading-snug">{ins.desc}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <Link
        to="/ai-assistant"
        className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-violet-500/20 to-purple-600/20 border border-violet-500/20 px-3 py-2 text-xs font-semibold text-violet-300 transition-all hover:from-violet-500/30 hover:to-purple-600/30"
      >
        <Sparkles className="h-3.5 w-3.5" />
        AI Yordamchini ochish
      </Link>
    </div>
  );
}
