import { google } from "@ai-sdk/google";
import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  stepCountIs,
  streamText,
  type LanguageModel,
} from "ai";
import { buildDemoAssistantText } from "@/lib/demo-reply";
import { normalizeReferralCode } from "@/lib/referral-code";
import { buildSystemPrompt } from "@/lib/system-prompt";
import { lofridefTools, type LofridefMessage } from "@/lib/tools";

export const maxDuration = 60;

function hasLiveModel() {
  return Boolean(
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
      process.env.AI_GATEWAY_API_KEY ||
      process.env.VERCEL_OIDC_TOKEN ||
      process.env.OPENAI_API_KEY,
  );
}

function resolveModel(): LanguageModel {
  const configured = process.env.LOFRIDEF_MODEL?.trim();

  if (process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return google(configured || "gemini-3.8-flash");
  }

  // AI Gateway / OpenAI-compatible provider/model ids, e.g. openai/gpt-4o-mini
  return (configured || "openai/gpt-4o-mini") as LanguageModel;
}

export async function POST(req: Request) {
  const body = await req.json();
  const messages = (body.messages ?? []) as LofridefMessage[];
  const referralCode = normalizeReferralCode(
    body.referralCode ?? req.headers.get("x-lofridef-ref"),
  );

  if (!hasLiveModel()) {
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
    model: resolveModel(),
    system: buildSystemPrompt(referralCode),
    messages: await convertToModelMessages(messages),
    tools: lofridefTools,
    stopWhen: stepCountIs(6),
  });

  return result.toUIMessageStreamResponse();
}
