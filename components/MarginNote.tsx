"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  /** Short label shown on the inline marker, e.g. a date or a mood. */
  label?: string;
  /** "diary" (default) is warm and handwritten-adjacent; "spec" is clinical. */
  tone?: "diary" | "spec";
  children: React.ReactNode;
};

/**
 * MARGIN NOTE
 *
 * On wide screens the note lives in the right-hand rail, parallel to the
 * argument — the diary running alongside the proof. Below 1280px the rail
 * collapses and the note becomes a click-to-open aside, so nothing is lost
 * on a phone; it just has to be asked for.
 *
 * Requires an ancestor with `.with-rail` (see globals.css).
 */
export default function MarginNote({
  label,
  tone = "diary",
  children,
}: Props) {
  const [open, setOpen] = useState(false);
  const isDiary = tone === "diary";

  const header = (
    <>
      <span
        className={[
          "mb-2 flex items-center gap-2 text-[0.58rem] uppercase tracking-brutal",
          isDiary ? "text-observer-accent/75" : "text-architect-accent/75",
          "font-mono",
        ].join(" ")}
      >
        <span aria-hidden>{isDiary ? "◑" : "◐"}</span>
        <span
          aria-hidden
          className={[
            "h-px flex-1",
            isDiary ? "bg-observer-accent/25" : "bg-architect-accent/25",
          ].join(" ")}
        />
        {label ?? (isDiary ? "diary" : "note")}
      </span>
    </>
  );

  const text = (
    <span
        className={[
          "block text-[0.85rem] leading-[1.65]",
          isDiary
            ? "font-serif italic text-observer-muted"
            : "font-mono not-italic text-architect-muted",
        ].join(" ")}
      >
        {children}
      </span>
  );

  return (
    <span className="not-prose relative block align-baseline xl:h-0">
      {/* ---------- WIDE: the rail ---------- */}
      <span
        className={[
          "absolute left-full top-0 ml-8 hidden w-[12.5rem] border-l pl-4 xl:block",
          isDiary ? "border-observer-accent/25" : "border-architect-accent/25",
        ].join(" ")}
      >
        {header}
        {text}
      </span>

      {/* ---------- NARROW: click to open ---------- */}
      <span className="block xl:hidden">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className={[
            "my-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[0.6rem] uppercase tracking-wider2 transition-colors",
            isDiary
              ? "border-observer-accent/30 text-observer-accent/85 hover:bg-observer-accent/10"
              : "border-architect-accent/30 text-architect-accent/85 hover:bg-architect-accent/10",
          ].join(" ")}
        >
          <span aria-hidden>{open ? "−" : "+"}</span>
          {label ?? (isDiary ? "margin note" : "note")}
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.span
              key="note"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="block overflow-hidden"
            >
              <span
                className={[
                  "mb-5 block border-l pl-4",
                  isDiary
                    ? "border-observer-accent/25"
                    : "border-architect-accent/25",
                ].join(" ")}
              >
                {text}
              </span>
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </span>
  );
}
