export type ClientStatus = "Active" | "At Risk" | "Onboarding" | "Paused";
export type ProjectStatus = "To Do" | "In Progress" | "Review" | "Done";
export type InvoiceStatus = "Paid" | "Pending" | "Overdue";

export type Client = {
  id: string;
  name: string;
  industry: string;
  tier: "Enterprise" | "Growth" | "Strategic" | "Startup";
  status: ClientStatus;
  healthScore: number;
  health: {
    responseTimeTrend: number;
    meetingFrequency: number;
    invoicePaymentSpeed: number;
    messageSentiment: number;
  };
  owner: string;
  primaryContact: string;
  email: string;
  phone: string;
  city: string;
  arr: number;
  lastContact: string;
  nextAction: string;
};

export type Project = {
  id: string;
  clientId: string;
  name: string;
  status: ProjectStatus;
  owner: string;
  budget: number;
  trackedHours: number;
  milestone: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High" | "Critical";
};

export type Invoice = {
  id: string;
  clientId: string;
  projectId: string;
  amount: number;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  lineItems: { label: string; amount: number }[];
};

export type Message = {
  id: string;
  projectId: string;
  clientId: string;
  author: string;
  role: "Client" | "Manager" | "Staff" | "AI Assistant";
  body: string;
  sentAt: string;
};

export type Document = {
  id: string;
  clientId: string;
  folder: string;
  name: string;
  version: string;
  updatedAt: string;
  owner: string;
  summary: string;
};

export type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Manager" | "Staff" | "Client";
  access: string;
  status: "Active" | "Invited";
};

const baseClients = [
  ["NovaBridge Technologies", "Enterprise AI Infrastructure", "Strategic", "Active", 92, "Maya Chen", "Ari Patel", "ari.patel@novabridge.example", "San Francisco, CA", 842000],
  ["HelioGrid Energy", "Renewable Energy", "Enterprise", "Active", 88, "Owen Brooks", "Leah Morris", "leah.morris@heliogrid.example", "Austin, TX", 615000],
  ["Northstar Strategy Group", "Management Consulting", "Growth", "Onboarding", 81, "Priya Shah", "Jon Ellison", "jon.ellison@northstar.example", "Chicago, IL", 214000],
  ["Atlas Meridian Bank", "Financial Services", "Enterprise", "At Risk", 64, "Maya Chen", "Camila Ruiz", "camila.ruiz@atlas.example", "New York, NY", 978000],
  ["PulseForge Health", "Health Technology", "Strategic", "Active", 86, "Theo Grant", "Iris Taylor", "iris.taylor@pulseforge.example", "Boston, MA", 436000],
  ["Brightlane Creative", "Digital Agency", "Growth", "Paused", 57, "Owen Brooks", "Drew Harris", "drew.harris@brightlane.example", "Portland, OR", 128000],
  ["Cobalt CloudWorks", "Cloud Services", "Enterprise", "Active", 90, "Priya Shah", "Samira Khan", "samira.khan@cobalt.example", "Seattle, WA", 704000],
  ["Veridian Logistics", "Supply Chain", "Strategic", "At Risk", 69, "Theo Grant", "Marcus Bell", "marcus.bell@veridian.example", "Atlanta, GA", 352000],
  ["LumaWorks Studio", "Product Design", "Startup", "Onboarding", 77, "Maya Chen", "Nina Park", "nina.park@lumaworks.example", "Los Angeles, CA", 96000],
  ["SablePoint Legal", "Legal Services", "Growth", "Active", 83, "Owen Brooks", "Marta Silva", "marta.silva@sablepoint.example", "Denver, CO", 184000],
  ["Kinertia Robotics", "Industrial Robotics", "Enterprise", "Active", 91, "Priya Shah", "Felix Ng", "felix.ng@kinertia.example", "Pittsburgh, PA", 523000],
  ["EverPeak Ventures", "Venture Capital", "Strategic", "Active", 85, "Theo Grant", "Reese Cole", "reese.cole@everpeak.example", "Miami, FL", 301000],
  ["Aster & Rowe", "Brand Consultancy", "Growth", "Paused", 61, "Maya Chen", "Clara Wright", "clara.wright@asterrowe.example", "Nashville, TN", 142000],
  ["TerraNine Analytics", "Data Analytics", "Enterprise", "Active", 89, "Owen Brooks", "Vik Raman", "vik.raman@terranine.example", "Raleigh, NC", 476000],
  ["Juniper Retail Labs", "Retail Technology", "Startup", "Onboarding", 79, "Priya Shah", "Sofia Kim", "sofia.kim@juniper.example", "Minneapolis, MN", 112000]
] as const;

const companyPrefixes = ["Apex", "Beacon", "Cedar", "Drift", "Eclipse", "Falcon", "Granite", "Harbor", "Ion", "Keystone", "Lumina", "Monarch", "Nimbus", "Orbit", "Pioneer", "Quarry", "River", "Summit", "Tidal", "Union", "Vector", "Willow", "Zenith"];
const companySuffixes = ["Systems", "Advisory", "Labs", "Dynamics", "Partners", "Collective", "Network", "Industries", "Digital", "Works"];
const industries = ["SaaS", "Cybersecurity", "FinTech", "HealthTech", "EdTech", "Manufacturing", "Media", "Insurance", "Consulting", "E-commerce", "Telecom", "Hospitality"];
const cities = ["San Jose, CA", "Dallas, TX", "Phoenix, AZ", "Charlotte, NC", "Salt Lake City, UT", "Columbus, OH", "Tampa, FL", "Madison, WI", "Boulder, CO", "Richmond, VA"];
const owners = ["Maya Chen", "Owen Brooks", "Priya Shah", "Theo Grant", "Elena Novak"];
const contacts = ["Alex Morgan", "Jordan Lee", "Taylor Stone", "Casey Rivera", "Morgan Blake", "Riley Foster", "Jamie Fox", "Quinn Adler", "Robin Hart", "Dylan Yu"];
const projectNames = ["Customer Portal Modernization", "Revenue Operations Redesign", "AI Support Copilot", "Security Compliance Sprint", "Data Warehouse Migration", "Executive Reporting Suite", "Partner Onboarding Hub", "Mobile Experience Refresh", "Contract Automation Workflow", "Client Success Playbook", "Billing Platform Upgrade", "Knowledge Base Launch"];
const milestones = ["Discovery complete", "Prototype approved", "Data model locked", "UAT in progress", "Launch readiness", "Executive review", "Phase two scoping"];

const statusFor = (score: number, index: number): ClientStatus => {
  if (index % 17 === 0) return "Paused";
  if (score < 70) return "At Risk";
  if (index % 9 === 0) return "Onboarding";
  return "Active";
};

const isoDaysAgo = (days: number) => new Date(Date.UTC(2026, 0, 31 - days)).toISOString().slice(0, 10);
const isoDaysAhead = (days: number) => new Date(Date.UTC(2026, 1, 1 + days)).toISOString().slice(0, 10);

export const clients: Client[] = Array.from({ length: 220 }, (_, index) => {
  if (index < baseClients.length) {
    const [name, industry, tier, status, healthScore, owner, contact, email, city, arr] = baseClients[index];
    return {
      id: `client-${index + 1}`,
      name,
      industry,
      tier,
      status,
      healthScore,
      health: {
        responseTimeTrend: Math.max(45, healthScore - 4),
        meetingFrequency: Math.min(99, healthScore + 2),
        invoicePaymentSpeed: Math.max(40, healthScore - 8),
        messageSentiment: Math.min(98, healthScore + 4)
      },
      owner,
      primaryContact: contact,
      email,
      phone: `+1 (555) ${String(120 + index).padStart(3, "0")}-${String(4300 + index)}`,
      city,
      arr,
      lastContact: isoDaysAgo((index * 3) % 28),
      nextAction: ["Quarterly business review", "Proposal follow-up", "Renewal risk review", "Technical workshop"][index % 4]
    };
  }

  const name = `${companyPrefixes[index % companyPrefixes.length]} ${companySuffixes[(index * 3) % companySuffixes.length]}`;
  const healthScore = 48 + ((index * 7) % 51);
  const tier = (["Enterprise", "Growth", "Strategic", "Startup"] as const)[index % 4];
  const contact = contacts[index % contacts.length];
  return {
    id: `client-${index + 1}`,
    name: `${name} ${index > 37 ? Math.floor(index / 23) : ""}`.trim(),
    industry: industries[index % industries.length],
    tier,
    status: statusFor(healthScore, index),
    healthScore,
    health: {
      responseTimeTrend: Math.max(30, healthScore - ((index % 5) * 4)),
      meetingFrequency: Math.min(100, healthScore + ((index % 4) * 3)),
      invoicePaymentSpeed: Math.max(25, healthScore - ((index % 6) * 5)),
      messageSentiment: Math.min(100, healthScore + ((index % 7) * 2))
    },
    owner: owners[index % owners.length],
    primaryContact: contact,
    email: `${contact.toLowerCase().replace(" ", ".")}@client${index + 1}.example`,
    phone: `+1 (555) ${String(200 + (index % 700)).padStart(3, "0")}-${String(1000 + ((index * 29) % 8999))}`,
    city: cities[index % cities.length],
    arr: 60000 + ((index * 17321) % 820000),
    lastContact: isoDaysAgo((index * 2) % 45),
    nextAction: ["Send implementation plan", "Schedule renewal sync", "Review outstanding invoice", "Prepare roadmap brief", "Share launch metrics"][index % 5]
  };
});

export const projects: Project[] = Array.from({ length: 48 }, (_, index) => ({
  id: `project-${index + 1}`,
  clientId: clients[index % 30].id,
  name: projectNames[index % projectNames.length],
  status: (["To Do", "In Progress", "Review", "Done"] as const)[index % 4],
  owner: owners[index % owners.length],
  budget: 24000 + ((index * 13750) % 176000),
  trackedHours: 22 + ((index * 13) % 220),
  milestone: milestones[index % milestones.length],
  dueDate: isoDaysAhead((index * 4) % 90),
  priority: (["Low", "Medium", "High", "Critical"] as const)[(index + 1) % 4]
}));

export const invoices: Invoice[] = Array.from({ length: 72 }, (_, index) => {
  const project = projects[index % projects.length];
  const amount = 5000 + ((index * 9821) % 195000);
  const status = (["Paid", "Pending", "Overdue"] as const)[index % 3];
  return {
    id: `INV-${String(2026000 + index + 1)}`,
    clientId: project.clientId,
    projectId: project.id,
    amount,
    status,
    issueDate: isoDaysAgo(70 - (index % 60)),
    dueDate: isoDaysAgo(40 - (index % 55)),
    paidDate: status === "Paid" ? isoDaysAgo(34 - (index % 31)) : undefined,
    lineItems: [
      { label: "Platform strategy and delivery", amount: Math.round(amount * 0.52) },
      { label: "Engineering implementation", amount: Math.round(amount * 0.34) },
      { label: "Success enablement", amount: amount - Math.round(amount * 0.52) - Math.round(amount * 0.34) }
    ]
  };
});

const messageBodies = [
  "The latest prototype is aligned with the executive brief. Can we review the risk register before Friday?",
  "I attached the updated requirements from procurement and highlighted the approval dependencies.",
  "The migration window looks good. Our team prefers the second option because it reduces downtime.",
  "AI note: sentiment remains positive, but response time slipped by 18% this week.",
  "We need one more pass on the dashboard copy before legal review.",
  "The payment batch has been queued and should clear before the invoice deadline.",
  "Can your team suggest two workshop times for next week with the analytics stakeholders?",
  "Milestone accepted. Please move the onboarding card into review when QA completes smoke testing."
];

export const messages: Message[] = Array.from({ length: 128 }, (_, index) => {
  const project = projects[index % projects.length];
  const client = clients.find((item) => item.id === project.clientId) ?? clients[0];
  const role = (["Client", "Manager", "Staff", "AI Assistant"] as const)[index % 4];
  return {
    id: `message-${index + 1}`,
    projectId: project.id,
    clientId: project.clientId,
    author: role === "Client" ? client.primaryContact : role === "AI Assistant" ? "Nova AI" : owners[index % owners.length],
    role,
    body: messageBodies[index % messageBodies.length],
    sentAt: new Date(Date.UTC(2026, 0, 5 + (index % 25), 9 + (index % 8), (index * 7) % 59)).toISOString()
  };
});

export const documents: Document[] = Array.from({ length: 66 }, (_, index) => {
  const client = clients[index % 30];
  const folder = ["Contracts", "Statements of Work", "Security", "Invoices", "Research"][index % 5];
  return {
    id: `doc-${index + 1}`,
    clientId: client.id,
    folder,
    name: `${folder} - ${client.name} ${index % 4 === 0 ? "Master" : "Revision"}.pdf`,
    version: `v${1 + (index % 5)}.${index % 10}`,
    updatedAt: isoDaysAgo(index % 40),
    owner: owners[index % owners.length],
    summary: "Contract includes managed delivery services, quarterly roadmap planning, data security addendum, and milestone-based payment terms with a 30-day acceptance window."
  };
});

export const revenueData = [
  { month: "Feb", revenue: 742000, pipeline: 920000, utilization: 72 },
  { month: "Mar", revenue: 781000, pipeline: 980000, utilization: 76 },
  { month: "Apr", revenue: 824000, pipeline: 1012000, utilization: 79 },
  { month: "May", revenue: 806000, pipeline: 1088000, utilization: 74 },
  { month: "Jun", revenue: 871000, pipeline: 1134000, utilization: 82 },
  { month: "Jul", revenue: 913000, pipeline: 1195000, utilization: 84 },
  { month: "Aug", revenue: 944000, pipeline: 1244000, utilization: 86 },
  { month: "Sep", revenue: 982000, pipeline: 1289000, utilization: 88 },
  { month: "Oct", revenue: 1019000, pipeline: 1332000, utilization: 89 },
  { month: "Nov", revenue: 1076000, pipeline: 1405000, utilization: 91 },
  { month: "Dec", revenue: 1138000, pipeline: 1482000, utilization: 90 },
  { month: "Jan", revenue: 1194000, pipeline: 1536000, utilization: 92 }
];

export const retentionData = [
  { name: "Retained", value: 84 },
  { name: "Expansion", value: 11 },
  { name: "Churn Risk", value: 5 }
];

export const pipelineData = [
  { stage: "Qualified", value: 42 },
  { stage: "Proposal", value: 31 },
  { stage: "Security", value: 20 },
  { stage: "Legal", value: 13 },
  { stage: "Closed", value: 9 }
];

export const teamMembers: TeamMember[] = [
  { id: "team-1", name: "Maya Chen", email: "maya@novabridge.example", role: "Admin", access: "Full workspace, billing, security", status: "Active" },
  { id: "team-2", name: "Owen Brooks", email: "owen@novabridge.example", role: "Manager", access: "Client portfolio and reporting", status: "Active" },
  { id: "team-3", name: "Priya Shah", email: "priya@novabridge.example", role: "Manager", access: "Projects, invoices, analytics", status: "Active" },
  { id: "team-4", name: "Theo Grant", email: "theo@novabridge.example", role: "Staff", access: "Assigned projects and messages", status: "Active" },
  { id: "team-5", name: "Ari Patel", email: "ari.patel@novabridge.example", role: "Client", access: "NovaBridge portal only", status: "Invited" }
];

export const recentActivity = [
  "NovaBridge approved the phase two roadmap and expanded success budget.",
  "Atlas Meridian Bank opened a renewal risk review for delayed security sign-off.",
  "Cobalt CloudWorks paid INV-2026011 three days early.",
  "AI scheduling proposed three workshop windows for HelioGrid Energy.",
  "Document summary generated for PulseForge Health master services agreement."
];

export function getClient(id: string) {
  return clients.find((client) => client.id === id) ?? clients[0];
}

export function getClientProjects(clientId: string) {
  return projects.filter((project) => project.clientId === clientId);
}

export function getClientInvoices(clientId: string) {
  return invoices.filter((invoice) => invoice.clientId === clientId);
}

export function getClientMessages(clientId: string) {
  return messages.filter((message) => message.clientId === clientId).slice(0, 18);
}

export function getClientDocuments(clientId: string) {
  return documents.filter((document) => document.clientId === clientId);
}
