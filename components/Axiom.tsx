import type { ReactNode } from "react";

/**
 * AXIOM — a first-principles statement the rest of an essay rests on.
 * Numbered by hand so it can be cited later in the text ("by A2 …").
 */
export default function Axiom({
  n,
  children,
}: {
  n: string | number;
  children: ReactNode;
}) {
  return (
    <div className="not-prose my-8 flex gap-4 border-l-2 border-architect-accent/60 bg-architect-accent/[0.045] py-4 pl-5 pr-4">
      <span className="shrink-0 font-mono text-[0.7rem] uppercase tracking-wider2 text-architect-accent">
        A{n}
      </span>
      <div className="font-sans text-[0.98rem] leading-relaxed text-architect-text/90 [&_p]:m-0 [&_p+p]:mt-3">
        {children}
      </div>
    </div>
  );
}
