'use client'

import { sponsors, type Sponsor } from '@/lib/sponsors'

function LogoCard({ sponsor, size = 'normal' }: { sponsor: Sponsor; size?: 'normal' | 'large' }) {
  const box =
    size === 'large'
      ? 'h-28 w-44 md:h-32 md:w-56'
      : 'h-24 w-40 md:h-28 md:w-48'

  const inner = (
    <div
      className={`flex ${box} shrink-0 items-center justify-center rounded-2xl border border-black/10 bg-white p-5 shadow-sm`}
    >
      <img
        src={sponsor.logo}
        alt={`${sponsor.name} logo`}
        className="max-h-full max-w-full object-contain"
        loading="lazy"
      />
    </div>
  )

  if (sponsor.url) {
    return (
      <a
        href={sponsor.url}
        target="_blank"
        rel="noopener noreferrer"
        className="transition hover:scale-105"
        aria-label={sponsor.name}
      >
        {inner}
      </a>
    )
  }

  return inner
}

type Props = {
  /** marquee = scrolling strip (homepage); grid = static grid (sponsor & tour pages) */
  variant?: 'marquee' | 'grid'
  eyebrow?: string
  title?: string
  className?: string
  /** centre-align the grid (used on the tour page) */
  center?: boolean
}

export default function SponsorLogos({
  variant = 'grid',
  eyebrow = 'Our Partners',
  title,
  className = '',
  center = false,
}: Props) {
  // Nothing to show until the first sponsor is added in lib/sponsors.ts
  if (sponsors.length === 0) return null

  if (variant === 'marquee') {
    // Duplicate the list so the -50% translate loops seamlessly
    const loop = [...sponsors, ...sponsors]

    return (
      <section className={`bg-[#F5F0E6] py-10 md:py-14 ${className}`}>
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-6 text-center text-xs font-black uppercase tracking-[0.3em] text-[#2563EB] md:text-sm">
            {eyebrow}
          </p>
        </div>

        <div className="sponsor-marquee relative overflow-hidden">
          {/* fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#F5F0E6] to-transparent md:w-32" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#F5F0E6] to-transparent md:w-32" />

          <div className="animate-sponsor-scroll flex gap-6 md:gap-10">
            {loop.map((sponsor, i) => (
              <LogoCard key={`${sponsor.name}-${i}`} sponsor={sponsor} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  // grid
  return (
    <div className={`${center ? 'text-center' : ''} ${className}`}>
      {(eyebrow || title) && (
        <div className="mb-8">
          {eyebrow && (
            <p className="mb-2 text-xs font-black uppercase tracking-[0.3em] text-[#2563EB] md:text-sm">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="text-4xl font-black leading-none md:text-6xl">{title}</h2>
          )}
        </div>
      )}

      <div
        className={`flex flex-wrap items-center gap-5 md:gap-8 ${
          center ? 'justify-center' : ''
        }`}
      >
        {sponsors.map((sponsor) => (
          <LogoCard
            key={sponsor.name}
            sponsor={sponsor}
            size={sponsor.tier === 'principal' ? 'large' : 'normal'}
          />
        ))}
      </div>
    </div>
  )
}
