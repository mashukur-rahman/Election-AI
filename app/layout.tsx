import type { Metadata } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";

const bengaliFont = Noto_Sans_Bengali({
  variable: "--font-bengali",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "গণতন্ত্রের জন্য - Election AI",
  description: "সাংসদ প্রার্থীদের সম্পর্কে গভীর গবেষণা",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body
        className={`${bengaliFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
