import { motion } from "framer-motion";
import { Flame, TrendingUp, Zap, Sparkles, Brain } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { profile } from "@/lib/mock-data";

export function HeroBanner() {
  const xpPct = Math.round((profile.xp / profile.xpMax) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-3xl shadow-card"
      style={{ minHeight: 144 }}
    >
      {/* Background image */}
      <img src="/images/hero-banner.png" alt="" className="absolute inset-0 h-full w-full object-cover" loading="eager" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/75 to-background/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
      {/* Animated orbs */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-primary/20 blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -bottom-8 right-1/3 h-32 w-32 rounded-full bg-violet-500/20 blur-2xl"
      />

      <div className="relative flex h-full flex-col justify-between gap-3 p-3 sm:gap-4 sm:p-4 md:p-6">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 border border-primary/30 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-[11px] font-semibold text-primary"
            >
              <Zap className="h-3 w-3 shrink-0" /> Level {profile.level}
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-violet-500/20 to-purple-600/20 border border-violet-500/30 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-[11px] font-bold text-violet-300"
            >
              <Sparkles className="h-3 w-3 shrink-0" /> v6 AI
            </motion.div>
          </div>
          <h2 className="mt-2 text-lg sm:text-xl md:text-2xl font-bold">
            Salom, {profile.name.split(" ")[0]}! 👋
          </h2>
          <p className="mt-1 max-w-xs text-xs sm:text-sm text-muted-foreground line-clamp-2">
            Bugun ham yangi bilimlar sari qadam tashla. Maqsadga {100 - xpPct}% qoldi!
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 rounded-xl bg-card/70 backdrop-blur px-2.5 py-1 sm:px-3 sm:py-1.5 border border-border/60 text-[10px] sm:text-xs font-semibold"
          >
            <Flame className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-warning shrink-0" />
            <span>{profile.streak}d</span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 rounded-xl bg-card/70 backdrop-blur px-2.5 py-1 sm:px-3 sm:py-1.5 border border-border/60 text-[10px] sm:text-xs font-semibold"
          >
            <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-success shrink-0" />
            <span>{profile.xp.toLocaleString()}</span>
          </motion.div>
          <Link
            to="/ai-assistant"
            className="inline-flex items-center gap-1 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 px-2.5 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-semibold text-white shadow-glow transition-all hover:scale-105 hover:opacity-90 shrink-0"
          >
            <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> <span className="hidden sm:inline">AI</span>
          </Link>
          <Link
            to="/quiz"
            className="inline-flex items-center gap-1 rounded-xl bg-gradient-primary px-2.5 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-semibold text-primary-foreground shadow-glow transition-all hover:scale-105 hover:opacity-90 shrink-0"
          >
            <Brain className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> <span className="hidden sm:inline">Quiz</span>
          </Link>
          <Link
            to="/timer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-card/70 backdrop-blur border border-border/60 px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-accent"
          >
            Timer →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
