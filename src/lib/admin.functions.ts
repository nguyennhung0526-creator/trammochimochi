import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type StoryInput = {
  slug: string;
  title: string;
  author?: string;
  translator?: string;
  status: string;
  tags: string[];
  summary: string;
  coverUrl?: string;
  shopeeUrl?: string;
  hot?: boolean;
};

export type ChapterInput = {
  chapterIndex: number;
  title?: string;
  content: string;
};

async function assertAdmin(context: { supabase: any; userId: string }) {
  const { data, error } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Bạn không có quyền quản trị.");
}

export const checkIsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    return { isAdmin: Boolean(data) };
  });

export const adminListStories = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { data, error } = await context.supabase
      .from("stories")
      .select("*, chapters(id, chapter_index, title, content)")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []).map((s: any) => ({
      ...s,
      chapters: (s.chapters ?? []).sort((a: any, b: any) => a.chapter_index - b.chapter_index),
    }));
  });

export const saveStory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id?: string; story: StoryInput }) => data)
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const row = {
      slug: data.story.slug.trim(),
      title: data.story.title.trim(),
      author: data.story.author?.trim() || null,
      translator: data.story.translator?.trim() || null,
      status: data.story.status,
      tags: data.story.tags,
      summary: data.story.summary,
      cover_url: data.story.coverUrl?.trim() || null,
      shopee_url: data.story.shopeeUrl?.trim() || null,
      hot: data.story.hot ?? false,
    };

    if (data.id) {
      const { error } = await context.supabase.from("stories").update(row).eq("id", data.id);
      if (error) throw new Error(error.message);
      return { id: data.id };
    }

    const { data: inserted, error } = await context.supabase
      .from("stories")
      .insert(row)
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { id: inserted.id as string };
  });

export const deleteStory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error } = await context.supabase.from("stories").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const saveChapter = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { storyId: string; chapter: ChapterInput }) => data)
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error } = await context.supabase.from("chapters").upsert(
      {
        story_id: data.storyId,
        chapter_index: data.chapter.chapterIndex,
        title: data.chapter.title?.trim() || null,
        content: data.chapter.content,
      },
      { onConflict: "story_id,chapter_index" },
    );
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteChapter = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error } = await context.supabase.from("chapters").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
