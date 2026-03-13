"use client";

import { Route, Routes } from "react-router";
import { DashboardLayout } from "./pages/dashboard/layout";
import { ProjectsPage } from "./pages/dashboard/projects";
import { SkillsPage } from "./pages/dashboard/skills";
import { UsersPage } from "./pages/dashboard/users";
import { Home } from "./pages/home";
import { LoginGate } from "./pages/login/login-gate";
import {
  AuthProvider,
  DashboardQueryProvider,
  HomeQueryProvider,
} from "./remote";

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route
          index
          element={
            <HomeQueryProvider>
              <Home />
            </HomeQueryProvider>
          }
        />
        <Route
          path="dashboard"
          element={
            <DashboardQueryProvider>
              <AuthProvider>
                <LoginGate>
                  <DashboardLayout />
                </LoginGate>
              </AuthProvider>
            </DashboardQueryProvider>
          }
        >
          <Route index path="skills" element={<SkillsPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="users" element={<UsersPage />} />
        </Route>
      </Routes>
    </>
  );
}
