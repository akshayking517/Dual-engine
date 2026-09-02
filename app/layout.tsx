import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import LensToggle from "@/components/LensToggle";
import "./globals.css";

/**
 * FONTS
 * Loaded via <link> so the build never depends on network access at compile
 * time. The families map onto the --font-mono / --font-serif / --font-sans
 * variables already declared in globals.css.
 *
 * To self-host instead (recommended once you deploy), swap this block for:
 *
 *   import { Inter, JetBrains_Mono, Newsreader } from "next/font/google";
 *   const mono  = JetBrains_Mono({ subsets:["latin"], variable:"--font-mono",
 *                                  weight:["300","400","500","600"] });
 *   const serif = Newsreader({ subsets:["latin"], variable:"--font-serif",
 *                              style:["normal","italic"],
 *                              weight:["300","400","500","600"] });
 *   const sans  = Inter({ subsets:["latin"], variable:"--font-sans" });
 *
 * …and add `${mono.variable} ${serif.variable} ${sans.variable}` to <html>.
 */
const GOOGLE_FONTS =
  "https://fonts.googleapis.com/css2" +
  "?family=JetBrains+Mono:wght@300;400;500;600" +
  "&family=Newsreader:ital,opsz,wght@0,6..72,300..600;1,6..72,300..600" +
  "&family=Inter:wght@300..700" +
  "&display=swap";

/**
 * Site-level metadata. Kept literal so this file has no imports of its own —
 * `app/page.tsx` carries the personal details and can be edited independently.
 */
export const metadata: Metadata = {
  metadataBase: new URL("https://dual-engine.local"),
  title: {
    default: "Dual Engine — Akshay",
    template: "%s · Dual Engine",
  },
  description:
    "Two ways of looking at the same thing. The Architect is about building. The Observer is about judgement.",
  openGraph: {
    type: "website",
    title: "Dual Engine — Akshay",
    description:
      "The Architect builds it. The Observer decides whether it should exist.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-lens="architect" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href={GOOGLE_FONTS} />
      </head>
      <body className="min-h-[100svh] bg-neutral-950 font-sans text-neutral-50 antialiased">
        <ThemeProvider>
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-surface-raised focus:px-4 focus:py-2 focus:font-mono focus:text-xs"
          >
            Skip to content
          </a>
          {children}
          <LensToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
