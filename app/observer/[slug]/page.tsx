import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, getEntangled, getEntry, getSlugs } from "@/lib/content";
import { MDXBody } from "@/lib/mdx";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getSlugs("observer");
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntry("observer", slug);
  if (!entry) return {};
  return {
    title: entry.frontmatter.title,
    description: entry.frontmatter.dek,
  };
}

export default async function ObserverEntry({ params }: Params) {
  const { slug } = await params;
  const entry = getEntry("observer", slug);
  if (!entry) notFound();

  const twin = getEntangled(entry);
  const { frontmatter: fm } = entry;

  return (
    <main
      data-lens="observer"
      className="env-obsidian env-obsidian-grain relative min-h-[100svh]"
    >
      {/* A slow warm bloom that follows the reader down the page. */}
      <div
        aria-hidden
        className="pointer-events-none fixed left-1/2 top-0 -z-0 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-observer-accent/[0.06] blur-[110px] animate-breathe"
      />

      <article
        id="content"
        className="with-rail relative z-10 mx-auto max-w-2xl px-6 pb-40 pt-20 sm:px-10 xl:max-w-[57rem] xl:pr-60"
      >
        {/* ---------------- header ---------------- */}
        <header className="animate-fade-rise">
          <nav className="mb-12 flex items-center gap-4 font-serif text-sm italic text-observer-text/35">
            <Link
              href="/observer"
              className="transition-colors hover:text-observer-accent"
            >
              ← the observer
            </Link>
            <span aria-hidden className="h-px w-8 bg-observer-edge" />
            <span>{formatDate(fm.date, "observer")}</span>
          </nav>

          {fm.flavour && (
            <div className="mb-5 font-mono text-[0.6rem] uppercase tracking-brutal text-observer-accent/70">
              {fm.flavour}
            </div>
          )}

          <h1 className="max-w-[18ch] font-serif text-[clamp(2.1rem,5.4vw,3.5rem)] font-normal italic leading-[1.06] tracking-[-0.022em] text-observer-text">
            {fm.title}
          </h1>

          {fm.dek && (
            <p className="mt-6 max-w-[46ch] font-serif text-[1.1rem] leading-[1.72] text-observer-muted">
              {fm.dek}
            </p>
          )}

          {fm.paper && (
            <a
              href={fm.paper}
              download
              className="mt-7 inline-flex items-center gap-2 border border-observer-edge px-4 py-2 font-mono text-[0.62rem] uppercase tracking-wider2 text-observer-muted transition-colors hover:border-observer-accent/50 hover:text-observer-accent"
            >
              <span aria-hidden>↓</span>
              Download the original (PDF)
            </a>
          )}

          <div
            aria-hidden
            className="mt-10 h-px w-24 bg-observer-accent/40"
          />
        </header>

        {/* ---------------- body ---------------- */}
        <div className="prose prose-invert prose-observer mt-12 max-w-none">
          <MDXBody source={entry.body} hemisphere="observer" />
        </div>

        {/* ---------------- colophon ---------------- */}
        <footer className="mt-20 flex flex-wrap items-baseline gap-x-4 border-t border-observer-edge pt-6 font-mono text-[0.58rem] uppercase tracking-wider2 text-observer-text/25">
          <span>{entry.words.toLocaleString()} words</span>
          <span>{entry.minutes} min</span>
          {fm.tags?.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </footer>

        {/* ---------------- entanglement ---------------- */}
        {twin && (
          <aside
            data-lens="architect"
            className="env-blueprint mt-16 border border-architect-edge p-7"
          >
            <div className="font-mono text-[0.6rem] uppercase tracking-brutal text-architect-accent/70">
              Entangled entry → The Architect
            </div>
            <Link href={twin.href} className="group mt-4 block">
              <h2 className="font-mono text-[1.15rem] font-medium leading-snug text-architect-text transition-colors group-hover:text-architect-accent">
                {twin.frontmatter.title}
              </h2>
              {twin.frontmatter.dek && (
                <p className="mt-3 max-w-[52ch] font-sans text-[0.92rem] leading-relaxed text-architect-muted">
                  {twin.frontmatter.dek}
                </p>
              )}
              <span className="mt-4 inline-block font-mono text-[0.66rem] uppercase tracking-wider2 text-architect-accent">
                the arithmetic behind the feeling →
              </span>
            </Link>
          </aside>
        )}
      </article>
    </main>
  );
}
