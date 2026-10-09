import type React from "react"
import type { Metadata, Viewport } from "next"
import { JetBrains_Mono, IBM_Plex_Sans } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { profile } from "@/lib/data"
import "./globals.css"

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
})

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-plex",
})

const description = `${profile.name}: ${profile.role} and competitive programmer in ${profile.location}. ${profile.tagline}`

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: `${profile.name} · ${profile.role}`,
  description,
  authors: [{ name: profile.name, url: profile.siteUrl }],
  keywords: [
    "Shougata Das",
    "AI engineer",
    "machine learning",
    "Charles Darwin University",
    "competitive programming",
    "Darwin",
    "portfolio",
  ],
  openGraph: {
    type: "website",
    url: profile.siteUrl,
    title: `${profile.name} · ${profile.role}`,
    description,
    siteName: profile.name,
  },
  twitter: {
    card: "summary",
    title: `${profile.name} · ${profile.role}`,
    description,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f7f9" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0e13" },
  ],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${jetbrains.variable} ${plex.variable}`}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
