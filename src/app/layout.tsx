import type { Metadata } from "next";
import { Instrument_Serif, DM_Sans } from "next/font/google";
import "./globals.css";

const serif = Instrument_Serif({ weight: "400", subsets: ["latin"], variable: "--font-serif-v" });
const sans = DM_Sans({ subsets: ["latin"], variable: "--font-sans-v" });

export const metadata: Metadata = {
  title: "Fermor | Clear math for every money decision",
  description: "Free SIP, EMI, and FD calculators with deposit comparison in plain numbers, built for first-time investors in India.",
  openGraph: {
    title: "Fermor | Clear math for every money decision",
    description: "Free SIP, EMI, and FD calculators with deposit comparison in plain numbers, built for first-time investors in India.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fermor | Clear math for every money decision",
    description: "Free SIP, EMI, and FD calculators with deposit comparison in plain numbers, built for first-time investors in India.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${serif.variable} ${sans.variable} antialiased`}>{children}</body>
    </html>
  );
}
