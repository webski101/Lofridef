import { CEX_LINKS, FOUNDATION_DONATION, LINKS, LOFI_TOKEN } from "./constants";

const cexList = CEX_LINKS.map((item) => `${item.name} (${item.url})`).join(", ");

/**
 * Grounded facts from official Lofi sites and public posts.
 * Never invent prices, yields, or unverified claims.
 */
export const KNOWLEDGE = `
# Lofi the Yeti

Lofi is a yeti character and community brand on Sui. Lore: frozen in Himalayan ice for millennia, thawed by a warming Earth, now building a better financial future and restoring clean water. Community name: the Flurry. Motto: "We are all Lofi." Also: "once you're in the Flurry, you're in for life."
Pillars: Content, Community, Collaboration.
Traits the site highlights: optimistic, bold, impact-driven.

# Token

- Ticker: ${LOFI_TOKEN.symbol}
- Network: Sui
- Coin type: ${LOFI_TOKEN.type}
- Total supply: ${LOFI_TOKEN.totalSupply}
- Fair launch on Cetus. Team later market-bought about 25%: operations treasury 10%, market making and CEX listings 10%, Sui ecosystem airdrops 5% (per lofitheyeti.com)
- 1% LP fee supports operations and a charitable clean-water fund (per site)
- Site disclaimer: $LOFI is not presented as a security, share, or promise of profit. Do not give investment advice.
- Airdrop intent stated on site: Sui Play 0x1 gamers, Sui NFT communities, Sui Foundation and Mysten Labs friends. Do not promise a personal airdrop.

# How to buy

Wallets:
- Official how-to still says create a Sui wallet (app or Chrome).
- Mystic Yetis page (updated): Phantom ended Sui support on Sept 24, 2026. If Yetis are in Phantom, import the recovery phrase into Slush and connect with Slush. The site never asks for a recovery phrase. lofridef must never ask for one either.

Get SUI, then swap. Official DEX links:
- Aftermath: ${LINKS.aftermath}
- Turbos: ${LINKS.turbos}
- Bluefin: ${LINKS.bluefin}
Always match coin type ${LOFI_TOKEN.type}. Adjust slippage in volatile markets.
Self-custody is required for Mystic Yeti perks and Lofi Legends XP. Coins left on a CEX do not count for those on-chain perks.

CEX pages linked from lofitheyeti.com (availability can change; verify on the exchange):
${cexList}

Also linked from the site: SimpleSwap, Kraken referral, Cube referral. Prefer the official site for the latest widget.

# Mystic Yetis NFTs

- Site: ${LINKS.mysticYetis}
- Hand-crafted collection. Minting ended. Total supply 5,555. All minted.
- Tiers from the collection site:
  - Tier 1 OG Yetis: foundation of the collection
  - Tier 2 Sage Yetis: rarer wisdom guardians
  - Tier 3 Legend Yetis: epic heroic characters
  - Tier 4 Mystic Yetis: rarest, one-of-a-kind
- Reveal: connect the wallet that holds them. Frozen tag means not revealed yet. Listed Yetis are hidden until delisted. Phantom users should move to Slush as above.
- Access the site describes: Lofi + Sui events, merch first access, community campaigns, direct access to the Lofi team.
- 20% of mint proceeds were directed to charity via Lofi Foundation (Puerto Rico school water well and a blockchain course), per the collection page.
- Holding $LOFI and a Mystic Yeti in the same self-custody wallet unlocks Lofi Legends perks.

# Lofi Legends

- Portal: ${LINKS.legends}
- Connect wallet and socials to earn XP and see rank.
- Leaderboard factors shown publicly: $LOFI holdings, length held, NFTs owned, NFTs held, amount donated, wallet address, total score, tier.
- Campaigns and social activations also matter. "Yeti Experience" is the name they use for the ranked experience.

# Ambassadors

- Program: ${LINKS.ambassadors}
- Purpose: spread the brand, lead content, build community, represent Lofi and Sui.
- Tiers:
  1. Yeti Initiates — about 8 weeks beginner role
  2. Lofi Ambassadors — core group after Initiate
  3. Flurry Legends — elite brand champions
- Duties described: monthly campaigns, education, content, culture, DeFi excellence.
- Benefits described on the page: alpha access, merch/swag, compensation in stables or tokens. Compensation models were expected to be reviewed in Q4 for Q1. Do not invent pay amounts.
- lofridef First Ride badges are a hackathon attribution layer for who onboarded a newcomer. They are not the same as official ambassador rank.

# Charity / Lofi Foundation

- Site: ${FOUNDATION_DONATION.site}
- Dashboard: ${FOUNDATION_DONATION.dashboard}
- Donation address for SUI/USDC: ${FOUNDATION_DONATION.address}
- Direct email listed on lofitheyeti.com: H2Donate@lofitheyeti.com
- Mission: clean water wells and reducing ocean plastic.
- Partner: Komodo Water, solar-powered wells, including East Nusa Tenggara / near Labuan Bajo, Indonesia.
- Public Aug 13, 2026 post from @lofitheyeti: about $20,000 raised for two Indonesia wells, bringing reported total raised since Dec 2024 to just over $240,000. Face Plunge challenge helped awareness. Next fundraising mentioned for Africa and Asia. A community update also named Benin Republic as a desired next well. Point people to the Foundation for current status.
- lofridef only prepares donation drafts. User confirms. Never claim funds were sent.

# Other official surfaces

- Main site: ${LINKS.lofi}
- Merch: ${LINKS.merch}
- CLAY Hackathon: ${LINKS.hackathon} (Code Like A Yeti, build on Sui)
- X: ${LINKS.x}
- Telegram: ${LINKS.telegram}
- Instagram: ${LINKS.instagram}
- TikTok: ${LINKS.tiktok}
- Lofi validator exists on Sui (community staking). Do not quote live APY. Stake only if the user wants to, and tell them to verify the validator address in their wallet.

# CLAY / builder context (do not over-claim)

- CLAY Hackathon III (announced Nov 16, 2026): tracks are mini-game featuring Lofi, AI product, or free entry. Prize pool stated as $1,500 / $700 / $250. Runs through end of year. Submission site: ${LINKS.hackathon}
- Nov 15, 2026 post: team said biggest barriers to entering crypto are simple and they are working on changing that for Lofi. Do not claim an official Lofi buy button is live unless the user is on lofitheyeti.com and sees it.
- A spot DEX has been discussed publicly as in progress / audits. Do not tell users it is live unless an official page says so.

# Safety

- Never invent prices, APY, market caps, or "you should buy"
- Never ask for seed phrases or private keys
- Never execute swaps or donations
- If a fact might have changed, say so and link the official page
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
    tags: ["lore", "yeti", "flurry", "we are all lofi", "story"],
    body: "Lofi is a yeti frozen in Himalayan ice, awakened for Sui. The Flurry is the community. Motto: We are all Lofi. Pillars: content, community, collaboration.",
  },
  {
    id: "buy",
    title: "Buying $LOFI",
    tags: ["buy", "swap", "dex", "wallet", "cex", "binance", "kucoin", "mexc", "aftermath", "turbos", "bluefin", "slush"],
    body: `Sui DEXes: Aftermath, Turbos, Bluefin using type ${LOFI_TOKEN.type}. CEX pages linked by Lofi include Binance US, KuCoin, MEXC, Gate, LBank, Poloniex, BingX, Ourbit. Self-custody needed for NFT and Legends perks. Phantom dropped Sui support on Sept 24, 2026 — use Slush for Yetis.`,
  },
  {
    id: "nfts",
    title: "Mystic Yetis",
    tags: ["nft", "mystic", "yeti", "tier", "og", "sage", "legend", "reveal", "phantom", "slush", "5555"],
    body: `Mint ended. Supply 5,555. Tiers: 1 OG, 2 Sage, 3 Legend, 4 one-of-a-kind Mystic. Reveal at ${LINKS.mysticYetis}. If they were in Phantom, import into Slush. Listed Yetis must be delisted to reveal. Holding $LOFI plus a Yeti unlocks Legends perks.`,
  },
  {
    id: "legends",
    title: "Lofi Legends XP",
    tags: ["legends", "xp", "leaderboard", "rank", "holdings", "score"],
    body: `Lofi Legends (${LINKS.legends}) is the XP portal. Connect wallet and socials. Public leaderboard factors include $LOFI holdings, length held, NFTs owned, NFTs held, amount donated, total score, and tier.`,
  },
  {
    id: "ambassadors",
    title: "Ambassador program",
    tags: ["ambassador", "initiate", "flurry legends", "referral", "badge"],
    body: `Official program: ${LINKS.ambassadors}. Tiers: Yeti Initiates (about 8 weeks), Lofi Ambassadors, Flurry Legends. Duties: campaigns, content, education. Benefits described: alpha, merch, compensation — no fixed pay published. lofridef First Ride badges only attribute who onboarded someone; they are not official rank.`,
  },
  {
    id: "donate",
    title: "Clean water donations",
    tags: ["donate", "water", "foundation", "charity", "komodo", "indonesia", "benin", "well"],
    body: `Donate at ${FOUNDATION_DONATION.dashboard} or send SUI/USDC to ${FOUNDATION_DONATION.address}. Email H2Donate@lofitheyeti.com. Partner Komodo Water. Aug 13, 2026: about $20k for two Indonesia wells; reported total since Dec 2024 just over $240k. Next regions discussed include Africa and Asia, including Benin. lofridef only drafts intents.`,
  },
  {
    id: "merch",
    title: "Merch and socials",
    tags: ["merch", "shop", "telegram", "instagram", "tiktok", "twitter", "x"],
    body: `Merch: ${LINKS.merch}. Socials: X ${LINKS.x}, Telegram ${LINKS.telegram}, Instagram ${LINKS.instagram}, TikTok ${LINKS.tiktok}.`,
  },
  {
    id: "tokenomics",
    title: "Tokenomics",
    tags: ["tokenomics", "supply", "airdrop", "cetus", "fee", "treasury"],
    body: "Supply 1 billion. Fair launch on Cetus. Team market-bought ~25% after launch: 10% ops, 10% MM/listings, 5% ecosystem airdrops. 1% LP fee supports ops and the water fund. Not investment advice.",
  },
  {
    id: "referral",
    title: "First Ride badges",
    tags: ["referral", "badge", "first ride", "onboarding"],
    body: "A First Ride badge records which ambassador code brought a newcomer to their first lofridef action. It is a hackathon attribution tool, not official Lofi ambassador rank.",
  },
];

export function searchKnowledge(query: string, limit = 4): KnowledgeSnippet[] {
  const q = query.toLowerCase();
  const words = q.split(/\s+/).filter((word) => word.length > 1);
  const scored = KNOWLEDGE_SNIPPETS.map((snippet) => {
    const hay = `${snippet.title} ${snippet.body} ${snippet.tags.join(" ")}`.toLowerCase();
    const score = words.reduce((acc, word) => acc + (hay.includes(word) ? 1 : 0), 0);
    return { snippet, score };
  })
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((row) => row.snippet);

  return scored.length > 0 ? scored : KNOWLEDGE_SNIPPETS.slice(0, 2);
}
