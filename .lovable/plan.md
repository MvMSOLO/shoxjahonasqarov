# EduPro — Student Dashboard Web App

Reference: birinchi rasm (dark premium EduPro panel) asosiy struktura sifatida olinadi. 2/3-rasmlar light variant uchun ilhom.

## Struktura (rasmdagi layout aynan saqlanadi)

```text
┌────────────┬──────────────────────────────────────┬──────────────┐
│  Sidebar   │  Topbar (greeting + search + bell)   │  Right rail  │
│  - Logo    │                                       │              │
│  - Profile │  ┌─ Course progress (68%) + donut ─┐ │  Keyingi dars│
│  - Level   │  │  + Joriy modul / Continue btn   │ │  (card + CTA)│
│  - Nav     │  └──────────────────────────────────┘ │              │
│    • Dash  │                                       │  To-Do List  │
│    • O'quv │  ┌─ 4 stat cards w/ sparkline ─────┐ │  (4 tasks +  │
│    • Baho  │  │ Davomat │ Baho │ Vazifa │ Balans│ │   priority)  │
│    • Moliya│  └──────────────────────────────────┘ │              │
│    • Help  │                                       │  Tezkor      │
│    • Sozl. │  ┌─ Dars jadvali ─┬─ Kurslarim ───┐  │  balans      │
│  - Streak  │  │ timeline       │ course list   │  │  (card + 2   │
│    card    │  └────────────────┴───────────────┘  │   buttons)   │
│            │                                       │              │
│            │  ┌─ Progress radar ┬─ Faoliyat XP ─┐ │              │
│            │  └─────────────────┴───────────────┘ │              │
└────────────┴──────────────────────────────────────┴──────────────┘
```

## Sahifalar (alohida routes, har biri o'z head() meta bilan)

- `/` — Dashboard (yuqoridagi to'liq layout)
- `/learning` — O'quv jarayoni (kurslar grid + progress)
- `/grades` — Davomat va baholar (jadval + grafik)
- `/finance` — Moliya va to'lovlar (balans, tarix, to'lov modal)
- `/support` — Qo'llab-quvvatlash (FAQ + murojaat form)
- `/settings` — Sozlamalar (profil, theme toggle, notifications)
- `/login` + `/signup` — auth sahifalari (mock auth, localStorage session)

## Dizayn tizimi

- **Theme**: premium dark (default) + light toggle. Tokens `src/styles.css` da oklch.
- **Palitra**: deep navy `#0B0B1F` background, card `#15152E`, primary indigo→violet gradient `#6366F1 → #8B5CF6`, accent emerald `#10B981`, amber `#F59E0B`, rose `#F43F5E`.
- **Typography**: Space Grotesk (heading) + Inter (body).
- **Effects**: glassmorphism cards, soft shadows, subtle gradient borders, donut/sparkline/radar charts (recharts).
- **Micro-interactions**: hover lift, active nav indicator (gradient bar), framer-motion stat counters va card entrance.

## Funksionallik (real, demo emas)

- Sidebar navigation `<Link>` orqali, active state.
- Theme toggle (dark/light) `localStorage` da saqlanadi.
- Search input (topbar) — kurslar/vazifalar bo'yicha filter, dropdown natija.
- Notifications dropdown (3 ta unread, mark-as-read).
- To-Do List: checkbox toggle, priority badge, add/delete (local state).
- "Darsga qo'shilish" tugmasi — modal (Google Meet link mock).
- "To'lov qilish" — modal form (sum + card validatsiya zod bilan).
- Dars jadvali tabs: Bugun / Ertaga / Hafta / Oy — har biri o'z datasi.
- Kurslarim "Davom etish" — `/learning/:courseId` ga navigate.
- Charts: donut (course progress), 4 sparkline (stats), radar (skills), bar (XP activity).
- Loading skeleton, empty state (To-Do bo'sh), error boundary har bir route'da.
- Auth: mock login (email+parol zod validatsiya), session localStorage, protected routes redirect `/login` ga.

## Responsive

- ≥1280px: 3 ustun (sidebar + main + right rail).
- 768–1279px: sidebar collapse icon-only, right rail main ostiga.
- <768px: sidebar drawer (Sheet), stat cards 2×2, jadval/kurslar vertical stack, hamburger menu.

## Texnik

- TanStack Router file routes `src/routes/`.
- Komponentlar: `src/components/dashboard/` (Sidebar, Topbar, StatCard, ProgressDonut, ScheduleTimeline, CourseCard, TodoList, RadarChart, ActivityFeed, BalanceCard, NextLessonCard, StreakCard).
- shadcn/ui: Card, Button, Dialog, Sheet, Tabs, Dropdown, Input, Checkbox, Badge, Progress, Sonner (toast).
- Charts: `recharts` (qo'shiladi).
- Animation: `framer-motion` (qo'shiladi).
- Forms: `react-hook-form` + `zod`.
- Til: UI uzbek tilida (rasmga mos).

## Yetkazib berish

1. Tokenlar + Tailwind theme (`styles.css`).
2. Layout shell (Sidebar + Topbar + RightRail) `_app` layout route.
3. Dashboard widgets (har biri alohida komponent).
4. Boshqa sahifalar (Learning, Grades, Finance, Support, Settings, Auth).
5. State (Zustand light: theme, todos, notifications, auth).
6. Responsive polish + QA.
