"use client";

import { useEffect, useState } from "react";

type Badge = {
  id: string;
  ambassadorCode: string;
  newcomerLabel: string;
  firstAction: string;
  issuedAt: string;
  chain: string;
};

export function ReferralBoard() {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let alive = true;
    async function load() {
      try {
        const res = await fetch("/api/referrals", { cache: "no-store" });
        const data = await res.json();
        if (!alive) return;
        setBadges(data.badges ?? []);
        setCount(data.count ?? 0);
      } catch {
        // ignore transient fetch errors in UI
      }
    }
    load();
    const id = window.setInterval(load, 30000);
    return () => {
      alive = false;
      window.clearInterval(id);
    };
  }, []);

  return (
    <section className="badge-board" id="badges">
      <div className="section-head">
        <p className="eyebrow">Ambassador attribution</p>
        <h2>First Ride badges</h2>
        <p>
          Each successful first action can mint a badge that records who brought the newcomer in.
          Live count: <strong>{count}</strong>
        </p>
      </div>

      <div className="badge-grid">
        {badges.length === 0 && (
          <div className="empty-state">No badges yet — complete a first action in the guide.</div>
        )}
        {badges.map((badge) => (
          <article key={badge.id} className="badge-tile">
            <div className="badge-id">{badge.id}</div>
            <h3>@{badge.ambassadorCode}</h3>
            <p>
              {badge.newcomerLabel} · {badge.firstAction.replaceAll("_", " ")}
            </p>
            <time dateTime={badge.issuedAt}>
              {new Date(badge.issuedAt).toLocaleString("en-NG", { timeZone: "Africa/Lagos" })}{" "}
              Africa/Lagos
            </time>
          </article>
        ))}
      </div>
    </section>
  );
}
