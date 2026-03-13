# External Integrations

**Analysis Date:** 2026-03-13

## Supabase (Database & Auth)
- **Library:** `@supabase/supabase-js` 2.95.3.
- **Configuration:** `src/remote/supabase.ts`.
- **Authentication:** Managed via `AuthProvider` in `src/remote/auth-provider.tsx`.
- **Types:** Automatically generated via `yarn db:types` into `src/remote/database.types.ts`.
- **Validation:** Uses `supazod` for Supabase-to-Zod schema conversion.

## TanStack Query Persistence
- **Implementation:** Uses `persistQueryClient` with an async storage persister for offline-first capabilities or caching.
- **Location:** `src/remote/home-query-provider.tsx` and `src/remote/dashboard-query-provider.tsx`.

## React Router
- **Type:** `HashRouter` (required for static hosting compatibility).
- **Location:** `main.tsx` and `src/routes.tsx`.
