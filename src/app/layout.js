import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL('https://anujarora.net'), // Replace with your actual domain
  title: {
    default: "Anuj Arora | Full-Stack Developer",
    template: "%s | Anuj Arora"
  },
  description: "Backend-Specialized Full-Stack Developer with expertise in GoLang, Ruby on Rails, and ReactJS. Building scalable systems and high-performance applications.",
  keywords: ["Anuj Arora", "Full-Stack Developer", "Backend Developer", "GoLang", "Ruby on Rails", "ReactJS", "Software Engineer", "Web Developer"],
  authors: [{ name: "Anuj Arora" }],
  creator: "Anuj Arora",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://anujarora.net",
    title: "Anuj Arora | Full-Stack Developer",
    description: "Portfolio of Anuj Arora, a Backend-Specialized Full-Stack Developer.",
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
    title: "Anuj Arora | Full-Stack Developer",
    description: "Backend-Specialized Full-Stack Developer with expertise in GoLang and Ruby on Rails.",
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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
