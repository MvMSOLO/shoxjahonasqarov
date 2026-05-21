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
      className="glass relative overflow-hidden rounded-3xl p-3 sm:p-4 md:p-5 lg:p-6 shadow-card"
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-gradient-primary opacity-20 blur-3xl" />
      <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 sm:grid-cols-[1fr_120px_1fr] lg:grid-cols-[1fr_220px_1fr]">
        <div>
          <div className="text-[10px] sm:text-xs uppercase tracking-wide text-muted-foreground">Kurs progressi</div>
          <h2 className="mt-1 text-lg sm:text-2xl md:text-3xl font-bold line-clamp-2">{courseProgress.course}</h2>
          <div className="mt-2 sm:mt-3 md:mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">{courseProgress.percent}%</div>
          <div className="mt-2 sm:mt-3 h-1.5 sm:h-2 w-full max-w-xs overflow-hidden rounded-full bg-muted">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${courseProgress.percent}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-primary"
            />
          </div>
          <div className="mt-2 sm:mt-3 text-[10px] sm:text-xs text-muted-foreground">{courseProgress.done} / {courseProgress.total} modul</div>
        </div>

        <div className="relative mx-auto h-28 w-28 sm:h-32 sm:w-32 md:h-44 md:w-44" suppressHydrationWarning>
          <ClientOnly fallback={
            <div className="h-full w-full rounded-full border-8 border-muted flex items-center justify-center">
              <div className="text-2xl sm:text-3xl font-bold">{courseProgress.percent}%</div>
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
              <div className="text-2xl sm:text-3xl font-bold">{courseProgress.percent}%</div>
              <div className="text-[9px] sm:text-xs text-muted-foreground">Completed</div>
            </div>
          </div>
        </div>

        <div className="space-y-2 sm:space-y-3">
          <div>
            <div className="text-[10px] sm:text-xs uppercase tracking-wide text-muted-foreground">Joriy modul</div>
            <div className="mt-1 flex items-center gap-2 text-sm sm:text-base md:text-lg font-semibold line-clamp-1">
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary-glow shrink-0" />
              {courseProgress.currentModule}
            </div>
          </div>
          <div>
            <div className="text-[10px] sm:text-xs uppercase tracking-wide text-muted-foreground">Keyingi dars</div>
            <div className="mt-1 text-xs sm:text-base font-medium line-clamp-1">{courseProgress.nextLesson}</div>
          </div>
          <Button className="mt-1 sm:mt-2 w-full bg-gradient-primary shadow-glow hover:opacity-90 text-xs sm:text-sm py-1.5 sm:py-2">
            <Play className="mr-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4" /> <span className="hidden sm:inline">Darsni davom ettirish</span><span className="sm:hidden">Davom</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
