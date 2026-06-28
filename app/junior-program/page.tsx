'use client'

import { useState } from 'react'
import Footer from '@/components/Footer'
import AuthModal from '@/components/AuthModal'
import { useCart } from '@/context/CartContext'
import Navbar from '@/components/Navbar'
import { useAuthSetup } from '@/hooks/useAuthSetup'

export default function MultisportCampPage() {

  const [authOpen, setAuthOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const {
    addToCart,
    setCartOpen,
    itemCount,
  } = useCart()

  const { loggedIn, handleAuthButton: performAuthAction } = useAuthSetup()

  const handleAuthClick = async () => {
    const result = await performAuthAction()
    if (result === 'openAuthModal') setAuthOpen(true)
    else if (loggedIn) {
      setCartOpen(false)
    }
  }

  const addProduct = async (product: any) => {

    const { supabase } = await import('@/lib/supabase')

    const { data } = await supabase.auth.getSession()

    if (!data.session) {
      setAuthOpen(true)
      return
    }

    addToCart(product)
    setCartOpen(true)
  }

  return (
    <main className="overflow-x-hidden bg-[#F5F0E6] text-[#111111]">

      <Navbar
        loggedIn={loggedIn}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        itemCount={itemCount}
        onCartClick={() => setCartOpen(true)}
        onAuthClick={handleAuthClick}
      />

      {/* HERO */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 pb-12 pt-24 md:gap-16 md:pb-20 md:pt-40 md:grid-cols-2">

        <div>

          <p className="mb-5 text-sm font-black uppercase tracking-[0.3em] text-[#2563EB]">
            Junior Development
          </p>

          <h1 className="mb-8 text-5xl font-black leading-none md:text-8xl">
            JUNIOR
            <br />
            SOCCER
            <br />
            PROGRAM
          </h1>

          <p className="mb-10 max-w-xl text-xl leading-relaxed text-slate-700">
            Weekly development sessions helping young athletes build technical
            foundations, confidence and love for the game.
          </p>

          <div className="mb-10 grid max-w-xl grid-cols-2 gap-3">
            {[
              ['Ages', '6 – 12 Years'],
              ['Location', 'West End'],
              ['Thursday', '3:30pm – 4:30pm'],
              ['Sunday', '9:30am – 10:30am'],
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

          <a
            href="#pricing"
            className="inline-block rounded-full bg-[#2563EB] px-8 py-5 font-black text-white"
          >
            Join Program →
          </a>

        </div>

        <div className="relative">

          <div className="absolute -bottom-3 -right-3 h-full w-full rounded-[2rem] bg-[#2563EB] md:-bottom-5 md:-right-5" />

          <div className="relative h-[380px] overflow-hidden rounded-[2rem] border-4 border-black sm:h-[480px] md:h-[650px]">

           <div className="absolute inset-0 bg-[url('/junior-program.jpg')] bg-cover bg-[center_25%] md:bg-center" />
          </div>

        </div>

      </section>

      {/* INFO */}
      <section className="bg-gradient-to-b from-[#111827] to-[#0B1220] px-6 py-12 text-white md:py-20">
        <div className="mx-auto max-w-7xl">

          <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-[#60A5FA] md:text-sm">
            Weekly Development
          </p>

          <h2 className="mb-10 text-4xl font-black leading-none md:mb-14 md:text-7xl">
            BUILDING
            <br />
            CONFIDENT
            <br />
            PLAYERS
          </h2>

          <div className="grid gap-4 md:grid-cols-3 md:gap-6">

            {[
              [
                "Technical Training",
                "Ball mastery, passing, dribbling, first touch and finishing.",
              ],
              [
                "Game Understanding",
                "Positioning, awareness, movement and decision-making.",
              ],
              [
                "Confidence & Fun",
                "Positive coaching environment helping players enjoy football.",
              ],
            ].map(([title, text]) => (

              <div
                key={title}
                className="rounded-[2rem] bg-white p-8 text-black shadow-sm"
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

        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="bg-[#F5F0E6] px-6 py-10 md:py-18">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-[#0B1220] p-5 shadow-2xl md:rounded-[2.5rem] md:p-10">

          <p className="mb-2 text-[10px] font-black uppercase tracking-[0.3em] text-blue-300 md:text-xs">
            Flexible Pricing
          </p>

          <h2 className="text-3xl font-black leading-none tracking-[-0.04em] text-white md:text-5xl">
            JOIN THE
            <br />
            PROGRAM
          </h2>

          <div className="mt-5 grid gap-3 md:mt-7 md:grid-cols-3 md:gap-4">

            {/* CASUAL PASS */}
            <div className="flex flex-col rounded-[1.4rem] bg-white/10 p-4 text-white md:rounded-[1.8rem] md:p-7">
              <p className="mb-2 text-[9px] font-black uppercase tracking-[0.28em] text-blue-200 md:text-xs">
                Casual Pass
              </p>

              <h3 className="text-3xl font-black leading-none md:text-5xl">
                $25
              </h3>

              <p className="mt-2 text-sm font-semibold text-blue-100">
                Single session
              </p>

              <div className="grow" />

              <button
                type="button"
                onClick={() =>
                  addProduct({
                    id: 'junior-casual',
                    name: 'Junior Program - Casual Pass (1 session)',
                    price: 25,
                  })
                }
                className="mt-4 w-full cursor-pointer rounded-full bg-white py-3 text-sm font-black text-[#0B1220] active:scale-95 md:py-4"
              >
                Add to Cart
              </button>
            </div>

            {/* TERM 3 — 1 SESSION/WEEK */}
            <div className="relative flex flex-col rounded-[1.4rem] bg-[#2563EB] p-4 text-white md:rounded-[1.8rem] md:p-7">
              <div className="absolute right-4 top-4 rounded-full bg-white px-3 py-1 text-[8px] font-black uppercase tracking-[0.14em] text-[#2563EB] md:py-1.5 md:text-[9px]">
                Most Popular
              </div>

              <p className="mb-2 text-[9px] font-black uppercase tracking-[0.28em] text-blue-100 md:text-xs">
                Term 3 — 1x / Week
              </p>

              <div className="flex items-end gap-3">
                <h3 className="text-3xl font-black leading-none md:text-5xl">
                  $220
                </h3>

                <span className="pb-1 text-sm text-blue-100 line-through md:text-xl">
                  $250
                </span>
              </div>

              <p className="mt-2 text-sm font-semibold text-blue-100">
                1 session per week · 10 sessions
              </p>

              <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-black uppercase tracking-wide text-white">
                🎽 Training Jersey
              </p>

              <div className="grow" />

              <button
                type="button"
                onClick={() =>
                  addProduct({
                    id: 'junior-term3-1x',
                    name: 'Junior Program - Term 3 (1 session/week, 10 sessions)',
                    price: 220,
                  })
                }
                className="mt-4 w-full cursor-pointer rounded-full bg-white py-3 text-sm font-black text-[#2563EB] active:scale-95 md:py-4"
              >
                Add to Cart
              </button>
            </div>

            {/* TERM 3 — 2 SESSIONS/WEEK */}
            <div className="flex flex-col rounded-[1.4rem] bg-white/10 p-4 text-white md:rounded-[1.8rem] md:p-7">
              <p className="mb-2 text-[9px] font-black uppercase tracking-[0.28em] text-blue-200 md:text-xs">
                Term 3 — 2x / Week
              </p>

              <div className="flex items-end gap-3">
                <h3 className="text-3xl font-black leading-none md:text-5xl">
                  $400
                </h3>

                <span className="pb-1 text-sm text-blue-100 line-through md:text-xl">
                  $500
                </span>
              </div>

              <p className="mt-2 text-sm font-semibold text-blue-100">
                2 sessions per week · 20 sessions
              </p>

              <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#2563EB]/15 px-3 py-1 text-xs font-black uppercase tracking-wide text-blue-200">
                🎽 Training Jersey
              </p>

              <div className="grow" />

              <button
                type="button"
                onClick={() =>
                  addProduct({
                    id: 'junior-term3-2x',
                    name: 'Junior Program - Term 3 (2 sessions/week, 20 sessions)',
                    price: 400,
                  })
                }
                className="mt-4 w-full cursor-pointer rounded-full bg-white py-3 text-sm font-black text-[#0B1220] active:scale-95 md:py-4"
              >
                Add to Cart
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">

        <div className="rounded-[2rem] bg-[#0F172A] p-7 text-white md:rounded-[3rem] md:p-12">

          <p className="mb-4 text-sm font-black uppercase tracking-[0.3em] text-blue-300">
            Join The Program
          </p>

          <h2 className="mb-8 text-4xl font-black md:text-7xl">
            READY TO
            <br />
            DEVELOP?
          </h2>

          <p className="mb-10 max-w-2xl text-xl leading-relaxed text-zinc-300">
            Weekly sessions designed to help young athletes improve technically,
            build confidence and enjoy the game.
          </p>

          <a
            href="mailto:sportslabacademyau@gmail.com"
            className="inline-block rounded-full bg-[#2563EB] px-10 py-5 text-xl font-black text-white"
          >
            Enquire Now →
          </a>

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