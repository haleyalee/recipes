import React from "react";
import Link from "next/link";

interface RedirectButtonProps {
  path: string,
  children: React.ReactNode
}

export default function RedirectButton({ path, children }: RedirectButtonProps ) {
  return (
    <Link 
      href={path} 
      className="flex w-fit h-full rounded-full px-3 py-1 text-white items-center bg-linkGreen hover:bg-hoverGreen shadow-sm"
    >
      { children }
    </Link>
  );
}
