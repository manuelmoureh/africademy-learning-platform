// Escapes user-controlled values before they're interpolated into an HTML email body.
// Both signup and payment payloads (name, email, location) originate from data a client
// ultimately controls, so unescaped interpolation would let HTML/link injection reach an
// admin's inbox.
export function escapeHtml(value: unknown): string {
  return String(value ?? '-')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Server-only helper for admin notification emails (new sign-ups, payments). Not user-facing
// mail - that's Supabase Auth's job. Fails soft: callers log and continue on error rather
// than blocking the request that triggered the notification (a signup or a payment should
// never fail because an alert email didn't send).
export async function sendAdminEmail(subject: string, html: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.NOTIFY_EMAIL;

  if (!apiKey || !from || !to) {
    console.error('Resend not configured - skipping admin email:', subject);
    return;
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from, to, subject, html }),
    });
    if (!res.ok) {
      console.error('Resend send failed', res.status, await res.text());
    }
  } catch (err) {
    console.error('Resend send error', err);
  }
}
