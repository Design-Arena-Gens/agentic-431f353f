import { categoryLabels } from "@/lib/resources";
import type { EvaluationResult } from "@/lib/evaluator";

const confidenceHue: Record<EvaluationResult["confidence"], string> = {
  high: "rgba(34, 197, 94, 0.85)",
  medium: "rgba(250, 204, 21, 0.85)",
  emerging: "rgba(248, 113, 113, 0.85)"
};

const confidenceCopy: Record<EvaluationResult["confidence"], string> = {
  high: "High confidence match",
  medium: "Promising with caveats",
  emerging: "Explore with caution"
};

interface ResultCardProps {
  result: EvaluationResult;
}

export function ResultCard({ result }: ResultCardProps) {
  const { resource } = result;

  return (
    <article className="card">
      <header>
        <span className="badge" style={{ backgroundColor: confidenceHue[result.confidence] }}>
          {confidenceCopy[result.confidence]}
        </span>
        <span className="category">{categoryLabels[resource.category]}</span>
        <h3>{resource.name}</h3>
        <p className="description">{resource.description}</p>
      </header>
      <ul className="highlights">
        {resource.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
      <footer>
        <div className="meta">
          <strong>Availability:</strong>
          <span>{resource.availability}</span>
        </div>
        {resource.proofRequired && (
          <div className="meta">
            <strong>Bring:</strong>
            <span>{resource.proofRequired}</span>
          </div>
        )}
        <div className="meta">
          <strong>Coverage:</strong>
          <span>
            {resource.cityCoverage === "national"
              ? "Nationwide"
              : resource.cityCoverage.slice(0, 3).join(", ") +
                (resource.cityCoverage.length > 3 ? " +" : "")}
          </span>
        </div>
        <div className="meta">
          <strong>Confidence:</strong>
          <span>{result.score.toFixed(2)}</span>
        </div>
        <ul className="rationale">
          {result.rationale.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        {resource.website && (
          <a className="cta" href={resource.website} target="_blank" rel="noreferrer">
            Visit program site →
          </a>
        )}
      </footer>
      <style jsx>{`
        .card {
          background: rgba(15, 23, 42, 0.7);
          border: 1px solid rgba(148, 163, 184, 0.2);
          border-radius: 20px;
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          backdrop-filter: blur(12px);
          box-shadow: 0 20px 40px rgba(15, 23, 42, 0.3);
        }
        header {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .badge {
          align-self: flex-start;
          color: #0f172a;
          font-weight: 600;
          font-size: 0.75rem;
          letter-spacing: 0.08em;
          padding: 0.35rem 0.7rem;
          border-radius: 100px;
          text-transform: uppercase;
        }
        .category {
          font-size: 0.85rem;
          color: rgba(148, 163, 184, 0.8);
        }
        h3 {
          font-size: 1.5rem;
          margin: 0;
          color: #f8fafc;
        }
        .description {
          margin: 0;
          color: rgba(226, 232, 240, 0.8);
          line-height: 1.6;
        }
        .highlights {
          display: grid;
          gap: 0.65rem;
          padding: 0;
          margin: 0;
          list-style: none;
        }
        .highlights li {
          display: flex;
          gap: 0.5rem;
          color: rgba(226, 232, 240, 0.85);
        }
        .highlights li::before {
          content: "✽";
          color: rgba(94, 234, 212, 0.9);
        }
        footer {
          display: grid;
          gap: 1rem;
        }
        .meta {
          display: flex;
          gap: 0.35rem;
          font-size: 0.9rem;
          color: rgba(226, 232, 240, 0.75);
        }
        .meta strong {
          color: rgba(226, 232, 240, 0.95);
        }
        .rationale {
          margin: 0;
          padding-left: 1.15rem;
          display: grid;
          gap: 0.45rem;
          color: rgba(226, 232, 240, 0.78);
        }
        .cta {
          margin-top: 0.5rem;
          align-self: flex-start;
          background: rgba(56, 189, 248, 0.25);
          color: #38bdf8;
          border: 1px solid rgba(56, 189, 248, 0.4);
          font-weight: 600;
          padding: 0.6rem 1rem;
          border-radius: 999px;
          transition: all 150ms ease;
        }
        .cta:hover {
          background: rgba(56, 189, 248, 0.5);
          color: #0f172a;
        }
        @media (max-width: 720px) {
          .card {
            padding: 1.25rem;
          }
          h3 {
            font-size: 1.35rem;
          }
        }
      `}</style>
    </article>
  );
}
