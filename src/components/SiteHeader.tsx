import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, Menu, Search, X } from "lucide-react";
import { useState } from "react";

import { navItems } from "@/lib/stories";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/tim-kiem", search: { q: term } });
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-card/85 backdrop-blur-md">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 md:grid-cols-[auto_minmax(0,1fr)_auto] md:gap-6 md:py-4">
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
            <Heart className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-lg leading-tight font-bold text-primary md:text-xl">
              Trạm Mochi Mochi
            </span>
            <span className="hidden text-xs text-muted-foreground sm:block">
              Ghé trạm, đọc một chút dịu dàng
            </span>
          </span>
        </Link>

        <form onSubmit={submit} className="col-span-2 order-3 md:order-none md:col-span-1">
          <div className="flex items-center gap-2 rounded-full bg-muted px-4 py-2">
            <input
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Tìm kiếm tên truyện..."
              aria-label="Tìm kiếm tên truyện"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              aria-label="Tìm"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>
        </form>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            to="/tai-khoan"
            className="hidden rounded-full px-3 py-2 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary sm:block"
          >
            Đăng nhập
          </Link>
          <Link
            to="/tai-khoan"
            className="hidden rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-105 sm:block"
          >
            Đăng ký
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Mở menu"
            className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-secondary-foreground md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <nav className="hidden bg-secondary/70 md:block">
        <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-1 px-4 py-1">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                {...item.link}
                className="block rounded-full px-4 py-2 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-card"
                activeProps={{ className: "bg-card text-primary" }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {open && (
        <nav className="border-t border-border bg-card px-4 py-3 md:hidden">
          <ul className="grid gap-1">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  {...item.link}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-2 text-sm font-semibold text-secondary-foreground hover:bg-secondary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 grid grid-cols-2 gap-2">
              <Link
                to="/tai-khoan"
                onClick={() => setOpen(false)}
                className="rounded-full bg-secondary px-3 py-2 text-center text-sm font-semibold text-secondary-foreground"
              >
                Đăng nhập
              </Link>
              <Link
                to="/tai-khoan"
                onClick={() => setOpen(false)}
                className="rounded-full bg-primary px-3 py-2 text-center text-sm font-semibold text-primary-foreground"
              >
                Đăng ký
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-14 border-t border-border bg-card/70 py-8 text-center text-sm text-muted-foreground">
      <p className="font-display text-base font-bold text-primary">Trạm Mochi Mochi</p>
      <p className="mt-1">Đọc truyện ngôn tình, cổ đại, hiện đại — miễn phí, dịu dàng, mỗi ngày.</p>
    </footer>
  );
}
