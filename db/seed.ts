import { db } from "./index";
import * as schema from "./schema";
import { clients, documents, invoices, messages, projects, teamMembers } from "../lib/seed-data";

async function main() {
  console.log("Seeding NovaBridge portfolio demo data...");
  await db.delete(schema.messages);
  await db.delete(schema.documents);
  await db.delete(schema.invoices);
  await db.delete(schema.projects);
  await db.delete(schema.teamMembers);
  await db.delete(schema.clients);

  await db.insert(schema.clients).values(clients.map((client) => ({
    ...client,
    lastContact: new Date(client.lastContact)
  })));

  await db.insert(schema.projects).values(projects.map((project) => ({
    ...project,
    dueDate: new Date(project.dueDate)
  })));

  await db.insert(schema.invoices).values(invoices.map((invoice) => ({
    ...invoice,
    issueDate: new Date(invoice.issueDate),
    dueDate: new Date(invoice.dueDate),
    paidDate: invoice.paidDate ? new Date(invoice.paidDate) : null
  })));

  await db.insert(schema.documents).values(documents.map((document) => ({
    ...document,
    updatedAt: new Date(document.updatedAt)
  })));

  await db.insert(schema.messages).values(messages.map((message) => ({
    ...message,
    sentAt: new Date(message.sentAt)
  })));

  await db.insert(schema.teamMembers).values(teamMembers);

  console.log(`Seeded ${clients.length} clients, ${projects.length} projects, ${invoices.length} invoices, ${messages.length} messages, ${documents.length} documents, and ${teamMembers.length} team members.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
