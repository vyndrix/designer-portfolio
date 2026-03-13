# Project Roadmap

## Phase 1: Core Functionality Completion
**Goal:** Deliver a fully functional CRUD-capable dashboard and stable public portfolio.

### Milestone 1.1: Missing CRUD Operations
- [ ] Implement `delete` mutations in `src/remote/queries/projects.ts`.
- [ ] Implement `delete` mutations in `src/remote/queries/skills.ts`.
- [ ] Implement `delete` mutations in `src/remote/queries/users.ts`.
- [ ] Integrate delete actions into dashboard tables.

### Milestone 1.2: User Management Polish
- [ ] Implement password reset flow in `src/remote/queries/users.ts`.
- [ ] Add "Reset Password" action to the Users dashboard page.

## Phase 2: Technical Debt & Refactoring
**Goal:** Improve maintainability and consistency.

### Milestone 2.1: Component Refactoring
- [ ] Break down `src/components/ui/sidebar.tsx` (700+ lines) into smaller components.
- [ ] Standardize and consolidate input components (`date-picker.tsx`, `input.tsx`).

## Phase 3: Testing & Quality Assurance
**Goal:** Introduce automated verification.

### Milestone 3.1: Unit & Component Testing
- [ ] Setup Vitest and React Testing Library.
- [ ] Add unit tests for remote query hooks and utility functions.
- [ ] Add component tests for critical UI elements.
