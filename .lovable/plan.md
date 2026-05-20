# EduPro v3 — Big Update

Bugungi maqsad: v2 dagi xatoliklarni tuzatish, 3D galereyani professional darajaga olib chiqish, har bir tugna/sahifani real ishlaydigan qilish.

## 1) Bug fix — search overlay sidebarga otib ketadi

Mobile/tablet'da Topbar search natijalari dropdown'i z-index/positioning sabab sidebar (drawer) ustiga emas, balki orqasiga/yon tomonga chiqayapti. Yechim:
- Search dropdown `position: absolute` + `z-50` o'rniga `Popover` (Radix) ichiga olinadi — portal qiladi va overflow muammosi yo'q.
- Dropdown maksimal `calc(100vw - 32px)` width, mobile'da topbar tagiga full-width sheet sifatida ochiladi.
- Sidebar drawer ochilganda search yopiladi.

## 2) 3D Galereya — professional upgrade

Hozirgi Scene oddiy floating cardlar. Yangi versiya:

**Vizual:**
- Har kurs uchun AI-generated atmosfera rasm (nano-banana premium orqali) — 6 ta: React (cyan neon lab), Node.js (emerald server room), DevOps (amber industrial), UI/UX (rose studio), Python (violet cosmic), Linux (terminal green matrix). Har biri 1280x1280, alcove orqa devoriga texture sifatida.
- Har alcove'da: backlit framed poster (AI image) + 3D floating product card (kurs ma'lumoti) + neon trim + reflective floor + volumetric god-ray.
- Environment HDRI (drei `Environment preset="city"`) + ContactShadows.
- Particles (drei `Sparkles`) har alcove rangida.

**Interaksiya:**
- GSAP ScrollTrigger camera path silliqlangan — har xona oldida 1.5s snap + DOF blur (postprocessing `Bokeh`).
- Click on alcove → modal: kurs tafsilotlari, "Davom etish" → `/learning` ga navigate (kurs id bilan).
- Hover'da alcove yorug'lik intensivligi oshadi.
- Mouse parallax (kichik kamera tilt).

**Performance:**
- Images `lazy` + `Suspense` fallback.
- Mobile: faqat 3 alcove, postprocessing off, DPR clamp `[1, 1.5]`.
- Reduced-motion: scroll snap o'chadi, statik grid.

**Yangi fayllar:**
- `src/assets/gallery/{react,node,devops,uiux,python,linux}.jpg` (nano-banana orqali generatsiya)
- `src/components/gallery/Alcove.tsx` (alohida room komponent)
- `src/components/gallery/AlcoveModal.tsx`
- `src/components/gallery/useScrollCamera.ts` (GSAP rig)
- `src/components/gallery/Scene.tsx` (qayta yoziladi)

## 3) Hamma tugmalar real ishlaydi + filtrlar

**Topbar:**
- Avatar dropdown: Profil → `/settings#profile`, Sozlamalar → `/settings`, Chiqish → logout + redirect.
- Audio (Howler) — `useSoundscape` hook tuzatiladi: user gesture'dan keyin `Howl.play()` (browser autoplay policy), volume slider real ishlaydi, localStorage'da saqlanadi, toggle ikona holatga qarab.
- Bell dropdown: "Hammasini o'qilgan", individual click ham o'qiydi.
- Search → Popover (yuqorida).

**Sidebar:**
- "Pro ga o'tish" CTA bloki **olib tashlanadi**.
- O'rniga **Filtrlar** paneli: Kurs darajasi (Boshlang'ich/O'rta/Yuqori), Status (Faol/Tugallangan), Sort (Yangi/Eski/Reyting) — Zustand `filters` slice, dashboard/learning/gallery'ga ta'sir qiladi.
- "Kunlik maqsad" qoladi.

**Settings sahifasi:**
- Tab'lar: Profil / Tashqi ko'rinish / Audio / Bildirishnomalar / Til.
- Profil: ism/email/avatar yuklash (FileReader → store).
- Audio: Master volume, ambient on/off, SFX on/off (real Howler bog'lash).
- Bildirishnomalar: real toggle (store).
- Til: UZ/EN (i18n stub — string map).

## 4) Davomat va Baholar — real sahifa

Hozir `SimplePage` placeholder. To'liq quramiz:

**`/grades`:**
- Tabs: Baholar / Davomat / Sertifikatlar.
- Baholar jadvali (Tanstack Table): kurs, vazifa, ball, maks ball, sana, status — filter + sort + search.
- Davomat: oyma-oy heatmap (har kun rang intensivligi), oylik %, "yo'qlama qilingan" / "kelmagan" / "kechikkan" qator-qator.
- Sertifikatlar grid (mock 3 ta) — "Yuklab olish" → toast.
- SkillsRadar yuqorida summary sifatida qoladi.

**`/learning`:**
- Kurslar grid + filtrlar (Sidebar filters bilan bog'lanadi).
- Har kurs cardida: progress bar, "Davom etish" → modal.
- "Vazifalarim" tab — to'liq todo list (TodoCard kengaytirilgan).

## 5) UI/UX polish + QA audit

- Spacing, ritm, hierarchy butun saytda ko'rib chiqiladi.
- Typography scale aniqlashtiriladi (display/headline/body/caption tokenlar).
- Dark/Light mode contrast WCAG AA.
- Focus rings barcha interactive elementlarda.
- Tap target ≥44px mobile.
- Har sahifa va tugmani manual audit:
  - `/`, `/learning`, `/gallery`, `/grades`, `/finance`, `/support`, `/settings`
  - Har modal ochilishi/yopilishi
  - Theme toggle, audio toggle, lighting cycle
  - Mobile BottomNav 5 tab
- Console warninglarni 0 ga tushirish.

## 6) Texnik qo'shimchalar

Paketlar (agar yo'q bo'lsa):
```
bun add @react-three/postprocessing @tanstack/react-table
```

Store kengayadi (`src/lib/store.ts`):
- `filters: { level, status, sort }`
- `notifications: { read: Set, items }`
- `audioReady: boolean` (autoplay unlock flag)
- `language: 'uz' | 'en'`

Yangi/o'zgaradigan fayllar (xulosa):
- `src/components/gallery/*` (Scene qayta, Alcove, AlcoveModal, useScrollCamera)
- `src/assets/gallery/*.jpg` (6 ta AI image)
- `src/components/layout/Topbar.tsx` (Popover search, audio fix, dropdown)
- `src/components/layout/Sidebar.tsx` (Pro CTA olib tashlash, Filters panel)
- `src/routes/grades.tsx` (to'liq sahifa + tabs)
- `src/routes/learning.tsx` (kurslar grid + filtrlar)
- `src/routes/settings.tsx` (tabs)
- `src/lib/store.ts` (filters, notifications, audio, lang)
- `src/styles.css` (typography tokens, focus rings)

## Yetkazib berish tartibi

1. Bug fix: search overlay (tezkor)
2. Store kengayishi + Sidebar (Pro CTA → Filters)
3. AI images generatsiya (6 ta nano-banana premium)
4. Gallery Scene v2 (Alcove + postprocessing + modal)
5. GSAP scroll camera silliqlash
6. Audio (Howler) tuzatish + Settings audio tabi
7. Grades sahifasi (jadval + heatmap + sertifikatlar)
8. Learning sahifasi (filtrlangan grid)
9. Topbar avatar dropdown + Settings tabs
10. UI/UX polish, tipografiya, fokus ringlar
11. To'liq QA: har sahifa, har tugma, mobile + desktop, light + dark

## Natija
- 0 ta visual bug (search overlay tuzatildi)
- 3D galereya — AI atmosfera + postprocessing + interaktiv
- Har bir tugma real ishlaydi (audio, profile, settings, notif, filters)
- Davomat va baholar to'liq funksional
- Pro CTA o'rniga foydali Filtrlar paneli
- Light/Dark, Mobile/Desktop, Reduced-motion — barchasi yaxshi
