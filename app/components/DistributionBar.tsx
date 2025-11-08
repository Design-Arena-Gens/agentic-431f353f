import { categoryLabels } from "@/lib/resources";

interface DistributionDatum {
  category: string;
  amount: number;
}

interface DistributionBarProps {
  data: DistributionDatum[];
}

export function DistributionBar({ data }: DistributionBarProps) {
  if (!data.length) return null;

  const total = data.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="distribution">
      <header>
        <span className="heading">Category coverage</span>
        <span className="total">{total} matches</span>
      </header>
      <div className="bar" role="list">
        {data.map((item) => {
          const width = `${(item.amount / total) * 100}%`;
          return (
            <div
              key={item.category}
              className={`segment segment-${item.category}`}
              style={{ width }}
              role="listitem"
            >
              <span>{categoryLabels[item.category as keyof typeof categoryLabels]}</span>
            </div>
          );
        })}
      </div>
      <style jsx>{`
        .distribution {
          display: grid;
          gap: 0.75rem;
        }
        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: rgba(226, 232, 240, 0.75);
          font-size: 0.85rem;
        }
        .heading {
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .bar {
          display: flex;
          border-radius: 999px;
          overflow: hidden;
          border: 1px solid rgba(148, 163, 184, 0.25);
          background: rgba(15, 23, 42, 0.8);
        }
        .segment {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          padding: 0.45rem 0.3rem;
          color: #0f172a;
          font-weight: 600;
        }
        .segment-workspace {
          background: rgba(94, 234, 212, 0.8);
        }
        .segment-internet {
          background: rgba(14, 165, 233, 0.8);
        }
        .segment-food {
          background: rgba(248, 113, 113, 0.8);
        }
        .segment-culture {
          background: rgba(192, 132, 252, 0.8);
        }
        .segment-learning {
          background: rgba(129, 140, 248, 0.85);
        }
        .segment-health {
          background: rgba(74, 222, 128, 0.8);
        }
        .segment-finance {
          background: rgba(250, 204, 21, 0.85);
        }
        .segment-mobility {
          background: rgba(156, 163, 175, 0.85);
        }
        @media (max-width: 720px) {
          header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.4rem;
          }
          .segment {
            font-size: 0.6rem;
          }
        }
      `}</style>
    </div>
  );
}
