# Architecture

**Analysis Date:** 2024-10-24

## Pattern Overview

**Overall:** Component-based Architecture with Layered Data Fetching.

**Key Characteristics:**
- **Layered Structure:** Separation of concerns between UI components, page layouts, data fetching (remote), and global state (contexts).
- **Hooks-based Logic:** Encapsulation of logic within custom hooks and providers.
- **Provider Pattern:** Extensive use of React Context Providers for authentication, theming, and data fetching (React Query).

## Layers

**UI Layer (Shadcn-like):**
- Purpose: Base reusable UI components.
- Location: `src/components/ui/`
- Contains: Button, Input, Sidebar, Table, etc.
- Depends on: `lucide-react`, `clsx`, `tailwind-merge`.

**Feature Components:**
- Purpose: Business-logic-aware components.
- Location: `src/components/`
- Contains: `entity-table.tsx`, `skills-section.tsx`, `header.tsx`.
- Depends on: UI Layer, Hooks.

**Page Layer:**
- Purpose: Route-level components.
- Location: `src/pages/`
- Contains: `home.tsx`, `dashboard/`, `login/`.
- Depends on: Feature Components, Remote Layer.

**Remote Layer (Data Fetching):**
- Purpose: Supabase client and TanStack Query hooks.
- Location: `src/remote/`
- Contains: `supabase.ts`, `queries/`, `auth-provider.tsx`.
- Depends on: `@supabase/supabase-js`, `@tanstack/react-query`.

## Data Flow

**Supabase to UI:**
1. Supabase client initialized in `src/remote/supabase.ts`.
2. Queries defined in `src/remote/queries/` using TanStack Query hooks (e.g., `useSkillsQuery`).
3. Query Providers (`DashboardQueryProvider`) wrap route sections in `src/routes.tsx`.
4. Components consume data via custom hooks.

**State Management:**
- **Server State:** Managed by TanStack Query in `src/remote/`.
- **UI State:** Managed by `useState` and specialized contexts (e.g., `src/pages/dashboard/entity-form-modal-context.tsx`).
- **Global State:** Auth state in `src/remote/auth-provider.tsx`, Theme state in `src/theme/`.

## Key Abstractions

**Query Providers:**
- Purpose: Scoped React Query clients for different sections of the app.
- Examples: `src/remote/dashboard-query-provider.tsx`, `src/remote/home-query-provider.tsx`.

**Auth Provider:**
- Purpose: Handles Supabase authentication state and session management.
- Examples: `src/remote/auth-provider.tsx`, `src/remote/use-auth.ts`.

## Entry Points

**Root Entry:**
- Location: `main.tsx`
- Triggers: Browser page load.
- Responsibilities: Renders the `HashRouter`, `ThemeProvider`, and root `Routes`.

**Routing Entry:**
- Location: `src/routes.tsx`
- Responsibilities: Defines all application routes and wraps them in necessary data/auth providers.

## Error Handling

**Strategy:** Toast-based notifications and fallback UI.

**Patterns:**
- **Mutation Errors:** Handled in TanStack Query `onError` callbacks (e.g., `src/remote/queries/skills.ts`).
- **Feedback:** UI feedback via `sonner` toasts.

## Cross-Cutting Concerns

**Logging:** Currently using standard `console` if applicable.
**Validation:** Schema-based validation using `zod` in query layers (`src/remote/queries/skills.ts`).
**Authentication:** Managed via `LoginGate` and `AuthProvider` in `src/routes.tsx`.

---

_Architecture analysis: 2024-10-24_
