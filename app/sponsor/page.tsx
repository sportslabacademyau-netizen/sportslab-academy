'use client'

import { useState } from 'react'
import Footer from '@/components/Footer'
import AuthModal from '@/components/AuthModal'
import SponsorLogos from '@/components/SponsorLogos'
import { useCart } from '@/context/CartContext'
import Navbar from '@/components/Navbar'
import { useAuthSetup } from '@/hooks/useAuthSetup'

export default function SponsorPage() {
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
        <div className="mx-auto max-w-7xl">

          <p className="mb-2 text-sm font-black uppercase tracking-[0.3em] text-[#2563EB]">
            Partner With Us
          </p>

          <h1 className="mb-6 text-5xl font-black leading-none tracking-[-0.04em] md:text-7xl lg:text-8xl">
            BECOME A
            <br />
            <span className="text-[#2563EB]">SPONSOR</span>
          </h1>

          <p className="mb-8 max-w-2xl text-lg leading-relaxed text-zinc-700 md:text-xl">
            Support the next generation of young athletes in Brisbane. Partnering
            with SportsLab Academy puts your brand in front of an engaged
            community of families, players and coaches — while helping kids grow
            through sport.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="#enquire"
              className="rounded-full bg-[#2563EB] px-8 py-5 text-center font-black uppercase tracking-wide text-white"
            >
              Enquire About Sponsorship →
            </a>
          </div>

        </div>
      </section>

      {/* OUR PARTNERS (renders only once sponsors are added) */}
      <section className="bg-[#F5F0E6] px-6 pb-10 md:pb-16">
        <div className="mx-auto max-w-7xl">
          <SponsorLogos
            variant="grid"
            eyebrow="Our Partners"
            title="PROUDLY SUPPORTED BY"
          />
        </div>
      </section>

      {/* WHY SPONSOR */}
      <section className="bg-gradient-to-b from-[#111827] to-[#0B1220] px-6 pt-8 pb-10 text-white md:pt-14 md:pb-20">
        <div className="mx-auto max-w-7xl">

          <p className="mb-2 text-xs font-black uppercase tracking-[0.3em] text-[#60A5FA] md:text-sm">
            Why Partner With SportsLab
          </p>

          <h2 className="mb-8 text-4xl font-black leading-none md:mb-12 md:text-6xl">
            BRAND EXPOSURE
            <br />
            THAT GIVES BACK
          </h2>

          <div className="grid gap-4 md:grid-cols-3 md:gap-6">
            {[
              ['Local Visibility', 'Your logo on kit, banners and at camps, clinics and events across Brisbane.'],
              ['Digital Reach', 'Brand placement on our website and social channels reaching local families.'],
              ['Community Impact', 'Associate your brand with youth development, health and positive role models.'],
            ].map(([title, text]) => (
              <div
                key={title}
                className="rounded-[1.5rem] bg-white px-6 py-6 text-black shadow-sm md:rounded-[2rem] md:p-8"
              >
                <h3 className="mb-3 text-2xl font-black leading-tight md:text-3xl">
                  {title}
                </h3>

                <p className="text-base leading-relaxed text-zinc-600 md:text-lg">
                  {text}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* PARTNERSHIP TIERS */}
      <section className="bg-[#F5F0E6] px-6 py-10 md:py-18">
        <div className="mx-auto max-w-7xl">

          <p className="mb-2 text-xs font-black uppercase tracking-[0.3em] text-[#2563EB] md:text-sm">
            Flexible Options
          </p>

          <h2 className="mb-8 text-4xl font-black leading-none md:mb-12 md:text-6xl">
            PARTNERSHIP
            <br />
            TIERS
          </h2>

          <div className="grid gap-4 md:grid-cols-3 md:gap-6">
            {[
              ['Community Partner', 'Logo on our website and a thank-you across our social channels.'],
              ['Program Partner', 'Branding at a specific program or camp, plus website and social presence.'],
              ['Principal Partner', 'Premium placement on kit, events and all digital channels. Tailored package.'],
            ].map(([title, text]) => (
              <div
                key={title}
                className="rounded-[2rem] border-[1.5px] border-black bg-white p-8 shadow-sm"
              >
                <h3 className="mb-4 text-3xl font-black">
                  {title}
                </h3>

                <p className="text-lg leading-relaxed text-zinc-600">
                  {text}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-zinc-500">
            Packages are flexible and can be tailored to your goals and budget.
            Get in touch and we&apos;ll build something that works for you.
          </p>

        </div>
      </section>

      {/* CTA / ENQUIRE */}
      <section id="enquire" className="bg-[#F5F0E6] px-6 pb-16 md:pb-24">
        <div className="mx-auto max-w-7xl rounded-[3rem] bg-[#0F172A] p-10 text-white shadow-2xl md:p-14">

          <p className="mb-4 text-sm font-black uppercase tracking-[0.3em] text-blue-300">
            Let&apos;s Talk
          </p>

          <h2 className="mb-8 text-5xl font-black leading-none md:text-7xl">
            BECOME A
            <br />
            PARTNER
          </h2>

          <p className="mb-10 max-w-2xl text-lg leading-relaxed text-zinc-300 md:text-xl">
            Interested in sponsoring SportsLab Academy? Reach out and we&apos;ll
            send through our sponsorship pack and discuss the best fit for your
            brand.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="mailto:sportslabacademyau@gmail.com?subject=Sponsorship%20Enquiry"
              className="rounded-full bg-[#2563EB] px-8 py-5 text-center font-black uppercase tracking-wide text-white transition hover:scale-105"
            >
              Email Us →
            </a>

            <a
              href="https://wa.me/61468744194"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-white px-8 py-5 text-center font-black uppercase tracking-wide text-white transition hover:bg-white hover:text-[#0F172A]"
            >
              Message Us →
            </a>
          </div>

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

      <Footer />

      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onAuthSuccess={() => setAuthOpen(false)}
      />

    </main>
  )
}
