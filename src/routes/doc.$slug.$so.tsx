import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, List } from "lucide-react";
import { useEffect, useState } from "react";

import { ShopeeGate } from "@/components/ShopeeGate";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";
import { storiesQueryOptions } from "@/lib/stories-query";

const GATED_CHAPTER = 2;

export const Route = createFileRoute("/doc/$slug/$so")({
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(storiesQueryOptions).then((stories) => {
      const story = stories.find((s) => s.slug === params.slug);
      const chapter = story?.chapters.find((c) => String(c.index) === params.so);
      if (!story || !chapter) throw notFound();
      return { story, chapter };
    }),
  head: ({ loaderData }) => {
    const title = loaderData
      ? `${loaderData.story.title} - ${loaderData.chapter.title} — Trạm Mochi Mochi`
      : "Đọc truyện — Trạm Mochi Mochi";
    const desc = loaderData
      ? `${loaderData.chapter.title} của truyện ${loaderData.story.title}, đọc online tại Trạm Mochi Mochi.`
      : "Đọc truyện online tại Trạm Mochi Mochi.";
    return {
      meta: [
        { title },
        { name: "description", content: desc.slice(0, 155) },
        { property: "og:title", content: title },
        { property: "og:description", content: desc.slice(0, 155) },
      ],
    };
  },
  component: Reader,
});

function Reader() {
  const { story, chapter } = Route.useLoaderData();

  const prev = chapter.index > 1 ? chapter.index - 1 : null;
  const next = chapter.index < story.chapters.length ? chapter.index + 1 : null;
  const isGated = chapter.index === GATED_CHAPTER;
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    setUnlocked(false);
  }, [story.slug, chapter.index]);

  const locked = isGated && !unlocked;

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-8">
        <nav className="text-sm text-muted-foreground">
          <Link to="/truyen/$slug" params={{ slug: story.slug }} className="hover:text-primary">
            {story.title}
          </Link>
          <span> / {chapter.title}</span>
        </nav>
        {locked && story.shopeeUrl ? (
          <ShopeeGate onUnlock={() => setUnlocked(true)} url={story.shopeeUrl} />
        ) : (
          <article className="pastel-panel mt-4 p-5 sm:p-8">
            <h1 className="text-center text-xl font-bold md:text-2xl">
              {story.title}
              <span className="mt-1 block text-base font-semibold text-primary">
                {chapter.title}
              </span>
            </h1>
            <div className="reading-body mt-6 space-y-5">
              {chapter.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </article>
        )}


        <div className="mt-6 grid grid-cols-3 items-center gap-3">
          {prev ? (
            <Link
              to="/doc/$slug/$so"
              params={{ slug: story.slug, so: String(prev) }}
              className="inline-flex items-center justify-center gap-1 rounded-full bg-secondary px-4 py-2.5 text-sm font-bold text-secondary-foreground"
            >
              <ChevronLeft className="h-4 w-4" /> Trước
            </Link>
          ) : (
            <span />
          )}
          <Link
            to="/truyen/$slug"
            params={{ slug: story.slug }}
            className="inline-flex items-center justify-center gap-1 rounded-full bg-accent px-4 py-2.5 text-sm font-bold text-accent-foreground"
          >
            <List className="h-4 w-4" /> Chương
          </Link>
          {next ? (
            <Link
              to="/doc/$slug/$so"
              params={{ slug: story.slug, so: String(next) }}
              className="inline-flex items-center justify-center gap-1 rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground"
            >
              Sau <ChevronRight className="h-4 w-4" />
            </Link>
          ) : (
            <span />
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
