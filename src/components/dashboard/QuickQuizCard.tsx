import { Brain, ChevronRight, Star, Zap } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

const TOPICS = [
  { label: "React", emoji: "⚛️", xp: 150, color: "text-cyan-400" },
  { label: "JS", emoji: "🟡", xp: 120, color: "text-yellow-400" },
  { label: "TS", emoji: "🔷", xp: 180, color: "text-blue-400" },
];

const STREAK_DAYS = [true, true, true, false, false, false, false];

export function QuickQuizCard() {
  return (
    <div className="glass rounded-2xl p-4 shadow-card md:p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-600 shadow-glow">
            <Brain className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="text-sm font-bold">Kunlik Quiz</span>
        </div>
        <Link to="/quiz" className="inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:underline">
          Hammasi <ChevronRight className="h-3 w-3" />
        </Link>
      </div>

      {/* Weekly streak */}
      <div className="mb-3 flex items-center gap-1.5">
        {STREAK_DAYS.map((done, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full ${done ? "bg-gradient-primary" : "bg-muted"}`}
          />
        ))}
      </div>
      <div className="mb-3 text-[11px] text-muted-foreground">Bu hafta: 3/7 kun bajarildi</div>

      {/* Topics */}
      <div className="space-y-2">
        {TOPICS.map((t, i) => (
          <motion.div
            key={t.label}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.08 * i }}
          >
            <Link
              to="/quiz"
              className="flex items-center justify-between rounded-xl border border-border/60 bg-card/50 p-2.5 transition-colors hover:border-primary/40 hover:bg-accent"
            >
              <div className="flex items-center gap-2">
                <span className="text-base">{t.emoji}</span>
                <div>
                  <div className="text-xs font-semibold">{t.label}</div>
                  <div className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                    <Star className="h-2.5 w-2.5 fill-warning text-warning" /> 3 savol
                  </div>
                </div>
              </div>
              <div className={`flex items-center gap-0.5 text-[11px] font-bold ${t.color}`}>
                <Zap className="h-3 w-3" /> +{t.xp} XP
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <Link
        to="/quiz"
        className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-600 px-3 py-2 text-xs font-semibold text-white shadow-glow transition-transform hover:scale-[1.01]"
      >
        <Brain className="h-3.5 w-3.5" /> Quiz boshlash
      </Link>
    </div>
  );
}
