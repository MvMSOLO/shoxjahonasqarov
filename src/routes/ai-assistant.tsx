import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, Cpu, Brain, RotateCcw, Copy, Check } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { cn } from "@/lib/utils";
import { streamAnthropicMessage, streamGeminiMessage, streamOpenAIMessage, type ChatMessage, type AIProvider } from "@/lib/ai-client";
import { toast } from "sonner";

export const Route = createFileRoute("/ai-assistant")({
  head: () => ({
    meta: [
      { title: "AI Yordamchi — EduPro v6" },
      { name: "description", content: "Claude, Gemini va GPT-4 bilan o'qishingizni kuchaytiring." },
    ],
  }),
  component: AIAssistantPage,
});

const PROVIDERS: { id: AIProvider; label: string; icon: React.ElementType; gradient: string; model: string; desc: string }[] = [
  { id: "anthropic", label: "Claude", icon: Brain, gradient: "from-violet-500 to-purple-600", model: "claude-opus-4", desc: "Chuqur tahlil va kod" },
  { id: "gemini", label: "Gemini", icon: Sparkles, gradient: "from-blue-500 to-cyan-500", model: "gemini-2.0-flash", desc: "Tez va ijodiy javoblar" },
  { id: "openai", label: "GPT-4", icon: Cpu, gradient: "from-emerald-500 to-teal-500", model: "gpt-4o", desc: "Keng bilim bazasi" },
];

const QUICK_PROMPTS = [
  "React useEffect qanday ishlaydi?",
  "TypeScript generics tushuntir",
  "Python async/await misol ber",
  "CSS Grid vs Flexbox farqi",
  "REST API dizayn qoidalari",
  "Git rebase vs merge",
];

function AIAssistantPage() {
  const [provider, setProvider] = useState<AIProvider>("anthropic");
  const [histories, setHistories] = useState<Record<AIProvider, ChatMessage[]>>({
    anthropic: [],
    gemini: [],
    openai: [],
  });
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const messages = histories[provider];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [histories, provider]);

  const sendMessage = useCallback(
    async (text?: string) => {
      const content = (text ?? input).trim();
      if (!content || isLoading) return;
      setInput("");
      setIsLoading(true);

      const userMsg: ChatMessage = { role: "user", content };
      setHistories((h) => ({ ...h, [provider]: [...h[provider], userMsg] }));

      const assistantMsg: ChatMessage = { role: "assistant", content: "" };
      setHistories((h) => ({ ...h, [provider]: [...h[provider], assistantMsg] }));

      const streamFn =
        provider === "anthropic"
          ? streamAnthropicMessage
          : provider === "gemini"
          ? streamGeminiMessage
          : streamOpenAIMessage;

      const allMessages = [...histories[provider], userMsg];

      await streamFn(
        allMessages,
        (chunk) => {
          setHistories((h) => {
            const msgs = [...h[provider]];
            const last = msgs[msgs.length - 1];
            if (last?.role === "assistant") {
              msgs[msgs.length - 1] = { ...last, content: last.content + chunk };
            }
            return { ...h, [provider]: msgs };
          });
        },
        () => setIsLoading(false)
      );
    },
    [input, isLoading, provider, histories]
  );

  const copyMessage = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    toast.success("Nusxalandi!");
  };

  const clearChat = () => {
    setHistories((h) => ({ ...h, [provider]: [] }));
    toast("Chat tozalandi");
  };

  const current = PROVIDERS.find((p) => p.id === provider)!;

  return (
    <AppShell>
      <div className="flex h-[calc(100vh-120px)] min-h-[500px] flex-col gap-3 md:h-[calc(100vh-100px)]">
        {/* Header */}
        <PageHero
          image="/images/ai-hero.png"
          title="AI Yordamchi"
          subtitle="Claude, Gemini va GPT-4 bilan bilimingizni chuqurlashtiring"
          badge="✨ v6 · AI Platform"
          badgeClass="bg-violet-500/20 border border-violet-500/30 text-violet-300"
          height="min-h-[120px]"
        >
          <div className="flex items-center gap-2">
            <button
              onClick={clearChat}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border/60 bg-black/30 backdrop-blur px-3 py-1.5 text-xs text-white/70 transition-colors hover:bg-black/50 hover:text-white"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Tozalash
            </button>
          </div>
        </PageHero>

        {/* Provider tabs */}
        <div className="glass rounded-2xl p-3 shadow-card md:p-4">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {PROVIDERS.map((p) => {
              const Icon = p.icon;
              const active = provider === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setProvider(p.id)}
                  className={cn(
                    "relative flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition-all",
                    active
                      ? `bg-gradient-to-r ${p.gradient} text-white shadow-glow`
                      : "border border-border bg-card/60 text-muted-foreground hover:bg-accent"
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{p.label}</span>
                  <span className={cn("hidden text-[9px] font-normal opacity-70 sm:block", active && "opacity-100")}>
                    {p.model}
                  </span>
                  {histories[p.id].length > 0 && !active && (
                    <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-primary" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Chat area */}
        <div className="glass flex-1 overflow-hidden rounded-2xl shadow-card">
          <div className="flex h-full flex-col">
            <div className="flex-1 overflow-y-auto p-3 scrollbar-thin md:p-4">
              {messages.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4">
                  <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${current.gradient} grid place-items-center shadow-glow`}>
                    <current.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold">{current.label} bilan suhbat</div>
                    <div className="text-xs text-muted-foreground">{current.desc}</div>
                  </div>
                  <div className="grid w-full max-w-md grid-cols-2 gap-2">
                    {QUICK_PROMPTS.map((p) => (
                      <button
                        key={p}
                        onClick={() => sendMessage(p)}
                        className="rounded-xl border border-border bg-card/60 p-2.5 text-left text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:bg-accent hover:text-foreground"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence initial={false}>
                    {messages.map((msg, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn("group flex gap-2.5", msg.role === "user" ? "flex-row-reverse" : "flex-row")}
                      >
                        {msg.role === "assistant" && (
                          <div className={`mt-0.5 h-7 w-7 shrink-0 rounded-xl bg-gradient-to-br ${current.gradient} grid place-items-center`}>
                            <current.icon className="h-3.5 w-3.5 text-white" />
                          </div>
                        )}
                        <div className={cn("max-w-[80%] space-y-1", msg.role === "user" && "items-end")}>
                          <div
                            className={cn(
                              "rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                              msg.role === "user"
                                ? "bg-gradient-primary text-primary-foreground rounded-tr-sm"
                                : "border border-border bg-card rounded-tl-sm"
                            )}
                          >
                            {msg.role === "assistant" && msg.content === "" ? (
                              <span className="flex gap-1">
                                <span className="animate-bounce" style={{ animationDelay: "0ms" }}>●</span>
                                <span className="animate-bounce" style={{ animationDelay: "150ms" }}>●</span>
                                <span className="animate-bounce" style={{ animationDelay: "300ms" }}>●</span>
                              </span>
                            ) : (
                              <MessageContent content={msg.content} />
                            )}
                          </div>
                          {msg.role === "assistant" && msg.content && (
                            <button
                              onClick={() => copyMessage(msg.content, `msg-${idx}`)}
                              className="ml-1 opacity-0 transition-opacity group-hover:opacity-100 text-muted-foreground hover:text-foreground"
                            >
                              {copiedId === `msg-${idx}` ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
                            </button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  <div ref={bottomRef} />
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-border p-3 md:p-4">
              <div className="flex items-end gap-2">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder={`${current.label} ga savol yozing... (Enter = yuborish)`}
                  rows={1}
                  className="flex-1 resize-none rounded-xl border border-border bg-card/60 px-3.5 py-2.5 text-sm placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/30 min-h-[42px] max-h-32 scrollbar-thin"
                  style={{ height: "auto" }}
                  disabled={isLoading}
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || isLoading}
                  className={cn(
                    "grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-all",
                    input.trim() && !isLoading
                      ? `bg-gradient-to-br ${current.gradient} text-white shadow-glow hover:scale-105`
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-1.5 text-[10px] text-muted-foreground">
                Shift+Enter yangi qator • Enter yuborish
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function MessageContent({ content }: { content: string }) {
  const parts = content.split(/(```[\s\S]*?```)/g);
  return (
    <div className="space-y-2">
      {parts.map((part, i) => {
        if (part.startsWith("```")) {
          const lines = part.slice(3, -3).split("\n");
          const lang = lines[0];
          const code = lines.slice(1).join("\n");
          return (
            <pre key={i} className="overflow-x-auto rounded-lg bg-background/80 border border-border/60 p-3 text-xs font-mono leading-relaxed scrollbar-thin">
              {lang && <span className="block text-[10px] text-primary mb-1">{lang}</span>}
              <code>{code}</code>
            </pre>
          );
        }
        return (
          <span key={i} className="whitespace-pre-wrap">
            {part.split(/(\*\*[^*]+\*\*)/g).map((s, j) =>
              s.startsWith("**") && s.endsWith("**") ? (
                <strong key={j}>{s.slice(2, -2)}</strong>
              ) : (
                s
              )
            )}
          </span>
        );
      })}
    </div>
  );
}
