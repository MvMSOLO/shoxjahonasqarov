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
  Crown,
  LogOut,
  Boxes,
  ChevronsLeft,
  ChevronsRight,
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
  { to: "/support", label: "Qo'llab-quvvatlash", icon: Headphones },
  { to: "/settings", label: "Sozlamalar", icon: Settings },
] as const;

export function Sidebar({ onNavigate, forceExpanded }: { onNavigate?: () => void; forceExpanded?: boolean }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const logout = useApp((s) => s.logout);
  const collapsedState = useApp((s) => s.sidebarCollapsed);
  const toggleSidebar = useApp((s) => s.toggleSidebar);
  const collapsed = forceExpanded ? false : collapsedState;

  const xpPct = (profile.xp / profile.xpMax) * 100;
  const circumference = 2 * Math.PI * 22;

  return (
    <aside
      className={cn(
        "relative flex h-full flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-300 noise-overlay",
        collapsed ? "w-[78px]" : "w-[260px]"
      )}
    >
      {/* Glow accent */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary/10 to-transparent" />

      <div className="relative flex items-center gap-2.5 px-4 py-5">
        <Link to="/" onClick={onNavigate} className="flex items-center gap-2.5">
          <div className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-primary shadow-glow">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
            <div className="absolute -inset-px rounded-xl bg-gradient-primary opacity-50 blur-md" />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <div className="text-base font-bold tracking-tight">EduPro</div>
              <div className="-mt-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">
                Student v2
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
                    <stop offset="0%" stopColor="oklch(0.62 0.22 280)" />
                    <stop offset="100%" stopColor="oklch(0.72 0.2 305)" />
                  </linearGradient>
                </defs>
              </svg>
              <img src={profile.avatar} alt={profile.name} className="relative h-11 w-11 rounded-full ring-2 ring-background" />
              <div className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-gradient-primary text-[9px] font-bold text-primary-foreground ring-2 ring-sidebar">
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

      <nav className={cn("relative flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4 scrollbar-thin", collapsed && "px-2")}>
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
                  ? "bg-gradient-primary text-primary-foreground shadow-glow"
                  : "text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              )}
            >
              {active && !collapsed && (
                <motion.span
                  layoutId="active-rail"
                  className="absolute -left-3 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-primary-glow shadow-glow"
                />
              )}
              <Icon className="h-[18px] w-[18px] shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
              {!collapsed && "badge" in item && item.badge && (
                <span className="ml-auto rounded-md bg-gradient-rose px-1.5 py-0.5 text-[9px] font-bold text-white">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

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
            <div className="h-full w-[75%] rounded-full bg-gradient-primary" />
          </div>
          <div className="mt-1.5 text-[11px] text-muted-foreground">+45 XP qoldi</div>
        </div>
      )}

      {/* Upgrade CTA */}
      {!collapsed && (
        <div className="relative mx-3 mb-3 overflow-hidden rounded-2xl bg-gradient-primary p-3.5 text-primary-foreground shadow-glow">
          <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-white/20 blur-2xl" />
          <div className="relative flex items-center gap-2">
            <Crown className="h-4 w-4" />
            <div className="text-xs font-bold uppercase tracking-wide">Pro ga o'tish</div>
          </div>
          <div className="relative mt-1 text-[11px] text-primary-foreground/85">
            Eksklyuziv mentorlik va materiallar
          </div>
          <button className="relative mt-2 w-full rounded-lg bg-white/15 px-3 py-1.5 text-[11px] font-semibold backdrop-blur transition-colors hover:bg-white/25">
            Yangilash
          </button>
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
