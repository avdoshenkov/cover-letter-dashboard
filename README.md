# Cover Letter Dashboard

A Next.js application for generating, storing, and managing cover letters directly in the browser. Users can craft personalised applications, track their progress toward a five-letter goal, and revisit previously generated letters thanks to local persistence.

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Run the development server**
   ```bash
   npm run dev
   ```
3. **Build for production**
   ```bash
   npm run build
   npm run start
   ```
4. **Run tests**
   ```bash
   npm test
   ```

## Features

- React + Next.js App Router with TypeScript and CSS Modules.
- Local font loading via `next/font/local` for the Fixel typeface.
- Global design tokens exposed as CSS custom properties for consistent styling.
- Dashboard listing saved cover letters with copy/delete actions and goal tracking.
- Form-driven generator powered by React Hook Form + Zod with simulated AI latency.
- Persistent storage using Zustand with `localStorage` to restore letters per browser.
- Responsive layouts for desktop and mobile breakpoints.
- Vitest + React Testing Library setup for future component testing.

## Environment Variables

To integrate with external AI providers (e.g., OpenAI) add the required API keys to `.env.local` as described in the [Next.js environment variables documentation](https://nextjs.org/docs/app/guides/environment-variables). The current implementation uses a local template generator, so no keys are required by default.
