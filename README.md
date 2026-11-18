# lofridef

**Your first ride into Lofi on Sui.**

lofridef is an AI onboarding guide built for **CLAY Hackathon III** (AI product track). It helps complete beginners learn Lofi, prepare a first `$LOFI` swap or clean-water donation, and attribute that first action to an ambassador with a **First Ride** badge.

## Why it exists

Lofi’s public how-to-buy flow is still multi-step and wallet-heavy. Ambassadors bring people to Sui, but attribution is hard to measure. lofridef turns that into a guided first ride:

1. Ask anything in your own language
2. Get grounded answers from a Lofi/Sui knowledge pack
3. Confirm a prepared swap or donation intent (lofridef never holds keys)
4. Mint / record a First Ride badge for the ambassador who invited you

## Stack

- Next.js App Router + TypeScript
- Vercel AI SDK (`streamText`, tools, `useChat`)
- Demo mode without an API key; live mode with `AI_GATEWAY_API_KEY`
- Move module for on-chain `FirstRideBadge` objects

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) or add a referral:

```text
http://localhost:3000?ref=your-ambassador-handle
```

### Live AI mode

Copy `.env.example` to `.env.local` and set:

```bash
AI_GATEWAY_API_KEY=...
LOFRIDEF_MODEL=openai/gpt-4o-mini
```

Without a gateway key, the chat still works using grounded demo replies and local badge issuance.

## Tools the guide can call

| Tool | Purpose |
| --- | --- |
| `search_knowledge` | Ground answers in Lofi/Sui facts |
| `prepare_swap_intent` | Draft a `$LOFI` swap for user confirmation |
| `prepare_donate_intent` | Draft a Foundation donation for user confirmation |
| `issue_first_ride_badge` | Attribute the newcomer’s first action to an ambassador |

## Move package

See [`move/lofridef`](./move/lofridef):

- Shared `BadgeRegistry`
- Non-transferable `FirstRideBadge` objects
- `BadgeIssued` events for analytics

Deploy with the Sui CLI when ready, then replace the demo badge store with package calls + sponsored transactions / zkLogin.

## Hackathon submission checklist

- [x] Project title: **lofridef**
- [x] Public GitHub repository
- [ ] Demo video (3–5 min)
- [ ] Live website
- [ ] Package ID after Move deploy
- [ ] Square logo

## Safety

- No price predictions or investment advice
- No seed phrases / private keys
- All money moves require explicit user confirmation
- Official donation address is only surfaced from known Lofi Foundation sources

## License

MIT
