import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { LayoutWrapper } from "@/components/layout/layout-wrapper";
import "./globals.css";
import NextTopLoader from 'nextjs-toploader';
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Elvien | Portfolio",
  description: "Personal portfolio of Elvien, a Full Stack Developer.",
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
          <AnimatedBackground />
          <LayoutWrapper>
            {children}
            <Analytics />
            <SpeedInsights />
          </LayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
