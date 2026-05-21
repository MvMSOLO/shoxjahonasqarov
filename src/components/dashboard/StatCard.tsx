import { motion } from "framer-motion";
import { ResponsiveContainer, AreaChart, Area } from "recharts";
import { Calendar, Star, ClipboardList, Wallet, type LucideIcon } from "lucide-react";
import { ClientOnly } from "@/components/ui/client-only";

const ICONS: Record<string, LucideIcon> = {
  calendar: Calendar,
  star: Star,
  clipboard: ClipboardList,
  wallet: Wallet,
};

const GRADIENTS: Record<string, { from: string; to: string; bg: string; stroke: string }> = {
  success: { from: "oklch(0.7 0.18 160 / 50%)", to: "oklch(0.7 0.18 160 / 0%)", bg: "bg-gradient-success", stroke: "oklch(0.7 0.18 160)" },
  info: { from: "oklch(0.7 0.15 230 / 50%)", to: "oklch(0.7 0.15 230 / 0%)", bg: "bg-gradient-info", stroke: "oklch(0.7 0.15 230)" },
  warning: { from: "oklch(0.78 0.17 70 / 50%)", to: "oklch(0.78 0.17 70 / 0%)", bg: "bg-gradient-warning", stroke: "oklch(0.78 0.17 70)" },
  rose: { from: "oklch(0.7 0.22 20 / 50%)", to: "oklch(0.7 0.22 20 / 0%)", bg: "bg-gradient-rose", stroke: "oklch(0.7 0.22 20)" },
};

type Stat = { key: string; label: string; value: string; hint: string; icon: string; color: string; series: number[] };

export function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const Icon = ICONS[stat.icon] ?? Calendar;
  const g = GRADIENTS[stat.color] ?? GRADIENTS.info;
  const data = stat.series.map((v, i) => ({ i, v }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index, ease: "easeOut" }}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="glass relative overflow-hidden rounded-2xl p-3 sm:p-4 shadow-card transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between gap-2 sm:gap-3">
        <div className={`grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-xl ${g.bg} shadow-md shrink-0`}>
          <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
        </div>
        <div className="text-right min-w-0">
          <div className="text-[11px] sm:text-xs text-muted-foreground truncate">{stat.label}</div>
          <div className="text-lg sm:text-2xl font-bold tracking-tight">{stat.value}</div>
        </div>
      </div>
      <div className="mt-2 text-[10px] sm:text-xs text-muted-foreground">{stat.hint}</div>
      <div className="-mx-3 sm:-mx-4 -mb-3 sm:-mb-4 mt-2 h-12 sm:h-14" suppressHydrationWarning>
        <ClientOnly fallback={<div className="h-full w-full" />}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={`grad-${stat.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={g.from} />
                  <stop offset="100%" stopColor={g.to} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="v" stroke={g.stroke} strokeWidth={2} fill={`url(#grad-${stat.key})`} />
            </AreaChart>
          </ResponsiveContainer>
        </ClientOnly>
      </div>
    </motion.div>
  );
}
