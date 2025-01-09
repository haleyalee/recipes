"use client";

import React from "react";
import { capitalizeFirstLetter } from "@/utils/helper";

interface CategoryPillProps {
  category: string,
  isSelected?: boolean,
  toggleCategory?: (c: string)=> void
}

export default function CategoryPill({ category, isSelected, toggleCategory } : CategoryPillProps) {
  return (
    <div 
      className={`w-fit rounded-full px-2 py-1 text-xs m-0 shadow-sm hover:bg-green hover:text-white ${toggleCategory && "cursor-pointer"} ${isSelected ? "bg-green text-white" : "bg-gray-200"}`}
      onClick={() => toggleCategory ? toggleCategory(category) : undefined}
    >
      <p>{ capitalizeFirstLetter(category) }</p>
    </div>
  );
}