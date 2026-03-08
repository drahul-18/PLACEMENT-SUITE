# Placement Suite

Unified application combining three features:

- **Job Notification Tracker** — Track job postings, filter by preferences, save favorites, and get personalized digests
- **Placement Readiness** — Practice, assess, and prepare for placements with mock interviews and progress tracking
- **AI Resume Builder** — Build a professional resume with premium structure and clarity

## Tech Stack

- React 18 + TypeScript
- Vite 5
- React Router 7
- Tailwind CSS 4
- Recharts, Lucide React

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Route Structure

| Path | Feature |
|------|---------|
| `/` | Landing page |
| `/jobs` | Job Notification Tracker |
| `/jobs/dashboard` | Job dashboard |
| `/jobs/saved` | Saved jobs |
| `/jobs/digest` | Daily digest |
| `/jobs/settings` | Preferences |
| `/readiness` | Placement Readiness |
| `/readiness/dashboard` | Readiness dashboard |
| `/resume` | AI Resume Builder |
| `/resume/builder` | Resume builder |
| `/resume/preview` | Resume preview |

## Data Storage

All features use namespaced localStorage keys with prefix `placementSuite:` to avoid collisions.
