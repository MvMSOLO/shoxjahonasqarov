import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { useApp } from "@/lib/store";
import { useMemo, useState } from "react";
import { Play, Clock, BookOpen, Star } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/learning")({
  head: () => ({ meta: [{ title: "O'quv jarayoni — EduPro" }, { name: "description", content: "Kurslar va o'quv jarayoni." }], links: [{ rel: "canonical", href: "/learning" }] }),
  component: LearningPage,
});

type Course = {
  id: string;
  name: string;
  desc: string;
  level: "beginner" | "mid" | "advanced";
  status: "active" | "done";
  progress: number;
  duration: string;
  lessons: number;
  rating: number;
  date: string;
  gradient: string;
  emoji: string;
};

const COURSES: Course[] = [
  { id: "fe", name: "Frontend Engineering", desc: "React, TypeScript va modern frontend.", level: "mid", status: "active", progress: 68, duration: "12 hafta", lessons: 48, rating: 4.8, date: "2025-03", gradient: "from-cyan-500 to-blue-600", emoji: "⚛️" },
  { id: "node", name: "Node.js & APIs", desc: "Backend xizmatlari va REST/gRPC.", level: "mid", status: "active", progress: 45, duration: "10 hafta", lessons: 32, rating: 4.7, date: "2025-02", gradient: "from-emerald-500 to-teal-600", emoji: "🟢" },
  { id: "do", name: "DevOps Basic", desc: "Docker, K8s va CI/CD pipeline'lar.", level: "advanced", status: "active", progress: 42, duration: "12 hafta", lessons: 28, rating: 4.6, date: "2025-04", gradient: "from-amber-500 to-orange-600", emoji: "♾️" },
  { id: "py", name: "Python Backend", desc: "FastAPI, async va data layer.", level: "mid", status: "active", progress: 45, duration: "10 hafta", lessons: 30, rating: 4.7, date: "2025-02", gradient: "from-violet-500 to-fuchsia-600", emoji: "🐍" },
  { id: "ux", name: "UI / UX Design", desc: "Figma, design system, prototyping.", level: "beginner", status: "active", progress: 30, duration: "6 hafta", lessons: 20, rating: 4.9, date: "2025-04", gradient: "from-rose-500 to-pink-600", emoji: "🎨" },
  { id: "lx", name: "Linux & Shell", desc: "Bash, networking va hardening.", level: "beginner", status: "done", progress: 100, duration: "8 hafta", lessons: 26, rating: 4.5, date: "2024-12", gradient: "from-green-500 to-emerald-600", emoji: "🐧" },
  { id: "en", name: "English for Developers", desc: "Texnik leksika va prezentatsiya.", level: "beginner", status: "active", progress: 75, duration: "8 hafta", lessons: 24, rating: 4.4, date: "2025-01", gradient: "from-amber-400 to-orange-500", emoji: "🇬🇧" },
];

function LearningPage() {
  const filters = useApp((s) => s.filters);
  const [tab, setTab] = useState<"all" | "tasks">("all");
  const todos = useApp((s) => s.todos);
  const toggleTodo = useApp((s) => s.toggleTodo);

  const visible = useMemo(() => {
    let list = COURSES.slice();
    if (filters.level !== "all") list = list.filter((c) => c.level === filters.level);
    if (filters.status !== "all") list = list.filter((c) => c.status === filters.status);
    list.sort((a, b) => {
      if (filters.sort === "rating") return b.rating - a.rating;
      if (filters.sort === "old") return a.date.localeCompare(b.date);
      return b.date.localeCompare(a.date);
    });
    return list;
  }, [filters]);

  return (
    <AppShell>
      <div className="glass rounded-3xl p-6 shadow-card md:p-8">
        <h1 className="text-2xl font-bold md:text-3xl">O'quv jarayoni</h1>
        <p className="mt-2 text-sm text-muted-foreground md:text-base">
          Sidebar filtrlari yordamida kurslarni daraja, holat va saralashga ko'ra ko'ring.
        </p>
        <div className="mt-4 inline-flex rounded-xl border border-border bg-card p-1">
          <TabBtn active={tab === "all"} onClick={() => setTab("all")}>Barcha kurslar ({visible.length})</TabBtn>
          <TabBtn active={tab === "tasks"} onClick={() => setTab("tasks")}>Vazifalarim ({todos.filter(t => !t.done).length})</TabBtn>
        </div>
      </div>

      {tab === "all" ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((c) => (
            <div key={c.id} className="group glass overflow-hidden rounded-2xl shadow-card transition-transform hover:-translate-y-1">
              <div className={`relative h-28 bg-gradient-to-br ${c.gradient} p-5`}>
                <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/20 blur-2xl" />
                <div className="text-4xl">{c.emoji}</div>
                <span className="absolute right-3 top-3 rounded-full bg-black/30 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur">
                  {c.level === "beginner" ? "Boshlang'ich" : c.level === "mid" ? "O'rta" : "Yuqori"}
                </span>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-bold">{c.name}</h3>
                  <span className="inline-flex items-center gap-0.5 text-xs font-semibold">
                    <Star className="h-3 w-3 fill-warning text-warning" /> {c.rating}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{c.desc}</p>
                <div className="mt-3 flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {c.duration}</span>
                  <span className="inline-flex items-center gap-1"><BookOpen className="h-3 w-3" /> {c.lessons} dars</span>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-[11px] text-muted-foreground">
                    <span>Progress</span>
                    <span className="font-semibold text-foreground">{c.progress}%</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className={`h-full rounded-full bg-gradient-to-r ${c.gradient}`} style={{ width: `${c.progress}%` }} />
                  </div>
                </div>
                <button
                  onClick={() => toast.success(`${c.name} — keyingi darsga o'tildi`)}
                  className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-primary px-3 py-2 text-xs font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
                >
                  <Play className="h-3.5 w-3.5" /> {c.status === "done" ? "Qayta ko'rish" : "Davom etish"}
                </button>
              </div>
            </div>
          ))}
          {visible.length === 0 && (
            <div className="col-span-full rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
              Filtrlar bo'yicha kurs topilmadi. Sidebar'dan filtrni o'zgartirib ko'ring.
            </div>
          )}
        </div>
      ) : (
        <div className="glass rounded-2xl p-5 shadow-card">
          <h2 className="text-base font-bold">Vazifalarim</h2>
          <div className="mt-3 space-y-2">
            {todos.map((t) => (
              <label key={t.id} className="flex cursor-pointer items-center gap-3 rounded-xl border border-border p-3 transition-colors hover:bg-accent">
                <input type="checkbox" checked={t.done} onChange={() => toggleTodo(t.id)} className="h-4 w-4 accent-primary" />
                <div className="min-w-0 flex-1">
                  <div className={`text-sm font-medium ${t.done ? "line-through text-muted-foreground" : ""}`}>{t.title}</div>
                  <div className="text-xs text-muted-foreground">Muddat: {t.due}</div>
                </div>
                <span className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${
                  t.priority === "Muhim" ? "bg-destructive/15 text-destructive" :
                  t.priority === "O'rta" ? "bg-warning/15 text-warning" :
                  "bg-muted text-muted-foreground"
                }`}>{t.priority}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </AppShell>
  );
}

function TabBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
        active ? "bg-primary text-primary-foreground shadow-glow" : "text-muted-foreground hover:bg-accent"
      }`}
    >
      {children}
    </button>
  );
}
