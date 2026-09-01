import { Link } from "@tanstack/react-router";
import { Eye } from "lucide-react";

import type { Story } from "@/lib/stories";

export function StatusPill({ status }: { status: Story["status"] }) {
  const tone =
    status === "Hoàn Thành"
      ? "bg-success text-success-foreground"
      : "bg-butter text-butter-foreground";
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${tone}`}>{status}</span>
  );
}

export function StoryCard({ story }: { story: Story }) {
  return (
    <Link
      to="/truyen/$slug"
      params={{ slug: story.slug }}
      className="group pastel-panel flex flex-col overflow-hidden transition-transform hover:-translate-y-1"
    >
      <img
        src={story.cover}
        alt={`Ảnh bìa truyện ${story.title}`}
        loading="lazy"
        width={640}
        height={896}
        className="aspect-[3/4] w-full object-cover"
      />
      <div className="flex flex-1 flex-col gap-2 p-3">
        <h3 className="line-clamp-2 text-sm leading-snug font-bold group-hover:text-primary md:text-base">
          {story.title}
        </h3>
        <p className="text-xs text-muted-foreground">{story.author}</p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          <StatusPill status={story.status} />
          <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
            <Eye className="h-3.5 w-3.5" />
            {story.views.toLocaleString("vi-VN")}
          </span>
        </div>
      </div>
    </Link>
  );
}
