import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SHEET_ID = "1Z6b0hFDR0NgzDA-rPg9LibyK9xzEm_uclp27DI322j4";
const SHEET_NAME = "Trang tính1";
const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_sheets/v4";

function headers() {
  const lovableKey = process.env["LOVABLE_API_KEY"];
  const connKey = process.env["GOOGLE_SHEETS_API_KEY"];
  if (!lovableKey || !connKey) throw new Error("Thiếu cấu hình kết nối Google Sheets");
  return {
    Authorization: `Bearer ${lovableKey}`,
    "X-Connection-Api-Key": connKey,
    "Content-Type": "application/json",
  };
}

async function callSheets(path: string, init?: RequestInit) {
  const res = await fetch(`${GATEWAY_URL}${path}`, { ...init, headers: headers() });
  if (!res.ok) {
    const body = await res.text();
    console.error(`Google Sheets request failed [${res.status}]: ${body}`);
    throw new Error(`Google Sheets request failed [${res.status}]: ${body}`);
  }
  return res.json();
}

function toNumber(value: unknown) {
  return Number(String(value ?? "").replace(/[^\d]/g, "")) || 0;
}

/** Ngày hiện tại theo giờ Việt Nam (UTC+7), dạng YYYY-MM-DD */
function todayVN() {
  const now = new Date(Date.now() + 7 * 60 * 60 * 1000);
  return now.toISOString().slice(0, 10);
}

/**
 * Ghi nhận một lần tương tác vào Google Sheets.
 * Cột M = tổng lượt xem, N = lượt đọc trong ngày, O = click Shopee trong ngày, P = ngày của số liệu.
 */
async function bumpCounters(slug: string, kind: "view" | "click") {
  const range = `${SHEET_NAME}!B2:P1000`;
  const sheet = await callSheets(`/spreadsheets/${SHEET_ID}/values/${range}`);
  const rows: string[][] = sheet.values ?? [];

  const rowOffset = rows.findIndex((r) => (r?.[0] ?? "").trim() === slug);
  if (rowOffset === -1) throw new Error(`Không tìm thấy truyện "${slug}" trong Google Sheets`);

  const row = rows[rowOffset] ?? [];
  const today = todayVN();
  const sameDay = String(row[14] ?? "").trim().slice(0, 10) === today;

  const totalViews = toNumber(row[11]) + (kind === "view" ? 1 : 0);
  const baseViewsToday = sameDay ? toNumber(row[12]) : 0;
  const baseClicksToday = sameDay ? toNumber(row[13]) : 0;
  const viewsToday = baseViewsToday + (kind === "view" ? 1 : 0);
  const clicksToday = baseClicksToday + (kind === "click" ? 1 : 0);
  const title = String(row[1] ?? "").trim() || slug;

  const cells = `${SHEET_NAME}!M${rowOffset + 2}:P${rowOffset + 2}`;
  await callSheets(`/spreadsheets/${SHEET_ID}/values/${cells}?valueInputOption=USER_ENTERED`, {
    method: "PUT",
    body: JSON.stringify({
      range: cells,
      majorDimension: "ROWS",
      values: [[totalViews, viewsToday, clicksToday, today]],
    }),
  });

  return { views: totalViews, viewsToday, clicksToday, title };
}

const DAILY_SHEET = "ThongKeNgay";

/**
 * Ghi nhận số liệu theo từng ngày vào trang tính ThongKeNgay.
 * Mẫu trình bày: mỗi ngày chỉ một ô ngày (các dòng cùng ngày bên dưới để trống),
 * mỗi dòng là một truyện. Nguồn gộp trong một ô, dạng "TikTok: 2; Facebook: 1".
 * A ngay | B ten_truyen | C luot_doc | D click_shopee | E nguon | F cap_nhat_luc | G slug
 */
function mergeSource(existing: string, source: string) {
  const map = new Map<string, number>();
  for (const part of existing.split(";")) {
    const m = part.trim().match(/^(.*):\s*(\d+)$/);
    if (m) map.set(m[1]!.trim(), Number(m[2]));
  }
  map.set(source, (map.get(source) ?? 0) + 1);
  return [...map.entries()].map(([name, count]) => `${name}: ${count}`).join("; ");
}

async function bumpDaily(slug: string, title: string, kind: "view" | "click", source: string) {
  const today = todayVN();
  const range = `${DAILY_SHEET}!A2:G5000`;
  const sheet = await callSheets(`/spreadsheets/${SHEET_ID}/values/${range}`);
  const rows: string[][] = sheet.values ?? [];

  // Ô ngày chỉ ghi ở dòng đầu mỗi ngày, nên phải lần theo ngày gần nhất phía trên
  let lastDate = "";
  let offset = -1;
  let hasToday = false;
  rows.forEach((r, i) => {
    const cellDate = String(r?.[0] ?? "").trim().slice(0, 10);
    if (cellDate) lastDate = cellDate;
    if (lastDate !== today) return;
    hasToday = true;
    const rowSlug = String(r?.[6] ?? "").trim();
    const rowTitle = String(r?.[1] ?? "").trim();
    if (offset === -1 && (rowSlug === slug || (!rowSlug && rowTitle === title))) offset = i;
  });

  const existing = offset === -1 ? [] : (rows[offset] ?? []);
  const rowNumber = offset === -1 ? rows.length + 2 : offset + 2;
  const now = new Date(Date.now() + 7 * 60 * 60 * 1000).toISOString().slice(11, 16);

  const values = [
    offset === -1 ? (hasToday ? "" : today) : (existing[0] ?? ""),
    existing[1] || title,
    toNumber(existing[2]) + (kind === "view" ? 1 : 0),
    toNumber(existing[3]) + (kind === "click" ? 1 : 0),
    mergeSource(String(existing[4] ?? ""), source),
    now,
    existing[6] || slug,
  ];

  const cells = `${DAILY_SHEET}!A${rowNumber}:G${rowNumber}`;
  await callSheets(`/spreadsheets/${SHEET_ID}/values/${cells}?valueInputOption=USER_ENTERED`, {
    method: "PUT",
    body: JSON.stringify({ range: cells, majorDimension: "ROWS", values: [values] }),
  });
}

const inputSchema = z.object({
  slug: z.string().min(1).max(200),
  source: z.string().min(1).max(80).optional(),
});

/** Tăng lượt xem thật của truyện, trả về tổng lượt xem mới. */
export const trackStoryView = createServerFn({ method: "POST" })
  .inputValidator((data) => inputSchema.parse(data))
  .handler(async ({ data }): Promise<{ views: number }> => {
    const result = await bumpCounters(data.slug, "view");
    await bumpDaily(data.slug, result.title, "view", data.source ?? "Không xác định").catch((e) =>
      console.error("Không ghi được thống kê ngày:", e),
    );
    return { views: result.views };
  });

/** Ghi nhận một lần click vào liên kết Shopee trong ngày. */
export const trackShopeeClick = createServerFn({ method: "POST" })
  .inputValidator((data) => inputSchema.parse(data))
  .handler(async ({ data }): Promise<{ clicksToday: number }> => {
    const result = await bumpCounters(data.slug, "click");
    await bumpDaily(data.slug, result.title, "click", data.source ?? "Không xác định").catch((e) =>
      console.error("Không ghi được thống kê ngày:", e),
    );
    return { clicksToday: result.clicksToday };
  });

