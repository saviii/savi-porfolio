"use client";

import { useTheme } from "@/components/theme-provider";
import { PALETTES } from "@/lib/theme";

export function RecolorTile() {
  const { palette, mode, nextPalette, setPalette } = useTheme();
  const i = PALETTES.findIndex((p) => p.id === palette);
  const current = PALETTES[i];
  const hex = mode === "dark" ? current.dark : current.light;

  return (
    <div className="flex h-full flex-col gap-3 p-3.5">
      <div className="eyebrow flex justify-between px-1.5 pt-2.5">
        <span>04 · Recolor everything</span>
        <span>
          {String(i + 1).padStart(2, "0")} / {String(PALETTES.length).padStart(2, "0")}
        </span>
      </div>
      <button
        type="button"
        onClick={nextPalette}
        aria-label="Change the site's color scheme"
        className="flex min-h-[180px] flex-1 flex-col justify-between rounded-[14px] bg-accent p-[22px] text-left text-accent-foreground transition-colors duration-500"
      >
        <span className="flex w-full justify-between font-mono text-[11px] tracking-[0.12em]">
          <span>TAP</span>
          <span>{hex}</span>
        </span>
        <span className="flex flex-col gap-2">
          <span className="text-[60px] font-bold leading-[0.95] tracking-[-0.04em]">{current.name}</span>
          <span className="text-sm opacity-85">{current.line}</span>
        </span>
      </button>
      <div className="grid grid-cols-6 gap-1.5">
        {PALETTES.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setPalette(p.id)}
            aria-label={`Use the ${p.name} colors`}
            aria-pressed={p.id === palette}
            className="h-8 rounded-lg border-2"
            style={{
              background: mode === "dark" ? p.dark : p.light,
              borderColor: p.id === palette ? "hsl(var(--foreground))" : "transparent",
            }}
          />
        ))}
      </div>
    </div>
  );
}
