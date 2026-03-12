import { createContext, useContext } from "react";
import { useAnimate } from "motion/react";

interface AnimateContextValue {
  scope: ReturnType<typeof useAnimate>[0];
  animate: ReturnType<typeof useAnimate>[1];
}

const AnimateContext = createContext<AnimateContextValue | null>(null);

export function AnimateProvider({
  children,
  scope,
  animate,
}: {
  children: React.ReactNode;
  scope: ReturnType<typeof useAnimate>[0];
  animate: ReturnType<typeof useAnimate>[1];
}) {
  return (
    <AnimateContext.Provider value={{ scope, animate }}>
      {children}
    </AnimateContext.Provider>
  );
}

export function useAnimateContext() {
  const context = useContext(AnimateContext);
  if (!context) {
    throw new Error("useAnimateContext must be used within an AnimateProvider");
  }
  return context;
}
