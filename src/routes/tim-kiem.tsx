import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { StoryListPage } from "@/components/StoryList";
import { StoryCard } from "@/components/StoryCard"; // Giữ component hiển thị thẻ truyện của bạn
import { stories } from "@/lib/stories";

// Hàm chuẩn hóa tiếng Việt & decode URL chuẩn xác
function normalizeText(str: string) {
  if (!str) return "";
  try {
    let decoded = decodeURIComponent(str).replace(/\+/g, " ");
    return decoded
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .toLowerCase()
      .trim();
  } catch (e) {
    return str
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
  
  // 1. Chuẩn hóa từ khóa nhập vào
  const normalizedQuery = normalizeText(q);
  const searchWords = normalizedQuery.split(/\s+/).filter(Boolean);

  // 2. Lọc danh sách truyện theo từ khóa
  const searchResults = searchWords.length
    ? stories.filter((s) => {
        const title = normalizeText(s.title || "");
        const author = normalizeText(s.author || "");
        const tags = (s.tags || []).map((t: string) => normalizeText(t)).join(" ");
        const fullContent = `${title} ${author} ${tags}`;

        // Chỉ cần chứa tất cả các từ đơn trong từ khóa
        return searchWords.every((word) => fullContent.includes(word));
      })
    : [];

  // 3. Lấy danh sách 4-8 truyện mới nhất/gần đây (Dựa theo thứ tự trong Google Sheets hoặc thuộc tính id/createdAt)
  const recentStories = [...stories].reverse().slice(0, 8);

  // Lấy từ khóa sạch để hiển thị trên tiêu đề
  let displayQuery = q;
  try {
    displayQuery = decodeURIComponent(q).replace(/\+/g, " ").trim();
  } catch (e) {
    displayQuery = q.replace(/\+/g, " ").trim();
  }

  // Trường hợp 1: Đã nhập từ khóa và tìm thấy kết quả
  if (displayQuery && searchResults.length > 0) {
    return (
      <StoryListPage
        title={`Kết quả cho “${displayQuery}”`}
        description={`Tìm thấy ${searchResults.length} bộ truyện.`}
        stories={searchResults}
      />
    );
  }

  // Trường hợp 2: Không nhập gì HOẶC Không tìm thấy kết quả -> Hiển thị thông báo + Gợi ý truyện mới nhất
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

      {/* Phần hiển thị danh sách truyện mới cập nhật gần đây */}
      <div className="mt-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-pink-600 flex items-center gap-2">
            ✨ Truyện mới cập nhật gần đây
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {recentStories.map((story) => (
            <StoryCard key={story.slug || story.id} story={story} />
          ))}
        </div>
      </div>
    </div>
  );
}
