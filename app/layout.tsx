// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamically import the WhatsApp button to avoid SSR issues
const WhatsAppButton = dynamic(() => import("@/components/ui/WhatsAppButton"));

const inter = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "4MATIC | Premium Car Rental Service",
  description:
    "Experience the road with 4MATIC premium car rental service. Choose from a wide range of luxury, sports, and economy vehicles.",
  keywords: [
    "car rental",
    "luxury cars",
    "vehicle hire",
    "car service",
    "rental service",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} font-sans antialiased`}
        suppressHydrationWarning={true}
      >
        <Suspense>{children}</Suspense>
        {/* Simple WhatsApp button */}
        <WhatsAppButton />
      </body>
    </html>
  );
}
