import './globals.css'
import type { Metadata } from 'next'
import Script from 'next/script'
import { CartProvider } from '@/context/CartContext'
import CartDrawer from '../components/CartDrawer'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'SportsLab Academy | Elite Youth Soccer Coaching Brisbane',
    template: '%s | SportsLab Academy',
  },
  description:
    'Elite youth soccer programs in Brisbane — holiday camps, private coaching, junior development and clinics helping young athletes build confidence, technique and performance.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: 'SportsLab Academy',
    locale: 'en_AU',
    url: SITE_URL,
    title: 'SportsLab Academy | Elite Youth Soccer Coaching Brisbane',
    description:
      'Elite youth soccer programs in Brisbane — holiday camps, private coaching, junior development and clinics.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SportsLab Academy | Elite Youth Soccer Coaching Brisbane',
    description:
      'Elite youth soccer programs in Brisbane — holiday camps, private coaching, junior development and clinics.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K5V2P3KZ"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        {/* Google Tag Manager — deliberately loaded BEFORE the Termly resource
            blocker so autoBlock cannot intercept gtm.js. The container loads on
            every pageview regardless of banner state; individual tags should be
            gated inside GTM via Google Consent Mode. */}
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-K5V2P3KZ');
          `}
        </Script>

        {/* Termly consent manager. autoBlock still gates the Meta Pixel and any
            other third-party scripts loaded after this point. */}
        <Script
          id="termly-resource-blocker"
          src="https://app.termly.io/resource-blocker/a52668b9-d1cd-4500-9336-8e0fda9d7e41?autoBlock=on"
          strategy="beforeInteractive"
        />

        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1073628958427807');
            fbq('track', 'PageView');
          `}
        </Script>

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1073628958427807&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  )
}