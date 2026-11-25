"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";

type ThemeContextValue = {
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useLocalStorage("playground-theme", "light");
  const isDark = theme === "dark";

  function toggleTheme() {
    setTheme(isDark ? "light" : "dark");
  }

  return <ThemeContext value={{ isDark, toggleTheme }}>{children}</ThemeContext>;
}

export function useTheme() {
  const theme = useContext(ThemeContext);

  if (theme === null) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return theme;
}
