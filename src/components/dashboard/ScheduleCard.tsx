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
    <div className="glass rounded-2xl p-5 shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-bold">Dars jadvali</h3>
        <div className="flex gap-1 rounded-xl bg-muted/60 p-1">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "rounded-lg px-3 py-1 text-xs font-medium transition-colors",
                tab === t
                  ? "bg-gradient-primary text-primary-foreground shadow"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-4 space-y-3">
        {items.map((it, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="relative flex items-center gap-4 rounded-xl border border-border bg-card/50 p-3"
          >
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/15 text-xs font-semibold text-primary-glow">
              {it.time.split(" - ")[0]}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate font-semibold">{it.title}</div>
              <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><User2 className="h-3 w-3" /> {it.teacher}</span>
                <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {it.room}</span>
              </div>
            </div>
            <span className={cn("shrink-0 rounded-md border px-2 py-0.5 text-[11px] font-medium", statusColor[it.status] ?? statusColor.Kutilmoqda)}>
              {it.status}
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}