"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import { applyStoredTheme } from "@/lib/theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    applyStoredTheme();
  }, []);

  return children;
}
