"use client";

import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { PrimaryButton } from "@/components/PrimaryButton";
import { presets } from "@/lib/presets";
import { saveDraft } from "@/lib/session";

export default function HomePage() {
  const router = useRouter();

  const startPreset = (index: number) => {
    const preset = presets[index];
    saveDraft(preset);
    router.push("/decide");
  };

  return (
    <AppShell>
      <section className="mb-8 text-center">
        <p className="mb-2 text-sm font-bold text-muted">迷ったら、ここで終わり。</p>
        <h1 className="text-4xl font-black tracking-tight">決めちゃお</h1>
      </section>

      <section className="flex flex-1 flex-col gap-3">
        <h2 className="text-sm font-bold text-muted">よくある決め</h2>
        {presets.map((preset, index) => (
          <button
            key={preset.title}
            type="button"
            onClick={() => startPreset(index)}
            className="rounded-3xl border-2 border-line bg-card px-5 py-4 text-left shadow-sm transition hover:border-accent"
          >
            <p className="text-lg font-black">{preset.title}</p>
            <p className="mt-1 text-sm font-bold text-muted">
              {preset.options.join(" / ")}
            </p>
          </button>
        ))}
      </section>

      <div className="mt-8 flex flex-col gap-3">
        <PrimaryButton href="/custom">自分で作る</PrimaryButton>
        <PrimaryButton href="/history" variant="secondary">
          これまでの決め
        </PrimaryButton>
      </div>
    </AppShell>
  );
}
