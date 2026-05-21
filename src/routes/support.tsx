import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Headphones, MessageCircle, Book, ChevronDown,
  Mail, Phone, Clock, CheckCircle2, Send, AlertCircle
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { PageHero } from "@/components/layout/PageHero";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [{ title: "Qo'llab-quvvatlash — EduPro" }],
    links: [{ rel: "canonical", href: "/support" }],
  }),
  component: SupportPage,
});

const faqs = [
  {
    q: "Dars videolarini yuklab olish mumkinmi?",
    a: "Ha, har bir dars sahifasida 'Yuklab olish' tugmasi mavjud. Faqat Premium obunada video offline ko'rish imkoni bor.",
  },
  {
    q: "To'lovni kechiktirish mumkinmi?",
    a: "Ha, moliya sahifasidan 3 kunga kechiktirish so'rov yuborish mumkin. Har oy faqat bir marta ruxsat etiladi.",
  },
  {
    q: "Kurs sertifikatini qanday olaman?",
    a: "Kurs 100% yakunlangach va yakuniy imtihon topshirilgach, 'Baholar va Davomat' sahifasidan sertifikat yuklab olish mumkin.",
  },
  {
    q: "Muallim bilan qanday bog'lanaman?",
    a: "Har bir kurs sahifasida 'Muallimga savol' tugmasi bor. Discord serverimizda ham barcha o'qituvchilar faol.",
  },
  {
    q: "Parolni unutsam nima qilaman?",
    a: "Login sahifasida 'Parolni unutdim' tugmasini bosing. Email manzilingizga tiklash havolasi yuboriladi.",
  },
  {
    q: "Bir vaqtda nechta qurilmada kirish mumkin?",
    a: "Standart paketda 2 ta qurilmada bir vaqtda kirish mumkin. Premium paketda cheklov yo'q.",
  },
  {
    q: "Davomat foizim nima uchun tushyapti?",
    a: "Darsdan 15 daqiqadan ortiq kechikish kechikish sifatida qayd etiladi. 3 ta kechikish 1 sabsizlikka teng hisoblanadi.",
  },
  {
    q: "Kursni boshqasiga o'tkazish mumkinmi?",
    a: "Kurs ro'yxatdan o'tgan shaxsga bog'liq va boshqasiga o'tkazish mumkin emas. Yangi obuna sotib olish kerak.",
  },
];

const quickLinks = [
  { icon: Book, label: "Qo'llanma", desc: "Platforma ishlatish yo'riqnomasi", color: "bg-primary/15 text-primary" },
  { icon: MessageCircle, label: "Discord", desc: "Jamoa bilan suhbat", color: "bg-violet-500/15 text-violet-400" },
  { icon: Mail, label: "Email", desc: "support@edupro.uz", color: "bg-success/15 text-success" },
  { icon: Phone, label: "Telefon", desc: "+998 71 200-00-00", color: "bg-warning/15 text-warning" },
];

function SupportPage() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("Barcha kerakli maydonlarni to'ldiring");
      return;
    }
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    toast.success("Murojaat yuborildi! 24 soat ichida javob beramiz.");
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  }

  return (
    <AppShell>
      <PageHero
        image="/images/ai-hero.png"
        title="Qo'llab-quvvatlash"
        subtitle="Biz har doim siz uchun yordam berishga tayyormiz"
        badge="🎧 Support"
        badgeClass="bg-emerald-500/20 border border-emerald-500/30 text-emerald-300"
      />
      <div className="glass rounded-3xl p-4 shadow-card md:p-6">
        <div className="flex items-start gap-3">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-primary shadow-glow">
            <Headphones className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">Qo'llab-quvvatlash</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Biz har doim siz uchun yordam berishga tayyormiz.
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 rounded-xl bg-success/10 border border-success/20 px-3 py-1.5">
            <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs font-medium text-success">Xizmat ishlamoqda</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            Javob vaqti: <span className="font-semibold text-foreground">~2-4 soat</span>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-2 grid-cols-2 sm:grid-cols-4">
        {quickLinks.map((link, i) => {
          const Icon = link.icon;
          return (
            <motion.button
              key={link.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              onClick={() => toast(`${link.label}: ${link.desc}`)}
              className="glass flex flex-col items-start gap-2 rounded-2xl p-3.5 text-left shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lg md:p-4"
            >
              <div className={cn("grid h-9 w-9 place-items-center rounded-xl", link.color)}>
                <Icon className="h-4.5 w-4.5 h-[18px] w-[18px]" />
              </div>
              <div>
                <div className="text-sm font-bold">{link.label}</div>
                <div className="text-[11px] text-muted-foreground leading-snug">{link.desc}</div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_380px]">
        <div className="glass rounded-2xl p-4 shadow-card md:p-5">
          <h2 className="text-base font-bold">Ko'p so'raladigan savollar</h2>
          <p className="text-xs text-muted-foreground">Javob topmasangiz murojaat yuboring</p>
          <div className="mt-4 space-y-2">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={cn(
                  "rounded-xl border transition-all",
                  expanded === i
                    ? "border-primary/30 bg-primary/5"
                    : "border-border hover:border-border/80 hover:bg-accent/30"
                )}
              >
                <button
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className="flex w-full items-center justify-between gap-3 p-3.5 text-left"
                >
                  <span className="text-sm font-medium">{faq.q}</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
                      expanded === i && "rotate-180"
                    )}
                  />
                </button>
                <AnimatePresence>
                  {expanded === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-border/50 px-3.5 pb-3.5 pt-2.5">
                        <div className="flex gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                          <p className="text-xs leading-relaxed text-muted-foreground">{faq.a}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-4 shadow-card md:p-5">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-primary shadow-glow">
              <Send className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-sm font-bold">Murojaat yuborish</h2>
              <p className="text-[10px] text-muted-foreground">24/7 qo'llab-quvvatlash</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-muted-foreground">Ism *</span>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ismingiz"
                  required
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-muted-foreground">Email *</span>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  required
                />
              </label>
            </div>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-muted-foreground">Mavzu</span>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Muammoning qisqacha tavsifi"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-muted-foreground">Xabar *</span>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Muammoingizni batafsil yozing..."
                rows={5}
                required
                className="resize-none"
              />
            </label>

            <div className="rounded-xl bg-warning/10 border border-warning/20 p-3">
              <div className="flex gap-2">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
                <p className="text-[11px] text-muted-foreground">
                  Shoshilinch holatlarda Discord yoki telefon orqali murojaat qiling.
                  Odatiy murojaat javob vaqti: <strong className="text-foreground">2-4 soat</strong>.
                </p>
              </div>
            </div>

            <motion.button
              type="submit"
              whileTap={{ scale: 0.98 }}
              disabled={sending}
              className="w-full rounded-xl bg-gradient-primary py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {sending ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Yuborilmoqda…
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Send className="h-4 w-4" /> Murojaat yuborish
                </span>
              )}
            </motion.button>
          </form>
        </div>
      </div>
    </AppShell>
  );
}
