import type { Decision, DecisionDraft } from "./types";

const DRAFT_KEY = "kimechao.draft";
const LAST_KEY = "kimechao.last";

function canUseStorage() {
  return typeof window !== "undefined";
}

export function saveDraft(draft: DecisionDraft) {
  if (!canUseStorage()) return;
  sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
}

export function loadDraft(): DecisionDraft | null {
  if (!canUseStorage()) return null;
  const raw = sessionStorage.getItem(DRAFT_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as DecisionDraft;
    if (
      typeof parsed.title !== "string" ||
      !Array.isArray(parsed.options) ||
      parsed.options.length < 2
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function clearDraft() {
  if (!canUseStorage()) return;
  sessionStorage.removeItem(DRAFT_KEY);
}

export function saveLast(decision: Decision) {
  if (!canUseStorage()) return;
  sessionStorage.setItem(LAST_KEY, JSON.stringify(decision));
}

export function loadLast(): Decision | null {
  if (!canUseStorage()) return null;
  const raw = sessionStorage.getItem(LAST_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Decision;
  } catch {
    return null;
  }
}

export function clearLast() {
  if (!canUseStorage()) return;
  sessionStorage.removeItem(LAST_KEY);
}
