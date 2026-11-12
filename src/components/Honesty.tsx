/** "How I kept it honest": the testing safeguards behind a project's results. */
export default function Honesty({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <div className={`border-l-2 border-secondary py-1 pl-4 sm:pl-5 ${className}`}>
      <p className="text-sm font-medium text-paper">How I kept it honest</p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed text-paper-muted">
            <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-secondary" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
