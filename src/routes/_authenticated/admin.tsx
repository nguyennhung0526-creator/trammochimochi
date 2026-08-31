import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { SiteHeader } from "@/components/SiteHeader";
import {
  adminListStories,
  deleteChapter,
  deleteStory,
  saveChapter,
  saveStory,
} from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Quản trị truyện — Trạm Mochi Mochi" },
      { name: "description", content: "Đăng truyện mới, sửa tên, mô tả, thể loại và link Shopee." },
      { property: "og:title", content: "Quản trị truyện — Trạm Mochi Mochi" },
      { property: "og:description", content: "Khu vực quản trị nội dung Trạm Mochi Mochi." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

type StoryRow = {
  id: string;
  slug: string;
  title: string;
  author: string | null;
  translator: string | null;
  status: string;
  tags: string[];
  summary: string;
  cover_url: string | null;
  shopee_url: string | null;
  hot: boolean;
  chapters: { id: string; chapter_index: number; title: string | null; content: string }[];
};

const emptyForm = {
  slug: "",
  title: "",
  author: "",
  translator: "",
  status: "Hoàn Thành",
  tags: "",
  summary: "",
  coverUrl: "",
  shopeeUrl: "",
  hot: false,
};

function AdminPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const listFn = useServerFn(adminListStories);
  const saveStoryFn = useServerFn(saveStory);
  const deleteStoryFn = useServerFn(deleteStory);
  const saveChapterFn = useServerFn(saveChapter);
  const deleteChapterFn = useServerFn(deleteChapter);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [chapterStoryId, setChapterStoryId] = useState<string | null>(null);
  const [chapterForm, setChapterForm] = useState({ chapterIndex: 1, title: "", content: "" });

  const storiesQuery = useQuery({
    queryKey: ["admin-stories"],
    queryFn: () => listFn() as Promise<StoryRow[]>,
  });

  function refresh() {
    queryClient.invalidateQueries({ queryKey: ["admin-stories"] });
    queryClient.invalidateQueries({ queryKey: ["stories"] });
  }

  const storyMutation = useMutation({
    mutationFn: async () =>
      saveStoryFn({
        data: {
          ...(editingId ? { id: editingId } : {}),
          story: {
            slug: form.slug,
            title: form.title,
            author: form.author,
            translator: form.translator,
            status: form.status,
            tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
            summary: form.summary,
            coverUrl: form.coverUrl,
            shopeeUrl: form.shopeeUrl,
            hot: form.hot,
          },
        },
      }),
    onSuccess: () => {
      toast.success(editingId ? "Đã cập nhật truyện" : "Đã đăng truyện mới");
      setEditingId(null);
      setForm({ ...emptyForm });
      refresh();
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : "Lưu thất bại"),
  });

  const chapterMutation = useMutation({
    mutationFn: async () =>
      saveChapterFn({
        data: {
          storyId: chapterStoryId!,
          chapter: {
            chapterIndex: Number(chapterForm.chapterIndex),
            title: chapterForm.title,
            content: chapterForm.content,
          },
        },
      }),
    onSuccess: () => {
      toast.success("Đã lưu chương");
      setChapterForm({ chapterIndex: 1, title: "", content: "" });
      setChapterStoryId(null);
      refresh();
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : "Lưu chương thất bại"),
  });

  function startEdit(story: StoryRow) {
    setEditingId(story.id);
    setForm({
      slug: story.slug,
      title: story.title,
      author: story.author ?? "",
      translator: story.translator ?? "",
      status: story.status,
      tags: (story.tags ?? []).join(", "),
      summary: story.summary ?? "",
      coverUrl: story.cover_url ?? "",
      shopeeUrl: story.shopee_url ?? "",
      hot: story.hot,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  const stories = storiesQuery.data ?? [];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto w-full max-w-4xl px-4 py-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold text-foreground">Quản trị truyện</h1>
          <Button variant="outline" onClick={signOut}>
            Đăng xuất
          </Button>
        </div>

        {storiesQuery.isError && (
          <p className="mt-4 rounded-2xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
            {storiesQuery.error instanceof Error ? storiesQuery.error.message : "Không tải được danh sách"}
          </p>
        )}

        <section className="mt-6 rounded-3xl border bg-card p-5 shadow-sm">
          <h2 className="text-lg font-semibold">{editingId ? "Sửa truyện" : "Đăng truyện mới"}</h2>
          <form
            className="mt-4 grid gap-4 sm:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              storyMutation.mutate();
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="title">Tên truyện</Label>
              <Input id="title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Đường dẫn (slug)</Label>
              <Input
                id="slug"
                required
                placeholder="may-tan-troi-lai-sang"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author">Tác giả</Label>
              <Input id="author" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="translator">Người dịch / Editor</Label>
              <Input
                id="translator"
                value={form.translator}
                onChange={(e) => setForm({ ...form, translator: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Thể loại (cách nhau bằng dấu phẩy)</Label>
              <Input
                id="tags"
                placeholder="Ngôn Tình, Hiện Đại"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Trạng thái</Label>
              <select
                id="status"
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="Hoàn Thành">Hoàn Thành</option>
                <option value="Đang ra">Đang ra</option>
                <option value="Chờ full">Chờ full</option>
              </select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="shopee">Link Shopee / TikTok Shop</Label>
              <Input
                id="shopee"
                placeholder="https://shop.tiktok.com/..."
                value={form.shopeeUrl}
                onChange={(e) => setForm({ ...form, shopeeUrl: e.target.value })}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="cover">Link ảnh bìa (tuỳ chọn)</Label>
              <Input id="cover" value={form.coverUrl} onChange={(e) => setForm({ ...form, coverUrl: e.target.value })} />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="summary">Mô tả / Giới thiệu</Label>
              <Textarea
                id="summary"
                rows={8}
                value={form.summary}
                onChange={(e) => setForm({ ...form, summary: e.target.value })}
              />
            </div>
            <div className="flex items-center gap-3 sm:col-span-2">
              <Switch id="hot" checked={form.hot} onCheckedChange={(v) => setForm({ ...form, hot: v })} />
              <Label htmlFor="hot">Đánh dấu truyện hot</Label>
            </div>
            <div className="flex gap-3 sm:col-span-2">
              <Button type="submit" disabled={storyMutation.isPending}>
                {storyMutation.isPending ? "Đang lưu..." : editingId ? "Cập nhật" : "Đăng truyện"}
              </Button>
              {editingId && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setEditingId(null);
                    setForm({ ...emptyForm });
                  }}
                >
                  Huỷ
                </Button>
              )}
            </div>
          </form>
        </section>

        <section className="mt-8 space-y-4">
          <h2 className="text-lg font-semibold">Truyện đã đăng ({stories.length})</h2>
          {storiesQuery.isLoading && <p className="text-sm text-muted-foreground">Đang tải...</p>}
          {stories.map((story) => (
            <div key={story.id} className="rounded-3xl border bg-card p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-foreground">{story.title}</h3>
                  <p className="text-xs text-muted-foreground">/{story.slug} · {story.status}</p>
                  <p className="text-xs text-muted-foreground">{(story.tags ?? []).join(", ")}</p>
                  {story.shopee_url && (
                    <p className="mt-1 break-all text-xs text-primary">{story.shopee_url}</p>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" onClick={() => startEdit(story)}>
                    Sửa
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setChapterStoryId(story.id);
                      setChapterForm({
                        chapterIndex: (story.chapters?.length ?? 0) + 1,
                        title: "",
                        content: "",
                      });
                    }}
                  >
                    Thêm chương
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={async () => {
                      if (!confirm(`Xoá truyện "${story.title}"?`)) return;
                      try {
                        await deleteStoryFn({ data: { id: story.id } });
                        toast.success("Đã xoá truyện");
                        refresh();
                      } catch (error) {
                        toast.error(error instanceof Error ? error.message : "Xoá thất bại");
                      }
                    }}
                  >
                    Xoá
                  </Button>
                </div>
              </div>

              {story.chapters?.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {story.chapters.map((chapter) => (
                    <li key={chapter.id} className="flex items-center justify-between gap-3 rounded-xl bg-muted/50 px-3 py-2 text-sm">
                      <span>
                        Chương {chapter.chapter_index}
                        {chapter.title ? ` — ${chapter.title}` : ""}
                      </span>
                      <span className="flex gap-2">
                        <button
                          type="button"
                          className="text-xs text-primary underline"
                          onClick={() => {
                            setChapterStoryId(story.id);
                            setChapterForm({
                              chapterIndex: chapter.chapter_index,
                              title: chapter.title ?? "",
                              content: chapter.content,
                            });
                          }}
                        >
                          Sửa
                        </button>
                        <button
                          type="button"
                          className="text-xs text-destructive underline"
                          onClick={async () => {
                            if (!confirm(`Xoá chương ${chapter.chapter_index}?`)) return;
                            try {
                              await deleteChapterFn({ data: { id: chapter.id } });
                              toast.success("Đã xoá chương");
                              refresh();
                            } catch (error) {
                              toast.error(error instanceof Error ? error.message : "Xoá thất bại");
                            }
                          }}
                        >
                          Xoá
                        </button>
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {chapterStoryId === story.id && (
                <form
                  className="mt-4 space-y-3 rounded-2xl border border-dashed p-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    chapterMutation.mutate();
                  }}
                >
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor={`ci-${story.id}`}>Số chương</Label>
                      <Input
                        id={`ci-${story.id}`}
                        type="number"
                        min={1}
                        required
                        value={chapterForm.chapterIndex}
                        onChange={(e) => setChapterForm({ ...chapterForm, chapterIndex: Number(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`ct-${story.id}`}>Tiêu đề chương (tuỳ chọn)</Label>
                      <Input
                        id={`ct-${story.id}`}
                        value={chapterForm.title}
                        onChange={(e) => setChapterForm({ ...chapterForm, title: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`cc-${story.id}`}>Nội dung chương</Label>
                    <Textarea
                      id={`cc-${story.id}`}
                      rows={12}
                      required
                      value={chapterForm.content}
                      onChange={(e) => setChapterForm({ ...chapterForm, content: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button type="submit" disabled={chapterMutation.isPending}>
                      {chapterMutation.isPending ? "Đang lưu..." : "Lưu chương"}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setChapterStoryId(null)}>
                      Huỷ
                    </Button>
                  </div>
                </form>
              )}
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
