"use client";

import { useEffect, useRef, useState } from "react";

const ROUTE =
  "M40 165 C 28 100, 80 80, 70 48 S 160 14, 196 46 S 262 82, 230 136 S 140 192, 104 166 S 50 182, 40 165 Z";
const HOME = { x: 40, y: 165 };
const SPOTS: [number, number][] = [
  [205, 78],
  [118, 72],
  [186, 142],
  [92, 118],
];
const LINES = ["Got it!", "Again! Again!", "Best. Throw. Ever.", "Who's a good boy? Me.", "Zoomies!"];
const HEARTS: [number, number, number][] = [
  [-22, -34, 0],
  [18, -40, 60],
  [-8, -50, 120],
  [26, -20, 40],
  [-28, -14, 90],
  [6, -30, 150],
];

type Thought = { text: string; link: string; href: string };

type Phase = "idle" | "throw" | "zoom" | "proud" | "return";

export function LoopTile({ thoughts }: { thoughts: Thought[] }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [dogAt, setDogAt] = useState({ x: 0, y: 0 });
  const [dogTr, setDogTr] = useState("none");
  const [fetches, setFetches] = useState(0);
  const [thought, setThought] = useState(-1);
  const [line, setLine] = useState("");
  const [target, setTarget] = useState<[number, number]>(SPOTS[0]);
  const mapRef = useRef<HTMLDivElement>(null);
  const dogRef = useRef<HTMLButtonElement>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  const throwBall = () => {
    if (phase !== "idle" || !mapRef.current || !dogRef.current) return;
    const mr = mapRef.current.getBoundingClientRect();
    const dr = dogRef.current.getBoundingClientRect();
    const scale = mr.width / 280 || 1;
    // Where the dog is on its walk right now, so it can leave and come back to it.
    const start = { x: (dr.left - mr.left) / scale + 20, y: (dr.top - mr.top) / scale + 20 };
    const tg = SPOTS[fetches % SPOTS.length];
    setTarget(tg);
    setLine(LINES[fetches % LINES.length]);
    setDogAt(start);
    setDogTr("none");
    setPhase("throw");
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setDogAt({ x: tg[0], y: tg[1] });
        setDogTr("left .75s cubic-bezier(.5,0,.3,1), top .75s cubic-bezier(.5,0,.3,1)");
      }),
    );
    timers.current.forEach(window.clearTimeout);
    timers.current = [
      window.setTimeout(() => setPhase("zoom"), 800),
      window.setTimeout(() => {
        setPhase("proud");
        setThought((t) => (t + 1) % thoughts.length);
        setFetches((f) => f + 1);
      }, 1900),
      window.setTimeout(() => {
        setPhase("return");
        setDogAt(start);
        setDogTr("left .9s ease-in-out, top .9s ease-in-out");
      }, 4300),
      window.setTimeout(() => setPhase("idle"), 5250),
    ];
  };

  const away = phase !== "idle";
  const body =
    phase === "zoom" ? "zoomies" : phase === "proud" ? "wag" : phase === "throw" || phase === "return" ? "bob run" : "bob";
  const fetched = thought >= 0 ? thoughts[thought] : null;

  return (
    <div className="flex h-full flex-col gap-3 p-[22px]">
      <div className="eyebrow">03 · The loop</div>
      <div className="min-h-16">
        {fetched ? (
          <div
            key={thought}
            className="pop flex flex-col gap-1 rounded-[14px_14px_14px_4px] border border-border bg-background px-3 py-2.5"
          >
            <span className="eyebrow">Fetched you a thought</span>
            <span className="text-sm font-medium leading-[1.35]">{fetched.text}</span>
            {fetched.href ? (
              <a href={fetched.href} className="text-xs text-muted-foreground hover:text-accent">
                {fetched.link}
              </a>
            ) : (
              <span className="text-xs text-muted-foreground">{fetched.link}</span>
            )}
          </div>
        ) : (
          <p className="text-sm leading-[1.45] text-muted-foreground">Click the dog. He fetches.</p>
        )}
      </div>

      <div ref={mapRef} className="loop-map">
        <svg width="280" height="200" viewBox="0 0 280 200" aria-hidden="true" className="absolute inset-0">
          <path d={ROUTE} fill="none" stroke="hsl(var(--muted))" strokeWidth="16" strokeLinecap="round" />
          <path className="trail" d={ROUTE} fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" />
          <rect x="28" y="153" width="24" height="24" rx="6" fill="hsl(var(--foreground))" />
          <path d="M33 165 l7 -6 l7 6 v7 h-14 z" fill="hsl(var(--card))" />
          <circle cx="150" cy="105" r="16" fill="hsl(var(--muted))" />
          <circle cx="144" cy="101" r="7" fill="hsl(var(--border))" />
          <circle cx="157" cy="110" r="5" fill="hsl(var(--border))" />
        </svg>

        {phase === "throw" && (
          <span
            className="ball-x absolute"
            style={
              {
                left: HOME.x - 5,
                top: HOME.y - 5,
                "--bx": `${target[0] - HOME.x}px`,
                "--by": `${target[1] - HOME.y}px`,
              } as React.CSSProperties
            }
          >
            <span className="ball-y block size-[11px] rounded-full bg-accent shadow-[inset_-2px_-2px_0_rgba(0,0,0,.25)]" />
          </span>
        )}

        <button
          ref={dogRef}
          type="button"
          onClick={throwBall}
          aria-label="Throw the ball for the dog"
          className="dog z-[2] -ml-5 -mt-5 size-10 cursor-pointer border-0 bg-transparent p-0"
          style={{
            animationPlayState: away ? "paused" : "running",
            ...(away ? { offsetPath: "none", left: dogAt.x, top: dogAt.y, transition: dogTr } : {}),
          }}
        >
          <span className={body}>
            <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
              <ellipse cx="9" cy="17" rx="6" ry="10" transform="rotate(20 9 17)" fill="hsl(var(--foreground))" />
              <ellipse cx="31" cy="17" rx="6" ry="10" transform="rotate(-20 31 17)" fill="hsl(var(--foreground))" />
              <circle cx="20" cy="21" r="13" fill="hsl(var(--accent))" />
              <ellipse cx="20" cy="27" rx="7" ry="5" fill="hsl(var(--card))" />
              <circle cx="15" cy="19" r="2" fill="hsl(var(--background))" />
              <circle cx="25" cy="19" r="2" fill="hsl(var(--background))" />
              <ellipse cx="20" cy="24.5" rx="2.6" ry="2" fill="hsl(var(--background))" />
              <path d="M18 29 q2 4 4 0" fill="#FF7A9A" />
            </svg>
          </span>
        </button>

        {phase === "zoom" &&
          HEARTS.map(([dx, dy, delay], i) => (
            <span
              key={i}
              className="heart text-accent"
              style={
                {
                  left: target[0],
                  top: target[1] - 8,
                  "--dx": `${dx}px`,
                  "--dy": `${dy}px`,
                  animationDelay: `${delay}ms`,
                } as React.CSSProperties
              }
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 21s-8-5.5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.5-8 11-8 11z" />
              </svg>
            </span>
          ))}

        {(phase === "zoom" || phase === "proud") && (
          <span
            className="pointer-events-none absolute z-[4] -translate-x-1/2"
            style={{ left: target[0], top: target[1] - 52 }}
          >
            <span className="pop block whitespace-nowrap rounded-[10px] bg-foreground px-2.5 py-1.5 font-mono text-[11px] text-background">
              {line}
            </span>
          </span>
        )}
      </div>

      <div className="mt-auto flex items-center justify-between gap-3">
        <span className="font-mono text-[11px] text-muted-foreground">
          {fetches ? `${fetches} fetched · good boy` : "0 fetched"}
        </span>
        <button
          type="button"
          onClick={throwBall}
          className="h-10 rounded-full border border-border px-4 text-[13px] hover:border-muted-foreground"
        >
          Throw the ball
        </button>
      </div>
    </div>
  );
}
