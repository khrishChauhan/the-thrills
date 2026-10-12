import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Thrills Fun Park — Cinematic Experience",
  description:
    "Ultra-premium cinematic digital experience for The Thrills Fun Park featuring world-class rides, water park, luxury resort, fine dining, and seamless QR ticketing.",
  openGraph: {
    title: "The Thrills Fun Park — Cinematic Experience",
    description:
      "Ultra-premium cinematic digital experience for The Thrills Fun Park featuring world-class rides, water park, luxury resort, fine dining, and seamless QR ticketing.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`scroll-smooth dark ${jakarta.variable} ${outfit.variable} ${jetbrains.variable}`}
    >
      <body className="bg-[#050B14] text-slate-100 antialiased selection:bg-[#0066FF] selection:text-white">
        {children}
      </body>
    </html>
  );
}
