import type { VercelRequest, VercelResponse } from '@vercel/node';
import { randomUUID } from 'crypto';
import { INITIAL_TRACKS } from '../../src/data/courses.js';
import { getActiveCoupon } from '../../src/data/coupons.js';
import { getSupabaseAdmin } from '../_lib/supabaseAdmin.js';

// Starts a real Paystack transaction for a one-time track unlock. The price is looked up
// server-side from INITIAL_TRACKS - never trust an amount the client sends, or someone
// could tamper with it in devtools before this request fires.
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

  const { trackId, userId, email, channels, couponCode } = req.body || {};
  if (!trackId || typeof trackId !== 'string') {
    res.status(400).json({ error: 'trackId is required' });
    return;
  }
  if (!userId || typeof userId !== 'string') {
    res.status(400).json({ error: 'You must be signed in to unlock a system' });
    return;
  }
  if (!email || typeof email !== 'string') {
    res.status(400).json({ error: 'email is required' });
    return;
  }

  const track = INITIAL_TRACKS.find((t) => t.id === trackId);
  if (!track) {
    res.status(404).json({ error: 'Unknown system' });
    return;
  }

  const normalizedCoupon = typeof couponCode === 'string' ? couponCode.trim().toUpperCase() : '';
  const activeCoupon = getActiveCoupon(normalizedCoupon);
  const discount = activeCoupon?.discount || 0;
  const chargeAmount = discount > 0 ? Math.round(track.price * (1 - discount)) : track.price;

  const reference = `af_${trackId}_${Date.now()}_${randomUUID().slice(0, 8)}`;
  const origin = req.headers.origin || `https://${req.headers.host}`;

  try {
    const paystackRes = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        amount: chargeAmount * 100, // Paystack expects the smallest currency unit
        currency: 'KES',
        reference,
        callback_url: `${origin}/payment/callback`,
        channels: Array.isArray(channels) && channels.length > 0 ? channels : undefined,
        metadata: {
          trackId,
          userId,
          trackTitle: track.title,
          couponCode: discount > 0 ? normalizedCoupon : undefined,
        },
      }),
    });

    const paystackData = await paystackRes.json();
    if (!paystackRes.ok || !paystackData.status) {
      console.error('Paystack initialize failed', paystackData);
      res.status(502).json({ error: 'Could not start payment. Try again in a moment.' });
      return;
    }

    const admin = getSupabaseAdmin();
    const { error: insertError } = await admin.from('purchases').insert({
      user_id: userId,
      track_id: trackId,
      reference,
      amount: chargeAmount,
      currency: 'KES',
      status: 'pending',
    });
    if (insertError) {
      // Not fatal - the verify/webhook step upserts on reference anyway - but worth
      // knowing about if it happens a lot.
      console.error('Failed to record pending purchase', insertError);
    }

    res.json({ authorization_url: paystackData.data.authorization_url, reference });
  } catch (err) {
    console.error('Payment initialize error', err);
    res.status(500).json({ error: 'Something went wrong starting payment' });
  }
}
