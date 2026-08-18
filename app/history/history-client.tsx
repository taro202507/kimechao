"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { addPin, isPinned } from "@/lib/pins";
import { saveDraft } from "@/lib/session";
import { loadHistory, removeDecision } from "@/lib/storage";
import type { Decision } from "@/lib/types";

export default function HistoryClient() {
  const router = useRouter();
  const [items, setItems] = useState(() => loadHistory());
  const [notice, setNotice] = useState("");

  const replay = (item: Decision) => {
    saveDraft({ title: item.title, options: item.options });
    router.push("/decide");
  };

  const pin = (item: Decision) => {
    const result = addPin({ title: item.title, options: item.options });
    if (result === "ok") {
      setNotice("よくある決めに追加したよ");
      return;
    }
    if (result === "duplicate") {
      setNotice("もう追加済みだよ");
      return;
    }
    setNotice("よくある決めは3つまで。ホームで1つ外してね");
  };

  const remove = (item: Decision) => {
    const next = removeDecision(item.id) ?? [];
    setItems(next);
    setNotice("1件消したよ");
  };

  return (
    <AppShell backHref="/">
      <h1 className="mb-3 text-2xl font-black">これまでの決め</h1>

      {notice ? (
        <p className="mb-3 rounded-2xl bg-card px-4 py-2 text-center text-sm font-bold text-accent">
          {notice}
        </p>
      ) : null}

      {items.length === 0 ? (
        <p className="rounded-3xl border-2 border-dashed border-line bg-card px-5 py-10 text-center font-bold text-muted">
          まだ何も決めてないよ。
          <br />
          決めちゃお。
        </p>
      ) : (
        <ul className="flex flex-col gap-1.5">
          {items.map((item) => {
            const pinned = isPinned(item);
            return (
              <li key={item.id}>
                <div className="flex items-start gap-2 rounded-2xl border-2 border-line bg-card px-3 py-2">
                  <button
                    type="button"
                    onClick={() => replay(item)}
                    className="min-w-0 flex-1 text-left"
                  >
                    <span className="line-clamp-2 text-sm font-bold text-muted">
                      {item.title}
                    </span>
                    <span className="mt-0.5 line-clamp-2 block font-black">
                      {item.chosen}
                    </span>
                  </button>
                  <div className="mt-0.5 flex shrink-0 flex-col items-end">
                    <button
                      type="button"
                      disabled={pinned}
                      onClick={() => pin(item)}
                      className="rounded-full px-3 py-1 text-xs font-bold text-accent disabled:text-muted"
                    >
                      {pinned ? "追加済み" : "追加"}
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(item)}
                      className="rounded-full px-3 py-1 text-xs font-bold text-muted hover:text-accent"
                    >
                      消す
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </AppShell>
  );
}
