import {
  type InferUITools,
  type ToolSet,
  type UIDataTypes,
  type UIMessage,
  tool,
} from "ai";
import { z } from "zod";
import { FOUNDATION_DONATION, LOFI_TOKEN } from "./constants";
import { searchKnowledge } from "./knowledge";
import { createReferralBadge } from "./referrals";

export const lofridefTools = {
  search_knowledge: tool({
    description:
      "Search grounded Lofi / Sui onboarding facts before answering factual questions.",
    inputSchema: z.object({
      query: z.string().describe("What the user wants to know"),
    }),
    execute: async ({ query }) => {
      const hits = searchKnowledge(query);
      return {
        hits: hits.map((hit) => ({
          id: hit.id,
          title: hit.title,
          body: hit.body,
        })),
      };
    },
  }),

  prepare_swap_intent: tool({
    description:
      "Prepare a draft $LOFI swap intent for the user to review and confirm. Does not execute a swap.",
    inputSchema: z.object({
      fromAsset: z
        .enum(["SUI", "USDC"])
        .default("SUI")
        .describe("Asset the user wants to spend"),
      amount: z
        .string()
        .describe("Human amount as a string, e.g. '10' — never invent market rates"),
      note: z
        .string()
        .optional()
        .describe("Optional caution for the user, e.g. check slippage"),
    }),
    execute: async ({ fromAsset, amount, note }) => {
      return {
        status: "awaiting_user_confirmation" as const,
        kind: "swap" as const,
        fromAsset,
        amount,
        toAsset: LOFI_TOKEN.symbol,
        toType: LOFI_TOKEN.type,
        suggestedVenue: "Aftermath Finance or another Sui DEX",
        venueUrl: "https://aftermath.finance/",
        disclaimer:
          "Draft only. lofridef never executes swaps or holds keys. Confirm in your own wallet.",
        note:
          note ??
          "Check the token type carefully and set slippage thoughtfully in volatile markets.",
      };
    },
  }),

  prepare_donate_intent: tool({
    description:
      "Prepare a draft donation intent to the Lofi Foundation clean-water fund for user confirmation.",
    inputSchema: z.object({
      asset: z.enum(["SUI", "USDC"]).default("SUI"),
      amount: z.string().describe("Donation amount as a string, e.g. '5'"),
      memo: z
        .string()
        .optional()
        .describe("Optional note like 'Benin well' or 'Indonesia'"),
    }),
    execute: async ({ asset, amount, memo }) => {
      return {
        status: "awaiting_user_confirmation" as const,
        kind: "donate" as const,
        asset,
        amount,
        recipient: FOUNDATION_DONATION.address,
        dashboard: FOUNDATION_DONATION.dashboard,
        memo: memo ?? "Lofi Foundation clean water",
        disclaimer:
          "Draft only. Verify the address on donate.lofifoundation.com before sending.",
      };
    },
  }),

  issue_first_ride_badge: tool({
    description:
      "Issue a First Ride referral badge that records which ambassador onboarded this newcomer.",
    inputSchema: z.object({
      ambassadorCode: z
        .string()
        .describe("Ambassador handle or referral code, e.g. yeti-lakshay"),
      newcomerLabel: z
        .string()
        .optional()
        .describe("Optional display name for the newcomer"),
      firstAction: z
        .enum(["learned", "swap_prepared", "donation_prepared", "wallet_created"])
        .describe("The first action completed in this session"),
    }),
    execute: async ({ ambassadorCode, newcomerLabel, firstAction }) => {
      const badge = createReferralBadge({
        ambassadorCode,
        newcomerLabel,
        firstAction,
      });
      return {
        status: "issued" as const,
        badge,
        movePackageHint:
          "See move/lofridef for the on-chain AmbassadorBadge module. Demo mode stores badges locally until package deploy.",
      };
    },
  }),
} satisfies ToolSet;

export type LofridefTools = InferUITools<typeof lofridefTools>;
export type LofridefMessage = UIMessage<never, UIDataTypes, LofridefTools>;
