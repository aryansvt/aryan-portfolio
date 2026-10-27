export function Tags({ items, label, className = "mt-4" }: { items: string[]; label: string; className?: string }) {
  if (!items.length) return null;
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`} aria-label={label}>
      {items.map((item) => (
        <li key={item} className="chip">
          {item}
        </li>
      ))}
    </ul>
  );
}
