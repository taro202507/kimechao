"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { PrimaryButton } from "@/components/PrimaryButton";
import { resetAppData } from "@/lib/reset";
import { applyTheme, loadTheme, themes } from "@/lib/theme";
import type { ThemeId } from "@/lib/types";

export default function SettingsClient() {
  const router = useRouter();
  const [theme, setTheme] = useState<ThemeId>(() => loadTheme());
  const [confirming, setConfirming] = useState(false);

  const selectTheme = (id: ThemeId) => {
    applyTheme(id);
    setTheme(id);
  };

  const reset = () => {
    resetAppData();
    router.replace("/");
  };

  return (
    <AppShell backHref="/">
      <h1 className="mb-6 text-2xl font-black">設定</h1>

      <section className="mb-10">
        <h2 className="mb-3 text-sm font-bold text-muted">背景色</h2>
        <div className="grid grid-cols-5 gap-2">
          {themes.map((item) => {
            const selected = theme === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => selectTheme(item.id)}
                className={`flex flex-col items-center gap-2 rounded-2xl border-2 px-1 py-3 ${
                  selected ? "border-accent bg-card" : "border-line bg-card"
                }`}
              >
                <span
                  className="h-8 w-8 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: item.swatch }}
                />
                <span className="text-[11px] font-bold">{item.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-bold text-muted">データ</h2>
        {confirming ? (
          <div className="flex flex-col gap-3 rounded-3xl border-2 border-line bg-card px-5 py-5">
            <p className="text-center font-bold">
              履歴・よくある決め・色を全部消すよ。
              <br />
              元には戻せない。
            </p>
            <PrimaryButton onClick={reset}>本当に消す</PrimaryButton>
            <PrimaryButton variant="secondary" onClick={() => setConfirming(false)}>
              やめる
            </PrimaryButton>
          </div>
        ) : (
          <PrimaryButton variant="secondary" onClick={() => setConfirming(true)}>
            データを消す
          </PrimaryButton>
        )}
      </section>
    </AppShell>
  );
}
