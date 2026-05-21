import { motion } from "framer-motion";
import { Trophy, Flame, TrendingUp } from "lucide-react";
import { leaderboard } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function LeaderboardCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="glass rounded-2xl p-3 sm:p-4 md:p-5 shadow-card"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-warning shadow-md">
            <Trophy className="h-4 w-4 text-warning-foreground" />
          </div>
          <div className="min-w-0">
            <h2 className="text-sm sm:text-base font-bold truncate">Reyting jadvali</h2>
            <p className="text-[9px] sm:text-[10px] text-muted-foreground">Bu oylik XP bo'yicha</p>
          </div>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-success w-fit"
        >
          <TrendingUp className="h-3.5 w-3.5 shrink-0" />
          4-o'rin
        </motion.div>
      </div>

      <div className="mt-2 sm:mt-3 md:mt-4 space-y-1">
        {leaderboard.map((student, i) => (
          <motion.div
            key={student.rank}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.04 * i }}
            whileHover={{ scale: 1.01 }}
            className={cn(
              "flex items-center gap-1.5 sm:gap-2.5 rounded-xl p-1.5 sm:p-2.5 transition-all cursor-pointer",
              student.isMe
                ? "border border-primary/30 bg-primary/10 ring-1 ring-primary/20"
                : "hover:bg-accent/60"
            )}
          >
            <div className={cn(
              "grid h-6 w-6 sm:h-7 sm:w-7 shrink-0 place-items-center rounded-lg text-xs sm:text-sm font-bold",
              student.rank === 1 ? "bg-warning/20 text-warning" :
              student.rank === 2 ? "bg-muted-foreground/20 text-muted-foreground" :
              student.rank === 3 ? "bg-orange-500/20 text-orange-500" :
              "bg-muted text-muted-foreground"
            )}>
              {student.rank <= 3 ? student.badge : student.rank}
            </div>
            <img src={student.avatar} alt={student.name} className="h-7 w-7 sm:h-8 sm:w-8 rounded-full ring-1 ring-border shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1">
                <span className={cn(
                  "truncate text-xs sm:text-sm font-semibold",
                  student.isMe && "text-primary"
                )}>
                  {student.name}
                  {student.isMe && <span className="text-[8px] sm:text-[9px] text-primary/70 shrink-0">(Siz)</span>}
                </span>
              </div>
              <div className="text-[9px] sm:text-[10px] text-muted-foreground truncate">{student.course}</div>
            </div>
            <div className="flex flex-col items-end gap-0 shrink-0">
              <span className="text-xs sm:text-sm font-bold text-foreground">{(student.xp / 1000).toFixed(1)}k</span>
              <div className="flex items-center gap-0.5 text-[9px] sm:text-[10px] text-warning">
                <Flame className="h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0" />{student.streak}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        whileHover={{ scale: 1.01 }}
        className="mt-2 sm:mt-3 rounded-xl bg-gradient-primary/10 border border-primary/15 p-2 sm:p-2.5"
      >
        <p className="text-[10px] sm:text-[11px] text-muted-foreground text-center">
          Siz <span className="font-bold text-primary">4-o'rinda</span>siz — 1-o'ringa <span className="font-bold text-foreground">1,070 XP</span> qoldi!
        </p>
      </motion.div>
    </motion.div>
  );
}
