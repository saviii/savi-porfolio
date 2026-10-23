import { SITE } from "@/data/site";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: SITE.description,
};

export default function AboutPage() {
  return (
    <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <div className="relative">
        <div className="tile sticky top-28 rotate-[-1.5deg] bg-butter p-3">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(var(--radius)-6px)]">
            <Image
              src={SITE.avatarUrl}
              alt={SITE.name}
              fill
              sizes="(min-width: 1024px) 420px, 100vw"
              className="object-cover"
            />
          </div>
          <p className="px-2 pb-1 pt-3 font-mono text-[11px] uppercase tracking-wider text-foreground/60">
            {SITE.name} · {SITE.location}
          </p>
        </div>
      </div>

      <div>
        <p className="eyebrow">About</p>
        <h1 className="mt-2 font-display text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl">
          PM by trade, <span className="italic text-tomato">tinkerer</span> by nature.
        </h1>

        <div className="mt-8 space-y-5 text-lg leading-relaxed text-foreground/80">
          <p>
            I&apos;ve spent 10+ years building consumer products end to end, from
            an Android launcher that grew from 30k to 400k daily users, to the
            Medium mobile apps, to GenAI-powered ranking at SmartNews. Today
            I&apos;m a {SITE.role} at {SITE.company}, leading the core platform
            that other products are built on.
          </p>
          <p>
            I started out in QA at DirecTV, which taught me that the details are
            the product. These days I&apos;m most excited about generative AI,
            not as a feature to bolt on, but as infrastructure that changes what
            products can understand about people.
          </p>
          <p>
            Outside of work you&apos;ll find me walking the dog, poking at new
            tools, and writing half-formed thoughts in my{" "}
            <Link href="/notes" className="underline decoration-tomato decoration-2 underline-offset-4">
              notes
            </Link>
            .
          </p>
        </div>

        <h2 className="mt-14 font-display text-3xl font-semibold tracking-tight">
          The path so far
        </h2>
        <ol className="mt-6 border-l-2 border-dashed border-foreground/20">
          {SITE.experience.map((job, i) => (
            <li key={job.company} className="relative pb-8 pl-8 last:pb-0">
              <span
                className={`absolute -left-[9px] top-1.5 size-4 rounded-full border-2 border-background ${i === 0 ? "bg-tomato" : "bg-foreground/30"}`}
              />
              <p className="font-mono text-[11px] uppercase tracking-wider text-foreground/50">
                {job.period}
              </p>
              <p className="font-display text-xl font-semibold tracking-tight">
                {job.company}
              </p>
              <p className="text-foreground/70">{job.title}</p>
            </li>
          ))}
        </ol>

        <div className="tile mt-14 bg-ink text-card">
          <p className="eyebrow !text-card/60">Say hello</p>
          <p className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight">
            Always happy to talk products, AI, or dogs.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <a
              href={`mailto:${SITE.email}`}
              className="rounded-full bg-tomato px-4 py-2 text-sm font-medium text-card hover:opacity-90"
            >
              Email me
            </a>
            {SITE.socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-card/25 px-4 py-2 text-sm font-medium hover:bg-card hover:text-ink"
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
