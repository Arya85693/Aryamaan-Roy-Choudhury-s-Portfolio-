export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "theme";
export const THEME_CHANGE = "themechange";

// Browser-bar colors (the page background of each theme).
export const themeColors: Record<Theme, string> = { dark: "#021F2F", light: "#F0E1CE" };

// The theme every first-time visitor sees, whatever their system setting.
export const DEFAULT_THEME: Theme = "light";

// Runs inline in <head> before first paint so the page never flashes the wrong theme.
// Uses the visitor's saved choice, else the default theme.
export const themeInitScript = `(function(){var d=document.documentElement;d.classList.add('js');var t=null;try{t=localStorage.getItem('${THEME_STORAGE_KEY}')}catch(e){}if(t!=='light'&&t!=='dark'){t='${DEFAULT_THEME}'}d.setAttribute('data-theme',t)})()`;

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
