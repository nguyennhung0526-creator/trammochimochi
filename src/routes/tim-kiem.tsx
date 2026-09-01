import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { StoryListPage } from "@/components/StoryList";
import { StoryCard } from "@/components/StoryCard";
import { stories } from "@/lib/stories";

// Hàm làm sạch chuỗi: Loại bỏ hoàn toàn dấu tiếng Việt, ký tự đặc biệt & khoảng trắng
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
  
  // 1. Chuẩn hóa từ khóa tìm kiếm
  const keyword = cleanString(q);
  const searchWords = keyword.split(/\s+/).filter(Boolean);

  // 2. Lọc danh sách truyện (Kiểm tra tất cả các tên trường có thể có trong Sheet)
  const searchResults = searchWords.length
    ? stories.filter((s: any) => {
        // Tự động kiểm tra nhiều tên thuộc tính khác nhau để tránh bị hổng dữ liệu
        const title = cleanString(s.title || s.name || s.tenTruyen || s.ten_truyen);
        const author = cleanString(s.author || s.tacGia || s.tac_gia);
        const slug = cleanString(s.slug);
        
        let tags = "";
        if (Array.isArray(s.tags)) {
          tags = s.tags.map((t: any) => cleanString(t)).join(" ");
        } else if (typeof s.tags === "string") {
          tags = cleanString(s.tags);
        } else if (typeof s.theLoai === "string") {
          tags = cleanString(s.theLoai);
        }

        const fullSearchableText = `${title} ${author} ${slug} ${tags}`;

        // Kiểm tra xem dữ liệu truyện có chứa các từ khóa tìm kiếm hay không
        return searchWords.every((word) => fullSearchableText.includes(word));
      })
    : [];

  // 3. Lấy 8 truyện mới nhất dựa theo ID / Ngày cập nhật hoặc vị trí cuối trong danh sách Sheet
  const recentStories = [...stories]
    .sort((a: any, b: any) => {
      const dateA = new Date(a.updatedAt || a.createdAt || a.id || 0).getTime();
      const dateB = new Date(b.updatedAt || b.createdAt || b.id || 0).getTime();
      return dateB - dateA;
    })
    .slice(0, 8);

  // Lấy từ khóa sạch hiển thị tiêu đề
  let displayQuery = q;
  try {
    displayQuery = decodeURIComponent(q).replace(/\+/g, " ").trim();
  } catch (e) {
    displayQuery = q.replace(/\+/g, " ").trim();
  }

  // Kết quả tìm kiếm hợp lệ
  if (keyword && searchResults.length > 0) {
    return (
      <StoryListPage
        title={`Kết quả cho “${displayQuery}”`}
        description={`Tìm thấy ${searchResults.length} bộ truyện.`}
        stories={searchResults}
      />
    );
  }

  // Trường hợp không có kết quả hoặc từ khóa rỗng
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
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-pink-600 flex items-center gap-2">
            ✨ Truyện mới cập nhật gần đây
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {recentStories.map((story: any) => (
            <StoryCard key={story.slug || story.id || story.title} story={story} />
          ))}
        </div>
      </div>
    </div>
  );
}
