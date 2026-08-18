import type { ThemeId } from "./types";

const THEME_KEY = "kimechao.theme";

export const themes: { id: ThemeId; label: string; swatch: string }[] = [
  { id: "sunset", label: "夕焼け", swatch: "#e24a1b" },
  { id: "ocean", label: "海", swatch: "#1a7aad" },
  { id: "forest", label: "森", swatch: "#3d7a32" },
  { id: "grape", label: "ぶどう", swatch: "#7c3aed" },
  { id: "mono", label: "モノクロ", swatch: "#3f3f3f" },
];

function canUseStorage() {
  return typeof window !== "undefined";
}

export function isThemeId(value: string): value is ThemeId {
  return themes.some((theme) => theme.id === value);
}

export function loadTheme(): ThemeId {
  if (!canUseStorage()) return "sunset";
  const raw = localStorage.getItem(THEME_KEY);
  if (raw && isThemeId(raw)) return raw;
  return "sunset";
}

export function applyTheme(id: ThemeId) {
  if (!canUseStorage()) return;
  localStorage.setItem(THEME_KEY, id);
  document.documentElement.dataset.theme = id;
}

export function applyStoredTheme() {
  applyTheme(loadTheme());
}

export function resetTheme() {
  if (!canUseStorage()) return;
  localStorage.removeItem(THEME_KEY);
  document.documentElement.dataset.theme = "sunset";
}
