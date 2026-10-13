import type { Metadata, Viewport } from "next";
import {
  Bowlby_One,
  Shrikhand,
  Permanent_Marker,
  DM_Sans,
} from "next/font/google";
import SmoothScroll from "@/components/providers/SmoothScroll";
import "./globals.css";

const bowlbyOne = Bowlby_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-fat-bob",
  display: "swap",
});

const shrikhand = Shrikhand({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-cooper-swash",
  display: "swap",
});

const permanentMarker = Permanent_Marker({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-palmer-lake",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#10173c",
};

export const metadata: Metadata = {
  title: "The Thrills Fun Park | Demo Website",
  description:
    "The Thrills Fun Park — fun-filled experiences in Begusarai, Bihar. Preview website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bowlbyOne.variable} ${shrikhand.variable} ${permanentMarker.variable} ${dmSans.variable}`}
    >
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
