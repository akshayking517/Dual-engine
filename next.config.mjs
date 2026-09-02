/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // MDX is compiled at build time by next-mdx-remote/rsc, so no @next/mdx
  // webpack loader is needed. Content lives in /content as raw .mdx.
  // Keep the MDX + shiki toolchain out of the RSC bundle.
  serverExternalPackages: ["shiki"],

  // "The Rigor" became "The Architect". Anything already linked to the old
  // paths keeps working instead of 404-ing.
  async redirects() {
    return [
      { source: "/rigor", destination: "/architect", permanent: true },
      {
        source: "/rigor/:slug*",
        destination: "/architect/:slug*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
