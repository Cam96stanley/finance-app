# Finance App

A personal finance dashboard for tracking budgets, savings pots, recurring bills, and transactions — all in one focused interface.

![Dashboard Preview](public/dash.png)

---

## Features

- **Overview Dashboard** — Current balance, income, and expenses at a glance with recent transactions
- **Budget Tracking** — Set spending limits per category and monitor usage in real time
- **Savings Pots** — Earmark money toward specific goals without opening extra accounts
- **Transactions** — Searchable, paginated transaction history with income/expense breakdown
- **Recurring Bills** — Track paid, upcoming, and due-soon bills in one table
- **Authentication** — Secure sign-up and sign-in via Clerk

---

## Tech Stack

| | Technology |
|---|---|
| <img src="https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white" /> | **Next.js 16** — React framework with App Router |
| <img src="https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB" /> | **React 19** — UI library |
| <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" /> | **TypeScript** — Static typing |
| <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white" /> | **Tailwind CSS v4** — Utility-first styling |
| <img src="https://img.shields.io/badge/shadcn%2Fui-000000?logo=shadcnui&logoColor=white" /> | **shadcn/ui** — Accessible component primitives |
| <img src="https://img.shields.io/badge/Hono-E36002?logo=hono&logoColor=white" /> | **Hono** — Lightweight API router (served via Next.js route handlers) |
| <img src="https://img.shields.io/badge/Clerk-6C47FF?logo=clerk&logoColor=white" /> | **Clerk** — Authentication and user management |
| <img src="https://img.shields.io/badge/Drizzle_ORM-C5F74F?logo=drizzle&logoColor=black" /> | **Drizzle ORM** — Type-safe SQL query builder |
| <img src="https://img.shields.io/badge/Turso-4FF8D2?logo=turso&logoColor=black" /> | **Turso (libSQL)** — Edge SQLite database |
| <img src="https://img.shields.io/badge/TanStack_Query-FF4154?logo=reactquery&logoColor=white" /> | **TanStack Query** — Server state and data fetching |
| <img src="https://img.shields.io/badge/TanStack_Table-FF4154?logo=reactquery&logoColor=white" /> | **TanStack Table** — Headless table primitives |
| <img src="https://img.shields.io/badge/Recharts-22B5BF?logo=chartdotjs&logoColor=white" /> | **Recharts** — Composable chart library |
| <img src="https://img.shields.io/badge/Zod-3E67B1?logo=zod&logoColor=white" /> | **Zod** — Schema validation |
| <img src="https://img.shields.io/badge/Biome-60A5FA?logo=biome&logoColor=white" /> | **Biome** — Linting and formatting |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v20+
- [pnpm](https://pnpm.io/) v9+
- A [Clerk](https://clerk.com/) account
- A [Turso](https://turso.tech/) database

### 1. Clone the repository

```bash
git clone https://github.com/your-username/finance-app.git
cd finance-app
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
# Turso
TURSO_DATABASE_URL=libsql://your-database.turso.io
TURSO_AUTH_TOKEN=your-turso-auth-token

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/dashboard
```

### 4. Run database migrations

```bash
pnpm db:migrate
```

### 5. Start the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start the development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start the production server |
| `pnpm lint` | Run Biome linter |
| `pnpm lint:fix` | Auto-fix lint issues |
| `pnpm format` | Format source files with Biome |
| `pnpm db:generate` | Generate Drizzle migration files |
| `pnpm db:migrate` | Apply migrations to the database |
| `pnpm db:studio` | Open Drizzle Studio (database GUI) |
