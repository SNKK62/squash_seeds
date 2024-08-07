import { Noto_Sans_JP } from "next/font/google";

import { cn } from "@/lib/utils";

import type { Metadata } from "next";

import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
});

export const metadata: Metadata = {
  title: "Squash DX",
  description: "関東学生スカッシュ連盟の業務効率化アプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={(cn("font-sans", notoSansJP.variable), "m-auto min-w-fit")}
      >
        {children}
      </body>
    </html>
  );
}
