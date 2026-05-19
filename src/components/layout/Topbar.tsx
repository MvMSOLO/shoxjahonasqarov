import { useMemo, useState } from "react";
import { Bell, Search, Sun, Moon, Menu, Check, Volume2, VolumeX, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "@tanstack/react-router";
import { useApp } from "@/lib/store";
import { profile, courses, schedule } from "@/lib/mock-data";
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

type SearchResult = { label: string; to: string; kind: string };

export function Topbar() {
  const { theme, toggleTheme, notifications, markAllRead, audioEnabled, toggleAudio, logout } = useApp();
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const navigate = useNavigate();
  const unread = notifications.filter((n) => !n.read).length;

  const allItems: SearchResult[] = useMemo(() => {
    const courseItems = courses.map((c) => ({ label: c.name, to: "/learning", kind: "Kurs" }));
    const todayItems = schedule.Bugun.map((s) => ({ label: s.title, to: "/grades", kind: "Dars" }));
    const pages = [
      { label: "Dashboard", to: "/", kind: "Sahifa" },
      { label: "3D Galereya", to: "/gallery", kind: "Sahifa" },
      { label: "Moliya", to: "/finance", kind: "Sahifa" },
      { label: "Sozlamalar", to: "/settings", kind: "Sahifa" },
    ];
    return [...pages, ...courseItems, ...todayItems];
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allItems.filter((i) => i.label.toLowerCase().includes(q)).slice(0, 6);
  }, [query, allItems]);

  return (
    <header className="sticky top-0 z-30 flex items-center gap-2 border-b border-border bg-background/75 px-3 py-3 backdrop-blur-xl md:gap-3 md:px-6 md:py-4">
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger asChild>
          <button className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card lg:hidden">
            <Menu className="h-5 w-5" />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] border-r border-sidebar-border bg-sidebar p-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <Sidebar onNavigate={() => setSheetOpen(false)} forceExpanded />
        </SheetContent>
      </Sheet>

      <div className="hidden flex-col md:flex">
        <h1 className="text-lg font-bold leading-tight md:text-2xl">
          Assalomu alaykum, {profile.name.split(" ")[0]} 👋
        </h1>
        <p className="hidden text-xs text-muted-foreground md:block md:text-sm">
          Bugun ham bilim olish va maqsadlaringiz sari bir qadam yaqinlashing.
        </p>
      </div>

      <div className="flex flex-1 items-center justify-end gap-1.5 md:gap-2">
        {/* Mobile greeting */}
        <div className="mr-auto md:hidden">
          <div className="text-sm font-bold leading-tight">Salom, {profile.name.split(" ")[0]} 👋</div>
          <div className="text-[10px] text-muted-foreground">Bugun zo'r kun</div>
        </div>

        {/* Search desktop */}
        <div className="relative hidden md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSearchOpen(true); }}
            onFocus={() => setSearchOpen(true)}
            onBlur={() => setTimeout(() => setSearchOpen(false), 180)}
            placeholder="Kurs, dars, sahifa qidirish..."
            className="w-56 rounded-xl border-border bg-card pl-9 lg:w-72"
          />
          <AnimatePresence>
            {searchOpen && results.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="absolute left-0 right-0 top-full z-40 mt-2 overflow-hidden rounded-xl border border-border bg-popover shadow-card"
              >
                {results.map((r) => (
                  <button
                    key={r.label}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      navigate({ to: r.to });
                      setQuery("");
                      setSearchOpen(false);
                    }}
                    className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors hover:bg-accent"
                  >
                    <span className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {r.kind}
                    </span>
                    <span className="flex-1 truncate">{r.label}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Audio toggle */}
        <button
          onClick={toggleAudio}
          aria-label="Toggle ambient audio"
          title="Atrof-muhit ovozi"
          className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card transition-colors hover:bg-accent"
        >
          {audioEnabled ? <Volume2 className="h-[18px] w-[18px] text-primary" /> : <VolumeX className="h-[18px] w-[18px]" />}
        </button>

        {/* Notifications */}
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

        {/* Theme */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card transition-colors hover:bg-accent"
        >
          {theme === "dark" ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
        </button>

        {/* Profile menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-xl border border-border bg-card p-1 pr-3 transition-colors hover:bg-accent">
              <img src={profile.avatar} alt="" className="h-8 w-8 rounded-lg" />
              <span className="hidden text-sm font-medium md:inline">{profile.name.split(" ")[0]}</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel className="flex flex-col">
              <span>{profile.name}</span>
              <span className="text-xs font-normal text-muted-foreground">Level {profile.level}</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/settings">Profil sozlamalari</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/finance">Moliya</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/support">Yordam</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
              Chiqish
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
