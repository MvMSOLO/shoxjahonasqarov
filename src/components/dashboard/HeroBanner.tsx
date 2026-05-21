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
      style={{ minHeight: 168 }}
    >
      {/* Background gradient (no external image dependency) */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/10 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.62_0.22_280/25%),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,oklch(0.7_0.2_305/15%),transparent_60%)]" />
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

      <div className="relative flex h-full flex-col justify-between p-4 md:p-6">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 border border-primary/30 px-2.5 py-1 text-[11px] font-semibold text-primary">
              <Zap className="h-3 w-3" /> Level {profile.level} — Student
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-violet-500/20 to-purple-600/20 border border-violet-500/30 px-2.5 py-1 text-[11px] font-bold text-violet-300">
              <Sparkles className="h-3 w-3" /> v6 — AI Platform
            </div>
          </div>
          <h2 className="mt-2 text-xl font-bold md:text-2xl">
            Salom, {profile.name.split(" ")[0]}! 👋
          </h2>
          <p className="mt-1 max-w-xs text-sm text-muted-foreground">
            Bugun ham yangi bilimlar sari qadam tashla. Maqsadga {100 - xpPct}% qoldi!
          </p>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 rounded-xl bg-card/70 backdrop-blur px-3 py-1.5 border border-border/60">
            <Flame className="h-4 w-4 text-warning" />
            <span className="text-xs font-semibold">{profile.streak} kun streak</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-card/70 backdrop-blur px-3 py-1.5 border border-border/60">
            <TrendingUp className="h-4 w-4 text-success" />
            <span className="text-xs font-semibold">{profile.xp.toLocaleString()} XP</span>
          </div>
          <Link
            to="/ai-assistant"
            className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 px-3 py-1.5 text-xs font-semibold text-white shadow-glow transition-all hover:scale-105 hover:opacity-90"
          >
            <Sparkles className="h-3.5 w-3.5" /> AI Yordamchi
          </Link>
          <Link
            to="/quiz"
            className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-glow transition-all hover:scale-105 hover:opacity-90"
          >
            <Brain className="h-3.5 w-3.5" /> Quiz boshlash
          </Link>
          <Link
            to="/timer"
            className="rounded-xl bg-card/70 backdrop-blur border border-border/60 px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-accent"
          >
            Study Timer →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
