import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MBTIProvider } from "@/src/lib/store";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MBTI Test",
  description: "Bài kiểm tra tính cách MBTI miễn phí",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex justify-center w-full">
          <div className="py-7 w-[90%] md:w-2/3 h-screen font-sans text-lg">
            <MBTIProvider>
              {children}
            </MBTIProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
