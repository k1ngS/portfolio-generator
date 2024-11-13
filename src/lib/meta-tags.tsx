import { Metadata } from 'next'

export function generateMetadata(data: {
  name: string;
  role: string;
  about: string;
}): Metadata {
  const title = data.name ? `${data.name} - Portfolio` : 'Create Your Portfolio'
  const description = data.about || 'Professional portfolio generator'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_US',
      siteName: 'Portfolio Generator',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
  }
}
