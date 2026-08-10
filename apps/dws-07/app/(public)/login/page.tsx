"use client";
// DWS.07 Login Page — DQ prototype standard.
// SP-MANIFEST-SOT: copy and seed users sourced from manifest.login / manifest.dev.
// Auth submit flow: PS.AUTH client SDK via /api/platform/auth.
import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { login } from "@dbp/ps-auth/client";
import { useQueryClient } from "@tanstack/react-query";
import { LoginPage, LoginCredentialsForm, MicrosoftSignInButton } from "@dbp/ui";

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
    : "Use one of the demo accounts below to sign in.";

  return (
    <LoginPage
      productCode="DWS.07"
      productName="Every exam order, one queue."
      tagline="Track walk-ins, self-bookings, and referrals from intake through to release."
      leftOverline="Staff access · BioTest Diagnostics"
      rightOverline="Staff sign-in"
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
