# Interview Prep dashboard

A browser-based TypeScript dashboard for a 34-week software engineering interview preparation plan.

## Run locally

Requires Node.js 22.6+ and Python 3 for the simple preview server.

```sh
cd interview-prep
npm run build
npm start
```

Open http://localhost:4173 in your browser. The application is dependency-free; `npm install` is not required.

## Curriculum checkpoint

- Lesson 2: NeetCode 150 — Contains Duplicate (spaced review, **not mastered**).
- DynamicArray checkpoints 3A–3E completed.
- NeetCode coverage: 3/150 encountered (not all mastered).
- Provisional interview readiness: 5%.
- Upcoming: Product of Array Except Self; Hashing Fundamentals; ShippingEstimator architecture.
- Additional future topics: Next.js, Spring Boot microservices, PostgreSQL, Elasticsearch and Kibana.

## Data and backups

The app saves progress in **this browser's localStorage** under `interview-prep-v1`. GitHub commits and browser deployments do **not** synchronize that data across devices. Use **Settings & backup** in the dashboard to export your progress before clearing browser data, changing devices or moving between site origins. Keep exported backups private if they contain personal notes.

## Source and build

- `src/app.ts` — UI, state and interactions
- `src/data.ts` — problem catalog and roadmap
- `build.mjs` — strips TypeScript types to `dist/*.js`
- `dist/` — static files served by the browser

After editing TypeScript, run `npm run build` and commit updated `dist/` assets as well if publishing the static folder directly.
