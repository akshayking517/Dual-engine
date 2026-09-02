import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  formatDate,
  getEntangled,
  getEntry,
  getSlugs,
} from "@/lib/content";
import { MDXBody } from "@/lib/mdx";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getSlugs("architect");
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntry("architect", slug);
  if (!entry) return {};
  return {
    title: entry.frontmatter.title,
    description: entry.frontmatter.dek,
  };
}

export default async function ArchitectEntry({ params }: Params) {
  const { slug } = await params;
  const entry = getEntry("architect", slug);
  if (!entry) notFound();

  const twin = getEntangled(entry);
  const { frontmatter: fm } = entry;

  return (
    <main
      data-lens="architect"
      className="env-blueprint relative min-h-[100svh]"
    >
      {/* Fixed measurement rules — the environment says "instrument". */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-y-0 left-0 hidden w-px bg-gradient-to-b from-transparent via-architect-accent/20 to-transparent lg:left-[max(2rem,calc(50%-32rem))] lg:block"
      />

      <article
        id="content"
        className="with-rail relative z-10 mx-auto max-w-3xl px-6 pb-40 pt-20 sm:px-10 xl:max-w-[63rem] xl:pr-60"
      >
        {/* ---------------- header ---------------- */}
        <header className="animate-fade-rise">
          <nav className="mb-10 flex items-center gap-4 font-mono text-[0.62rem] uppercase tracking-brutal text-architect-text/35">
            <Link
              href="/architect"
              className="transition-colors hover:text-architect-accent"
            >
              ← the architect
            </Link>
            <span aria-hidden className="h-px w-6 bg-architect-edge" />
            <span>{formatDate(fm.date, "architect")}</span>
          </nav>

          <h1 className="max-w-[22ch] font-mono text-[clamp(1.8rem,4.4vw,2.9rem)] font-medium leading-[1.08] tracking-[-0.01em] text-architect-text">
            {fm.title}
          </h1>

          {fm.dek && (
            <p className="mt-5 max-w-[54ch] font-sans text-[1.02rem] leading-relaxed text-architect-muted">
              {fm.dek}
            </p>
          )}

          {/* Structured metadata strip. */}
          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 border-y border-architect-edge py-4 font-mono text-[0.62rem] uppercase tracking-wider2 sm:grid-cols-4">
            <Meta label="length" value={`${entry.minutes} min`} />
            <Meta label="words" value={entry.words.toLocaleString()} />
            {fm.confidence && (
              <Meta label="confidence" value={fm.confidence} accent />
            )}
            {fm.tags?.length ? (
              <Meta label="domain" value={fm.tags.join(" · ")} />
            ) : null}
          </dl>

          {fm.paper && (
            <a
              href={fm.paper}
              download
              className="mt-6 inline-flex items-center gap-2 border border-architect-edge px-4 py-2 font-mono text-[0.62rem] uppercase tracking-wider2 text-architect-muted transition-colors hover:border-architect-accent/50 hover:text-architect-accent"
            >
              <span aria-hidden>↓</span>
              Download the original paper (PDF)
            </a>
          )}
        </header>

        {/* ---------------- body ---------------- */}
        <div className="prose prose-invert prose-architect mt-14 max-w-none">
          <MDXBody source={entry.body} hemisphere="architect" />
        </div>

        {/* ---------------- entanglement ---------------- */}
        {twin && (
          <aside
            data-lens="observer"
            className="env-obsidian mt-24 border border-observer-edge p-7"
          >
            <div className="font-mono text-[0.6rem] uppercase tracking-brutal text-observer-accent/70">
              Entangled entry → The Observer
            </div>
            <Link href={twin.href} className="group mt-4 block">
              <h2 className="font-serif text-2xl italic leading-snug text-observer-text transition-colors group-hover:text-observer-accent">
                {twin.frontmatter.title}
              </h2>
              {twin.frontmatter.dek && (
                <p className="mt-3 max-w-[52ch] font-serif text-[1rem] leading-relaxed text-observer-muted">
                  {twin.frontmatter.dek}
                </p>
              )}
              <span className="mt-4 inline-block font-serif text-sm italic text-observer-accent">
                the irrational half of this argument →
              </span>
            </Link>
          </aside>
        )}
      </article>
    </main>
  );
}

function Meta({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div>
      <dt className="text-architect-text/30">{label}</dt>
      <dd
        className={`mt-1 ${accent ? "text-architect-accent" : "text-architect-text/70"}`}
      >
        {value}
      </dd>
    </div>
  );
}
