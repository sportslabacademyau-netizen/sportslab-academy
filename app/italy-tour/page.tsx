'use client'

import { useState, useEffect } from 'react'
import Footer from '@/components/Footer'
import AuthModal from '@/components/AuthModal'
import SponsorLogos from '@/components/SponsorLogos'
import { useCart } from '@/context/CartContext'
import Navbar from '@/components/Navbar'
import { useAuthSetup } from '@/hooks/useAuthSetup'

function ImagePlaceholder({ label, className = '' }: { label: string; className?: string }) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-[#111827] to-[#0B1220] ${className}`}
    >
      <div className="px-6 text-center">
        <p className="text-4xl md:text-5xl">📷</p>
        <p className="mt-3 text-[10px] font-black uppercase tracking-[0.25em] text-[#60A5FA] md:text-xs">
          {label}
        </p>
      </div>
    </div>
  )
}

export default function ItalyTourPage() {
  const [authOpen, setAuthOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const { setCartOpen, itemCount } = useCart()

  const { loggedIn, handleAuthButton: performAuthAction } = useAuthSetup()

  const handleAuthClick = async () => {
    const result = await performAuthAction()
    if (result === 'openAuthModal') setAuthOpen(true)
    else if (loggedIn) {
      setCartOpen(false)
    }
  }

  // Meta Pixel tracking
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof (window as any).fbq === 'function') {
      (window as any).fbq('track', 'ViewContent', {
        content_name: 'Italy Tour 2026',
        content_type: 'product',
        value: 2400,
        currency: 'AUD',
      })
    }
  }, [])

  const handleSecurePlace = () => {
    if (typeof window !== 'undefined' && typeof (window as any).fbq === 'function') {
      (window as any).fbq('track', 'InitiateCheckout', {
        content_name: 'Italy Tour 2026',
        value: 2400,
        currency: 'AUD',
      })
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    if (typeof window !== 'undefined' && typeof (window as any).fbq === 'function') {
      (window as any).fbq('track', 'Lead', {
        content_name: 'Italy Tour 2026 Enquiry',
      })
    }
  }

  return (
    <main className="bg-[#F5F0E6] text-[#111111]">

      <Navbar
        loggedIn={loggedIn}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        itemCount={itemCount}
        onCartClick={() => setCartOpen(true)}
        onAuthClick={handleAuthClick}
      />

      {/* HERO */}
      <section className="px-6 pb-12 pt-24 md:pb-20 md:pt-40">
        <div className="mx-auto grid max-w-7xl items-start gap-12 md:grid-cols-2">

          <div>
            <p className="mb-2 text-sm font-black uppercase tracking-[0.3em] text-[#2563EB]">
              SportsLab Academy Tour
            </p>

            <h1 className="mb-4 text-5xl font-black leading-none tracking-[-0.04em] md:text-7xl lg:text-8xl">
              ITALY
              <br />
              <span className="text-[#2563EB]">TOUR</span>
              <br />
              2026
            </h1>

            <p className="mb-6 text-lg font-black uppercase tracking-[0.2em] text-zinc-500 md:text-xl">
              Academy Football Experience
            </p>

            <p className="mb-6 max-w-xl text-lg leading-relaxed text-zinc-700 md:text-xl">
              An elite football experience in Como, Italy. Train with Como 1907, play friendly
              matches against professional academy teams, attend a Serie A match and experience
              Italian football culture.
            </p>

            <div className="mb-7 grid max-w-xl grid-cols-2 gap-3">
              {[
                ['Dates', '6th – 15th Dec 2026'],
                ['Location', 'Como, Italy'],
                ['Ages', 'U13 / U14 / U15'],
                ['From', '$2,400 AUD'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[#2563EB]">
                    {label}
                  </p>

                  <p className="mt-1 text-lg font-black">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* FEATURING CLUBS */}
            <div className="mb-7">
              <p className="mb-3 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 md:text-xs">
                Featuring
              </p>

              <div className="flex flex-wrap items-center gap-4">
                {[
                  { name: 'AC Milan', src: '/ac-milan-logo.png', size: 'large' },
                  { name: 'Como 1907', src: '/como-1907-logo.svg', size: 'normal' },
                  { name: 'ACF Fiorentina', src: '/fiorentina-logo.png', size: 'large' },
                ].map((club) => (
                  <div
                    key={club.name}
                    className="flex h-20 w-20 items-center justify-center rounded-lg border border-black/10 bg-white shadow-sm"
                  >
                    <img
                      src={club.src}
                      alt={`${club.name} Logo`}
                      className={`object-contain ${club.size === 'large' ? 'h-16 w-16' : 'h-14 w-14'}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="#tour-costs"
                onClick={handleSecurePlace}
                className="rounded-full bg-[#2563EB] px-8 py-5 text-center font-black uppercase tracking-wide text-white"
              >
                Secure Your Place →
              </a>
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="absolute -bottom-5 -right-5 h-full w-full rounded-[2rem] bg-[#2563EB]" />

            <div className="relative h-[500px] bg-[url('/mainphoto.jpeg')] bg-cover bg-center overflow-hidden rounded-[2rem] border-4 border-black"> 

            </div>
          </div>

        </div>
      </section>

      {/* OUR PARTNERS (renders only once sponsors are added) */}
      <section className="bg-[#F5F0E6] px-6 py-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SponsorLogos
            variant="grid"
            eyebrow="Our Partners"
            title="PROUDLY SUPPORTED BY"
            center
          />
        </div>
      </section>

      {/* ACADEMY TRAINING EXPERIENCE */}
      <section className="bg-gradient-to-b from-[#111827] to-[#0B1220] px-6 pt-8 pb-10 text-white md:pt-14 md:pb-20">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 md:gap-10">

          <div>
            <p className="mb-2 text-xs font-black uppercase tracking-[0.3em] text-[#60A5FA] md:text-sm">
              Train With Como 1907
            </p>

            <h2 className="mb-8 text-4xl font-black leading-none md:mb-10 md:text-6xl">
              ACADEMY TRAINING
              <br />
              EXPERIENCE
            </h2>

            <div className="space-y-3 md:space-y-4">
              {[
                '3x Academy Training Sessions',
                'Italian Football Methodology',
                'Professional Academy Environment',
                'Como 1907 Coaching Staff',
                'Designed for Ambitious Young Players',
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[1.5rem] bg-white px-5 py-4 shadow-sm md:px-6 md:py-5"
                >
                  <p className="text-sm font-black leading-snug text-black md:text-lg">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[320px] overflow-hidden rounded-[2rem] border-4 border-[#2563EB] md:min-h-full md:rounded-[2.5rem]">
            <div className="absolute inset-0 bg-[url('/italy-tour-training.jpeg')] bg-cover bg-center" />
          </div>

        </div>
      </section>


      {/* EXPERIENCE ITALIAN FOOTBALL CULTURE */}
      <section className="bg-[#F5F0E6] px-6 py-8 md:py-12">
        <div className="mx-auto max-w-7xl">

          <p className="mb-2 text-xs font-black uppercase tracking-[0.3em] text-[#2563EB] md:text-sm">
            More Than Football
          </p>

          <h2 className="mb-6 text-4xl font-black leading-none md:mb-10 md:text-6xl">
            EXPERIENCE ITALIAN
            <br />
            FOOTBALL CULTURE
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 md:gap-6">
            {[
              { title: 'Attend a Serie A Match', label: 'Inside San Siro / Giuseppe Meazza stadium', img: '/italy-tour-photo-3.jpeg' },
              { title: 'Explore Como', label: 'Lakeside village at dusk', img: '/italy-tour-photo-5.jpeg' },
              { title: 'Explore Milan', label: 'Duomo di Milano at sunset', img: '/italy-tour-milan.jpeg' },
              { title: 'Visit the Italian Soccer Museum', label: 'Azzurri jerseys on display', img: '/italy-tour-museum.jpeg' },
            ].map(({ title, label, img }) => (
              <div
                key={title}
                className="overflow-hidden rounded-[2rem] bg-white shadow-sm"
              >
                <div className="relative h-[220px] md:h-[260px]">
                  {img ? (
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${img}')` }} />
                  ) : (
                    <ImagePlaceholder label={label} />
                  )}
                </div>

                <div className="p-6 md:p-8">
                  <h3 className="text-2xl font-black leading-tight md:text-3xl">
                    {title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ACCOMMODATION */}
      <section className="bg-gradient-to-b from-[#111827] to-[#0B1220] px-6 pt-8 pb-10 text-white md:pt-14 md:pb-20">
        <div className="mx-auto max-w-7xl">

          <p className="mb-2 text-xs font-black uppercase tracking-[0.3em] text-[#60A5FA] md:text-sm">
            Cruise Hotel Como
          </p>

          <h2 className="mb-6 text-4xl font-black leading-none md:mb-10 md:text-6xl">
            STAY IN
            <br />
            COMFORT
          </h2>

          <p className="mb-6 max-w-2xl text-base leading-relaxed text-zinc-300 md:mb-8 md:text-lg">
            9 nights in a comfortable, modern hotel by Lake Como with breakfast and dinner
            included daily.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-5">
            {[
              { label: 'Hotel exterior', img: '/italy-tour-photo-2.jpeg' },
              { label: 'Como by night from the lake', img: '/italy-tour-photo-6.jpeg' },
              { label: 'Dining / breakfast area', img: '/italy-tour-photo-4.jpeg' },
              { label: 'Hotel room interior', img: '/italy-tour-photo-1.jpeg' },
            ].map(({ label, img }) => (
              <div
                key={label}
                className="relative h-[200px] overflow-hidden rounded-[1.5rem] border border-white/10 md:h-[240px] md:rounded-[2rem]"
              >
                {img ? (
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${img}')` }} />
                ) : (
                  <ImagePlaceholder label={label} />
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* TOUR INCLUSIONS */}
      <section className="bg-[#F5F0E6] px-6 py-8 md:py-12">
        <div className="mx-auto max-w-7xl">

          <p className="mb-2 text-xs font-black uppercase tracking-[0.3em] text-[#2563EB] md:text-sm">
            Everything Included
          </p>

          <h2 className="mb-6 text-4xl font-black leading-none md:mb-10 md:text-6xl">
            TOUR
            <br />
            INCLUSIONS
          </h2>

          <div className="grid gap-3 sm:grid-cols-2 md:gap-4">
            {[
              'Academy Training Sessions',
              'Friendly Matches',
              'Serie A Match Experience',
              'Accommodation (9 Nights)',
              'Breakfast & Dinner Daily',
              'Private Transport',
              'Football Cultural Activities',
              'Staff Supervision',
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-4 rounded-[1.3rem] border-[1.5px] border-black bg-white px-5 py-4 md:rounded-[1.6rem] md:px-7 md:py-5"
              >
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-[#2563EB] text-sm font-black text-white">
                  ✓
                </span>

                <p className="text-base font-black leading-tight md:text-xl">
                  {item}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* TOUR COSTS */}
      <section id="tour-costs" className="scroll-mt-18 bg-[#F5F0E6] px-6 pt-0 pb-10 md:pt-4 md:pb-18">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-[#0B1220] p-5 shadow-2xl md:rounded-[2.5rem] md:p-10">

          <p className="mb-2 text-[10px] font-black uppercase tracking-[0.3em] text-blue-300 md:text-xs">
            Italy Tour 2026
          </p>

          <h2 className="text-3xl font-black leading-none tracking-[-0.04em] text-white md:text-5xl">
            TOUR
            <br />
            COSTS
          </h2>

          <div className="mt-5 grid gap-4 md:mt-7 md:grid-cols-[1.1fr_0.9fr] md:gap-5">

            {/* PRICE */}
            <div className="rounded-[1.4rem] bg-[#2563EB] p-6 text-white md:rounded-[1.8rem] md:p-8">
              <p className="mb-2 text-[9px] font-black uppercase tracking-[0.28em] text-blue-100 md:text-xs">
                Per Player
              </p>

              <div className="flex items-end gap-3">
                <h3 className="text-5xl font-black leading-none md:text-7xl">
                  $2,400
                </h3>

                <span className="pb-2 text-sm font-black text-blue-100 md:text-lg">
                  AUD
                </span>
              </div>

              <p className="mt-3 text-sm font-semibold text-blue-100 md:text-base">
                Excluding flights
              </p>

              <a
                href="#enquire"
                className="mt-6 block w-full cursor-pointer rounded-full bg-white py-4 text-center text-sm font-black text-[#2563EB] transition active:scale-95 md:text-base"
              >
                Secure Your Place →
              </a>
            </div>

            {/* DEPOSIT + CONDITIONS */}
            <div className="space-y-4">
              <div className="rounded-[1.4rem] border border-[#2563EB]/40 bg-[#2563EB]/10 p-5 text-white md:rounded-[1.8rem] md:p-6">
                <p className="mb-2 text-[9px] font-black uppercase tracking-[0.28em] text-blue-200 md:text-xs">
                  Deposit
                </p>

                <div className="flex items-end gap-3">
                  <h3 className="text-3xl font-black leading-none md:text-4xl">
                    $500
                  </h3>

                  <span className="pb-1 text-sm font-semibold text-blue-100">
                    to secure a place
                  </span>
                </div>

                <p className="mt-3 text-sm font-black uppercase tracking-wide text-blue-200">
                  Due by 25 June 2026
                </p>
              </div>

              <div className="rounded-[1.4rem] border border-white/10 bg-white/5 p-5 text-white md:rounded-[1.8rem] md:p-6">
                <p className="text-sm leading-relaxed text-zinc-300">
                  Minimum 9 players required, maximum 15. If minimum numbers are not reached by
                  30 June 2026, all deposits will be fully refunded.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* URGENCY / SCARCITY */}
      <section className="bg-[#2563EB] px-6 py-12 text-white md:py-20">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.35em] text-blue-100 md:text-sm">
            Limited Squad
          </p>

          <h2 className="text-6xl font-black leading-none tracking-[-0.04em] md:text-8xl">
            ONLY 15
            <br />
            PLAYERS
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg font-black uppercase tracking-[0.15em] text-blue-100 md:text-2xl">
            Secure Your Place for the Italy Tour 2026
          </p>

          <p className="mt-3 text-base font-semibold text-blue-100 md:text-lg">
            6th – 15th December 2026 · Como, Italy
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#enquire"
              onClick={handleSecurePlace}
              className="rounded-full bg-white px-8 py-5 font-black uppercase tracking-wide text-[#2563EB] transition hover:scale-105"
            >
              Register Now →
            </a>

            <a
              href="https://wa.me/61468744194"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-white px-8 py-5 font-black uppercase tracking-wide text-white transition hover:bg-white hover:text-[#2563EB]"
            >
              Message Davide →
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT / ENQUIRY */}
      <section id="enquire" className="scroll-mt-48 bg-[#F4F1E8] px-6 py-12 text-[#0F172A]">
        <div className="mx-auto max-w-4xl rounded-[3rem] border border-[#2563EB]/10 bg-[#0F172A] p-10 text-white shadow-2xl md:p-14">
          <p className="mb-4 text-sm font-black uppercase tracking-[0.3em] text-[#2563EB]">
            Contact SportsLab Academy
          </p>

          <h2 className="mb-6 text-5xl font-black leading-none md:text-7xl">
            REGISTER
            <br />
            INTEREST
          </h2>

          <p className="mb-10 max-w-2xl text-base leading-relaxed text-zinc-300 md:text-lg">
            Train. Compete. Experience Italy. Leave your details and Davide will be in touch with
            the full tour presentation and next steps.
          </p>

          <form
            action="https://formsubmit.co/sportslabacademyau@gmail.com"
            method="POST"
            className="grid gap-5"
            onSubmit={handleFormSubmit}
          >

            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_subject" value="New Italy Tour 2026 Enquiry!" />

            <input
              name="parent_name"
              type="text"
              placeholder="Parent Name"
              className="rounded-xl border border-white/10 bg-[#10182B] px-5 py-4 text-white outline-none placeholder:text-zinc-500"
            />

            <input
              name="player_name"
              type="text"
              placeholder="Player First Name"
              className="rounded-xl border border-white/10 bg-[#10182B] px-5 py-4 text-white outline-none placeholder:text-zinc-500"
            />

            <input
              name="player_last_name"
              type="text"
              placeholder="Player Last Name"
              className="rounded-xl border border-white/10 bg-[#10182B] px-5 py-4 text-white outline-none placeholder:text-zinc-500"
            />

            <input
              name="age_group"
              type="text"
              placeholder="Age Group (U13 / U14 / U15)"
              className="rounded-xl border border-white/10 bg-[#10182B] px-5 py-4 text-white outline-none placeholder:text-zinc-500"
            />

            <input
              name="phone_number"
              type="text"
              placeholder="Parent Mobile Number"
              className="rounded-xl border border-white/10 bg-[#10182B] px-5 py-4 text-white outline-none placeholder:text-zinc-500"
            />

            <input
              name="email"
              type="email"
              placeholder="Email Address"
              className="rounded-xl border border-white/10 bg-[#10182B] px-5 py-4 text-white outline-none placeholder:text-zinc-500"
            />

            <textarea
              name="message"
              placeholder="Message (current club, experience, questions)"
              rows={5}
              className="rounded-xl border border-white/10 bg-[#10182B] px-5 py-4 text-white outline-none placeholder:text-zinc-500"
            />

            <button
              type="submit"
              className="rounded-full bg-[#2563EB] px-8 py-5 text-lg font-black text-white transition hover:scale-105"
            >
              Submit Enquiry →
            </button>

          </form>
        </div>
      </section>

      {/* WHATSAPP BUTTON */}
      <a
        href="https://wa.me/61468744194"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-5 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-3xl text-white shadow-2xl transition hover:scale-110"
      >
        💬
      </a>

      {/* FOOTER */}
      <Footer />

      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onAuthSuccess={() => setAuthOpen(false)}
      />

    </main>
  )
}
