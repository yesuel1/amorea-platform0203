# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev          # Start dev server (Firebase Studio manages this automatically)
npm run build        # Production build (Next.js 16 with Turbopack)
npm run start        # Start production server
npm run lint         # ESLint with next/core-web-vitals + typescript
```

When running dev manually in Firebase Studio, use `--hostname 0.0.0.0` for preview access:
```bash
npx next dev --port 3000 --hostname 0.0.0.0
```

## Architecture

**AMOREA Bundang** - 아모레퍼시픽 분당점 뷰티 카운셀러 플랫폼 (Korean-language site).

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript 5 · Tailwind CSS 4 (PostCSS plugin)

### Route Structure

```
/                      → 메인 마케팅 페이지 (8개 섹션, SSG)
/counselors/[id]       → 카운셀러 상세 프로필 (SSG via generateStaticParams)
/apply                 → 카운셀러 지원 폼 (Client Component, 3-step wizard)
```

### Key Directories

- `src/data/counselors.ts` — 카운셀러 공유 데이터 (메인 + 상세 페이지에서 import). 새 카운셀러 추가 시 이 파일에 추가하면 상세 페이지가 자동 생성됨.
- `src/app/globals.css` — Tailwind v4 import + 커스텀 애니메이션 키프레임 (float, shimmer, fadeInUp, pulse-glow) + 유틸 클래스 (.gradient-text, .glass-card)

### Design System

- **Color:** Primary #7B1FA2 (purple), Secondary #E91E63 (pink), Dark backgrounds #0f0517–#4a1942
- **Pattern:** 그라데이션 배경, 글래스모피즘 카드, 글로우/시머 애니메이션
- **Responsive:** `sm:` breakpoint 기준 모바일 우선
- **Font:** Geist (Google Fonts), lang="ko"

### Component Conventions

- Server Components가 기본. 인터랙티브 폼은 `"use client"` 사용 (apply 페이지).
- Path alias: `@/*` → `src/*`
- 현재 백엔드/DB 없음 — 정적 데이터. 추후 Firebase 연동 예정.

## Environment

Firebase Studio (Cloud Workstations) 환경. `next.config.ts`에 `allowedDevOrigins`로 cloudworkstations.dev 도메인 허용 설정 필요.

## Progress Tracking

`docs/progress/` 폴더에 날짜별 진행현황 기록 (예: `2025-02-04.md`).
