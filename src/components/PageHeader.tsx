import React from "react";

interface PageHeaderProps {
  children: React.ReactNode
};

export default function PageHeader({ children } : PageHeaderProps) {
  return (
    <h1 className="text-6xl font-extrabold mb-4 text-green">{ children }</h1>
  );
}