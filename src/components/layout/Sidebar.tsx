import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  GraduationCap,
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Wallet,
  Headphones,
  Settings,
  Flame,
  LogOut,
  Boxes,
  ChevronsLeft,
  ChevronsRight,
  Filter,
  RotateCcw,
} from "lucide-react";
import { useApp } from "@/lib/store";
import { profile } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/learning", label: "O'quv jarayoni", icon: BookOpen },
  { to: "/gallery", label: "3D Galereya", icon: Boxes, badge: "NEW" },
  { to: "/grades", label: "Davomat va Baholar", icon: BarChart3 },
  { to: "/finance", label: "Moliya va To'lovlar", icon: Wallet },
  { to: "/support", label: "Qo'llab-quvvatlash", icon: Headphones, subtitle: "Node.js & API" },
  { to: "/settings", label: "Sozlamalar", icon: Settings },
] as const;

const levelOpts = [
  { v: "all", l: "Hammasi" },
  { v: "beginner", l: "Boshlang'ich" },
  { v: "mid", l: "O'rta" },
  { v: "advanced", l: "Yuqori" },
] as const;
const statusOpts = [
  { v: "all", l: "Hammasi" },
  { v: "active", l: "Faol" },
  { v: "done", l: "Tugagan" },
] as const;
const sortOpts = [
  { v: "new", l: "Yangi" },
  { v: "old", l: "Eski" },
  { v: "rating", l: "Reyting" },
] as const;

export function Sidebar({ onNavigate, forceExpanded }: { onNavigate?: () => void; forceExpanded?: boolean }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const logout = useApp((s) => s.logout);
  const collapsedState = useApp((s) => s.sidebarCollapsed);
  const toggleSidebar = useApp((s) => s.toggleSidebar);
  const filters = useApp((s) => s.filters);
  const setFilters = useApp((s) => s.setFilters);
  const resetFilters = useApp((s) => s.resetFilters);
  const collapsed = forceExpanded ? false : collapsedState;

  const xpPct = (profile.xp / profile.xpMax) * 100;
  const circumference = 2 * Math.PI * 22;

  return (
    <aside
      className={cn(
        "relative flex h-full flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-300 noise-overlay overflow-hidden",
        collapsed ? "w-[78px]" : "w-[260px]"
      )}
    >
      {/* Animated gradient glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-cyan-500/8 via-blue-500/5 to-transparent" />
      <div className="pointer-events-none absolute -right-20 top-20 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl animate-pulse-glow" />

      <div className="relative flex items-center gap-2.5 px-4 py-5">
        <Link to="/" onClick={onNavigate} className="flex items-center gap-2.5">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 shadow-glow-cyan"
          >
            <GraduationCap className="h-5 w-5 text-white" />
            <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 opacity-50 blur-md" />
          </motion.div>
          {!collapsed && (
            <div className="overflow-hidden">
              <div className="text-base font-bold tracking-tight">EduPro</div>
              <div className="-mt-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">
                Student v3
              </div>
            </div>
          )}
        </Link>
        {!forceExpanded && (
          <button
            onClick={toggleSidebar}
            className="ml-auto hidden h-7 w-7 place-items-center rounded-lg border border-sidebar-border bg-sidebar-accent/40 text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground lg:grid"
            aria-label="Toggle sidebar"
          >
            {collapsed ? <ChevronsRight className="h-3.5 w-3.5" /> : <ChevronsLeft className="h-3.5 w-3.5" />}
          </button>
        )}
      </div>

      {/* Profile block */}
      <div className={cn("relative px-3", collapsed && "px-2")}>
        <div className={cn("glass-2 relative overflow-hidden rounded-2xl", collapsed ? "p-2" : "p-3.5")}>
          <div className={cn("flex items-center", collapsed ? "justify-center" : "gap-3")}>
            <div className="relative">
              <svg width="52" height="52" className="absolute -inset-1 -rotate-90">
                <circle cx="26" cy="26" r="22" stroke="oklch(0.3 0.04 270 / 60%)" strokeWidth="3" fill="none" />
                <motion.circle
                  cx="26" cy="26" r="22"
                  stroke="url(#xpGrad)"
                  strokeWidth="3" fill="none"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: circumference - (circumference * xpPct) / 100 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="xpGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="oklch(0.7 0.15 195)" />
                    <stop offset="100%" stopColor="oklch(0.65 0.18 220)" />
                  </linearGradient>
                </defs>
              </svg>
              <img src={profile.avatar} alt={profile.name} className="relative h-11 w-11 rounded-full ring-2 ring-background" />
              <div className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 text-[9px] font-bold text-white ring-2 ring-sidebar">
                {profile.level}
              </div>
            </div>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold">{profile.name}</div>
                <div className="truncate text-xs text-muted-foreground">{profile.role}</div>
                <div className="mt-1 text-[10px] text-muted-foreground">
                  {profile.xp.toLocaleString()} / {profile.xpMax.toLocaleString()} XP
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <nav className={cn("relative flex flex-col gap-1 overflow-y-auto px-3 py-4 scrollbar-thin", collapsed && "px-2")}>
        {nav.map((item) => {
          const active = path === item.to;
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              title={collapsed ? item.label : undefined}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                collapsed && "justify-center px-2",
                active
                  ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 shadow-lg shadow-cyan-500/10"
                  : "text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              )}
            >
              {active && !collapsed && (
                <motion.span
                  layoutId="active-rail"
                  className="absolute -left-3 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-gradient-to-b from-cyan-400 to-blue-500 shadow-glow-cyan"
                />
              )}
              <Icon className="h-[18px] w-[18px] shrink-0" />
              {!collapsed && (
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate">{item.label}</span>
                  {"subtitle" in item && item.subtitle && (
                    <span className="truncate text-[10px] text-muted-foreground">{item.subtitle}</span>
                  )}
                </div>
              )}
              {!collapsed && "badge" in item && item.badge && (
                <span className="ml-auto shrink-0 rounded-md bg-gradient-rose px-1.5 py-0.5 text-[9px] font-bold text-white">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Filters */}
      {!collapsed && (
        <div className="relative mx-3 mb-3 rounded-2xl border border-sidebar-border bg-card/40 p-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              <Filter className="h-3 w-3" /> Filtrlar
            </div>
            <button onClick={resetFilters} className="text-muted-foreground transition-colors hover:text-foreground" aria-label="Reset">
              <RotateCcw className="h-3 w-3" />
            </button>
          </div>
          <FilterGroup label="Daraja" value={filters.level} onChange={(v) => setFilters({ level: v as Filters["level"] })} opts={levelOpts} />
          <FilterGroup label="Holat" value={filters.status} onChange={(v) => setFilters({ status: v as Filters["status"] })} opts={statusOpts} />
          <FilterGroup label="Saralash" value={filters.sort} onChange={(v) => setFilters({ sort: v as Filters["sort"] })} opts={sortOpts} />
        </div>
      )}

      {/* Daily goal widget */}
      {!collapsed && (
        <div className="relative mx-3 mb-3 rounded-2xl border border-sidebar-border bg-gradient-card p-3.5">
          <div className="flex items-center justify-between">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Kunlik maqsad
            </div>
            <div className="inline-flex items-center gap-1 rounded-md bg-gradient-warning px-1.5 py-0.5 text-[10px] font-bold text-warning-foreground">
              <Flame className="h-3 w-3" /> {profile.streak}
            </div>
          </div>
          <div className="mt-2 text-sm font-semibold">3 / 4 dars yakunlandi</div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-[75%] rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
          </div>
          <div className="mt-1.5 text-[11px] text-muted-foreground">+45 XP qoldi</div>
        </div>
      )}

      <button
        onClick={() => { logout(); onNavigate?.(); }}
        title={collapsed ? "Chiqish" : undefined}
        className={cn(
          "relative mx-3 mb-4 flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground",
          collapsed && "justify-center px-2"
        )}
      >
        <LogOut className="h-4 w-4" />
        {!collapsed && "Chiqish"}
      </button>
    </aside>
  );
}

type Filters = ReturnType<typeof useApp.getState>["filters"];

function FilterGroup<T extends string>({
  label, value, onChange, opts,
}: { label: string; value: T; onChange: (v: T) => void; opts: readonly { v: T; l: string }[] }) {
  return (
    <div className="mt-3 space-y-2">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="flex flex-wrap gap-1.5">
        {opts.map((o) => (
          <button
            key={o.v}
            onClick={() => onChange(o.v)}
            className={cn(
              "rounded-lg px-2.5 py-1.5 text-[10px] font-semibold transition-all duration-200",
              value === o.v
                ? "bg-gradient-primary text-primary-foreground shadow-glow"
                : "bg-sidebar-accent/50 text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
            )}
          >
            {o.l}
          </button>
        ))}
      </div>
    </div>
  );
}
