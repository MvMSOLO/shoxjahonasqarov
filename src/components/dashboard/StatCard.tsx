import { motion } from "framer-motion";
import { ResponsiveContainer, AreaChart, Area } from "recharts";
import { Calendar, Star, ClipboardList, Wallet, type LucideIcon } from "lucide-react";

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
      className="glass relative overflow-hidden rounded-2xl p-4 shadow-card transition-transform hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className={`grid h-11 w-11 place-items-center rounded-xl ${g.bg} shadow-md`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div className="text-right">
          <div className="text-xs text-muted-foreground">{stat.label}</div>
          <div className="text-2xl font-bold tracking-tight">{stat.value}</div>
        </div>
      </div>
      <div className="mt-2 text-xs text-muted-foreground">{stat.hint}</div>
      <div className="-mx-4 -mb-4 mt-2 h-14">
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
      </div>
    </motion.div>
  );
}