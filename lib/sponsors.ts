// ─────────────────────────────────────────────────────────────────────────
// SPONSORS — single source of truth
//
// To add a sponsor (once they've paid):
//   1. Drop the logo file into /public/sponsors/  (PNG/SVG, transparent bg ideal)
//   2. Add one entry to the array below.
//
// That's it — the logo will automatically appear in:
//   • the scrolling strip on the homepage
//   • the "Our Partners" section on /sponsor
//   • the "Our Partners" section on /italy-tour
//
// While the array is empty, none of those sections render (nothing looks broken).
// ─────────────────────────────────────────────────────────────────────────

export type SponsorTier = 'principal' | 'program' | 'community'

export type Sponsor = {
  name: string
  logo: string // path under /public, e.g. '/sponsors/acme.png'
  url?: string // optional link to the sponsor's website
  tier?: SponsorTier
}

export const sponsors: Sponsor[] = [
  // Example (delete this comment block and uncomment when the first sponsor pays):
  // {
  //   name: 'Acme Co',
  //   logo: '/sponsors/acme.png',
  //   url: 'https://acme.com',
  //   tier: 'principal',
  // },
]

export const hasSponsors = sponsors.length > 0
