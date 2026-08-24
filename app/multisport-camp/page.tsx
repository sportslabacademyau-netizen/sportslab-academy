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
    addToCart(product)
    setCartOpen(true)
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
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">

          <div>
            <p className="mb-2 text-sm font-black uppercase tracking-[0.3em] text-[#2563EB]">
              SportsLab Holiday Program
            </p>

            <h1 className="mb-6 text-5xl font-black leading-none tracking-[-0.04em] md:text-7xl lg:text-8xl">
              MULTISPORT
              <br />
              <span className="text-[#2563EB]">FULL DAY</span>
              <br />
              CAMP
            </h1>

            <p className="mb-6 max-w-xl text-lg leading-relaxed text-zinc-700 md:text-xl">
              A full-day holiday camp combining soccer, multisport games, movement skills,
              teamwork and confidence-building for active kids.
            </p>

            <div className="mb-7 grid max-w-xl grid-cols-2 gap-3">
              {[
                ['Ages', '5–12 Years'],
                ['Time', '8am–4pm'],
                ['Location', 'Davies Park, West End'],
                ['Dates', '24th-25th September & 1st-2nd October'],
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

            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="#pricing"
                className="rounded-full bg-[#2563EB] px-8 py-5 text-center font-black uppercase tracking-wide text-white"
              >
                Register Now →
              </a>

              
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="absolute -bottom-5 -right-5 h-full w-full rounded-[2rem] bg-[#2563EB]" />

            <div className="relative h-[700px] overflow-hidden rounded-[2rem] border-4 border-black">
              <div className="absolute inset-0 bg-[url('/multisport-camp.jpg')] bg-cover bg-center" />
            </div>
          </div>

        </div>
      </section>

      {/* DAILY EXPERIENCE */}
<section className="bg-gradient-to-b from-[#111827] to-[#0B1220] px-6 pt-8 pb-10 text-white md:pt-14 md:pb-20">
  <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 md:gap-10">

    <div>
      <p className="mb-2 text-xs font-black uppercase tracking-[0.3em] text-[#60A5FA] md:text-sm">
        Sport, Movement & Fun
      </p>

      <h2 className="mb-8 text-4xl font-black leading-none md:mb-10 md:text-6xl">
        MORE THAN
        <br />
        JUST A CAMP
      </h2>

      <div className="space-y-3 md:space-y-4">
        {[
          'Multisport activities & team games',
          'Movement exercises adapted by age',
          'Confidence and social development',
          'Experienced coaches and educators',
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

    <div className="rounded-[2rem] border border-[#2563EB] bg-white px-6 py-6 text-black md:rounded-[2.5rem] md:p-10">
      <p className="mb-5 text-xs font-black uppercase tracking-[0.3em] text-[#2563EB] md:mb-8 md:text-sm">
        Typical Day
      </p>

      <div className="space-y-4 md:space-y-7">
        {[
          ['Morning Welcome', 'Light warm-up and team welcome.'],
          ['Sports & Games', 'Multisport sessions and competitions.'],
          ['Lunch & Recovery', 'Hydration, food and social time.'],
          ['Afternoon Challenges', 'Fun games and team challenges.'],
        ].map(([title, text]) => (
          <div key={title} className="border-l-4 border-[#2563EB] pl-4 md:pl-5">
            <h3 className="text-xl font-black leading-tight md:text-2xl">
              {title}
            </h3>

            <p className="mt-1 text-sm leading-snug text-zinc-600 md:mt-2 md:text-lg md:leading-relaxed">
              {text}
            </p>
          </div>
        ))}
      </div>
    </div>

  </div>
</section>

      {/* PRICING */}
<section
  id="pricing"
  className="bg-[#F5F0E6] px-6 py-10 md:py-18"
>
  <div className="mx-auto max-w-6xl rounded-[2rem] bg-[#0B1220] p-5 shadow-2xl md:rounded-[2.5rem] md:p-10">

    <p className="mb-2 text-[10px] font-black uppercase tracking-[0.3em] text-blue-300 md:text-xs">
      Flexible Pricing
    </p>

    <h2 className="text-3xl font-black leading-none tracking-[-0.04em] text-white md:text-5xl">
      CAMP
      <br />
      PACKAGES
    </h2>

    <div className="mt-5 grid gap-3 md:mt-7 md:gap-4">

      <div className="rounded-[1.4rem] bg-white/10 p-4 text-white md:rounded-[1.8rem] md:p-7">
        <p className="mb-2 text-[9px] font-black uppercase tracking-[0.28em] text-blue-200 md:text-xs">
          Single Day
        </p>

        <h3 className="text-3xl font-black leading-none md:text-5xl">
          $100
        </h3>

        <p className="mt-2 text-sm font-semibold text-blue-100">
          Casual pass
        </p>

        <button
          type="button"
          onClick={() =>
            addProduct({
              id: 'camp-single-day',
              name: 'Single Day Camp',
              price: 100,
            })
          }
          className="mt-4 w-full cursor-pointer rounded-full bg-white py-3 text-sm font-black text-[#0B1220] active:scale-95 md:py-4"
        >
          Add to Cart
        </button>
      </div>

    </div>

    <div className="mt-4 rounded-[1.4rem] border border-white/10 bg-white/5 p-4 text-white md:mt-5 md:p-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.28em] text-blue-200 md:text-[10px]">
            Add-on
          </p>

          <h3 className="mt-1 text-xl font-black md:text-2xl">
            Late Pick-Up
          </h3>

          <p className="mt-1 text-sm text-zinc-300">
            Extended care until 5:00pm.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <p className="text-2xl font-black md:text-3xl">
            $10/day
          </p>

          <button
            type="button"
            onClick={() =>
              addProduct({
                id: 'late-pickup',
                name: 'Late Pick-Up',
                price: 10,
              })
            }
            className="cursor-pointer rounded-full bg-white px-5 py-3 text-sm font-black text-[#2563EB] active:scale-95"
          >
            Add to Cart
          </button>
        </div>

      </div>
    </div>

  </div>
</section>

      {/* FAQ */}
<section className="bg-[#F5F0E6] px-6 pt-0 pb-10 md:pb-24">
  <div className="mx-auto max-w-7xl">

    <p className="mb-2 text-xs font-black uppercase tracking-[0.3em] text-[#2563EB] md:text-sm">
      Frequently Asked Questions
    </p>

    <h2 className="mb-6 text-4xl font-black leading-none md:mb-12 md:text-7xl">
      EVERYTHING
      <br />
      YOU NEED
    </h2>

    <div className="grid gap-3 md:grid-cols-2 md:gap-6">
      {[
        ['Does my child need sports experience?', 'No. Open to all levels.'],
        ['What sports are included?', 'Soccer, basketball, AFL and movement games.'],
        ['What should children bring?', 'Lunch, snacks, water bottle, hat and sports clothes.'],
        ['Are children supervised all day?', 'Yes. Coaches supervise the full program.'],
        ['Can I book single days?', 'Yes. Just remember to write the day you picked in the notes.'],
        ['Is late pick-up available?', 'Yes. Extended care until 5pm is available for $10/day.'],
      ].map(([question, answer]) => (
        <div
          key={question}
          className="rounded-[1.3rem] border-[1.5px] border-black bg-white px-5 py-4 md:rounded-[2rem] md:p-8"
        >
          <h3 className="mb-2 text-xl font-black leading-[1.1] md:mb-4 md:text-2xl">
            {question}
          </h3>

          <p className="text-sm leading-snug text-zinc-600 md:text-lg md:leading-relaxed">
            {answer}
          </p>
        </div>
      ))}
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