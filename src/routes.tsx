import { Route, Routes } from "react-router";
import { DashboardLayout } from "./pages/dashboard/layout";
import { DashboardProjects } from "./pages/dashboard/projects";
import { DashboardSkills } from "./pages/dashboard/skills";
import { DashboardUsers } from "./pages/dashboard/users";
import { Home } from "./pages/home";
import { Login } from "./pages/login";

export default function AppRoutes() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="dashboard" element={<DashboardLayout />}>
        <Route index path="skills" element={<DashboardSkills />} />
        <Route path="projects" element={<DashboardProjects />} />
        <Route path="users" element={<DashboardUsers />} />
      </Route>
    </Routes>
  );
}
