import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import { useApp, type Todo } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const pri: Record<Todo["priority"], string> = {
  Muhim: "bg-destructive/15 text-destructive border-destructive/30",
  "O'rta": "bg-warning/15 text-warning border-warning/30",
  Past: "bg-info/15 text-info border-info/30",
};

export function TodoCard() {
  const { todos, toggleTodo, removeTodo, addTodo } = useApp();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [due, setDue] = useState("");
  const [priority, setPriority] = useState<Todo["priority"]>("O'rta");

  const submit = () => {
    if (!title.trim() || !due.trim()) return;
    addTodo({ title: title.trim(), due: due.trim(), priority });
    setTitle("");
    setDue("");
    setPriority("O'rta");
    setOpen(false);
  };

  return (
    <div className="glass rounded-2xl p-5 shadow-card">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">To-Do List</h3>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
              <Plus className="h-3.5 w-3.5" /> Qo'shish
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Yangi vazifa</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <Input placeholder="Vazifa nomi" value={title} onChange={(e) => setTitle(e.target.value)} />
              <Input placeholder="Muddat (masalan: 25 May)" value={due} onChange={(e) => setDue(e.target.value)} />
              <Select value={priority} onValueChange={(v) => setPriority(v as Todo["priority"])}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Muhim">Muhim</SelectItem>
                  <SelectItem value="O'rta">O'rta</SelectItem>
                  <SelectItem value="Past">Past</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button onClick={submit} className="bg-gradient-primary">Saqlash</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <ul className="mt-4 space-y-2.5">
        <AnimatePresence>
          {todos.length === 0 && (
            <li className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
              Vazifalar yo'q. Yangi qo'shing!
            </li>
          )}
          {todos.map((t) => (
            <motion.li
              key={t.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="group flex items-center gap-3 rounded-xl border border-border bg-card/50 p-3"
            >
              <button
                onClick={() => toggleTodo(t.id)}
                aria-label="toggle"
                className={cn(
                  "grid h-5 w-5 shrink-0 place-items-center rounded-md border-2 transition-colors",
                  t.done ? "border-success bg-success" : "border-border"
                )}
              >
                {t.done && (
                  <svg viewBox="0 0 24 24" className="h-3 w-3 text-success-foreground">
                    <path fill="currentColor" d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
                  </svg>
                )}
              </button>
              <div className="min-w-0 flex-1">
                <div className={cn("truncate text-sm font-medium", t.done && "line-through opacity-60")}>{t.title}</div>
                <div className="text-xs text-muted-foreground">Topshirish muddati: {t.due}</div>
              </div>
              <span className={cn("rounded-md border px-2 py-0.5 text-[11px] font-medium", pri[t.priority])}>
                {t.priority}
              </span>
              <button
                onClick={() => removeTodo(t.id)}
                className="text-muted-foreground opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}