import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Returns GA4 purchase data for a Checkout Session, built SERVER-SIDE from
// Stripe — never from the client. Nothing is returned unless Stripe confirms
// the session is actually paid, so the purchase event cannot be faked by
// hitting /checkout/success?session_id=... with a made-up id.
//
// Deliberately returns no customer PII (no name, email, address) — this
// response ends up in the browser dataLayer.
export async function GET(req) {
  const sessionId = new URL(req.url).searchParams.get('session_id')

  if (!sessionId || !sessionId.startsWith('cs_')) {
    return Response.json({ error: 'Missing session_id' }, { status: 400 })
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items'],
    })

    if (session.payment_status !== 'paid') {
      return Response.json(
        { paid: false, error: 'Payment not completed' },
        { status: 402 }
      )
    }

    const items = (session.line_items?.data || []).map((line, index) => ({
      item_id: line.price?.id || line.id,
      item_name: line.description || 'SportsLab Booking',
      price:
        line.price?.unit_amount != null
          ? line.price.unit_amount / 100
          : (line.amount_total || 0) / 100 / (line.quantity || 1),
      quantity: line.quantity || 1,
      index,
    }))

    return Response.json(
      {
        paid: true,
        ecommerce: {
          // Stripe's Payment Intent id is the stable per-transaction id and is
          // what reconciles against the Stripe dashboard. Falls back to the
          // session id if the intent is somehow absent.
          transaction_id:
            (typeof session.payment_intent === 'string'
              ? session.payment_intent
              : session.payment_intent?.id) || session.id,
          value: (session.amount_total || 0) / 100,
          currency: (session.currency || 'aud').toUpperCase(),
          tax: (session.total_details?.amount_tax || 0) / 100,
          shipping: (session.total_details?.amount_shipping || 0) / 100,
          items,
        },
      },
      // Never cache — one buyer's transaction must never be served to another.
      { headers: { 'Cache-Control': 'no-store' } }
    )
  } catch (error) {
    console.error('CHECKOUT SESSION LOOKUP ERROR:', error.message)
    return Response.json({ error: 'Session not found' }, { status: 404 })
  }
}
