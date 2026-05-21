import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  image: string;
  title: string;
  subtitle?: string;
  badge?: string;
  badgeClass?: string;
  children?: ReactNode;
  className?: string;
  height?: string;
  align?: "left" | "center";
}

export function PageHero({
  image,
  title,
  subtitle,
  badge,
  badgeClass,
  children,
  className,
  height = "min-h-[140px]",
  align = "left",
}: PageHeroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={cn("relative overflow-hidden rounded-3xl shadow-card", height, className)}
    >
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background/96 via-background/75 to-background/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
      {/* Animated shimmer */}
      <motion.div
        animate={{ x: ["0%", "200%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
        className="absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12"
      />

      <div className={cn("relative flex h-full flex-col justify-center gap-2 p-5 md:p-6", align === "center" && "items-center text-center")}>
        {badge && (
          <div className={cn("inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold", badgeClass || "bg-primary/20 border border-primary/30 text-primary")}>
            {badge}
          </div>
        )}
        <h1 className="text-2xl font-bold md:text-3xl">{title}</h1>
        {subtitle && <p className="max-w-md text-sm text-muted-foreground">{subtitle}</p>}
        {children}
      </div>
    </motion.div>
  );
}
