import type { NextConfig } from "next";

const repoName =
  process.env.GITHUB_REPOSITORY?.split("/")[1] ??
  process.env.NEXT_PUBLIC_REPO_NAME;
const isUserSite = !!repoName && repoName.endsWith(".github.io");
const isProd = process.env.NODE_ENV === "production";
const base = isProd && repoName && !isUserSite ? `/${repoName}` : undefined;

const nextConfig: NextConfig = {
  output: "export",
  basePath: base,
  assetPrefix: base ? `${base}/` : undefined,
  trailingSlash: true,
};

export default nextConfig;

