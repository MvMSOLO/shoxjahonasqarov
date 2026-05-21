import { motion } from "framer-motion";
import { activity } from "@/lib/mock-data";
import { CheckCircle2, Upload, Calendar, Sparkles } from "lucide-react";

const ICONS = [CheckCircle2, Upload, Calendar, Sparkles];
const COLORS: Record<string, string> = {
  success: "bg-gradient-success",
  info: "bg-gradient-info",
  warning: "bg-gradient-warning",
  primary: "bg-gradient-primary",
};

export function ActivityCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-3 sm:p-4 md:p-5 shadow-card"
    >
      <h3 className="text-base sm:text-lg font-bold">Faoliyatingiz</h3>
      <ul className="mt-2 sm:mt-3 md:mt-4 space-y-2 sm:space-y-3">
        {activity.map((a, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.01 }}
              className="flex items-center gap-2 sm:gap-3 rounded-xl border border-border bg-card/50 p-2 sm:p-3 transition-all cursor-pointer"
            >
              <div className={`grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-xl ${COLORS[a.color]} shrink-0`}>
                <Icon className="h-4 w-4 sm:h-[18px] sm:w-[18px] text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-xs sm:text-sm font-medium">{a.title}</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground">{a.time}</div>
              </div>
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="rounded-md bg-success/15 px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-xs font-semibold text-success whitespace-nowrap shrink-0"
              >
                +{a.xp} XP
              </motion.span>
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
}
