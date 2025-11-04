## KRUX Finance Support App

Customer-facing chat and support-agent dashboard built with Next.js App Router, TypeScript, and Tailwind CSS v4.

### Features
- Customer chat with quick actions and bot responses
- Support dashboard with tickets, priorities, statuses, and quick replies
- Local storage–backed services for demo data (`lib/*`)
- Context providers for auth, chat, and support state

### Tech Stack
- Next.js 16 (App Router, Turbopack)
- React 19
- TypeScript 5
- Tailwind CSS v4
- lucide-react icons

---

## Getting Started

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
npm start
```

Open `http://localhost:3000` in your browser.

---

## Project Structure

```
app/                 # Next.js app routes (App Router)
  customer-chat/     # Customer chat UI
  support-dashboard/ # Agent dashboard UI
context/             # React contexts (Auth, Chat, Support)
lib/                 # Local storage services and helpers
types/               # Shared TypeScript types
```

---

## Tailwind CSS v4 Notes
- PostCSS config uses `@tailwindcss/postcss` plugin.
- Global design tokens and utilities live in `app/globals.css` with `@reference` and `@theme` blocks.
- No manual content scanning is required in v4; utilities are detected automatically.

---

## Environment
This demo uses local storage and does not require environment variables. If you add APIs or persistence, create `.env` files and restart the dev server.

---

## License

This project is licensed under the MIT License – see the `LICENSE` file for details.

