import { useState } from "react";
import { motion } from "framer-motion";
import { schedule } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { MapPin, User2 } from "lucide-react";

type Tab = keyof typeof schedule;
const tabs: Tab[] = ["Bugun", "Ertaga", "Hafta", "Oy"];

const statusColor: Record<string, string> = {
  "O'tdi": "bg-success/15 text-success border-success/30",
  Hozir: "bg-primary/15 text-primary-glow border-primary/40",
  Kutilmoqda: "bg-muted text-muted-foreground border-border",
};

export function ScheduleCard() {
  const [tab, setTab] = useState<Tab>("Bugun");
  const items = schedule[tab];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-3 sm:p-4 md:p-5 shadow-card"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-base sm:text-lg font-bold">Dars jadvali</h3>
        <div className="flex gap-0.5 sm:gap-1 rounded-xl bg-muted/60 p-0.5 sm:p-1 w-fit overflow-x-auto">
          {tabs.map((t) => (
            <motion.button
              key={t}
              onClick={() => setTab(t)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "rounded-lg px-2 py-1 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-medium transition-colors whitespace-nowrap",
                tab === t
                  ? "bg-gradient-primary text-primary-foreground shadow"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t}
            </motion.button>
          ))}
        </div>
      </div>

      <ul className="mt-2 sm:mt-3 md:mt-4 space-y-2 sm:space-y-3">
        {items.map((it, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.02, y: -1 }}
            className="relative flex items-start gap-2.5 sm:gap-4 rounded-xl border border-border bg-card/50 p-2.5 sm:p-3 transition-all cursor-pointer"
          >
            <div className="grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-xl bg-primary/15 text-[9px] sm:text-xs font-semibold text-primary-glow shrink-0">
              {it.time.split(" - ")[0]}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm sm:text-base font-semibold">{it.title}</div>
              <div className="mt-0.5 flex flex-wrap items-center gap-x-2 sm:gap-x-3 gap-y-0.5 text-[10px] sm:text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1 truncate"><User2 className="h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0" /> {it.teacher}</span>
                <span className="inline-flex items-center gap-1 truncate"><MapPin className="h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0" /> {it.room}</span>
              </div>
            </div>
            <span className={cn("shrink-0 rounded-md border px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[11px] font-medium", statusColor[it.status] ?? statusColor.Kutilmoqda)}>
              {it.status}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
