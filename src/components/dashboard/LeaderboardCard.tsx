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
      className="glass rounded-2xl p-4 shadow-card md:p-5"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-warning shadow-md">
            <Trophy className="h-4 w-4 text-warning-foreground" />
          </div>
          <div>
            <h2 className="text-sm font-bold md:text-base">Reyting jadvali</h2>
            <p className="text-[10px] text-muted-foreground">Bu oylik XP bo'yicha</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-semibold text-success">
          <TrendingUp className="h-3.5 w-3.5" />
          4-o'rin
        </div>
      </div>

      <div className="mt-4 space-y-1.5">
        {leaderboard.map((student, i) => (
          <motion.div
            key={student.rank}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.04 * i }}
            className={cn(
              "flex items-center gap-2.5 rounded-xl p-2.5 transition-all",
              student.isMe
                ? "border border-primary/30 bg-primary/10 ring-1 ring-primary/20"
                : "hover:bg-accent/60"
            )}
          >
            <div className={cn(
              "grid h-7 w-7 shrink-0 place-items-center rounded-lg text-sm font-bold",
              student.rank === 1 ? "bg-warning/20 text-warning" :
              student.rank === 2 ? "bg-muted-foreground/20 text-muted-foreground" :
              student.rank === 3 ? "bg-orange-500/20 text-orange-500" :
              "bg-muted text-muted-foreground"
            )}>
              {student.rank <= 3 ? student.badge : student.rank}
            </div>
            <img src={student.avatar} alt={student.name} className="h-8 w-8 rounded-full ring-1 ring-border" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className={cn(
                  "truncate text-xs font-semibold",
                  student.isMe && "text-primary"
                )}>
                  {student.name}
                  {student.isMe && <span className="ml-1 text-[9px] text-primary/70">(Siz)</span>}
                </span>
              </div>
              <div className="text-[10px] text-muted-foreground">{student.course}</div>
            </div>
            <div className="flex flex-col items-end shrink-0">
              <span className="text-xs font-bold text-foreground">{student.xp.toLocaleString()}</span>
              <div className="flex items-center gap-0.5 text-[10px] text-warning">
                <Flame className="h-3 w-3" />{student.streak}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-3 rounded-xl bg-gradient-primary/10 border border-primary/15 p-2.5 text-center">
        <p className="text-[11px] text-muted-foreground">
          Siz <span className="font-bold text-primary">4-o'rinda</span>siz — 1-o'ringa <span className="font-bold text-foreground">1,070 XP</span> qoldi!
        </p>
      </div>
    </motion.div>
  );
}
