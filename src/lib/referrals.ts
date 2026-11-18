import { nanoid } from "nanoid";

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

type BadgeStore = {
  badges: ReferralBadge[];
};

declare global {
  var __lofridefBadgeStore: BadgeStore | undefined;
}

function getStore(): BadgeStore {
  if (!globalThis.__lofridefBadgeStore) {
    globalThis.__lofridefBadgeStore = { badges: [] };
  }
  return globalThis.__lofridefBadgeStore;
}

export async function listBadges(): Promise<ReferralBadge[]> {
  return [...getStore().badges];
}

export async function createReferralBadge(input: {
  ambassadorCode: string;
  newcomerLabel?: string;
  firstAction: FirstAction;
}): Promise<ReferralBadge> {
  const store = getStore();
  const badge: ReferralBadge = {
    id: `ride_${nanoid(10)}`,
    ambassadorCode: input.ambassadorCode.trim().replace(/^@/, ""),
    newcomerLabel: input.newcomerLabel?.trim() || "anonymous yeti",
    firstAction: input.firstAction,
    issuedAt: new Date().toISOString(),
    chain: "demo",
  };
  store.badges = [badge, ...store.badges].slice(0, 200);
  return badge;
}
