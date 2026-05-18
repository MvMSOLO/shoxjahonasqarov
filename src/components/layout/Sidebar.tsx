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
  Trophy,
  LogOut,
} from "lucide-react";
import { useApp } from "@/lib/store";
import { profile } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/learning", label: "O'quv jarayoni", icon: BookOpen },
  { to: "/grades", label: "Davomat va Baholar", icon: BarChart3 },
  { to: "/finance", label: "Moliya va To'lovlar", icon: Wallet },
  { to: "/support", label: "Qo'llab-quvvatlash", icon: Headphones },
  { to: "/settings", label: "Sozlamalar", icon: Settings },
] as const;

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const logout = useApp((s) => s.logout);

  return (
    <aside className="flex h-full w-[260px] flex-col gap-5 border-r border-border bg-sidebar p-4 text-sidebar-foreground">
      <Link to="/" onClick={onNavigate} className="flex items-center gap-2.5 px-2 py-1">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary shadow-glow">
          <GraduationCap className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <div className="text-base font-bold tracking-tight">EduPro</div>
          <div className="text-[11px] text-muted-foreground -mt-0.5">Student Panel</div>
        </div>
      </Link>

      <div className="glass rounded-2xl p-3.5">
        <div className="flex items-center gap-3">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="h-11 w-11 rounded-full ring-2 ring-primary/50"
          />
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">{profile.name}</div>
            <div className="truncate text-xs text-muted-foreground">{profile.role}</div>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-md bg-gradient-primary px-2 py-0.5 text-[11px] font-semibold text-primary-foreground">
            <Trophy className="h-3 w-3" /> Level {profile.level}
          </span>
          <span className="ml-auto text-[11px] text-muted-foreground">
            {profile.xp.toLocaleString()} / {profile.xpMax.toLocaleString()} XP
          </span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(profile.xp / profile.xpMax) * 100}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-primary"
          />
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto scrollbar-thin">
        {nav.map((item) => {
          const active = path === item.to;
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                active
                  ? "bg-gradient-primary text-primary-foreground shadow-glow"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              )}
            >
              <Icon className="h-[18px] w-[18px] shrink-0" />
              <span className="truncate">{item.label}</span>
              {active && (
                <motion.span
                  layoutId="active-pill"
                  className="absolute right-3 h-1.5 w-1.5 rounded-full bg-primary-foreground"
                />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="rounded-2xl border border-border bg-gradient-card p-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Streak
        </div>
        <div className="mt-2 flex items-end justify-between">
          <div>
            <div className="text-sm font-semibold">7 kun ketma-ket faol!</div>
            <div className="text-xs text-muted-foreground">Zo'r natija, davom eting.</div>
          </div>
          <div className="flex items-center gap-1 rounded-lg bg-gradient-warning px-2.5 py-1.5 text-warning-foreground">
            <Flame className="h-4 w-4" />
            <span className="text-sm font-bold">{profile.streak}</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          logout();
          onNavigate?.();
        }}
        className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
      >
        <LogOut className="h-4 w-4" />
        Chiqish
      </button>
    </aside>
  );
}