import { FOUNDATION_DONATION, LOFI_TOKEN } from "./constants";
import { searchKnowledge } from "./knowledge";
import { normalizeReferralCode } from "./referral-code";
import { createReferralBadge } from "./referrals";

function lastUserText(messages: Array<{ role: string; parts?: Array<{ type: string; text?: string }>; content?: string }>) {
  for (let i = messages.length - 1; i >= 0; i -= 1) {
    const message = messages[i];
    if (message.role !== "user") continue;
    if (typeof message.content === "string" && message.content.trim()) {
      return message.content.trim();
    }
    const text = (message.parts ?? [])
      .filter((part) => part.type === "text" && part.text)
      .map((part) => part.text)
      .join("\n")
      .trim();
    if (text) return text;
  }
  return "";
}

export async function buildDemoAssistantText(
  messages: Array<{ role: string; parts?: Array<{ type: string; text?: string }>; content?: string }>,
  referralCode?: string,
) {
  const text = lastUserText(messages).toLowerCase();
  const code = normalizeReferralCode(referralCode);

  if (/mystic|nft|tier|reveal|phantom|slush|5555/.test(text)) {
    const hits = searchKnowledge("mystic yetis nft tiers slush");
    return [
      "Mystic Yetis are the Lofi NFT collection on Sui. Minting is over: 5,555, all minted.",
      "Tiers: 1 OG, 2 Sage, 3 Legend, 4 one-of-a-kind Mystic.",
      "Reveal them at https://mysticyetissui.lofitheyeti.com/",
      "Phantom ended Sui support on Sept 24, 2026. Import into Slush if your Yetis are still there. I will never ask for your recovery phrase.",
      "",
      hits.map((hit) => `• **${hit.title}**: ${hit.body}`).join("\n"),
    ].join("\n");
  }

  if (/legend|xp|leaderboard|rank/.test(text)) {
    const hits = searchKnowledge("lofi legends xp leaderboard");
    return [
      "Lofi Legends is the XP portal: https://legends.lofitheyeti.com/",
      "Connect a self-custody wallet (and socials) to earn XP.",
      "The public leaderboard looks at $LOFI holdings, how long you held, NFTs owned and held, donations, total score, and tier.",
      "Hold $LOFI and a Mystic Yeti in the same wallet for the perks.",
      "",
      hits.map((hit) => `• **${hit.title}**: ${hit.body}`).join("\n"),
    ].join("\n");
  }

  if (/ambassador program|join ambassador|initiate|flurry legend|ambassador tier/.test(text)) {
    const hits = searchKnowledge("ambassador program initiates flurry legends");
    return [
      "Official ambassador program: https://ambassadors.lofitheyeti.com/",
      "Tiers: Yeti Initiates (about 8 weeks) → Lofi Ambassadors → Flurry Legends.",
      "They lead content, campaigns, and community. The page mentions alpha, merch, and compensation, but it does not publish a pay number.",
      "A lofridef First Ride badge only records who invited you here. It is not official ambassador rank.",
      "",
      hits.map((hit) => `• **${hit.title}**: ${hit.body}`).join("\n"),
    ].join("\n");
  }

  if (/merch|shop|telegram|instagram|tiktok|social/.test(text)) {
    const hits = searchKnowledge("merch shop telegram instagram");
    return [
      "Merch: https://shop.lofitheyeti.com/",
      "Socials: X https://x.com/lofitheyeti · Telegram https://t.me/LofiOnSui · Instagram https://www.instagram.com/lofitheyeti · TikTok https://www.tiktok.com/@lofitheyeti",
      "",
      hits.map((hit) => `• **${hit.title}**: ${hit.body}`).join("\n"),
    ].join("\n");
  }

  if (/who is lofi|what is lofi|about lofi|yeti|flurry|lore/.test(text)) {
    const hits = searchKnowledge("lofi yeti flurry lore");
    return [
      "Lofi is a yeti frozen in time, awakened for Sui — optimistic, community-first, and focused on clean water.",
      "The community is called the Flurry. Motto: We are all Lofi.",
      "",
      hits.map((hit) => `• **${hit.title}**: ${hit.body}`).join("\n"),
      "",
      "Want the next step? Ask how to buy $LOFI, donate to wells, or use an ambassador referral.",
      code ? `Referral code detected: \`${code}\`.` : "",
    ]
      .filter(Boolean)
      .join("\n");
  }

  if (/donat|well|water|charity|foundation/.test(text)) {
    return [
      "I can prepare a clean-water donation draft for the Lofi Foundation.",
      "",
      `Suggested recipient: \`${FOUNDATION_DONATION.address}\``,
      `Tracker: ${FOUNDATION_DONATION.dashboard}`,
      "",
      "Tell me an amount (e.g. “donate 5 SUI”) and I’ll draft an intent for you to confirm.",
      "I never send funds myself.",
      code ? `Your ambassador code \`${code}\` can be attached after your first confirmed action.` : "",
    ]
      .filter(Boolean)
      .join("\n");
  }

  if (/\bbuy\b|\bswap\b|\$lofi|purchase|how do i get/.test(text)) {
    return [
      "Here’s the safe path to prepare a $LOFI swap — draft only, you confirm:",
      "",
      "1. Use a Sui wallet you control",
      "2. Hold a little SUI for the swap + gas",
      `3. Swap into type \`${LOFI_TOKEN.type}\` on Aftermath, Turbos, or Bluefin`,
      "   CEX pages Lofi links include Binance US, KuCoin, MEXC, Gate, LBank, Poloniex, BingX, and Ourbit. Coins left there do not count for NFT or Legends perks.",
      "4. Double-check the type and slippage",
      "",
      "Say “prepare a 10 SUI swap” and I’ll build a confirmation card.",
      "I don’t give price targets or investment advice.",
    ].join("\n");
  }

  if (/ambassad|referr|badge|invite|first ride/.test(text)) {
    const badge = await createReferralBadge({
      ambassadorCode: code || "community",
      newcomerLabel: "demo rider",
      firstAction: "learned",
    });
    return [
      "First Ride badges record which ambassador helped a newcomer take their first action.",
      "",
      `Demo badge issued: \`${badge.id}\``,
      `Ambassador: @${badge.ambassadorCode}`,
      `Action: ${badge.firstAction}`,
      "",
      "On mainnet this maps to the Move module in `move/lofridef`.",
    ].join("\n");
  }

  const hits = searchKnowledge(text || "lofi");
  return [
    "I’m lofridef — your first ride into Lofi on Sui.",
    "",
    hits.map((hit) => `• **${hit.title}**: ${hit.body}`).join("\n"),
    "",
    "Try: buy $LOFI, donate to wells, or ask how ambassador referrals work.",
    code ? `Referral code detected: \`${code}\`.` : "Add `?ref=ambassador-handle` to attribute your onboarding.",
    "",
    "_Demo mode is on (no AI_GATEWAY_API_KEY). Add a gateway key for full streaming chat._",
  ].join("\n");
}
