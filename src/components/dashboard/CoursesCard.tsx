import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { courses } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CoursesCard() {
  return (
    <div className="glass rounded-2xl p-5 shadow-card">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">Mening kurslarim</h3>
        <Link to="/learning" className="text-xs text-primary hover:underline">Barchasi</Link>
      </div>
      <ul className="mt-4 space-y-3">
        {courses.map((c, i) => (
          <motion.li
            key={c.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-3 rounded-xl border border-border bg-card/50 p-3"
          >
            <div className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${c.color} text-xl shadow`}>
              {c.icon}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="truncate font-semibold">{c.name}</span>
                <span className="text-xs font-medium text-muted-foreground">{c.percent}%</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                <div className={`h-full rounded-full bg-gradient-to-r ${c.color}`} style={{ width: `${c.percent}%` }} />
              </div>
            </div>
            <Button size="sm" variant="secondary" className="shrink-0">Davom etish</Button>
          </motion.li>
        ))}
      </ul>
      <Link to="/learning" className="mt-4 inline-flex w-full items-center justify-center gap-1 text-sm text-primary hover:underline">
        Barcha kurslar <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}