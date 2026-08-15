import type { ReactNode } from "react";
import { AppShell } from "@/components/AppShell";

export function LoadingScreen({ children = "読み込み中…" }: { children?: ReactNode }) {
  return (
    <AppShell>
      <p className="text-center font-bold text-muted">{children}</p>
    </AppShell>
  );
}
