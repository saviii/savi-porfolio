import { getCaseStudy, WORK } from "@/data/work";
import { cn, TILE_COLORS } from "@/lib/utils";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return WORK.map((w) => ({ slug: w.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const study = getCaseStudy(params.slug);
  if (!study) return {};
  return { title: study.title, description: study.blurb };
}

export default function CaseStudyPage({ params }: Props) {
  const study = getCaseStudy(params.slug);
  if (!study) notFound();

  const index = WORK.findIndex((w) => w.slug === study.slug);
  const next = WORK[(index + 1) % WORK.length];

  return (
    <article className="mx-auto max-w-4xl">
      <Link href="/work" className="text-sm font-medium text-foreground/60 hover:text-tomato">
        ← All work
      </Link>

      <header className={cn("tile mt-4", TILE_COLORS[study.color])}>
        <p className="eyebrow !text-current opacity-70">
          {study.company} · {study.years}
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold leading-[1] tracking-tight sm:text-6xl">
          {study.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg opacity-80">{study.blurb}</p>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <ul className="flex flex-wrap gap-2">
            {study.tags.map((t) => (
              <li key={t} className="sticker !text-ink">
                {t}
              </li>
            ))}
          </ul>
          {study.metric && (
            <p className="text-right">
              <span className="block font-display text-6xl font-semibold leading-none tracking-tight">
                {study.metric.value}
              </span>
              <span className="text-sm opacity-70">{study.metric.label}</span>
            </p>
          )}
        </div>
      </header>

      <div className="mt-10 grid gap-10 md:grid-cols-[180px_1fr]">
        <p className="eyebrow pt-1">The problem</p>
        <p className="text-lg leading-relaxed">{study.context}</p>

        <p className="eyebrow pt-1">What I did</p>
        <ol className="space-y-4">
          {study.approach.map((step, i) => (
            <li key={i} className="flex gap-4 text-lg leading-relaxed">
              <span className="mt-1 grid size-7 shrink-0 place-items-center rounded-full bg-ink font-mono text-xs text-card">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>

        <p className="eyebrow pt-1">What happened</p>
        <p className="font-display text-2xl font-medium leading-snug tracking-tight">
          {study.outcome}
        </p>

        {study.links && study.links.length > 0 && (
          <>
            <p className="eyebrow pt-1">Further reading</p>
            <ul className="space-y-1">
              {study.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline decoration-tomato decoration-2 underline-offset-4 hover:text-tomato"
                  >
                    {l.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <Link
        href={`/work/${next.slug}`}
        className="tile tile-hover group mt-16 flex items-center justify-between bg-card"
      >
        <div>
          <p className="eyebrow">Next case study</p>
          <p className="mt-1 font-display text-2xl font-semibold tracking-tight group-hover:text-tomato">
            {next.title}
          </p>
        </div>
        <span className="text-3xl transition-transform group-hover:translate-x-2">→</span>
      </Link>
    </article>
  );
}
