import type { NextConfig } from "next";

// Node.js-only deps from @dbp/ps-auth (SAML/LDAP/MSAL providers). Marking as
// external prevents webpack from bundling them into server/instrumentation chunks.
// Also covers jsonwebtoken/jws which are transitive deps of @azure/msal-node.
const SERVER_EXTERNAL_PACKAGES = [
  "@node-saml/node-saml",
  "ldapts",
  "@azure/msal-node",
  "@azure/msal-common",
  "jsonwebtoken",
  "jws",
  "@dbp/platform-db",
  "drizzle-orm",
];

const nextConfig: NextConfig = {
  serverExternalPackages: SERVER_EXTERNAL_PACKAGES,
  transpilePackages: [
  "@dbp/config",
  "@dbp/contracts",
  "@dbp/design-tokens",
  "@dbp/flags",
  "@dbp/nav-gating",
  "@dbp/organisms",
  "@dbp/ps-ai",
  "@dbp/ps-apigw",
  "@dbp/ps-audit",
  "@dbp/ps-auth",
  "@dbp/ps-data",
  "@dbp/ps-events",
  "@dbp/ps-notif",
  "@dbp/ps-org",
  "@dbp/ps-queue",
  "@dbp/ps-rbac",
  "@dbp/ps-scheduler",
  "@dbp/ps-search",
  "@dbp/ps-workflow",
  "@dbp/scaffold-cli",
  "@dbp/scaffold-tools",
  "@dbp/shell-landing",
  "@dbp/shell-transaction",
  "@dbp/test-kit",
  "@dbp/ui"
],
  webpack(config, { isServer }) {
    if (isServer) {
      const prev = Array.isArray(config.externals)
        ? config.externals
        : config.externals
        ? [config.externals]
        : [];
      config.externals = [
        ...prev,
        (
          { request }: { request?: string },
          callback: (err?: Error | null, result?: string) => void,
        ) => {
          if (request && SERVER_EXTERNAL_PACKAGES.some((p) => request === p || request.startsWith(p + "/"))) {
            return callback(null, "commonjs " + request);
          }
          callback();
        },
      ];
    }
    return config;
  },
  // Pins the workspace root to this standalone repo so Next.js doesn't infer it
  // from an unrelated lockfile higher up the user's filesystem (e.g. a stray
  // ~/package-lock.json), which otherwise prints a "workspace root" warning.
  outputFileTracingRoot: __dirname,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  experimental: {
    extensionAlias: { ".js": [".ts", ".tsx", ".js"], ".jsx": [".tsx", ".jsx"] },
    optimizePackageImports: ["lucide-react", "@dbp/ui"],
  },
};
export default nextConfig;
