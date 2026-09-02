import type { ReactNode } from "react";

/**
 * SCHEMATIC — a bordered plate for system diagrams inside a Architect essay.
 * Children can be ASCII art (wrapped in <pre>), inline SVG, or an <Image>.
 */
export default function Schematic({
  id,
  caption,
  children,
}: {
  /** Figure reference, e.g. "FIG. 2.1". */
  id?: string;
  caption?: string;
  children: ReactNode;
}) {
  return (
    <figure className="not-prose my-10">
      <div className="relative border border-architect-edge bg-architect-raised/60">
        {/* Registration corners. */}
        {["left-0 top-0 border-l border-t", "right-0 top-0 border-r border-t", "left-0 bottom-0 border-l border-b", "right-0 bottom-0 border-r border-b"].map(
          (pos) => (
            <span
              key={pos}
              aria-hidden
              className={`pointer-events-none absolute h-3 w-3 border-architect-accent/40 ${pos}`}
            />
          ),
        )}

        <div className="overflow-x-auto px-6 py-7 font-mono text-[0.78rem] leading-[1.5] text-architect-muted [&_pre]:m-0 [&_pre]:whitespace-pre [&_pre]:bg-transparent [&_pre]:p-0">
          {children}
        </div>
      </div>

      {(id || caption) && (
        <figcaption className="mt-3 flex gap-3 font-mono text-[0.66rem] leading-relaxed text-architect-text/50">
          {id && (
            <span className="shrink-0 uppercase tracking-wider2 text-architect-accent/70">
              {id}
            </span>
          )}
          {caption && <span>{caption}</span>}
        </figcaption>
      )}
    </figure>
  );
}
