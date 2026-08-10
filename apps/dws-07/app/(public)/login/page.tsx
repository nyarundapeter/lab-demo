"use client";
// DWS.07 Login Page — DQ prototype standard.
// SP-MANIFEST-SOT: copy and seed users sourced from manifest.login / manifest.dev.
// Auth submit flow: PS.AUTH client SDK via /api/platform/auth.
import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { login } from "@dbp/ps-auth/client";
import { useQueryClient } from "@tanstack/react-query";
import { LoginPage, LoginCredentialsForm, MicrosoftSignInButton } from "@dbp/ui";
import { ShieldCheck, Lock, Users } from "lucide-react";

export default function LoginRoute() {
  return (
    <React.Suspense>
      <LoginPageInner />
    </React.Suspense>
  );
}

// SP-MANIFEST-SOT / FN-1: SEED_USERS is derived from manifest.dev.seed_users when declared,
// otherwise from the same platform-admin + user-01 accounts that instrumentation.ts seeds.
// These must always match — the manifest is the single source of truth.
const SEED_USERS = [
    {
      "label": "Platform Admin (tenant-alpha)",
      "email": "platform-admin@alpha.dev.local"
    },
    {
      "label": "Demo User (tenant-alpha)",
      "email": "user-01@alpha.dev.local"
    }
  ] as const;

const DEV_PASSWORD = "dbp-dev-password";

const LOGIN_FEATURES = [
  {
    icon: <ShieldCheck size={20} strokeWidth={1.5} />,
    title: "Role-based access control",
    description: "Roles and permissions governed by PS.RBAC — zero custom auth code.",
  },
  {
    icon: <Users size={20} strokeWidth={1.5} />,
    title: "Multi-tenant isolation",
    description: "Each tenant's data is fully isolated at the platform service layer.",
  },
  {
    icon: <Lock size={20} strokeWidth={1.5} />,
    title: "Governed platform security",
    description: "Auth, sessions, and audit wired from Layer 06 platform services.",
  },
];

// Session query key must match the key in useAuth() so setQueryData hits the same cache slot.
const SESSION_QUERY_KEY = ["dbp", "ps-auth", "session"] as const;

type ProviderKind = "password" | "ldap" | "entra" | "entra-external" | null;

async function fetchProvider(): Promise<ProviderKind> {
  try {
    const res = await fetch("/api/platform/auth/provider");
    if (!res.ok) return "password";
    const data = (await res.json()) as { provider: ProviderKind };
    return data.provider ?? "password";
  } catch {
    return "password";
  }
}

function LoginPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/home";
  const queryClient = useQueryClient();

  const [provider, setProvider] = React.useState<ProviderKind>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    fetchProvider().then(setProvider);
  }, []);

  async function handleSubmit({ email, password }: { email: string; password: string }) {
    setError(null);
    setLoading(true);
    try {
      const response = await login({ email, password });
      // Update the React Query session cache BEFORE navigating. Without this,
      // AuthenticatedLayout renders with the stale {user:null} cache from before
      // login and immediately redirects back to /login.
      queryClient.setQueryData(SESSION_QUERY_KEY, {
        session: response.session,
        user: response.user,
      });
      router.push(redirect);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  }

  const isFederated = provider === "entra" || provider === "entra-external";
  const subtitle = isFederated
    ? "Sign in with your Microsoft account to continue."
    : "Use your DigitalQatalyst credentials to access DWS.07.";

  return (
    <LoginPage
      productCode="DWS.07"
      productName="Your governed platform workspace."
      tagline="Sign in to access BioTest Diagnostics Servicing — powered by the DBP platform factory."
      leftOverline="Authenticated access · DWS.07"
      features={LOGIN_FEATURES}
      rightOverline="Platform access"
      title="Sign in to BioTest Diagnostics Servicing"
      subtitle={subtitle}
    >
      {isFederated ? (
        <MicrosoftSignInButton
          authorizeUrl={`/api/platform/auth/authorize?redirect=${encodeURIComponent(redirect)}`}
          label={provider === "entra-external" ? "Sign in with your Microsoft account" : "Sign in with Microsoft"}
          loading={loading}
        />
      ) : (
        <LoginCredentialsForm
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
          seedUsers={SEED_USERS}
          seedPassword={DEV_PASSWORD}
        />
      )}
    </LoginPage>
  );
}
