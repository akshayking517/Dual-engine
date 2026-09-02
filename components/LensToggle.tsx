"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useLens } from "@/components/ThemeProvider";

/**
 * Floating minimalist pill. Always available, never in the way:
 * it retreats to a hairline when you scroll down and returns when you
 * scroll up or approach the bottom of the viewport.
 *
 * Keyboard: ⌘/Ctrl + J flips hemispheres.
 */
export default function LensToggle() {
  const { lens, isSplit } = useLens();
  const pathname = usePathname() ?? "/";
  const [retracted, setRetracted] = useState(false);

  // Retract on downward scroll.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setRetracted(y > 140 && y > last);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ⌘J / Ctrl+J flips the hemisphere.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "j") {
        e.preventDefault();
        window.location.href = lens === "observer" ? "/architect" : "/observer";
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lens]);

  // The landing page has its own tab bar.
  if (isSplit) return null;

  const inArchitect = pathname.startsWith("/architect");

  return (
    <motion.nav
        aria-label="Hemisphere"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: retracted ? 26 : 0, opacity: retracted ? 0.35 : 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        whileHover={{ y: 0, opacity: 1 }}
      className="fixed bottom-5 left-1/2 z-40 -translate-x-1/2"
    >
        <div className="relative flex items-center gap-1 rounded-full border border-white/10 bg-black/55 p-1 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.9)] backdrop-blur-xl">
          {/* The sliding indicator — one element that travels between lenses. */}
          <span
            aria-hidden
            className={[
              "pointer-events-none absolute left-1 top-1 h-[calc(100%-0.5rem)] w-[6.6rem] rounded-full",
              "transition-[transform,background-color,box-shadow] duration-500 ease-synapse",
              inArchitect
                ? "translate-x-0 bg-architect-accent/[0.18] ring-1 ring-architect-accent/35"
                : "translate-x-[7.16rem] bg-observer-accent/[0.18] ring-1 ring-observer-accent/35",
            ].join(" ")}
          />

          <PillLink
            href="/architect"
            active={inArchitect}
            className="font-mono text-[0.64rem] uppercase tracking-wider2"
            activeClass="text-architect-accent"
          >
            Architect
          </PillLink>

          <span aria-hidden className="h-4 w-px bg-white/10" />

          <PillLink
            href="/observer"
            active={!inArchitect}
            className="font-serif text-[0.82rem] italic tracking-wide"
            activeClass="text-observer-accent"
          >
            Observer
          </PillLink>

          {/* Return to the split. */}
          <Link
            href="/#world"
            aria-label="Back to home"
            className="ml-1 flex h-7 w-7 items-center justify-center rounded-full text-white/45 transition-colors hover:bg-white/5 hover:text-white/85"
          >
            <svg width="13" height="13" viewBox="0 0 26 26" fill="none">
              <circle
                cx="13"
                cy="13"
                r="12"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <path d="M13 1v24" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </Link>
        </div>
    </motion.nav>
  );
}

function PillLink({
  href,
  active,
  children,
  className,
  activeClass,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
  className: string;
  activeClass: string;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={[
        "relative z-10 w-[6.6rem] rounded-full py-1.5 text-center transition-colors duration-300",
        className,
        active ? activeClass : "text-white/45 hover:text-white/80",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}
