export const profile = {
  name: "Shohjahon Asqarov",
  role: "Frontend Engineering",
  level: 12,
  xp: 1250,
  xpMax: 2000,
  streak: 12,
  avatar: "https://i.pravatar.cc/120?img=12",
};

export const courseProgress = {
  course: "Frontend Engineering",
  percent: 68,
  done: 34,
  total: 50,
  currentModule: "React Advanced",
  nextLesson: "React Hooks chuqurroq",
};

export const stats = [
  {
    key: "attend",
    label: "Davomat",
    value: "96%",
    hint: "12 kun ketma-ket",
    icon: "calendar",
    color: "success",
    series: [60, 70, 65, 78, 80, 82, 88, 90, 92, 95, 94, 96],
  },
  {
    key: "gpa",
    label: "O'rtacha baho",
    value: "4.7",
    hint: "Yaxshi natija!",
    icon: "star",
    color: "info",
    series: [3.8, 4.0, 4.1, 4.2, 4.0, 4.3, 4.4, 4.5, 4.6, 4.6, 4.7, 4.7],
  },
  {
    key: "pending",
    label: "Pending vazifalar",
    value: "5",
    hint: "Topshirish kerak",
    icon: "clipboard",
    color: "warning",
    series: [9, 8, 7, 8, 6, 7, 6, 5, 6, 5, 5, 5],
  },
  {
    key: "balance",
    label: "Balans",
    value: "320,000 so'm",
    hint: "Keyingi to'lov: 25 May",
    icon: "wallet",
    color: "rose",
    series: [200, 220, 250, 240, 260, 280, 290, 300, 310, 305, 315, 320],
  },
];

export const schedule = {
  Bugun: [
    { time: "09:00 - 10:30", title: "HTML & CSS", teacher: "Komiljon Karimov", room: "A101", status: "O'tdi" },
    { time: "11:00 - 13:00", title: "React Hooks chuqurroq", teacher: "Javohir Abdullayev", room: "Google Meet", status: "Hozir" },
    { time: "15:00 - 16:30", title: "API Integration", teacher: "Abdulloh Saidov", room: "A103", status: "Kutilmoqda" },
    { time: "17:00 - 18:30", title: "Team Sprint Review", teacher: "Javohir Abdullayev", room: "Discord", status: "Kutilmoqda" },
  ],
  Ertaga: [
    { time: "10:00 - 12:00", title: "TypeScript Generics", teacher: "Komiljon Karimov", room: "A102", status: "Kutilmoqda" },
    { time: "14:00 - 16:00", title: "Next.js Routing", teacher: "Javohir Abdullayev", room: "Google Meet", status: "Kutilmoqda" },
  ],
  Hafta: [
    { time: "Du 09:00", title: "React Hooks", teacher: "Javohir Abdullayev", room: "Online", status: "Kutilmoqda" },
    { time: "Se 11:00", title: "Team Sprint", teacher: "Akbar Nematov", room: "Discord", status: "Kutilmoqda" },
    { time: "Ju 15:00", title: "API Integration", teacher: "Abdulloh Saidov", room: "A103", status: "Kutilmoqda" },
  ],
  Oy: [
    { time: "Hafta 1", title: "React Hooks moduli", teacher: "—", room: "—", status: "O'tdi" },
    { time: "Hafta 2", title: "API Integration moduli", teacher: "—", room: "—", status: "Hozir" },
    { time: "Hafta 3", title: "Team Project", teacher: "—", room: "—", status: "Kutilmoqda" },
    { time: "Hafta 4", title: "Yakuniy imtihon", teacher: "—", room: "—", status: "Kutilmoqda" },
  ],
} as const;

export const courses = [
  { id: "fe", name: "Frontend Engineering", icon: "⚛️", percent: 68, color: "from-cyan-500 to-blue-500" },
  { id: "do", name: "DevOps Basic", icon: "♾️", percent: 42, color: "from-violet-500 to-fuchsia-500" },
  { id: "py", name: "Python Backend", icon: "🐍", percent: 45, color: "from-emerald-500 to-teal-500" },
  { id: "en", name: "English for Developers", icon: "🇬🇧", percent: 75, color: "from-amber-500 to-orange-500" },
];

export const skills = [
  { skill: "Frontend", value: 80 },
  { skill: "Backend", value: 60 },
  { skill: "Database", value: 40 },
  { skill: "DevOps", value: 55 },
  { skill: "Soft Skills", value: 70 },
];

export const activity = [
  { title: "React Hooks testi topshirildi", xp: 50, time: "2 soat oldin", color: "success" },
  { title: "Uy vazifasi yuborildi", xp: 30, time: "5 soat oldin", color: "info" },
  { title: "Darsda qatnashdingiz", xp: 20, time: "Bugun 09:15", color: "warning" },
  { title: "Yangi modul ochildi", xp: 100, time: "Kecha 18:30", color: "primary" },
];

export const nextLesson = {
  date: "Bugun, 14 May",
  time: "11:00 - 13:00",
  topic: "React Hooks chuqurroq",
  teacher: "Javohir Abdullayev",
  platform: "Google Meet",
  isOnline: true,
};

export const balance = {
  current: "320,000 so'm",
  nextDue: "25 May 2024",
  label: "Joriy balans",
};

export const xpActivity = [
  { day: "Du", xp: 120 },
  { day: "Se", xp: 180 },
  { day: "Ch", xp: 90 },
  { day: "Pa", xp: 220 },
  { day: "Ju", xp: 150 },
  { day: "Sh", xp: 60 },
  { day: "Ya", xp: 200 },
];