"use client";
// Thin client-side wrapper that mounts the Toaster from @dbp/ui.
// Imported by layout.tsx (server component) — the "use client" boundary here
// prevents Next.js from trying to run @dbp/ui's client hooks on the server.
import { Toaster } from "@dbp/ui";

export function ToasterMount() {
  return <Toaster />;
}
