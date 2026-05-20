import { Link, useRouterState } from "@tanstack/react-router";
import { Home, BookOpen, Wallet, User2, Boxes, LucideIcon } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

type Tab = { to: string; label: string; icon: LucideIcon; primary?: boolean };

const tabs: Tab[] = [
  { to: "/", label: "Bosh", icon: Home },
  { to: "/learning", label: "O'quv", icon: BookOpen },
  { to: "/gallery", label: "3D", icon: Boxes, primary: true },
  { to: "/finance", label: "Moliya", icon: Wallet },
  { to: "/settings", label: "Profil", icon: User2 },
];

export function BottomNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <motion.nav 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="safe-bottom fixed inset-x-0 bottom-0 z-40 lg:hidden"
    >
      <div className="mx-3 mb-3 rounded-3xl border border-border/40 bg-background/70 px-2 pb-1.5 pt-2 shadow-[0_-8px_50px_-8px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
        {/* Glow effect */}
        <div className="pointer-events-none absolute inset-x-4 -top-px h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
        
        <div className="relative grid grid-cols-5">
          {tabs.map((t) => {
            const active = path === t.to;
            const Icon = t.icon;
            if (t.primary) {
              return (
                <Link key={t.to} to={t.to} className="relative -mt-7 flex flex-col items-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 shadow-glow-cyan transition-transform",
                      active && "scale-110"
                    )}
                  >
                    <Icon className="h-6 w-6 text-white" />
                    {/* Pulse ring */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500"
                      initial={{ opacity: 0.5, scale: 1 }}
                      animate={{ opacity: 0, scale: 1.3 }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
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
                    className="absolute inset-1 rounded-xl bg-gradient-to-b from-cyan-500/15 to-cyan-500/5"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className={cn("relative h-5 w-5 transition-colors", active ? "text-cyan-400" : "text-muted-foreground")} />
                </motion.div>
                <span className={cn("relative text-[10px] font-medium transition-colors", active ? "text-cyan-400" : "text-muted-foreground")}>
                  {t.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
