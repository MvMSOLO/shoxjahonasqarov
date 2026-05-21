import { motion } from "framer-motion";
import { Flame, TrendingUp, Zap } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { profile } from "@/lib/mock-data";

export function HeroBanner() {
  const xpPct = Math.round((profile.xp / profile.xpMax) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-3xl shadow-card"
      style={{ minHeight: 160 }}
    >
      <img
        src="/images/hero-banner.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />

      <div className="relative flex h-full flex-col justify-between p-4 md:p-6">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 border border-primary/30 px-2.5 py-1 text-[11px] font-semibold text-primary">
            <Zap className="h-3 w-3" /> Level {profile.level} — Student v5
          </div>
          <h2 className="mt-2 text-xl font-bold md:text-2xl">
            Salom, {profile.name.split(" ")[0]}! 👋
          </h2>
          <p className="mt-1 max-w-xs text-sm text-muted-foreground">
            Bugun ham yangi bilimlar sari qadam tashla. Maqsadga {100 - xpPct}% qoldi!
          </p>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl bg-card/70 backdrop-blur px-3 py-1.5 border border-border/60">
            <Flame className="h-4 w-4 text-warning" />
            <span className="text-xs font-semibold">{profile.streak} kun streak</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-card/70 backdrop-blur px-3 py-1.5 border border-border/60">
            <TrendingUp className="h-4 w-4 text-success" />
            <span className="text-xs font-semibold">{profile.xp.toLocaleString()} XP</span>
          </div>
          <Link
            to="/timer"
            className="rounded-xl bg-gradient-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-glow transition-opacity hover:opacity-90"
          >
            Study Timer →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
