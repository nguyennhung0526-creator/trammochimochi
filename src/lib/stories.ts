import type { LinkProps } from "@tanstack/react-router";

import cover1 from "@/assets/cover-1.jpg";
import cover2 from "@/assets/cover-2.jpg";
import cover3 from "@/assets/cover-3.jpg";
import cover4 from "@/assets/cover-4.jpg";

import { mayTanTroiLaiSang } from "./story-may-tan";

// Link Google Sheets Kho truyện Mochi của bạn
const GOOGLE_SHEETS_LINK = "https://docs.google.com/spreadsheets/d/1Z6b0hFDR0NgzDA-rPg9LibyK9xzEm_uclp27DI322j4/edit?usp=sharing";

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

      const title = row.c[1]?.v || "Mây Tan Trời Lại Sáng";
      const author = row.c[2]?.v || "";
      const status = (row.c[3]?.v || "Hoàn Thành") as Story["status"];
      const tags = row.c[4]?.v ? String(row.c[4].v).split(",").map(t => t.trim()) : ["Ngôn Tình", "Hiện Đại"];
      const summary = row.c[5]?.v || "";
      const shopeeUrl = row.c[6]?.v || "";
      const chapterIndex = Number(row.c[7]?.v || 1);
      const chapterContent = row.c[8]?.v || "";

      if (!storiesMap[slug]) {
        storiesMap[slug] = {
          slug,
          title,
          author,
          status,
          views: 20418,
          cover: cover1,
          tags,
          summary,
          shopeeUrl,
          chapters: []
        };
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

    return Object.values(storiesMap);
  } catch (error) {
    console.error("Lỗi tải Google Sheets:", error);
    return stories;
  }
}

export const stories: Story[] = [mayTanTroiLaiSang];

export const getStory = (slug: string) => stories.find((s) => s.slug === slug);

export const navItems: { label: string; link: LinkProps }[] = [
  { label: "Trang chủ", link: { to: "/" } },
  { label: "Ngôn Tình", link: { to: "/the-loai/$ten", params: { ten: "ngon-tinh" } } },
  { label: "Truyện hoàn thành", link: { to: "/danh-sach/$loai", params: { loai: "hoan-thanh" } } },
  { label: "Truyện chờ full", link: { to: "/danh-sach/$loai", params: { loai: "cho-full" } } },
  { label: "Truyện hot", link: { to: "/danh-sach/$loai", params: { loai: "hot" } } },
];
