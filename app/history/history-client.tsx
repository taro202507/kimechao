"use client";

import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { formatDecidedAt } from "@/lib/format";
import { loadHistory } from "@/lib/storage";

export default function HistoryClient() {
  const [items] = useState(() => loadHistory());

  return (
    <AppShell backHref="/">
      <h1 className="mb-6 text-2xl font-black">これまでの決め</h1>

      {items.length === 0 ? (
        <p className="rounded-3xl border-2 border-dashed border-line bg-card px-5 py-10 text-center font-bold text-muted">
          まだ何も決めてないよ。
          <br />
          決めちゃお。
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="rounded-3xl border-2 border-line bg-card px-5 py-4"
            >
              <p className="text-xs font-bold text-muted">
                {formatDecidedAt(item.decidedAt)}
              </p>
              <p className="mt-1 text-sm font-bold text-muted">{item.title}</p>
              <p className="text-xl font-black">{item.chosen}</p>
            </li>
          ))}
        </ul>
      )}
    </AppShell>
  );
}
