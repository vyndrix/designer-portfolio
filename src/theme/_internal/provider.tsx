import { createContext, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import type { Theme, ThemeProviderProps, ThemeProviderState } from "./type";

const initialState: ThemeProviderState = {
  theme: "system",
  toogleTheme: () => null,
};

export const ThemeProviderContext =
  createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useLocalStorage<Theme>(storageKey, defaultTheme);
  //   const [theme, setTheme] = useState<Theme>(
  //     () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  //   );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    toogleTheme: () =>
      setTheme((current) => (current === "dark" ? "light" : "dark")),
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
