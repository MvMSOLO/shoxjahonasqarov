import { motion } from "framer-motion";
import { Megaphone, ChevronRight, AlertCircle, Info, CheckCircle2 } from "lucide-react";
import { news } from "@/lib/mock-data";
import { useState } from "react";
import { cn } from "@/lib/utils";

const typeConfig = {
  urgent: { color: "text-destructive", bg: "bg-destructive/10 border-destructive/20", icon: AlertCircle, dot: "bg-destructive" },
  info: { color: "text-info", bg: "bg-info/10 border-info/20", icon: Info, dot: "bg-info" },
  success: { color: "text-success", bg: "bg-success/10 border-success/20", icon: CheckCircle2, dot: "bg-success" },
};

export function NewsCard() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -12 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.4 }}
      className="glass rounded-2xl p-3 shadow-card sm:p-4 md:p-5"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-primary shadow-glow">
            <Megaphone className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="min-w-0">
            <h2 className="truncate text-sm font-bold sm:text-base">E'lonlar va yangiliklar</h2>
            <p className="text-[10px] text-muted-foreground">{news.length} ta yangi xabar</p>
          </div>
        </div>
        <span className="rounded-full bg-destructive/15 px-2 py-0.5 text-[10px] font-bold text-destructive w-fit sm:w-auto">
          {news.filter(n => n.type === "urgent").length} muhim
        </span>
      </div>

      <motion.div
        className="mt-3 space-y-2 sm:space-y-2.5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {news.map((item, i) => {
          const cfg = typeConfig[item.type as keyof typeof typeConfig] ?? typeConfig.info;
          const TypeIcon = cfg.icon;
          const isExpanded = expanded === item.id;

          return (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className={cn(
                "cursor-pointer rounded-xl border p-2.5 sm:p-3 transition-all",
                cfg.bg,
                isExpanded && "shadow-sm"
              )}
              onClick={() => setExpanded(isExpanded ? null : item.id)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-start gap-2">
                <div className="mt-0.5 shrink-0 text-base">
                  {item.emoji}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", cfg.dot)} />
                    <p className="truncate text-xs font-semibold">{item.title}</p>
                  </div>
                  {isExpanded ? (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-1.5 text-xs text-muted-foreground leading-relaxed"
                    >
                      {item.body}
                    </motion.p>
                  ) : (
                    <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{item.body}</p>
                  )}
                  <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[10px] text-muted-foreground">
                    <span>{item.author}</span>
                    <span>·</span>
                    <span>{item.time}</span>
                  </div>
                </div>
                <ChevronRight
                  className={cn(
                    "mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform",
                    isExpanded && "rotate-90"
                  )}
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
