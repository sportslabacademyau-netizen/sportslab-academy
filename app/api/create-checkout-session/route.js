import Stripe from 'stripe'
import { getProduct, TEST_PRODUCT } from '@/lib/products'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(req) {
  try {
    const { cart, form } = await req.json()

    if (!Array.isArray(cart) || cart.length === 0) {
      return Response.json(
        { error: 'Cart is empty' },
        { status: 400 }
      )
    }

    // Build line items from the SERVER-SIDE catalog only.
    // Client-supplied price/name are ignored to prevent price tampering.
    const line_items = []

    for (const item of cart) {
      const quantity = Number(item?.quantity)

      if (!Number.isInteger(quantity) || quantity < 1 || quantity > 50) {
        return Response.json(
          { error: `Invalid quantity for item "${item?.id}"` },
          { status: 400 }
        )
      }

      // Test product is only allowed outside production.
      if (item?.id === TEST_PRODUCT.id) {
        if (process.env.NODE_ENV === 'production') {
          return Response.json({ error: 'Invalid product' }, { status: 400 })
        }

        line_items.push({
          price_data: {
            currency: 'aud',
            product_data: { name: TEST_PRODUCT.name },
            unit_amount: TEST_PRODUCT.priceCents,
          },
          quantity,
        })
        continue
      }

      const product = getProduct(item?.id)

      if (!product) {
        return Response.json(
          { error: `Unknown product "${item?.id}"` },
          { status: 400 }
        )
      }

      line_items.push({
        price_data: {
          currency: 'aud',
          product_data: { name: product.name },
          unit_amount: Math.round(product.price * 100),
        },
        quantity,
      })
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',

      payment_method_types: ['card'],

      line_items,

      customer_email: form.email,

      metadata: {
        parentName: form.parentName || '',
        parentLastName: form.parentLastName || '',
        childName: form.childName || '',
        childDob: form.childDob || '',
        campWeek: form.campWeek || '',
        clinicWeek: form.clinicWeek || '',
        jerseySize: form.jerseySize || '',
        phone: form.phone || '',
        email: form.email || '',
        notes: form.notes || '',
        termsAccepted: form.termsAccepted || '',
        photoConsent: form.photoConsent || '',
      },

      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout`,
    })

    return Response.json({
      url: session.url,
    })

  } catch (error) {
    console.error(error)

    return Response.json(
      { error: error.message },
      { status: 500 }
    )
  }
}