import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HackTheChain 4.0 — The Biggest Hackathon in Kota City",
  description:
    "Join the ultimate hackathon for developers of all skill levels! HackTheChain 4.0 presented by CodeBase IIIT Kota with a prize pool of ₹1,00,000.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans antialiased bg-background`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
