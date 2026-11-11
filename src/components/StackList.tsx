export default function StackList({ items, label = "Tech stack" }: { items: string[]; label?: string }) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-md border border-secondary/30 bg-secondary/[0.08] px-2 py-1 font-mono text-xs text-paper-muted"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
