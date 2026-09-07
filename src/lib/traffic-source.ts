/** Tên nguồn truy cập, ví dụ: TikTok, Facebook, Google, Truy cập trực tiếp... */
export type TrafficSource = string;

const PATTERNS: [RegExp, string][] = [
  [/tiktok|musical_ly|bytedance|douyin/, "TikTok"],
  [/facebook|fb\.|fban|fbav|fbios/, "Facebook"],
  [/messenger/, "Messenger"],
  [/instagram/, "Instagram"],
  [/threads/, "Threads"],
  [/zalo/, "Zalo"],
  [/youtube|youtu\.be/, "YouTube"],
  [/telegram/, "Telegram"],
  [/twitter|x\.com/, "X (Twitter)"],
  [/google/, "Google"],
  [/bing/, "Bing"],
  [/reddit/, "Reddit"],
  [/pinterest/, "Pinterest"],
];

/**
 * Xác định rõ người đọc đến từ đâu (TikTok, Facebook, Google, tên website khác,
 * hoặc truy cập trực tiếp) và ghi nhớ trong phiên đọc.
 */
export function getTrafficSource(): TrafficSource {
  if (typeof window === "undefined") return "Không xác định";

  const KEY = "mochi-source";
  const saved = sessionStorage.getItem(KEY);
  if (saved) return saved;

  const params = new URLSearchParams(window.location.search);
  const utm = (params.get("utm_source") ?? params.get("source") ?? "").trim();
  const referrer = document.referrer ?? "";
  const hint = `${utm} ${referrer} ${navigator.userAgent}`.toLowerCase();

  let source = "";
  for (const [pattern, name] of PATTERNS) {
    if (pattern.test(hint)) {
      source = name;
      break;
    }
  }

  if (!source && utm) source = utm;

  if (!source && referrer) {
    try {
      const host = new URL(referrer).hostname.replace(/^www\./, "");
      if (host && host !== window.location.hostname) source = host;
    } catch {
      // referrer không hợp lệ, bỏ qua
    }
  }

  if (!source) source = "Truy cập trực tiếp";

  sessionStorage.setItem(KEY, source);
  return source;
}
