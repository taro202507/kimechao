import { MAX_PINS } from "./constants";
import { presets } from "./presets";
import type { DecisionDraft, HomeItem } from "./types";

const PINS_KEY = "kimechao.pins";
const HIDDEN_KEY = "kimechao.hiddenPresets";

function canUseStorage() {
  return typeof window !== "undefined";
}

export function draftKey(draft: DecisionDraft) {
  return `${draft.title}\n${draft.options.join("\n")}`;
}

export function loadPins(): DecisionDraft[] {
  if (!canUseStorage()) return [];
  const raw = localStorage.getItem(PINS_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as DecisionDraft[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item) =>
        typeof item?.title === "string" &&
        Array.isArray(item.options) &&
        item.options.length >= 2,
    );
  } catch {
    return [];
  }
}

function savePins(pins: DecisionDraft[]) {
  if (!canUseStorage()) return;
  localStorage.setItem(PINS_KEY, JSON.stringify(pins.slice(0, MAX_PINS)));
}

export function isPinned(draft: DecisionDraft) {
  const key = draftKey(draft);
  return loadPins().some((pin) => draftKey(pin) === key);
}

export function addPin(draft: DecisionDraft): "ok" | "duplicate" | "full" {
  const pins = loadPins();
  if (pins.some((pin) => draftKey(pin) === draftKey(draft))) {
    return "duplicate";
  }
  if (pins.length >= MAX_PINS) return "full";
  savePins([
    ...pins,
    { title: draft.title, options: [...draft.options] },
  ]);
  return "ok";
}

export function removePin(draft: DecisionDraft) {
  const key = draftKey(draft);
  savePins(loadPins().filter((pin) => draftKey(pin) !== key));
}

export function loadHiddenPresets(): string[] {
  if (!canUseStorage()) return [];
  const raw = localStorage.getItem(HIDDEN_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as string[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((title) => typeof title === "string");
  } catch {
    return [];
  }
}

function saveHiddenPresets(titles: string[]) {
  if (!canUseStorage()) return;
  localStorage.setItem(HIDDEN_KEY, JSON.stringify(titles));
}

export function hidePreset(title: string) {
  const hidden = loadHiddenPresets();
  if (hidden.includes(title)) return;
  saveHiddenPresets([...hidden, title]);
}

export function getHomeItems(): HomeItem[] {
  const pins = loadPins();
  const hidden = new Set(loadHiddenPresets());
  const items: HomeItem[] = pins.map((pin) => ({
    source: "pin",
    title: pin.title,
    options: pin.options,
  }));
  const used = new Set(items.map(draftKey));

  for (const preset of presets) {
    if (items.length >= MAX_PINS) break;
    if (hidden.has(preset.title)) continue;
    if (used.has(draftKey(preset))) continue;
    items.push({ source: "preset", title: preset.title, options: preset.options });
    used.add(draftKey(preset));
  }

  return items;
}

export function removeHomeItem(item: HomeItem) {
  if (item.source === "pin") {
    removePin(item);
    return;
  }
  hidePreset(item.title);
}

export function saveHomeOrder(items: HomeItem[]) {
  savePins(
    items.map((item) => ({
      title: item.title,
      options: [...item.options],
    })),
  );
}

export function moveHomeItem(items: HomeItem[], index: number, direction: -1 | 1) {
  const target = index + direction;
  if (target < 0 || target >= items.length) return items;
  const next = [...items];
  const current = next[index];
  next[index] = next[target];
  next[target] = current;
  saveHomeOrder(next);
  return getHomeItems();
}

export function clearPins() {
  if (!canUseStorage()) return;
  localStorage.removeItem(PINS_KEY);
  localStorage.removeItem(HIDDEN_KEY);
}
