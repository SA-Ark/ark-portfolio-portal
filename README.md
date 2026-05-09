# Ark Portfolio Portal

Polished portfolio demo app for a fictional enterprise client management platform: **NovaBridge Technologies Client OS**.

## Stack

- Next.js 16 App Router + TypeScript
- Tailwind CSS v4
- shadcn/ui-style components (Button, Card, Table, Dialog, Sheet, Badge, Input)
- Auth.js v5 credentials provider (`demo@arkdev.io` / `demo123`)
- PostgreSQL + Drizzle ORM schema and seed script
- Recharts analytics

## Features

- Dashboard with client relationship KPIs, revenue chart, pending actions, recent activity
- 220 seeded clients with searchable/filterable table, status, health scores, last contact
- Client detail pages with contact info, timeline, invoices, documents, messages, AI health breakdown
- Draggable Kanban project board with milestones and time tracking
- Invoicing with Stripe-style invoice detail dialogs and payment history chart
- Document vault with folders, versions, and mocked contract summarizer
- Mock real-time messaging interface per project thread
- Analytics dashboard: revenue line, retention donut, pipeline funnel, utilization bar
- Team/RBAC settings for Admin, Manager, Staff, Client roles
- AI features: Smart Compose, scheduling suggestions, document summarization, client health scoring

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Database seed

```bash
export DATABASE_URL="postgres://postgres:postgres@localhost:5432/ark_portfolio_portal"
npm run db:migrate
npm run seed
```

The UI uses deterministic seeded TypeScript data for portfolio demo reliability; the Drizzle schema and seed script are included for PostgreSQL-backed demos.
