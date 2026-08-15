export function pickOne<T>(items: T[]): T {
  if (items.length === 0) {
    throw new Error("選択肢が空です");
  }
  return items[Math.floor(Math.random() * items.length)];
}
