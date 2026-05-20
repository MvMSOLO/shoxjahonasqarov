import { motion } from "framer-motion";
import { Play, Sparkles, ChevronRight } from "lucide-react";
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from "recharts";
import { courseProgress } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

export function CourseProgressCard() {
  const data = [{ name: "p", value: courseProgress.percent, fill: "url(#donutGrad)" }];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="glass-premium group relative overflow-hidden rounded-3xl p-6 md:p-8"
    >
      {/* Animated glow orbs */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/10 blur-3xl animate-pulse-glow" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-gradient-to-tr from-cyan-600/15 to-transparent blur-3xl animate-float-slow" />
      
      {/* Status badge */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute left-6 top-6 flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 px-3 py-1.5 backdrop-blur-sm"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500" />
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-cyan-300">Faol</span>
      </motion.div>

      <div className="grid gap-8 pt-8 md:grid-cols-[1fr_220px_1fr] md:pt-4">
        <div>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground"
          >
            Kurs progressi
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-2 text-2xl font-bold md:text-3xl"
          >
            {courseProgress.course}
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="mt-6 text-5xl font-extrabold tracking-tight text-gradient-cyan md:text-6xl"
          >
            {courseProgress.percent}%
          </motion.div>
          <div className="mt-4 h-2.5 w-full max-w-[280px] overflow-hidden rounded-full bg-muted/50">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${courseProgress.percent}%` }}
              transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1], delay: 0.4 }}
              className="relative h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
            >
              <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </motion.div>
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-3 text-xs text-muted-foreground"
          >
            {courseProgress.done} / {courseProgress.total} modul yakunlandi
          </motion.div>
        </div>

        <div className="relative mx-auto h-48 w-48">
          <motion.div
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart innerRadius="75%" outerRadius="100%" data={data} startAngle={90} endAngle={-270}>
                <defs>
                  <linearGradient id="donutGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="oklch(0.7 0.15 195)" />
                    <stop offset="100%" stopColor="oklch(0.65 0.18 220)" />
                  </linearGradient>
                </defs>
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar dataKey="value" background={{ fill: "oklch(0.2 0.02 270 / 60%)" }} cornerRadius={20} />
              </RadialBarChart>
            </ResponsiveContainer>
          </motion.div>
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-gradient-cyan">{courseProgress.percent}%</div>
              <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Completed</div>
            </motion.div>
          </div>
          {/* Glow ring */}
          <div className="pointer-events-none absolute inset-0 rounded-full ring-glow-cyan opacity-50" />
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <div className="rounded-2xl border border-border/50 bg-card/30 p-4 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/30 hover:bg-card/50">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Joriy modul</div>
            <div className="mt-1.5 flex items-center gap-2 text-base font-semibold">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              {courseProgress.currentModule}
            </div>
          </div>
          <div className="rounded-2xl border border-border/50 bg-card/30 p-4 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/30 hover:bg-card/50">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Keyingi dars</div>
            <div className="mt-1.5 text-sm font-medium">{courseProgress.nextLesson}</div>
          </div>
          <Button className="group/btn mt-2 w-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-glow-cyan transition-all duration-300 hover:scale-[1.02] hover:opacity-90">
            <Play className="mr-2 h-4 w-4 transition-transform group-hover/btn:scale-110" /> 
            Darsni davom ettirish
            <ChevronRight className="ml-auto h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
