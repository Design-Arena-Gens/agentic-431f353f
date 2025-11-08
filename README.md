# Is It Free Here?

Discover genuinely free civic, nonprofit, and community-powered resources in seconds. Enter what you need, add a location, and receive curated programs with confidence scores, eligibility cues, and preparation tips.

## ✨ Features

- Smart matcher that ranks free programs across workspace, internet, food, culture, learning, health, finance, and mobility categories
- Confidence scoring with rationale so you know why a program was recommended
- Quick-pick intents for common needs like coworking, meals, and financial coaching
- Access and preparation playbooks with practical steps to claim each benefit
- Fully static Next.js 14 App Router build, deployable directly to Vercel

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000` to explore the assistant.

## 🧱 Tech Stack

- [Next.js 14](https://nextjs.org/) with the App Router
- React 18 + TypeScript strict typing
- Lightweight CSS modules via `styled-jsx`

## 📦 Scripts

- `npm run dev` – start the local development server
- `npm run build` – produce the production build
- `npm run start` – serve the production build
- `npm run lint` – lint the codebase

## 🔍 Project Layout

```
app/
  page.tsx            # Main experience layer
  components/         # UI atoms and molecules
lib/
  resources.ts        # Domain data for civic programs
  evaluator.ts        # Scoring and insight generation
public/
  favicon.svg
```

## 📄 License

MIT
