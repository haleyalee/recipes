"use client";

import SearchBar from "./SearchBar";
import { usePathname } from "next/navigation";

export default function Header() {
  const path = usePathname();

  return (
    // Hide header on main landing page
    path !== '/' ? (
    <header className="bg-green text-white p-4">
      <div className="container mx-auto flex flex-row items-center justify-between">
        <h1 className="text-xl font-bold align-middle hover:scale-105 transition-transform duration-300 ease-in-out"><a href="/">madisonions</a></h1>
        <div className="flex flex-col items-end gap-2 md:flex-row md:items-center md:gap-4">
          <nav>
            <ul className="flex gap-4">
              <li><a href="/recipes" className="hover:underline align-middle">recipes</a></li>
            </ul>
          </nav>
          <SearchBar />
        </div>
      </div>
    </header>
    ) : <></>
  );
}