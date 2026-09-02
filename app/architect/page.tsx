import type { Metadata } from "next";
import Link from "next/link";
import { formatDate, getEntries } from "@/lib/content";

export const metadata: Metadata = {
  title: "The Architect",
  description:
    "Engineering, execution, technical scaffolding, and systems architecture.",
};

export default function ArchitectIndex() {
  const entries = getEntries("architect");

  return (
    <main
      data-lens="architect"
      className="env-blueprint env-blueprint-vignette relative min-h-[100svh]"
    >
      <div
        id="content"
        className="relative z-10 mx-auto max-w-4xl px-6 pb-40 pt-24 sm:px-10"
      >
        {/* ---- masthead ---- */}
        <header className="animate-fade-rise border-b border-architect-edge pb-10">
          <div className="mb-6 flex items-center gap-4">
            <Link
              href="/#world"
              className="font-mono text-[0.62rem] uppercase tracking-brutal text-architect-text/40 transition-colors hover:text-architect-accent"
            >
              ← dual engine
            </Link>
            <span aria-hidden className="h-px w-6 bg-architect-edge" />
            <span className="font-mono text-[0.62rem] uppercase tracking-brutal text-architect-text/40">
              engine 01 / execution
            </span>
          </div>

          <h1 className="font-mono text-[clamp(2.2rem,6vw,3.6rem)] font-medium uppercase leading-[0.95] tracking-[0.02em] text-architect-text">
            The Architect
          </h1>

          <p className="mt-5 max-w-[52ch] font-sans text-[0.98rem] leading-relaxed text-architect-muted">
            Systems architecture, technical scaffolding, and execution detail.
            Nothing here is allowed to be interesting unless it also{" "}
            <span className="text-architect-accent">survives contact with
            reality</span>.
          </p>

          <dl className="mt-8 flex gap-8 font-mono text-[0.62rem] uppercase tracking-wider2 text-architect-text/35">
            <div>
              <dt className="sr-only">Entries</dt>
              <dd>
                <span className="text-architect-accent">{entries.length}</span>{" "}
                entries
              </dd>
            </div>
            <div>
              <dt className="sr-only">Mode</dt>
              <dd>engineering / execution</dd>
            </div>
          </dl>
        </header>

        {/* ---- index ---- */}
        <ol className="mt-2">
          {entries.map((entry, i) => (
            <li key={entry.slug}>
              <Link
                href={entry.href}
                className="group grid grid-cols-[3rem_1fr] gap-x-4 border-b border-architect-edge/70 py-7 transition-colors hover:bg-architect-accent/[0.035] sm:grid-cols-[4rem_1fr_7rem]"
              >
                <span className="font-mono text-[0.68rem] tabular-nums text-architect-accent/60">
                  {String(entries.length - i).padStart(3, "0")}
                </span>

                <div>
                  <h2 className="font-mono text-[1.05rem] font-medium leading-snug text-architect-text transition-colors group-hover:text-architect-accent">
                    {entry.frontmatter.title}
                  </h2>
                  {entry.frontmatter.dek && (
                    <p className="mt-2 max-w-[58ch] font-sans text-[0.88rem] leading-relaxed text-architect-muted/85">
                      {entry.frontmatter.dek}
                    </p>
                  )}
                  <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.6rem] uppercase tracking-wider2 text-architect-text/35">
                    {entry.frontmatter.confidence && (
                      <span className="border border-architect-edge px-1.5 py-0.5">
                        {entry.frontmatter.confidence}
                      </span>
                    )}
                    {entry.frontmatter.tags?.map((t) => (
                      <span key={t}>#{t}</span>
                    ))}
                    <span className="sm:hidden">{entry.minutes} min</span>
                  </div>
                </div>

                <div className="hidden text-right font-mono text-[0.6rem] uppercase tracking-wider2 text-architect-text/35 sm:block">
                  <div>{formatDate(entry.frontmatter.date, "architect")}</div>
                  <div className="mt-1">{entry.minutes} min</div>
                </div>
              </Link>
            </li>
          ))}
        </ol>

        {entries.length === 0 && (
          <p className="mt-16 font-mono text-sm text-architect-text/40">
            // no entries compiled. add .mdx files to content/architect/
          </p>
        )}
      </div>
    </main>
  );
}
