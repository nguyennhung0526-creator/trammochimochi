import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { StoryListPage } from "@/components/StoryList";
import { stories } from "@/lib/stories";

// Hàm chuẩn hóa chuỗi tiếng Việt & URL chuẩn xác
function normalizeText(str: string) {
  if (!str) return "";
  try {
    // 1. Decode URL trước (ví dụ: l%C3%A3ng -> lãng)
    let decoded = decodeURIComponent(str);
    // 2. Chuyển dấu '+' thành khoảng trắng
    decoded = decoded.replace(/\+/g, " ");
    // 3. Xóa dấu tiếng Việt & chuyển chữ thường
    return decoded
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .toLowerCase()
      .trim();
  } catch (e) {
    // Dự phòng nếu chuỗi không cần decode
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
      { property: "og:title", content: "Tìm kiếm truyện — Trạm Mochi Mochi" },
      { property: "og:description", content: "Tìm truyện theo tên, tác giả hoặc thể loại." },
    ],
  }),
  component: SearchRoute,
});

function SearchRoute() {
  const { q } = Route.useSearch();
  
  // Chuẩn hóa từ khóa tìm kiếm
  const normalizedQuery = normalizeText(q);
  const searchWords = normalizedQuery.split(/\s+/).filter(Boolean);

  const items = searchWords.length
    ? stories.filter((s) => {
        // Lấy tất cả thông tin truyện & chuẩn hóa
        const title = normalizeText(s.title || "");
        const author = normalizeText(s.author || "");
        const tags = (s.tags || []).map((t: string) => normalizeText(t)).join(" ");
        
        const fullContent = `${title} ${author} ${tags}`;

        // So sánh: Chỉ cần thông tin truyện chứa các từ trong từ khóa
        return searchWords.every((word) => fullContent.includes(word));
      })
    : stories;

  // Lấy chuỗi hiển thị lại trên giao diện người dùng
  let displayQuery = q;
  try {
    displayQuery = decodeURIComponent(q).replace(/\+/g, " ").trim();
  } catch (e) {
    displayQuery = q.replace(/\+/g, " ").trim();
  }

  return (
    <StoryListPage
      title={displayQuery ? `Kết quả cho “${displayQuery}”` : "Tất cả truyện"}
      description={`Tìm thấy ${items.length} bộ truyện.`}
      stories={items}
    />
  );
}
