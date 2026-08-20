// Single source of truth for discount codes, imported by both the checkout UI (for display)
// and api/payments/initialize.ts (which actually applies the discount server-side). A
// tampered client value can never change what's charged, since the server looks codes up
// here independently. expiresAt is an ISO date (end of day, UTC) - both consumers check
// it against the current time, so an expired code silently stops applying everywhere at once.
export interface Coupon {
  discount: number;
  expiresAt: string;
}

export const COUPONS: Record<string, Coupon> = {
  WELCOME99: { discount: 0.999, expiresAt: '2026-08-31T23:59:59Z' },
};

export function getActiveCoupon(code: string): Coupon | null {
  const coupon = COUPONS[code];
  if (!coupon) return null;
  if (new Date(coupon.expiresAt).getTime() < Date.now()) return null;
  return coupon;
}
