import fs from "fs";
import matter from "gray-matter";
import path from "path";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

// A note is a single .mdx file in content/notes. The filename is the URL slug.

export type NoteMeta = {
  title: string;
  publishedAt: string;
  summary?: string;
  tags?: string[];
};

export type Note = {
  slug: string;
  metadata: NoteMeta;
  source: string;
  readingMinutes: number;
};

const NOTES_DIR = path.join(process.cwd(), "content", "notes");

async function markdownToHTML(markdown: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      theme: { light: "min-light", dark: "min-dark" },
      keepBackground: false,
    })
    .use(rehypeStringify)
    .process(markdown);
  return file.toString();
}

export async function getNote(slug: string): Promise<Note | null> {
  const filePath = path.join(NOTES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const { content, data } = matter(fs.readFileSync(filePath, "utf-8"));
  const words = content.trim().split(/\s+/).length;
  return {
    slug,
    metadata: data as NoteMeta,
    source: await markdownToHTML(content),
    readingMinutes: Math.max(1, Math.round(words / 230)),
  };
}

export async function getNotes(): Promise<Note[]> {
  const slugs = fs
    .readdirSync(NOTES_DIR)
    .filter((f) => path.extname(f) === ".mdx")
    .map((f) => path.basename(f, ".mdx"));
  const notes = (await Promise.all(slugs.map(getNote))).filter(
    (n): n is Note => n !== null,
  );
  return notes.sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime(),
  );
}
