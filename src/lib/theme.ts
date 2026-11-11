export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "theme";
export const THEME_CHANGE = "themechange";

// Browser-bar colors (the page background of each theme).
export const themeColors: Record<Theme, string> = { dark: "#03203D", light: "#F0E5DB" };

// Runs inline in <head> before first paint so the page never flashes the wrong theme.
// Uses the visitor's saved choice, else their system setting.
export const themeInitScript = `(function(){var d=document.documentElement;d.classList.add('js');var t=null;try{t=localStorage.getItem('${THEME_STORAGE_KEY}')}catch(e){}if(t!=='light'&&t!=='dark'){t=window.matchMedia&&matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}d.setAttribute('data-theme',t)})()`;

export function getTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

// Point the browser-bar color at the active theme (the metas otherwise follow the system setting).
export function syncThemeColorMeta(theme: Theme) {
  document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
    meta.setAttribute("content", themeColors[theme]);
  });
}

export function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  syncThemeColorMeta(theme);
  window.dispatchEvent(new Event(THEME_CHANGE));
}

export function setTheme(theme: Theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage blocked (private mode): the choice still applies for this visit.
  }
  applyTheme(theme);
}

export function toggleTheme() {
  setTheme(getTheme() === "dark" ? "light" : "dark");
}

export function hasSavedTheme() {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    return saved === "light" || saved === "dark";
  } catch {
    return false;
  }
}
