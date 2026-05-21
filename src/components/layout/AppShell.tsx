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
        <div className="flex flex-1 flex-col gap-2 overflow-hidden px-2 py-3 pb-20 sm:gap-3 sm:p-3 md:gap-4 md:p-4 lg:pb-6 lg:p-5 xl:gap-5 xl:flex-row xl:p-6">
          <main className="min-w-0 flex-1 space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-5 overflow-y-auto">{children}</main>
          {rightRail && (
            <aside className="w-full shrink-0 space-y-2 overflow-y-auto sm:space-y-3 md:space-y-4 lg:space-y-5 xl:w-80 xl:max-h-[calc(100vh-5rem)]">{rightRail}</aside>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
