# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev          # Start dev server (Firebase Studio usually manages this)
npm run build        # Production build (Next.js 16 with Turbopack)
npm run start        # Start production server
npm run lint         # ESLint v9 flat config (core-web-vitals + typescript)
```

When running dev manually in Firebase Studio, use `--hostname 0.0.0.0` for preview access:
```bash
npx next dev --port 3000 --hostname 0.0.0.0
```

No test framework is configured. No tests exist yet.

## Architecture

**AMOREA Bundang** - 아모레퍼시픽 분당점 뷰티 카운셀러 플랫폼 (Korean-language site).

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript 5 · Tailwind CSS 4 (PostCSS plugin, no tailwind.config.js)

### Route Structure

```
/                      → 메인 마케팅 페이지 (8개 섹션, SSG, Server Component)
/counselors/[id]       → 카운셀러 상세 프로필 (SSG via generateStaticParams, Server Component)
/apply                 → 카운셀러 지원 폼 ("use client", 3-step wizard with useState)
```

No API routes, middleware, or server actions exist.

### Key Data Pattern

`src/data/counselors.ts` is the single source of truth for counselor data. It exports the `Counselor` interface and a `counselors` array. Both the main page grid and `/counselors/[id]` detail pages import from this file. Adding a new counselor object to the array automatically generates its static route via `generateStaticParams()`.

**Counselor interface structure:**
- Core fields: `id`, `name`, `role`, `emoji`, `shortDesc`, `fullDesc`
- Arrays: `specialties[]`, `certifications[]`, `programs[]` (title+desc), `reviews[]` (name+age+rating+text)
- Adding a counselor: append to the `counselors` array with a unique `id` (used in URL slug)

### Shared Components

`src/components/Navbar.tsx` — the only shared component. Client Component with mobile hamburger menu.

**Props:**
- `links?: NavLink[]` — custom nav items (defaults to main page anchors: #about, #counselors, #reviews, #recruit)
- `backLink?: { href: string; label: string }` — back button for sub-pages (hides default links when set)

**Usage pattern:** Main page uses default links. Sub-pages (`/counselors/[id]`, `/apply`) pass a `backLink` prop.

### Styling

- **Tailwind CSS 4** via `@tailwindcss/postcss` plugin — configured in `postcss.config.mjs`, no tailwind.config.js
- **globals.css** — `@import "tailwindcss"` + `@theme inline` block + custom animations + utility classes:
  - Keyframes: `float`, `shimmer`, `fadeInUp`, `pulse-glow`
  - Utilities: `.gradient-text` (animated purple-pink), `.glass-card` (glassmorphism)
- **Color palette:**
  - Primary: `#7B1FA2` (purple)
  - Secondary: `#E91E63` (pink)
  - Dark backgrounds: `#0f0517` → `#4a1942` (gradient range)
- **Typography:** Geist Sans + Geist Mono via `next/font/local`, applied as `--font-geist-sans` and `--font-geist-mono` CSS variables
- **Responsive:** Mobile-first, `sm:` breakpoint (640px+) for desktop. Navbar has mobile hamburger menu with slide-down animation.

### Component Conventions

- **Server Components by default.** Only use `"use client"` for interactive state (forms, toggles).
- **Path alias:** `@/*` → `src/*` (configured in tsconfig.json)
- **Page structure:** Currently monolithic (large inline JSX). No extracted section components yet.
- **Language:** All content is in Korean (`lang="ko"` in layout.tsx).
- **Data layer:** No backend/DB — static data only. Firebase integration planned.
- **Type safety:** All counselor data is strictly typed via the `Counselor` interface.

## Environment

Firebase Studio (Cloud Workstations). `next.config.ts` has `allowedDevOrigins` for `*.cloudworkstations.dev`.

## Progress Tracking

`docs/progress/` 폴더에 날짜별 진행현황 기록 (예: `2025-02-04.md`).
