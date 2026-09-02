import Link from "next/link";

export default function NotFound() {
  return (
    <main
      data-lens="architect"
      className="env-blueprint env-blueprint-vignette relative flex min-h-[100svh] items-center justify-center px-6"
    >
      <div className="relative z-10 max-w-md text-center">
        <p className="font-mono text-[0.62rem] uppercase tracking-brutal text-architect-accent/70">
          signal lost
        </p>
        <h1 className="mt-5 font-mono text-5xl font-medium text-architect-text">
          404
        </h1>
        <p className="mt-5 font-sans text-[0.95rem] leading-relaxed text-architect-muted">
          Neither hemisphere contains this. Pick a side and start again.
        </p>
        <div className="mt-9 flex justify-center gap-6">
          <Link
            href="/architect"
            className="border-b border-architect-accent/30 pb-1 font-mono text-[0.68rem] uppercase tracking-brutal text-architect-text transition-colors hover:border-architect-accent"
          >
            The Architect
          </Link>
          <Link
            href="/observer"
            className="border-b border-observer-accent/30 pb-1 font-serif text-[0.9rem] italic text-observer-accent transition-colors hover:border-observer-accent"
          >
            The Observer
          </Link>
        </div>
      </div>
    </main>
  );
}
