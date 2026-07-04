import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

import AppKitProvider from "@/providers/AppKitProvider";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arcitex — Trade Faster. Pay Smarter.",
  description:
    "Arcitex is a next-generation trading hub built natively for Arc Testnet. Swap, send, bridge, and govern — all inside one unified, glass-smooth interface.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="bg-[#05060F] font-body text-white antialiased">
        <AppKitProvider>{children}</AppKitProvider>
      </body>
    </html>
  );
}