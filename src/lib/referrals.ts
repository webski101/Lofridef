import { nanoid } from "nanoid";
import { promises as fs } from "fs";
import path from "path";

export { normalizeReferralCode } from "./referral-code";

export type FirstAction =
  | "learned"
  | "swap_prepared"
  | "donation_prepared"
  | "wallet_created";

export type ReferralBadge = {
  id: string;
  ambassadorCode: string;
  newcomerLabel: string;
  firstAction: FirstAction;
  issuedAt: string;
  chain: "demo" | "sui";
  digest?: string;
};

const DATA_DIR = path.join(process.cwd(), ".data");
const BADGES_FILE = path.join(DATA_DIR, "badges.json");

async function ensureStore() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(BADGES_FILE);
  } catch {
    await fs.writeFile(BADGES_FILE, "[]", "utf8");
  }
}

export async function listBadges(): Promise<ReferralBadge[]> {
  await ensureStore();
  const raw = await fs.readFile(BADGES_FILE, "utf8");
  return JSON.parse(raw) as ReferralBadge[];
}

export async function createReferralBadge(input: {
  ambassadorCode: string;
  newcomerLabel?: string;
  firstAction: FirstAction;
}): Promise<ReferralBadge> {
  await ensureStore();
  const badges = await listBadges();
  const badge: ReferralBadge = {
    id: `ride_${nanoid(10)}`,
    ambassadorCode: input.ambassadorCode.trim().replace(/^@/, ""),
    newcomerLabel: input.newcomerLabel?.trim() || "anonymous yeti",
    firstAction: input.firstAction,
    issuedAt: new Date().toISOString(),
    chain: "demo",
  };
  badges.unshift(badge);
  await fs.writeFile(BADGES_FILE, JSON.stringify(badges.slice(0, 200), null, 2));
  return badge;
}

