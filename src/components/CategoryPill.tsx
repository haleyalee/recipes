interface CategoryPillProps {
  category: string,
  toggleCategory?: (c: string)=> void
}

export default function CategoryPill({ category, toggleCategory } : CategoryPillProps) {
  return (
    <div 
      className="rounded-full px-2 py-1 bg-gray-200 text-xs m-0"
      onClick={() => toggleCategory ? toggleCategory(category) : undefined}
    >
      <p>{ category }</p>
    </div>
  );
}