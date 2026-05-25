import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import FooterNav from "@/components/FooterNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "We Do List",
  description: "家族・パートナー・友人とやることを共有・管理できるToDoアプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full bg-background">
        {/* スマホ幅を意識した中央寄せレイアウト */}
        <div className="mx-auto max-w-md min-h-screen flex flex-col bg-white">
          {/* メインコンテンツエリア（フッターの高さ分のpadding-bottomを確保） */}
          <main className="flex-1 pb-20 px-4 pt-4">
            {children}
          </main>
          <Suspense fallback={null}>
            <FooterNav />
          </Suspense>
        </div>
      </body>
    </html>
  );
}
