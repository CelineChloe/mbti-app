import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { MBTIProvider } from "@/lib/store";

const interFont = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin", "vietnamese"],
});

const jetbrainsMono = JetBrains_Mono({
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
        className={`${interFont.variable} ${jetbrainsMono.variable} antialiased`}
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
