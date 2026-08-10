#!/usr/bin/env node
/**
 * check-structured-logs — N7, docs/09-plans/minimum-test-plan-build-spec-2026-07-07.md Increment E.
 *
 * Scans server/route/instrumentation code for bare console.log/console.error/console.warn calls.
 * No shared logger package exists yet in this repo (checked: no dedicated logging package under
 * packages/, no "logger" import convention across the platform-services server directories) —
 * this script's job in this increment is detection only, not providing a logger to migrate to.
 *
 * Scanned surfaces (server/route/instrumentation code, not client components or scripts) — see
 * SCAN_GLOBS below for the exact glob patterns:
 *   - platform-service server directories (packages/stack/platform-services)
 *   - Next.js route handlers (apps/.../app/.../route.ts)
 *   - Next.js instrumentation entry points (apps/.../instrumentation.ts)
 *
 * Modes (mirrors check-test-requirements.mjs baseline convention):
 *   default   — adoption mode: always exit 0. Prints each violation as a warn. Reads/writes
 *               infra/05-policy/structured-logs-baseline.json (known offenders at the time the
 *               baseline was last updated) so only NEW violations are called out distinctly.
 *   --strict  — exit 1 only if a NEW (non-baselined) violation is present.
 *   --update  — regenerate the baseline from the current scan and exit 0.
 *
 * Usage:
 *   node scripts/check-structured-logs.mjs [--strict] [--update]
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { globSync } from "node:fs";
import { runBaselineGate } from "./lib/baseline-gate.mjs";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BASELINE_PATH = path.join(REPO_ROOT, "infra", "05-policy", "structured-logs-baseline.json");

const args = process.argv.slice(2);
const strict = args.includes("--strict");
const updateMode = args.includes("--update");

function toPosix(p) {
  return p.replaceAll("\\", "/");
}

function glob(pattern) {
  return globSync(pattern, { cwd: REPO_ROOT, nodir: true }).map((p) => toPosix(p));
}

// Standalone parity (Increment H): a standalone repo IS the app root (no apps/* subdir), so
// the monorepo-shaped globs below would silently match nothing there. Detect which shape this
// checkout is and scan accordingly — one script, both surfaces, per the Increment H "don't
// duplicate script logic" rule.
const IS_MONOREPO = fs.existsSync(path.join(REPO_ROOT, "apps"));
const SCAN_GLOBS = IS_MONOREPO
  ? [
      "packages/stack/platform-services/*/server/**/*.ts",
      "apps/*/app/**/route.ts",
      "apps/*/instrumentation.ts",
      "apps/*/instrumentation.node.ts",
    ]
  : ["app/**/route.ts", "instrumentation.ts", "instrumentation.node.ts"];

const CONSOLE_CALL = /console\.(log|error|warn)\s*\(/;

/** @type {{file:string,line:number,method:string}[]} */
const violations = [];

const files = Array.from(new Set(SCAN_GLOBS.flatMap((g) => glob(g))));

for (const rel of files) {
  const text = fs.readFileSync(path.join(REPO_ROOT, rel), "utf8");
  const lines = text.split(/\r\n|\n/);
  lines.forEach((lineText, idx) => {
    const match = lineText.match(CONSOLE_CALL);
    if (match) {
      violations.push({ file: rel, line: idx + 1, method: `console.${match[1]}` });
    }
  });
}

// ─── baseline handling (shared helper — see scripts/lib/baseline-gate.mjs) ──

runBaselineGate({
  scanName: "structured-logs",
  baselinePath: BASELINE_PATH,
  findings: violations,
  keyFn: (v) => `${v.file}:${v.line}:${v.method}`,
  formatWarn: (v, isNew) =>
    isNew
      ? `${v.file}:${v.line}: bare ${v.method}(...) — route through a structured logger`
      : `${v.file}:${v.line}: bare ${v.method}(...)`,
  summaryLine: ({ scanned, total, baselined, newCount }) =>
    `${scanned} files scanned, ${total} bare console.* call(s) (${baselined} baselined, ${newCount} new)`,
  strictFailHint: "Route through a structured logger, or run --update to accept them into the baseline as tracked debt.",
  scanned: files.length,
  strict,
  updateMode,
  toPosix,
  repoRoot: REPO_ROOT,
});
