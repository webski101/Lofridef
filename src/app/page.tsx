import { Suspense } from "react";
import { AppShell } from "@/components/AppShell";

function ShellFallback() {
  return (
    <main className="page">
      <div className="hero">
        <div className="hero-copy">
          <p className="brand-mark">lofridef</p>
          <h1>Your first ride into Lofi on Sui</h1>
          <p className="lede">Loading guide…</p>
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
