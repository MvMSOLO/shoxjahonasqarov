import { useState } from "react";
import { CreditCard, History } from "lucide-react";
import { balance } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const schema = z.object({
  amount: z.string().regex(/^\d{4,8}$/, "1000-99999999 oralig'ida"),
  card: z.string().regex(/^\d{16}$/, "16 raqamli karta"),
});
type Form = z.infer<typeof schema>;

export function BalanceCard() {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Form>({ resolver: zodResolver(schema) });

  const onSubmit = (data: Form) => {
    toast.success(`To'lov qabul qilindi: ${Number(data.amount).toLocaleString()} so'm`);
    reset();
    setOpen(false);
  };

  return (
    <div className="glass relative overflow-hidden rounded-2xl p-5 shadow-card">
      <div className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-gradient-primary opacity-20 blur-3xl" />
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">Tezkor balans</h3>
        <button className="text-xs text-primary hover:underline">Batafsil</button>
      </div>
      <div className="mt-4">
        <div className="text-xs text-muted-foreground">{balance.label}</div>
        <div className="mt-1 flex items-end gap-3">
          <div className="text-3xl font-extrabold tracking-tight">{balance.current}</div>
          <CreditCard className="ml-auto h-10 w-10 text-primary-glow" />
        </div>
        <div className="mt-3 text-xs text-muted-foreground">
          Keyingi to'lov sanasi
          <div className="text-sm font-medium text-foreground">{balance.nextDue}</div>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary shadow-glow hover:opacity-90">To'lov qilish</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>To'lov qilish</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <div>
                <Label>Summa (so'm)</Label>
                <Input inputMode="numeric" placeholder="320000" {...register("amount")} />
                {errors.amount && <p className="mt-1 text-xs text-destructive">{errors.amount.message}</p>}
              </div>
              <div>
                <Label>Karta raqami</Label>
                <Input inputMode="numeric" placeholder="8600123412341234" {...register("card")} />
                {errors.card && <p className="mt-1 text-xs text-destructive">{errors.card.message}</p>}
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-gradient-primary">Tasdiqlash</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        <Button variant="secondary"><History className="mr-2 h-4 w-4" /> Tarix</Button>
      </div>
    </div>
  );
}