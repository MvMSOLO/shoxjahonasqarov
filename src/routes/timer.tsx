import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, SkipForward, Volume2, VolumeX, Coffee, Zap, Brain } from "lucide-react";
import { toast } from "sonner";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/timer")({
  head: () => ({
    meta: [
      { title: "Study Timer — EduPro" },
      { name: "description", content: "Pomodoro study timer — fokus va samaradorlikni oshiring." },
    ],
    links: [{ rel: "canonical", href: "/timer" }],
  }),
  component: TimerPage,
});

const MODES = [
  { id: "focus", label: "Fokus", sublabel: "Chuqur o'qish", minutes: 25, icon: Brain, gradient: "from-violet-500 to-purple-700", glow: "oklch(0.6 0.22 290)" },
  { id: "short", label: "Qisqa dam", sublabel: "5 daqiqa", minutes: 5, icon: Coffee, gradient: "from-emerald-500 to-teal-700", glow: "oklch(0.65 0.18 160)" },
  { id: "long", label: "Uzoq dam", sublabel: "15 daqiqa", minutes: 15, icon: Zap, gradient: "from-blue-500 to-cyan-700", glow: "oklch(0.65 0.15 230)" },
] as const;

type ModeId = typeof MODES[number]["id"];

const FOCUS_SOUNDS = [
  { id: "lofi", label: "Lo-Fi Beats" },
  { id: "rain", label: "Yomg'ir ovozi" },
  { id: "forest", label: "O'rmon" },
  { id: "none", label: "Ovoz yo'q" },
];

const SESSION_QUOTES = [
  "Kichik qadamlar katta maqsadlarga olib boradi.",
  "Har bir fokus sessiyasi senga yaqinlashtiradi.",
  "Bugun qiyin, ertaga oson bo'ladi.",
  "Bilim — eng yaxshi sarmoya.",
  "Fikrlash muhim, lekin qilish undan ham muhim.",
];

function TimerPage() {
  const [modeId, setModeId] = useState<ModeId>("focus");
  const mode = MODES.find((m) => m.id === modeId) ?? MODES[0];
  const total = mode.minutes * 60;
  const [seconds, setSeconds] = useState(total);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [totalFocusMin, setTotalFocusMin] = useState(0);
  const [sound, setSound] = useState("lofi");
  const [quoteIdx, setQuoteIdx] = useState(0);
  useEffect(() => {
    setQuoteIdx(Math.floor(Math.random() * SESSION_QUOTES.length));
  }, []);
  const { audioEnabled, toggleAudio } = useApp();

  const progress = ((total - seconds) / total) * 100;
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDash = circumference * (1 - progress / 100);

  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          setRunning(false);
          if (modeId === "focus") {
            setSessions((p) => p + 1);
            setTotalFocusMin((p) => p + mode.minutes);
            toast.success("🎉 Fokus sessiyasi yakunlandi! +50 XP qo'shildi", { duration: 4000 });
            setTimeout(() => setModeId("short"), 500);
          } else {
            toast("☕ Dam olish tugadi. Yangi sessiyaga tayyor?", { duration: 4000 });
            setTimeout(() => setModeId("focus"), 500);
          }
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, modeId, mode.minutes]);

  const switchMode = useCallback((id: ModeId) => {
    setModeId(id);
    setRunning(false);
    const m = MODES.find((m) => m.id === id)!;
    setSeconds(m.minutes * 60);
  }, []);

  const reset = useCallback(() => {
    setRunning(false);
    setSeconds(mode.minutes * 60);
  }, [mode.minutes]);

  const skip = useCallback(() => {
    setRunning(false);
    if (modeId === "focus") {
      setSessions((p) => p + 1);
      switchMode("short");
    } else {
      switchMode("focus");
    }
  }, [modeId, switchMode]);

  return (
    <AppShell>
      <div className="glass rounded-3xl p-4 shadow-card md:p-6">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">Study Timer</h1>
            <p className="text-sm text-muted-foreground">Pomodoro texnikasi bilan samarali o'qing</p>
          </div>
          <div className="flex gap-3">
            <div className="rounded-xl border border-border bg-card px-3 py-2 text-center">
              <div className="text-lg font-bold text-primary">{sessions}</div>
              <div className="text-[10px] text-muted-foreground">Sessiya</div>
            </div>
            <div className="rounded-xl border border-border bg-card px-3 py-2 text-center">
              <div className="text-lg font-bold">{totalFocusMin}</div>
              <div className="text-[10px] text-muted-foreground">Daqiqa</div>
            </div>
            <div className="rounded-xl border border-border bg-card px-3 py-2 text-center">
              <div className="text-lg font-bold text-warning">{sessions * 50}</div>
              <div className="text-[10px] text-muted-foreground">XP</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_340px]">
        <div className="glass flex flex-col items-center rounded-3xl p-6 shadow-card md:p-8">
          <div className="flex gap-2">
            {MODES.map((m) => {
              const MIcon = m.icon;
              return (
                <button
                  key={m.id}
                  onClick={() => switchMode(m.id)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all",
                    modeId === m.id
                      ? `bg-gradient-to-r ${m.gradient} text-white shadow-md`
                      : "bg-muted text-muted-foreground hover:bg-accent"
                  )}
                >
                  <MIcon className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{m.label}</span>
                  <span className="sm:hidden">{m.minutes}min</span>
                </button>
              );
            })}
          </div>

          <div className="relative mt-8 flex items-center justify-center">
            <svg width="290" height="290" className="-rotate-90">
              <circle
                cx="145" cy="145" r={radius}
                strokeWidth="10"
                fill="none"
                stroke="oklch(0.25 0.04 270 / 60%)"
              />
              <motion.circle
                cx="145" cy="145" r={radius}
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
                stroke={`url(#timerGrad-main)`}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDash}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ filter: `drop-shadow(0 0 12px ${mode.glow})` }}
              />
              <defs>
                <linearGradient id="timerGrad-main" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="oklch(0.62 0.22 280)" />
                  <stop offset="100%" stopColor="oklch(0.72 0.2 305)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute flex flex-col items-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={`${mins}${secs}`}
                  initial={{ scale: 0.95, opacity: 0.6 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="font-mono text-6xl font-bold tracking-tight md:text-7xl"
                >
                  {mins}:{secs}
                </motion.span>
              </AnimatePresence>
              <span className={cn(
                "mt-1 text-sm font-semibold",
                running ? "text-primary" : "text-muted-foreground"
              )}>
                {running ? `${mode.label} davom etmoqda…` : mode.label}
              </span>
              <span className="mt-1 text-xs text-muted-foreground">{mode.sublabel}</span>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <button
              onClick={reset}
              className="grid h-12 w-12 place-items-center rounded-2xl bg-muted text-muted-foreground transition-colors hover:bg-accent"
              title="Reset"
            >
              <RotateCcw className="h-5 w-5" />
            </button>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => setRunning((r) => !r)}
              className={cn(
                "flex h-16 w-44 items-center justify-center gap-2 rounded-2xl text-base font-bold transition-all",
                running
                  ? "bg-destructive/15 text-destructive hover:bg-destructive/25"
                  : "bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90"
              )}
            >
              {running ? (
                <><Pause className="h-6 w-6" /> Pauza</>
              ) : (
                <><Play className="h-6 w-6" /> Boshlash</>
              )}
            </motion.button>
            <button
              onClick={skip}
              className="grid h-12 w-12 place-items-center rounded-2xl bg-muted text-muted-foreground transition-colors hover:bg-accent"
              title="O'tkazib yuborish"
            >
              <SkipForward className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-6 flex gap-1.5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-2 w-8 rounded-full transition-all",
                  i < sessions ? "bg-gradient-primary" : "bg-muted"
                )}
              />
            ))}
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">
            {sessions}/8 sessiya — {8 - sessions} ta qoldi
          </p>

          <blockquote className="mt-6 rounded-2xl bg-primary/5 border border-primary/10 px-4 py-3 text-center">
            <p className="text-sm italic text-muted-foreground">"{SESSION_QUOTES[quoteIdx]}"</p>
          </blockquote>
        </div>

        <div className="space-y-4">
          <div className="glass rounded-2xl p-4 shadow-card md:p-5">
            <h3 className="text-sm font-bold">Fokus musiqa</h3>
            <p className="text-[11px] text-muted-foreground">O'qish uchun fon musiqasi</p>
            <div className="mt-3 space-y-2">
              {FOCUS_SOUNDS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSound(s.id)}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-xl border p-2.5 text-left text-xs font-medium transition-all",
                    sound === s.id
                      ? "border-primary/40 bg-primary/10 text-primary"
                      : "border-border hover:bg-accent"
                  )}
                >
                  <div className={cn(
                    "h-2 w-2 rounded-full shrink-0",
                    sound === s.id ? "bg-primary" : "bg-muted-foreground"
                  )} />
                  {s.label}
                  {sound === s.id && running && (
                    <span className="ml-auto flex gap-0.5">
                      {[1, 2, 3].map((i) => (
                        <motion.span
                          key={i}
                          animate={{ scaleY: [0.4, 1, 0.4] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                          className="block h-3 w-0.5 rounded-full bg-primary"
                          style={{ originY: 1 }}
                        />
                      ))}
                    </span>
                  )}
                </button>
              ))}
            </div>
            <button
              onClick={toggleAudio}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-muted py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent"
            >
              {audioEnabled ? <Volume2 className="h-4 w-4 text-primary" /> : <VolumeX className="h-4 w-4" />}
              {audioEnabled ? "Ovoz yoqilgan" : "Ovozni yoqish"}
            </button>
          </div>

          <div className="glass rounded-2xl p-4 shadow-card md:p-5">
            <h3 className="text-sm font-bold">Texnika haqida</h3>
            <div className="mt-3 space-y-3">
              {[
                { step: "1", color: "bg-gradient-primary", text: "25 daqiqa chuqur o'qing — telefonsiz, distraksiyasiz." },
                { step: "2", color: "bg-gradient-success", text: "5 daqiqa qisqa dam oling — ko'zni dam bering." },
                { step: "3", color: "bg-gradient-info", text: "4 sessiyadan keyin 15 daqiqa uzoq dam oling." },
                { step: "4", color: "bg-gradient-warning", text: "Har sessiya uchun +50 XP, kunlik rekord uchun bonus!" },
              ].map((item) => (
                <div key={item.step} className="flex gap-2.5">
                  <span className={cn(
                    "grid h-5 w-5 shrink-0 place-items-center rounded-md text-[10px] font-bold text-white",
                    item.color
                  )}>
                    {item.step}
                  </span>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-4 shadow-card">
            <h3 className="text-sm font-bold">Bugungi statistika</h3>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {[
                { label: "Sessiyalar", value: sessions, unit: "ta", color: "text-primary" },
                { label: "Fokus vaqt", value: totalFocusMin, unit: "min", color: "text-success" },
                { label: "Ishlagan XP", value: sessions * 50, unit: "xp", color: "text-warning" },
                { label: "Streak", value: 12, unit: "kun", color: "text-info" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl bg-muted/60 p-2.5">
                  <div className={cn("text-xl font-bold", item.color)}>
                    {item.value}
                    <span className="ml-0.5 text-xs font-normal text-muted-foreground">{item.unit}</span>
                  </div>
                  <div className="text-[10px] text-muted-foreground">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
