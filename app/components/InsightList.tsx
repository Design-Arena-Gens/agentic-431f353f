interface InsightListProps {
  title: string;
  items: string[];
}

export function InsightList({ title, items }: InsightListProps) {
  if (!items.length) return null;

  return (
    <section className="insight">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <style jsx>{`
        .insight {
          background: rgba(30, 41, 59, 0.75);
          border-radius: 18px;
          border: 1px solid rgba(148, 163, 184, 0.25);
          padding: 1.4rem;
          display: grid;
          gap: 0.65rem;
        }
        h3 {
          margin: 0;
          font-size: 1rem;
          color: rgba(226, 232, 240, 0.92);
        }
        ul {
          margin: 0;
          padding-left: 1.2rem;
          display: grid;
          gap: 0.45rem;
          color: rgba(226, 232, 240, 0.8);
        }
        li::marker {
          color: rgba(94, 234, 212, 0.9);
        }
      `}</style>
    </section>
  );
}
