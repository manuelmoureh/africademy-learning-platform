import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSupabaseAdmin } from '../_lib/supabaseAdmin';

// Called by the /payment/callback page right after Paystack redirects the browser back,
// so the purchase unlocks immediately rather than waiting on the webhook (which can't
// reach localhost during dev, and even in production isn't guaranteed to beat the
// redirect). Does the exact same upsert the webhook does, keyed on the unique reference,
// so it's safe for both to fire - whichever runs first wins, the second is a no-op.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    res.status(500).json({ error: 'Payments are not configured yet' });
    return;
  }

  const reference = req.query.reference;
  if (!reference || typeof reference !== 'string') {
    res.status(400).json({ error: 'reference is required' });
    return;
  }

  try {
    const paystackRes = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: { Authorization: `Bearer ${secretKey}` },
    });
    const paystackData = await paystackRes.json();

    if (!paystackRes.ok || !paystackData.status) {
      res.status(502).json({ error: 'Could not verify payment' });
      return;
    }

    const tx = paystackData.data;
    const admin = getSupabaseAdmin();

    if (tx.status === 'success') {
      const { error } = await admin
        .from('purchases')
        .update({ status: 'success', paid_at: new Date().toISOString() })
        .eq('reference', reference);
      if (error) console.error('Failed to record successful purchase', error);

      res.json({
        status: 'success',
        trackId: tx.metadata?.trackId ?? null,
      });
      return;
    }

    if (tx.status === 'failed' || tx.status === 'abandoned') {
      await admin.from('purchases').update({ status: 'failed' }).eq('reference', reference);
    }

    res.json({ status: tx.status, trackId: tx.metadata?.trackId ?? null });
  } catch (err) {
    console.error('Payment verify error', err);
    res.status(500).json({ error: 'Something went wrong verifying payment' });
  }
}
