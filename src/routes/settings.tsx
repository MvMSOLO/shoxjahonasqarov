import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/SimplePage";
import { useApp } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Sun, Moon, Volume2, Sparkles, Lightbulb } from "lucide-react";
import { profile } from "@/lib/mock-data";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Sozlamalar — EduPro" }], links: [{ rel: "canonical", href: "/settings" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const { theme, toggleTheme, audioEnabled, toggleAudio, volume, setVolume, lighting, cycleLighting } = useApp();

  return (
    <SimplePage title="Sozlamalar" description="Profilingiz, ko'rinish va atmosfera sozlamalarini boshqaring.">
      {/* Profile */}
      <div className="glass rounded-2xl p-5 shadow-card">
        <div className="flex items-center gap-4">
          <img src={profile.avatar} alt="" className="h-16 w-16 rounded-2xl ring-2 ring-primary/40" />
          <div className="min-w-0">
            <div className="text-lg font-bold">{profile.name}</div>
            <div className="text-sm text-muted-foreground">{profile.role} · Level {profile.level}</div>
          </div>
          <Button variant="secondary" className="ml-auto">Tahrirlash</Button>
        </div>
      </div>

      {/* Appearance */}
      <div className="glass rounded-2xl p-5 shadow-card">
        <h2 className="text-base font-bold">Ko'rinish</h2>
        <div className="mt-4 space-y-4">
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
      </div>

      {/* Audio */}
      <div className="glass rounded-2xl p-5 shadow-card">
        <h2 className="text-base font-bold">Atrof-muhit ovozi</h2>
        <div className="mt-4 space-y-4">
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
      </div>

      {/* Notifications */}
      <div className="glass rounded-2xl p-5 shadow-card">
        <h2 className="text-base font-bold">Bildirishnomalar</h2>
        <div className="mt-4 space-y-3">
          {["Yangi material", "Baho qo'yildi", "To'lov eslatmasi", "Hafta yakuni hisoboti"].map((label, i) => (
            <Row key={label} icon={Sparkles} title={label} subtitle="Push + email">
              <Switch defaultChecked={i < 3} />
            </Row>
          ))}
        </div>
      </div>
    </SimplePage>
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
