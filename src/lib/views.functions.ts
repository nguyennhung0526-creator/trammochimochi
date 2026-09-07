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

  const cells = `${SHEET_NAME}!M${rowOffset + 2}:P${rowOffset + 2}`;
  await callSheets(`/spreadsheets/${SHEET_ID}/values/${cells}?valueInputOption=USER_ENTERED`, {
    method: "PUT",
    body: JSON.stringify({
      range: cells,
      majorDimension: "ROWS",
      values: [[totalViews, viewsToday, clicksToday, today]],
    }),
  });

  return { views: totalViews, viewsToday, clicksToday };
}

const DAILY_SHEET = "ThongKeNgay";

/**
 * Ghi nhận số liệu theo từng ngày và từng nguồn vào trang tính ThongKeNgay:
 * A ngay | B slug | C ten_truyen | D nguon | E luot_doc | F click_shopee | G cap_nhat_luc
 */
async function bumpDaily(slug: string, kind: "view" | "click", source: string) {
  const today = todayVN();
  const range = `${DAILY_SHEET}!A2:G5000`;
  const sheet = await callSheets(`/spreadsheets/${SHEET_ID}/values/${range}`);
  const rows: string[][] = sheet.values ?? [];

  const offset = rows.findIndex(
    (r) =>
      String(r?.[0] ?? "").trim().slice(0, 10) === today &&
      String(r?.[1] ?? "").trim() === slug &&
      String(r?.[3] ?? "").trim().toLowerCase() === source.toLowerCase(),
  );
  const existing = offset === -1 ? [] : (rows[offset] ?? []);
  const rowNumber = offset === -1 ? rows.length + 2 : offset + 2;
  const now = new Date(Date.now() + 7 * 60 * 60 * 1000).toISOString().slice(11, 16);

  const values = [
    today,
    slug,
    existing[2] ?? "",
    source,
    toNumber(existing[4]) + (kind === "view" ? 1 : 0),
    toNumber(existing[5]) + (kind === "click" ? 1 : 0),
    now,
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
    await bumpDaily(data.slug, "view", data.source ?? "Không xác định").catch((e) =>
      console.error("Không ghi được thống kê ngày:", e),
    );
    return { views: result.views };
  });

/** Ghi nhận một lần click vào liên kết Shopee trong ngày. */
export const trackShopeeClick = createServerFn({ method: "POST" })
  .inputValidator((data) => inputSchema.parse(data))
  .handler(async ({ data }): Promise<{ clicksToday: number }> => {
    const result = await bumpCounters(data.slug, "click");
    await bumpDaily(data.slug, "click", data.source ?? "Không xác định").catch((e) =>
      console.error("Không ghi được thống kê ngày:", e),
    );
    return { clicksToday: result.clicksToday };
  });

