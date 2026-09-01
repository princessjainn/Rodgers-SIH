'use client'

import Link from 'next/link'
import { Logo } from '@/components/brand/logo'
import { useLanguage } from '@/components/language-provider'

export function SiteFooter() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-border bg-chai text-cream">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div className="max-w-xs">
            <Logo variant="inverted" />
            <p className="mt-3 text-sm leading-relaxed text-cream/70">
              India mein har ek Charcha Chai Pe hoti hai. A digital chai tapri for
              India&apos;s civic life.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <FooterCol
              title={t.footer.product}
              links={[
                [t.nav.localChai, '/citizen'],
                [t.nav.chaiTapri, '/citizen'],
                [t.nav.startCharcha, '/citizen'],
              ]}
            />
            <FooterCol
              title={t.footer.authorities}
              links={[
                [t.nav.authorityLogin, '/control-room'],
                ['GIS Hotspots', '/control-room'],
                ['Analytics', '/control-room'],
              ]}
            />
            <FooterCol
              title={t.footer.about}
              links={[
                [t.nav.howItWorks, '/how-it-works'],
                ['Accessibility', '/about'],
                ['Civic education', '/about'],
              ]}
            />
          </div>
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-cream/15 pt-6 text-xs text-cream/60 sm:flex-row sm:items-center">
          <p>&copy; {new Date().getFullYear()} CivicChai.</p>
          <p className="font-deva">{t.footer.tag}</p>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({
  title,
  links,
}: {
  title: string
  links: [string, string][]
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-gold">
        {title}
      </p>
      <ul className="mt-3 space-y-2">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link
              href={href}
              className="text-sm text-cream/80 transition-colors hover:text-cream"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
