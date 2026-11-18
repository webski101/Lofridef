import { FOUNDATION_DONATION, LINKS, LOFI_TOKEN } from "./constants";

/**
 * Grounded facts lofridef may use. Never invent prices, yields, or unverified claims.
 */
export const KNOWLEDGE = `
# Lofi the Yeti

Lofi is a yeti character and community brand on the Sui blockchain. In the lore, Lofi was frozen in Himalayan ice for millennia, thawed by warming Earth, and now works to restore clean water and grow a builder community on Sui called "the Flurry." Motto: "We are all Lofi."

# Token

- Ticker: ${LOFI_TOKEN.symbol}
- Network: Sui
- Type: ${LOFI_TOKEN.type}
- Total supply: ${LOFI_TOKEN.totalSupply}
- Fair launch on Cetus; team later market-bought ~25% for ops, MM/listings, and ecosystem airdrops (per project site)
- 1% LP fee supports operations and a charitable clean-water fund (per project site)
- Holding $LOFI + a Mystic Yeti NFT can unlock Lofi Legends XP perks (self-custody wallet required)

# How to buy (high-level; never give price targets)

1. Create a Sui-compatible wallet
2. Get some SUI for gas / swap input
3. Swap on a Sui DEX such as Aftermath (${LINKS.aftermath}), Turbos, or Bluefin using the official type above
4. Adjust slippage carefully in volatile markets
5. Prefer self-custody if the user wants NFT / Legends perks

# Charity / Lofi Foundation

- Mission: clean water wells and ocean plastic reduction
- Partner example: Komodo Water (Indonesia solar-powered wells)
- Community has publicly reported large cumulative fundraising for wells; always point to official sources for current figures
- Donation dashboard: ${FOUNDATION_DONATION.dashboard}
- Official donation address (SUI/USDC): ${FOUNDATION_DONATION.address}
- Next well direction discussed publicly includes Benin Republic after Indonesia projects

# Ecosystem pieces

- Mystic Yetis NFTs
- Lofi Legends XP program
- Ambassador program (bring new users/builders to Sui)
- CLAY Hackathons (Code Like A Yeti) on Sui
- Lofi The Yeti Sui validator (commission historically directed toward community/hackathon support, per public commentary)
- Spot DEX work announced / in audit stages historically — do not claim live features unless user confirms from official sources

# Safety rules for lofridef

- Never invent prices, APY, market caps, or "guaranteed" returns
- Never hold or ask for private keys / seed phrases
- Never auto-send funds; only PREPARE swap/donate intents for user confirmation
- Prefer official links: ${LINKS.lofi}, ${FOUNDATION_DONATION.site}, ${LINKS.x}
- If unsure, say so and point to official Lofi channels
`.trim();

export type KnowledgeSnippet = {
  id: string;
  title: string;
  body: string;
  tags: string[];
};

export const KNOWLEDGE_SNIPPETS: KnowledgeSnippet[] = [
  {
    id: "lore",
    title: "Who is Lofi?",
    tags: ["lore", "yeti", "flurry"],
    body: "Lofi is a yeti frozen in time, awakened for Sui. The Flurry is the community. Motto: We are all Lofi.",
  },
  {
    id: "buy",
    title: "Buying $LOFI",
    tags: ["buy", "swap", "dex", "wallet"],
    body: `Use a Sui wallet, get SUI, then swap on Aftermath/Turbos/Bluefin for type ${LOFI_TOKEN.type}. Self-custody needed for NFT/XP perks.`,
  },
  {
    id: "donate",
    title: "Clean water donations",
    tags: ["donate", "water", "foundation", "charity"],
    body: `Donate via ${FOUNDATION_DONATION.dashboard} or send SUI/USDC to ${FOUNDATION_DONATION.address}. lofridef only prepares intents; user confirms.`,
  },
  {
    id: "referral",
    title: "Ambassador referrals",
    tags: ["ambassador", "referral", "badge", "onboarding"],
    body: "Each successful first action can mint an on-chain First Ride badge that records which ambassador brought the newcomer in.",
  },
];

export function searchKnowledge(query: string, limit = 4): KnowledgeSnippet[] {
  const q = query.toLowerCase();
  const scored = KNOWLEDGE_SNIPPETS.map((snippet) => {
    const hay = `${snippet.title} ${snippet.body} ${snippet.tags.join(" ")}`.toLowerCase();
    const score = q
      .split(/\s+/)
      .filter(Boolean)
      .reduce((acc, word) => acc + (hay.includes(word) ? 1 : 0), 0);
    return { snippet, score };
  })
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((row) => row.snippet);

  return scored.length > 0 ? scored : KNOWLEDGE_SNIPPETS.slice(0, 2);
}
