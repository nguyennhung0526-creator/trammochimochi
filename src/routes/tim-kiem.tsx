import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { StoryListPage } from "@/components/StoryList";
import { stories } from "@/lib/stories";

export const Route = createFileRoute("/tim-kiem")({
  validateSearch: z.object({ q: z.string().optional().default("") }),
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
  const key = q.trim().toLowerCase();
  const items = key
    ? stories.filter((s) =>
        [s.title, s.author, ...s.tags].join(" ").toLowerCase().includes(key),
      )
    : stories;

  return (
    <StoryListPage
      title={key ? `Kết quả cho “${q}”` : "Tất cả truyện"}
      description={`Tìm thấy ${items.length} bộ truyện.`}
      stories={items}
    />
  );
}
