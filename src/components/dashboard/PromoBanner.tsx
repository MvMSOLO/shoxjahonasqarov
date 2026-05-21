import { motion } from "framer-motion";
import { Rocket, Clock, ArrowRight, Zap } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const PROMOS = [
  {
    id: 1,
    badge: "Yangi kurs",
    title: "React Native 2025",
    subtitle: "Mobil dasturlash — iOS va Android",
    cta: "Ro'yxatdan o'tish",
    gradient: "from-cyan-600 to-blue-700",
    accent: "bg-cyan-400/20 text-cyan-300",
    deadline: "Iyul 1 dan",
    icon: "📱",
    spots: 20,
  },
  {
    id: 2,
    badge: "Chegirma -30%",
    title: "Full-Stack Bootcamp",
    subtitle: "Node.js + React + PostgreSQL",
    cta: "Batafsil ko'rish",
    gradient: "from-violet-600 to-purple-700",
    accent: "bg-violet-400/20 text-violet-300",
    deadline: "Faqat 48 soat",
    icon: "🚀",
    spots: 8,
  },
  {
    id: 3,
    badge: "Bepul",
    title: "DevOps Workshop",
    subtitle: "Docker, Kubernetes, CI/CD",
    cta: "Ro'yxatdan o'tish",
    gradient: "from-amber-600 to-orange-700",
    accent: "bg-amber-400/20 text-amber-300",
    deadline: "Shanba, 10:00",
    icon: "♾️",
    spots: 15,
  },
];

export function PromoBanner() {
  const [active, setActive] = useState(0);
  const promo = PROMOS[active];

  return (
    <div className="glass overflow-hidden rounded-2xl shadow-card">
      <div className={`relative bg-gradient-to-br ${promo.gradient} p-4 md:p-5`}>
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/5 blur-2xl" />
        <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-white/5 blur-2xl" />

        <div className="relative flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className={cn("rounded-full px-2.5 py-1 text-[10px] font-bold", promo.accent)}>
                {promo.badge}
              </span>
              <div className="flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/80">
                <Clock className="h-3 w-3" /> {promo.deadline}
              </div>
            </div>
            <h3 className="mt-2 text-lg font-bold text-white">{promo.title}</h3>
            <p className="text-xs text-white/75">{promo.subtitle}</p>

            <div className="mt-3 flex items-center gap-2">
              <button className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3 py-1.5 text-xs font-bold text-gray-900 shadow-md transition-transform hover:scale-105">
                <Rocket className="h-3.5 w-3.5" />
                {promo.cta}
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <span className="text-[11px] text-white/60">
                <Zap className="mr-0.5 inline h-3 w-3 text-yellow-400" />
                {promo.spots} o'rin qoldi
              </span>
            </div>
          </div>
          <div className="text-4xl">{promo.icon}</div>
        </div>

        {/* Dots */}
        <div className="mt-3 flex gap-1.5">
          {PROMOS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === active ? "w-4 bg-white" : "w-1.5 bg-white/40"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
