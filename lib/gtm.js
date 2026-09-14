// GA4 ecommerce dataLayer helpers.
//
// Every ecommerce push clears the previous `ecommerce` object first (Google's
// documented pattern) so items from an earlier event can never leak into the
// next one. Tags themselves are gated inside GTM by Consent Mode v2 — these
// pushes always happen, GTM decides whether anything is sent to GA4.

export const CURRENCY = 'AUD'

export function pushToDataLayer(payload) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(payload)
}

// Cart items and catalog products share the same shape: { id, name, price }.
export function toItem(product, index) {
  const item = {
    item_id: product.id,
    item_name: product.name,
    price: Number(product.price) || 0,
    quantity: Number(product.quantity) || 1,
  }

  if (typeof index === 'number') item.index = index

  return item
}

export function itemsValue(items) {
  const value = items.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
    0
  )

  return Math.round(value * 100) / 100
}

function pushEcommerce(event, ecommerce) {
  pushToDataLayer({ ecommerce: null })
  pushToDataLayer({ event, ecommerce })
}

export function trackViewItem(products) {
  const list = Array.isArray(products) ? products : [products]
  if (list.length === 0) return

  const items = list.map((product, i) => toItem(product, i))

  pushEcommerce('view_item', {
    currency: CURRENCY,
    value: itemsValue(items),
    items,
  })
}

export function trackAddToCart(product, quantity = 1) {
  if (!product?.id) return

  const items = [toItem({ ...product, quantity })]

  pushEcommerce('add_to_cart', {
    currency: CURRENCY,
    value: itemsValue(items),
    items,
  })
}

export function trackViewCart(cart) {
  if (!Array.isArray(cart) || cart.length === 0) return

  const items = cart.map((product, i) => toItem(product, i))

  pushEcommerce('view_cart', {
    currency: CURRENCY,
    value: itemsValue(items),
    items,
  })
}

export function trackBeginCheckout(cart) {
  if (!Array.isArray(cart) || cart.length === 0) return

  const items = cart.map((product, i) => toItem(product, i))

  pushEcommerce('begin_checkout', {
    currency: CURRENCY,
    value: itemsValue(items),
    items,
  })
}

// `ecommerce` here comes straight from /api/checkout-session — i.e. from
// Stripe, server-side, only once the payment is confirmed paid.
export function trackPurchase(ecommerce) {
  if (!ecommerce?.transaction_id) return

  pushEcommerce('purchase', ecommerce)
}
