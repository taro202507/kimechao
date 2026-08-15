"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { PrimaryButton } from "@/components/PrimaryButton";
import { MAX_OPTIONS, MIN_OPTIONS } from "@/lib/constants";
import { saveDraft } from "@/lib/session";

export default function CustomPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [error, setError] = useState("");

  const filled = options.map((option) => option.trim()).filter(Boolean);
  const canSubmit = title.trim().length > 0 && filled.length >= MIN_OPTIONS;

  const updateOption = (index: number, value: string) => {
    setOptions((current) =>
      current.map((option, i) => (i === index ? value : option)),
    );
  };

  const addOption = () => {
    if (options.length >= MAX_OPTIONS) return;
    setOptions((current) => [...current, ""]);
  };

  const removeOption = (index: number) => {
    if (options.length <= MIN_OPTIONS) return;
    setOptions((current) => current.filter((_, i) => i !== index));
  };

  const start = () => {
    if (!canSubmit) {
      setError("タイトルと、選択肢を2つ以上入れてね");
      return;
    }
    saveDraft({
      title: title.trim(),
      options: filled,
    });
    router.push("/decide");
  };

  return (
    <AppShell backHref="/">
      <h1 className="mb-6 text-2xl font-black">自分で作る</h1>

      <label className="mb-5 block">
        <span className="mb-2 block text-sm font-bold text-muted">なにを決める？</span>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="例: 今夜のおやつ"
          className="w-full rounded-2xl border-2 border-line bg-card px-4 py-3 text-base font-bold outline-none focus:border-accent"
        />
      </label>

      <div className="mb-4 flex flex-col gap-3">
        <span className="text-sm font-bold text-muted">選択肢</span>
        {options.map((option, index) => (
          <div key={index} className="flex gap-2">
            <input
              value={option}
              onChange={(event) => updateOption(index, event.target.value)}
              placeholder={`選択肢 ${index + 1}`}
              className="w-full rounded-2xl border-2 border-line bg-card px-4 py-3 text-base font-bold outline-none focus:border-accent"
            />
            {options.length > MIN_OPTIONS ? (
              <button
                type="button"
                onClick={() => removeOption(index)}
                className="shrink-0 rounded-2xl px-3 text-sm font-bold text-muted hover:text-accent"
                aria-label={`${index + 1}番目の選択肢を消す`}
              >
                消す
              </button>
            ) : null}
          </div>
        ))}
      </div>

      {options.length < MAX_OPTIONS ? (
        <button
          type="button"
          onClick={addOption}
          className="mb-6 text-left text-sm font-bold text-accent"
        >
          ＋ 選択肢を足す
        </button>
      ) : (
        <p className="mb-6 text-sm font-bold text-muted">選択肢は{MAX_OPTIONS}個まで</p>
      )}

      {error ? (
        <p className="mb-4 text-sm font-bold text-accent">{error}</p>
      ) : null}

      <PrimaryButton onClick={start} disabled={!canSubmit}>
        この内容で決めちゃお
      </PrimaryButton>
    </AppShell>
  );
}
