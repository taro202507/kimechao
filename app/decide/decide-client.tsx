"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Roulette } from "@/components/Roulette";
import { MAX_REROLLS } from "@/lib/constants";
import { pickOne } from "@/lib/pick";
import { clearDraft, loadDraft, saveLast } from "@/lib/session";
import { addDecision } from "@/lib/storage";

type Phase = "idle" | "spinning" | "landed";

export default function DecideClient() {
  const router = useRouter();
  const [draft] = useState(() => loadDraft());
  const [phase, setPhase] = useState<Phase>("idle");
  const [chosen, setChosen] = useState<string | null>(null);
  const [rerollsUsed, setRerollsUsed] = useState(0);

  const spin = () => {
    if (!draft) return;
    setChosen(pickOne(draft.options));
    setPhase("spinning");
  };

  const handleSpinEnd = useCallback(() => {
    setPhase("landed");
  }, []);

  const reroll = () => {
    if (rerollsUsed >= MAX_REROLLS || phase === "spinning") return;
    setRerollsUsed((count) => count + 1);
    spin();
  };

  const commit = () => {
    if (!draft || !chosen) return;
    const decision = {
      id: crypto.randomUUID(),
      title: draft.title,
      options: draft.options,
      chosen,
      rerollsUsed,
      decidedAt: new Date().toISOString(),
    };
    addDecision(decision);
    saveLast(decision);
    clearDraft();
    router.push("/done");
  };

  if (!draft) {
    return (
      <AppShell backHref="/">
        <p className="mb-6 text-center font-bold text-muted">
          決める内容がまだないよ。
        </p>
        <PrimaryButton href="/">ホームへ</PrimaryButton>
      </AppShell>
    );
  }

  const remaining = MAX_REROLLS - rerollsUsed;
  const canReroll = phase === "landed" && remaining > 0;

  return (
    <AppShell backHref="/">
      <p className="mb-2 text-center text-sm font-bold text-muted">いま決めること</p>
      <h1 className="mb-8 text-center text-2xl font-black">{draft.title}</h1>

      <Roulette
        options={draft.options}
        spinning={phase === "spinning"}
        result={chosen}
        onSpinEnd={handleSpinEnd}
      />

      <div className="mt-auto flex flex-col gap-3 pt-10">
        {phase === "idle" ? (
          <>
            <PrimaryButton onClick={spin}>決めちゃお</PrimaryButton>
            <PrimaryButton variant="secondary" onClick={() => router.push("/custom")}>
              直す
            </PrimaryButton>
          </>
        ) : null}

        {phase === "spinning" ? (
          <PrimaryButton disabled>抽選中…</PrimaryButton>
        ) : null}

        {phase === "landed" ? (
          <>
            <PrimaryButton onClick={commit}>これで決まり</PrimaryButton>
            {canReroll ? (
              <PrimaryButton variant="secondary" onClick={reroll}>
                もう一回（あと{remaining}回）
              </PrimaryButton>
            ) : (
              <p className="text-center text-sm font-bold text-muted">
                やり直しはここまで。決めちゃおう。
              </p>
            )}
          </>
        ) : null}
      </div>
    </AppShell>
  );
}
