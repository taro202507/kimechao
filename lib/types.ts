export type DecisionDraft = {
  title: string;
  options: string[];
};

export type Decision = {
  id: string;
  title: string;
  options: string[];
  chosen: string;
  rerollsUsed: number;
  decidedAt: string;
};
