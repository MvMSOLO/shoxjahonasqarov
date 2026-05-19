import { Link, useRouterState } from "@tanstack/react-router";
import { Home, BookOpen, Wallet, User2, Boxes } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const tabs = [
  { to: "/", label: "Bosh", icon: Home },
  { to: "/learning", label: "O'quv", icon: BookOpen },
  { to: "/gallery", label: "3D", icon: Boxes, primary: true },
  { to: "/finance", label: "Moliya", icon: Wallet },
  { to: "/settings", label: "Profil", icon: User2 },
] as const;

export function BottomNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="safe-bottom fixed inset-x-0 bottom-0 z-40 lg:hidden">
      <div className="mx-3 mb-3 rounded-3xl border border-border/60 bg-background/85 px-2 pb-1.5 pt-2 shadow-[0_8px_40px_-8px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
        <div className="relative grid grid-cols-5">
          {tabs.map((t) => {
            const active = path === t.to;
            const Icon = t.icon;
            if (t.primary) {
              return (
                <Link key={t.to} to={t.to} className="relative -mt-7 flex flex-col items-center">
                  <div
                    className={cn(
                      "grid h-14 w-14 place-items-center rounded-2xl bg-gradient-primary shadow-glow transition-transform",
                      active && "scale-110"
                    )}
                  >
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <span className="mt-1 text-[10px] font-semibold text-foreground">{t.label}</span>
                </Link>
              );
            }
            return (
              <Link
                key={t.to}
                to={t.to}
                className="relative flex min-h-[56px] flex-col items-center justify-center gap-0.5 rounded-2xl px-1"
              >
                {active && (
                  <motion.div
                    layoutId="bottom-active"
                    className="absolute inset-1 rounded-xl bg-gradient-to-b from-primary/15 to-primary/5"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <Icon
                  className={cn("relative h-5 w-5", active ? "text-primary" : "text-muted-foreground")}
                />
                <span
                  className={cn(
                    "relative text-[10px] font-medium",
                    active ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {t.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
