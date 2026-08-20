import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createHmac, timingSafeEqual } from 'crypto';
import { getSupabaseAdmin } from '../_lib/supabaseAdmin.js';

// Disable Vercel's automatic body parsing - signature verification has to run against the
// exact raw bytes Paystack sent, not a re-serialized JSON.parse of them, or a byte-for-byte
// mismatch (key order, whitespace) would make every signature look invalid.
export const config = {
  api: { bodyParser: false },
};

function getRawBody(req: VercelRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

// The authoritative confirmation, called by Paystack's own servers (not the customer's
// browser) once a transaction settles. This is what should actually be trusted in
// production - the /payment/callback page's verify call is a same-second UX nicety, this
// webhook is what's guaranteed to eventually fire regardless of whether the customer's
// browser makes it back to the callback page at all.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    res.status(500).json({ error: 'Payments are not configured yet' });
    return;
  }

  const rawBody = await getRawBody(req);
  const signature = req.headers['x-paystack-signature'];

  const expectedSignature = createHmac('sha512', secretKey).update(rawBody).digest('hex');
  const signatureBuffer = Buffer.from(typeof signature === 'string' ? signature : '', 'utf8');
  const expectedBuffer = Buffer.from(expectedSignature, 'utf8');

  const isValid =
    signatureBuffer.length === expectedBuffer.length && timingSafeEqual(signatureBuffer, expectedBuffer);

  if (!isValid) {
    // Do not process an unverified payload - anyone could POST a fake "success" event
    // without this check.
    res.status(401).json({ error: 'Invalid signature' });
    return;
  }

  let event: any;
  try {
    event = JSON.parse(rawBody.toString('utf8'));
  } catch {
    res.status(400).json({ error: 'Invalid payload' });
    return;
  }

  if (event.event === 'charge.success') {
    const tx = event.data;
    const admin = getSupabaseAdmin();
    const { error } = await admin
      .from('purchases')
      .update({ status: 'success', paid_at: new Date().toISOString() })
      .eq('reference', tx.reference);
    if (error) console.error('Webhook: failed to record successful purchase', error);
  }

  // Paystack expects a fast 200 acknowledgement regardless of downstream processing detail.
  res.status(200).json({ received: true });
}
