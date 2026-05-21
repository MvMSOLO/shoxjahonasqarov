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

export const news = [
  {
    id: "nw1",
    type: "urgent",
    title: "Yakuniy imtihon sanasi o'zgardi",
    body: "Frontend Engineering yakuniy imtihoni 28 May dan 2 Iyunga ko'chirildi. Barcha talabalar e'tibor bering.",
    time: "30 daqiqa oldin",
    author: "Admin",
    emoji: "📢",
  },
  {
    id: "nw2",
    type: "info",
    title: "Yangi kurs: React Native 2025",
    body: "Iyul oyidan React Native kursi ochiladi. Ro'yxatdan o'tish boshlandi — o'rinlar cheklangan.",
    time: "2 soat oldin",
    author: "Akbar Nematov",
    emoji: "🚀",
  },
  {
    id: "nw3",
    type: "success",
    title: "Hackathon g'oliblar e'lon qilindi",
    body: "EduPro Hackathon 2025 g'oliblari: 1-o'rin — Sherzod Toshmatov, 2-o'rin — Nilufar Yusupova.",
    time: "5 soat oldin",
    author: "EduPro Team",
    emoji: "🏆",
  },
  {
    id: "nw4",
    type: "info",
    title: "Platforma yangilandi — v5.0",
    body: "Yangi study timer, 3D galereya yaxshilanishi, to'liq moliya sahifasi va boshqa yangiliklar qo'shildi.",
    time: "Kecha",
    author: "Dev Team",
    emoji: "✨",
  },
];

export const leaderboard = [
  { rank: 1, name: "Sherzod Toshmatov", avatar: "https://i.pravatar.cc/40?img=3", xp: 4850, course: "DevOps", badge: "🥇", streak: 21 },
  { rank: 2, name: "Nilufar Yusupova", avatar: "https://i.pravatar.cc/40?img=5", xp: 4320, course: "Frontend", badge: "🥈", streak: 18 },
  { rank: 3, name: "Jasur Mirzayev", avatar: "https://i.pravatar.cc/40?img=8", xp: 3990, course: "Python", badge: "🥉", streak: 15 },
  { rank: 4, name: "Shohjahon Asqarov", avatar: "https://i.pravatar.cc/120?img=12", xp: 3780, course: "Frontend", badge: "⭐", streak: 12, isMe: true },
  { rank: 5, name: "Dilnoza Karimova", avatar: "https://i.pravatar.cc/40?img=9", xp: 3540, course: "UI/UX", badge: "⭐", streak: 10 },
  { rank: 6, name: "Bobur Ergashev", avatar: "https://i.pravatar.cc/40?img=11", xp: 3200, course: "Node.js", badge: "⭐", streak: 8 },
  { rank: 7, name: "Kamola Saidova", avatar: "https://i.pravatar.cc/40?img=15", xp: 2980, course: "Python", badge: "⭐", streak: 7 },
];

export const transactions = [
  { id: "t1", type: "debit", desc: "Oylik to'lov — May 2025", amount: -350000, date: "1 May 2025", status: "ok" },
  { id: "t2", type: "credit", desc: "Stipendiya — Aprel", amount: 100000, date: "28 Apr 2025", status: "ok" },
  { id: "t3", type: "debit", desc: "Oylik to'lov — Aprel 2025", amount: -350000, date: "1 Apr 2025", status: "ok" },
  { id: "t4", type: "credit", desc: "Hackathon mukofoti", amount: 200000, date: "15 Mar 2025", status: "ok" },
  { id: "t5", type: "debit", desc: "Qo'shimcha material — Node.js", amount: -50000, date: "10 Mar 2025", status: "ok" },
  { id: "t6", type: "debit", desc: "Oylik to'lov — Mart 2025", amount: -350000, date: "1 Mar 2025", status: "ok" },
  { id: "t7", type: "credit", desc: "Referral bonus", amount: 30000, date: "22 Feb 2025", status: "ok" },
  { id: "t8", type: "debit", desc: "Sertifikat chop etish", amount: -25000, date: "18 Feb 2025", status: "ok" },
];

export const paymentSchedule = [
  { month: "Iyun 2025", amount: 350000, due: "1 Iyun", status: "upcoming" },
  { month: "Iyul 2025", amount: 350000, due: "1 Iyul", status: "upcoming" },
  { month: "Avgust 2025", amount: 350000, due: "1 Avg", status: "upcoming" },
];
