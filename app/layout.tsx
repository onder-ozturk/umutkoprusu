import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AffectLog-TR | Proje Zaman Çizelgesi",
  description:
    "AffectLog-TR — TÜBİTAK destekli, yapay zeka tabanlı dijital psikolojik destek platformunun 24 aylık proje yol haritası ve zaman çizelgesi.",
  metadataBase: new URL("https://xn--umutkprs-r4a6db.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AffectLog-TR | Proje Zaman Çizelgesi",
    description:
      "TÜBİTAK destekli dijital psikolojik destek platformu — 24 aylık interaktif proje yol haritası.",
    url: "https://xn--umutkprs-r4a6db.com",
    siteName: "umutköprüsü",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "AffectLog-TR | Proje Zaman Çizelgesi",
    description:
      "TÜBİTAK destekli dijital psikolojik destek platformu — 24 aylık interaktif proje yol haritası.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
