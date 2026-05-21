import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { useApp } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sun, Moon, Volume2, Lightbulb, User, Bell, Globe,
  Check, Palette, Shield, Music, Waves, TreePine, VolumeX,
  Camera, Save, LogOut, ChevronRight, Smartphone
} from "lucide-react";
import { profile } from "@/lib/mock-data";
import { useState, useRef, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Sozlamalar — EduPro" }], links: [{ rel: "canonical", href: "/settings" }] }),
  component: SettingsPage,
});

function useWebAudio() {
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  const start = useCallback((volume: number) => {
    try {
      if (!ctxRef.current || ctxRef.current.state === "closed") {
        ctxRef.current = new AudioContext();
      }
      const ctx = ctxRef.current;
      if (ctx.state === "suspended") ctx.resume();

      gainRef.current = ctx.createGain();
      gainRef.current.gain.setValueAtTime(0, ctx.currentTime);
      gainRef.current.gain.linearRampToValueAtTime(volume * 0.06, ctx.currentTime + 0.5);
      gainRef.current.connect(ctx.destination);

      const freqs = [60, 90, 120, 180];
      oscillatorsRef.current = freqs.map((freq) => {
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.value = freq;
        osc.connect(gainRef.current!);
        osc.start();
        return osc;
      });
    } catch {}
  }, []);

  const stop = useCallback(() => {
    try {
      if (gainRef.current) {
        gainRef.current.gain.linearRampToValueAtTime(0, (ctxRef.current?.currentTime ?? 0) + 0.5);
      }
      setTimeout(() => {
        oscillatorsRef.current.forEach((o) => { try { o.stop(); } catch {} });
        oscillatorsRef.current = [];
      }, 600);
    } catch {}
  }, []);

  const setVolume = useCallback((vol: number) => {
    if (gainRef.current && ctxRef.current) {
      gainRef.current.gain.linearRampToValueAtTime(vol * 0.06, ctxRef.current.currentTime + 0.1);
    }
  }, []);

  useEffect(() => () => { try { ctxRef.current?.close(); } catch {} }, []);
  return { start, stop, setVolume };
}

function SettingsPage() {
  const {
    theme, toggleTheme,
    audioEnabled, toggleAudio,
    volume, setVolume,
    lighting, cycleLighting,
    language, setLanguage,
    notifPrefs, toggleNotifPref,
    user, login, logout
  } = useApp();

  const [name, setName] = useState(user?.name ?? profile.name);
  const [email, setEmail] = useState(user?.email ?? "shoh@edupro.uz");
  const [avatar, setAvatar] = useState<string>(profile.avatar);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const webAudio = useWebAudio();

  function onAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setAvatar(url);
    toast.success("Avatar yangilandi ✓");
  }

  function saveProfile() {
    if (!name.trim()) { toast.error("Ism bo'sh bo'lishi mumkin emas"); return; }
    login({ name: name.trim(), email: email.trim() });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    toast.success("Profil saqlandi ✓");
  }

  function handleToggleAudio() {
    if (!audioEnabled) {
      webAudio.start(volume);
      toast("🎵 Ambient ovoz yoqildi");
    } else {
      webAudio.stop();
      toast("🔇 Ovoz o'chirildi");
    }
    toggleAudio();
  }

  function handleVolumeChange(val: number[]) {
    setVolume(val[0] / 100);
    if (audioEnabled) webAudio.setVolume(val[0] / 100);
  }

  function handleTestSound() {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 528;
    osc.type = "sine";
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(volume * 0.2, ctx.currentTime + 0.1);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.2);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 1.5);
    toast("🎵 Sinov ovozi ijro etilmoqda…");
  }

  const lightingLabel = lighting === "dim" ? "Xira" : lighting === "bright" ? "Yorqin" : "O'rtacha";

  return (
    <AppShell>
      <div className="glass rounded-3xl p-4 shadow-card md:p-6">
        <h1 className="text-2xl font-bold md:text-3xl">Sozlamalar</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Profil, ko'rinish, ovoz va bildirishnomalarni boshqaring.
        </p>
      </div>

      <Tabs defaultValue="profile" className="mt-4">
        <TabsList className="flex w-full flex-wrap justify-start gap-0.5">
          <TabsTrigger value="profile" className="gap-1.5"><User className="h-3.5 w-3.5" /> Profil</TabsTrigger>
          <TabsTrigger value="appearance" className="gap-1.5"><Palette className="h-3.5 w-3.5" /> Ko'rinish</TabsTrigger>
          <TabsTrigger value="audio" className="gap-1.5"><Volume2 className="h-3.5 w-3.5" /> Audio</TabsTrigger>
          <TabsTrigger value="notif" className="gap-1.5"><Bell className="h-3.5 w-3.5" /> Bildirish</TabsTrigger>
          <TabsTrigger value="lang" className="gap-1.5"><Globe className="h-3.5 w-3.5" /> Til</TabsTrigger>
          <TabsTrigger value="security" className="gap-1.5"><Shield className="h-3.5 w-3.5" /> Xavfsizlik</TabsTrigger>
        </TabsList>

        {/* ── PROFILE ── */}
        <TabsContent value="profile">
          <div className="glass rounded-2xl p-5 shadow-card">
            <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
              <div className="relative shrink-0">
                <div className="relative h-24 w-24 overflow-hidden rounded-2xl ring-2 ring-primary/30">
                  <img src={avatar} alt="" className="h-full w-full object-cover" />
                  <button
                    onClick={() => fileRef.current?.click()}
                    className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity hover:opacity-100"
                  >
                    <Camera className="h-5 w-5 text-white" />
                  </button>
                </div>
                <button
                  onClick={() => fileRef.current?.click()}
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-primary px-2.5 py-0.5 text-[10px] font-semibold text-primary-foreground shadow-glow"
                >
                  O'zgartirish
                </button>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onAvatar} />
              </div>

              <div className="w-full space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-semibold text-muted-foreground">Ism *</span>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ismingiz"
                      className={cn(saved && "border-success ring-1 ring-success")}
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-semibold text-muted-foreground">Email *</span>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@example.com"
                    />
                  </label>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-semibold text-muted-foreground">Mutaxassislik</span>
                    <Input defaultValue={profile.role} disabled className="opacity-60" />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-semibold text-muted-foreground">Student ID</span>
                    <Input defaultValue="EDU-2025-0042" disabled className="opacity-60" />
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
              <button
                onClick={() => { logout(); toast("Sessiya yopildi"); }}
                className="inline-flex items-center gap-1.5 text-sm text-destructive transition-colors hover:opacity-80"
              >
                <LogOut className="h-4 w-4" /> Hisobdan chiqish
              </button>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={saveProfile}
                className={cn(
                  "inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all",
                  saved
                    ? "bg-success text-success-foreground"
                    : "bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90"
                )}
              >
                <AnimatePresence mode="wait">
                  {saved ? (
                    <motion.span key="saved" initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="flex items-center gap-1.5">
                      <Check className="h-4 w-4" /> Saqlandi!
                    </motion.span>
                  ) : (
                    <motion.span key="save" className="flex items-center gap-1.5">
                      <Save className="h-4 w-4" /> Saqlash
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </TabsContent>

        {/* ── APPEARANCE ── */}
        <TabsContent value="appearance">
          <div className="glass space-y-4 rounded-2xl p-5 shadow-card">
            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Ko'rinish sozlamalari</h2>

            <Row icon={theme === "dark" ? Moon : Sun} title="Mavzu" subtitle={theme === "dark" ? "Tungi rejim faol — qorong'u va qulay" : "Kunduzgi rejim faol — yorug' va aniq"}>
              <button
                onClick={() => { toggleTheme(); toast(`${theme === "dark" ? "Kunduzgi" : "Tungi"} rejimga o'tildi`); }}
                className={cn(
                  "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all",
                  theme === "dark"
                    ? "bg-amber-400/15 text-amber-400 hover:bg-amber-400/25"
                    : "bg-violet-500/15 text-violet-500 hover:bg-violet-500/25"
                )}
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                {theme === "dark" ? "Kunduzgi" : "Tungi"}
              </button>
            </Row>

            <div className="rounded-xl border border-border p-3">
              <div className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Mavzu rangi</div>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Binafsha", from: "oklch(0.62 0.22 280)", to: "oklch(0.7 0.2 305)", active: true },
                  { label: "Ko'k", from: "oklch(0.6 0.2 230)", to: "oklch(0.68 0.18 250)", active: false },
                  { label: "Yashil", from: "oklch(0.6 0.18 160)", to: "oklch(0.7 0.15 175)", active: false },
                  { label: "Qizil", from: "oklch(0.65 0.24 22)", to: "oklch(0.6 0.22 350)", active: false },
                  { label: "Tosh", from: "oklch(0.55 0.06 270)", to: "oklch(0.65 0.04 270)", active: false },
                ].map((c) => (
                  <button
                    key={c.label}
                    title={c.label}
                    onClick={() => toast(`${c.label} rangi tanlandi`)}
                    className={cn(
                      "h-8 w-8 rounded-full transition-all",
                      c.active && "ring-2 ring-offset-2 ring-primary ring-offset-background"
                    )}
                    style={{ background: `linear-gradient(135deg, ${c.from}, ${c.to})` }}
                  />
                ))}
              </div>
            </div>

            <Row icon={Lightbulb} title="3D galereya yorug'ligi" subtitle={`Hozir: ${lightingLabel} — 3D xonalar uchun`}>
              <button
                onClick={() => { cycleLighting(); toast(`Yorug'lik: ${lightingLabel} → o'zgartirildi`); }}
                className="rounded-xl border border-border bg-muted px-4 py-2 text-sm font-semibold transition-colors hover:bg-accent"
              >
                {lightingLabel} →
              </button>
            </Row>

            <Row icon={Smartphone} title="Kompakt rejim" subtitle="Sidebar va karta o'lchamlarini kichiklashtirish">
              <Switch
                checked={false}
                onCheckedChange={() => toast("Yaqinda qo'shiladi...")}
              />
            </Row>
          </div>
        </TabsContent>

        {/* ── AUDIO ── */}
        <TabsContent value="audio">
          <div className="glass space-y-4 rounded-2xl p-5 shadow-card">
            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Audio sozlamalari</h2>

            <Row icon={audioEnabled ? Volume2 : VolumeX} title="Ambient soundscape" subtitle="3D galereya va study timer uchun ohista pad ovozi">
              <Switch
                checked={audioEnabled}
                onCheckedChange={handleToggleAudio}
              />
            </Row>

            <div className="rounded-xl border border-border bg-card/60 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold">Tovush balandligi</span>
                <span className={cn(
                  "rounded-lg px-2 py-0.5 text-sm font-bold",
                  audioEnabled ? "text-primary" : "text-muted-foreground"
                )}>
                  {Math.round(volume * 100)}%
                </span>
              </div>
              <Slider
                value={[volume * 100]}
                max={100}
                min={0}
                step={5}
                onValueChange={handleVolumeChange}
                disabled={!audioEnabled}
                className={!audioEnabled ? "opacity-50" : ""}
              />
              <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
                <span>0%</span><span>50%</span><span>100%</span>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card/60 p-4">
              <div className="mb-3 text-sm font-semibold">Ovoz turlari</div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "lofi", icon: Music, label: "Lo-Fi Beats", desc: "Musiqa ritmi" },
                  { id: "rain", icon: Waves, label: "Yomg'ir", desc: "Tabiat ovozi" },
                  { id: "forest", icon: TreePine, label: "O'rmon", desc: "Qushlar sayrashi" },
                  { id: "white", icon: Volume2, label: "White Noise", desc: "Toza shovqin" },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => toast(`${s.label} tanlandi`)}
                    className="flex items-start gap-2.5 rounded-xl border border-border p-2.5 text-left transition-colors hover:bg-accent"
                  >
                    <s.icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <div>
                      <div className="text-xs font-semibold">{s.label}</div>
                      <div className="text-[10px] text-muted-foreground">{s.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleTestSound}
              className="w-full rounded-xl border border-primary/30 bg-primary/10 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/20"
            >
              🔊 Sinov ovozi ijro etish
            </button>
          </div>
        </TabsContent>

        {/* ── NOTIFICATIONS ── */}
        <TabsContent value="notif">
          <div className="glass space-y-2 rounded-2xl p-5 shadow-card">
            <h2 className="mb-3 text-sm font-bold text-muted-foreground uppercase tracking-wider">Bildirishnoma sozlamalari</h2>
            {[
              { k: "material", icon: "📚", l: "Yangi material", d: "O'qituvchi yangi kurs materiali yuklasa" },
              { k: "grade", icon: "📊", l: "Baho qo'yildi", d: "Vazifangizga baho berilsa" },
              { k: "payment", icon: "💳", l: "To'lov eslatmasi", d: "To'lov muddati 3 kun qolsa" },
              { k: "weekly", icon: "📈", l: "Haftalik hisobot", d: "Har dushanba kuni progress xulosa" },
              { k: "news", icon: "📢", l: "E'lonlar", d: "Muhim platforma yangiliklari" },
              { k: "leaderboard", icon: "🏆", l: "Reyting o'zgarishi", d: "Reytingda o'rningiz o'zgarsa" },
            ].map((n) => (
              <motion.div
                key={n.k}
                whileTap={{ scale: 0.99 }}
                className={cn(
                  "flex items-center gap-3 rounded-xl border p-3.5 transition-colors",
                  notifPrefs[n.k] ? "border-primary/20 bg-primary/5" : "border-border hover:bg-accent/40"
                )}
              >
                <span className="text-xl">{n.icon}</span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold">{n.l}</div>
                  <div className="text-[11px] text-muted-foreground">{n.d}</div>
                </div>
                <Switch
                  checked={!!notifPrefs[n.k]}
                  onCheckedChange={() => {
                    toggleNotifPref(n.k);
                    toast(`${n.l}: ${notifPrefs[n.k] ? "o'chirildi" : "yoqildi"}`);
                  }}
                />
              </motion.div>
            ))}

            <div className="mt-3 rounded-xl bg-muted/60 p-3 text-xs text-muted-foreground">
              <strong className="text-foreground">Eslatma:</strong> Push bildirishnomalar brauzeringiz tomonidan boshqariladi. Ruxsat bermagan bo'lsangiz, brauzer sozlamalarini tekshiring.
            </div>
          </div>
        </TabsContent>

        {/* ── LANGUAGE ── */}
        <TabsContent value="lang">
          <div className="glass rounded-2xl p-5 shadow-card">
            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Interfeys tili</h2>
            <p className="mt-1 text-xs text-muted-foreground">Tanlangan til interfeysdagi matnlarga ta'sir qiladi.</p>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {([
                { v: "uz", l: "O'zbek", flag: "🇺🇿", desc: "Asosiy til" },
                { v: "en", l: "English", flag: "🇬🇧", desc: "Ingliz tili" },
                { v: "ru", l: "Русский", flag: "🇷🇺", desc: "Rus tili (yaqinda)" },
              ] as const).map((opt) => (
                <button
                  key={opt.v}
                  onClick={() => {
                    if (opt.v === "ru") { toast("Rus tili yaqinda qo'shiladi!"); return; }
                    setLanguage(opt.v as "uz" | "en");
                    toast.success(`Til: ${opt.l} ✓`);
                  }}
                  className={cn(
                    "flex flex-col items-center gap-1.5 rounded-2xl border p-4 text-sm font-medium transition-all",
                    language === opt.v
                      ? "border-primary bg-primary/10 text-primary shadow-sm"
                      : "border-border hover:bg-accent",
                    opt.v === "ru" && "opacity-60"
                  )}
                >
                  <span className="text-2xl">{opt.flag}</span>
                  <span className="font-semibold">{opt.l}</span>
                  <span className="text-[10px] text-muted-foreground">{opt.desc}</span>
                  {language === opt.v && (
                    <span className="flex items-center gap-1 text-[10px] text-primary">
                      <Check className="h-3 w-3" /> Faol
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* ── SECURITY ── */}
        <TabsContent value="security">
          <div className="glass space-y-3 rounded-2xl p-5 shadow-card">
            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Xavfsizlik</h2>

            {[
              { icon: Shield, title: "Parolni o'zgartirish", desc: "Hisobingiz xavfsizligi uchun", action: () => toast("Email yuborildi: shoh@edupro.uz") },
              { icon: Smartphone, title: "Ikki bosqichli autentifikatsiya", desc: "SMS yoki authenticator orqali", action: () => toast("Yaqinda qo'shiladi...") },
              { icon: Globe, title: "Faol sessiyalar", desc: "Barcha qurilmalardan chiqish", action: () => { logout(); toast("Barcha sessiyalar yopildi"); } },
            ].map((item) => (
              <button
                key={item.title}
                onClick={item.action}
                className="flex w-full items-center gap-3 rounded-xl border border-border p-3.5 text-left transition-colors hover:bg-accent"
              >
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-muted">
                  <item.icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold">{item.title}</div>
                  <div className="text-xs text-muted-foreground">{item.desc}</div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}

            <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4">
              <div className="text-sm font-semibold text-destructive">Xavfli zona</div>
              <div className="mt-1 text-xs text-muted-foreground">Bu amalni qaytarib bo'lmaydi. Diqqat bilan bajaring.</div>
              <button
                onClick={() => toast.error("Hisobni o'chirish uchun qo'llab-quvvatlash xizmatiga murojaat qiling")}
                className="mt-3 rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-1.5 text-xs font-semibold text-destructive transition-colors hover:bg-destructive/20"
              >
                Hisobni o'chirish
              </button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}

function Row({
  icon: Icon, title, subtitle, children
}: { icon: React.ComponentType<{ className?: string }>; title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border p-3.5">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-muted shrink-0">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-xs text-muted-foreground">{subtitle}</div>
      </div>
      {children}
    </div>
  );
}
