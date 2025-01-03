import React from "react";

interface PageSubheaderProps {
  children: React.ReactNode
};

export default function PageSubheader({ children } : PageSubheaderProps) {
  return (
    <h2 className="text-sm font-semibold my-4 text-green">{children}</h2>
  );
}