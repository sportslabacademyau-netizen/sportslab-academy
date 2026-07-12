'use client'

import { useEffect, useState } from 'react'
import Footer from '@/components/Footer'
import AuthModal from '@/components/AuthModal'
import SponsorLogos from '@/components/SponsorLogos'
import { useCart } from '@/context/CartContext'

export default function MultisportCampPage() {

  const [authOpen, setAuthOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const {
    addToCart,
    setCartOpen,
    itemCount,
  } = useCart()

  useEffect(() => {
    const setupAuth = async () => {
      const { supabase } = await import('@/lib/supabase')

      const { data } = await supabase.auth.getSession()

      setLoggedIn(!!data.session)

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setLoggedIn(!!session)
      })

      return () => subscription.unsubscribe()
    }

    setupAuth()
  }, [])

  const handleAuthButton = async () => {

    if (loggedIn) {

      const { supabase } = await import('@/lib/supabase')

      await supabase.auth.signOut()

      setLoggedIn(false)
      setCartOpen(false)

      return
    }

    setAuthOpen(true)
  }

  const addProduct = async (product: any) => {
    // No login required — anyone can add to cart and pay.
    addToCart(product)
    setCartOpen(true)
  }

  return (
    <main className="bg-[#F5F0E6] text-[#111111]">
        

      {/* NAVBAR */}
<nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#2563EB] text-white">
  <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 md:py-2">

    {/* MOBILE CART LEFT (cart always visible; login hidden for now) */}
    <div className="z-10 flex items-center md:hidden">
      <button
        type="button"
        onClick={() => setCartOpen(true)}
        className="relative ml-2 cursor-pointer"
      >
        <span className="text-3xl brightness-0 invert">
          🛒
        </span>

        {itemCount > 0 && (
          <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-black text-white">
            {itemCount}
          </span>
        )}
      </button>
    </div>

    {/* LOGO */}
    <a
      href="/"
      className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0"
    >
      <img
        src="/logo1.png"
        alt="SportsLab Academy"
        className="h-24 w-auto object-contain md:h-28"
      />
    </a>

    {/* DESKTOP MENU */}
    <div className="hidden items-center gap-8 md:flex">
      <a
        href="/camp"
        className="font-semibold hover:text-white/70"
      >
        HOLIDAY PROGRAMS
      </a>

      <a
        href="/coaching"
        className="font-semibold hover:text-white/70"
      >
        PRIVATE COACHING
      </a>

      <a
        href="/junior-program"
        className="font-semibold hover:text-white/70"
      >
        JUNIOR PROGRAMS
      </a>

      <a
        href="/italy-tour"
        className="font-semibold hover:text-white/70"
      >
        ITALY TOUR
      </a>

      <a
        href="/team"
        className="font-semibold hover:text-white/70"
      >
        MEET OUR TEAM
      </a>

      {loggedIn && (
        <a
          href="/dashboard"
          className="font-black uppercase tracking-wide hover:text-white/70"
        >
          DASHBOARD
        </a>
      )}

      <button
        type="button"
        onClick={() => setCartOpen(true)}
        className="relative cursor-pointer"
      >
        <span className="text-3xl brightness-0 invert">
          🛒
        </span>

        {itemCount > 0 && (
          <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-black text-white">
            {itemCount}
          </span>
        )}
      </button>

      {/* LOGIN/LOGOUT hidden for now — re-enable to bring auth back.
      <button
        type="button"
        onClick={handleAuthButton}
        className="cursor-pointer rounded-full bg-white px-5 py-2 text-sm font-black text-[#2563EB]"
      >
        {loggedIn ? 'LOGOUT' : 'LOGIN'}
      </button>
      */}
    </div>

    {/* MOBILE HAMBURGER */}
    <button
      type="button"
      onClick={() => setMenuOpen(true)}
      className="z-10 flex h-10 w-10 items-center justify-center text-3xl font-black md:hidden"
    >
      ☰
    </button>
  </div>
</nav>

{/* MOBILE MENU */}
{menuOpen && (
  <div className="fixed inset-0 z-[99999] bg-[#2563EB] text-white md:hidden">

    {/* TOP BAR */}
    <div className="relative flex items-center justify-between px-4 py-3">

      <div className="z-10 flex items-center md:hidden">
        <button
          type="button"
          onClick={() => setCartOpen(true)}
          className="relative ml-2"
        >
          <span className="text-3xl brightness-0 invert">
            🛒
          </span>

          {itemCount > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-black text-white">
              {itemCount}
            </span>
          )}
        </button>
      </div>

      {/* LOGO */}
      <a
        href="/"
        onClick={() => setMenuOpen(false)}
        className="absolute left-1/2 -translate-x-1/2"
      >
        <img
          src="/logo1.png"
          alt="SportsLab Academy"
          className="h-24 w-auto object-contain"
        />
      </a>

      {/* CLOSE */}
      <button
        type="button"
        onClick={() => setMenuOpen(false)}
        className="z-10 flex h-10 w-10 items-center justify-center text-4xl font-light leading-none"
      >
        ×
      </button>
    </div>

    {/* MENU LINKS */}
    <div className="mt-6 flex flex-col px-8 text-2xl font-light uppercase tracking-tight">
      <a
        onClick={() => setMenuOpen(false)}
        href="/"
        className="whitespace-nowrap border-b border-white/20 py-4"
      >
        HOME
      </a>

      {loggedIn && (
        <a
          onClick={() => setMenuOpen(false)}
          href="/dashboard"
          className="whitespace-nowrap border-b border-white/20 py-4"
        >
          DASHBOARD
        </a>
      )}

      <a
        onClick={() => setMenuOpen(false)}
        href="/camp"
        className="whitespace-nowrap border-b border-white/20 py-4"
      >
        HOLIDAY PROGRAMS
      </a>

      <a
        onClick={() => setMenuOpen(false)}
        href="/coaching"
        className="whitespace-nowrap border-b border-white/20 py-4"
      >
        PRIVATE COACHING
      </a>

      <a
        onClick={() => setMenuOpen(false)}
        href="/junior-program"
        className="whitespace-nowrap border-b border-white/20 py-4"
      >
        JUNIOR PROGRAMS
      </a>

      <a
        onClick={() => setMenuOpen(false)}
        href="/italy-tour"
        className="whitespace-nowrap border-b border-white/20 py-4"
      >
        ITALY TOUR
      </a>

      <a
        onClick={() => setMenuOpen(false)}
        href="/team"
        className="whitespace-nowrap border-b border-white/20 py-4"
      >
        MEET OUR TEAM
      </a>

      {/* LOGIN/LOGOUT hidden for now — re-enable to bring auth back.
      <button
        type="button"
        onClick={handleAuthButton}
        className="mt-8 text-left text-lg font-black uppercase tracking-wide text-white/70"
      >
        {loggedIn ? 'LOGOUT' : 'LOGIN'}
      </button>
      */}
    </div>
  </div>
)}
      {/* HERO */}
      <section className="px-6 pb-12 pt-24 md:pt-40">

        <div className="mx-auto grid max-w-7xl items-center gap-16 md:grid-cols-2">

          <div>

            <p className="mb-2 text-sm font-black uppercase tracking-[0.3em] text-[#2563EB]">
              BRISBANE ELITE SOCCER
            </p>

            <h1 className="mb-6 text-6xl font-black leading-none tracking-[-0.04em] md:text-8xl">
  TRAIN
  <br />
  DEVELOP
  <br />
  SUCCEED
</h1>

            <p className="mb-6 max-w-xl text-xl leading-relaxed text-slate-700">
              Elite football development programs designed to improve technical ability, game intelligence, confidence and high-performance habits for ambitious athletes.
            </p>

            <div className="mt-12">

  <a
    href="#programs"
    className="inline-flex rounded-full bg-[#2563EB] px-8 py-5 text-lg font-black text-white transition hover:scale-105"
  >
    Explore Programs →
  </a>
  

</div>

          </div>

          <div className="relative">

            <div className="absolute -bottom-5 -right-5 h-full w-full rounded-[2rem] bg-[#2563EB]" />

            <div className="relative h-[400px] overflow-hidden rounded-[2rem] border-4 border-black md:h-[600px]">
              <div className="absolute inset-0 bg-[url('/hero-soccer.jpg')] bg-cover bg-center" />
            </div>

          </div>

        </div>

      </section>

      {/* PROGRAMS */}
<section id="programs" className="bg-[#0B0F19] px-4 py-8 text-white md:py-18">

  <div className="mx-auto max-w-7xl">

    <p className="mb-2 text-sm font-black uppercase tracking-[0.3em] text-[#2563EB]">
    Our Programs
    </p>

    <h2 className="mb-10 text-5xl font-black leading-none md:text-7xl">
      ELITE
      <br />
      SOCCER
      <br />
      PROGRAMS
    </h2>

    <div className="grid gap-8 md:grid-cols-3">


        <a
        href="/junior-program"
        className="group overflow-hidden rounded-[2.5rem] border border-[#2563EB]/20 bg-[#10182B]/90 backdrop-blur transition hover:-translate-y-2"
      >
        <img
          src="/junior-program.jpg"
          alt="Junior Programs"
          className="h-[320px] w-full object-cover transition duration-700 group-hover:scale-105"
        />

        <div className="p-8">
          <p className="mb-3 text-sm font-black uppercase tracking-[0.3em] text-[#2563EB]">
            Junior Development
          </p>

          <h3 className="mb-4 text-4xl font-black leading-none">
            JUNIOR
            <br />
            PROGRAMS
          </h3>

         <p className="mb-8 text-lg leading-relaxed text-zinc-300">
  Sessions focused on confidence, coordination and
  technical development for young players.
</p>

          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-3 font-black">
            Explore →
          </span>
          
        </div>
      </a>

       <a
        href="/coaching"
        className="group overflow-hidden rounded-[2.5rem] border border-[#2563EB]/20 bg-[#10182B]/90 backdrop-blur transition hover:-translate-y-2"
      >
        <img
          src="/one-on-one.jpg"
          alt="Private Coaching"
          className="h-[320px] w-full object-cover transition duration-700 group-hover:scale-105"
        />

        <div className="p-8">
          <p className="mb-3 text-sm font-black uppercase tracking-[0.3em] text-[#2563EB]">
            Elite Coaching
          </p>

          <h3 className="mb-4 text-4xl font-black leading-none">
            1 ON 1
            <br />
            SESSIONS
          </h3>

          <p className="mb-8 text-lg leading-relaxed text-zinc-300">
            Individual player development sessions focused on performance and game intelligence.
          </p>

          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-3 font-black">
            Explore →
          </span>
       
        </div>
      </a>
<a
        href="/camp"
        className="group overflow-hidden rounded-[2.5rem] border border-[#2563EB]/20 bg-[#10182B]/90 backdrop-blur transition hover:-translate-y-2"
      >
        <img
          src="/multisport-camp.jpg"
          alt="Holiday Camps"
          className="h-[320px] w-full object-cover transition duration-700 group-hover:scale-105"
        />

        <div className="p-8">
         <p className="mb-3 text-sm font-black uppercase tracking-[0.3em] text-[#2563EB]">
            DEVELOPMENT CAMPS
          </p>

          <h3 className="mb-4 text-4xl font-black leading-none">
            SCHOOL HOLIDAY
            <br />
            PROGRAMS
          </h3>

          <p className="mb-8 text-lg leading-relaxed text-zinc-300">
            Elite holiday camps combining soccer development, multisport activities and high-performance coaching.
          </p>

          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-3 font-black">
            Explore →
          </span>
      
        </div>
      </a>

    </div>

  </div>

</section>

{/* TESTIMONIALS */}
<section className="bg-[#F5F0E6] px-6 py-8 md:py-16">

  <div className="mx-auto max-w-7xl">

    <p className="mb-2 text-sm font-black uppercase tracking-[0.3em] text-[#2563EB]">
      Testimonials
    </p>

    <h2 className="mb-8 text-5xl font-black leading-none md:text-7xl">
      TRUSTED BY
      <br />
      PLAYERS &
      <br />
      FAMILIES
    </h2>

    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

      {[
        [
  "The sessions helped me improve my shooting, game awareness and speed of decision-making. The BlazePod methodology makes every drill intense, realistic and focused on match situations.",
  "Tommaso Rio • FQPL Player",
],
[
    "The junior program has been fantastic for Hudson. He’s become more confident, coordinated and excited about football every week.",
    "Emma F. • Junior Program Parent",
  ],

  [
    "My child has grown so much in confidence since joining SportsLab. The coaching is energetic, professional and positive.",
    "Sarah M. • Parent",
  ],
  [
    "The 1-to-1 sessions helped me improve my touch, speed and decision-making. Every session feels intense and specific.",
    "Maria S. • Academy Player",
  ],
  [
    "The holiday camp was extremely well organised. The kids were active, engaged and came home smiling every day.",
    "Cam T. • Camp Parent",
  ],
  
  [
    "Jayde absolutely loves the sessions. The coaching environment is positive, challenging and has really helped her confidence and development.",
    "Jayde’s Mum • Academy Parent",
  ],
  

].map(([quote, name]) => (
        <div
          key={name}
          className="rounded-[2rem] border border-[#2563EB]/10 bg-white p-8 shadow-xl"
        >

          <div className="mb-5 text-[#FBBF24]">
            ★★★★★
          </div>

          <p className="mb-8 text-lg leading-relaxed text-zinc-600">
            “{quote}”
          </p>

          <div className="flex items-center gap-4">

  <div className="flex shrink-0 h-14 w-14 items-center justify-center rounded-full bg-[#2563EB] text-base font-black text-white">
    {name.split(" ")[0][0]}
    {name.split(" ")[1][0]}
  </div>

  <p className="font-black text-[#0F172A]">
    {name}
  </p>

</div>

        </div>
      ))}

    </div>

  </div>

</section>

{/* SPONSORS */}
<SponsorLogos variant="marquee" eyebrow="Our Partners" />

{/* FINAL CTA */}
<section className="bg-[#0B0F19] px-6 py-10 text-white md:py-16">
  <div className="mx-auto max-w-7xl rounded-[2rem] border border-[#2563EB]/20 bg-[#0F172A] px-6 py-10 text-center md:rounded-[3rem] md:p-10">
    <p className="mb-5 text-sm font-black uppercase tracking-[0.3em] text-[#2563EB]">
      Start Your Journey
    </p>

    <h2 className="mb-6 text-4xl font-black leading-none md:mb-8 md:text-7xl">
      READY TO
      <br />
      TRAIN WITH US?
    </h2>

    <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-zinc-300 md:mb-12 md:text-xl">
      Tell us what you’re looking for and we’ll help you find the right SportsLab program.
    </p>

    <a
      href="#enquire"
      className="inline-flex rounded-full bg-[#2563EB] px-8 py-5 text-lg font-black text-white transition hover:scale-105"
    >
      Enquire Now →
    </a>
  </div>
</section>

{/* ENQUIRE NOW */}
<section id="enquire" className="bg-[#F4F1E8] px-6 py-12 text-[#0F172A]">
  <div className="mx-auto max-w-4xl rounded-[3rem] border border-[#2563EB]/10 bg-[#0F172A] p-10 text-white shadow-2xl md:p-14">
    <p className="mb-4 text-sm font-black uppercase tracking-[0.3em] text-[#2563EB]">
      Contact Us
    </p>

    <h2 className="mb-10 text-5xl font-black leading-none md:text-7xl">
      ENQUIRE
      <br />
      NOW
    </h2>

    <form
  action="https://formsubmit.co/sportslabacademyau@gmail.com"
  method="POST"
  className="grid gap-5"
>

  <input type="hidden" name="_captcha" value="false" />
  <input type="hidden" name="_subject" value="New SportsLab Homepage Enquiry!" />

  <input
    name="parent_name"
    type="text"
    placeholder="Parent Name"
    className="rounded-xl border border-white/10 bg-[#10182B] px-5 py-4 text-white outline-none placeholder:text-zinc-500"
  />

  <input
    name="child_name"
    type="text"
    placeholder="Child Name"
    className="rounded-xl border border-white/10 bg-[#10182B] px-5 py-4 text-white outline-none placeholder:text-zinc-500"
  />

  <input
    name="date_of_birth"
    type="text"
    placeholder="Date of Birth"
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

  <select
    name="program_interest"
    className="rounded-xl border border-white/10 bg-[#10182B] px-5 py-4 text-white outline-none"
  >
    <option>Program Interest</option>
    <option>Private Coaching</option>
    <option>Holiday Camps</option>
    <option>Junior Programs</option>
  </select>

  <textarea
    name="message"
    placeholder="Message"
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
              onAuthSuccess={() => setLoggedIn(true)}
            />
      
          </main>
        )
      }