import type { Story } from "./stories";

export function slugifyTag(s: string): string {
  return String(s)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/gi, "d")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");
}

export type Genre = { label: string; slug: string; count: number };

export function getAllGenres(stories: Story[]): Genre[] {
  const map = new Map<string, Genre>();
  for (const story of stories) {
    for (const tag of story.tags ?? []) {
      const label = String(tag).trim();
      if (!label) continue;
      const slug = slugifyTag(label);
      const found = map.get(slug);
      if (found) found.count += 1;
      else map.set(slug, { label, slug, count: 1 });
    }
  }
  return [...map.values()].sort((a, b) => a.label.localeCompare(b.label, "vi"));
}
