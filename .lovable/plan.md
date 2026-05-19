# EduPro v2 — Immersive 3D Gallery Upgrade

Bugungi katta yangilanish: hozirgi student dashboard ustiga "3D gallery where each room showcases one product" konsepsiyasini moslab, har bir kurs/modul alohida 3D alcove sifatida ko'rinadigan immersive tajriba qo'shamiz. Barcha tugmalar ishlaydi, mobile-da native app hissi, sidebar polished.

## 1) Yangi `/gallery` route — 3D Immersive Hall

Hozirgi `/learning` sahifasiga qo'shimcha sifatida `/gallery` qo'shamiz va sidebardan "3D Galereya" havolasi bilan ulaymiz. Asosiy dashboard buzilmaydi.

Har bir kurs (React, Node.js, DevOps, UI/UX, Python, Linux) — alohida **alcove** (devordagi nisha):
- O'z lighting setup'i (spot + rim + ambient gradient)
- O'z atmosfera rangi (indigo/emerald/amber/rose/cyan/violet)
- Markazda floating 3D card: kurs nomi, progress, "Davom etish" CTA
- Reflective floor + soft fog

Tech:
- `three` + `@react-three/fiber` + `@react-three/drei` (Html, Environment, MeshReflectorMaterial, SpotLight, Text3D, ContactShadows)
- Har bir alcove — alohida `<group>` (WebGL ichida bitta scene, lekin har biri "individual" lighting va material)
- Background: dark void + volumetric god-rays

## 2) GSAP ScrollTrigger camera path

- `gsap` + `gsap/ScrollTrigger`
- Sahifa balandligi ~600vh, scroll qilganda kamera spline path bo'ylab bir alcove'dan ikkinchisiga uchadi
- Har bir alcove'da kamera 1.5s "to'xtaydi" (snap), info HTML overlay fade-in
- Progress indicator (chap tomonda vertical dots — qaysi room'dasiz)
- Pastda "Scroll to explore" hint, keyin yo'qoladi
- Reduced-motion: scroll path o'rniga oddiy grid fallback

## 3) Howler.js soundscape

- `howler`
- 3 ta ambient loop (lo-fi pad, deep hum, soft chime) — kategoriyaga qarab cross-fade
- Har bir room transition'da subtle "whoosh" SFX
- Topbar'da yangi 🔊 toggle (default: off, localStorage'da saqlanadi — auto-play policy)
- Volume slider dropdown'da

Manbalar: CDN'dan CC0 ambient (`pixabay`/`freesound` direct URL'lar) yoki kichik base64 — sahifa og'irlashmasligi uchun lazy load.

## 4) Hamma tugmalar ishlaydi (audit + fix)

Hozir ba'zi joylar dekorativ. Quyidagilarni real qilamiz:

- **Sidebar profile dropdown** → `/settings` ga navigate
- **Topbar avatar menyu**: Profil → `/settings`, Sozlamalar → `/settings`, Chiqish → logout + `/login` redirect
- **Lighting toggle**: yangi tugma — gallery sahifasidagi spot intensiyasini cycle qiladi (Dim / Normal / Bright)
- **Dark/Light mode toggle**: tekshirish — gallery'da ham theme'ga reaksiya (light mode'da bg, fog, material'lar moslashadi)
- **"Davom etish" / "Darsga qo'shilish"**: allaqachon modal — qoldiramiz
- **Bell**: mark-as-read ishlaydi — tekshirish
- **Search**: hozirgi state-only. Real natija dropdown qo'shamiz (kurslar/vazifalar bo'yicha filter, click → navigate)
- **Settings sahifasi**: theme'dan tashqari — notification toggles, til, audio volume, animation level (real state, persisted)

## 5) Mobile = native app

<768px da to'liq qayta dizayn:

- **Sidebar yashiriladi**, o'rniga **bottom tab bar** (fixed, safe-area aware):
  - 5 ta tab: Bosh, O'quv, 3D, Moliya, Profil
  - Active tab — gradient pill + scale animation
  - O'rtadagi "3D" tab — kattaroq, floating "+"-style FAB hissi
- **Topbar** kompaktlashadi: faqat greeting + bell + avatar (search → pastga, sticky search bar yoki sheet)
- **Stat cards**: horizontal snap-scroll carousel (1.2 card visible)
- **Schedule/Courses**: vertical stack, swipeable
- **Right rail kartochkalari** (NextLesson, Todo, Balance): asosiy oqimga aralashtiriladi
- Safe-area insets (`env(safe-area-inset-bottom)`)
- Tap targets ≥44px, haptic-feel transitions

## 6) Sidebar redesign (desktop)

- Glassmorphism qatlami chuqurroq, subtle noise texture
- Logo lockup'i yaxshilanadi (gradient mark + wordmark balansi)
- Profil bloki — XP ring (donut) avatar atrofida, level badge floating
- Nav item'lar: icon container + label, hover'da gradient sweep, active'da chap chetda gradient bar + glow
- "Streak" card o'rniga ixcham "Daily goal" widget (mini progress + flame)
- Collapse tugmasi (≥lg) — icon-only 72px rejim, tooltip bilan
- Pastda mini "Upgrade to Pro" CTA (gradient, optional dismiss)

## Texnik qo'shimchalar

Paketlar:
```
bun add three @react-three/fiber @react-three/drei gsap howler
bun add -D @types/three
```

Yangi/o'zgaradigan fayllar:
- `src/routes/gallery.tsx` — yangi route + SEO head
- `src/components/gallery/Scene.tsx` — R3F Canvas, kamera rig
- `src/components/gallery/Alcove.tsx` — bitta room (lighting + product card)
- `src/components/gallery/useScrollCamera.ts` — GSAP ScrollTrigger spline
- `src/components/gallery/useSoundscape.ts` — Howler manager
- `src/components/gallery/RoomIndicator.tsx` — vertical dots
- `src/components/layout/BottomNav.tsx` — mobile tab bar
- `src/components/layout/Sidebar.tsx` — redesign
- `src/components/layout/Topbar.tsx` — audio toggle, mobile compact, real search dropdown
- `src/components/layout/AppShell.tsx` — bottom nav padding, mobile branch
- `src/routes/settings.tsx` — kengaytirilgan sozlamalar
- `src/lib/store.ts` — `audioEnabled`, `volume`, `lighting`, `searchIndex` qo'shiladi
- `src/styles.css` — yangi tokenlar (fog, glass-2, safe-area utility)

Performance:
- `Suspense` + lazy Canvas (faqat `/gallery` da yuklanadi)
- DPR clamp `[1, 1.75]`, mobile'da `<2` rooms only + statik fallback agar GPU zaif (detect via `WEBGL_debug_renderer_info`)
- Reduced-motion: GSAP timeline'lar darhol final state'ga o'tadi, audio off

## Yetkazib berish tartibi

1. Paketlar + store kengayishi + tokenlar
2. Sidebar redesign + Topbar (audio toggle, search dropdown, real menular)
3. `/gallery` Scene + Alcove + lighting
4. GSAP scroll camera + RoomIndicator + HTML overlays
5. Howler soundscape integratsiyasi
6. Mobile: BottomNav + AppShell shartli render + responsive polish
7. Settings sahifasi to'ldirish + barcha tugma audit
8. QA: theme switch, audio toggle, reduced-motion, mobile <768px, tablet 768–1279px, desktop ≥1280px
