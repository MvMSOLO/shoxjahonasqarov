import Anthropic from "@anthropic-ai/sdk";
import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";

export type AIProvider = "anthropic" | "gemini" | "openai";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const ANTHROPIC_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY || "";
const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const OPENAI_KEY = import.meta.env.VITE_OPENAI_API_KEY || "";

const SYSTEM_PROMPT = `Sen EduPro platformasining AI o'quv yordamchisisisan. 
Sening ismingni so'rashsa: "Men EduPro AI" deb javob ber.
Uzbek va ingliz tillarini bilasan. Foydalanuvchi qaysi tilda yozsa, shu tilda javob ber.
Frontend Engineering, DevOps, Python, UI/UX, ingliz tili bo'yicha yordam ber.
Javoblarni qisqa, aniq va foydali qil. Kod misollari keltir. Doim ijobiy va motivatsiyali bo'l.`;

const MOCK_RESPONSES_UZ: Record<string, string> = {
  salom: "Salom! Men EduPro AI yordamchisiman. Bugun qanday mavzu bo'yicha yordam kerak? 🎓",
  react: `React haqida ko'p narsani bilamiz! Asosiy tushunchalar:\n\n**Hooks:**\n- \`useState\` — holat boshqaruvi\n- \`useEffect\` — yon ta'sirlar\n- \`useCallback\` — funksiyalarni memoizatsiya\n\n**Misol:**\n\`\`\`jsx\nconst [count, setCount] = useState(0);\nuseEffect(() => {\n  document.title = \`Hisob: \${count}\`;\n}, [count]);\n\`\`\`\n\nQaysi Hook haqida ko'proq bilmoqchisiz? 🚀`,
  javascript: `JavaScript — zamonaviy web'ning asosi!\n\n**Muhim tushunchalar:**\n- Async/Await va Promise\n- Destructuring\n- Arrow functions\n- Array metodlari (map, filter, reduce)\n\n**Misol:**\n\`\`\`js\nconst users = await fetch('/api/users')\n  .then(r => r.json());\nconst active = users.filter(u => u.active);\n\`\`\`\n\nQaysi mavzu qiziqtiradi? 💡`,
  python: `Python — juda kuchli til!\n\n**FastAPI misol:**\n\`\`\`python\nfrom fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get("/users/{id}")\nasync def get_user(id: int):\n    return {"id": id, "name": "Shohjahon"}\n\`\`\`\n\nPython haqida nima so'raysiz? 🐍`,
  default: `Zo'r savol! EduPro AI sifatida aytaman:\n\n**${["Frontend", "Backend", "DevOps", "UI/UX"][Math.floor(Math.random() * 4)]}** bo'yicha kurslarimiz mavjud.\n\nKo'proq ma'lumot uchun konkret savol bering — batafsil tushuntiraman! 🎯\n\nMasalan:\n- "React useEffect qanday ishlaydi?"\n- "Python asyncio nima?"\n- "TypeScript generics tushuntir"\n\nHar qanday savolingizga javob berishga tayyorman! 💪`,
};

function getMockResponse(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("salom") || lower.includes("hello") || lower.includes("hi"))
    return MOCK_RESPONSES_UZ.salom;
  if (lower.includes("react") || lower.includes("hook"))
    return MOCK_RESPONSES_UZ.react;
  if (lower.includes("javascript") || lower.includes("js"))
    return MOCK_RESPONSES_UZ.javascript;
  if (lower.includes("python") || lower.includes("fastapi"))
    return MOCK_RESPONSES_UZ.python;
  return MOCK_RESPONSES_UZ.default;
}

export async function streamAnthropicMessage(
  messages: ChatMessage[],
  onChunk: (text: string) => void,
  onDone: () => void
) {
  if (!ANTHROPIC_KEY) {
    const mock = getMockResponse(messages[messages.length - 1]?.content || "");
    let i = 0;
    const interval = setInterval(() => {
      if (i < mock.length) {
        onChunk(mock.slice(i, i + 3));
        i += 3;
      } else {
        clearInterval(interval);
        onDone();
      }
    }, 18);
    return;
  }
  const client = new Anthropic({ apiKey: ANTHROPIC_KEY, dangerouslyAllowBrowser: true });
  const stream = client.messages.stream({
    model: "claude-opus-4-7",
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages,
  });
  for await (const event of stream) {
    if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
      onChunk(event.delta.text);
    }
  }
  onDone();
}

export async function streamGeminiMessage(
  messages: ChatMessage[],
  onChunk: (text: string) => void,
  onDone: () => void
) {
  if (!GEMINI_KEY) {
    const mock =
      `✨ **Gemini AI tahlili:**\n\n` +
      getMockResponse(messages[messages.length - 1]?.content || "")
        .replace("EduPro AI", "Gemini AI")
        .replace("🎓", "🌟");
    let i = 0;
    const interval = setInterval(() => {
      if (i < mock.length) {
        onChunk(mock.slice(i, i + 4));
        i += 4;
      } else {
        clearInterval(interval);
        onDone();
      }
    }, 15);
    return;
  }
  const genAI = new GoogleGenerativeAI(GEMINI_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const history = messages.slice(0, -1).map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));
  const chat = model.startChat({ history });
  const result = await chat.sendMessageStream(
    messages[messages.length - 1]?.content || ""
  );
  for await (const chunk of result.stream) {
    onChunk(chunk.text());
  }
  onDone();
}

export async function streamOpenAIMessage(
  messages: ChatMessage[],
  onChunk: (text: string) => void,
  onDone: () => void
) {
  if (!OPENAI_KEY) {
    const mock =
      `🤖 **GPT-4 Tahlil:**\n\n` +
      getMockResponse(messages[messages.length - 1]?.content || "")
        .replace("EduPro AI", "GPT-4")
        .replace("🎓", "💎");
    let i = 0;
    const interval = setInterval(() => {
      if (i < mock.length) {
        onChunk(mock.slice(i, i + 3));
        i += 3;
      } else {
        clearInterval(interval);
        onDone();
      }
    }, 20);
    return;
  }
  const client = new OpenAI({ apiKey: OPENAI_KEY, dangerouslyAllowBrowser: true });
  const stream = await client.chat.completions.create({
    model: "gpt-4o",
    stream: true,
    messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
  });
  for await (const chunk of stream) {
    const delta = chunk.choices[0]?.delta?.content || "";
    if (delta) onChunk(delta);
  }
  onDone();
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  topic: string;
}

const MOCK_QUIZZES: Record<string, QuizQuestion[]> = {
  react: [
    {
      id: "r1", topic: "React",
      question: "React'da `useEffect` hooks qachon ishga tushadi?",
      options: ["Har render'da", "Faqat birinchi render'da", "Dependency array o'zgarganda", "Hech qachon"],
      correct: 2,
      explanation: "`useEffect` dependency array'dagi qiymatlar o'zgarganda ishga tushadi. Bo'sh array `[]` bo'lsa, faqat bir marta mount bo'lganda chaqiriladi.",
    },
    {
      id: "r2", topic: "React",
      question: "React'da `key` prop nima uchun kerak?",
      options: ["Styling uchun", "List itemlarni unique identifikatsiya qilish uchun", "Event handling uchun", "State management uchun"],
      correct: 1,
      explanation: "`key` prop React'ga list elementlarini track qilishda yordam beradi va efficient re-rendering ta'minlaydi.",
    },
    {
      id: "r3", topic: "React",
      question: "useState hook nima qaytaradi?",
      options: ["Faqat qiymat", "Faqat setter funksiya", "State qiymati va setter funksiyasi", "Object"],
      correct: 2,
      explanation: "`useState` [state, setState] tuple qaytaradi — birinchi element joriy qiymat, ikkinchisi uni yangilash funksiyasi.",
    },
  ],
  javascript: [
    {
      id: "js1", topic: "JavaScript",
      question: "`Promise.all()` va `Promise.race()` farqi nima?",
      options: [
        "Farqi yo'q",
        "all — hammasi bitganda, race — birinchisi bitganda",
        "all — birinchisi, race — hammasi",
        "all — xatolikda, race — muvaffaqiyatda",
      ],
      correct: 1,
      explanation: "`Promise.all()` barcha Promise'lar tugaguncha kutadi, `Promise.race()` esa birinchi yakunlangan Promise natijasini qaytaradi.",
    },
    {
      id: "js2", topic: "JavaScript",
      question: "JavaScript'da `==` va `===` farqi?",
      options: [
        "Farqi yo'q",
        "`==` type coercion bilan, `===` strict comparison",
        "`===` type coercion bilan, `==` strict",
        "Faqat number uchun farq qiladi",
      ],
      correct: 1,
      explanation: "`===` strict equality — tip va qiymat ham mos kelishi kerak. `==` esa tipni avtomatik o'zgartiradi (type coercion).",
    },
    {
      id: "js3", topic: "JavaScript",
      question: "`async/await` nima?",
      options: [
        "Yangi tip",
        "Promise'lar bilan ishlashni osonlashtiruvchi sintaktik shakar",
        "Multi-threading tool",
        "Error handling pattern",
      ],
      correct: 1,
      explanation: "`async/await` Promise'larni sinxron kod kabi yozish imkonini beradi. `await` Promise resolve bo'lguncha kutadi.",
    },
  ],
  typescript: [
    {
      id: "ts1", topic: "TypeScript",
      question: "TypeScript'da `interface` va `type` farqi?",
      options: [
        "Farqi yo'q",
        "interface — object uchun, type — primitiv uchun",
        "interface kengaytirish mumkin, type union/intersection kuchli",
        "type yangi, interface eski",
      ],
      correct: 2,
      explanation: "`interface` extends bilan kengaytirish mumkin va deklaratsiyalarni birlashtiradi. `type` union, intersection va tuple kabi murakkab tiplar uchun kuchliroq.",
    },
    {
      id: "ts2", topic: "TypeScript",
      question: "TypeScript'da Generic nima?",
      options: ["Default tip", "Tip parametrlari bilan reusable kod", "Any tipi", "Void tipi"],
      correct: 1,
      explanation: "Generic'lar `<T>` sintaksisi bilan funksiya yoki klasslarni turli tiplar bilan ishlashga moslashtirishga imkon beradi.",
    },
  ],
};

export async function generateQuiz(topic: string): Promise<QuizQuestion[]> {
  const key = topic.toLowerCase();
  if (MOCK_QUIZZES[key]) return MOCK_QUIZZES[key];
  return MOCK_QUIZZES.javascript;
}
