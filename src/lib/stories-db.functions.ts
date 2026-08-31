import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";

export type DbChapter = {
  chapter_index: number;
  title: string | null;
  content: string;
};

export type DbStory = {
  slug: string;
  title: string;
  author: string | null;
  translator: string | null;
  status: string;
  tags: string[];
  summary: string;
  cover_url: string | null;
  shopee_url: string | null;
  views: number;
  hot: boolean;
  chapters: DbChapter[];
};

function createPublicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  const url = process.env["SUPABASE_URL"]!;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export const listDbStories = createServerFn({ method: "GET" }).handler(async (): Promise<DbStory[]> => {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("stories")
    .select(
      "slug, title, author, translator, status, tags, summary, cover_url, shopee_url, views, hot, chapters(chapter_index, title, content)",
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Không tải được truyện từ Cloud:", error.message);
    return [];
  }

  return (data ?? []).map((row: any) => ({
    slug: row.slug,
    title: row.title,
    author: row.author,
    translator: row.translator,
    status: row.status,
    tags: row.tags ?? [],
    summary: row.summary ?? "",
    cover_url: row.cover_url,
    shopee_url: row.shopee_url,
    views: row.views ?? 0,
    hot: row.hot ?? false,
    chapters: (row.chapters ?? [])
      .slice()
      .sort((a: DbChapter, b: DbChapter) => a.chapter_index - b.chapter_index),
  }));
});
