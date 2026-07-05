import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "ammar.",
  description:
    "Ammar Malick — Software Engineering & Honors student at UTA on the sales engineering track. I build the POC, run the demo, and field the technical objections.",
  keywords: [
    "Ammar Malick",
    "sales engineer",
    "software engineering",
    "UTA",
    "AI",
    "full-stack",
    "portfolio",
  ],
  openGraph: {
    title: "ammar. — i architect exits.",
    description:
      "Software Engineering & Honors @ UTA · technical depth, commercial instinct. POCs, demos, and systems that ship.",
    type: "website",
    siteName: "ammar.",
  },
  twitter: {
    card: "summary",
    title: "ammar. — i architect exits.",
    description:
      "Software Engineering & Honors @ UTA · technical depth, commercial instinct.",
  },
};

export const viewport = {
  themeColor: "#faf6f1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
