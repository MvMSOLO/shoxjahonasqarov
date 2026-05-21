import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { courses } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CoursesCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-3 sm:p-4 md:p-5 shadow-card"
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-base sm:text-lg font-bold truncate">Mening kurslarim</h3>
        <Link to="/learning" className="text-[10px] sm:text-xs text-primary hover:underline whitespace-nowrap">Barchasi</Link>
      </div>
      <ul className="mt-2 sm:mt-3 md:mt-4 space-y-2 sm:space-y-3">
        {courses.map((c, i) => (
          <motion.li
            key={c.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.01 }}
            className="flex items-center gap-2 sm:gap-3 rounded-xl border border-border bg-card/50 p-2 sm:p-3 transition-all cursor-pointer"
          >
            <div className={`grid h-9 w-9 sm:h-11 sm:w-11 place-items-center rounded-xl bg-gradient-to-br ${c.color} text-lg sm:text-xl shadow shrink-0`}>
              {c.icon}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-1 sm:gap-2">
                <span className="truncate text-xs sm:text-sm font-semibold">{c.name}</span>
                <span className="text-[9px] sm:text-xs font-medium text-muted-foreground shrink-0">{c.percent}%</span>
              </div>
              <div className="mt-1 h-1 sm:h-1.5 overflow-hidden rounded-full bg-muted">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${c.percent}%` }}
                  transition={{ duration: 0.8, delay: i * 0.05 + 0.1 }}
                  className={`h-full rounded-full bg-gradient-to-r ${c.color}`}
                />
              </div>
            </div>
            <Button size="sm" variant="secondary" className="shrink-0 h-7 sm:h-8 text-[10px] sm:text-xs px-1.5 sm:px-2">
              <span className="hidden sm:inline">Davom</span><span className="sm:hidden">Go</span>
            </Button>
          </motion.li>
        ))}
      </ul>
      <Link to="/learning" className="mt-2 sm:mt-3 md:mt-4 inline-flex w-full items-center justify-center gap-1 text-xs sm:text-sm text-primary hover:underline">
        Barcha kurslar <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
      </Link>
    </motion.div>
  );
}
