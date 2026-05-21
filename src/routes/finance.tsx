import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Wallet, TrendingUp, TrendingDown, Calendar, CreditCard,
  CheckCircle2, Clock, ArrowUpRight, ArrowDownLeft, Search, Download
} from "lucide-react";
import { transactions, paymentSchedule } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { ClientOnly } from "@/components/ui/client-only";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/finance")({
  head: () => ({
    meta: [{ title: "Moliya va To'lovlar — EduPro" }],
    links: [{ rel: "canonical", href: "/finance" }],
  }),
  component: FinancePage,
});

const monthlyData = [
  { month: "Yan", income: 100000, expense: 350000 },
  { month: "Fev", income: 130000, expense: 375000 },
  { month: "Mar", income: 230000, expense: 400000 },
  { month: "Apr", income: 100000, expense: 350000 },
  { month: "May", income: 0, expense: 350000 },
];

function FinancePage() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    if (!q.trim()) return transactions;
    const lower = q.toLowerCase();
    return transactions.filter((t) => t.desc.toLowerCase().includes(lower));
  }, [q]);

  const totalIn = transactions.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const totalOut = transactions.filter((t) => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);
  const balance = totalIn - totalOut;

  return (
    <AppShell>
      <div className="glass rounded-3xl p-4 shadow-card md:p-6">
        <h1 className="text-2xl font-bold md:text-3xl">Moliya va To'lovlar</h1>
        <p className="mt-1 text-sm text-muted-foreground">Balans, to'lovlar va moliyaviy tarix.</p>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 p-4 text-white"
          >
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/15 blur-2xl" />
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs font-medium text-white/70">Joriy balans</div>
                <div className="mt-1 text-2xl font-bold">{balance.toLocaleString()}</div>
                <div className="text-xs text-white/70">so'm</div>
              </div>
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/20">
                <Wallet className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3 text-[10px] text-white/60">
              Keyingi to'lov: <span className="font-semibold text-white">1 Iyun 2025</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4"
          >
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-success/15">
              <TrendingUp className="h-5 w-5 text-success" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Jami kirim</div>
              <div className="text-lg font-bold text-success">+{totalIn.toLocaleString()}</div>
              <div className="text-[10px] text-muted-foreground">so'm</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4"
          >
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-destructive/15">
              <TrendingDown className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Jami chiqim</div>
              <div className="text-lg font-bold text-destructive">-{totalOut.toLocaleString()}</div>
              <div className="text-[10px] text-muted-foreground">so'm</div>
            </div>
          </motion.div>
        </div>
      </div>

      <Tabs defaultValue="history" className="mt-4">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="history"><CreditCard className="mr-1.5 h-3.5 w-3.5" /> Tarix</TabsTrigger>
          <TabsTrigger value="chart"><TrendingUp className="mr-1.5 h-3.5 w-3.5" /> Grafik</TabsTrigger>
          <TabsTrigger value="schedule"><Calendar className="mr-1.5 h-3.5 w-3.5" /> Jadval</TabsTrigger>
        </TabsList>

        <TabsContent value="history">
          <div className="glass rounded-2xl p-4 shadow-card md:p-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1 max-w-xs">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Tranzaksiya qidirish..." className="pl-9" />
              </div>
              <button
                onClick={() => toast.success("CSV yuklanmoqda...")}
                className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent"
              >
                <Download className="h-3.5 w-3.5" /> Export CSV
              </button>
            </div>

            <div className="mt-4 space-y-2">
              {filtered.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 * i }}
                  className="flex items-center gap-3 rounded-xl border border-border/60 p-3 transition-colors hover:bg-accent/40"
                >
                  <div className={cn(
                    "grid h-9 w-9 shrink-0 place-items-center rounded-xl",
                    t.amount > 0 ? "bg-success/15" : "bg-destructive/15"
                  )}>
                    {t.amount > 0
                      ? <ArrowDownLeft className="h-4 w-4 text-success" />
                      : <ArrowUpRight className="h-4 w-4 text-destructive" />
                    }
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{t.desc}</div>
                    <div className="text-[11px] text-muted-foreground">{t.date}</div>
                  </div>
                  <div className={cn(
                    "shrink-0 text-sm font-bold",
                    t.amount > 0 ? "text-success" : "text-destructive"
                  )}>
                    {t.amount > 0 ? "+" : ""}{t.amount.toLocaleString()} so'm
                  </div>
                </motion.div>
              ))}
              {filtered.length === 0 && (
                <div className="py-8 text-center text-sm text-muted-foreground">Tranzaksiya topilmadi</div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="chart">
          <div className="glass rounded-2xl p-4 shadow-card md:p-5">
            <h2 className="text-base font-bold">Oylik moliyaviy grafik</h2>
            <p className="text-xs text-muted-foreground">Kirim va chiqim taqqoslash</p>
            <div className="mt-4 h-64" suppressHydrationWarning>
              <ClientOnly fallback={<div className="h-full w-full animate-pulse rounded-xl bg-muted/40" />}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyData} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
                    <defs>
                      <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="oklch(0.7 0.18 160)" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="oklch(0.7 0.18 160)" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="oklch(0.65 0.24 22)" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="oklch(0.65 0.24 22)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                    <Tooltip
                      formatter={(value: number) => [`${value.toLocaleString()} so'm`]}
                      contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: "12px", fontSize: 12 }}
                    />
                    <Area type="monotone" dataKey="income" name="Kirim" stroke="oklch(0.7 0.18 160)" strokeWidth={2} fill="url(#incomeGrad)" />
                    <Area type="monotone" dataKey="expense" name="Chiqim" stroke="oklch(0.65 0.24 22)" strokeWidth={2} fill="url(#expenseGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </ClientOnly>
            </div>
            <div className="mt-4 flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-success" /> Kirim</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-destructive" /> Chiqim</span>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="schedule">
          <div className="glass rounded-2xl p-4 shadow-card md:p-5">
            <h2 className="text-base font-bold">Kelgusi to'lov jadvali</h2>
            <p className="text-xs text-muted-foreground">Oylik to'lov muddatlari</p>
            <div className="mt-4 space-y-3">
              {paymentSchedule.map((p, i) => (
                <motion.div
                  key={p.month}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="flex items-center gap-3 rounded-xl border border-border p-3.5"
                >
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-warning/15">
                    <Calendar className="h-5 w-5 text-warning" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold">{p.month}</div>
                    <div className="text-[11px] text-muted-foreground">Muddat: {p.due}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold">{p.amount.toLocaleString()} so'm</div>
                    <span className="inline-flex items-center gap-1 rounded-md bg-warning/15 px-1.5 py-0.5 text-[10px] font-semibold text-warning">
                      <Clock className="h-3 w-3" /> Kutilmoqda
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 rounded-2xl bg-gradient-primary/10 border border-primary/15 p-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-semibold">Avtomatik to'lov</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Har oyning 1-sanasida kartangizdan avtomatik hisobdan chiqariladi.
                  </p>
                  <button
                    onClick={() => toast.success("To'lov amalga oshirildi! Rahmat 🎉")}
                    className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-gradient-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-glow transition-opacity hover:opacity-90"
                  >
                    <CreditCard className="h-3.5 w-3.5" /> Hozir to'lash
                  </button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
