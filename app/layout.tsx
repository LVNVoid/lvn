import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import './globals.css';
import NextTopLoader from 'nextjs-toploader';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Toaster } from 'react-hot-toast';
import JsonLd from '@/components/json-ld';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://elviencode.vercel.app'),
  title: {
    default: 'Elvien | Full Stack Developer',
    template: '%s | Elvien',
  },
  description:
    'Elviencode - Personal portfolio of Elvien, a Full Stack Developer specializing in building modern web applications with Next.js and React.',
  keywords: [
    'Elvien',
    'Elviencode',
    'Full Stack Developer',
    'Next.js',
    'React',
    'Web Development',
    'Software Engineer',
    'Portfolio',
  ],
  authors: [{ name: 'Elvien', url: 'https://elviencode.vercel.app' }],
  creator: 'Elvien',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://elviencode.vercel.app',
    siteName: 'Elvien Portfolio',
    title: 'Elvien | Full Stack Developer',
    description:
      'Personal portfolio of Elvien, a Full Stack Developer specializing in building modern web applications.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Elvien Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elvien | Full Stack Developer',
    description:
      'Personal portfolio of Elvien, a Full Stack Developer specializing in building modern web applications.',
    images: ['/og-image.jpg'],
    creator: '@elviencode',
  },
  verification: {
    google: 'bqnPBWYX8-P_cG1MdwSLqSeGEEAxj0eIjZJWe5oatU8',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} ${inter.variable} font-sans antialiased min-h-screen`}
      >
        <NextTopLoader color="#0a8a9bff" height={3} />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Analytics />
          <SpeedInsights />
          <Toaster />
          <JsonLd />
        </ThemeProvider>
      </body>
    </html>
  );
}
