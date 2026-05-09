import { pgTable, text, integer, timestamp, jsonb } from "drizzle-orm/pg-core";

export const clients = pgTable("clients", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  industry: text("industry").notNull(),
  tier: text("tier").notNull(),
  status: text("status").notNull(),
  healthScore: integer("health_score").notNull(),
  health: jsonb("health").notNull(),
  owner: text("owner").notNull(),
  primaryContact: text("primary_contact").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  city: text("city").notNull(),
  arr: integer("arr").notNull(),
  lastContact: timestamp("last_contact").notNull(),
  nextAction: text("next_action").notNull()
});

export const projects = pgTable("projects", {
  id: text("id").primaryKey(),
  clientId: text("client_id").notNull().references(() => clients.id),
  name: text("name").notNull(),
  status: text("status").notNull(),
  owner: text("owner").notNull(),
  budget: integer("budget").notNull(),
  trackedHours: integer("tracked_hours").notNull(),
  milestone: text("milestone").notNull(),
  dueDate: timestamp("due_date").notNull(),
  priority: text("priority").notNull()
});

export const invoices = pgTable("invoices", {
  id: text("id").primaryKey(),
  clientId: text("client_id").notNull().references(() => clients.id),
  projectId: text("project_id").notNull().references(() => projects.id),
  amount: integer("amount").notNull(),
  status: text("status").notNull(),
  issueDate: timestamp("issue_date").notNull(),
  dueDate: timestamp("due_date").notNull(),
  paidDate: timestamp("paid_date"),
  lineItems: jsonb("line_items").notNull()
});

export const messages = pgTable("messages", {
  id: text("id").primaryKey(),
  projectId: text("project_id").notNull().references(() => projects.id),
  clientId: text("client_id").notNull().references(() => clients.id),
  author: text("author").notNull(),
  role: text("role").notNull(),
  body: text("body").notNull(),
  sentAt: timestamp("sent_at").notNull()
});

export const documents = pgTable("documents", {
  id: text("id").primaryKey(),
  clientId: text("client_id").notNull().references(() => clients.id),
  folder: text("folder").notNull(),
  name: text("name").notNull(),
  version: text("version").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  owner: text("owner").notNull(),
  summary: text("summary").notNull()
});

export const teamMembers = pgTable("team_members", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  role: text("role").notNull(),
  access: text("access").notNull(),
  status: text("status").notNull()
});
