import Stripe from 'stripe'
import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const resend = new Resend(process.env.RESEND_API_KEY)

// Hardcoded project URL (see lib/supabase.js) so the webhook always writes to
// the correct Supabase project regardless of the Vercel env var. The service
// role key stays in env — it is secret and must never be committed.
const supabaseAdmin = createClient(
  'https://umlzgzhlmyzcewzzgakd.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function POST(req) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('WEBHOOK ERROR:', err.message)
    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const metadata = session.metadata || {}

    const customerEmail =
      metadata.email ||
      session.customer_email ||
      session.customer_details?.email

    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      limit: 20,
    })

    const productNames = lineItems.data.map((item) => item.description || '').join(' ')
    const productText = productNames.toLowerCase()

   let dashboardType = 'single'
let sessionsTotal = 1

if (
  productText.includes('5') ||
  productText.includes('package') ||
  productText.includes('pack') ||
  productText.includes('idp')
) {
  dashboardType = 'package'
  sessionsTotal = 5
}

if (
  productText.includes('camp') ||
  productText.includes('holiday')
) {
  dashboardType = 'holiday_camp'
  sessionsTotal = 0
}

if (
  productText.includes('junior')
) {
  dashboardType = 'junior_program'
  sessionsTotal = 0
}

    const amount = session.amount_total
      ? (session.amount_total / 100).toFixed(2)
      : '0.00'

    const currency = session.currency?.toUpperCase() || 'AUD'

    if (customerEmail) {
      await supabaseAdmin
        .from('parent_dashboard')
        .upsert(
          {
            parent_email: customerEmail,
            parent_name: `${metadata.parentName || ''} ${metadata.parentLastName || ''}`.trim(),
            child_name: metadata.childName || '',
            active_package: productNames || 'SportsLab Booking',
            dashboard_type: dashboardType,
            sessions_total: sessionsTotal,
            sessions_left: sessionsTotal,
            next_session: 'To be booked',
           active_program:
  dashboardType === 'package'
    ? '5 Session IDP Package'
    : dashboardType === 'holiday_camp'
    ? 'Holiday Camp'
    : dashboardType === 'junior_program'
    ? 'Junior Program'
    : 'Single 1:1 Session',
            program_start: '',
            coach_notes: '',
            focus_areas: null,
          },
          { onConflict: 'parent_email' }
        )
    }

    // Full per-booking record (includes DOB, consent, notes — fields the
    // dashboard table does not keep). Wrapped so a missing table or error can
    // never break the confirmation email or make us return a non-200 to Stripe.
    try {
      const { error: regError } = await supabaseAdmin
        .from('registrations')
        .upsert(
          {
            stripe_session_id: session.id,
            parent_name: metadata.parentName || '',
            parent_last_name: metadata.parentLastName || '',
            email: customerEmail || '',
            phone: metadata.phone || '',
            child_name: metadata.childName || '',
            child_dob: metadata.childDob || '',
            camp_week: metadata.campWeek || '',
            clinic_week: metadata.clinicWeek || '',
            notes: metadata.notes || '',
            terms_accepted: metadata.termsAccepted || '',
            photo_consent: metadata.photoConsent || '',
            product: productNames || 'SportsLab Booking',
            amount: Number(amount),
            currency,
          },
          { onConflict: 'stripe_session_id' }
        )

      if (regError) {
        console.error('REGISTRATIONS SAVE ERROR:', regError.message)
      }
    } catch (err) {
      console.error('REGISTRATIONS SAVE EXCEPTION:', err.message)
    }

    await resend.emails.send({
      from: 'SportsLab Academy <bookings@sportslabacademy.com.au>',
      to: ['sportslabacademyau@gmail.com', customerEmail].filter(Boolean),
      reply_to: 'sportslabacademyau@gmail.com',
      subject: `New SportsLab Academy Booking`,
      html: `
        <div style="font-family: Arial, sans-serif; background:#f5f7fb; padding:40px 20px;">
          <div style="max-width:620px; margin:0 auto; background:#ffffff; border-radius:18px; overflow:hidden; border:1px solid #e5e7eb;">
            <div style="background:#2563EB; padding:32px; text-align:center;">
              <h1 style="color:#ffffff; margin:0; font-size:28px;">SportsLab Academy</h1>
              <p style="color:#dbeafe; margin:10px 0 0; font-size:15px;">Booking Confirmation</p>
            </div>

            <div style="padding:34px; color:#111827;">
              <h2 style="margin:0 0 12px; font-size:24px;">Booking Confirmed ✅</h2>
              <p><strong>Product:</strong> ${productNames || 'SportsLab Booking'}</p>
              <p><strong>Dashboard Type:</strong> ${dashboardType}</p>
              <p><strong>Amount Paid:</strong> $${amount} ${currency}</p>

              <h3 style="margin:28px 0 8px; font-size:18px; border-top:1px solid #e5e7eb; padding-top:20px;">Registration Details</h3>
              <p><strong>Parent First Name:</strong> ${metadata.parentName || '—'}</p>
              <p><strong>Parent Last Name:</strong> ${metadata.parentLastName || '—'}</p>
              <p><strong>Email:</strong> ${customerEmail || '—'}</p>
              <p><strong>Phone:</strong> ${metadata.phone || '—'}</p>
              <p><strong>Child Name:</strong> ${metadata.childName || '—'}</p>
              <p><strong>Child Date of Birth:</strong> ${metadata.childDob || '—'}</p>
              <p><strong>Camp Week:</strong> ${metadata.campWeek || '—'}</p>
              <p><strong>Clinic Week:</strong> ${metadata.clinicWeek || '—'}</p>
              <p><strong>Notes:</strong> ${metadata.notes || '—'}</p>
              <p><strong>Terms Accepted:</strong> ${metadata.termsAccepted || '—'}</p>
              <p><strong>Photo Consent:</strong> ${metadata.photoConsent || '—'}</p>

              <p style="margin-top:34px;">
                Kind regards,<br />
                <strong>SportsLab Academy</strong>
              </p>
            </div>
          </div>
        </div>
      `,
    })
  }

  return new Response('OK', { status: 200 })
}