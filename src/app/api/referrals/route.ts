import { connection } from "next/server";
import { listBadges } from "@/lib/referrals";

export async function GET() {
  await connection();
  const badges = await listBadges();
  return Response.json({
    count: badges.length,
    badges: badges.slice(0, 50),
  });
}
