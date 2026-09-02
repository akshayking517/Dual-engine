"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

export type Lens = "architect" | "observer" | "split";

type LensContextValue = {
  /** The lens the user is currently inside. */
  lens: Lens;
  /** Resolved to a concrete hemisphere — `split` falls back to `architect`. */
  hemisphere: Exclude<Lens, "split">;
  setLens: (lens: Lens) => void;
  /** True on the landing page, where neither hemisphere has won yet. */
  isSplit: boolean;
};

const LensContext = createContext<LensContextValue | null>(null);

const STORAGE_KEY = "dual-engine:last-lens";

/** Derive the lens from the URL — the route is the source of truth. */
function lensFromPathname(pathname: string): Lens {
  if (pathname.startsWith("/architect")) return "architect";
  if (pathname.startsWith("/observer")) return "observer";
  return "split";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "/";
  const [lens, setLensState] = useState<Lens>(() => lensFromPathname(pathname));

  // Route changes drive the lens.
  useEffect(() => {
    setLensState(lensFromPathname(pathname));
  }, [pathname]);

  // Paint the active hemisphere on <html> so the CSS variables cascade to
  // everything — including portals and the scroll overflow colour.
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.lens = lens === "split" ? "architect" : lens;
    root.style.colorScheme = "dark";
    if (lens !== "split") {
      try {
        window.localStorage.setItem(STORAGE_KEY, lens);
      } catch {
        /* private mode — the lens simply won't be remembered */
      }
    }
  }, [lens]);

  const setLens = useCallback((next: Lens) => setLensState(next), []);

  const value = useMemo<LensContextValue>(
    () => ({
      lens,
      hemisphere: lens === "split" ? "architect" : lens,
      setLens,
      isSplit: lens === "split",
    }),
    [lens, setLens],
  );

  return <LensContext.Provider value={value}>{children}</LensContext.Provider>;
}

export function useLens(): LensContextValue {
  const ctx = useContext(LensContext);
  if (!ctx) throw new Error("useLens must be used inside <ThemeProvider>");
  return ctx;
}

/** Last hemisphere the visitor chose, for "resume where you were" affordances. */
export function readRememberedLens(): Exclude<Lens, "split"> | null {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === "architect" || v === "observer" ? v : null;
  } catch {
    return null;
  }
}
