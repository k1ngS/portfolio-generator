'use client'

import { usePathname, useRouter } from '@/i18n/routing'
import { useLocale } from 'next-intl'
import Image from 'next/image'

export default function LanguageToggle() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const toggleLocale = () => {
    const newLocale = locale === 'en' ? 'pt-br' : 'en'
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <button
      onClick={toggleLocale}
      className="fixed top-4 right-4 flex items-center justify-center w-10 h-10 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200"
      aria-label="Toggle language"
    >
      {locale === 'en' ? (
        <Image
          src="/images/us-flag.svg"
          alt="USA flag"
          width={40}
          height={40}
          className="rounded-full"
        />
      ) : (
        <Image
          src="/images/br-flag.svg"
          alt="Brazilian flag"
          width={40}
          height={40}
          className="rounded-full"
        />
      )}
    </button>
  )
}
