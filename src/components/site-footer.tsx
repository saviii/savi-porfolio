import { SITE } from "@/data/site";

export function SiteFooter() {
  const updated = new Date(`${SITE.lastUpdated}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <footer id="contact" className="mt-28 flex scroll-mt-10 flex-col gap-7 pb-36">
      <p className="eyebrow">Say hello</p>
      <a
        href={`mailto:${SITE.email}`}
        className="text-balance text-5xl font-semibold leading-[0.95] tracking-[-0.05em] hover:text-accent sm:text-7xl lg:text-[92px]"
      >
        Let&apos;s build something that learns<span className="text-accent">.</span>
      </a>
      <div className="eyebrow flex flex-wrap justify-between gap-3 border-t border-border pt-5">
        <span className="flex flex-wrap gap-5">
          <a href={`mailto:${SITE.email}`} className="hover:text-accent">
            {SITE.email}
          </a>
          {SITE.resumeUrl && (
            <a href={SITE.resumeUrl} className="hover:text-accent">
              Resume (PDF) ↓
            </a>
          )}
          {SITE.socials.map((s) => (
            <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
              {s.name}
            </a>
          ))}
        </span>
        <span>Last updated · {updated}</span>
      </div>
    </footer>
  );
}
