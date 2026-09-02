import type { ReactNode } from "react";

/**
 * DIARY FRAGMENT — raw, timestamped, unedited-looking. The point is that it
 * reads as recovered material rather than composed prose, so it gets a
 * different measure, a different weight, and no drop cap.
 */
export default function DiaryFragment({
  at,
  place,
  children,
}: {
  /** Free text: "03:41", "the third bad Tuesday", "somewhere over Nagpur". */
  at?: string;
  place?: string;
  children: ReactNode;
}) {
  return (
    <aside className="not-prose relative my-10 max-w-[54ch] pl-6">
      <span
        aria-hidden
        className="absolute left-0 top-1 h-full w-px bg-gradient-to-b from-observer-accent/60 via-observer-accent/15 to-transparent"
      />

      {(at || place) && (
        <div className="mb-3 flex flex-wrap items-baseline gap-x-3 font-mono text-[0.6rem] uppercase tracking-brutal text-observer-accent/70">
          {at && <span>{at}</span>}
          {place && <span className="text-observer-text/30">{place}</span>}
        </div>
      )}

      <div className="space-y-3 font-serif text-[1.02rem] italic leading-[1.7] text-observer-text/78">
        {children}
      </div>
    </aside>
  );
}
