# Coding Conventions

**Analysis Date:** 2026-03-13

## Language & Style
- **TypeScript:** Strict typing preferred. Avoid `any`. Use `database.types.ts` for backend data.
- **Components:** Functional components with PascalCase naming (`SkillCard.tsx`).
- **Naming:** kebab-case for files and directories (except components).
- **Formatting:** Adhere to project ESLint rules (`eslint.config.js`).

## UI & Styling
- **Tailwind CSS v4:** Use utility classes directly. Avoid custom CSS unless necessary.
- **Theming:** Use CSS variables defined in `src/styles.css`. Support light/dark modes.
- **Components:** Favor composition. Use `clsx` and `tailwind-merge` (`cn` utility) for class manipulation.

## State Management
- **Server State:** Use TanStack Query hooks from `src/remote/queries/`.
- **Forms:** Always use `react-hook-form` + `zod` for validation.
- **Contexts:** Use sparingly for truly global or section-wide UI state.

## Backend Integration
- All Supabase interactions MUST go through `src/remote/`.
- Use the `sb` client from `src/remote/supabase.ts`.
