import { Suspense } from "react";
import { AppShell } from "@/components/AppShell";

function ShellFallback() {
  return (
    <main className="page">
      <div className="hero">
        <div className="hero-media" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/lofi-hero.jpg" alt="" />
          <div className="hero-shade" />
        </div>
        <div className="hero-copy">
          <p className="brand-mark">lofridef</p>
          <h1>Your first ride into Lofi on Sui</h1>
          <p className="lede">Loading the Flurry guide…</p>
        </div>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<ShellFallback />}>
      <AppShell />
    </Suspense>
  );
}
