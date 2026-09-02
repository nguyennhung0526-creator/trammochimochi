import type { LinkProps } from "@tanstack/react-router";

import cover1 from "@/assets/cover-1.jpg";
import { mayTanTroiLaiSang } from "./story-may-tan";

export type Chapter = {
  index: number;
  title: string;
  paragraphs: string[];
};

export type Story = {
  slug: string;
  title: string;
  author?: string;
  translator?: string;
  status: "Hoàn Thành" | "Đang ra" | "Chờ full";
  views: number;
  cover: string;
  tags: string[];
  summary: string;
  chapters: Chapter[];
  hot?: boolean;
  shopeeUrl?: string;
  totalChapters?: number;
};

export async function fetchStoriesFromSheets(): Promise<Story[]> {
  try {
    const sheetId = "1Z6b0hFDR0NgzDA-rPg9LibyK9xzEm_uclp27DI322j4";
    const gvizUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;

    const res = await fetch(gvizUrl);
    if (!res.ok) throw new Error(`Sheets HTTP ${res.status}`);
    const text = await res.text();
    const jsonString = text.substring(47, text.length - 2);
    const data = JSON.parse(jsonString);

    const rows = data.table.rows;
    const storiesMap: { [key: string]: Story } = {};

    rows.forEach((row: any) => {
      const slug = row.c[0]?.v || "";
      if (!slug) return;

      // SỬA TẠI ĐÂY: Bỏ fallback cứng "Mây Tan Trời Lại Sáng" để tránh bị đè tên truyện khác
      const title = row.c[1]?.v || slug; 
      const author = row.c[2]?.v || "";
      const status = (row.c[3]?.v || "Hoàn Thành") as Story["status"];
      const tags = row.c[4]?.v ? String(row.c[4].v).split(",").map(t => t.trim()) : ["Ngôn Tình"];
      const summary = row.c[5]?.v || "";
      const shopeeUrl = row.c[6]?.v || "";
      const totalChaptersRaw = row.c[7]?.v;
      const chapterIndex = Number(row.c[8]?.v || 1);
      const chapterContent = row.c[9]?.v || "";
      const coverUrl = String(row.c[10]?.v || "").trim();
      const viewsRaw = row.c[11]?.v;

      if (!storiesMap[slug]) {
        storiesMap[slug] = {
          slug,
          title,
          author,
          status,
          views: 0,
          cover: coverUrl || cover1,
          tags,
          summary,
          shopeeUrl,
          chapters: []
        };
      }

      if (shopeeUrl) storiesMap[slug].shopeeUrl = shopeeUrl;
      if (coverUrl) storiesMap[slug].cover = coverUrl;
      
      if (viewsRaw !== undefined && viewsRaw !== null && String(viewsRaw) !== "") {
        const v = Number(String(viewsRaw).replace(/[^\d]/g, ""));
        if (!Number.isNaN(v) && v > 0) storiesMap[slug].views = v;
      }
      
      if (totalChaptersRaw !== undefined && totalChaptersRaw !== null && String(totalChaptersRaw) !== "") {
        const t = Number(String(totalChaptersRaw).replace(/[^\d]/g, ""));
        if (!Number.isNaN(t) && t > 0) storiesMap[slug].totalChapters = t;
      }

      const paragraphs = String(chapterContent)
        .split("\n")
        .map(p => p.trim())
        .filter(p => p.length > 0);

      const existingChapter = storiesMap[slug].chapters.find(c => c.index === chapterIndex);
      if (existingChapter) {
        existingChapter.paragraphs.push(...paragraphs);
      } else {
        storiesMap[slug].chapters.push({
          index: chapterIndex,
          title: `Chương ${chapterIndex}`,
          paragraphs
        });
      }
    });

    const result = Object.values(storiesMap);
    return result.length > 0 ? result : stories;
  } catch (error) {
    console.error("Lỗi tải Google Sheets:", error);
    return stories;
  }
}

export const stories: Story[] = [mayTanTroiLaiSang];

export const navItems: { label: string; link: LinkProps }[] = [
  { label: "Trang chủ", link: { to: "/" } },
  { label: "Ngôn Tình", link: { to: "/the-loai/$ten", params: { ten: "ngon-tinh" } } },
  { label: "Truyện hoàn thành", link: { to: "/danh-sach/$loai", params: { loai: "hoan-thanh" } } },
  { label: "Truyện chờ full", link: { to: "/danh-sach/$loai", params: { loai: "cho-full" } } },
  { label: "Truyện hot", link: { to: "/danh-sach/$loai", params: { loai: "hot" } } },
  { label: "Thể loại", link: { to: "/the-loai" } },
];

