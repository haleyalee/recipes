import React from "react";
import type { Metadata } from "next";
import "@/styles/globals.css";
import { Urbanist } from 'next/font/google';
// import { IBM_Plex_Sans, Lexend_Deca } from 'next/font/google';
import Header from "../components/Header";

export const metadata: Metadata = {
  title: "Recipes",
  description: "holding space for recipes",
  icons: "onion.png"
};

const urbanist = Urbanist({
  subsets: ['latin'],
  display: 'swap',
});

// const ibm_plex_sans = IBM_Plex_Sans({
//   weight: '400',
//   subsets: ['latin']
// });

// const lexend_deca = Lexend_Deca({
//   subsets: ['latin']
// });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={urbanist.className}>
      <body className="bg-gray-100 text-gray-900">
        {/* <Header /> */}
        <main className="container md:px-0">{children}</main>
      </body>
    </html>
  );
}
