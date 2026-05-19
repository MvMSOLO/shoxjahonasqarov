import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "dark" | "light";
export type Lighting = "dim" | "normal" | "bright";

export type Todo = {
  id: string;
  title: string;
  due: string;
  priority: "Muhim" | "O'rta" | "Past";
  done: boolean;
};

export type Notification = {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
};

type User = { name: string; email: string };

type AppState = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  user: User | null;
  login: (u: User) => void;
  logout: () => void;
  todos: Todo[];
  addTodo: (t: Omit<Todo, "id" | "done">) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  notifications: Notification[];
  markAllRead: () => void;
  audioEnabled: boolean;
  toggleAudio: () => void;
  volume: number;
  setVolume: (v: number) => void;
  lighting: Lighting;
  cycleLighting: () => void;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
};

const initialTodos: Todo[] = [
  { id: "1", title: "React Hooks uy vazifasi", due: "16 May", priority: "Muhim", done: false },
  { id: "2", title: "API Integration testi", due: "18 May", priority: "O'rta", done: false },
  { id: "3", title: "Team Project topshirish", due: "20 May", priority: "Muhim", done: false },
  { id: "4", title: "JavaScript algoritmlar", due: "22 May", priority: "Past", done: false },
];

const initialNotifs: Notification[] = [
  { id: "n1", title: "Yangi material", body: "Akbar Nematov: useEffect chuqur tahlil", time: "15 daqiqa oldin", read: false },
  { id: "n2", title: "Feedback berildi", body: "DevOps uy vazifangizga", time: "1 soat oldin", read: false },
  { id: "n3", title: "Test natijasi", body: "Linux Test 1: 92/100", time: "3 soat oldin", read: false },
];

const lightingOrder: Lighting[] = ["dim", "normal", "bright"];

export const useApp = create<AppState>()(
  persist(
    (set) => ({
      theme: "dark",
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((s) => ({ theme: s.theme === "dark" ? "light" : "dark" })),
      user: { name: "Shohjahon Asqarov", email: "shoh@edupro.uz" },
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
      todos: initialTodos,
      addTodo: (t) =>
        set((s) => ({ todos: [...s.todos, { ...t, id: crypto.randomUUID(), done: false }] })),
      toggleTodo: (id) =>
        set((s) => ({ todos: s.todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)) })),
      removeTodo: (id) => set((s) => ({ todos: s.todos.filter((t) => t.id !== id) })),
      notifications: initialNotifs,
      markAllRead: () =>
        set((s) => ({ notifications: s.notifications.map((n) => ({ ...n, read: true })) })),
      audioEnabled: false,
      toggleAudio: () => set((s) => ({ audioEnabled: !s.audioEnabled })),
      volume: 0.4,
      setVolume: (v) => set({ volume: v }),
      lighting: "normal",
      cycleLighting: () =>
        set((s) => ({
          lighting: lightingOrder[(lightingOrder.indexOf(s.lighting) + 1) % lightingOrder.length],
        })),
      sidebarCollapsed: false,
      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
    }),
    { name: "edupro-app" }
  )
);
