import { Suspense } from "react";

import { GenreSidebar } from "@/components/GenreSidebar";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";
import { StoryCard } from "@/components/StoryCard";
import type { Story } from "@/lib/stories";

export function StoryListPage({
  title,
  description,
  stories,
  activeGenre,
  showGenres = true,
}: {
  title: string;
  description: string;
  stories: Story[];
  activeGenre?: string;
  showGenres?: boolean;
}) {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-primary md:text-3xl">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
          {stories.length === 0 ? (
            <p className="pastel-panel mt-6 p-6 text-sm text-muted-foreground">
              Chưa có truyện nào phù hợp. Bạn thử tên khác nhé!
            </p>
          ) : (
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {stories.map((s) => (
                <StoryCard key={s.slug} story={s} />
              ))}
            </div>
          )}
        </div>

        {showGenres && (
          <Suspense fallback={null}>
            <GenreSidebar {...(activeGenre ? { activeSlug: activeGenre } : {})} />
          </Suspense>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
