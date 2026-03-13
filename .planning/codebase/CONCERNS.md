# Codebase Concerns

**Analysis Date:** 2023-10-27

## Tech Debt

**Missing CRUD Operations:**
- Issue: Delete functionality is currently not implemented for Projects, Users, and Skills in the dashboard.
- Files: `src/pages/dashboard/projects/index.tsx`, `src/pages/dashboard/users/index.tsx`, `src/pages/dashboard/skills/index.tsx`
- Impact: Users cannot remove entities from the system.
- Fix approach: Implement delete mutations in the respective query files and hook them up to the table actions.

**Incomplete Refactoring:**
- Issue: Components like `date-picker.tsx` and `table.tsx` have TODO-REFACTOR comments indicating they should be moved or integrated with other components.
- Files: `src/components/ui/date-picker.tsx`, `src/components/ui/table.tsx`
- Impact: Inconsistent component structure and potential duplication.
- Fix approach: Consolidate input components and standardize the `Cell` component usage in tables.

**Large Component Complexity:**
- Issue: `src/components/ui/sidebar.tsx` is significantly larger than other components (700+ lines).
- Files: `src/components/ui/sidebar.tsx`
- Impact: Harder to maintain and test.
- Fix approach: Break down into smaller sub-components.

## Security Considerations

**Hardcoded Temporary Passwords:**
- Risk: The user signup process uses a hardcoded "temporary-password" string.
- Files: `src/remote/queries/users.ts`
- Current mitigation: None.
- Recommendations: Implement a proper password generation/invitation flow or allow users to set their password during signup.

## Fragile Areas

**Supabase Integration (Profiles):**
- Files: `src/remote/queries/users.ts`
- Why fragile: Comments indicate suspicion that Supabase triggers are not working as expected during user updates.
- Safe modification: Thoroughly test the profile update flow and verify trigger behavior in the Supabase dashboard.
- Test coverage: Gaps in automated testing for remote data mutations.

## Missing Critical Features

**User Management Actions:**
- Problem: "Reset Password" functionality is missing from the User dashboard.
- Blocks: Administrators cannot help users regain access to their accounts.
- Files: `src/pages/dashboard/users/index.tsx`

---

*Concerns audit: 2023-10-27*
