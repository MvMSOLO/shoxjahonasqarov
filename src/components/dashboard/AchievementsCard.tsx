import { motion } from "framer-motion";
import { Trophy, Lock, Star, Zap, Flame, BookOpen, Clock, Target } from "lucide-react";
import { cn } from "@/lib/utils";

const badges = [
  { id: "a1", emoji: "🔥", label: "12 kun streak", desc: "Ketma-ket 12 kun o'qidingiz!", unlocked: true, color: "from-orange-500 to-red-500" },
  { id: "a2", emoji: "⭐", label: "4.7 GPA", desc: "O'rtacha 4.7 ball natijasi", unlocked: true, color: "from-yellow-400 to-orange-500" },
  { id: "a3", emoji: "🏆", label: "Hackathon", desc: "Hackathon 2025 ishtirokchisi", unlocked: true, color: "from-violet-500 to-purple-700" },
  { id: "a4", emoji: "⚡", label: "Speed Coder", desc: "1 soatda 3 ta vazifa topshirgan", unlocked: true, color: "from-cyan-500 to-blue-600" },
  { id: "a5", emoji: "📚", label: "100 dars", desc: "Jami 100 ta darsni yakunlang", unlocked: false, progress: 68, total: 100 },
  { id: "a6", emoji: "🎯", label: "Perfect Score", desc: "100/100 ball oling", unlocked: false, progress: 95, total: 100 },
  { id: "a7", emoji: "🌙", label: "Night Owl", desc: "Kechasi 10 ta sessiya", unlocked: false, progress: 4, total: 10 },
  { id: "a8", emoji: "🚀", label: "Rocket", desc: "Birinchi o'ringa chiqing", unlocked: false, progress: 4, total: 1 },
];

const iconMap = { Trophy, Star, Zap, Flame, BookOpen, Clock, Target };

export function AchievementsCard() {
  const unlocked = badges.filter((b) => b.unlocked).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass rounded-2xl p-4 shadow-card md:p-5"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-warning shadow-md">
            <Trophy className="h-4 w-4 text-warning-foreground" />
          </div>
          <div>
            <h2 className="text-sm font-bold md:text-base">Yutuqlar</h2>
            <p className="text-[10px] text-muted-foreground">{unlocked}/{badges.length} badge qo'lga kiritildi</p>
          </div>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary">
          {unlocked}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-2">
        {badges.map((badge, i) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.04 * i }}
            title={`${badge.label}: ${badge.desc}`}
            className={cn(
              "group relative flex flex-col items-center gap-1 rounded-xl p-2 transition-all",
              badge.unlocked
                ? "cursor-pointer hover:-translate-y-0.5"
                : "opacity-50"
            )}
          >
            {badge.unlocked ? (
              <>
                <div className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br shadow-md text-xl",
                  badge.color
                )}>
                  {badge.emoji}
                </div>
                <span className="text-center text-[9px] font-medium leading-tight">{badge.label}</span>
              </>
            ) : (
              <>
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-lg">
                  <Lock className="absolute h-3 w-3 text-muted-foreground" />
                  <span className="opacity-30">{badge.emoji}</span>
                </div>
                <span className="text-center text-[9px] text-muted-foreground leading-tight">{badge.label}</span>
                {badge.progress !== undefined && badge.total !== undefined && (
                  <div className="w-full h-1 overflow-hidden rounded-full bg-muted/80">
                    <div
                      className="h-full rounded-full bg-gradient-primary"
                      style={{ width: `${Math.min(100, (badge.progress / badge.total) * 100)}%` }}
                    />
                  </div>
                )}
              </>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-3 rounded-xl bg-gradient-primary/8 border border-primary/12 p-2.5">
        <div className="flex items-center gap-2">
          <div className="text-base">🎯</div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold">Keyingi badge: 100 dars</p>
            <div className="mt-0.5 flex items-center gap-2">
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
                <div className="h-full w-[68%] rounded-full bg-gradient-primary" />
              </div>
              <span className="shrink-0 text-[10px] text-muted-foreground">68/100</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
