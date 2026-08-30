import type { LinkProps } from "@tanstack/react-router";

import cover1 from "@/assets/cover-1.jpg";
import cover2 from "@/assets/cover-2.jpg";
import cover3 from "@/assets/cover-3.jpg";
import cover4 from "@/assets/cover-4.jpg";

// Thay bằng link Google Sheets công khai của bạn
const GOOGLE_SHEETS_LINK = "https://docs.google.com/spreadsheets/d/1Z6b0hFDR0NgzDA-rPg9LibyK9xzEm_uclp27DI322j4/edit?usp=sharing";

export type Chapter = {
  index: number;
  title: string;
  paragraphs: string[];
};

export type Story = {
  slug: string;
  title: string;
  status: "Hoàn Thành" | "Đang ra" | "Chờ full";
  views: number;
  cover: string;
  tags: string[];
  summary: string;
  chapters: Chapter[];
  hot?: boolean;
  shopeeUrl?: string;
};

// Hàm lấy dữ liệu động từ Google Sheets
export async function fetchStoriesFromSheets(): Promise<Story[]> {
  try {
    const idMatches = GOOGLE_SHEETS_LINK.match(/\/d\/([a-zA-Z0-9-_]+)/);
    if (!idMatches) return stories;
    const sheetId = idMatches[1];
    const gvizUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;

    const res = await fetch(gvizUrl);
    const text = await res.text();
    const jsonString = text.substring(47, text.length - 2);
    const data = JSON.parse(jsonString);

    const rows = data.table.rows;
    const storiesMap: { [key: string]: Story } = {};

    rows.forEach((row: any) => {
      const slug = row.c[0]?.v || "";
      if (!slug) return;

      const title = row.c[1]?.v || "";
      const status = (row.c[2]?.v || "Đang ra") as Story["status"];
      const tags = row.c[3]?.v ? String(row.c[3].v).split(",").map(t => t.trim()) : [];
      const summary = row.c[4]?.v || "";
      const shopeeUrl = row.c[5]?.v || "";
      const chapterIndex = Number(row.c[6]?.v || 1);
      const chapterContent = row.c[7]?.v || "";

      if (!storiesMap[slug]) {
        storiesMap[slug] = {
          slug,
          title,
          status,
          views: 1000,
          cover: cover1,
          tags,
          summary,
          shopeeUrl,
          chapters: []
        };
      }

      // Tách nội dung chương thành các đoạn văn
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

// Dữ liệu dự phòng mặc định
export const stories: Story[] = [
  {
    slug: "may-tan-troi-lai-sang",
    title: "Mây Tan Trời Lại Sáng",
    status: "Hoàn Thành",
    views: 20418,
    cover: cover1,
    tags: ["Ngôn Tình", "Hiện Đại", "Ngược Tâm", "Tra Nam", "SE"],
    summary: "Nội dung đang được đồng bộ từ Google Sheets...",
    shopeeUrl: "https://shope.ee/",
    chapters: [
      {
        index: 1,
        title: "Chương 1",
        paragraphs: ["Đang kết nối dữ liệu từ Google Sheets..."]
      }
    ]
  }
];

export const getStory = (slug: string) => stories.find((s) => s.slug === slug);

export const navItems: { label: string; link: LinkProps }[] = [
  { label: "Trang chủ", link: { to: "/" } },
  { label: "Ngôn Tình", link: { to: "/the-loai/$ten", params: { ten: "ngon-tinh" } } },
  { label: "Truyện hoàn thành", link: { to: "/danh-sach/$loai", params: { loai: "hoan-thanh" } } },
  { label: "Truyện chờ full", link: { to: "/danh-sach/$loai", params: { loai: "cho-full" } } },
  { label: "Truyện hot", link: { to: "/danh-sach/$loai", params: { loai: "hot" } } },
];
