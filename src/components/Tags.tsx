export function Tags({ items, label }: { items: string[]; label: string }) {
  if (!items.length) return null;
  return (
    <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={label}>
      {items.map((item) => (
        <li key={item} className="chip">
          {item}
        </li>
      ))}
    </ul>
  );
}
