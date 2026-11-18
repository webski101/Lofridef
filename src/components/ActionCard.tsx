type SwapIntent = {
  kind: "swap";
  fromAsset: string;
  amount: string;
  toAsset: string;
  toType: string;
  suggestedVenue: string;
  venueUrl: string;
  disclaimer: string;
  note?: string;
};

type DonateIntent = {
  kind: "donate";
  asset: string;
  amount: string;
  recipient: string;
  dashboard: string;
  memo: string;
  disclaimer: string;
};

type BadgeIntent = {
  status: string;
  badge: {
    id: string;
    ambassadorCode: string;
    newcomerLabel: string;
    firstAction: string;
    issuedAt: string;
    chain: string;
  };
};

export function SwapCard({ data }: { data: SwapIntent }) {
  return (
    <div className="action-card action-card-swap">
      <div className="action-card-label">Swap draft</div>
      <h3>
        {data.amount} {data.fromAsset} → {data.toAsset}
      </h3>
      <p className="mono">{data.toType}</p>
      <p>{data.note}</p>
      <p className="muted">{data.disclaimer}</p>
      <a className="action-link" href={data.venueUrl} target="_blank" rel="noreferrer">
        Open {data.suggestedVenue}
      </a>
    </div>
  );
}

export function DonateCard({ data }: { data: DonateIntent }) {
  return (
    <div className="action-card action-card-donate">
      <div className="action-card-label">Donation draft</div>
      <h3>
        {data.amount} {data.asset}
      </h3>
      <p>{data.memo}</p>
      <p className="mono">{data.recipient}</p>
      <p className="muted">{data.disclaimer}</p>
      <a className="action-link" href={data.dashboard} target="_blank" rel="noreferrer">
        Verify on donation dashboard
      </a>
    </div>
  );
}

export function BadgeCard({ data }: { data: BadgeIntent }) {
  const badge = data.badge;
  return (
    <div className="action-card action-card-badge">
      <div className="action-card-label">First Ride badge</div>
      <h3>{badge.id}</h3>
      <p>
        Ambassador <strong>@{badge.ambassadorCode}</strong> · {badge.firstAction}
      </p>
      <p className="muted">
        Issued {new Date(badge.issuedAt).toLocaleString("en-NG", { timeZone: "Africa/Lagos" })}{" "}
        (Africa/Lagos) · {badge.chain}
      </p>
    </div>
  );
}
