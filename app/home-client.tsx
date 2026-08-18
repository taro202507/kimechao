"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { PrimaryButton } from "@/components/PrimaryButton";
import { draftKey, getHomeItems, moveHomeItem, removeHomeItem } from "@/lib/pins";
import { clearDraft, saveDraft } from "@/lib/session";
import type { HomeItem } from "@/lib/types";

export default function HomeClient() {
  const router = useRouter();
  const [items, setItems] = useState<HomeItem[]>(() => getHomeItems());

  const start = (item: HomeItem) => {
    saveDraft({ title: item.title, options: item.options });
    router.push("/decide");
  };

  const remove = (item: HomeItem) => {
    removeHomeItem(item);
    setItems(getHomeItems());
  };

  const moveUp = (index: number) => {
    setItems(moveHomeItem(items, index, -1));
  };

  const openCustom = () => {
    clearDraft();
    router.push("/custom");
  };

  return (
    <AppShell>
      <section className="mb-8 text-center">
        <p className="mb-2 text-sm font-bold text-muted">迷う時間は、もう終わり。</p>
        <h1 className="text-4xl font-black tracking-tight">決めちゃお</h1>
      </section>

      <section className="flex flex-1 flex-col gap-3">
        <h2 className="text-sm font-bold text-muted">よくある決め</h2>
        {items.length === 0 ? (
          <p className="rounded-3xl border-2 border-dashed border-line bg-card px-5 py-10 text-center font-bold text-muted">
            まだないよ。
            <br />
            履歴から追加できるよ。
          </p>
        ) : (
          items.map((item, index) => (
            <div
              key={`${item.source}-${draftKey(item)}`}
              className="relative rounded-3xl border-2 border-line bg-card shadow-sm"
            >
              <button
                type="button"
                onClick={() => start(item)}
                className="w-full px-5 py-4 pr-20 text-left transition hover:border-accent"
              >
                <p className="text-lg font-black">{item.title}</p>
                <p className="mt-1 text-sm font-bold text-muted">
                  {item.options.join(" / ")}
                </p>
              </button>
              <div className="absolute right-3 top-3 flex flex-col items-end">
                <button
                  type="button"
                  onClick={() => remove(item)}
                  className="rounded-full px-2 py-1 text-xs font-bold text-muted hover:text-accent"
                  aria-label={`${item.title}をよくある決めから外す`}
                >
                  外す
                </button>
                {index > 0 ? (
                  <button
                    type="button"
                    onClick={() => moveUp(index)}
                    className="rounded-full px-2 py-1 text-xs font-bold text-muted hover:text-accent"
                    aria-label={`${item.title}を上へ`}
                  >
                    上へ
                  </button>
                ) : null}
              </div>
            </div>
          ))
        )}
      </section>

      <div className="mt-8 flex flex-col gap-3">
        <PrimaryButton onClick={openCustom}>自分で作る</PrimaryButton>
        <PrimaryButton href="/history" variant="secondary">
          これまでの決め
        </PrimaryButton>
      </div>
    </AppShell>
  );
}
