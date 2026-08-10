"use client";

import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { configureAuthClient } from "@dbp/ps-auth/client";
import { configureRbacClient } from "@dbp/ps-rbac/client";
import { configureDataClient } from "@dbp/ps-data/client";
import { configureAuditClient } from "@dbp/ps-audit/client";
import { configureNotifClient } from "@dbp/ps-notif/client";
import { configureSearchClient } from "@dbp/ps-search/client";

// Seed tenant — tenant-aware clients (data/workflow/audit/search) bind to this
// at boot so queries resolve to seeded data rather than the empty "default" tenant.
// SP-MANIFEST-SOT: tenant id sourced from manifest.dev.tenant_id (default: tenant-alpha).
const TENANT_ID = "tenant-alpha";

// Configure all wired platform service clients once, at app boot.
// baseUrl points to the generated API mount in this app (app/api/platform/<dir>).
configureAuthClient({ baseUrl: "/api/platform/auth" });
configureRbacClient({ baseUrl: "/api/platform/rbac" });
configureDataClient({ baseUrl: "/api/platform/data", tenantId: TENANT_ID });
configureAuditClient({ baseUrl: "/api/platform/audit", tenantId: TENANT_ID });
configureNotifClient({ baseUrl: "/api/platform/notif" });
configureSearchClient({ baseUrl: "/api/platform/search", tenantId: TENANT_ID });

export function Providers({ children }: { children: React.ReactNode }) {
  // useState so Fast Refresh doesn't recreate the client on every code edit,
  // which would clear the session cache and cause a spurious logout redirect.
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
