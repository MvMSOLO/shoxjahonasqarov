import { ReactNode, useEffect } from "react";
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
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <div className="hidden shrink-0 lg:block">
        <div className="sticky top-0 h-screen">
          <Sidebar />
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <div className="flex flex-1 flex-col gap-5 p-4 pb-safe-nav md:p-6 lg:pb-6 xl:flex-row">
          <main className="min-w-0 flex-1 space-y-5">{children}</main>
          {rightRail && (
            <aside className="w-full shrink-0 space-y-5 xl:w-[340px]">{rightRail}</aside>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
