CREATE TABLE IF NOT EXISTS "clients" (
  "id" text PRIMARY KEY NOT NULL,
  "name" text NOT NULL,
  "industry" text NOT NULL,
  "tier" text NOT NULL,
  "status" text NOT NULL,
  "health_score" integer NOT NULL,
  "health" jsonb NOT NULL,
  "owner" text NOT NULL,
  "primary_contact" text NOT NULL,
  "email" text NOT NULL,
  "phone" text NOT NULL,
  "city" text NOT NULL,
  "arr" integer NOT NULL,
  "last_contact" timestamp NOT NULL,
  "next_action" text NOT NULL
);
CREATE TABLE IF NOT EXISTS "projects" (
  "id" text PRIMARY KEY NOT NULL,
  "client_id" text NOT NULL REFERENCES "clients"("id"),
  "name" text NOT NULL,
  "status" text NOT NULL,
  "owner" text NOT NULL,
  "budget" integer NOT NULL,
  "tracked_hours" integer NOT NULL,
  "milestone" text NOT NULL,
  "due_date" timestamp NOT NULL,
  "priority" text NOT NULL
);
CREATE TABLE IF NOT EXISTS "invoices" (
  "id" text PRIMARY KEY NOT NULL,
  "client_id" text NOT NULL REFERENCES "clients"("id"),
  "project_id" text NOT NULL REFERENCES "projects"("id"),
  "amount" integer NOT NULL,
  "status" text NOT NULL,
  "issue_date" timestamp NOT NULL,
  "due_date" timestamp NOT NULL,
  "paid_date" timestamp,
  "line_items" jsonb NOT NULL
);
CREATE TABLE IF NOT EXISTS "messages" (
  "id" text PRIMARY KEY NOT NULL,
  "project_id" text NOT NULL REFERENCES "projects"("id"),
  "client_id" text NOT NULL REFERENCES "clients"("id"),
  "author" text NOT NULL,
  "role" text NOT NULL,
  "body" text NOT NULL,
  "sent_at" timestamp NOT NULL
);
CREATE TABLE IF NOT EXISTS "documents" (
  "id" text PRIMARY KEY NOT NULL,
  "client_id" text NOT NULL REFERENCES "clients"("id"),
  "folder" text NOT NULL,
  "name" text NOT NULL,
  "version" text NOT NULL,
  "updated_at" timestamp NOT NULL,
  "owner" text NOT NULL,
  "summary" text NOT NULL
);
CREATE TABLE IF NOT EXISTS "team_members" (
  "id" text PRIMARY KEY NOT NULL,
  "name" text NOT NULL,
  "email" text NOT NULL,
  "role" text NOT NULL,
  "access" text NOT NULL,
  "status" text NOT NULL
);
