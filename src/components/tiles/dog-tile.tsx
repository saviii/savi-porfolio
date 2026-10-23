"use client";

import { useState } from "react";

// Swap in a real photo (e.g. /dog.jpg) and name when you have them.
const DOG = { name: "The dog", title: "Chief Walking Officer", photo: "" };

export function DogTile() {
  const [treats, setTreats] = useState(0);
  const [wiggle, setWiggle] = useState(false);

  function giveTreat() {
    setTreats((t) => t + 1);
    setWiggle(true);
  }

  return (
    <div className="flex h-full flex-col">
      <p className="eyebrow">Direct report</p>
      <button
        onClick={giveTreat}
        onAnimationEnd={() => setWiggle(false)}
        aria-label="Give the dog a treat"
        className={`my-3 grid flex-1 place-items-center ${wiggle ? "animate-wiggle" : ""}`}
      >
        {DOG.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={DOG.photo}
            alt={DOG.name}
            className="aspect-square w-full max-w-[160px] rounded-2xl object-cover"
          />
        ) : (
          <span className="text-7xl drop-shadow-sm transition-transform hover:scale-110">
            🐕
          </span>
        )}
      </button>
      <p className="font-display text-xl font-semibold leading-tight">
        {DOG.name}
      </p>
      <p className="text-sm text-foreground/70">{DOG.title}</p>
      <p className="mt-2 font-mono text-[11px] text-foreground/60">
        {treats === 0
          ? "Tap for a treat →"
          : `${treats} treat${treats === 1 ? "" : "s"} given. ${treats >= 10 ? "Okay, that's enough." : "Good dog."}`}
      </p>
    </div>
  );
}
