import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  reactCompiler: true,
  typedRoutes: true,
  turbopack: {},
  experimental: {
    swcPlugins: [["@swc-jotai/react-refresh", {}]],
  },
  transpilePackages: ["jotai-devtools"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/PokeAPI/sprites/master/sprites/pokemon/**",
      },
    ],
  },
};

export default withSentryConfig(nextConfig, {
  silent: true,
  org: "kadeem-lewis",
  project: "pokedexle",

  authToken: process.env.SENTRY_AUTH_TOKEN,
  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers. (increases server load)
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: "/monitoring",

  // Hides source maps from generated client bundles
  sourcemaps: {
    disable: true,
  },
});
