import { Noto_Sans_JP } from "next/font/google";

import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={cn("font-sans", notoSansJP.variable)}>{children}</body>
    </html>
  );
}
