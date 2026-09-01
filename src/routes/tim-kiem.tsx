import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { StoryListPage } from "@/components/StoryList";
import { stories } from "@/lib/stories";

// Hàm chuẩn hóa chuỗi: Giải mã URL, đổi dấu '+' thành khoảng trắng, loại bỏ dấu tiếng Việt và chuyển chữ thường
function normalizeText(str: string) {
  if (!str) return "";
  const decoded = decodeURIComponent(str.replace(/\+/g, " "));
  return decoded
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();
}

export const Route = createFileRoute("/tim-kiem")({
  validateSearch: z.object({
    q: z
      .string()
      .optional()
      .default("")
      .transform((val) => val.replace(/\+/g, " ").trim()), // Tự động đổi '+' thành khoảng trắng ngay trong Schema
  }),
  head: () => ({
    meta: [
      { title: "Tìm kiếm truyện — Trạm Mochi Mochi" },
      { name: "description", content: "Tìm truyện theo tên, tác giả hoặc thể loại tại Trạm Mochi Mochi." },
      { property: "og:title", content: "Tìm kiếm truyện — Trạm Mochi Mochi" },
      { property: "og:description", content: "Tìm truyện theo tên, tác giả hoặc thể loại." },
    ],
  }),
  component: SearchRoute,
});

function SearchRoute() {
  const { q } = Route.useSearch();
  
  // Chuẩn hóa từ khóa người dùng nhập và tách thành các từ đơn
  const normalizedQuery = normalizeText(q);
  const searchWords = normalizedQuery.split(/\s+/).filter(Boolean);

  const items = searchWords.length
    ? stories.filter((s) => {
        // Gộp tất cả thông tin tìm kiếm và chuẩn hóa
        const fullContent = normalizeText(
          [s.title, s.author, ...(s.tags || [])].join(" ")
        );

        // Kiểm tra nếu thông tin chứa TẤT CẢ các từ người dùng gõ
        return searchWords.every((word) => fullContent.includes(word));
      })
    : stories;

  // Hiển thị từ khóa đã xóa dấu '+' trên giao diện
  const displayQuery = q.replace(/\+/g, " ").trim();

  return (
    <StoryListPage
      title={displayQuery ? `Kết quả cho “${displayQuery}”` : "Tất cả truyện"}
      description={`Tìm thấy ${items.length} bộ truyện.`}
      stories={items}
    />
  );
}
