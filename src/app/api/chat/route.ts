import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  stepCountIs,
  streamText,
} from "ai";
import { buildDemoAssistantText } from "@/lib/demo-reply";
import { normalizeReferralCode } from "@/lib/referral-code";
import { buildSystemPrompt } from "@/lib/system-prompt";
import { lofridefTools, type LofridefMessage } from "@/lib/tools";

export const maxDuration = 60;

function hasGateway() {
  return Boolean(
    process.env.AI_GATEWAY_API_KEY ||
      process.env.VERCEL_OIDC_TOKEN ||
      process.env.OPENAI_API_KEY,
  );
}

export async function POST(req: Request) {
  const body = await req.json();
  const messages = (body.messages ?? []) as LofridefMessage[];
  const referralCode = normalizeReferralCode(
    body.referralCode ?? req.headers.get("x-lofridef-ref"),
  );

  if (!hasGateway()) {
    const text = await buildDemoAssistantText(messages, referralCode);
    const stream = createUIMessageStream({
      execute: ({ writer }) => {
        const id = `msg_${Date.now()}`;
        writer.write({ type: "start", messageId: id });
        writer.write({ type: "text-start", id: `${id}-text` });
        writer.write({ type: "text-delta", id: `${id}-text`, delta: text });
        writer.write({ type: "text-end", id: `${id}-text` });
        writer.write({ type: "finish" });
      },
    });
    return createUIMessageStreamResponse({ stream });
  }

  const result = streamText({
    model: process.env.LOFRIDEF_MODEL || "openai/gpt-4o-mini",
    system: buildSystemPrompt(referralCode),
    messages: await convertToModelMessages(messages),
    tools: lofridefTools,
    stopWhen: stepCountIs(6),
  });

  return result.toUIMessageStreamResponse();
}
