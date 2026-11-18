import { BRAND } from "@/lib/constants";

export function Hero({ referralCode }: { referralCode: string }) {
  return (
    <header className="hero">
      <div className="hero-glow" aria-hidden />
      <div className="hero-frost" aria-hidden />
      <nav className="topnav">
        <a className="brand" href="/">
          {BRAND.name}
        </a>
        <div className="topnav-links">
          <a href="#guide">Guide</a>
          <a href="#badges">Badges</a>
          <a href="https://www.lofitheyeti.com/" target="_blank" rel="noreferrer">
            Lofi
          </a>
        </div>
      </nav>

      <div className="hero-copy">
        <p className="brand-mark">{BRAND.name}</p>
        <h1>{BRAND.tagline}</h1>
        <p className="lede">{BRAND.description}</p>
        <div className="cta-row">
          <a className="cta primary" href="#guide">
            Start your first ride
          </a>
          <a
            className="cta ghost"
            href="https://donate.lofifoundation.com/"
            target="_blank"
            rel="noreferrer"
          >
            Clean water fund
          </a>
        </div>
        {referralCode ? (
          <p className="ref-note">
            Invited by <strong>@{referralCode}</strong>
          </p>
        ) : null}
      </div>

      <div className="hero-visual" aria-hidden>
        <div className="yeti-silhouette">
          <span className="yeti-eye" />
          <span className="yeti-eye" />
        </div>
        <div className="aurora" />
      </div>
    </header>
  );
}
