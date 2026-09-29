export default function Footer() {
  return (
    <footer className="bg-black px-6 py-10 text-white md:px-6 md:py-14">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:grid md:grid-cols-3 md:gap-12">

        {/* BRAND */}
        <div>
          <h3 className="mb-3 text-2xl font-black md:mb-5 md:text-3xl">
            SPORTSLAB ACADEMY
          </h3>

          <p className="max-w-sm text-sm leading-relaxed text-zinc-400 md:text-lg">
            Elite soccer programs helping young athletes develop confidence,
            technique and performance.
          </p>
        </div>

        {/* PROGRAMS */}
        <div>
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.3em] text-blue-300 md:mb-5 md:text-sm">
            Programs
          </p>

          <div className="space-y-2 text-sm md:space-y-3 md:text-lg">
            <a href="/coaching" className="block hover:text-blue-300">
              Private Coaching
            </a>

            <a href="/junior-program" className="block hover:text-blue-300">
              Junior Programs
            </a>

            <a href="/italy-tour" className="block hover:text-blue-300">
              Italy Tour 2026
            </a>

            <a href="/sponsor" className="block hover:text-blue-300">
              Become a Sponsor
            </a>
          </div>
        </div>

        {/* CONTACT */}
        <div>
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.3em] text-blue-300 md:mb-5 md:text-sm">
            Contact
          </p>

          <div className="space-y-2 text-sm text-zinc-300 md:space-y-3 md:text-lg">
            <p>Davide: 0468744194</p>
            <p>sportslabacademyau@gmail.com</p>
            <p>Brisbane, QLD</p>
            <p><a href="/privacy" className="hover:text-blue-300">Privacy Policy</a></p>
            <p><a href="/cookie-policy" className="hover:text-blue-300">Cookie Policy</a></p>
            <p><a href="#" className="termly-display-preferences cursor-pointer hover:text-blue-300">Consent Preferences</a></p>
          </div>
        </div>

      </div>
    </footer>
  )
}
