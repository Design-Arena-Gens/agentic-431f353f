import type { EvaluationSummary } from "@/lib/evaluator";

interface SummaryPanelProps {
  summary: EvaluationSummary | null;
}

export function SummaryPanel({ summary }: SummaryPanelProps) {
  if (!summary) return null;

  return (
    <section className="summary-panel" aria-live="polite">
      <h2>{summary.headline}</h2>
      <p>{summary.nuance}</p>
      <div className="opportunity">
        <span>Next step</span>
        <p>{summary.opportunity}</p>
      </div>
      <style jsx>{`
        .summary-panel {
          display: grid;
          gap: 1rem;
          background: linear-gradient(120deg, rgba(56, 189, 248, 0.15), rgba(16, 185, 129, 0.2));
          border: 1px solid rgba(56, 189, 248, 0.25);
          border-radius: 24px;
          padding: 1.75rem;
          color: rgba(15, 23, 42, 0.95);
        }
        h2 {
          margin: 0;
          font-size: 1.45rem;
          color: #0f172a;
        }
        p {
          margin: 0;
          font-size: 1rem;
          color: rgba(15, 23, 42, 0.78);
        }
        .opportunity {
          background: rgba(15, 23, 42, 0.85);
          border-radius: 18px;
          padding: 1.1rem 1.25rem;
          display: grid;
          gap: 0.4rem;
        }
        .opportunity span {
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-size: 0.7rem;
          color: rgba(226, 232, 240, 0.6);
        }
        .opportunity p {
          color: rgba(226, 232, 240, 0.88);
        }
        @media (max-width: 720px) {
          .summary-panel {
            padding: 1.4rem;
          }
          h2 {
            font-size: 1.3rem;
          }
        }
      `}</style>
    </section>
  );
}
