import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { skills } from "@/lib/mock-data";
import { ClientOnly } from "@/components/ui/client-only";

export function SkillsRadar() {
  return (
    <div className="glass rounded-2xl p-5 shadow-card">
      <h3 className="text-lg font-bold">Progress statistika</h3>
      <div className="mt-4 grid gap-4 md:grid-cols-[1fr_1fr]">
        <div className="h-56" suppressHydrationWarning>
          <ClientOnly fallback={<div className="h-full w-full animate-pulse rounded-xl bg-muted/40" />}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={skills}>
                <PolarGrid stroke="oklch(0.45 0.04 270 / 40%)" />
                <PolarAngleAxis dataKey="skill" tick={{ fill: "oklch(0.7 0.03 270)", fontSize: 11 }} />
                <Radar dataKey="value" stroke="oklch(0.72 0.2 295)" fill="oklch(0.62 0.22 280)" fillOpacity={0.45} />
              </RadarChart>
            </ResponsiveContainer>
          </ClientOnly>
        </div>
        <ul className="space-y-2 self-center">
          {skills.map((s) => (
            <li key={s.skill}>
              <div className="flex items-center justify-between text-sm">
                <span>{s.skill}</span>
                <span className="font-semibold">{s.value}%</span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-gradient-primary" style={{ width: `${s.value}%` }} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
