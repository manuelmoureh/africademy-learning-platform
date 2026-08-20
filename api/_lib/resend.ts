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
