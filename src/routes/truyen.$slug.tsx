import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { BookOpen, ChevronRight, Eye, Link2 } from "lucide-react";

import { SiteFooter, SiteHeader } from "@/components/SiteHeader";
import { StatusPill } from "@/components/StoryCard";
import { storiesQueryOptions } from "@/lib/stories-query";

const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/gi, "d")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");

export const Route = createFileRoute("/truyen/$slug")({
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(storiesQueryOptions).then((stories) => {
      if (!stories.some((s) => s.slug === params.slug)) throw notFound();
    }),
  head: () => {
    const title = "Truyện — Trạm Mochi Mochi";
    const desc = "Đọc truyện online tại Trạm Mochi Mochi.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: StoryDetail,
});

function StoryDetail() {
  const { slug } = Route.useParams();
  const { data: allStories } = useSuspenseQuery(storiesQueryOptions);
  const story = allStories.find((s) => s.slug === slug)!;
  const others = allStories.filter((s) => s.slug !== story.slug);

 const handleShare = () => {
  navigator.clipboard.writeText(window.location.href);
  alert("Đã sao chép liên kết truyện!");
};

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0">
          <article className="pastel-panel grid gap-5 p-4 sm:grid-cols-[200px_minmax(0,1fr)] sm:p-6">
            <img
              src={story.cover}
              alt={`Ảnh bìa truyện ${story.title}`}
              width={640}
              height={896}
              className="mx-auto aspect-[3/4] w-40 rounded-2xl object-cover shadow-card sm:w-full"
            />
            <div className="min-w-0">
              <h1 className="text-xl font-bold uppercase md:text-2xl">{story.title}</h1>
              <dl className="mt-4 grid gap-2 text-sm">
                <Row label="Tác Giả" value={<span className="text-primary">{story.author}</span>} />
                <Row label="Tình trạng" value={<StatusPill status={story.status} />} />
                <Row label="Lượt xem" value={story.views.toLocaleString("vi-VN")} />
                <Row
                  label="Số chương"
                  value={String(story.totalChapters ?? story.chapters.length)}
                />
                <Row label="Chương mới nhất" value={String(story.chapters.length)} />
              </dl>

              <p className="mt-4 text-sm font-bold">Thể loại:</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {story.tags.map((tag) => (
                  <Link
                    key={tag}
                    to="/the-loai/$ten"
                    params={{ ten: slugify(tag) }}
                    className="rounded-xl border border-border bg-lilac/50 px-3 py-1.5 text-sm font-semibold text-lilac-foreground transition-colors hover:bg-lilac"
                  >
                    {tag}
                  </Link>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-1 hover:text-primary transition-colors cursor-pointer"
                >
                  <Link2 className="h-4 w-4" /> Chia sẻ
                </button>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  to="/doc/$slug/$so"
                  params={{ slug: story.slug, so: "1" }}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-soft transition-transform hover:scale-105"
                >
                  <BookOpen className="h-4 w-4" /> Đọc truyện
                </Link>
                <Link
                  to="/doc/$slug/$so"
                  params={{ slug: story.slug, so: String(story.chapters.length) }}
                  className="inline-flex items-center gap-2 rounded-full bg-mint px-5 py-2.5 text-sm font-bold text-mint-foreground"
                >
                  <Eye className="h-4 w-4" /> Đọc tiếp
                </Link>
              </div>
            </div>
          </article>

          <section className="pastel-panel mt-6 p-4 sm:p-6">
            <h2 className="text-lg font-bold text-primary">Giới thiệu</h2>
            <p className="reading-body mt-2 whitespace-pre-line text-muted-foreground">{story.summary}</p>
          </section>

          <section id="danh-sach-chuong" className="pastel-panel mt-6 scroll-mt-24 p-4 sm:p-6">
            <h2 className="text-lg font-bold text-primary">Danh sách chương</h2>
            <ul className="mt-3 divide-y divide-border">
              {story.chapters.map((c) => (
                <li key={c.index}>
                  <Link
                    to="/doc/$slug/$so"
                    params={{ slug: story.slug, so: String(c.index) }}
                    className="flex items-center justify-between gap-3 py-3 text-sm font-semibold transition-colors hover:text-primary"
                  >
                    <span className="min-w-0 truncate">{c.title}</span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-primary" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="pastel-panel h-fit p-4">
          <h2 className="border-b-2 border-primary/40 pb-2 text-base font-bold text-primary uppercase">
            Truyện cùng tác giả
          </h2>
          <ul className="mt-2 divide-y divide-border">
            {others.map((s) => (
              <li key={s.slug}>
                <Link
                  to="/truyen/$slug"
                  params={{ slug: s.slug }}
                  className="flex items-start gap-2 py-3 text-sm font-semibold uppercase transition-colors hover:text-primary"
                >
                  <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="min-w-0">{s.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </main>
      <SiteFooter />
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <dt className="font-bold">{label}:</dt>
      <dd className="text-muted-foreground">{value}</dd>
    </div>
  );
}
