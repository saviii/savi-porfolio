import { getNotes } from "@/data/notes";
import { shortDate } from "@/lib/utils";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Notes",
  description: "Links worth your time, each with my take.",
};

export default async function NotesPage() {
  const notes = await getNotes();

  return (
    <div>
      <section className="flex flex-col gap-[18px] pb-10 pt-6">
        <span className="eyebrow">Notes</span>
        <h1 className="text-[72px] font-semibold leading-[0.9] tracking-[-0.055em] md:text-[124px]">Notes</h1>
        <p className="max-w-[620px] text-xl leading-normal">Links worth your time, each with my take.</p>
      </section>

      <ul className="border-b border-border">
        {notes.map((note) => (
          <li key={note.slug} className="border-t border-border">
            <Link
              href={`/notes/${note.slug}`}
              className="group grid grid-cols-1 gap-2.5 py-6 md:grid-cols-[170px_minmax(0,1fr)] md:gap-8"
            >
              <span className="pt-[5px] font-mono text-[13px]">{shortDate(note.metadata.publishedAt)}</span>
              <div className="flex flex-col gap-1">
                <span className="text-xl font-semibold leading-[1.3] tracking-[-0.01em] transition-colors group-hover:text-accent">
                  {note.metadata.title}
                </span>
                {note.metadata.summary && <span className="text-[15px] text-muted-foreground">{note.metadata.summary}</span>}
              </div>
            </Link>
          </li>
        ))}
        <li className="grid grid-cols-1 gap-2.5 border-t border-dashed border-border py-6 md:grid-cols-[170px_minmax(0,1fr)] md:gap-8">
          <span className="pt-[5px] font-mono text-[13px] text-muted-foreground">Next</span>
          <span className="text-xl leading-[1.3] text-muted-foreground">
            First links coming soon<span className="caret" aria-hidden="true" />
          </span>
        </li>
      </ul>
    </div>
  );
}
