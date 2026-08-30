import { createFileRoute } from "@tanstack/react-router";

import { StoryListPage } from "@/components/StoryList";
import { stories } from "@/lib/stories";

const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/gi, "d")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");

export const Route = createFileRoute("/the-loai/$ten")({
  head: ({ params }) => ({
    meta: [
      { title: `Thể loại ${params.ten} — Trạm Mochi Mochi` },
      {
        name: "description",
        content: `Danh sách truyện thuộc thể loại ${params.ten} tại Trạm Mochi Mochi.`,
      },
      { property: "og:title", content: `Thể loại ${params.ten} — Trạm Mochi Mochi` },
      { property: "og:description", content: `Truyện theo thể loại ${params.ten}.` },
    ],
  }),
  component: GenreRoute,
});

function GenreRoute() {
  const { ten } = Route.useParams();
  const items = stories.filter((s) => s.tags.some((t) => slugify(t) === ten));
  const label = items[0]?.tags.find((t) => slugify(t) === ten) ?? ten;

  return (
    <StoryListPage
      title={`Thể loại: ${label}`}
      description="Chọn một bộ và bắt đầu chương đầu tiên nhé."
      stories={items}
    />
  );
}
