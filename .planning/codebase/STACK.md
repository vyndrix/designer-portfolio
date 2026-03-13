# Technology Stack

**Analysis Date:** 2026-03-13

## Core Framework
- **Runtime/Build:** Vite (aliased to `rolldown-vite@7.2.5`) with TypeScript 5.9.3.
- **Frontend Framework:** React 19.2.0 (using Babel React Compiler).
- **Routing:** React Router 7.13.0 (`HashRouter` in `main.tsx`).

## Styling & UI
- **Styling:** Tailwind CSS 4.1.18.
- **UI Components:** shadcn/ui components built with Radix UI 1.4.3.
- **Icons:** Lucide React 0.563.0.
- **Animations:** Motion (framer-motion) 12.35.2.
- **Toasts:** Sonner 2.0.7.
- **Themes:** `next-themes` 0.4.6.

## Data Fetching & State
- **Server State:** TanStack React Query 5.90.21 with persistence (`@tanstack/query-async-storage-persister`).
- **Tables:** TanStack Table 8.21.3.
- **Forms:** React Hook Form 7.71.1 with Zod 4.3.6 validation.

## Development Tools
- **Linting:** ESLint 9.39.1 with TypeScript-ESLint.
- **Database Types:** Supabase CLI for type generation.
