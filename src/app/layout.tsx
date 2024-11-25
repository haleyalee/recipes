import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Recipes",
  description: "holding space for recipes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
