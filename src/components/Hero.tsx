import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/lib/constants";

export function Hero({ referralCode }: { referralCode: string }) {
  return (
    <header className="hero">
      <div className="hero-media" aria-hidden>
        <Image
          src="/lofi-hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
        />
        <div className="hero-shade" />
      </div>

      <nav className="topnav">
        <Link className="brand" href="/">
          <Image src="/lofi-logo.png" alt="Lofi" width={42} height={42} />
          {BRAND.name}
        </Link>
        <div className="topnav-links">
          <a href="#guide">Guide</a>
          <a href="#badges">Badges</a>
          <a href="https://www.lofitheyeti.com/" target="_blank" rel="noreferrer">
            Flurry
          </a>
        </div>
      </nav>

      <div className="hero-copy">
        <span className="flurry-tag">For the Flurry · CLAY III</span>
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
    </header>
  );
}
