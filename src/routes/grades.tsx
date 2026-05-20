import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SkillsRadar } from "@/components/dashboard/SkillsRadar";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Download, Trophy, CalendarCheck2, Clock, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/grades")({
  head: () => ({ meta: [{ title: "Davomat va Baholar — EduPro" }], links: [{ rel: "canonical", href: "/grades" }] }),
  component: GradesPage,
});

type Grade = { id: string; course: string; task: string; score: number; max: number; date: string; status: "Topshirilgan" | "Kutilmoqda" | "O'tkazib yuborilgan" };

const grades: Grade[] = [
  { id: "g1", course: "React Advanced", task: "Hooks chuqur tahlil", score: 92, max: 100, date: "12 May", status: "Topshirilgan" },
  { id: "g2", course: "Node.js & API", task: "REST API loyiha", score: 88, max: 100, date: "10 May", status: "Topshirilgan" },
  { id: "g3", course: "DevOps Basic", task: "Docker compose", score: 75, max: 100, date: "8 May", status: "Topshirilgan" },
  { id: "g4", course: "UI/UX Design", task: "Wireframe topshiriq", score: 95, max: 100, date: "6 May", status: "Topshirilgan" },
  { id: "g5", course: "Python Backend", task: "FastAPI CRUD", score: 0, max: 100, date: "15 May", status: "Kutilmoqda" },
  { id: "g6", course: "Linux & Shell", task: "Bash test", score: 70, max: 100, date: "4 May", status: "Topshirilgan" },
  { id: "g7", course: "React Advanced", task: "Context API", score: 0, max: 100, date: "2 May", status: "O'tkazib yuborilgan" },
];

const certs = [
  { id: "c1", name: "React Foundations", date: "Mar 2025", color: "from-cyan-500 to-blue-500" },
  { id: "c2", name: "Node.js Essentials", date: "Feb 2025", color: "from-emerald-500 to-teal-500" },
  { id: "c3", name: "UI/UX Sprint", date: "Jan 2025", color: "from-rose-500 to-pink-500" },
];

// 30 days attendance heatmap (0..4 intensity)
const attendance = Array.from({ length: 35 }, (_, i) => {
  const v = (i * 7 + 3) % 5;
  return { day: i + 1, v };
});

const statusColors: Record<Grade["status"], string> = {
  "Topshirilgan": "bg-success/15 text-success",
  "Kutilmoqda": "bg-warning/15 text-warning",
  "O'tkazib yuborilgan": "bg-destructive/15 text-destructive",
};

function GradesPage() {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"date" | "score">("date");

  const filtered = useMemo(() => {
    let r = grades.filter((g) => g.course.toLowerCase().includes(q.toLowerCase()) || g.task.toLowerCase().includes(q.toLowerCase()));
    r = [...r].sort((a, b) => (sort === "score" ? b.score - a.score : a.date.localeCompare(b.date)));
    return r;
  }, [q, sort]);

  const avg = useMemo(() => {
    const done = grades.filter((g) => g.status === "Topshirilgan");
    return done.length ? Math.round(done.reduce((s, g) => s + g.score, 0) / done.length) : 0;
  }, []);

  const present = attendance.filter((d) => d.v >= 2).length;
  const attendPct = Math.round((present / attendance.length) * 100);

  return (
    <AppShell>
      <div className="glass rounded-3xl p-6 shadow-card md:p-8">
        <h1 className="text-2xl font-bold md:text-3xl">Davomat va Baholar</h1>
        <p className="mt-2 text-sm text-muted-foreground md:text-base">Baholar, davomat heatmap va sertifikatlaringizni bir joyda ko'ring.</p>
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          <Stat label="O'rtacha ball" value={`${avg}/100`} icon={Trophy} />
          <Stat label="Davomat" value={`${attendPct}%`} icon={CalendarCheck2} />
          <Stat label="Kechikkan" value="2" icon={Clock} />
          <Stat label="Sabsizlar" value="1" icon={AlertCircle} />
        </div>
      </div>

      <Tabs defaultValue="grades" className="mt-5">
        <TabsList>
          <TabsTrigger value="grades">Baholar</TabsTrigger>
          <TabsTrigger value="attend">Davomat</TabsTrigger>
          <TabsTrigger value="certs">Sertifikatlar</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
        </TabsList>

        <TabsContent value="grades">
          <div className="glass rounded-2xl p-4 shadow-card md:p-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Vazifa yoki kurs nomi..." className="pl-9" />
              </div>
              <div className="flex gap-1">
                <SortBtn active={sort === "date"} onClick={() => setSort("date")}>Sana</SortBtn>
                <SortBtn active={sort === "score"} onClick={() => setSort("score")}>Ball</SortBtn>
              </div>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="pb-2 pr-3">Kurs</th>
                    <th className="pb-2 pr-3">Vazifa</th>
                    <th className="pb-2 pr-3">Ball</th>
                    <th className="pb-2 pr-3">Sana</th>
                    <th className="pb-2">Holat</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((g) => (
                    <tr key={g.id} className="border-b border-border/40 last:border-0">
                      <td className="py-3 pr-3 font-medium">{g.course}</td>
                      <td className="py-3 pr-3 text-muted-foreground">{g.task}</td>
                      <td className="py-3 pr-3 font-semibold">{g.status === "Topshirilgan" ? `${g.score}/${g.max}` : "—"}</td>
                      <td className="py-3 pr-3 text-muted-foreground">{g.date}</td>
                      <td className="py-3">
                        <span className={`rounded-md px-2 py-1 text-[11px] font-semibold ${statusColors[g.status]}`}>{g.status}</span>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr><td colSpan={5} className="py-6 text-center text-muted-foreground">Hech narsa topilmadi</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="attend">
          <div className="glass rounded-2xl p-5 shadow-card">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold">35 kunlik davomat</h2>
              <span className="text-sm text-muted-foreground">Bu oy: <span className="font-bold text-foreground">{attendPct}%</span></span>
            </div>
            <div className="mt-4 grid grid-cols-7 gap-1.5 sm:grid-cols-7">
              {attendance.map((d) => (
                <div
                  key={d.day}
                  title={`Kun ${d.day} — ${["Yo'q", "Sabsiz", "Kechikkan", "Kelgan", "Aktiv"][d.v]}`}
                  className="aspect-square rounded-md"
                  style={{
                    background:
                      d.v === 0 ? "oklch(0.25 0.02 270 / 60%)" :
                      d.v === 1 ? "oklch(0.5 0.18 25 / 60%)" :
                      d.v === 2 ? "oklch(0.6 0.18 70 / 70%)" :
                      d.v === 3 ? "oklch(0.65 0.18 160 / 80%)" :
                                  "oklch(0.72 0.2 165)",
                  }}
                />
              ))}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <Legend color="oklch(0.5 0.18 25 / 60%)" label="Sabsiz" />
              <Legend color="oklch(0.6 0.18 70 / 70%)" label="Kechikkan" />
              <Legend color="oklch(0.65 0.18 160 / 80%)" label="Kelgan" />
              <Legend color="oklch(0.72 0.2 165)" label="Aktiv" />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="certs">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {certs.map((c) => (
              <div key={c.id} className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${c.color} p-5 text-white shadow-card`}>
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/20 blur-2xl" />
                <Trophy className="h-8 w-8" />
                <div className="mt-3 text-xs uppercase tracking-widest text-white/80">Sertifikat</div>
                <div className="mt-1 text-lg font-bold">{c.name}</div>
                <div className="text-xs text-white/80">{c.date}</div>
                <button
                  onClick={() => toast.success(`${c.name} yuklanmoqda...`)}
                  className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-white/20 px-3 py-1.5 text-xs font-semibold backdrop-blur transition-colors hover:bg-white/30"
                >
                  <Download className="h-3.5 w-3.5" /> Yuklab olish
                </button>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="skills">
          <SkillsRadar />
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}

function Stat({ label, value, icon: Icon }: { label: string; value: string; icon: any }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-3">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{label}</span>
        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
      </div>
      <div className="mt-1 text-lg font-bold">{value}</div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="h-3 w-3 rounded" style={{ background: color }} />
      {label}
    </span>
  );
}

function SortBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
        active ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-muted-foreground hover:bg-accent"
      }`}
    >
      {children}
    </button>
  );
}
