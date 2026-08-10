// instrumentation.ts — Next.js instrumentation entry point for DWS.07.
// GENERATED TEMPLATE — solution-owned (create-if-missing; never overwritten by --force regen).
//
// Thin dispatcher ONLY. Next.js compiles this file for BOTH the nodejs and edge
// runtimes; the actual Node-only bootstrap logic (drizzle-orm, @dbp/ps-auth/server,
// etc.) lives in instrumentation.node.ts and must stay dynamically imported behind
// this exact `NEXT_RUNTIME === "nodejs"` check so the edge compile of this file never
// resolves it — otherwise those node-only packages leak into the Edge Function bundle
// (which Next.js merges with middleware.ts's edge function) and the Vercel build fails
// with "unsupported modules" for the "middleware" Edge Function. Do NOT inline any
// node-only import here, and do NOT change this to an early-return-on-edge pattern.
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { registerNode } = await import("./instrumentation.node.js");
    await registerNode();
  }
}
