"use client";

import { useSearchParams } from "next/navigation";
import { GuideChat } from "@/components/GuideChat";
import { Hero } from "@/components/Hero";
import { ReferralBoard } from "@/components/ReferralBoard";
import { BRAND, LINKS } from "@/lib/constants";
import { normalizeReferralCode } from "@/lib/referral-code";

export function AppShell() {
  const searchParams = useSearchParams();
  const referralCode = normalizeReferralCode(
    searchParams.get("ref") ?? searchParams.get("referral"),
  );

  return (
    <main className="page">
      <Hero referralCode={referralCode} />
      <GuideChat referralCode={referralCode} />

      <section className="howto">
        <div>
          <p className="eyebrow">We are all Lofi</p>
          <h2>From zero to first ride</h2>
        </div>
        <ol>
          <li>Ask lofridef anything about Lofi, Sui wallets, swaps, or the water fund.</li>
          <li>When you are ready, it prepares a swap or donation intent — you confirm, it never holds keys.</li>
          <li>
            Finish a first action with an ambassador code to mint a First Ride badge (demo store now,
            Move module ready to deploy).
          </li>
          <li>
            Build in public for CLAY Hackathon III and point judges at the live demo + GitHub.
          </li>
        </ol>
        <p>
          Official Lofi: <a href={LINKS.lofi}>{LINKS.lofi}</a> · Hackathon:{" "}
          <a href={LINKS.hackathon}>{LINKS.hackathon}</a>
        </p>
      </section>

      <ReferralBoard />

      <footer className="site-footer">
        <span>
          {BRAND.name} · built for CLAY Hackathon III · Sui
        </span>
        <span>No investment advice. Drafts only. Confirm every transfer yourself.</span>
      </footer>
    </main>
  );
}
