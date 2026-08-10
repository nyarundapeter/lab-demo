/**
 * scripts/lib/baseline-gate.mjs — shared boilerplate for adoption-mode scanner
 * gates (docs/09-plans/minimum-test-plan-build-spec-2026-07-07.md).
 *
 * Extracted from three near-identical copies (check-test-requirements.mjs,
 * check-structured-logs.mjs, check-compliance-starter.mjs) after a PR review
 * flagged the duplication as a maintainability risk once a 4th/5th gate is
 * added. Each caller still owns its own detection logic (what counts as a
 * finding); this module only owns the read-baseline / diff / warn / exit
 * contract every one of them implements identically:
 *
 *   default   — adoption mode: always exit 0, prints each finding as a warn.
 *   --update  — regenerate the baseline from the current findings, exit 0.
 *   --strict  — exit 1 only if a NEW (non-baselined) finding is present.
 *
 * Callers pass a `keyFn` (finding -> string) so the "is this a known,
 * baselined finding or a new one" check is script-specific, and a
 * `formatWarn(finding, isNew)` so the per-finding message text stays
 * script-specific too.
 */

import fs from "node:fs";
import path from "node:path";

/**
 * @param {object} opts
 * @param {string} opts.scanName - short label used in summary/log lines, e.g. "structured-logs"
 * @param {string} opts.baselinePath - absolute path to the baseline JSON file
 * @param {Array<object>} opts.findings - findings from this run (already detected by the caller)
 * @param {(finding: object) => string} opts.keyFn - stable identity key for a finding
 * @param {(finding: object, isNew: boolean) => string} opts.formatWarn - per-finding warn message
 *   (the text AFTER the "WARN  NEW " / "WARN  known " prefix, which this module adds)
 * @param {(counts: {scanned?: number, total: number, baselined: number, newCount: number}) => string} opts.summaryLine
 *   - full summary line text (without the leading "\n[scanName] " prefix, which this module adds)
 * @param {string} opts.strictFailHint - one-line suggestion appended to the STRICT failure message
 * @param {number} [opts.scanned] - optional "N artifacts/files scanned" count, passed through to summaryLine
 * @param {boolean} opts.strict - whether --strict was passed
 * @param {boolean} opts.updateMode - whether --update was passed
 * @param {(p: string) => string} opts.toPosix - path normalizer, for the "git add" hint
 * @param {string} opts.repoRoot - absolute repo root, for the "git add" hint's relative path
 */
export function runBaselineGate({
  scanName,
  baselinePath,
  findings,
  keyFn,
  formatWarn,
  summaryLine,
  strictFailHint,
  scanned,
  strict,
  updateMode,
  toPosix,
  repoRoot,
}) {
  if (updateMode) {
    fs.mkdirSync(path.dirname(baselinePath), { recursive: true });
    fs.writeFileSync(baselinePath, JSON.stringify(findings, null, 2) + "\n", "utf8");
    console.log(`\n${path.basename(baselinePath)} updated (${findings.length} known entries).`);
    console.log(`Run: git add ${toPosix(path.relative(repoRoot, baselinePath))}`);
    process.exit(0);
  }

  const baseline = fs.existsSync(baselinePath)
    ? JSON.parse(fs.readFileSync(baselinePath, "utf8"))
    : [];
  const baselineKeys = new Set(baseline.map(keyFn));

  const baselined = findings.filter((f) => baselineKeys.has(keyFn(f)));
  const newFindings = findings.filter((f) => !baselineKeys.has(keyFn(f)));

  for (const f of newFindings) {
    console.warn(`WARN  NEW  ${formatWarn(f, true)}`);
  }
  for (const f of baselined) {
    console.warn(`WARN  known  ${formatWarn(f, false)}`);
  }

  console.log(
    `\n[${scanName}] ${summaryLine({ scanned, total: findings.length, baselined: baselined.length, newCount: newFindings.length })}`,
  );

  if (!fs.existsSync(baselinePath) && findings.length > 0) {
    console.log(
      `[${scanName}] no baseline file found — run this script with --update to record current ` +
      `findings as known debt, then commit ${toPosix(path.relative(repoRoot, baselinePath))}.`,
    );
  }

  if (strict && newFindings.length > 0) {
    console.error(
      `[${scanName}] STRICT mode: ${newFindings.length} NEW finding(s) — failing. ${strictFailHint}`,
    );
    process.exit(1);
  }
  if (!strict) {
    console.log(`[${scanName}] adoption mode: findings reported, exit 0. Use --strict to gate.`);
  }
  process.exit(0);
}
