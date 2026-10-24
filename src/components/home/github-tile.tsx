"use client";

import type { GitHubData, GitHubDay } from "@/data/github";
import { useState } from "react";

const OPACITY = [1, 0.3, 0.55, 0.8, 1];
const MIN_SHADE = 0.16;

// GitHub's own 5 levels lump 1-54 contributions together, so shade by the real count
// instead: log scale, capped at a typical busy day so one outlier doesn't flatten the rest.
function shader(days: GitHubDay[]) {
  const counts = days.map((d) => d.count ?? 0).filter((c) => c > 0).sort((a, b) => a - b);
  const cap = counts.length ? counts[Math.floor(counts.length * 0.95) - (counts.length > 1 ? 1 : 0)] : 1;
  return (d: GitHubDay) => {
    if (d.count === null) return OPACITY[d.level];
    if (d.count === 0) return 1;
    const t = Math.min(1, Math.log1p(d.count) / Math.log1p(Math.max(cap, 2)));
    return MIN_SHADE + (1 - MIN_SHADE) * t;
  };
}

const LEGEND = [0, 0.25, 0.5, 0.75, 1];

const fmt = (date: string, opts: Intl.DateTimeFormatOptions) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", { ...opts, timeZone: "UTC" });

function label(d: GitHubDay) {
  const day = fmt(d.date, { month: "short", day: "numeric" });
  if (d.count !== null) return `${day} · ${d.count} contribution${d.count === 1 ? "" : "s"}`;
  return `${day} · ${["quiet", "a little", "some", "a lot", "a ton"][d.level]}`;
}

export function GitHubTile({ user, data }: { user: string; data: GitHubData }) {
  const [hover, setHover] = useState(-1);
  const shade = shader(data.days);
  const year = data.year;
  const profile = `https://github.com/${user}`;

  return (
    <div className="flex h-full flex-col gap-[18px] p-[22px]">
      <div className="eyebrow flex items-center justify-between">
        <span>02 · GitHub</span>
        <a href={profile} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
          @{user} ↗
        </a>
      </div>

      <div className="grid flex-1 grid-cols-1 gap-6 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <div className="flex min-w-0 flex-col gap-3">
          {year && (
            <p className="text-[15px] leading-[1.45]">
              {year.total.toLocaleString("en-US")} contributions in the last year.
            </p>
          )}
          <div
            onMouseLeave={() => setHover(-1)}
            className="grid gap-[3px] [grid-auto-columns:minmax(0,1fr)] [grid-auto-flow:column] [grid-template-rows:repeat(7,12px)]"
          >
            {data.days.map((d, i) => (
              <span
                key={d.date}
                onMouseEnter={() => setHover(i)}
                className="cell rounded-[3px]"
                style={{
                  background: d.level || d.count ? "hsl(var(--accent))" : "hsl(var(--muted))",
                  opacity: shade(d),
                }}
              />
            ))}
          </div>
          <div className="flex flex-wrap justify-between gap-3 font-mono">
            <span className="text-[11px]">
              {hover >= 0
                ? label(data.days[hover])
                : data.live
                  ? "Hover a day"
                  : "GitHub is napping. Back soon."}
            </span>
            <span className="flex items-center gap-[3px] text-[10px] text-muted-foreground">
              <span className="mr-1">less</span>
              {LEGEND.map((t) => (
                <span
                  key={t}
                  className="size-2.5 rounded-sm"
                  style={{
                    background: t ? "hsl(var(--accent))" : "hsl(var(--muted))",
                    opacity: t ? MIN_SHADE + (1 - MIN_SHADE) * t : 1,
                  }}
                />
              ))}
              <span className="ml-1">more</span>
            </span>
          </div>

          {year && (
            <dl className="mt-auto grid grid-cols-3 gap-2 border-t border-border pt-4">
              {[
                {
                  label: "Busiest day",
                  value: year.busiest ? year.busiest.count.toLocaleString("en-US") : "—",
                  note: year.busiest ? fmt(year.busiest.date, { month: "short", day: "numeric" }) : "",
                },
                { label: "Longest streak", value: String(year.longestStreak), note: "days in a row" },
                { label: "Active days", value: String(year.activeDays), note: `of ${year.totalDays}` },
              ].map((s) => (
                <div key={s.label} className="flex flex-col gap-1">
                  <dt className="eyebrow">{s.label}</dt>
                  <dd className="text-[28px] font-semibold leading-none tracking-[-0.03em]">{s.value}</dd>
                  <dd className="font-mono text-[11px] text-muted-foreground">{s.note}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        <div className="flex flex-col">
          <span className="eyebrow mb-1.5">Repos</span>
          {(data.repos.length ? data.repos : [{ name: `${user}`, description: "Profile", stars: 0, url: profile }]).map(
            (r, i, all) => (
              <a
                key={r.name}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-1 flex-col justify-center gap-[3px] border-t border-border py-[11px] hover:text-accent ${i === all.length - 1 ? "border-b" : ""}`}
              >
                <span className="flex justify-between gap-3">
                  <span className="font-mono text-[13px]">{r.name}</span>
                  <span className="font-mono text-[11px] text-muted-foreground">★ {r.stars}</span>
                </span>
                {r.description && <span className="text-xs text-muted-foreground">{r.description}</span>}
              </a>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
