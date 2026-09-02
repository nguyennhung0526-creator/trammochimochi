import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";

import { StoryListPage } from "@/components/StoryList";
import { slugifyTag } from "@/lib/genres";
import { storiesQueryOptions } from "@/lib/stories-query";

export const Route = createFileRoute("/the-loai/$ten")({
  loader: ({ context }) => context.queryClient.ensureQueryData(storiesQueryOptions),
  head: ({ params }) => ({
    meta: [
      { title: `Thể loại ${params.ten} — Trạm Mochi Mochi` },
      {
        name: "description",
        content: `Danh sách truyện thuộc thể loại ${params.ten} tại Trạm Mochi Mochi.`,
      },
      { property: "og:title", content: `Thể loại ${params.ten} — Trạm Mochi Mochi` },
      { property: "og:description", content: `Truyện theo thể loại ${params.ten}.` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  errorComponent: ({ error }) => (
    <div role="alert" className="p-8 text-sm text-muted-foreground">
      Không tải được danh sách truyện: {error.message}
    </div>
  ),
  notFoundComponent: () => (
    <div className="p-8 text-sm text-muted-foreground">Không có truyện nào.</div>
  ),
  component: GenreRoute,
});

function GenreRoute() {
  const { ten } = Route.useParams();
  const { data: stories } = useSuspenseQuery(storiesQueryOptions);
  const items = stories.filter((s) => s.tags.some((t) => slugifyTag(t) === ten));
  const label = items[0]?.tags.find((t) => slugifyTag(t) === ten) ?? ten;

  return (
    <StoryListPage
      title={`Thể loại: ${label}`}
      description="Chọn một bộ và bắt đầu chương đầu tiên nhé."
      stories={items}
      activeGenre={ten}
    />
  );
}

