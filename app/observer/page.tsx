import type { Metadata } from "next";
import Link from "next/link";
import { formatDate, getEntries } from "@/lib/content";

export const metadata: Metadata = {
  title: "The Observer",
  description:
    "Non-consensus theses, market dynamics, game theory, and long-horizon mental models.",
};

export default function ObserverIndex() {
  const entries = getEntries("observer");

  return (
    <main
      data-lens="observer"
      className="env-obsidian env-obsidian-grain relative min-h-[100svh]"
    >
      <div
        id="content"
        className="relative z-10 mx-auto max-w-3xl px-6 pb-40 pt-24 sm:px-10"
      >
        {/* ---- masthead ---- */}
        <header className="animate-fade-rise">
          <div className="mb-8 flex items-center gap-4">
            <Link
              href="/#world"
              className="font-serif text-sm italic text-observer-text/40 transition-colors hover:text-observer-accent"
            >
              ← dual engine
            </Link>
            <span aria-hidden className="h-px w-8 bg-observer-edge" />
            <span className="font-serif text-sm italic text-observer-text/40">
              engine ii — judgement
            </span>
          </div>

          <h1 className="font-serif text-[clamp(2.6rem,7vw,4.4rem)] font-normal italic leading-[0.98] tracking-[-0.02em] text-observer-text">
            The Observer
          </h1>

          <p className="mt-7 max-w-[46ch] font-serif text-[1.12rem] leading-[1.75] text-observer-muted">
            Non-consensus theses, market dynamics, and game theory. The
            long-horizon models that still hold once the cycle has turned and
            the consensus has moved on.
          </p>

          <div
            aria-hidden
            className="mt-10 h-px w-full bg-gradient-to-r from-observer-accent/40 via-observer-edge to-transparent"
          />
        </header>

        {/* ---- entries ---- */}
        <div className="mt-4">
          {entries.map((entry) => (
            <Link
              key={entry.slug}
              href={entry.href}
              className="group block border-b border-observer-edge/70 py-9 transition-colors hover:bg-observer-accent/[0.03]"
            >
              <div className="flex flex-wrap items-baseline gap-x-4 font-mono text-[0.6rem] uppercase tracking-brutal text-observer-text/30">
                <span>{formatDate(entry.frontmatter.date, "observer")}</span>
                {entry.frontmatter.flavour && (
                  <span className="text-observer-accent/65">
                    {entry.frontmatter.flavour}
                  </span>
                )}
              </div>

              <h2 className="mt-3 max-w-[26ch] font-serif text-[1.55rem] italic leading-[1.25] text-observer-text transition-colors group-hover:text-observer-accent">
                {entry.frontmatter.title}
              </h2>

              {entry.frontmatter.dek && (
                <p className="mt-3 max-w-[54ch] font-serif text-[1.02rem] leading-[1.7] text-observer-muted/85">
                  {entry.frontmatter.dek}
                </p>
              )}

              <div className="mt-4 flex flex-wrap items-center gap-x-3 font-mono text-[0.58rem] uppercase tracking-wider2 text-observer-text/25">
                {entry.frontmatter.tags?.map((t) => (
                  <span key={t}>{t}</span>
                ))}
                <span>{entry.minutes} min</span>
              </div>
            </Link>
          ))}
        </div>

        {entries.length === 0 && (
          <p className="mt-16 font-serif text-lg italic text-observer-text/40">
            Nothing written down yet. Add .mdx files to content/observer/
          </p>
        )}
      </div>
    </main>
  );
}
