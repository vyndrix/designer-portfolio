import type { Session, User } from "@supabase/supabase-js";
import { createContext, useEffect, useState } from "react";
import { sb } from ".";
import supabase from "./supabase";

type State = {
  session: Session | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signOut: () => void;
};

const AuthContext = createContext<State>({
  session: null,
  user: null,
  isAuthenticated: false,
  isLoading: true,
  signOut: () => null,
});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
      setLoading(false);
    });

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const value = {
    session,
    user: session?.user ?? null,
    isAuthenticated: !!session,
    isLoading: loading,
    signOut: () => sb.auth.signOut(),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default {
  AuthContext,
  AuthProvider,
};
