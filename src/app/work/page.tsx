import { SITE } from "@/data/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description: "A decade of consumer products, from startups to platforms with millions of users.",
};

const TOOLKIT =
  "LLM evals, prompt design, ranking and personalization, notifications, experimentation. Claude, Cursor, Figma, SQL, Jupyter.";

const ROW = "grid grid-cols-1 gap-2.5 border-t border-border py-6 md:grid-cols-[170px_minmax(0,1fr)_minmax(0,1.6fr)] md:gap-8";

export default function WorkPage() {
  return (
    <div>
      <section className="flex flex-wrap items-end justify-between gap-6 pb-10 pt-6">
        <div className="flex flex-col gap-[18px]">
          <span className="eyebrow">Work · 2013 – now</span>
          <h1 className="text-[72px] font-semibold leading-[0.9] tracking-[-0.055em] md:text-[124px]">Work</h1>
        </div>
        {SITE.resumeUrl && (
          <a
            href={SITE.resumeUrl}
            download="Savi-Singh-Resume.pdf"
            className="inline-flex h-12 items-center gap-2.5 rounded-full bg-accent px-[22px] text-[15px] font-semibold text-accent-foreground hover:opacity-90"
          >
            Download full resume
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              <path d="M12 4v12M6 11l6 6 6-6M5 20h14" />
            </svg>
          </a>
        )}
      </section>

      <ol className="border-b border-border">
        {SITE.experience.map((job, i) => (
          <li key={job.company} className={`group ${ROW}`}>
            <span className="flex items-center gap-2 pt-[5px] font-mono text-[13px]">
              {i === 0 && <span className="size-2 animate-pulse rounded-full bg-accent" aria-hidden="true" />}
              {job.years}
            </span>
            <div className="flex flex-col gap-1">
              <span className="text-xl font-semibold leading-[1.3] tracking-[-0.01em] transition-colors group-hover:text-accent">
                {job.company}
              </span>
              <span className="text-[15px] text-muted-foreground">{job.title}</span>
            </div>
            <p className="pt-0.5 text-base leading-[1.45]">{job.line}</p>
          </li>
        ))}
      </ol>

      <section className={`${ROW} border-t-0`}>
        <span className="eyebrow pt-[5px]">Side projects</span>
        <div className="flex flex-col gap-2.5 md:col-span-2">
          {SITE.projects.map((p) => (
            <p key={p.name} className="text-base leading-[1.45]">
              <a href={p.href} target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-accent">
                {p.name} ↗
              </a>{" "}
              <span className="text-muted-foreground">{p.line}</span>
            </p>
          ))}
        </div>
      </section>

      <section className={ROW}>
        <span className="eyebrow pt-[5px]">Toolkit</span>
        <p className="text-base leading-normal md:col-span-2">{TOOLKIT}</p>
      </section>
    </div>
  );
}
