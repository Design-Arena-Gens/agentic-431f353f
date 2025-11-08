"use client";

import { clsx } from "clsx";
import { useState } from "react";

const QUICK_NEEDS = [
  "Free coworking with Wi-Fi",
  "Healthy meals",
  "Bike commute",
  "Financial coaching",
  "Art events",
  "Mental health clinic"
];

interface NeedSelectorProps {
  onSelect: (value: string) => void;
}

export function NeedSelector({ onSelect }: NeedSelectorProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="need-selector">
      <span className="label">Popular searches</span>
      <div className="chips">
        {QUICK_NEEDS.map((item, index) => (
          <button
            key={item}
            type="button"
            className={clsx("chip", activeIndex === index && "active")}
            onClick={() => {
              setActiveIndex(index === activeIndex ? null : index);
              onSelect(item);
            }}
          >
            {item}
          </button>
        ))}
      </div>
      <style jsx>{`
        .need-selector {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: rgba(226, 232, 240, 0.6);
        }
        .chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .chip {
          background: rgba(15, 118, 110, 0.15);
          border: 1px solid rgba(94, 234, 212, 0.35);
          color: #99f6e4;
          padding: 0.55rem 0.9rem;
          border-radius: 999px;
          font-size: 0.85rem;
          transition: all 150ms ease;
        }
        .chip:hover {
          background: rgba(94, 234, 212, 0.25);
          transform: translateY(-1px);
        }
        .chip.active {
          background: rgba(16, 185, 129, 0.45);
          border-color: rgba(16, 185, 129, 0.9);
          color: #ecfdf5;
        }
        @media (max-width: 600px) {
          .chips {
            gap: 0.4rem;
          }
          .chip {
            font-size: 0.75rem;
            padding: 0.45rem 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}
