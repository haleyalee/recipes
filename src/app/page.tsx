"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function HomePage() {
  const router = useRouter();
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;

      setScrollPosition(scrolled);

      if (scrolled > window.innerHeight/5) {
        router.push("/recipes");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [router]);

  const [showOnion, setShowOnion] = useState(false);

  useEffect(() => {
    setShowOnion(true);
  }, []);

  return (
    <div className="relative h-[130vh] overflow-hidden">
      {/* Landing Page */}
      <div className={`flex flex-col items-center justify-center h-screen transition-transform duration-500 ease-in-out ${
          scrollPosition > 0 ? `-translate-y-[${scrollPosition}px]` : ""
        }`}>
        { showOnion ? (
          <img
            src="onion.png"
            alt="onion"
            className="w-64 h-64 mb-4 animation-pop"
          />
        ) : (
          <div className="w64 h-64 mb-4"></div>
        )}
        <h1 className="text-4xl font-bold mb-2">recipes</h1>
        <div className="space-x-4">
          <Link 
            href="/recipes"
            className="hover:underline text-linkGreen"
          >
            let's cook! &#x21B4;
          </Link>
        </div>
      </div>
      {/* Placeholder for /recipes content */}
      <div
        className={`absolute top-full left-0 w-full transition-transform duration-500 ease-in-out ${
          scrollPosition > 0 ? `translate-y-[-${scrollPosition}px]` : "translate-y-0"
        }`}
      >
        <h1 className="text-2xl font-bold mb-6">All Recipes</h1>
      </div>
    </div>
  );
}
