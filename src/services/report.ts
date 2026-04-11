/**
 * Report generator — CHANGED in this PR (introduces a finding).
 * Should be INCLUDED by changed-only analysis and flag the eval() call.
 */
export function buildReport(template: string, data: Record<string, unknown>): string {
  // FINDING: eval with user-controlled template — code injection risk
  return eval('`' + template + '`');
}
