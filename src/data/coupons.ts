// Single source of truth for discount codes, imported by both the checkout UI (for display)
// and api/payments/initialize.ts (which actually applies the discount server-side). A
// tampered client value can never change what's charged, since the server looks codes up
// here independently.
export const COUPONS: Record<string, number> = {
  WELCOME99: 0.99,
};
