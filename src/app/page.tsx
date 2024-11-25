import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-6">Welcome to Recipe Vault</h1>
      <div className="space-x-4">
        <Link href="/recipes">View Recipes</Link>
      </div>
    </div>
  );
}
