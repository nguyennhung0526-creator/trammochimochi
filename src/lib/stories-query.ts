import { queryOptions } from "@tanstack/react-query";

import cover1 from "@/assets/cover-1.jpg";
import { fetchStoriesFromSheets, stories as localStories, type Story } from "./stories";
import { listDbStories, type DbStory } from "./stories-db.functions";

function toParagraphs(content: string): string[] {
  return String(content)
    .split("\n")
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
}

function dbToStory(row: DbStory): Story {
  return {
    slug: row.slug,
    title: row.title,
    ...(row.author ? { author: row.author } : {}),
    ...(row.translator ? { translator: row.translator } : {}),
    ...(row.shopee_url ? { shopeeUrl: row.shopee_url } : {}),
    status: (row.status as Story["status"]) ?? "Hoàn Thành",
    views: row.views ?? 0,
    cover: row.cover_url || cover1,
    tags: row.tags?.length ? row.tags : ["Ngôn Tình"],
    summary: row.summary ?? "",
    hot: row.hot,
    shopeeUrl: row.shopee_url ?? undefined,
    chapters: (row.chapters ?? []).map((c) => ({
      index: c.chapter_index,
      title: c.title || `Chương ${c.chapter_index}`,
      paragraphs: toParagraphs(c.content),
    })),
  };
}

export const storiesQueryOptions = queryOptions({
  queryKey: ["stories"],
  staleTime: 30_000,
  queryFn: async (): Promise<Story[]> => {
    const [sheets, db] = await Promise.all([
      fetchStoriesFromSheets().catch(() => []),
      listDbStories().catch(() => [] as DbStory[]),
    ]);
    const bySlug = new Map<string, Story>();
    for (const story of [...localStories, ...sheets, ...db.map(dbToStory)]) {
      bySlug.set(story.slug, story);
    }
    return [...bySlug.values()];
  },
});
