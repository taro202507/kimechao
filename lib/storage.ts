import { MAX_HISTORY } from "./constants";
import type { Decision } from "./types";

const HISTORY_KEY = "kimechao.history";

function canUseStorage() {
  return typeof window !== "undefined";
}

export function loadHistory(): Decision[] {
  if (!canUseStorage()) return [];
  const raw = localStorage.getItem(HISTORY_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as Decision[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export function addDecision(decision: Decision) {
  if (!canUseStorage()) return;
  const next = [decision, ...loadHistory()].slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
}

export function clearHistory() {
  if (!canUseStorage()) return;
  localStorage.removeItem(HISTORY_KEY);
}

export function removeDecision(id: string) {
  if (!canUseStorage()) return;
  const next = loadHistory().filter((item) => item.id !== id);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
  return next;
}
