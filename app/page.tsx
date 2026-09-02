"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════════════════
   EDIT ME — everything personal lives in this one block.
   ═══════════════════════════════════════════════════════════════════════════ */

const PROFILE = {
  name: "Akshay",
  monogram: "AK",
  role: "Builder · Thinker · Systems Architect",

  intro:
    "I build things, and I spend an equal amount of time asking whether they should exist. One half of my attention goes to making a system work. The other half goes to why anyone believed it was worth making.",

  bio: [
    "Most of my work sits between doing and deciding — shipping something real, then going back and interrogating the assumption it was built on.",
    "This site is split the same way. One side is how things get built. The other is why people believe what they believe about them.",
  ],

  cv: { href: "/cv.pdf", label: "View CV" },

  socials: [
    {
      label: "X",
      href: "https://x.com/Akshay_Levi",
      handle: "@Akshay_Levi",
      icon: "x" as const,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/akshay-levingston-72368a270",
      handle: "Akshay Levingston",
      icon: "linkedin" as const,
    },
    {
      label: "Email",
      href: "mailto:akshayking517@gmail.com",
      handle: "akshayking517@gmail.com",
      icon: "email" as const,
    },
  ],
};

/* ── brand marks ────────────────────────────────────────────────────────── */

function SocialIcon({ name }: { name: "x" | "linkedin" | "email" }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    "aria-hidden": true,
    focusable: false,
  };

  if (name === "x") {
    return (
      <svg {...common} fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }

  if (name === "linkedin") {
    return (
      <svg {...common} fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
      </svg>
    );
  }

  return (
    <svg
      {...common}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2.5 6.5 9.5 6.5 9.5-6.5" />
    </svg>
  );
}

const ENGINES = [
  {
    key: "architect",
    index: "01",
    title: "The Architect",
    kicker: "How things get built",
    summary:
      "Essays about building. What it actually takes to make something work, where the real limits are, and which technologies are closer than people think.",
    topics: ["Building things", "Real-world limits", "What's coming next"],
    href: "/architect",
    enter: "Enter The Architect",
  },
  {
    key: "observer",
    index: "02",
    title: "The Observer",
    kicker: "Why people believe what they believe",
    summary:
      "Essays about judgement. Why good ideas get ignored, how money and incentives quietly shape what gets made, and which patterns keep repeating.",
    topics: ["Unpopular opinions", "Incentives & money", "Patterns that repeat"],
    href: "/observer",
    enter: "Enter The Observer",
  },
] as const;

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════════════════ */

type Tab = "home" | "world";

const TABS: { key: Tab; label: string }[] = [
  { key: "home", label: "Home" },
  { key: "world", label: "Enter My World" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Page() {
  const [tab, setTab] = useState<Tab>("home");

  // Mirror the tab into the URL hash so `/#world` is linkable and Back works.
  useEffect(() => {
    const sync = () =>
      setTab(window.location.hash === "#world" ? "world" : "home");
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const select = useCallback((next: Tab) => {
    setTab(next);
    window.history.pushState(
      null,
      "",
      next === "world" ? "#world" : window.location.pathname,
    );
  }, []);

  return (
    <main className="relative flex min-h-[100svh] flex-col bg-neutral-950">
      {/* ───────────────── top bar ───────────────── */}
      <header className="sticky top-0 z-30 border-b border-neutral-800/80 bg-neutral-950/85 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4 sm:px-10">
          <button
            type="button"
            onClick={() => select("home")}
            aria-label={`${PROFILE.name} — home`}
            className="font-mono text-[0.72rem] uppercase tracking-brutal text-neutral-400 transition-colors hover:text-neutral-50"
          >
            {PROFILE.monogram}
          </button>

          <nav aria-label="Sections">
            <ul className="flex items-center gap-1">
              {TABS.map((t) => {
                const active = tab === t.key;
                return (
                  <li key={t.key}>
                    <button
                      type="button"
                      onClick={() => select(t.key)}
                      aria-current={active ? "page" : undefined}
                      className={[
                        "relative px-3 py-2 font-mono text-[0.66rem] uppercase tracking-wider2 transition-colors duration-300 sm:px-4",
                        active
                          ? "text-neutral-50"
                          : "text-neutral-500 hover:text-neutral-300",
                      ].join(" ")}
                    >
                      {t.label}
                      {active && (
                        <motion.span
                          layoutId="tab-underline"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 32,
                          }}
                          className="absolute inset-x-2 -bottom-[9px] h-px bg-neutral-50 sm:inset-x-3"
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </header>

      {/* ───────────────── views ─────────────────
          `items-start`, not `items-center`: when a view is taller than the
          viewport, centring pushes its first lines above the scroll origin. */}
      <div
        id="content"
        className="flex flex-1 items-start px-6 pb-24 pt-16 sm:px-10 sm:pt-24"
      >
        <div className="mx-auto w-full max-w-5xl">
          <AnimatePresence mode="wait" initial={false}>
            <motion.section
              key={tab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.32, ease: EASE }}
            >
              {tab === "home" ? <HomeTab /> : <WorldTab />}
            </motion.section>
          </AnimatePresence>
        </div>
      </div>

      {/* ───────────────── footer ───────────────── */}
      <footer className="border-t border-neutral-800/80">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-5 font-mono text-[0.6rem] uppercase tracking-wider2 text-neutral-600 sm:px-10">
          <span>
            © {new Date().getFullYear()} {PROFILE.name}
          </span>
          <span>Dual Engine</span>
        </div>
      </footer>
    </main>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TAB 1 — HOME
   ═══════════════════════════════════════════════════════════════════════════ */

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
};

const rise = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

function HomeTab() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="mx-auto w-full max-w-2xl"
    >
      <motion.p
        variants={rise}
        className="font-mono text-[0.65rem] uppercase tracking-brutal text-neutral-500"
      >
        {PROFILE.role}
      </motion.p>

      <motion.h1
        variants={rise}
        className="mt-6 text-[clamp(2.6rem,8vw,4.25rem)] font-medium leading-[0.95] tracking-[-0.035em] text-neutral-50"
      >
        {PROFILE.name}
      </motion.h1>

      <motion.p
        variants={rise}
        className="mt-8 max-w-[48ch] text-[1.0625rem] leading-[1.65] text-neutral-300"
      >
        {PROFILE.intro}
      </motion.p>

      <motion.div
        variants={rise}
        aria-hidden
        className="mt-10 h-px w-full bg-neutral-800"
      />

      <motion.div variants={rise} className="mt-10 space-y-5">
        {PROFILE.bio.map((para) => (
          <p
            key={para.slice(0, 24)}
            className="max-w-[58ch] text-[0.95rem] leading-[1.75] text-neutral-400"
          >
            {para}
          </p>
        ))}
      </motion.div>

      {/* CV */}
      <motion.div variants={rise} className="mt-11">
        <a
          href={PROFILE.cv.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 rounded-sm border border-neutral-800 bg-neutral-900 px-5 py-3 font-mono text-[0.68rem] uppercase tracking-wider2 text-neutral-200 transition-colors duration-300 hover:border-neutral-600 hover:bg-neutral-850 hover:text-neutral-50"
        >
          {PROFILE.cv.label}
          <span
            aria-hidden
            className="translate-y-px text-neutral-500 transition-transform duration-300 group-hover:translate-y-1 group-hover:text-neutral-300"
          >
            ↓
          </span>
        </a>
      </motion.div>

      {/* Socials */}
      <motion.nav
        variants={rise}
        aria-label="Elsewhere"
        className="mt-14 border-t border-neutral-800 pt-7"
      >
        <ul className="flex flex-col gap-px">
          {PROFILE.socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                {...(s.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group flex items-center justify-between gap-6 py-2.5"
              >
                <span className="flex items-center gap-3 font-mono text-[0.68rem] uppercase tracking-wider2 text-neutral-500 transition-colors group-hover:text-neutral-300">
                  <span className="text-neutral-600 transition-colors group-hover:text-neutral-200">
                    <SocialIcon name={s.icon} />
                  </span>
                  {s.label}
                </span>
                <span className="flex items-center gap-2 text-[0.9rem] text-neutral-400 transition-colors group-hover:text-neutral-50">
                  {s.handle}
                  <span
                    aria-hidden
                    className="text-neutral-600 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-neutral-400"
                  >
                    ↗
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </motion.nav>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TAB 2 — ENTER MY WORLD
   ═══════════════════════════════════════════════════════════════════════════ */

function WorldTab() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="mx-auto w-full max-w-5xl">
      <header className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-[0.65rem] uppercase tracking-brutal text-neutral-500">
          Dual Engine
        </p>
        <h2 className="mt-5 text-[clamp(1.5rem,3.4vw,2.05rem)] font-medium leading-tight tracking-[-0.03em] text-neutral-50">
          Two ways of looking at the same thing
        </h2>
        <p className="mx-auto mt-4 max-w-[42ch] text-[0.95rem] leading-[1.7] text-neutral-400">
          One side is about building. The other is about judgement. Pick where
          you want to start.
        </p>
      </header>

      <div
        className="mt-14 grid gap-px overflow-hidden rounded-sm border border-neutral-800 bg-neutral-800 md:grid-cols-2"
        onMouseLeave={() => setActive(null)}
      >
        {ENGINES.map((engine, i) => {
          const isArchitect = engine.key === "architect";
          const dimmed = active !== null && active !== engine.key;

          return (
            <motion.div
              key={engine.key}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.08 + i * 0.08 }}
              onMouseEnter={() => setActive(engine.key)}
              onFocusCapture={() => setActive(engine.key)}
            >
              <motion.div
                animate={{ opacity: dimmed ? 0.45 : 1 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="h-full"
              >
                <Link
                  href={engine.href}
                  data-lens={engine.key}
                  className="group relative flex h-full flex-col justify-between overflow-hidden bg-neutral-950 p-8 transition-colors duration-500 hover:bg-neutral-900 focus-visible:bg-neutral-900 sm:p-10"
                >
                  {/* faint texture, only on hover */}
                  <span
                    aria-hidden
                    className={[
                      "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100",
                      isArchitect ? "env-blueprint-fine" : "",
                    ].join(" ")}
                    style={
                      isArchitect
                        ? undefined
                        : {
                            background:
                              "radial-gradient(ellipse 60% 55% at 70% 25%, rgb(var(--observer-glow) / 0.10), transparent 70%)",
                          }
                    }
                  />

                  <div className="relative">
                    <div className="flex items-center gap-3">
                      <span
                        className={[
                          "font-mono text-[0.65rem] tabular-nums",
                          isArchitect
                            ? "text-architect-accent/80"
                            : "text-observer-accent/80",
                        ].join(" ")}
                      >
                        {engine.index}
                      </span>
                      <span aria-hidden className="h-px w-6 bg-neutral-700" />
                      <span className="font-mono text-[0.62rem] uppercase tracking-wider2 text-neutral-500">
                        {engine.kicker}
                      </span>
                    </div>

                    <h3
                      className={[
                        "mt-6 leading-[1.05] text-neutral-50",
                        isArchitect
                          ? "font-mono text-[1.65rem] font-medium tracking-[-0.01em]"
                          : "font-serif text-[1.95rem] font-normal italic tracking-[-0.02em]",
                      ].join(" ")}
                    >
                      {engine.title}
                    </h3>

                    <p className="mt-4 max-w-[38ch] text-[0.925rem] leading-[1.7] text-neutral-400">
                      {engine.summary}
                    </p>

                    <ul className="mt-6 space-y-1.5">
                      {engine.topics.map((t) => (
                        <li
                          key={t}
                          className="flex items-baseline gap-2.5 font-mono text-[0.68rem] uppercase tracking-wider2 text-neutral-500"
                        >
                          <span
                            aria-hidden
                            className={
                              isArchitect
                                ? "text-architect-accent/60"
                                : "text-observer-accent/60"
                            }
                          >
                            {isArchitect ? "├" : "—"}
                          </span>
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="relative mt-10 flex items-center gap-2.5">
                    <span
                      className={[
                        "font-mono text-[0.66rem] uppercase tracking-wider2 text-neutral-300 transition-colors duration-300",
                        isArchitect
                          ? "group-hover:text-architect-accent"
                          : "group-hover:text-observer-accent",
                      ].join(" ")}
                    >
                      {engine.enter}
                    </span>
                    <span
                      aria-hidden
                      className={[
                        "transition-transform duration-300 group-hover:translate-x-1",
                        isArchitect
                          ? "text-architect-accent"
                          : "text-observer-accent",
                      ].join(" ")}
                    >
                      →
                    </span>
                  </div>

                  <span
                    aria-hidden
                    className={[
                      "absolute bottom-0 left-0 h-px w-0 transition-all duration-700 ease-synapse group-hover:w-full",
                      isArchitect
                        ? "bg-architect-accent/50"
                        : "bg-observer-accent/50",
                    ].join(" ")}
                  />
                </Link>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      <p className="mt-8 text-center font-mono text-[0.62rem] uppercase tracking-wider2 text-neutral-600">
        Essays on both sides link across to each other
      </p>
    </div>
  );
}
