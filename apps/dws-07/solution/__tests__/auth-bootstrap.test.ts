// SOLUTION-OWNED bootstrap smoke test — emitted once by scaffold-solution.
// Proves instrumentation.node.ts registerNode() resolves: schema registration, seed
// wiring, and auth-provider bootstrap all succeed against the in-memory platform
// services. Imports registerNode() directly (not instrumentation.ts's register()
// dispatcher) since the dispatcher only calls through when NEXT_RUNTIME==="nodejs",
// which vitest does not set — importing the dispatcher here would make this test a
// silent no-op.
import { describe, it, expect } from "vitest";

describe("instrumentation bootstrap", () => {
  it("registerNode() resolves without throwing", async () => {
    // Session-secret fail-fast (BC-1) needs a value before the module loads.
    process.env.DBP_AUTH_SESSION_SECRET ??= "test-only-session-secret-0123456789abcdef";
    const { registerNode } = await import("../../instrumentation.node");
    await expect(registerNode()).resolves.not.toThrow();
  });
});
