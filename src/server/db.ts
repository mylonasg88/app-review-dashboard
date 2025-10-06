import { SubmissionStatus } from "@/types/status";
import { randomUUID } from "crypto";

export interface Submission {
  id: string;
  name: string;
  developer: string;
  createdAt: string;
  status: SubmissionStatus;
  description: string;
  category: string;
  version: string;
  imageUrl: string;
  color: string; // Added color field
}

/**
 * Generate a random hex color
 */
function generateRandomHexColor(): string {
  return `${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;
}

/**
 * Singleton pattern to persist the mock DB in-memory across hot reloads.
 */
const globalForDB = globalThis as unknown as { submissions?: Submission[] };

export const DB: Submission[] =
  globalForDB.submissions ?? (globalForDB.submissions = seedData());

function seedData(): Submission[] {
  const appNames = [
    "Canva",
    "CapCut",
    "InShot",
    "Adobe Express",
    "Figma",
    "Descript",
    "Notion",
    "Trello",
    "OBS Studio",
    "Streamlabs",
    "TikTok",
    "YouTube Studio",
    "Instagram Creator Tools",
    "Patreon",
    "Substack",
    "Ko-fi",
    "Gumroad",
    "Discord",
    "Slack",
    "Spotify for Artists",
    "SoundCloud Creator",
    "Anchor",
    "Medium",
    "WordPress",
    "Shopify",
    "Ecamm Live",
    "Cameo",
    "Restream",
    "Be.Live",
    "Miro",
    "ClickUp",
    "Calendly",
    "ConvertKit",
    "Teachable",
    "Kajabi",
    "Loom",
    "Airtable",
  ];

  const categories = [
    "Video",
    "Photo",
    "Streaming",
    "Productivity",
    "Monetization",
  ];
  const statuses: SubmissionStatus[] = [
    "pending",
    "approved",
    "rejected",
    "flagged",
  ];

  const items: Submission[] = [];

  for (let i = 0; i < 100; i++) {
    const name =
      appNames[i % appNames.length] + (i >= appNames.length ? ` ${i}` : "");
    const createdAt = new Date(Date.now() - i * 60 * 60 * 1000).toISOString();
    const color = generateRandomHexColor();

    items.push({
      id: randomUUID(),
      name,
      developer: `Dev ${Math.floor(i / 5) + 1}`,
      createdAt,
      status: statuses[i % statuses.length],
      description: `A popular app for content creators — ${name}`,
      category: categories[i % categories.length],
      version: `1.${i % 10}.0`,
      imageUrl: `https://ui-avatars.com/api/?background=${color}&name=${encodeURIComponent(
        name
      )}&size=100`,
      color: `#${color}`,
    });
  }

  return items;
}
