/** @type {import('next').NextConfig} */
const nextConfig = {
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

module.exports = nextConfig;
