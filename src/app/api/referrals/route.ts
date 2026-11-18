import { listBadges } from "@/lib/referrals";

export async function GET() {
  const badges = await listBadges();
  return Response.json({
    count: badges.length,
    badges: badges.slice(0, 50),
  });
}
