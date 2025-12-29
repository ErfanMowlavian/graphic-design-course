import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Graphic Design Masterclass",
  description: "Learn Graphic Design Like a Pro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${vazirmatn.variable} antialiased bg-zinc-950 text-zinc-50 font-sans`}
      >
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
