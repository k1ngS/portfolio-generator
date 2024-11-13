import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../../styles/globals.css'
import LanguageToggle from '@/components/LanguageToggle';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Portfolio Generator',
  description: 'Create your professional portfolio easily',
}


export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <LanguageToggle />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
