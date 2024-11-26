import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-dvh">
      <h1 className="text-4xl font-bold mb-6">recipes</h1>
      <div className="space-x-4">
        <Link 
          href="/recipes"
          className="hover:underline text-linkGreen"
        >
          let&apos;s go!
        </Link>
      </div>
    </div>
  );
}
