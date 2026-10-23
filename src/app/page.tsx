import BlurFade from "@/components/magicui/blur-fade";
import { DogTile } from "@/components/tiles/dog-tile";
import { ShipOrKill } from "@/components/tiles/ship-or-kill";
import { getNotes } from "@/data/notes";
import { SITE } from "@/data/site";
import { WORK } from "@/data/work";
import { cn, shortDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const D = 0.05;

export default async function Home() {
  const notes = await getNotes();
  const [latest, ...older] = notes;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-12">
      {/* Hero */}
      <BlurFade delay={0} className="md:col-span-6 lg:col-span-8">
        <section className="tile flex h-full min-h-[340px] flex-col justify-between bg-card">
          <div className="flex flex-wrap items-center gap-2">
            <span className="sticker">
              <span className="size-1.5 animate-pulse rounded-full bg-green-600" />
              {SITE.role} @ {SITE.company}
            </span>
            <span className="sticker">📍 {SITE.location}</span>
          </div>
          <div>
            <h1 className="font-display text-5xl font-semibold leading-[0.95] tracking-tight [font-variation-settings:'SOFT'_100,'WONK'_1] sm:text-6xl lg:text-7xl">
              Hi, I&apos;m {SITE.firstName}.<br />
              I build products people{" "}
              <span className="squiggle italic text-tomato">come back to</span>.
            </h1>
            <p className="mt-5 max-w-xl text-base text-foreground/70 sm:text-lg">
              {SITE.tagline}
            </p>
          </div>
        </section>
      </BlurFade>

      {/* Portrait */}
      <BlurFade delay={D} className="md:col-span-3 lg:col-span-4">
        <section className="tile group h-full min-h-[340px] bg-butter p-3">
          <div className="relative h-full overflow-hidden rounded-[calc(var(--radius)-6px)]">
            <Image
              src={SITE.avatarUrl}
              alt={SITE.name}
              fill
              priority
              sizes="(min-width: 1024px) 360px, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <span className="sticker absolute bottom-6 left-6 rotate-[-6deg] !bg-tomato !text-card">
            hi 👋
          </span>
        </section>
      </BlurFade>

      {/* Now */}
      <BlurFade delay={D * 2} className="md:col-span-3 lg:col-span-4">
        <section className="tile h-full bg-sage">
          <p className="eyebrow">Now</p>
          <ul className="mt-4 space-y-3">
            {SITE.now.map((item) => (
              <li key={item.label}>
                <p className="font-mono text-[11px] uppercase tracking-wider text-foreground/55">
                  {item.label}
                </p>
                <p className="font-medium leading-snug">{item.value}</p>
              </li>
            ))}
          </ul>
        </section>
      </BlurFade>

      {/* Latest note */}
      {latest && (
        <BlurFade delay={D * 3} className="md:col-span-4 lg:col-span-5">
          <section className="tile flex h-full flex-col bg-card">
            <div className="flex items-center justify-between">
              <p className="eyebrow">Latest thought</p>
              <Link href="/notes" className="text-sm font-medium hover:text-tomato">
                All notes →
              </Link>
            </div>
            <Link href={`/notes/${latest.slug}`} className="group mt-4 block flex-1">
              <p className="font-mono text-xs text-foreground/50">
                {shortDate(latest.metadata.publishedAt)}
              </p>
              <h2 className="mt-1 font-display text-3xl font-semibold leading-tight tracking-tight group-hover:text-tomato">
                {latest.metadata.title}
              </h2>
              {latest.metadata.summary && (
                <p className="mt-2 text-foreground/70">{latest.metadata.summary}</p>
              )}
            </Link>
            {older.length > 0 && (
              <ul className="mt-5 space-y-2 border-t border-dashed border-foreground/15 pt-4">
                {older.slice(0, 2).map((n) => (
                  <li key={n.slug}>
                    <Link
                      href={`/notes/${n.slug}`}
                      className="flex items-baseline justify-between gap-4 text-sm hover:text-tomato"
                    >
                      <span className="font-medium">{n.metadata.title}</span>
                      <span className="shrink-0 font-mono text-[11px] text-foreground/50">
                        {shortDate(n.metadata.publishedAt)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </BlurFade>
      )}

      {/* Dog */}
      <BlurFade delay={D * 4} className="md:col-span-2 lg:col-span-3">
        <section className="tile h-full bg-lilac">
          <DogTile />
        </section>
      </BlurFade>

      {/* Numbers */}
      <BlurFade delay={D * 5} className="md:col-span-6 lg:col-span-7">
        <section className="tile h-full bg-ink text-card">
          <p className="eyebrow !text-card/60">Receipts</p>
          <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-6">
            {SITE.numbers.map((n) => (
              <div key={n.label}>
                <p className="font-display text-5xl font-semibold tracking-tight text-butter">
                  {n.value}
                </p>
                <p className="mt-1 text-sm text-card/70">{n.label}</p>
              </div>
            ))}
          </div>
        </section>
      </BlurFade>

      {/* Game */}
      <BlurFade delay={D * 6} className="md:col-span-6 lg:col-span-5">
        <section className="tile h-full min-h-[360px] bg-tomato text-card">
          <ShipOrKill />
        </section>
      </BlurFade>

      {/* Selected work */}
      <BlurFade delay={D * 7} className="md:col-span-6 lg:col-span-8">
        <section className="tile h-full bg-card">
          <div className="flex items-center justify-between">
            <p className="eyebrow">Selected work</p>
            <Link href="/work" className="text-sm font-medium hover:text-tomato">
              All case studies →
            </Link>
          </div>
          <ul className="mt-3 divide-y divide-dashed divide-foreground/15">
            {WORK.slice(0, 5).map((w) => (
              <li key={w.slug}>
                <Link
                  href={`/work/${w.slug}`}
                  className="group flex items-center justify-between gap-4 py-3"
                >
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-foreground/50">
                      {w.company} · {w.years}
                    </p>
                    <p className="font-display text-xl font-semibold leading-snug tracking-tight transition-colors group-hover:text-tomato">
                      {w.title}
                    </p>
                  </div>
                  <span className="shrink-0 text-right">
                    {w.metric ? (
                      <span className="font-display text-xl font-semibold text-tomato">
                        {w.metric.value}
                      </span>
                    ) : w.inProgress ? (
                      <span className="sticker">in progress</span>
                    ) : (
                      <span className="text-xl transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    )}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </BlurFade>

      {/* Stack */}
      <BlurFade delay={D * 8} className="md:col-span-6 lg:col-span-4">
        <section className="tile h-full bg-sky">
          <p className="eyebrow">Daily drivers</p>
          <p className="mt-2 font-display text-2xl font-semibold leading-tight tracking-tight">
            The toolbox
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {SITE.stack.map((tool, i) => (
              <li
                key={tool}
                className={cn(
                  "rounded-full border border-foreground/15 bg-card px-3 py-1 text-sm font-medium shadow-sm transition-transform hover:-translate-y-0.5",
                  i % 3 === 0 && "-rotate-2",
                  i % 3 === 2 && "rotate-2",
                )}
              >
                {tool}
              </li>
            ))}
          </ul>
        </section>
      </BlurFade>

      {/* Loving / Bugging */}
      <BlurFade delay={D * 9} className="md:col-span-3 lg:col-span-4">
        <section className="tile h-full bg-butter">
          <p className="eyebrow">Currently loving 💛</p>
          <p className="mt-2 font-display text-2xl font-semibold tracking-tight">
            {SITE.hotTakes.loving.title}
          </p>
          <p className="mt-2 text-foreground/75">{SITE.hotTakes.loving.body}</p>
        </section>
      </BlurFade>
      <BlurFade delay={D * 10} className="md:col-span-3 lg:col-span-4">
        <section className="tile h-full bg-card">
          <p className="eyebrow">Currently bugging me 🙃</p>
          <p className="mt-2 font-display text-2xl font-semibold tracking-tight">
            {SITE.hotTakes.bugging.title}
          </p>
          <p className="mt-2 text-foreground/75">{SITE.hotTakes.bugging.body}</p>
        </section>
      </BlurFade>

      {/* Contact */}
      <BlurFade delay={D * 11} className="md:col-span-6 lg:col-span-4">
        <a
          href={`mailto:${SITE.email}`}
          className="tile tile-hover group flex h-full flex-col justify-between bg-sage"
        >
          <p className="eyebrow">Let&apos;s talk</p>
          <p className="mt-6 font-display text-4xl font-semibold leading-none tracking-tight">
            Got a product problem?{" "}
            <span className="inline-block transition-transform group-hover:translate-x-2">
              →
            </span>
          </p>
          <p className="mt-4 text-sm text-foreground/70">
            Or a hot take, a book rec, or a dog photo. Inbox is open.
          </p>
        </a>
      </BlurFade>
    </div>
  );
}
