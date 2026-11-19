"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

export default function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, toggleTheme } = useTheme();
  const LabelIcon = theme === "dark" ? Sun : Moon;
  const action = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={action}
      title={action}
      className={`theme-toggle ${compact ? "theme-toggle-compact" : ""}`}
    >
      <LabelIcon size={18} aria-hidden="true" />
      {!compact && <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>}
    </button>
  );
}
