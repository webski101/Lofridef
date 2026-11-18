export function normalizeReferralCode(raw?: string | null) {
  if (!raw) return "";
  return raw.trim().replace(/^@/, "").slice(0, 48);
}
