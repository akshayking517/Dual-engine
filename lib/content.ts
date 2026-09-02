import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

export type Hemisphere = "architect" | "observer";

export type Frontmatter = {
  title: string;
  /** One-line standfirst shown under the title and in the index. */
  dek?: string;
  date: string;
  tags?: string[];
  /** Architect: how load-bearing the claim is. */
  confidence?: "speculative" | "working" | "load-bearing";
  /** Observer: the emotional register of the entry. */
  flavour?: string;
  /** Slug in the *other* hemisphere this piece is entangled with. */
  entangledWith?: string;
  /** Path to the original source document, e.g. "/papers/foo.pdf". */
  paper?: string;
  draft?: boolean;
};

export type Entry = {
  slug: string;
  hemisphere: Hemisphere;
  href: string;
  body: string;
  minutes: number;
  words: number;
  frontmatter: Frontmatter;
};

const ROOT = path.join(process.cwd(), "content");

function dirFor(hemisphere: Hemisphere) {
  return path.join(ROOT, hemisphere);
}

function readEntry(hemisphere: Hemisphere, file: string): Entry | null {
  const full = path.join(dirFor(hemisphere), file);
  const raw = fs.readFileSync(full, "utf8");
  const { data, content } = matter(raw);
  const fm = data as Frontmatter;

  if (!fm?.title || !fm?.date) {
    console.warn(`[content] skipping ${hemisphere}/${file}: missing title/date`);
    return null;
  }
  if (fm.draft && process.env.NODE_ENV === "production") return null;

  const slug = file.replace(/\.mdx?$/, "");
  const stats = readingTime(content);

  return {
    slug,
    hemisphere,
    href: `/${hemisphere}/${slug}`,
    body: content,
    minutes: Math.max(1, Math.round(stats.minutes)),
    words: stats.words,
    frontmatter: fm,
  };
}

/** Every entry in a hemisphere, newest first. */
export function getEntries(hemisphere: Hemisphere): Entry[] {
  const dir = dirFor(hemisphere);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => /\.mdx?$/.test(f))
    .map((f) => readEntry(hemisphere, f))
    .filter((e): e is Entry => e !== null)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime(),
    );
}

export function getEntry(
  hemisphere: Hemisphere,
  slug: string,
): Entry | undefined {
  return getEntries(hemisphere).find((e) => e.slug === slug);
}

/** For `generateStaticParams`. */
export function getSlugs(hemisphere: Hemisphere): { slug: string }[] {
  return getEntries(hemisphere).map((e) => ({ slug: e.slug }));
}

/** The piece in the opposite hemisphere this one is entangled with. */
export function getEntangled(entry: Entry): Entry | undefined {
  const other: Hemisphere =
    entry.hemisphere === "architect" ? "observer" : "architect";
  if (!entry.frontmatter.entangledWith) return undefined;
  return getEntry(other, entry.frontmatter.entangledWith);
}

export function formatDate(iso: string, hemisphere: Hemisphere): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;

  // The Architect timestamps. The Observer remembers.
  return hemisphere === "architect"
    ? d.toISOString().slice(0, 10)
    : d.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
}
