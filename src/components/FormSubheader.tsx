import React from "react";

interface FormSubheaderProps {
  children: React.ReactNode,
  htmlFor: string
};

export default function FormSubheader({ children, htmlFor } : FormSubheaderProps) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-semibold text-green">
      {children}
    </label>
  );
}