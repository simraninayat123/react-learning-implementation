"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "./theme-context";

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Button variant="secondary" aria-pressed={isDark} onClick={toggleTheme}>
      Dark mode
    </Button>
  );
}
