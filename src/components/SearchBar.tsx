"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getSlugFromName } from "@/utils/helper";
import { useRecipes } from "@/hooks/useRecipes";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [highlightIndex, setHighlightIndex] = useState(-1);

  const searchInputRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { recipes } = useRecipes();
  
  // TODO: debounce
  useEffect(() => {
    const suggestions = searchQuery
    ? Object.values(recipes)
        .filter((recipe) => recipe.name.toLowerCase().includes(searchQuery))
        .map((recipe) => recipe.name)
    : [];
    setSuggestions(suggestions);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: implement search logic
    // TODO: create search page
  }

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    const slug = getSlugFromName(suggestion);
    router.push(`/recipes/${slug}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      // Move highlight down
      setHighlightIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      // Move highlight up
      setHighlightIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
      );
    } else if (e.key === "Enter" && highlightIndex >= 0) {
      // Select the highlighted suggestion
      e.preventDefault();
      handleSuggestionClick(suggestions[highlightIndex]);
    } else if (e.key === "Escape") {
      setHighlightIndex(-1);
      setSuggestions([]);
    }
  };

  return (
    <div className="relative w-fit" ref={searchInputRef}>
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search for recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="py-2 px-3 rounded-full border border-gray-300 shadow-sm sm:text-sm text-gray-700"
        />
        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <ul className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className={`p-2 text-sm text-gray-400 cursor-pointer ${
                  index === highlightIndex ? "bg-gray-100 text-green" : "hover:bg-gray-100"
                }`}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
}
