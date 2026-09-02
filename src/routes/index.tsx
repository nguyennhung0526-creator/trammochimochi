import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Flame, Sparkles } from "lucide-react";

import { SiteFooter, SiteHeader } from "@/components/SiteHeader";
import { StoryCard } from "@/components/StoryCard";
import { storiesQueryOptions } from "@/lib/stories-query";
import type { Story } from "@/lib/stories";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Trạm Mochi Mochi — Đọc truyện ngôn tình online miễn phí" },
      {
        name: "description",
        content:
          "Trạm Mochi Mochi: đọc truyện ngôn tình, cổ đại, hiện đại với giao diện pastel dịu mắt, mượt trên điện thoại và máy tính.",
      },
      { property: "og:title", content: "Trạm Mochi Mochi — Đọc truyện online" },
      {
        property: "og:description",
        content: "Kho truyện ngôn tình pastel dịu mắt, cập nhật chương mới mỗi ngày.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(storiesQueryOptions),
  errorComponent: ({ error }) => (
    <div role="alert" className="p-8 text-sm text-muted-foreground">
      Không tải được kho truyện: {error.message}
    </div>
  ),
  pendingComponent: () => (
    <div className="p-8 text-sm text-muted-foreground">Đang tải kho truyện…</div>
  ),
  component: Home,
});

function Home() {
  const { data: stories } = useSuspenseQuery(storiesQueryOptions);
  const byViews = [...stories].sort((a, b) => b.views - a.views);
  const hot = byViews.slice(0, 3);
  const latest = [...stories].reverse().slice(0, 3);
  const featured = byViews[0];


  if (!featured) {
    return (
      <div className="min-h-screen">
        <SiteHeader />
        <main className="mx-auto max-w-6xl px-4 py-16">
          <h1 className="text-2xl font-bold text-primary">Trạm Mochi Mochi</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Kho truyện đang được cập nhật, bạn quay lại sau nhé!
          </p>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <section className="pastel-panel grid gap-6 overflow-hidden p-5 md:grid-cols-[minmax(0,1fr)_260px] md:p-8">
          <div className="flex min-w-0 flex-col justify-center">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-mint px-3 py-1 text-xs font-bold text-mint-foreground">
              <Sparkles className="h-3.5 w-3.5" /> Truyện nổi bật hôm nay
            </span>
            <h1 className="mt-4 text-2xl font-bold md:text-4xl">{featured.title}</h1>
            <p className="mt-3 line-clamp-4 whitespace-pre-line text-sm text-muted-foreground md:text-base">
              {featured.summary}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/truyen/$slug"
                params={{ slug: featured.slug }}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-soft transition-transform hover:scale-105"
              >
                <BookOpen className="h-4 w-4" /> Đọc truyện
              </Link>
              <Link
                to="/danh-sach/$loai"
                params={{ loai: "hot" }}
                className="inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-2.5 text-sm font-bold text-secondary-foreground"
              >
                <Flame className="h-4 w-4" /> Truyện hot
              </Link>
            </div>
          </div>
          <img
            src={featured.cover}
            alt={`Ảnh bìa truyện ${featured.title}`}
            width={640}
            height={896}
            className="mx-auto aspect-[3/4] w-40 rounded-2xl object-cover shadow-card md:w-full"
          />
        </section>

        <Section title="Mới cập nhật" items={stories} />
        <Section title="Truyện hot" items={hot} />
      </main>
      <SiteFooter />
    </div>
  );
}

function Section({ title, items }: { title: string; items: Story[] }) {
  return (
    <section className="mt-10">
      <h2 className="border-b-2 border-primary/40 pb-2 text-lg font-bold text-primary md:text-xl">
        {title}
      </h2>
      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((s) => (
          <StoryCard key={s.slug} story={s} />
        ))}
      </div>
    </section>
  );
} 
