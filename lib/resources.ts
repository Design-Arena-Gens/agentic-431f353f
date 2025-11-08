export type ResourceCategory =
  | "workspace"
  | "internet"
  | "food"
  | "culture"
  | "learning"
  | "health"
  | "finance"
  | "mobility";

export interface Resource {
  id: string;
  name: string;
  category: ResourceCategory;
  description: string;
  tags: string[];
  availability: string;
  proofRequired?: string;
  notes?: string;
  website?: string;
  cityCoverage: "national" | string[];
  highlights: string[];
}

export const categoryLabels: Record<ResourceCategory, string> = {
  workspace: "Work & Study",
  internet: "Connectivity",
  food: "Food & Groceries",
  culture: "Arts & Culture",
  learning: "Learning",
  health: "Health",
  finance: "Finance & Legal",
  mobility: "Mobility"
};

export const resources: Resource[] = [
  {
    id: "library-flex",
    name: "Public Library Flex Workspaces",
    category: "workspace",
    description:
      "Quiet desks, Wi-Fi, printing, and meeting rooms widely available with a library card.",
    tags: ["library", "study", "cowork", "wifi", "quiet", "meeting rooms", "printing"],
    availability: "Daily, typically 9am – 8pm",
    proofRequired: "Library card (free for local residents)",
    cityCoverage: "national",
    highlights: ["Reliable gigabit Wi-Fi", "Free study rooms", "On-site librarians for research help"]
  },
  {
    id: "city-civic-centers",
    name: "City Civic Innovation Centers",
    category: "workspace",
    description:
      "Municipal hubs that offer booking-based coworking zones, podcast studios, and maker spaces for residents.",
    tags: ["coworking", "maker", "podcast", "studio", "residents", "city hall"],
    availability: "Weekdays, 8am – 6pm",
    proofRequired: "Resident ID or utility bill",
    cityCoverage: ["New York", "San Francisco", "Austin", "Chicago", "Seattle"],
    highlights: ["Reservable media labs", "Monthly community workshops", "Mentorship office hours"]
  },
  {
    id: "park-wifi",
    name: "Connected Parks Program",
    category: "internet",
    description:
      "Outdoor Wi-Fi blankets public parks and plazas with power kiosks and device charging lockers.",
    tags: ["wifi", "internet", "outdoor", "park", "power", "charging"],
    availability: "24/7",
    cityCoverage: ["New York", "Los Angeles", "Boston", "Philadelphia"],
    notes: "Signal strongest near kiosks; best for email, research, and streaming lectures.",
    highlights: ["Fast 150 Mbps download", "USB-C and AC charging", "Live park events calendar"]
  },
  {
    id: "community-fridge",
    name: "Community Fridge Network",
    category: "food",
    description:
      "Volunteer-powered fridges stocked daily with produce, prepared meals, and hygiene kits.",
    tags: ["food", "groceries", "meals", "mutual aid", "neighbors", "volunteer"],
    availability: "24/7 (stock varies by location)",
    cityCoverage: "national",
    notes: "Bring reusable bags; leave items you do not need.",
    highlights: ["Real-time restock updates", "Accessible refrigeration", "Local volunteer support"]
  },
  {
    id: "museum-first-friday",
    name: "Museum First Fridays",
    category: "culture",
    description:
      "Partner museums open exhibitions after-hours with live music and no admission fees once a month.",
    tags: ["museum", "art", "culture", "first friday", "events", "music"],
    availability: "First Friday each month, 5pm – 10pm",
    cityCoverage: ["Denver", "Phoenix", "Kansas City", "Portland"],
    highlights: ["Local artist showcases", "Free docent-led tours", "Community vendor market"]
  },
  {
    id: "skill-up-labs",
    name: "Skill Up Labs",
    category: "learning",
    description:
      "City-funded digital labs offering certification-aligned courses, mentorship, and career coaching.",
    tags: ["coding", "training", "courses", "career", "certification", "resume"],
    availability: "Mon – Sat, 9am – 9pm",
    proofRequired: "Registration (takes <5 minutes)",
    cityCoverage: ["Atlanta", "Detroit", "Miami", "Cleveland"],
    highlights: ["Industry mentors", "Laptop lending library", "Childcare on-site"]
  },
  {
    id: "free-clinics",
    name: "Community Care Clinics",
    category: "health",
    description:
      "Federally qualified health centers with sliding scale pricing, free screenings, and telehealth drop-ins.",
    tags: ["health", "clinic", "care", "wellness", "primary care", "mental health"],
    availability: "Varies by clinic; typically extended evening hours",
    notes: "Most services free with proof of income; emergency walk-ins welcome.",
    cityCoverage: "national",
    highlights: ["Licensed nurse practitioners", "Behavioral health counselors", "Medication assistance"]
  },
  {
    id: "financial-empowerment",
    name: "Financial Empowerment Centers",
    category: "finance",
    description:
      "One-on-one financial coaching, debt negotiation support, and public benefits screening at no cost.",
    tags: ["finance", "debt", "tax", "budget", "credit", "benefits"],
    availability: "By appointment; same-week bookings available",
    cityCoverage: ["New York", "St. Louis", "Dallas", "San Antonio", "Charlotte"],
    highlights: ["Certified financial counselors", "Student loan workshops", "Credit report clean-up"]
  },
  {
    id: "bike-share-equity",
    name: "Bike Share Equity Pass",
    category: "mobility",
    description:
      "Discounted or free annual passes for bike share systems for riders with qualifying income levels.",
    tags: ["transport", "bike", "mobility", "commute", "low-income", "outdoor"],
    availability: "Daily, 24/7 access",
    proofRequired: "Income verification or public assistance card",
    cityCoverage: ["Washington DC", "Philadelphia", "Chicago", "Seattle", "Minneapolis"],
    highlights: ["Unlimited 45-minute trips", "Safety classes included", "Helmets at community centers"]
  }
];

export const keywordClusters: Record<string, ResourceCategory> = {
  cowork: "workspace",
  work: "workspace",
  "study room": "workspace",
  wifi: "internet",
  hotspot: "internet",
  internet: "internet",
  groceries: "food",
  meal: "food",
  "food pantry": "food",
  museum: "culture",
  art: "culture",
  "live music": "culture",
  course: "learning",
  class: "learning",
  coding: "learning",
  clinic: "health",
  therapist: "health",
  doctor: "health",
  "financial aid": "finance",
  taxes: "finance",
  commute: "mobility",
  bike: "mobility",
  transit: "mobility"
};
