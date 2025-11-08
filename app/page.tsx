"use client";

import { FormEvent, useMemo, useState } from "react";
import { evaluateResources } from "@/lib/evaluator";
import { NeedSelector } from "./components/NeedSelector";
import { SummaryPanel } from "./components/SummaryPanel";
import { ResultCard } from "./components/ResultCard";
import { DistributionBar } from "./components/DistributionBar";
import { InsightList } from "./components/InsightList";

const DEFAULT_NEED = "Free coworking with Wi-Fi";
const DEFAULT_LOCATION = "New York";

export default function HomePage() {
  const [need, setNeed] = useState(DEFAULT_NEED);
  const [location, setLocation] = useState(DEFAULT_LOCATION);

  const evaluation = useMemo(() => evaluateResources(need, location), [need, location]);

  const accessInsights = useMemo(() => {
    if (!evaluation.results.length) return [];
    return evaluation.results.map((entry) => {
      if (entry.locationMatch === "local") {
        return `${entry.resource.name} confirms free access in ${location}. Book early to hold your slot.`;
      }
      if (entry.locationMatch === "nearby") {
        return `${entry.resource.name} is available in nearby cities—ask about remote intake or commuter vouchers.`;
      }
      return `${entry.resource.name} operates nationally. Most people onboard digitally in 10 minutes.`;
    });
  }, [evaluation.results, location]);

  const preparationInsights = useMemo(() => {
    if (!evaluation.results.length) return [];
    const top = evaluation.results[0];
    const items: string[] = [];
    if (top.resource.proofRequired) {
      items.push(`Gather documentation: ${top.resource.proofRequired}.`);
    }
    items.push("Call ahead or browse the online calendar for real-time capacity.");
    items.push("Bring a reusable bottle or chargers—most spaces support stay-all-day sessions.");
    return items;
  }, [evaluation.results]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const needInput = (formData.get("need") as string).trim();
    const locationInput = (formData.get("location") as string).trim();
    if (needInput) {
      setNeed(needInput);
    }
    setLocation(locationInput || "");
  };

  return (
    <main>
      <div className="shell">
        <section className="hero">
          <span className="label">Is it free here?</span>
          <h1>Know what costs nothing—and how to claim it—in seconds.</h1>
          <p>
            Ask for any resource and we surface trusted public, civic, and community programs that stay
            100% free. No ads, no paywalls—just practical steps to unlock what you need.
          </p>
        </section>

        <form className="query" onSubmit={handleSubmit}>
          <div className="fields">
            <label>
              <span>What do you need?</span>
              <input
                name="need"
                defaultValue={need}
                placeholder="eg. Quiet study room with Wi-Fi"
                autoComplete="off"
              />
            </label>
            <label>
              <span>Where will you be?</span>
              <input name="location" defaultValue={location} placeholder="City, region, or remote" />
            </label>
          </div>
          <button type="submit">Check free options →</button>
        </form>

        <NeedSelector
          onSelect={(value) => {
            setNeed(value);
          }}
        />

        <div className="summary">
          <SummaryPanel summary={evaluation.summary} />
          <DistributionBar data={evaluation.categoryDistribution} />
        </div>

        <section className="results" aria-live="polite">
          {evaluation.results.map((result) => (
            <ResultCard key={result.resource.id} result={result} />
          ))}
        </section>

        <div className="insights">
          <InsightList title="Access playbook" items={accessInsights} />
          <InsightList title="Prep checklist" items={preparationInsights} />
        </div>
      </div>

      <style jsx>{`
        .shell {
          display: grid;
          gap: 2.5rem;
        }
        .hero {
          display: grid;
          gap: 1rem;
        }
        .label {
          display: inline-flex;
          width: fit-content;
          font-size: 0.75rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.35rem 0.75rem;
          border-radius: 999px;
          background: rgba(94, 234, 212, 0.15);
          border: 1px solid rgba(94, 234, 212, 0.4);
          color: rgba(94, 234, 212, 0.9);
        }
        h1 {
          margin: 0;
          font-size: clamp(2.4rem, 5vw, 3.6rem);
          line-height: 1.08;
          color: #f8fafc;
        }
        .hero p {
          margin: 0;
          font-size: 1.05rem;
          color: rgba(226, 232, 240, 0.75);
          max-width: 48ch;
        }
        .query {
          background: rgba(15, 23, 42, 0.7);
          border: 1px solid rgba(148, 163, 184, 0.25);
          border-radius: 24px;
          padding: 1.5rem;
          display: grid;
          gap: 1.25rem;
          backdrop-filter: blur(10px);
        }
        .fields {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1.25rem;
        }
        label {
          display: grid;
          gap: 0.5rem;
          color: rgba(226, 232, 240, 0.7);
          font-size: 0.9rem;
        }
        input {
          border-radius: 14px;
          padding: 0.85rem 1.1rem;
          border: 1px solid rgba(148, 163, 184, 0.35);
          background: rgba(15, 23, 42, 0.85);
          color: #f8fafc;
          font-size: 1rem;
          outline: none;
          transition: border-color 150ms ease, box-shadow 150ms ease;
        }
        input:focus {
          border-color: rgba(94, 234, 212, 0.8);
          box-shadow: 0 0 0 3px rgba(94, 234, 212, 0.2);
        }
        button {
          justify-self: flex-start;
          background: linear-gradient(135deg, rgba(94, 234, 212, 0.85), rgba(14, 165, 233, 0.85));
          color: #0f172a;
          border: none;
          font-weight: 600;
          padding: 0.85rem 1.75rem;
          border-radius: 999px;
          font-size: 1rem;
          cursor: pointer;
          transition: transform 120ms ease, box-shadow 120ms ease;
        }
        button:hover {
          transform: translateY(-1px);
          box-shadow: 0 18px 35px rgba(14, 116, 144, 0.35);
        }
        .summary {
          display: grid;
          gap: 1.5rem;
        }
        .results {
          display: grid;
          gap: 1.5rem;
        }
        .insights {
          display: grid;
          gap: 1.2rem;
        }
        @media (max-width: 960px) {
          .fields {
            grid-template-columns: 1fr;
          }
          button {
            width: 100%;
          }
          .summary {
            gap: 1.2rem;
          }
        }
      `}</style>
    </main>
  );
}
