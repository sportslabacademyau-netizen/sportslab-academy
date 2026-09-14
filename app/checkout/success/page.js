import { Suspense } from 'react'
import PurchaseTracker from '@/components/PurchaseTracker'

// Stripe redirects here with ?session_id=cs_... — PurchaseTracker verifies the
// payment server-side and fires the GA4 purchase event. useSearchParams needs a
// Suspense boundary so the rest of this page can still be prerendered.
export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-[#0B0F19] px-6 py-16 text-white md:py-24">
      <Suspense fallback={null}>
        <PurchaseTracker />
      </Suspense>

      <div className="mx-auto max-w-4xl">

        {/* SUCCESS CARD */}
        <div className="rounded-[2.5rem] border border-white/10 bg-[#111827] p-8 shadow-2xl md:p-14">

          <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-[#2563EB] text-4xl">
            ✅
          </div>

          <p className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-[#60A5FA] md:text-sm">
            Payment Successful
          </p>

          <h1 className="mb-6 text-5xl font-black leading-[0.9] md:text-7xl">
            THANK
            <br />
            YOU
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed text-zinc-300 md:text-xl">
            Your registration has been successfully received by SportsLab Academy.
            A confirmation email will arrive shortly with your payment details.
          </p>

        </div>

        {/* NEXT STEPS */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">

          <div className="rounded-[2rem] border border-white/10 bg-[#111827] p-6 shadow-xl md:p-8">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-[#60A5FA] md:text-sm">
              Next Steps
            </p>

            <h2 className="mb-6 text-3xl font-black md:text-4xl">
              What Happens Now?
            </h2>

            <div className="space-y-4 text-base leading-relaxed text-zinc-300 md:text-lg">
              <p>✔ Your payment has been confirmed</p>
              <p>✔ Our team has received your registration</p>
              <p>✔ You will receive confirmation details by email</p>
              <p>✔ Coaching players can now book their session time below</p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#2563EB]/50 bg-[#111827] p-6 shadow-xl md:p-8">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-[#60A5FA] md:text-sm">
              Need Assistance?
            </p>

            <h2 className="mb-6 text-3xl font-black md:text-4xl">
              Contact Us
            </h2>

            <div className="space-y-4 text-base leading-relaxed text-zinc-300 md:text-lg">
              <p>📞 Davide: 0468 744 194</p>
              <p>📧 sportslabacademyau@gmail.com</p>
              <p>📍 Brisbane, QLD</p>
              <p><a href="#" className="termly-display-preferences cursor-pointer hover:text-blue-300">Consent Preferences</a></p>
            </div>

            <a
              href="https://wa.me/61468744194"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex rounded-full bg-[#25D366] px-6 py-4 text-base font-black text-white transition hover:scale-105"
            >
              Message on WhatsApp →
            </a>
          </div>

        </div>

        {/* COACHING BOOKING */}
        <div className="mt-8 rounded-[2.5rem] border border-[#2563EB]/50 bg-[#111827] p-8 shadow-2xl md:p-14">

          <p className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-[#60A5FA] md:text-sm">
            Private Coaching Booking
          </p>

          <h2 className="mb-6 text-4xl font-black leading-none md:text-6xl">
            BOOK YOUR
            <br />
            SESSION
          </h2>

          <p className="mb-10 max-w-3xl text-lg leading-relaxed text-zinc-300 md:text-xl">
            If you purchased private coaching, you can now select your preferred
            training day and available time slot below.
          </p>

          {/* CALENDLY EMBED PLACEHOLDER */}
          <div className="rounded-[2rem] border border-dashed border-white/20 bg-[#0B1220] p-10 text-center">

            <p className="text-lg font-semibold text-zinc-400">
              Calendly booking calendar will be embedded here.
            </p>

            <p className="mt-2 text-sm text-zinc-500">
              Replace this section with your Calendly embed code.
            </p>

          </div>

        </div>

        {/* BACK HOME */}
        <div className="mt-10 flex justify-center">
          <a
            href="/"
            className="inline-flex rounded-full bg-[#2563EB] px-8 py-5 text-lg font-black text-white transition hover:scale-105"
          >
            Back Home →
          </a>
        </div>

      </div>
    </main>
  )
}