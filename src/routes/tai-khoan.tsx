import { createFileRoute } from "@tanstack/react-router";

import { SiteFooter, SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/tai-khoan")({
  head: () => ({
    meta: [
      { title: "Tài khoản — Trạm Mochi Mochi" },
      {
        name: "description",
        content: "Đăng nhập hoặc đăng ký để lưu truyện yêu thích và lịch sử đọc tại Trạm Mochi Mochi.",
      },
      { property: "og:title", content: "Tài khoản — Trạm Mochi Mochi" },
      { property: "og:description", content: "Đăng nhập để lưu truyện yêu thích và lịch sử đọc." },
    ],
  }),
  component: Account,
});

function Account() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-md px-4 py-12">
        <div className="pastel-panel p-6">
          <h1 className="text-xl font-bold text-primary">Đăng nhập / Đăng ký</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Tính năng tài khoản sẽ mở sớm. Khi đó bạn có thể lưu truyện yêu thích và đánh dấu chương
            đang đọc.
          </p>
          <div className="mt-5 grid gap-3">
            <input
              placeholder="Email"
              aria-label="Email"
              className="rounded-2xl bg-muted px-4 py-3 text-sm outline-none"
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              aria-label="Mật khẩu"
              className="rounded-2xl bg-muted px-4 py-3 text-sm outline-none"
            />
            <button className="rounded-full bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-soft">
              Tiếp tục
            </button>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
