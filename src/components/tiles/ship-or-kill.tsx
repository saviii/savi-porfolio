"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type Verdict = "ship" | "kill";

// Feature pitches plus my take. Edit freely.
const PITCHES: { pitch: string; take: Verdict; why: string }[] = [
  {
    pitch: "An AI chatbot in the corner of every screen",
    take: "kill",
    why: "A chat box isn't a strategy. Put the AI where the work already happens.",
  },
  {
    pitch: "Daily digest push at 8am, for everyone",
    take: "kill",
    why: "One schedule for millions of people is a schedule for no one.",
  },
  {
    pitch: "Let users mute topics they never want to see",
    take: "ship",
    why: "Negative signals are the cheapest personalization you'll ever get.",
  },
  {
    pitch: "Dark mode, because three people asked on Twitter",
    take: "ship",
    why: "Cheap, loved, and someone will thank you at 1am. Just ship it.",
  },
  {
    pitch: "Redesign the whole app before fixing onboarding",
    take: "kill",
    why: "If people bounce on day one, a prettier day thirty won't matter.",
  },
  {
    pitch: "Show why an article was recommended to you",
    take: "ship",
    why: "Explainability builds trust, and trust builds retention.",
  },
];

export function ShipOrKill() {
  const [index, setIndex] = useState(0);
  const [vote, setVote] = useState<Verdict | null>(null);
  const [agreed, setAgreed] = useState(0);

  const done = index >= PITCHES.length;
  const current = PITCHES[index];

  function cast(v: Verdict) {
    if (vote) return;
    setVote(v);
    if (v === current.take) setAgreed((a) => a + 1);
  }

  function next() {
    setVote(null);
    setIndex((i) => i + 1);
  }

  function reset() {
    setIndex(0);
    setVote(null);
    setAgreed(0);
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <p className="eyebrow !text-card/70">A tiny game</p>
        <p className="font-mono text-[11px] text-card/70">
          {done ? "fin" : `${index + 1}/${PITCHES.length}`}
        </p>
      </div>
      <h3 className="mt-2 font-display text-3xl font-semibold leading-none tracking-tight">
        Ship it or kill it?
      </h3>

      <div className="relative mt-5 flex-1">
        <AnimatePresence mode="wait">
          {done ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex h-full flex-col justify-between gap-4"
            >
              <p className="font-display text-2xl leading-snug">
                You agreed with me {agreed} out of {PITCHES.length} times.{" "}
                {agreed >= 5
                  ? "Let's build something together."
                  : agreed >= 3
                    ? "Healthy tension. Every good team needs it."
                    : "Bold. Let's argue about it over coffee."}
              </p>
              <button
                onClick={reset}
                className="self-start rounded-full bg-card px-4 py-2 text-sm font-medium text-ink transition-transform hover:-rotate-2"
              >
                Play again ↺
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={index}
              initial={{ opacity: 0, rotate: -2, y: 12 }}
              animate={{ opacity: 1, rotate: 0, y: 0 }}
              exit={{ opacity: 0, rotate: 2, y: -12 }}
              transition={{ duration: 0.25 }}
              className="flex h-full flex-col justify-between gap-4"
            >
              <div className="rounded-2xl bg-card p-4 text-ink shadow-lg">
                <p className="eyebrow">The pitch</p>
                <p className="mt-1 text-lg font-medium leading-snug">
                  {current.pitch}
                </p>
                {vote && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-3 border-t border-dashed border-ink/20 pt-3 text-sm text-ink/70"
                  >
                    <span className="font-semibold text-ink">
                      My take: {current.take === "ship" ? "ship it 🚀" : "kill it 🪦"}.
                    </span>{" "}
                    {current.why}
                  </motion.p>
                )}
              </div>
              {vote ? (
                <button
                  onClick={next}
                  className="self-start rounded-full bg-ink px-4 py-2 text-sm font-medium text-card"
                >
                  {index === PITCHES.length - 1 ? "See results →" : "Next pitch →"}
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => cast("ship")}
                    className="flex-1 rounded-full bg-card px-4 py-2 text-sm font-semibold text-ink transition-transform hover:-rotate-2 hover:scale-105"
                  >
                    Ship it 🚀
                  </button>
                  <button
                    onClick={() => cast("kill")}
                    className="flex-1 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-card transition-transform hover:rotate-2 hover:scale-105"
                  >
                    Kill it 🪦
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
