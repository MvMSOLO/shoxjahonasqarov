import { ReactNode, useEffect } from "react";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { BottomNav } from "./BottomNav";
import { useApp } from "@/lib/store";

export function AppShell({ children, rightRail }: { children: ReactNode; rightRail?: ReactNode }) {
  const theme = useApp((s) => s.theme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(theme);
  }, [theme]);

  return (
    <div className="relative flex min-h-screen w-full bg-background text-foreground">
      {/* Vignette overlay */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,oklch(0.05_0.01_270/50%)_100%)]" />
      
      {/* Ambient glow orbs */}
      <div className="glow-orb fixed -left-32 top-1/4 h-96 w-96 bg-cyan-500/10 animate-float-slow" />
      <div className="glow-orb fixed -right-32 bottom-1/4 h-80 w-80 bg-blue-500/8 animate-float" />
      
      <div className="hidden shrink-0 lg:block">
        <div className="sticky top-0 h-screen">
          <Sidebar />
        </div>
      </div>
      <div className="relative flex min-w-0 flex-1 flex-col">
        <Topbar />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-1 flex-col gap-5 p-4 pb-safe-nav md:p-6 lg:pb-6 xl:flex-row"
        >
          <main className="relative min-w-0 flex-1 space-y-5">{children}</main>
          {rightRail && (
            <motion.aside 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-full shrink-0 space-y-5 xl:w-[340px]"
            >
              {rightRail}
            </motion.aside>
          )}
        </motion.div>
      </div>
      <BottomNav />
    </div>
  );
}
