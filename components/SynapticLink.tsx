"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  /** Target in the *other* hemisphere, e.g. "/observer/founder-survival". */
  href: string;
  /** The bridging thought: why this technical claim has a psychological twin. */
  note?: string;
  /** Optional override for the target's label in the preview card. */
  title?: string;
  children: React.ReactNode;
};

/**
 * SYNAPTIC LINK
 *
 * The corpus callosum of the site. Inline in a Architect essay it renders in
 * amber and reads as a confession; inline in an Observer entry it renders in
 * slate and reads as a footnote to physics. The colour always belongs to the
 * hemisphere you are being pulled *toward*, so the link feels like a signal
 * arriving from the other side rather than a normal navigation.
 */
export default function SynapticLink({ href, note, title, children }: Props) {
  const [open, setOpen] = useState(false);
  const id = useId();

  const target: "architect" | "observer" = href.startsWith("/observer")
    ? "observer"
    : "architect";
  const toObserver = target === "observer";

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href={href}
        aria-describedby={note ? id : undefined}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className={[
          "group relative inline items-baseline gap-1 font-medium no-underline",
          "bg-[linear-gradient(currentColor,currentColor)] bg-[length:100%_1px] bg-[position:0_100%] bg-no-repeat",
          "transition-[background-size,color] duration-300 ease-synapse hover:bg-[length:100%_2px]",
          toObserver
            ? "text-observer-accent [text-shadow:0_0_18px_rgb(var(--observer-glow)/0.35)]"
            : "text-architect-accent [text-shadow:0_0_18px_rgb(var(--architect-accent)/0.3)]",
        ].join(" ")}
      >
        <span
          aria-hidden
          className="mr-1 select-none align-baseline text-[0.7em] opacity-70"
        >
          {toObserver ? "◑" : "◐"}
        </span>
        {children}
      </Link>

      {/* Preview card — the reason the bridge exists. */}
      <AnimatePresence>
        {open && note && (
          <motion.span
            id={id}
            role="note"
            initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 4, filter: "blur(4px)" }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            data-lens={target}
            className={[
              "pointer-events-none absolute bottom-[calc(100%+0.7rem)] left-1/2 z-30 w-[min(21rem,72vw)]",
              "-translate-x-1/2 rounded-sm border p-3.5 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.95)] backdrop-blur-md",
              toObserver
                ? "border-observer-accent/25 bg-observer-raised/95"
                : "border-architect-accent/25 bg-architect-raised/95",
            ].join(" ")}
          >
            <span
              className={[
                "mb-1.5 block text-[0.58rem] uppercase tracking-brutal",
                toObserver
                  ? "font-mono text-observer-accent/80"
                  : "font-mono text-architect-accent/80",
              ].join(" ")}
            >
              {toObserver ? "Synapse → Observer" : "Synapse → Architect"}
            </span>
            <span
              className={[
                "block text-[0.9rem] leading-relaxed",
                toObserver
                  ? "font-serif italic text-observer-text/90"
                  : "font-sans text-architect-text/90",
              ].join(" ")}
            >
              {note}
            </span>
            {title && (
              <span className="mt-2 block font-mono text-[0.6rem] uppercase tracking-wider2 text-white/35">
                {title}
              </span>
            )}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
