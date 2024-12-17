import React from "react";
import type { Metadata } from "next";
import "@/styles/globals.css";
import { Urbanist } from 'next/font/google'
import Header from "../components/Header";

export const metadata: Metadata = {
  title: "Recipes",
  description: "holding space for recipes",
  icons: "onion.png"
};

const urbanist = Urbanist({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={urbanist.className}>
      <body className="bg-gray-100 text-gray-900">
        <Header />
        <main className="container mx-auto p-4 md:px-0">{children}</main>
      </body>
    </html>
  );
}
