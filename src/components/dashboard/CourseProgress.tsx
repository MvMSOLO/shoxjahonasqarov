import { motion } from "framer-motion";
import { Play, Sparkles } from "lucide-react";
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from "recharts";
import { courseProgress } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { ClientOnly } from "@/components/ui/client-only";

export function CourseProgressCard() {
  const data = [{ name: "p", value: courseProgress.percent, fill: "url(#donutGrad)" }];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass relative overflow-hidden rounded-3xl p-5 shadow-card md:p-6"
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-gradient-primary opacity-20 blur-3xl" />
      <div className="grid gap-6 md:grid-cols-[1fr_220px_1fr]">
        <div>
          <div className="text-xs uppercase tracking-wide text-muted-foreground">Kurs progressi</div>
          <h2 className="mt-1 text-2xl font-bold md:text-3xl">{courseProgress.course}</h2>
          <div className="mt-5 text-5xl font-extrabold tracking-tight md:text-6xl">{courseProgress.percent}%</div>
          <div className="mt-3 h-2 w-full max-w-[260px] overflow-hidden rounded-full bg-muted">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${courseProgress.percent}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-primary"
            />
          </div>
          <div className="mt-3 text-xs text-muted-foreground">{courseProgress.done} / {courseProgress.total} modul yakunlandi</div>
        </div>

        <div className="relative mx-auto h-44 w-44" suppressHydrationWarning>
          <ClientOnly fallback={
            <div className="h-full w-full rounded-full border-8 border-muted flex items-center justify-center">
              <div className="text-3xl font-bold">{courseProgress.percent}%</div>
            </div>
          }>
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart innerRadius="78%" outerRadius="100%" data={data} startAngle={90} endAngle={-270}>
                <defs>
                  <linearGradient id="donutGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="oklch(0.62 0.22 280)" />
                    <stop offset="100%" stopColor="oklch(0.72 0.2 305)" />
                  </linearGradient>
                </defs>
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar dataKey="value" background={{ fill: "oklch(0.3 0.04 270 / 60%)" }} cornerRadius={20} />
              </RadialBarChart>
            </ResponsiveContainer>
          </ClientOnly>
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <div className="text-center">
              <div className="text-3xl font-bold">{courseProgress.percent}%</div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground">Joriy modul</div>
            <div className="mt-1 flex items-center gap-2 text-lg font-semibold">
              <Sparkles className="h-4 w-4 text-primary-glow" />
              {courseProgress.currentModule}
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground">Keyingi dars</div>
            <div className="mt-1 text-base font-medium">{courseProgress.nextLesson}</div>
          </div>
          <Button className="mt-2 w-full bg-gradient-primary shadow-glow hover:opacity-90">
            <Play className="mr-2 h-4 w-4" /> Darsni davom ettirish
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
