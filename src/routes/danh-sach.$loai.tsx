import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";

import { StoryListPage } from "@/components/StoryList";
import { storiesQueryOptions } from "@/lib/stories-query";

const config: Record<string, { title: string; description: string }> = {
  "hoan-thanh": {
    title: "Truyện hoàn thành",
    description: "Những bộ truyện đã đủ chương, đọc một hơi không lo ngóng chờ.",
  },
  "cho-full": {
    title: "Truyện chờ full",
    description: "Đang cập nhật từng chương, cùng nhau kiên nhẫn chờ nhé.",
  },
  hot: {
    title: "Truyện hot",
    description: "Được các bạn ở Trạm Mochi Mochi đọc nhiều nhất tuần này.",
  },
};

export const Route = createFileRoute("/danh-sach/$loai")({
  loader: ({ context }) => context.queryClient.ensureQueryData(storiesQueryOptions),
  head: ({ params }) => {
    const c = config[params.loai] ?? { title: "Danh sách truyện", description: "" };
    return {
      meta: [
        { title: `${c.title} — Trạm Mochi Mochi` },
        { name: "description", content: c.description || "Danh sách truyện tại Trạm Mochi Mochi." },
        { property: "og:title", content: `${c.title} — Trạm Mochi Mochi` },
        { property: "og:description", content: c.description || "Danh sách truyện." },
      ],
    };
  },
  component: ListRoute,
});

function ListRoute() {
  const { loai } = Route.useParams();
  const { data: stories } = useSuspenseQuery(storiesQueryOptions);
  const c = config[loai] ?? {
    title: "Danh sách truyện",
    description: "Tổng hợp truyện tại Trạm Mochi Mochi.",
  };
  const items =
    loai === "hoan-thanh"
      ? stories.filter((s) => s.status === "Hoàn Thành")
      : loai === "cho-full"
        ? stories.filter((s) => s.status !== "Hoàn Thành")
        : loai === "hot"
          ? [...stories].filter((s) => s.hot || s.views > 0).sort((a, b) => b.views - a.views)
          : stories;

  return <StoryListPage title={c.title} description={c.description} stories={items} />;
}
