const stages = [
  { step: "ingest", detail: "cumulative player CSV → validated frame" },
  { step: "normalize", detail: "goals, assists, cards → per-game rates" },
  { step: "classify", detail: "goal-contribution ratio → role" },
  { step: "score", detail: "role-weighted impact − card penalties" },
  { step: "shrink", detail: "× Apps / (Apps + K), K = 50" },
  { step: "rank", detail: "final rank + stage-by-stage movement" },
];

export default function PipelineDiagram() {
  return (
    <div
      role="img"
      aria-label="Pipeline diagram: ingest, normalize, classify role, score, apply reliability shrinkage, rank"
      className="relative h-full overflow-hidden rounded-xl border border-line-strong bg-ink-800 p-5 sm:p-6"
    >
      <div
        aria-hidden
        className="hairline-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]"
      />
      <p className="relative font-mono text-[0.68rem] text-paper-dim">
        <span className="text-accent">$</span> python scripts/player_per_game_rates.py
      </p>
      <ol className="relative mt-5 space-y-0">
        {stages.map(({ step, detail }, i) => (
          <li key={step} className="grid grid-cols-[1.25rem_5.25rem_1fr] items-start gap-2 font-mono text-[0.74rem]">
            <span className="flex flex-col items-center">
              <span
                className={`mt-1 h-2 w-2 rounded-full ${i === stages.length - 1 ? "bg-accent" : "border border-paper/40"}`}
              />
              {i < stages.length - 1 && <span className="h-6 w-px bg-line-strong" />}
            </span>
            <span className="text-paper">{step}</span>
            <span className="text-paper-dim">{detail}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
