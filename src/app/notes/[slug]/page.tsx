import { getNote, getNotes } from "@/data/notes";
import { SITE } from "@/data/site";
import { shortDate } from "@/lib/utils";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const notes = await getNotes();
  return notes.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const note = await getNote(params.slug);
  if (!note) return {};
  const { title, summary, publishedAt } = note.metadata;
  return {
    title,
    description: summary,
    openGraph: {
      title,
      description: summary,
      type: "article",
      publishedTime: publishedAt,
      url: `${SITE.url}/notes/${note.slug}`,
    },
  };
}

export default async function NotePage({ params }: Props) {
  const note = await getNote(params.slug);
  if (!note) notFound();

  return (
    <article className="mx-auto max-w-2xl">
      <Link href="/notes" className="text-sm font-medium text-foreground/60 hover:text-tomato">
        ← All notes
      </Link>
      <header className="mb-10 mt-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs text-foreground/50">
            {shortDate(note.metadata.publishedAt)} · {note.readingMinutes} min read
          </span>
          {note.metadata.tags?.map((tag) => (
            <span key={tag} className="sticker">
              #{tag}
            </span>
          ))}
        </div>
        <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
          {note.metadata.title}
        </h1>
      </header>
      <div
        className="prose prose-lg max-w-none prose-headings:font-display prose-headings:tracking-tight prose-a:decoration-tomato prose-a:decoration-2 prose-a:underline-offset-4 prose-strong:text-foreground"
        dangerouslySetInnerHTML={{ __html: note.source }}
      />
      <div className="mt-16 flex items-center gap-4 rounded-[var(--radius)] border border-foreground/10 bg-card p-5">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-tomato font-display font-bold text-card">
          {SITE.initials[0]}
        </span>
        <p className="text-sm text-foreground/70">
          Thoughts? Disagree? I&apos;d love to hear it.{" "}
          <a
            href={SITE.socials[0].href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground underline decoration-tomato decoration-2 underline-offset-4"
          >
            Find me on LinkedIn
          </a>{" "}
          or <a href={`mailto:${SITE.email}`} className="font-medium text-foreground underline decoration-tomato decoration-2 underline-offset-4">send an email</a>.
        </p>
      </div>
    </article>
  );
}
