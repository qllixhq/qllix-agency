/**
 * Safe number, string and currency formatters to prevent client-side runtime crashes.
 * Guaranteed never to throw TypeError on null, undefined, or unexpected types.
 */

export function safeNumber(val: unknown, fallback: number = 0): number {
  if (typeof val === "number" && !isNaN(val) && isFinite(val)) {
    return val;
  }
  if (typeof val === "string") {
    const cleaned = val.replace(/[^\d.-]/g, "");
    if (cleaned.length > 0) {
      const parsed = parseFloat(cleaned);
      if (!isNaN(parsed) && isFinite(parsed)) return parsed;
    }
  }
  return fallback;
}

export function formatBdt(val: unknown, fallback: number = 0): string {
  const num = safeNumber(val, fallback);
  return num.toLocaleString();
}

export function safeArray<T>(val: unknown): T[] {
  if (Array.isArray(val)) return val;
  return [];
}
