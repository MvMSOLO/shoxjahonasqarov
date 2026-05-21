import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, Timer, ExternalLink } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const MODES = [
  { label: "Fokus", minutes: 25, color: "from-violet-500 to-purple-600" },
  { label: "Qisqa dam", minutes: 5, color: "from-emerald-500 to-teal-600" },
  { label: "Uzoq dam", minutes: 15, color: "from-blue-500 to-cyan-600" },
];

export function StudyTimerWidget() {
  const [modeIdx, setModeIdx] = useState(0);
  const [seconds, setSeconds] = useState(MODES[0].minutes * 60);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);

  const mode = MODES[modeIdx];
  const total = mode.minutes * 60;
  const progress = (seconds / total) * 100;
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const dash = circumference * (1 - progress / 100);

  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          setRunning(false);
          if (modeIdx === 0) {
            setSessions((prev) => prev + 1);
            toast.success("🎉 Fokus sessiyasi tugadi! +50 XP");
          } else {
            toast("☕ Dam olish tugadi. Tayyor bo'ling!");
          }
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, modeIdx]);

  const reset = useCallback(() => {
    setRunning(false);
    setSeconds(mode.minutes * 60);
  }, [mode.minutes]);

  function switchMode(idx: number) {
    setModeIdx(idx);
    setRunning(false);
    setSeconds(MODES[idx].minutes * 60);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-4 shadow-card"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-primary shadow-glow">
            <Timer className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-sm font-bold">Study Timer</h2>
            <p className="text-[10px] text-muted-foreground">{sessions} sessiya bugun</p>
          </div>
        </div>
        <Link
          to="/timer"
          className="flex items-center gap-1 rounded-lg bg-muted px-2 py-1 text-[10px] font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <ExternalLink className="h-3 w-3" /> To'liq
        </Link>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <div className="relative h-20 w-20 shrink-0">
          <svg className="-rotate-90 h-20 w-20">
            <circle cx="40" cy="40" r={radius} strokeWidth="5" fill="none" stroke="oklch(0.3 0.04 270 / 40%)" />
            <motion.circle
              cx="40" cy="40" r={radius}
              strokeWidth="5" fill="none"
              strokeLinecap="round"
              stroke={`url(#timerGrad-widget)`}
              strokeDasharray={circumference}
              strokeDashoffset={dash}
              transition={{ duration: 0.5 }}
            />
            <defs>
              <linearGradient id="timerGrad-widget" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="oklch(0.62 0.22 280)" />
                <stop offset="100%" stopColor="oklch(0.72 0.2 305)" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-mono text-lg font-bold leading-none">{mins}:{secs}</span>
            <span className="text-[9px] text-muted-foreground">{mode.label}</span>
          </div>
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex gap-1">
            {MODES.map((m, i) => (
              <button
                key={m.label}
                onClick={() => switchMode(i)}
                className={cn(
                  "flex-1 rounded-lg py-1 text-[10px] font-semibold transition-colors",
                  modeIdx === i ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"
                )}
              >
                {m.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setRunning((r) => !r)}
              className={cn(
                "flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold transition-all",
                running ? "bg-destructive/15 text-destructive" : "bg-gradient-primary text-primary-foreground shadow-glow"
              )}
            >
              {running ? <><Pause className="h-3.5 w-3.5" /> Pauza</> : <><Play className="h-3.5 w-3.5" /> Boshlash</>}
            </button>
            <button
              onClick={reset}
              className="grid h-9 w-9 place-items-center rounded-xl bg-muted text-muted-foreground transition-colors hover:bg-accent"
              title="Qayta boshlash"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {sessions > 0 && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-3 flex gap-1"
          >
            {Array.from({ length: Math.min(sessions, 8) }).map((_, i) => (
              <div key={i} className="h-2 flex-1 rounded-full bg-gradient-primary opacity-80" />
            ))}
            {Array.from({ length: Math.max(0, 8 - sessions) }).map((_, i) => (
              <div key={i} className="h-2 flex-1 rounded-full bg-muted" />
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  );
}
