import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { StoryListPage } from "@/components/StoryList";
import { StoryCard } from "@/components/StoryCard";
import { fetchStoriesFromSheets, type Story } from "@/lib/stories";

function cleanString(str: any): string {
  if (!str) return "";
  const text = String(str);
  try {
    const decoded = decodeURIComponent(text).replace(/\+/g, " ");
    return decoded
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .toLowerCase()
      .trim();
  } catch (e) {
    return text
      .replace(/\+/g, " ")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .toLowerCase()
      .trim();
  }
}

export const Route = createFileRoute("/tim-kiem")({
  validateSearch: z.object({
    q: z.string().optional().default(""),
  }),
  head: () => ({
    meta: [
      { title: "Tìm kiếm truyện — Trạm Mochi Mochi" },
      { name: "description", content: "Tìm truyện theo tên, tác giả hoặc thể loại tại Trạm Mochi Mochi." },
    ],
  }),
  component: SearchRoute,
});

function SearchRoute() {
  const { q } = Route.useSearch();
  const [allStories, setAllStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  // Lấy dữ liệu Google Sheets thực tế khi vào trang
  useEffect(() => {
    fetchStoriesFromSheets().then((data) => {
      setAllStories(data);
      setLoading(false);
    });
  }, []);

  const keyword = cleanString(q);
  const searchWords = keyword.split(/\s+/).filter(Boolean);

  // Lọc kết quả tìm kiếm
  const searchResults = searchWords.length
    ? allStories.filter((s) => {
        const title = cleanString(s.title);
        const author = cleanString(s.author);
        const slug = cleanString(s.slug);
        const tags = (s.tags || []).map((t) => cleanString(t)).join(" ");

        const fullText = `${title} ${author} ${slug} ${tags}`;
        return searchWords.every((word) => fullText.includes(word));
      })
    : [];

  // Lấy danh sách truyện mới nhất (bộ truyện ở cuối file Google Sheets)
  const recentStories = [...allStories].reverse().slice(0, 8);

  let displayQuery = q;
  try {
    displayQuery = decodeURIComponent(q).replace(/\+/g, " ").trim();
  } catch (e) {
    displayQuery = q.replace(/\+/g, " ").trim();
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center text-pink-500 font-medium">
        Đang tải dữ liệu truyện...
      </div>
    );
  }

  if (keyword && searchResults.length > 0) {
    return (
      <StoryListPage
        title={`Kết quả cho “${displayQuery}”`}
        description={`Tìm thấy ${searchResults.length} bộ truyện.`}
        stories={searchResults}
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          {displayQuery ? `Không tìm thấy kết quả cho “${displayQuery}”` : "Tìm kiếm truyện"}
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          {displayQuery
            ? "Bạn thử tìm bằng tên khác hoặc khám phá các bộ truyện mới cập nhật bên dưới nhé!"
            : "Nhập tên truyện, tác giả hoặc thể loại vào ô tìm kiếm ở trên."}
        </p>
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-bold text-pink-600 mb-6 flex items-center gap-2">
          ✨ Truyện mới cập nhật gần đây
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {recentStories.map((story) => (
            <StoryCard key={story.slug || story.title} story={story} />
          ))}
        </div>
      </div>
    </div>
  );
}
