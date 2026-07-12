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
    // No login required — anyone can add to cart and pay.
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
<section className="bg-[#0B0F19] px-6 pb-14 pt-24 text-white md:min-h-screen md:pb-16 md:pt-40">
  <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2 md:gap-12">
    <div>
      <p className="mb-2 text-xs font-black uppercase tracking-[0.35em] text-[#60A5FA] md:text-sm">
        Private Coaching
      </p>

      <h1 className="mb-6 text-5xl font-black leading-[0.9] md:text-7xl">
        ELITE
        <br />
        COACHING
      </h1>

      <p className="mb-6 max-w-xl text-lg leading-relaxed text-zinc-300 md:text-xl">
        Individual and small group football coaching focused on technical quality,
        confidence, game intelligence and position-specific player development.
      </p>

      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-[1.5rem] border border-white/10 bg-[#111827] p-5 shadow-xl md:p-6">
          <p className="mb-2 text-xs font-black uppercase tracking-[0.25em] text-[#60A5FA]">
            Format
          </p>
          <p className="text-2xl font-black">
            1-on-1
            Sessions
          </p>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-[#111827] p-5 shadow-xl md:p-6">
          <p className="mb-2 text-xs font-black uppercase tracking-[0.25em] text-[#60A5FA]">
            Players
          </p>
          <p className="text-2xl font-black">
            Academy &
            <br />
            Elite
          </p>
        </div>
      </div>

      <a
        href="#book"
        className="inline-flex rounded-full bg-[#2563EB] px-8 py-5 text-lg font-black text-white transition hover:scale-105"
      >
        Book a Session →
      </a>
    </div>

    <div className="relative hidden md:block">
      <div className="absolute -bottom-5 -right-5 h-full w-full rounded-[3rem] bg-[#2563EB]" />
      <div className="relative overflow-hidden rounded-[3rem] border border-white/10 shadow-2xl">
        <img
          src="/one-on-one.jpg"
          alt="Private Coaching"
          className="h-[560px] w-full object-cover"
        />
      </div>
    </div>
  </div>
</section>

{/* SESSIONS DESIGNED FOR */}
<section className="bg-[#F5F0E6] px-6 py-8 text-white md:py-16">
  <div className="mx-auto max-w-7xl rounded-[2.2rem] border border-white/10 bg-[#111827] p-6 shadow-2xl md:rounded-[3rem] md:p-16">
    <p className="mb-2 text-xs font-black uppercase tracking-[0.3em] text-[#60A5FA] md:text-sm">
      Athlete Pathways
    </p>

    <h2 className="mb-5 text-4xl font-black leading-none md:mb-14 md:text-7xl">
      SESSIONS
      
      DESIGNED FOR
    </h2>

    <div className="grid gap-4 md:grid-cols-2 md:gap-8">
      <div className="rounded-[1.7rem] border border-white/10 bg-[#0B1220] p-5 shadow-xl md:rounded-[2rem] md:p-8">
        <h3 className="mb-5 text-3xl font-black md:text-3xl">
          Academy Players
        </h3>

        <div className="space-y-3 text-sm font-semibold leading-snug text-zinc-300 md:space-y-4 md:text-lg">
          <div>✔ Junior & academy footballers</div>
          <div>✔ Technical skill development</div>
          <div>✔ Confidence & game understanding</div>
          <div>✔ Long-term player development</div>
        </div>
      </div>

      <div className="rounded-[1.7rem] border border-white/10 bg-[#0B1220] p-5 shadow-xl md:rounded-[2rem] md:p-8">
        <h3 className="mb-5 text-3xl font-black md:text-3xl">
          Elite Players
        </h3>

        <div className="space-y-3 text-sm font-semibold leading-snug text-zinc-300 md:space-y-4 md:text-lg">
          <div>✔ FQPL level players</div>
          <div>✔ Elite girls pathway athletes</div>
          <div>✔ Position-specific training</div>
          <div>✔ Game intelligence & performance coaching</div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* METHODOLOGY */}
<section className="bg-[#0B0F19] px-6 py-8 text-white md:py-20">
  <div className="mx-auto max-w-7xl">
    <p className="mb-2 text-xs font-black uppercase tracking-[0.3em] text-[#60A5FA] md:text-sm">
      Coaching Philosophy
    </p>

    <h2 className="mb-8 text-3xl font-black leading-none md:mb-16 md:text-7xl">
      OUR METHODOLOGY
    </h2>

    <div className="grid gap-5 md:grid-cols-3 md:gap-8">
      {[
        {
          icon: '⚽',
          label: 'Technical Training',
          title: 'Technical Development',
          text: 'Sessions focused on first touch, ball mastery, passing quality, finishing and technical repetition under pressure.',
          items: ['⚽ Ball Mastery', '🎯 Finishing', '👟 First Touch', '🔄 Passing Quality'],
        },
        {
          icon: '⚡',
          label: 'Performance Technology',
          title: 'BlazePod Training',
          text: 'Reaction-based training using BlazePod technology to improve coordination, scanning, acceleration, footwork and decision-making speed.',
          items: ['⚡ Reaction Speed', '👀 Scanning', '🏃 Footwork', '🧠 Decision Making'],
          blue: true,
        },
        {
          icon: '🏃',
          label: 'Athletic Development',
          title: 'Speed & Agility',
          text: 'Developing coordination, footwork, agility, acceleration and explosive movement to improve athletic performance and technical execution.',
          items: ['🏃 Acceleration', '⚡ Explosiveness', '👣 Footwork', '🔥 Agility'],
        },
      ].map((card) => (
        <div
          key={card.title}
          className={`relative overflow-hidden rounded-[2rem] bg-[#111827] p-5 shadow-xl md:p-8 ${
            card.blue
              ? 'border border-[#2563EB]/50'
              : 'border border-white/10'
          }`}
        >
          <div className="mb-5 flex items-center gap-4 md:mb-6">
            <div className="text-4xl md:text-5xl">{card.icon}</div>

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#60A5FA] md:text-xs">
                {card.label}
              </p>

              <h3 className="text-2xl font-black leading-tight md:text-3xl">
                {card.title}
              </h3>
            </div>
          </div>

          <p className="mb-6 text-base leading-relaxed text-zinc-300 md:mb-8 md:text-lg">
            {card.text}
          </p>

          <div className="grid grid-cols-2 gap-3">
            {card.items.map((item) => (
              <div
                key={item}
                className="flex min-h-[54px] items-center gap-2 whitespace-nowrap rounded-xl border border-white/10 bg-[#0B1220] px-3 py-3 text-xs font-black leading-none md:text-sm"
              >
                <span>{item.split(' ')[0]}</span>
                <span>{item.substring(item.indexOf(' ') + 1)}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>



{/* PACKAGES */}
<section
  id="book"
  className="bg-[#F5F0E6] px-6 pb-16 pt-8 text-white md:pb-24"
>
  <div className="mx-auto max-w-6xl">

    <p className="mb-2 text-xs font-black uppercase tracking-[0.3em] text-[#2563EB] md:text-sm">
      Coaching Options
    </p>

    <h2 className="mb-6 text-4xl font-black leading-none text-[#0B0F19] md:mb-6 md:text-7xl">
      BOOK YOUR
      
      SESSIONS
    </h2>

    <div className="grid gap-5 md:grid-cols-2 md:gap-8">

      {/* SINGLE SESSION */}
      <div className="rounded-[2rem] border border-white/10 bg-[#111827] p-6 md:rounded-[2.5rem] md:p-10">

        <p className="mb-2 text-xs font-black uppercase tracking-[0.25em] text-[#60A5FA] md:mb-3 md:text-sm">
          STARTER
        </p>

        <h3 className="mb-3 text-3xl font-black text-white md:mb-4 md:text-4xl">
          Single Session
        </h3>

        <p className="mb-4 text-5xl font-black text-white md:mb-6 md:text-6xl">
          $100
        </p>

        <p className="mb-6 text-base leading-relaxed text-zinc-300 md:mb-8 md:text-lg">
          Individual training session focused on technical development,
          confidence and game understanding.
        </p>

        <div className="mb-7 space-y-3 text-base font-semibold text-zinc-300 md:mb-10 md:space-y-4 md:text-lg">
          <p>✔ 1x one-on-one session</p>
          <p>✔ Position-specific coaching</p>
          <p>✔ Individual player feedback</p>
        </div>

       {/* SINGLE SESSION BUTTON */}
<a
  href="https://calendly.com/sportslabacademyau/sportslab-private-coaching"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex w-full justify-center rounded-full bg-[#2563EB] px-6 py-4 text-base font-black text-white transition hover:scale-105 md:w-auto md:px-8 md:py-5 md:text-lg"
>
  Book Your Session →
</a>

      </div>

      {/* DEVELOPMENT PACK */}
      <div className="relative rounded-[2rem] border border-[#2563EB]/50 bg-[#111827] p-6 md:rounded-[2.5rem] md:p-10">

        <div className="absolute right-5 top-5 rounded-full bg-[#2563EB] px-3 py-1.5 text-[10px] font-black uppercase text-white md:right-6 md:top-6 md:px-4 md:py-2 md:text-xs">
          MOST POPULAR
        </div>

        <p className="mb-2 pr-28 text-xs font-black uppercase tracking-[0.25em] text-[#60A5FA] md:mb-3 md:text-sm">
          ELITE
        </p>

        <h3 className="mb-3 text-3xl font-black text-white md:mb-4 md:text-4xl">
          5 Session Pack
        </h3>

        <p className="mb-4 text-5xl font-black text-white md:mb-6 md:text-6xl">
          $450
        </p>

        <p className="mb-6 text-base leading-relaxed text-zinc-300 md:mb-8 md:text-lg">
          Progressive training pack for committed players looking to build
          consistency and improve performance.
        </p>

        <div className="mb-7 space-y-3 text-base font-semibold text-zinc-300 md:mb-10 md:space-y-4 md:text-lg">
          <p>✔ 5x progressive sessions</p>
          <p>✔ BlazePod & game intelligence</p>
          <p>✔ IDP review meeting</p>
        </div>

        {/* 5 SESSION PACK BUTTON */}
<a
  href="https://calendly.com/sportslabacademyau/private-coaching-single-session-clone"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex w-full justify-center rounded-full bg-[#2563EB] px-6 py-4 text-base font-black text-white transition hover:scale-105 md:w-auto md:px-8 md:py-5 md:text-lg"
>
  Book 5 Session Pack →
</a>

      </div>

    </div>
  </div>
</section>

{/* VIDEO SECTION */}
<section className="bg-[#0B0F19] px-6 py-8 text-white md:py-20">
  <div className="mx-auto max-w-7xl">
    <p className="mb-2 text-xs font-black uppercase tracking-[0.3em] text-[#60A5FA] md:text-sm">
      Training In Action
    </p>

    <h2 className="mb-6 text-4xl font-black leading-none text-white md:mb-16 md:text-7xl">
      SEE THE
      
      STANDARD
    </h2>

    <div className="grid gap-5 md:grid-cols-[0.8fr_1.7fr] md:gap-8">
      <div className="h-[520px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#111827] shadow-xl md:h-full">
        <video
          src="/training-1.mp4"
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>

      <div className="flex flex-col gap-5 md:gap-8">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#111827] shadow-xl">
          <video
            src="/training-2.mp4"
            className="h-[260px] w-full object-cover object-top md:h-[320px]"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>

        <div className="rounded-[2rem] border border-[#2563EB]/50 bg-[#111827] p-5 text-white shadow-xl md:p-8">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-[#60A5FA] md:text-sm">
            Performance Technology
          </p>

          <h3 className="mb-5 text-3xl font-black md:mb-6 md:text-4xl">
            BlazePod Reaction Training
          </h3>

          <p className="mb-6 text-base leading-relaxed text-zinc-300 md:mb-8 md:text-lg">
            BlazePods are elite performance training tools used to develop reaction speed,
            coordination, footwork, scanning and fast decision-making under pressure.
          </p>

          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {[
              '⚡ Reaction Speed',
              '👀 Scanning',
              '🏃 Footwork',
              '🧠 Decision Making',
            ].map((item) => (
              <div
                key={item}
                className="flex min-h-[56px] items-center gap-2 whitespace-nowrap rounded-xl border border-white/10 bg-[#0B1220] px-3 py-3 text-xs font-black leading-none md:p-4 md:text-sm"
              >
                <span>{item.split(' ')[0]}</span>
                <span>{item.substring(item.indexOf(' ') + 1)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
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