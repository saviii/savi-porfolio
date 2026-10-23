import { getNotes } from "@/data/notes";
import { shortDate } from "@/lib/utils";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Notes",
  description: "Short thoughts on products, technology, and trends.",
};

export default async function NotesPage() {
  const notes = await getNotes();

  return (
    <div className="mx-auto max-w-3xl">
      <header className="mb-10 mt-6">
        <p className="eyebrow">Notes</p>
        <h1 className="mt-2 font-display text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl">
          Half-formed <span className="italic text-tomato">thoughts</span>.
        </h1>
        <p className="mt-4 text-lg text-foreground/70">
          Not quite a blog. Quick takes on products, AI, and trends I can&apos;t
          stop thinking about. Longer essays live on{" "}
          <a
            href="https://savi.medium.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-tomato decoration-2 underline-offset-4"
          >
            Medium
          </a>
          .
        </p>
      </header>

      <ul className="divide-y divide-dashed divide-foreground/20 border-y border-dashed border-foreground/20">
        {notes.map((note) => (
          <li key={note.slug}>
            <Link
              href={`/notes/${note.slug}`}
              className="group grid gap-2 py-6 sm:grid-cols-[120px_1fr]"
            >
              <p className="font-mono text-xs text-foreground/50 sm:pt-2">
                {shortDate(note.metadata.publishedAt)}
              </p>
              <div>
                <h2 className="font-display text-2xl font-semibold leading-tight tracking-tight transition-colors group-hover:text-tomato">
                  {note.metadata.title}
                </h2>
                {note.metadata.summary && (
                  <p className="mt-1 text-foreground/70">{note.metadata.summary}</p>
                )}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {note.metadata.tags?.map((tag) => (
                    <span key={tag} className="sticker">
                      #{tag}
                    </span>
                  ))}
                  <span className="font-mono text-[11px] text-foreground/50">
                    {note.readingMinutes} min read
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
