import type { DecisionDraft } from "./types";

export const presets: DecisionDraft[] = [
  {
    title: "今日の夕飯",
    options: ["和食", "洋食", "中華", "麺", "丼"],
  },
  {
    title: "何を見る",
    options: ["映画", "アニメ", "YouTube", "何もしない"],
  },
  {
    title: "休憩する？",
    options: ["5分", "15分", "散歩", "まだやる"],
  },
];
