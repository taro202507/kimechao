import Link from "next/link";
import type { ReactNode } from "react";

export function AppShell({
  children,
  backHref,
}: {
  children: ReactNode;
  backHref?: string;
}) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-5 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
      <header className="mb-6 flex items-center justify-between">
        {backHref ? (
          <Link
            href={backHref}
            className="rounded-full px-2 py-1 text-sm font-bold text-muted hover:text-foreground"
          >
            ← 戻る
          </Link>
        ) : (
          <span />
        )}
        <Link href="/" className="font-black tracking-tight text-accent">
          決めちゃお
        </Link>
        <Link
          href="/settings"
          className="rounded-full px-2 py-1 text-sm font-bold text-muted hover:text-foreground"
        >
          設定
        </Link>
      </header>
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  );
}
