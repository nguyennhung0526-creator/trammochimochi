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

/** Tăng lượt xem thật của truyện (cột M) trong Google Sheets, trả về tổng lượt xem mới. */
export const trackStoryView = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({ slug: z.string().min(1).max(200) }).parse(data))
  .handler(async ({ data }): Promise<{ views: number }> => {
    const range = `${SHEET_NAME}!B2:M1000`;
    const sheet = await callSheets(`/spreadsheets/${SHEET_ID}/values/${range}`);
    const rows: string[][] = sheet.values ?? [];

    // Dòng đầu tiên của truyện là dòng giữ lượt xem (cột B = slug, cột M = views)
    const rowOffset = rows.findIndex((r) => (r?.[0] ?? "").trim() === data.slug);
    if (rowOffset === -1) throw new Error(`Không tìm thấy truyện "${data.slug}" trong Google Sheets`);

    const current = Number(String(rows[rowOffset]?.[11] ?? "").replace(/[^\d]/g, "")) || 0;
    const views = current + 1;
    const cell = `${SHEET_NAME}!M${rowOffset + 2}`;

    await callSheets(`/spreadsheets/${SHEET_ID}/values/${cell}?valueInputOption=RAW`, {
      method: "PUT",
      body: JSON.stringify({ range: cell, majorDimension: "ROWS", values: [[views]] }),
    });

    return { views };
  });
