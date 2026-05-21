import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Loader2, ChevronDown, Maximize2 } from "lucide-react";
import { motion } from "framer-motion";

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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    let mounted = true;
    import("@/components/gallery/Scene").then((m) => {
      if (mounted) setScene(() => m.GalleryScene);
    });
    return () => { mounted = false; };
  }, []);

  return (
    <AppShell>
      <div className="relative -mx-3 -my-3 md:-mx-5 md:-my-5 xl:-mx-6 xl:-my-6">
        {!Scene ? (
          <div className="grid h-[70vh] place-items-center md:h-[80vh]">
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <div className="text-sm">3D galereya yuklanmoqda…</div>
              <div className="text-[11px] text-muted-foreground/60">WebGL ishga tushirilmoqda</div>
            </div>
          </div>
        ) : (
          <>
            <Scene />
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="pointer-events-none fixed inset-x-0 z-20 mx-auto max-w-2xl px-4 text-center"
              style={{ top: isMobile ? "72px" : "88px" }}
            >
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">EduPro · v6 · AI Platform</div>
              <h1 className="mt-1.5 text-2xl font-bold text-white drop-shadow-lg md:text-4xl lg:text-5xl">
                Har bir kurs — <span className="text-gradient-primary">o'z xonasi</span>
              </h1>
              <p className="mx-auto mt-1.5 max-w-md text-xs text-white/60 md:text-sm">
                Aylanuvchi spotlightlar va atmosfera bilan to'la 3D galereya.
              </p>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs text-white/60 backdrop-blur-sm"
              >
                <ChevronDown className="h-4 w-4" />
                Aylantirib boshlang
              </motion.div>
            </motion.div>

            <div className="pointer-events-none fixed bottom-20 right-4 z-20 lg:bottom-6">
              <div className="flex items-center gap-1.5 rounded-xl bg-black/40 px-2.5 py-1.5 backdrop-blur-sm">
                <Maximize2 className="h-3.5 w-3.5 text-white/60" />
                <span className="text-[10px] font-medium text-white/60">
                  {isMobile ? "Swipe" : "Scroll"} qiling
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </AppShell>
  );
}
