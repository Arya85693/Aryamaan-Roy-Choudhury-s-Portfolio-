"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@/components/Icons";
import {
  THEME_CHANGE,
  applyTheme,
  getTheme,
  hasSavedTheme,
  syncThemeColorMeta,
  toggleTheme,
  type Theme,
} from "@/lib/theme";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  // Unknown until mounted; the icon itself is picked by CSS, so nothing mismatches on load.
  const [theme, setThemeState] = useState<Theme | null>(null);

  useEffect(() => {
    const sync = () => setThemeState(getTheme());
    sync();
    syncThemeColorMeta(getTheme());
    window.addEventListener(THEME_CHANGE, sync);

    // Follow the system setting live until the visitor picks a theme themselves.
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const onSystemChange = () => {
      if (!hasSavedTheme()) applyTheme(media.matches ? "light" : "dark");
    };
    media.addEventListener("change", onSystemChange);
    return () => {
      window.removeEventListener(THEME_CHANGE, sync);
      media.removeEventListener("change", onSystemChange);
    };
  }, []);

  const label = theme === "light" ? "Switch to dark theme" : theme === "dark" ? "Switch to light theme" : "Toggle color theme";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={`flex h-9 w-9 items-center justify-center rounded-full border border-line-strong text-paper-muted transition-colors hover:text-paper ${className}`}
    >
      <MoonIcon className="theme-icon-dark h-4 w-4" />
      <SunIcon className="theme-icon-light h-4 w-4" />
    </button>
  );
}
