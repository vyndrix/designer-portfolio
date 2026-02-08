import { useContext } from "react";
import { ThemeProviderContext } from "./provider";

export const useTheme = () => useContext(ThemeProviderContext);
