'use client'

import { useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { trackPurchase } from '@/lib/gtm'

const STORAGE_PREFIX = 'sportslab_purchase_'

// Fires the GA4 `purchase` event on /checkout/success — but only after the
// server has confirmed with Stripe that the session was actually paid, and
// only once per transaction (guarded in localStorage, so a refresh, a back
// navigation or reopening the success URL in a new tab cannot duplicate it).
export default function PurchaseTracker() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const { clearCart } = useCart()

  // React StrictMode runs effects twice in dev; this keeps the fetch to one.
  const handled = useRef(false)

  useEffect(() => {
    if (!sessionId || handled.current) return
    handled.current = true

    const key = STORAGE_PREFIX + sessionId

    try {
      if (localStorage.getItem(key)) return
    } catch {
      // Storage blocked — fall through and accept the small duplicate risk
      // rather than losing the event entirely.
    }

    let cancelled = false

    ;(async () => {
      try {
        const res = await fetch(
          `/api/checkout-session?session_id=${encodeURIComponent(sessionId)}`
        )

        if (!res.ok) return

        const data = await res.json()
        if (cancelled || !data?.paid || !data.ecommerce) return

        // Mark BEFORE pushing, so a crash mid-push still cannot double-count.
        try {
          localStorage.setItem(key, String(Date.now()))
        } catch {}

        trackPurchase(data.ecommerce)

        // The order is now paid and recorded — empty the cart so a returning
        // visitor does not re-checkout the same items.
        clearCart?.()
      } catch (err) {
        console.error('PURCHASE TRACKING ERROR:', err)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [sessionId, clearCart])

  return null
}
