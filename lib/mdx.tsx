import { MDXRemote } from "next-mdx-remote-client/rsc";
import type { MDXRemoteOptions } from "next-mdx-remote-client/rsc";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode, {
  type Options as PrettyCodeOptions,
} from "rehype-pretty-code";

import type { Hemisphere } from "@/lib/content";
import SynapticLink from "@/components/SynapticLink";
import MarginNote from "@/components/MarginNote";
import Schematic from "@/components/Schematic";
import SpecTable from "@/components/SpecTable";
import Axiom from "@/components/Axiom";
import DiaryFragment from "@/components/DiaryFragment";

const prettyCode: PrettyCodeOptions = {
  theme: "github-dark-dimmed",
  keepBackground: false,
  defaultLang: { block: "text", inline: "text" },
};

/** One pipeline, both hemispheres. LaTeX is available everywhere — the
 *  Observer occasionally needs an equation to make a joke land. */
const mdxOptions: MDXRemoteOptions = {
  parseFrontmatter: false,
  mdxOptions: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [
      rehypeSlug,
      [rehypeKatex, { strict: false, throwOnError: false, output: "html" }],
      [rehypePrettyCode, prettyCode],
    ],
  },
};

/** Components shared by both reading environments. */
const shared = {
  SynapticLink,
  MarginNote,
  Schematic,
  SpecTable,
  Axiom,
  DiaryFragment,
};

/** Extra components only meaningful in one hemisphere get aliased so an
 *  author can't accidentally summon a blueprint plate inside a diary entry. */
function componentsFor(hemisphere: Hemisphere) {
  return hemisphere === "architect"
    ? shared
    : {
        ...shared,
        // In the Observer, an unlabelled MarginNote defaults to diary tone
        // already; nothing to override. Kept explicit for future divergence.
      };
}

export function MDXBody({
  source,
  hemisphere,
}: {
  source: string;
  hemisphere: Hemisphere;
}) {
  return (
    <MDXRemote
      source={source}
      options={mdxOptions}
      components={componentsFor(hemisphere)}
    />
  );
}
