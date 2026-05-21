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
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass overflow-hidden rounded-2xl shadow-card"
    >
      <div className={`relative bg-gradient-to-br ${promo.gradient} p-3 sm:p-4 md:p-5`}>
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/5 blur-2xl" />
        <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-white/5 blur-2xl" />

        <div className="relative flex flex-col gap-2.5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <motion.span
                whileHover={{ scale: 1.05 }}
                className={cn("rounded-full px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] font-bold", promo.accent)}
              >
                {promo.badge}
              </motion.span>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1 rounded-full bg-white/10 px-1.5 py-0.5 sm:px-2 sm:py-0.5 text-[9px] sm:text-[10px] text-white/80"
              >
                <Clock className="h-3 w-3 shrink-0" /> {promo.deadline}
              </motion.div>
            </div>
            <h3 className="mt-1.5 sm:mt-2 text-base sm:text-lg font-bold text-white truncate">{promo.title}</h3>
            <p className="text-[11px] sm:text-xs text-white/75 line-clamp-1">{promo.subtitle}</p>

            <div className="mt-2 sm:mt-3 flex flex-wrap items-center gap-1.5 sm:gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-1 rounded-lg sm:rounded-xl bg-white px-2.5 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-bold text-gray-900 shadow-md"
              >
                <Rocket className="h-3 w-3" />
                <span className="hidden sm:inline">{promo.cta}</span>
                <span className="sm:hidden">Go</span>
                <ArrowRight className="h-3 w-3" />
              </motion.button>
              <span className="text-[9px] sm:text-[11px] text-white/60 flex items-center gap-0.5">
                <Zap className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-yellow-400 shrink-0" />
                {promo.spots} left
              </span>
            </div>
          </div>
          <div className="text-2xl sm:text-3xl md:text-4xl shrink-0">{promo.icon}</div>
        </div>

        {/* Dots */}
        <div className="mt-2.5 sm:mt-3 flex gap-1 sm:gap-1.5">
          {PROMOS.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setActive(i)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={cn(
                "rounded-full transition-all",
                i === active ? "h-1.5 sm:h-2 w-3 sm:w-4 bg-white" : "h-1 sm:h-1.5 w-1.5 sm:w-2 bg-white/40"
              )}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
