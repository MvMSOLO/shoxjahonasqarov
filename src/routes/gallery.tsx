import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, lazy, Suspense } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Loader2, ChevronDown } from "lucide-react";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "3D Galereya — EduPro" },
      { name: "description", content: "Har bir kurs alohida 3D xona — Three.js + GSAP scroll camera + Howler ambient." },
      { property: "og:title", content: "EduPro 3D Galereya" },
      { property: "og:description", content: "Immersive WebGL kurslar galereyasi." },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const [Scene, setScene] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    let mounted = true;
    import("@/components/gallery/Scene").then((m) => {
      if (mounted) setScene(() => m.GalleryScene);
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <AppShell>
      <div className="relative -mx-4 -my-4 md:-mx-6 md:-my-6">
        <div className="relative">
          {!Scene ? (
            <div className="grid h-[80vh] place-items-center">
              <div className="flex flex-col items-center gap-3 text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <div className="text-sm">3D galereya yuklanmoqda…</div>
              </div>
            </div>
          ) : (
            <Suspense fallback={null}>
              <Scene />
            </Suspense>
          )}

          {/* Hero overlay on first room */}
          <div className="pointer-events-none fixed inset-x-0 top-24 z-20 mx-auto max-w-2xl px-6 text-center md:top-32">
            <div className="text-[11px] uppercase tracking-[0.3em] text-white/40">EduPro · v2</div>
            <h1 className="mt-2 text-3xl font-bold text-white drop-shadow-lg md:text-5xl">
              Har bir kurs — <span className="text-gradient-primary">o'z xonasi</span>
            </h1>
            <p className="mx-auto mt-2 max-w-md text-sm text-white/60 md:text-base">
              Aylanuvchi spotlightlar va atmosfera bilan to'la 3D galereya. Pastga aylantiring.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 text-xs text-white/60">
              <ChevronDown className="h-4 w-4 animate-bounce" />
              Aylantirib boshlang
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
