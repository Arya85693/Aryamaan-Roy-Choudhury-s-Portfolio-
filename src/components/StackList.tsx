export default function StackList({ items, label = "Tech stack" }: { items: string[]; label?: string }) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-md border border-line bg-white/[0.02] px-2 py-1 font-mono text-[0.7rem] text-paper-muted"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
