type Row = {
  k: string;
  v: string | number;
  unit?: string;
  /** Optional note rendered small and faint under the value. */
  note?: string;
};

/**
 * SPEC TABLE — structured technical data. Deliberately not a markdown table:
 * monospace, right-aligned numerics, units in a separate column so orders of
 * magnitude line up and can be scanned rather than read.
 */
export default function SpecTable({
  title,
  rows,
}: {
  title?: string;
  rows: Row[];
}) {
  return (
    <div className="not-prose my-9 border border-architect-edge">
      {title && (
        <div className="border-b border-architect-edge bg-architect-raised/70 px-4 py-2.5 font-mono text-[0.64rem] uppercase tracking-brutal text-architect-accent/80">
          {title}
        </div>
      )}
      <dl className="divide-y divide-architect-edge/70">
        {rows.map((row) => (
          <div
            key={row.k}
            className="grid grid-cols-[1fr_auto_3.5rem] items-baseline gap-3 px-4 py-2.5 transition-colors hover:bg-architect-accent/[0.04]"
          >
            <dt className="font-sans text-[0.85rem] text-architect-muted">
              {row.k}
              {row.note && (
                <span className="mt-0.5 block font-mono text-[0.64rem] text-architect-text/35">
                  {row.note}
                </span>
              )}
            </dt>
            <dd className="text-right font-mono text-[0.9rem] tabular-nums text-architect-text">
              {row.v}
            </dd>
            <dd className="font-mono text-[0.68rem] uppercase tracking-wider2 text-architect-text/40">
              {row.unit ?? ""}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
