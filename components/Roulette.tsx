"use client";

import { useEffect, useState } from "react";

const SPIN_DURATION_MS = 1600;

export function Roulette({
  options,
  spinning,
  result,
  onSpinEnd,
}: {
  options: string[];
  spinning: boolean;
  result: string | null;
  onSpinEnd: () => void;
}) {
  const [spinLabel, setSpinLabel] = useState(options[0] ?? "");

  useEffect(() => {
    if (!spinning || !result || options.length === 0) return;

    const start = Date.now();
    let index = Math.floor(Math.random() * options.length);
    let timeoutId = 0;

    const tick = () => {
      const elapsed = Date.now() - start;
      const t = Math.min(elapsed / SPIN_DURATION_MS, 1);

      if (t >= 1) {
        setSpinLabel(result);
        onSpinEnd();
        return;
      }

      index = (index + 1) % options.length;
      setSpinLabel(options[index]);
      timeoutId = window.setTimeout(tick, 45 + 240 * t * t);
    };

    timeoutId = window.setTimeout(tick, 45);
    return () => window.clearTimeout(timeoutId);
  }, [spinning, result, options, onSpinEnd]);

  const display = spinning ? spinLabel : (result ?? options[0] ?? "");

  return (
    <div className="flex flex-col items-center gap-6">
      <div
        className={`flex min-h-36 w-full items-center justify-center rounded-3xl border-2 border-line bg-card px-4 py-8 text-center shadow-sm ${
          spinning ? "animate-pulse" : result ? "animate-pop" : ""
        }`}
      >
        <p className="text-3xl font-black leading-tight tracking-tight text-foreground">
          {display}
        </p>
      </div>
      <ul className="flex w-full flex-wrap justify-center gap-2">
        {options.map((option, index) => {
          const active = !spinning && result === option;
          return (
            <li
              key={`${option}-${index}`}
              className={`rounded-full px-3 py-1 text-sm font-bold ${
                active ? "bg-accent text-white" : "bg-white/70 text-muted"
              }`}
            >
              {option}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
