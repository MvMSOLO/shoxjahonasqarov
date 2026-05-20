import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ResponsiveContainer, AreaChart, Area } from "recharts";
import { Calendar, Star, ClipboardList, Wallet, type LucideIcon } from "lucide-react";
import { useRef } from "react";

const ICONS: Record<string, LucideIcon> = {
  calendar: Calendar,
  star: Star,
  clipboard: ClipboardList,
  wallet: Wallet,
};

const GRADIENTS: Record<string, { from: string; to: string; bg: string; stroke: string; glow: string }> = {
  success: { from: "oklch(0.68 0.16 165 / 50%)", to: "oklch(0.68 0.16 165 / 0%)", bg: "bg-gradient-success", stroke: "oklch(0.68 0.16 165)", glow: "oklch(0.68 0.16 165 / 30%)" },
  info: { from: "oklch(0.68 0.14 230 / 50%)", to: "oklch(0.68 0.14 230 / 0%)", bg: "bg-gradient-info", stroke: "oklch(0.68 0.14 230)", glow: "oklch(0.68 0.14 230 / 30%)" },
  warning: { from: "oklch(0.75 0.15 75 / 50%)", to: "oklch(0.75 0.15 75 / 0%)", bg: "bg-gradient-warning", stroke: "oklch(0.75 0.15 75)", glow: "oklch(0.75 0.15 75 / 30%)" },
  rose: { from: "oklch(0.68 0.2 25 / 50%)", to: "oklch(0.68 0.2 25 / 0%)", bg: "bg-gradient-rose", stroke: "oklch(0.68 0.2 25)", glow: "oklch(0.68 0.2 25 / 30%)" },
};

type Stat = { key: string; label: string; value: string; hint: string; icon: string; color: string; series: number[] };

export function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const Icon = ICONS[stat.icon] ?? Calendar;
  const g = GRADIENTS[stat.color] ?? GRADIENTS.info;
  const data = stat.series.map((v, i) => ({ i, v }));
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.08 * index, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass-premium group relative overflow-hidden rounded-2xl p-4 transition-all duration-300 hover:shadow-2xl"
    >
      {/* Hover glow effect */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ 
          background: `radial-gradient(circle at 50% 0%, ${g.glow}, transparent 70%)` 
        }}
      />
      
      {/* Content */}
      <div className="relative" style={{ transform: "translateZ(20px)" }}>
        <div className="flex items-start justify-between gap-3">
          <div className={`grid h-12 w-12 place-items-center rounded-xl ${g.bg} shadow-lg transition-transform duration-300 group-hover:scale-110`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
          <div className="text-right">
            <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{stat.label}</div>
            <div className="mt-0.5 text-2xl font-bold tracking-tight">{stat.value}</div>
          </div>
        </div>
        <div className="mt-3 text-xs text-muted-foreground">{stat.hint}</div>
      </div>
      
      {/* Chart */}
      <div className="-mx-4 -mb-4 mt-3 h-16">
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
