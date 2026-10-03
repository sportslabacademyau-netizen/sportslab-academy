// Authoritative server-side product catalog.
// Prices live here, NOT in the client cart, so they cannot be tampered with.
// Prices are in AUD dollars (converted to cents at checkout).
//
// To re-enable `camp-two-weeks`, add it here with its real price.

export const PRODUCTS = {
  'camp-single-day': { name: 'Single Day Camp', price: 100 },
  'late-pickup': { name: 'Late Pick-Up', price: 10 },
  'elite-soccer-clinic-single-day': { name: 'Elite Soccer Clinic - Single Day', price: 50 },
  'elite-soccer-clinic-3-day-block': { name: 'Elite Soccer Clinic - 3 Day Block', price: 125 },
  'elite-soccer-clinic-full-program': { name: 'Elite Soccer Clinic - Full Program', price: 225 },
  'junior-casual': { name: 'Junior Program - Casual Pass (1 session)', price: 25 },
  'junior-term4-1x': { name: 'Junior Program - Term 4 (8 sessions)', price: 170 },
}

// Test product — only usable outside production.
export const TEST_PRODUCT = { id: 'test-payment', name: 'Test Payment', priceCents: 50 }

export function getProduct(id) {
  return PRODUCTS[id] || null
}
