import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { useApp } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sun, Moon, Volume2, Lightbulb, User, Bell, Globe } from "lucide-react";
import { profile } from "@/lib/mock-data";
import { useState, useRef } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Sozlamalar — EduPro" }], links: [{ rel: "canonical", href: "/settings" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const { theme, toggleTheme, audioEnabled, toggleAudio, volume, setVolume, lighting, cycleLighting, language, setLanguage, notifPrefs, toggleNotifPref, user, login } = useApp();
  const [name, setName] = useState(user?.name ?? profile.name);
  const [email, setEmail] = useState(user?.email ?? "shoh@edupro.uz");
  const [avatar, setAvatar] = useState<string>(profile.avatar);
  const fileRef = useRef<HTMLInputElement>(null);

  function onAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setAvatar(url);
    toast.success("Avatar yangilandi");
  }

  function saveProfile() {
    login({ name, email });
    toast.success("Profil saqlandi");
  }

  return (
    <AppShell>
      <div className="glass rounded-3xl p-6 shadow-card md:p-8">
        <h1 className="text-2xl font-bold md:text-3xl">Sozlamalar</h1>
        <p className="mt-2 text-sm text-muted-foreground md:text-base">Profil, tashqi ko'rinish, ovoz va bildirishnomalarni boshqaring.</p>
      </div>

      <Tabs defaultValue="profile" className="mt-5">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="profile"><User className="mr-1.5 h-3.5 w-3.5" /> Profil</TabsTrigger>
          <TabsTrigger value="appearance"><Sun className="mr-1.5 h-3.5 w-3.5" /> Ko'rinish</TabsTrigger>
          <TabsTrigger value="audio"><Volume2 className="mr-1.5 h-3.5 w-3.5" /> Audio</TabsTrigger>
          <TabsTrigger value="notif"><Bell className="mr-1.5 h-3.5 w-3.5" /> Bildirish</TabsTrigger>
          <TabsTrigger value="lang"><Globe className="mr-1.5 h-3.5 w-3.5" /> Til</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="glass rounded-2xl p-5 shadow-card">
            <div className="flex flex-col items-start gap-5 md:flex-row md:items-center">
              <div className="relative">
                <img src={avatar} alt="" className="h-20 w-20 rounded-2xl object-cover ring-2 ring-primary/40" />
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onAvatar} />
                <button onClick={() => fileRef.current?.click()} className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-semibold text-primary-foreground shadow-glow">
                  O'zgartirish
                </button>
              </div>
              <div className="grid w-full gap-3 sm:grid-cols-2">
                <label className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-muted-foreground">Ism</span>
                  <Input value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-muted-foreground">Email</span>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button onClick={saveProfile} className="bg-gradient-primary">Saqlash</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="appearance">
          <div className="glass rounded-2xl p-5 shadow-card space-y-4">
            <Row
              icon={theme === "dark" ? Moon : Sun}
              title="Mavzu"
              subtitle={theme === "dark" ? "Tungi rejim faol" : "Kunduzgi rejim faol"}
            >
              <Button onClick={toggleTheme} className="bg-gradient-primary">
                {theme === "dark" ? "Kunduzgi" : "Tungi"} qilish
              </Button>
            </Row>
            <Row
              icon={Lightbulb}
              title="3D galereya yorug'ligi"
              subtitle={`Hozir: ${lighting === "dim" ? "Xira" : lighting === "bright" ? "Yorqin" : "O'rtacha"}`}
            >
              <Button variant="secondary" onClick={cycleLighting}>Almashtirish</Button>
            </Row>
          </div>
        </TabsContent>

        <TabsContent value="audio">
          <div className="glass rounded-2xl p-5 shadow-card space-y-4">
            <Row icon={Volume2} title="Ambient soundscape" subtitle="3D galereyada ohista pad ovozi">
              <Switch checked={audioEnabled} onCheckedChange={toggleAudio} />
            </Row>
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Tovush balandligi</span>
                <span className="font-semibold">{Math.round(volume * 100)}%</span>
              </div>
              <Slider value={[volume * 100]} max={100} step={5} onValueChange={(v) => setVolume(v[0] / 100)} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notif">
          <div className="glass rounded-2xl p-5 shadow-card space-y-3">
            {[
              { k: "material", l: "Yangi material" },
              { k: "grade", l: "Baho qo'yildi" },
              { k: "payment", l: "To'lov eslatmasi" },
              { k: "weekly", l: "Hafta yakuni hisoboti" },
            ].map((n) => (
              <Row key={n.k} icon={Bell} title={n.l} subtitle="Push + email">
                <Switch checked={!!notifPrefs[n.k]} onCheckedChange={() => toggleNotifPref(n.k)} />
              </Row>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="lang">
          <div className="glass rounded-2xl p-5 shadow-card">
            <h2 className="text-base font-bold">Tilni tanlang</h2>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {([
                { v: "uz", l: "O'zbek" },
                { v: "en", l: "English" },
              ] as const).map((opt) => (
                <button
                  key={opt.v}
                  onClick={() => { setLanguage(opt.v); toast.success(`Til: ${opt.l}`); }}
                  className={`rounded-xl border p-3 text-sm font-medium transition-colors ${
                    language === opt.v ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-accent"
                  }`}
                >
                  {opt.l}
                </button>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}

function Row({ icon: Icon, title, subtitle, children }: { icon: any; title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-muted">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-semibold">{title}</div>
        <div className="text-xs text-muted-foreground">{subtitle}</div>
      </div>
      {children}
    </div>
  );
}
