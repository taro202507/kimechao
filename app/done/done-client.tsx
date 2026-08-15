"use client";

import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { PrimaryButton } from "@/components/PrimaryButton";
import { loadLast } from "@/lib/session";

export default function DoneClient() {
  const [decision] = useState(() => loadLast());

  if (!decision) {
    return (
      <AppShell>
        <p className="mb-6 text-center font-bold text-muted">
          決めた内容が見つからないよ。
        </p>
        <PrimaryButton href="/">ホームへ</PrimaryButton>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <p className="mb-4 rounded-full bg-accent px-4 py-1 text-sm font-black text-white">
          決めちゃった
        </p>
        <p className="mb-2 text-sm font-bold text-muted">{decision.title}</p>
        <p className="text-4xl font-black leading-tight">{decision.chosen}</p>
        {decision.rerollsUsed > 0 ? (
          <p className="mt-4 text-sm font-bold text-muted">
            やり直し {decision.rerollsUsed}回で決めた
          </p>
        ) : (
          <p className="mt-4 text-sm font-bold text-muted">一発で決めた</p>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <PrimaryButton href="/">もうひとつ決める</PrimaryButton>
        <PrimaryButton href="/history" variant="secondary">
          履歴を見る
        </PrimaryButton>
      </div>
    </AppShell>
  );
}
