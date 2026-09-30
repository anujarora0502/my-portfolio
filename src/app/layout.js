import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({ subsets: ["latin"], variable: "--font-instrument-serif", weight: "400", style: ["normal", "italic"] });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", weight: ["400", "500"] });

const description = "Anuj Arora is a Lead Engineer at Samsung Ads in Bangalore, working on backend systems and AI agents with Go, Python, Ruby on Rails and React.";

export const metadata = {
  metadataBase: new URL('https://anujarora.net'),
  title: {
    default: "Anuj Arora | Lead Engineer, Samsung Ads",
    template: "%s | Anuj Arora"
  },
  description,
  keywords: ["Anuj Arora", "Lead Engineer", "Samsung Ads", "AI Agents", "CrewAI", "Backend Developer", "GoLang", "Ruby on Rails", "Python", "ReactJS", "Tathya Live", "Software Engineer"],
  authors: [{ name: "Anuj Arora" }],
  creator: "Anuj Arora",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://anujarora.net",
    title: "Anuj Arora | Lead Engineer, Samsung Ads",
    description,
    siteName: "Anuj Arora Portfolio",
    images: [
      {
        url: "/images/profile.png",
        width: 1200,
        height: 630,
        alt: "Anuj Arora",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anuj Arora | Lead Engineer, Samsung Ads",
    description,
    images: ["/images/profile.png"],
    creator: "@eight_bit_byte",
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
  icons: {
    icon: [
      { url: '/images/profile.png' },
    ],
    apple: [
      { url: '/images/profile.png' },
    ],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  interactiveWidget: 'resizes-content',
  themeColor: '#131211',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body className={`${inter.className} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
