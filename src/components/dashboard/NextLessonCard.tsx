import { Video, Calendar, Clock, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { nextLesson } from "@/lib/mock-data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export function NextLessonCard() {
  return (
    <div className="glass rounded-2xl p-5 shadow-card">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">Keyingi dars</h3>
        <button className="text-xs text-primary hover:underline">To'liq jadval</button>
      </div>
      <div className="mt-4 space-y-3 text-sm">
        <Row icon={Calendar} label={nextLesson.date} sub={nextLesson.time}>
          <span className="rounded-md border border-success/40 bg-success/15 px-2 py-0.5 text-[11px] font-medium text-success">
            ● Online
          </span>
        </Row>
        <Row icon={Clock} label="Mavzu" sub={nextLesson.topic} />
        <Row icon={User2} label="O'qituvchi" sub={nextLesson.teacher} />
        <Row icon={Video} label="Platforma" sub={nextLesson.platform} />
      </div>
      <div className="mt-5 flex gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex-1 bg-gradient-primary shadow-glow hover:opacity-90">
              Darsga qo'shilish
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{nextLesson.topic}</DialogTitle>
              <DialogDescription>
                {nextLesson.platform} orqali dars boshlandi. Quyidagi tugma orqali ulaning.
              </DialogDescription>
            </DialogHeader>
            <Button
              onClick={() => toast.success("Darsga qo'shildingiz!")}
              className="w-full bg-gradient-primary"
            >
              <Video className="mr-2 h-4 w-4" /> Hozir ulanish
            </Button>
          </DialogContent>
        </Dialog>
        <Button variant="secondary" size="icon" aria-label="Video preview">
          <Video className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function Row({
  icon: Icon,
  label,
  sub,
  children,
}: {
  icon: typeof Calendar;
  label: string;
  sub: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-8 w-8 place-items-center rounded-lg bg-muted">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="truncate font-medium">{sub}</div>
      </div>
      {children}
    </div>
  );
}