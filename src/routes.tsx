import { Route, Routes } from "react-router";
import { Login } from "./pages/admin/login";
import { Home } from "./pages/home";

export default function AppRoutes() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
}
