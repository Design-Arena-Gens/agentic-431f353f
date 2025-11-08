import { keywordClusters, resources, type Resource } from "./resources";

export interface EvaluationResult {
  resource: Resource;
  score: number;
  confidence: "high" | "medium" | "emerging";
  matchedKeywords: string[];
  locationMatch: "local" | "nearby" | "national";
  rationale: string[];
}

export interface EvaluationSummary {
  headline: string;
  nuance: string;
  opportunity: string;
}

const normalize = (value: number, min: number, max: number) => {
  if (max === min) return 0;
  return (value - min) / (max - min);
};

const scoreToConfidence = (score: number): EvaluationResult["confidence"] => {
  if (score >= 0.75) return "high";
  if (score >= 0.45) return "medium";
  return "emerging";
};

const pickHeadline = (
  top: EvaluationResult,
  query: string,
  location: string
): EvaluationSummary => {
  const cityPhrase = location ? ` in ${location}` : "";

  if (top.confidence === "high") {
    return {
      headline: `${top.resource.name} is your strongest free option${cityPhrase}.`,
      nuance: `It aligns closely with "${query}" thanks to ${top.matchedKeywords
        .slice(0, 2)
        .join(" and ")}.`,
      opportunity:
        "Reserve in advance to guarantee access and bring any proof-of-eligibility before arrival."
    };
  }

  if (top.confidence === "medium") {
    return {
      headline: `You have promising free alternatives${cityPhrase}.`,
      nuance: `${top.resource.name} covers the essentials, but availability can fluctuate, especially during peak hours.`,
      opportunity: "Consider pairing two resources to cover gaps, or call ahead for confirmation."
    };
  }

  return {
    headline: "No perfect match yet, but try these emerging resources.",
    nuance: `${top.resource.name} partially matches what you asked for; check eligibility details before making plans.`,
    opportunity:
      "Contact local community organizations—they often maintain hidden programs not listed publicly."
  };
};

const extractKeywords = (value: string): string[] => {
  return value
    .toLowerCase()
    .split(/[^a-z0-9+]+/)
    .filter(Boolean);
};

const scoreResource = (
  resource: Resource,
  terms: string[],
  location: string
): EvaluationResult => {
  const keywordMatches = new Set<string>();
  let intentScore = 0;

  terms.forEach((term) => {
    if (resource.tags.some((tag) => tag.includes(term))) {
      keywordMatches.add(term);
      intentScore += 0.9;
    }

    const mappedCategory = keywordClusters[term];
    if (mappedCategory && mappedCategory === resource.category) {
      keywordMatches.add(term);
      intentScore += 0.7;
    }
  });

  const uniqueMatches = Array.from(keywordMatches);

  const locationLower = location.toLowerCase();
  let locationBoost = 0.1;
  let locationMatch: EvaluationResult["locationMatch"] = "national";

  if (resource.cityCoverage === "national") {
    locationBoost = 0.15;
    locationMatch = "national";
  } else if (locationLower) {
    const directHit = resource.cityCoverage.some((city) => city.toLowerCase() === locationLower);
    const partialHit = resource
      .cityCoverage
      .map((city) => city.toLowerCase())
      .some((city) => locationLower.includes(city) || city.includes(locationLower));

    if (directHit) {
      locationBoost = 0.35;
      locationMatch = "local";
    } else if (partialHit) {
      locationBoost = 0.25;
      locationMatch = "nearby";
    } else {
      locationBoost = 0.05;
    }
  }

  const baseScore = intentScore / Math.max(terms.length, 1);
  const score = Math.min(1, baseScore + locationBoost);

  const rationale: string[] = [];

  if (uniqueMatches.length) {
    rationale.push(`Matches your keywords: ${uniqueMatches.join(", ")}.`);
  }

  if (locationMatch === "local") {
    rationale.push("Confirmed availability in your city.");
  } else if (locationMatch === "nearby") {
    rationale.push("Regional partners operate within reach.");
  } else {
    rationale.push("Available nationally with remote intake options.");
  }

  if (resource.proofRequired) {
    rationale.push(`Bring: ${resource.proofRequired}.`);
  }

  if (resource.notes) {
    rationale.push(resource.notes);
  }

  return {
    resource,
    score,
    confidence: scoreToConfidence(score),
    matchedKeywords: uniqueMatches,
    locationMatch,
    rationale
  };
};

export const evaluateResources = (query: string, location: string) => {
  const sanitizedQuery = query.trim();
  const sanitizedLocation = location.trim();

  const terms = extractKeywords(sanitizedQuery.length ? sanitizedQuery : "Free resources");

  const scored = resources.map((resource) => scoreResource(resource, terms, sanitizedLocation));
  const sorted = scored.sort((a, b) => b.score - a.score);

  const topThree = sorted.slice(0, 3);
  const summary = sorted.length ? pickHeadline(sorted[0], sanitizedQuery, sanitizedLocation) : null;

  const categoryDistribution = Object.entries(
    topThree.reduce<Record<string, number>>((acc, entry) => {
      acc[entry.resource.category] = (acc[entry.resource.category] ?? 0) + 1;
      return acc;
    }, {})
  ).map(([category, amount]) => ({ category, amount }));

  return {
    results: topThree,
    summary,
    categoryDistribution
  };
};

export type EvaluationPayload = ReturnType<typeof evaluateResources>;
