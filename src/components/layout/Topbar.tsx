import { useState } from "react";
import { Bell, Search, Sun, Moon, Menu, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/lib/store";
import { profile } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar";

export function Topbar() {
  const { theme, toggleTheme, notifications, markAllRead } = useApp();
  const [query, setQuery] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border bg-background/70 px-4 py-3 backdrop-blur-xl md:px-6 md:py-4">
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger asChild>
          <button className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card lg:hidden">
            <Menu className="h-5 w-5" />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] border-r border-border bg-sidebar p-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <Sidebar onNavigate={() => setSheetOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="hidden flex-col md:flex">
        <h1 className="text-xl font-bold leading-tight md:text-2xl">
          Assalomu alaykum, {profile.name.split(" ")[0]} 👋
        </h1>
        <p className="text-xs text-muted-foreground md:text-sm">
          Bugun ham bilim olish va maqsadlaringiz sari bir qadam yaqinlashing.
        </p>
      </div>

      <div className="ml-auto flex items-center gap-2 md:gap-3">
        <div className="relative hidden md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Qidirish..."
            className="w-56 rounded-xl border-border bg-card pl-9 lg:w-72"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative grid h-10 w-10 place-items-center rounded-xl border border-border bg-card transition-colors hover:bg-accent">
              <Bell className="h-[18px] w-[18px]" />
              {unread > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                  {unread}
                </span>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="flex items-center justify-between px-2 py-1.5">
              <DropdownMenuLabel className="p-0">Bildirishnomalar</DropdownMenuLabel>
              <button onClick={markAllRead} className="text-xs text-primary hover:underline">
                Hammasini o'qildi qilish
              </button>
            </div>
            <DropdownMenuSeparator />
            <AnimatePresence>
              {notifications.map((n) => (
                <motion.div key={n.id} initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                  <DropdownMenuItem className="flex flex-col items-start gap-0.5 py-2.5">
                    <div className="flex w-full items-center gap-2">
                      {!n.read && <span className="h-2 w-2 rounded-full bg-primary" />}
                      <span className="text-sm font-medium">{n.title}</span>
                      {n.read && <Check className="ml-auto h-3 w-3 text-muted-foreground" />}
                    </div>
                    <span className="text-xs text-muted-foreground">{n.body}</span>
                    <span className="text-[10px] text-muted-foreground">{n.time}</span>
                  </DropdownMenuItem>
                </motion.div>
              ))}
            </AnimatePresence>
          </DropdownMenuContent>
        </DropdownMenu>

        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card transition-colors hover:bg-accent"
        >
          {theme === "dark" ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-xl border border-border bg-card p-1 pr-3 transition-colors hover:bg-accent">
              <img src={profile.avatar} alt="" className="h-8 w-8 rounded-lg" />
              <span className="hidden text-sm font-medium md:inline">{profile.name.split(" ")[0]}</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>{profile.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profil</DropdownMenuItem>
            <DropdownMenuItem>Sozlamalar</DropdownMenuItem>
            <DropdownMenuItem>Chiqish</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}