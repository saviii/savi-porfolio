import { SITE } from "@/data/site";
import Link from "next/link";

type NoteLink = { slug: string; title: string; date: string };

export function NotesTile({ notes }: { notes: NoteLink[] }) {
  return (
    <div className="flex h-full flex-col gap-1 p-[22px]">
      <div className="eyebrow mb-2.5 flex justify-between">
        <span>01 · Notes &amp; talks</span>
        <Link href="/notes" className="hover:text-accent">
          All →
        </Link>
      </div>

      {notes.map((n) => (
        <Link
          key={n.slug}
          href={`/notes/${n.slug}`}
          className="flex flex-1 flex-col justify-center gap-1 border-t border-border py-3 hover:text-accent"
        >
          <span className="eyebrow">Note · {n.date}</span>
          <span className="text-lg font-medium leading-[1.25] tracking-[-0.015em]">{n.title}</span>
        </Link>
      ))}

      {notes.length < 2 && (
        <div className="flex flex-1 flex-col justify-center gap-1 border-t border-dashed border-border py-3 text-muted-foreground">
          <span className="eyebrow">Next</span>
          <span className="text-lg leading-[1.25] tracking-[-0.015em]">
            First links coming soon<span className="caret" aria-hidden="true" />
          </span>
        </div>
      )}

      {SITE.talks.map((t) => {
        const body = (
          <>
            <span className="eyebrow">
              Talk · {t.where} · {t.date}
            </span>
            <span className="text-lg font-medium leading-[1.25] tracking-[-0.015em]">{t.title}</span>
          </>
        );
        const cls = "flex flex-1 flex-col justify-center gap-1 border-t border-border py-3";
        return t.href ? (
          <a key={t.title} href={t.href} target="_blank" rel="noopener noreferrer" className={`${cls} hover:text-accent`}>
            {body}
          </a>
        ) : (
          <div key={t.title} className={cls}>
            {body}
          </div>
        );
      })}

      <span className="eyebrow mt-3 border-t border-border pt-3">Written about the work</span>
      {SITE.press.map((p) => (
        <a
          key={p.href}
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          className="py-1.5 text-[13px] hover:text-accent"
        >
          {p.outlet} — {p.title} ↗
        </a>
      ))}
    </div>
  );
}
