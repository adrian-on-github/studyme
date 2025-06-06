import type { Metadata } from "next";
import { Rambla, Palanquin } from "next/font/google";
import "./globals.css";

const ramblaSans = Rambla({
  variable: "--font-cairo",
  subsets: ["latin"],
  weight: "700",
});

const palanquinSans = Palanquin({
  variable: "--font-palanquin",
  weight: "600",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StudyMe",
  description: "made for students...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${ramblaSans.variable} ${palanquinSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
