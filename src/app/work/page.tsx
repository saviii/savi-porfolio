import BlurFade from "@/components/magicui/blur-fade";
import { WORK } from "@/data/work";
import { cn, TILE_COLORS } from "@/lib/utils";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Work",
  description: "Case studies from a decade of building consumer products.",
};

export default function WorkPage() {
  return (
    <div>
      <header className="mb-10 mt-6 max-w-3xl">
        <p className="eyebrow">Work</p>
        <h1 className="mt-2 font-display text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl">
          Things I&apos;ve helped <span className="italic text-tomato">ship</span>.
        </h1>
        <p className="mt-4 text-lg text-foreground/70">
          A decade of consumer products across news, finance, and mobile. Each
          one comes down to the problem, what we did, and what happened.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {WORK.map((w, i) => (
          <BlurFade key={w.slug} delay={i * 0.05}>
            <Link
              href={`/work/${w.slug}`}
              className={cn(
                "tile tile-hover group flex h-full min-h-[280px] flex-col justify-between",
                TILE_COLORS[w.color],
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <p className="eyebrow !text-current opacity-70">
                  {w.company} · {w.years}
                </p>
                {w.inProgress && <span className="sticker !text-ink">in progress</span>}
              </div>
              <div className="mt-8">
                {w.metric && (
                  <p className="font-display text-5xl font-semibold tracking-tight">
                    {w.metric.value}{" "}
                    <span className="text-base font-normal opacity-70">
                      {w.metric.label}
                    </span>
                  </p>
                )}
                <h2 className="mt-2 font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                  {w.title}
                </h2>
                <p className="mt-2 opacity-75">{w.blurb}</p>
                <p className="mt-4 text-sm font-medium">
                  Read the case study{" "}
                  <span className="inline-block transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </p>
              </div>
            </Link>
          </BlurFade>
        ))}
      </div>
    </div>
  );
}
