# Project Structure

**Analysis Date:** 2026-03-13

## Directory Layout

- `src/assets/`: Static assets including images and custom SVG icons.
- `src/components/ui/`: shadcn-ui base components (primitive UI).
- `src/components/`: Application-specific shared components (e.g., `entity-table`, `skills-section`).
- `src/contexts/`: React Contexts (e.g., `AnimateContext`).
- `src/hooks/`: Custom React hooks (e.g., `use-mobile`).
- `src/lib/`: Shared utilities and helpers (e.g., `cn` for Tailwind classes).
- `src/pages/`: Page components organized by route.
    - `dashboard/`: Admin dashboard sections (projects, skills, users).
    - `login/`: Authentication-related pages and gate.
    - `home.tsx`: Landing page.
- `src/remote/`: Backend integration layer.
    - `queries/`: TanStack Query hooks and Supabase interactions.
    - `auth-provider.tsx`: Auth state management.
    - `database.types.ts`: Generated Supabase types.
- `src/theme/`: Theme configuration and `ThemeProvider`.
- `src/routes.tsx`: Main routing configuration.
- `main.tsx`: Application entry point.
- `index.html`: Base HTML template.

## Root Files
- `package.json`: Dependencies and scripts.
- `vite.config.ts`: Vite build configuration.
- `tsconfig.json`: TypeScript configuration.
- `eslint.config.js`: ESLint rules and configuration.
- `GEMINI.md`: Project mandates and conventions.
