#!/usr/bin/env node
/**
 * check-coverage-ratchet — N9, fixed-floor coverage gate (build-spec Increment C).
 *
 * Rollout stage: warn-baseline (adoption mode) — see docs/04-testing/quality-checklist.md N9.
 *
 * Unlike check-test-requirements.mjs (a "no NEW gaps" ratchet against a committed baseline),
 * this gate compares measured coverage against a FIXED target (98%, approved 2026-07-07 —
 * see docs/09-plans/minimum-test-plan-build-spec-2026-07-07.md §7 decision 3). There is no
 * baseline file: the target does not move, only the measured percentage does.
 *
 * This script does NOT run the tests itself — it reads the `coverage-summary.json` files
 * that @vitest/coverage-v8's `json-summary` reporter writes per package (each package's own
 * `coverage/coverage-summary.json`, since this is a Turborepo fan-out with no shared root
 * Vitest config), aggregates covered/total line counts across every package that has one, and
 * reports the aggregate percentage against the 98% floor.
 *
 * Modes:
 *   default   — adoption mode: always exit 0. Prints the measured % and the delta to target.
 *   --strict  — exit 1 if measured coverage < 98%. This is expected to fail today; the gate
 *               stays in warn-baseline (per the rollout ladder) until coverage is raised to
 *               the fixed floor, then flips in its own reviewed PR per the 1-week bake policy.
 *
 * Usage:
 *   pnpm test:coverage              # runs vitest --coverage across packages, then this script
 *   node scripts/check-coverage-ratchet.mjs [--strict]
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { globSync } from "node:fs";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const COVERAGE_TARGET_PCT = 98;

const args = process.argv.slice(2);
const strict = args.includes("--strict");

function toPosix(p) {
  return p.replaceAll("\\", "/");
}

const summaryFiles = globSync("**/coverage/coverage-summary.json", {
  cwd: REPO_ROOT,
  ignore: ["**/node_modules/**"],
}).map((p) => toPosix(p));

if (summaryFiles.length === 0) {
  console.warn(
    "[coverage-ratchet] no coverage-summary.json files found. Run `pnpm test:coverage` first " +
    "(turbo run test -- --coverage) to generate per-package coverage before running this gate.",
  );
  console.log(
    `[coverage-ratchet] 0 packages measured, 0.00% vs ${COVERAGE_TARGET_PCT}% target — ` +
    "nothing to report.",
  );
  if (strict) {
    console.error("[coverage-ratchet] STRICT mode: no coverage data — failing.");
    process.exit(1);
  }
  process.exit(0);
}

let coveredLines = 0;
let totalLines = 0;
const perPackage = [];

for (const rel of summaryFiles) {
  const abs = path.join(REPO_ROOT, rel);
  let summary;
  try {
    summary = JSON.parse(fs.readFileSync(abs, "utf8"));
  } catch (err) {
    console.warn(`WARN  ${rel}: could not parse (${err.message}) — skipped`);
    continue;
  }
  const total = summary.total?.lines;
  if (!total || typeof total.covered !== "number" || typeof total.total !== "number") {
    console.warn(`WARN  ${rel}: missing total.lines — skipped`);
    continue;
  }
  coveredLines += total.covered;
  totalLines += total.total;
  const pkgDir = toPosix(path.dirname(path.dirname(rel)));
  perPackage.push({ pkg: pkgDir, pct: total.total > 0 ? (total.covered / total.total) * 100 : 100 });
}

for (const p of perPackage.sort((a, b) => a.pct - b.pct)) {
  console.log(`  ${p.pkg}: ${p.pct.toFixed(2)}%`);
}

const measuredPct = totalLines > 0 ? (coveredLines / totalLines) * 100 : 0;
const delta = measuredPct - COVERAGE_TARGET_PCT;

console.log(
  `\n[coverage-ratchet] ${perPackage.length} package(s) measured, ${coveredLines}/${totalLines} lines covered ` +
  `= ${measuredPct.toFixed(2)}% vs ${COVERAGE_TARGET_PCT}% target (delta ${delta >= 0 ? "+" : ""}${delta.toFixed(2)}pp)`,
);

if (!strict) {
  console.log("[coverage-ratchet] adoption mode: gap reported, exit 0. Use --strict to gate at the fixed 98% floor.");
  process.exit(0);
}

if (measuredPct < COVERAGE_TARGET_PCT) {
  console.error(
    `[coverage-ratchet] STRICT mode: measured coverage ${measuredPct.toFixed(2)}% is below the fixed ` +
    `${COVERAGE_TARGET_PCT}% floor — failing.`,
  );
  process.exit(1);
}

console.log("[coverage-ratchet] STRICT mode: measured coverage meets the fixed floor.");
process.exit(0);
