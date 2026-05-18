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
    <div className="glass rounded-2xl p-5 shadow-card">
      <h3 className="text-lg font-bold">Faoliyatingiz</h3>
      <ul className="mt-4 space-y-3">
        {activity.map((a, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 rounded-xl border border-border bg-card/50 p-3"
            >
              <div className={`grid h-10 w-10 place-items-center rounded-xl ${COLORS[a.color]}`}>
                <Icon className="h-[18px] w-[18px] text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium">{a.title}</div>
                <div className="text-xs text-muted-foreground">{a.time}</div>
              </div>
              <span className="rounded-md bg-success/15 px-2 py-0.5 text-xs font-semibold text-success">
                +{a.xp} XP
              </span>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}