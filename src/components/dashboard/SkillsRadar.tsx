import { motion } from "framer-motion";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { skills } from "@/lib/mock-data";
import { ClientOnly } from "@/components/ui/client-only";

export function SkillsRadar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-3 sm:p-4 md:p-5 shadow-card"
    >
      <h3 className="text-base sm:text-lg font-bold">Progress statistika</h3>
      <div className="mt-2 sm:mt-3 md:mt-4 grid gap-2 sm:gap-3 md:gap-4 grid-cols-1 md:grid-cols-[1fr_1fr]">
        <div className="h-40 sm:h-48 md:h-56" suppressHydrationWarning>
          <ClientOnly fallback={<div className="h-full w-full animate-pulse rounded-xl bg-muted/40" />}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={skills}>
                <PolarGrid stroke="oklch(0.45 0.04 270 / 40%)" />
                <PolarAngleAxis dataKey="skill" tick={{ fill: "oklch(0.7 0.03 270)", fontSize: 10 }} />
                <Radar dataKey="value" stroke="oklch(0.72 0.2 295)" fill="oklch(0.62 0.22 280)" fillOpacity={0.45} />
              </RadarChart>
            </ResponsiveContainer>
          </ClientOnly>
        </div>
        <ul className="space-y-1.5 sm:space-y-2 md:self-center">
          {skills.map((s, i) => (
            <motion.li
              key={s.skill}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-medium">{s.skill}</span>
                <span className="font-semibold text-primary">{s.value}%</span>
              </div>
              <div className="mt-0.5 sm:mt-1 h-1 sm:h-1.5 overflow-hidden rounded-full bg-muted">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${s.value}%` }}
                  transition={{ duration: 0.8, delay: i * 0.05 + 0.1 }}
                  className="h-full rounded-full bg-gradient-primary"
                />
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
