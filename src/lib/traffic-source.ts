export type TrafficSource = "tiktok" | "facebook" | "khac";

/**
 * Xác định người đọc đến từ đâu (TikTok, Facebook hay nguồn khác),
 * dựa trên tham số utm/referrer lần đầu vào web và ghi nhớ trong phiên.
 */
export function getTrafficSource(): TrafficSource {
  if (typeof window === "undefined") return "khac";

  const KEY = "mochi-source";
  const saved = sessionStorage.getItem(KEY) as TrafficSource | null;
  if (saved) return saved;

  const params = new URLSearchParams(window.location.search);
  const hint = `${params.get("utm_source") ?? ""} ${params.get("source") ?? ""} ${
    document.referrer ?? ""
  } ${navigator.userAgent}`.toLowerCase();

  let source: TrafficSource = "khac";
  if (/tiktok|musical_ly|bytedance/.test(hint)) source = "tiktok";
  else if (/facebook|fb\.|fban|fbav|instagram|messenger/.test(hint)) source = "facebook";

  sessionStorage.setItem(KEY, source);
  return source;
}
