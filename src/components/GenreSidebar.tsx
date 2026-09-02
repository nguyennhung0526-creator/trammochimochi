import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Tags } from "lucide-react";

import { getAllGenres } from "@/lib/genres";
import { storiesQueryOptions } from "@/lib/stories-query";

export function GenreSidebar({ activeSlug }: { activeSlug?: string }) {
  const { data: stories } = useSuspenseQuery(storiesQueryOptions);
  const genres = getAllGenres(stories);

  if (genres.length === 0) return null;

  return (
    <aside className="pastel-panel h-fit p-4 lg:sticky lg:top-28">
      <h2 className="flex items-center gap-2 border-b-2 border-primary/30 pb-2 text-sm font-bold tracking-wide text-primary uppercase">
        <Tags className="h-4 w-4" /> Thể loại
      </h2>

      <ul className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:grid lg:grid-cols-2 lg:gap-2 lg:overflow-visible lg:pb-0">
        {genres.map((g) => (
          <li key={g.slug} className="shrink-0 lg:min-w-0">
            <Link
              to="/the-loai/$ten"
              params={{ ten: g.slug }}
              className={`block rounded-full px-3 py-1.5 text-center text-xs font-semibold whitespace-nowrap transition-colors lg:text-left lg:whitespace-normal lg:break-words ${
                g.slug === activeSlug
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-secondary-foreground hover:bg-secondary"
              }`}
            >
              {g.label}
            </Link>
          </li>
        ))}
      </ul>

      <Link
        to="/the-loai"
        className="mt-3 hidden text-xs font-semibold text-primary hover:underline lg:block"
      >
        Xem tất cả thể loại →
      </Link>
    </aside>
  );
}
