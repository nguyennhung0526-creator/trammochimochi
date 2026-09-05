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

/** Tăng lượt xem thật của truyện, trả về tổng lượt xem mới. */
export const trackStoryView = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({ slug: z.string().min(1).max(200) }).parse(data))
  .handler(async ({ data }): Promise<{ views: number }> => {
    const result = await bumpCounters(data.slug, "view");
    return { views: result.views };
  });

/** Ghi nhận một lần click vào liên kết Shopee trong ngày. */
export const trackShopeeClick = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({ slug: z.string().min(1).max(200) }).parse(data))
  .handler(async ({ data }): Promise<{ clicksToday: number }> => {
    const result = await bumpCounters(data.slug, "click");
    return { clicksToday: result.clicksToday };
  });
