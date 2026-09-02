import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Tags } from "lucide-react";

import { SiteFooter, SiteHeader } from "@/components/SiteHeader";
import { getAllGenres } from "@/lib/genres";
import { storiesQueryOptions } from "@/lib/stories-query";

export const Route = createFileRoute("/the-loai/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(storiesQueryOptions),
  head: () => ({
    meta: [
      { title: "Thể loại truyện — Trạm Mochi Mochi" },
      {
        name: "description",
        content:
          "Danh sách thể loại truyện tại Trạm Mochi Mochi: ngôn tình, cổ đại, hiện đại, xuyên không và nhiều hơn nữa.",
      },
      { property: "og:title", content: "Thể loại truyện — Trạm Mochi Mochi" },
      {
        property: "og:description",
        content: "Chọn thể loại yêu thích và bắt đầu đọc ngay tại Trạm Mochi Mochi.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  errorComponent: ({ error }) => (
    <div role="alert" className="p-8 text-sm text-muted-foreground">
      Không tải được danh sách thể loại: {error.message}
    </div>
  ),
  notFoundComponent: () => (
    <div className="p-8 text-sm text-muted-foreground">Không có thể loại nào.</div>
  ),
  component: GenreIndex,
});

function GenreIndex() {
  const { data: stories } = useSuspenseQuery(storiesQueryOptions);
  const genres = getAllGenres(stories);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <nav className="text-xs text-muted-foreground">
          <Link to="/" className="font-semibold text-primary hover:underline">
            Trang chủ
          </Link>{" "}
          / Thể loại
        </nav>

        <div className="pastel-panel mt-4 flex items-center gap-2 px-5 py-4">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground">
            <Tags className="h-4 w-4" />
          </span>
          <h1 className="font-display text-lg font-bold text-primary md:text-2xl">
            Thể loại truyện
          </h1>
        </div>

        {genres.length === 0 ? (
          <p className="pastel-panel mt-6 p-6 text-sm text-muted-foreground">
            Chưa có thể loại nào được cập nhật.
          </p>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {genres.map((g, i) => (
              <Link
                key={g.slug}
                to="/the-loai/$ten"
                params={{ ten: g.slug }}
                className={`group flex flex-col items-center justify-center gap-1 rounded-2xl border border-border/70 px-3 py-4 text-center shadow-soft transition-transform hover:-translate-y-1 hover:border-primary/50 ${
                  ["bg-card", "bg-secondary/60", "bg-mint/50", "bg-butter/50"][i % 4]
                }`}
              >
                <span className="text-sm font-bold group-hover:text-primary md:text-base">
                  {g.label}
                </span>
                <span className="text-xs text-muted-foreground">{g.count} truyện</span>
              </Link>
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
