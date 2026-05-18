import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/SimplePage";
import { useApp } from "@/lib/store";
import { Button } from "@/components/ui/button";
export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Sozlamalar — EduPro" }], links: [{ rel: "canonical", href: "/settings" }] }),
  component: SettingsPage,
});
function SettingsPage() {
  const { theme, toggleTheme } = useApp();
  return (
    <SimplePage title="Sozlamalar" description="Profilingiz va ilovaning ko'rinishini sozlang.">
      <div className="glass rounded-2xl p-5 shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold">Mavzu</div>
            <div className="text-sm text-muted-foreground">Hozir: {theme === "dark" ? "Tungi" : "Kunduzgi"}</div>
          </div>
          <Button onClick={toggleTheme} className="bg-gradient-primary">Almashtirish</Button>
        </div>
      </div>
    </SimplePage>
  );
}
