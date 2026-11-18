"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { FormEvent, useMemo, useState } from "react";
import { STARTER_PROMPTS } from "@/lib/constants";
import { BadgeCard, DonateCard, SwapCard } from "./ActionCard";

type GuideChatProps = {
  referralCode: string;
};

export function GuideChat({ referralCode }: GuideChatProps) {
  const [input, setInput] = useState("");
  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        body: { referralCode },
      }),
    [referralCode],
  );

  const { messages, sendMessage, status, error } = useChat({ transport });
  const busy = status === "submitted" || status === "streaming";

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    await sendMessage({ text });
  }

  return (
    <section className="guide-shell" id="guide">
      <div className="guide-meta">
        <p className="eyebrow">Live guide</p>
        <h2>Ask lofridef</h2>
        <p>
          Learn Lofi, draft a first swap or donation, and attribute your ride to an ambassador.
          {referralCode ? (
            <>
              {" "}
              Referral locked: <span className="chip">@{referralCode}</span>
            </>
          ) : (
            <> Add <code>?ref=handle</code> to track who brought you.</>
          )}
        </p>
      </div>

      <div className="prompt-row">
        {STARTER_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            type="button"
            className="prompt-chip"
            disabled={busy}
            onClick={() => sendMessage({ text: prompt })}
          >
            {prompt}
          </button>
        ))}
      </div>

      <div className="chat-panel">
        {messages.length === 0 && (
          <div className="empty-state">
            <p>Ice thawing… ask anything about getting started with Lofi on Sui.</p>
          </div>
        )}

        {messages.map((message) => (
          <div key={message.id} className={`bubble bubble-${message.role}`}>
            <div className="bubble-role">{message.role === "user" ? "You" : "lofridef"}</div>
            {message.parts.map((part, index) => {
              if (part.type === "text" && part.text) {
                return (
                  <div key={`${message.id}-text-${index}`} className="bubble-text">
                    {part.text}
                  </div>
                );
              }

              if (part.type === "tool-prepare_swap_intent" && part.state === "output-available") {
                return <SwapCard key={`${message.id}-swap-${index}`} data={part.output as never} />;
              }

              if (part.type === "tool-prepare_donate_intent" && part.state === "output-available") {
                return (
                  <DonateCard key={`${message.id}-donate-${index}`} data={part.output as never} />
                );
              }

              if (part.type === "tool-issue_first_ride_badge" && part.state === "output-available") {
                return (
                  <BadgeCard key={`${message.id}-badge-${index}`} data={part.output as never} />
                );
              }

              if (part.type === "tool-search_knowledge" && part.state === "output-available") {
                const output = part.output as { hits?: Array<{ title: string; body: string }> };
                return (
                  <div key={`${message.id}-know-${index}`} className="knowledge-hits">
                    {(output.hits ?? []).map((hit) => (
                      <div key={hit.title} className="knowledge-hit">
                        <strong>{hit.title}</strong>
                        <span>{hit.body}</span>
                      </div>
                    ))}
                  </div>
                );
              }

              return null;
            })}
          </div>
        ))}

        {busy && <div className="typing">lofridef is thinking…</div>}
        {error && <div className="error-banner">{error.message}</div>}
      </div>

      <form className="composer" onSubmit={onSubmit}>
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask about Lofi, swaps, wells, or referrals…"
          disabled={busy}
          aria-label="Message lofridef"
        />
        <button type="submit" disabled={busy || !input.trim()}>
          Ride
        </button>
      </form>
    </section>
  );
}
