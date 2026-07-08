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
    <main className="bg-[#F5F0E6] text-[#111111]">
        

      <Navbar
        loggedIn={loggedIn}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        itemCount={itemCount}
        onCartClick={() => setCartOpen(true)}
        onAuthClick={handleAuthClick}
      />

      {/* HOLIDAY PROGRAMS PAGE */}
      <section className="min-h-screen bg-[#F4F1E8] px-6 pb-16 pt-24 text-[#0F172A] md:pt-40">
        <div className="mx-auto max-w-7xl">

          {/* PAGE INTRO */}
          <div className="mb-10 text-center">
            <p className="mb-4 text-sm font-black uppercase tracking-[0.3em] text-[#2563EB]">
              SportsLab Academy
            </p>

            <h1 className="text-5xl font-black leading-none tracking-[-0.04em] md:text-7xl">
              HOLIDAY
            
              PROGRAMS
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
              Choose your preferred holiday program and find the camp that best fits your child.
            </p>
          </div>

          {/* PROGRAM CARDS */}
          <div
            id="programs"
            className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2"
          >

            {/* MULTISPORT CAMP */}
<a
  href="/multisport-camp"
  className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl transition hover:-translate-y-2"
>

  {/* IMAGE */}
  <div className="relative h-[260px] overflow-hidden rounded-t-[2rem]">

    <div className="absolute inset-0 bg-[url('/multisport-camp.jpg')] bg-cover bg-center transition duration-700 group-hover:scale-105" />

    <div className="absolute left-4 top-4 rounded-full bg-[#2563EB] px-4 py-2 text-xs font-black uppercase tracking-wide text-white">
      Available Now
    </div>

  </div>

  {/* BLUE TITLE BOX */}
  <div className="-mt-1 relative z-10 mb-6">
    <div className="w-full bg-[#2563EB] px-6 py-6 shadow-xl">

      <h2 className="text-center text-4xl font-black leading-none tracking-[-0.03em] text-white">
          MULTISPORT
        <br />
        FULL DAY CAMP
      </h2>

    </div>
  </div>

  {/* CONTENT */}
  <div className="px-6 pb-6">

    <div className="mb-4 rounded-2xl bg-[#F4F1E8] p-4">

      <p className="mb-1 text-xs font-black uppercase tracking-[0.2em] text-[#2563EB]">
        Location
      </p>

      <p className="text-lg font-black">
        📍 Davies Park, West End
      </p>

    </div>

    <div className="mb-4 rounded-2xl bg-[#F4F1E8] p-4">

      <p className="mb-1 text-xs font-black uppercase tracking-[0.2em] text-[#2563EB]">
        Ages & Time
      </p>

      <p className="text-lg font-black leading-relaxed">
        🎂 5–12 Years
        <br />
        ⏰ 8am–4pm
      </p>

    </div>

    <div className="mb-6 rounded-2xl bg-[#F4F1E8] p-4">

      <p className="mb-1 text-xs font-black uppercase tracking-[0.2em] text-[#2563EB]">
        Dates
      </p>

      <p className="text-lg font-black leading-relaxed">
        📆 1st July – 3rd July
        <br />
        📆 9th July – 10th July
      </p>

    </div>

    <div className="flex items-center justify-between">

      <div>

        <p className="text-xs font-semibold text-slate-500">
          from
        </p>

        <p className="text-3xl font-black">
          $80
        </p>

        <p className="text-sm text-slate-500">
          per day
        </p>

      </div>

      <span className="rounded-full bg-[#2563EB] px-5 py-3 text-sm font-black text-white">
        View →
      </span>

    </div>

  </div>

</a>

            {/* ELITE SOCCER CLINIC */}
<a
  href="/elite-soccer-clinic"
  className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl transition hover:-translate-y-2"
>

  {/* IMAGE */}
  <div className="relative h-[260px] overflow-hidden rounded-t-[2rem]">

    <div className="absolute inset-0 bg-[url('/elite-soccer-clinic.jpg')] bg-cover bg-center transition duration-700 group-hover:scale-105" />

    <div className="absolute left-4 top-4 rounded-full bg-[#2563EB] px-4 py-2 text-xs font-black uppercase tracking-wide text-white">
      Available Now
    </div>

  </div>

  {/* BLUE TITLE BOX */}
  <div className="-mt-1 relative z-10 mb-6">
    <div className="w-full bg-[#2563EB] px-6 py-6 shadow-xl">

      <h2 className="text-center text-4xl font-black leading-none tracking-[-0.03em] text-white">
        ELITE SOCCER
        <br />
        CLINIC
      </h2>

    </div>
  </div>

  {/* CONTENT */}
  <div className="px-6 pb-6">

    {/* LOCATION */}
    <div className="mb-4 rounded-2xl bg-[#F4F1E8] p-4">

      <p className="mb-1 text-xs font-black uppercase tracking-[0.2em] text-[#2563EB]">
        Location
      </p>

      <p className="text-lg font-black">
        📍 Davies Park, West End
      </p>

    </div>

    {/* AGES & TIME */}
    <div className="mb-4 rounded-2xl bg-[#F4F1E8] p-4">

      <p className="mb-1 text-xs font-black uppercase tracking-[0.2em] text-[#2563EB]">
        Ages & Time
      </p>

      <p className="text-lg font-black leading-relaxed">
        🎂 10–16 Years
        <br />
        ⏰  9am–11am
      </p>

    </div>

    {/* DATES */}
    <div className="mb-6 rounded-2xl bg-[#F4F1E8] p-4">

      <p className="mb-1 text-xs font-black uppercase tracking-[0.2em] text-[#2563EB]">
        Dates
      </p>

      <p className="text-lg font-black leading-relaxed">
        📆 1st July – 3rd July
        <br />
        📆 9th July – 10th July
      </p>

    </div>

    {/* PRICE */}
    <div className="flex items-center justify-between">

      <div>

        <p className="text-xs font-semibold text-slate-500">
          from
        </p>

        <p className="text-3xl font-black">
          $50
        </p>

        <p className="text-sm text-slate-500">
          per day
        </p>

      </div>

      <span className="rounded-full bg-[#2563EB] px-5 py-3 text-sm font-black text-white">
        View →
      </span>

    </div>

  </div>

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