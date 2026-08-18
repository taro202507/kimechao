export type DecisionDraft = {
  title: string;
  options: string[];
};

export type HomeItem = DecisionDraft & {
  source: "pin" | "preset";
};

export type ThemeId = "sunset" | "ocean" | "forest" | "grape" | "mono";

export type Decision = {
  id: string;
  title: string;
  options: string[];
  chosen: string;
  rerollsUsed: number;
  decidedAt: string;
};
