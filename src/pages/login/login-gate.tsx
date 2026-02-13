import { useAuth } from "@/remote";
import type React from "react";
import { Login } from "./login";
import { Loader } from "@/components/loader";

export function LoginGate({ children }: { children: React.ReactNode }) {
  const { isLoading, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Login />;

  if (isLoading) return <Loader />;

  return children;
}
