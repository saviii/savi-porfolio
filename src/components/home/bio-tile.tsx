"use client";

import { useTheme } from "@/components/theme-provider";
import { SITE } from "@/data/site";
import { PALETTES, PORTRAIT_BG, portraitFor } from "@/lib/theme";
import { cn } from "@/lib/utils";
import Image from "next/image";

const KINDS = ["light", "dark", "blue"] as const;

export function BioTile() {
  const { palette, mode, changes } = useTheme();
  const current = portraitFor(palette, mode);
  const name = PALETTES.find((p) => p.id === palette)?.name ?? "";
  // Alternate class names so the swap effect replays on every change.
  const swap = changes ? (changes % 2 ? "a" : "b") : null;

  return (
    <div className="flex h-full flex-col gap-4 p-3.5">
      <div
        className="relative min-h-[320px] flex-1 overflow-hidden rounded-xl transition-colors duration-300"
        style={{ background: PORTRAIT_BG[current] }}
      >
        <div className={cn("absolute inset-0", swap && `glitch-${swap}`)}>
          {KINDS.map((kind) => (
            <Image
              key={kind}
              src={SITE.portraits[kind]}
              alt={kind === current ? `Illustrated portrait of ${SITE.name}` : ""}
              fill
              priority={kind === current}
              draggable={false}
              sizes="(min-width: 1024px) 500px, 100vw"
              className="pointer-events-none object-contain transition-opacity duration-300"
              style={{
                opacity: kind === current ? 1 : 0,
                filter:
                  palette === "mono" ? "grayscale(1)" : kind === "blue" && palette === "ultraviolet" ? "hue-rotate(30deg)" : undefined,
              }}
            />
          ))}
        </div>
        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 -top-[12%] h-[9%] opacity-0 mix-blend-screen",
            swap && `scan-${swap}`,
          )}
          style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--accent)), transparent)" }}
        />
        <div
          className={cn(
            "absolute inset-x-3 bottom-3 flex justify-between font-mono text-[10px] tracking-[0.12em]",
            current === "light" ? "text-neutral-800" : "text-white [text-shadow:0_1px_6px_rgba(0,0,0,.7)]",
          )}
        >
          <span>SAVI · SAN FRANCISCO</span>
          <span>{name.toUpperCase()} EDITION</span>
        </div>
      </div>

      <div className="flex flex-col gap-3.5 px-2 pb-1.5 pt-1">
        <p className="text-[22px] font-medium leading-[1.3] tracking-[-0.015em]">
          {SITE.role.replace("Product Manager", "PM")} at {SITE.company}, building AlphaSpace.
        </p>
        <div className="flex flex-wrap gap-1.5">
          {SITE.socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center rounded-full border border-border px-3.5 text-[13px] hover:text-accent"
            >
              {s.name} ↗
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
