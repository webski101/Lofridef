export const BRAND = {
  name: "lofridef",
  tagline: "Your first ride into Lofi on Sui",
  description:
    "An AI guide that takes complete beginners from zero to their first Lofi action on Sui — without seed phrases, gas panic, or price advice.",
} as const;

export const LOFI_TOKEN = {
  symbol: "$LOFI",
  packageId:
    "0xf22da9a24ad027cccb5f2d496cbe91de953d363513db08a3a734d361c7c17503",
  type: "0xf22da9a24ad027cccb5f2d496cbe91de953d363513db08a3a734d361c7c17503::LOFI::LOFI",
  totalSupply: "1,000,000,000",
} as const;

export const FOUNDATION_DONATION = {
  address:
    "0xb1a99b2135e594ed62506352a79362a146dda11398cacb187cb42533b66ce69c",
  dashboard: "https://donate.lofifoundation.com/",
  site: "https://lofifoundation.com/",
} as const;

export const LINKS = {
  lofi: "https://www.lofitheyeti.com/",
  hackathon: "https://hackathon.lofitheyeti.com/",
  aftermath: "https://aftermath.finance/",
  x: "https://x.com/lofitheyeti",
  telegram: "https://t.me/lofitheyeti",
  validator:
    "https://suistaking.io/validators/0x7ab4a4f88e3062a8af7c4c43add6e1d6d864f3511ed67c352989c81ff048fccd",
} as const;

export const STARTER_PROMPTS = [
  "What is Lofi the Yeti?",
  "How do I buy $LOFI safely?",
  "I want to donate to the water wells",
  "How do ambassador referrals work?",
] as const;
