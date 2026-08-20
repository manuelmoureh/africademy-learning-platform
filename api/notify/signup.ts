import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sendAdminEmail, escapeHtml } from '../_lib/resend.js';

// Called by a Supabase Database Webhook on INSERT into public.profiles (Database >
// Webhooks in the Supabase dashboard). Supabase has no built-in "email the owner on
// signup" feature, so this exists purely to relay that event to Resend. Guarded by a
// shared secret header, not Paystack-style HMAC, since Supabase Database Webhooks only
// support static custom headers rather than a signed payload.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const expectedSecret = process.env.SUPABASE_WEBHOOK_SECRET;
  const providedSecret = req.headers['x-webhook-secret'];
  if (!expectedSecret || providedSecret !== expectedSecret) {
    res.status(401).json({ error: 'Invalid webhook secret' });
    return;
  }

  const { type, record } = req.body || {};
  if (type !== 'INSERT' || !record) {
    res.status(200).json({ skipped: true });
    return;
  }

  await sendAdminEmail(
    `New Afridemy sign-up: ${record.name || record.email}`,
    `
      <h2>New sign-up</h2>
      <p><strong>Name:</strong> ${escapeHtml(record.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(record.email)}</p>
      <p><strong>Location:</strong> ${escapeHtml(record.location)}</p>
      <p><strong>Signed up at:</strong> ${escapeHtml(record.created_at)}</p>
    `
  );

  res.status(200).json({ received: true });
}
