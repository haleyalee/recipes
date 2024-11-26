import type { Metadata } from "next";
import "../styles/globals.css";
import { Urbanist } from 'next/font/google'
import SearchBar from "../components/SearchBar";

export const metadata: Metadata = {
  title: "Recipes",
  description: "holding space for recipes",
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
        <header className="bg-green text-white p-4">
          <div className="container mx-auto flex flex-row items-center justify-between">
            <h1 className="text-xl font-bold align-middle hover:scale-105"><a href="/">madisonions</a></h1>
            <div className="flex flex-row items-center gap-4">
              <nav>
                <ul className="flex gap-4">
                  <li><a href="/recipes" className="hover:underline align-middle">recipes</a></li>
                </ul>
              </nav>
              <SearchBar />
            </div>
          </div>
        </header>
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
