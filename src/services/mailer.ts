/**
 * Mailer service — clean file, not changed in this PR.
 * Should be SKIPPED by changed-only analysis.
 */
export async function sendEmail(to: string, subject: string, body: string): Promise<void> {
  // placeholder — real impl would call an email provider
  console.log(`Sending email to ${to}: ${subject}`);
}
