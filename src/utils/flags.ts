export function iso2ToEmoji(code: string): string {
  if (!code || code.length !== 2) return "🏳️";
  const base = 0x1f1e6;
  const A = "A".charCodeAt(0);
  const c0 = code[0].toUpperCase().charCodeAt(0) - A + base;
  const c1 = code[1].toUpperCase().charCodeAt(0) - A + base;
  return String.fromCodePoint(c0) + String.fromCodePoint(c1);
}

export function latencyColor(ms: number): string {
  if (ms < 60) return "text-green-400";
  if (ms < 120) return "text-yellow-400";
  return "text-red-400";
}
