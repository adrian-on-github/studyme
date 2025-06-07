import type { Metadata } from "next";
import { Rambla, Palanquin } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

const ramblaSans = Rambla({
  variable: "--font-cairo",
  subsets: ["latin"],
  weight: "700",
});

const palanquinSans = Palanquin({
  variable: "--font-palanquin",
  weight: "400",
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
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
