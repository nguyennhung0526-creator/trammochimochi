import { queryOptions } from "@tanstack/react-query";

import { fetchStoriesFromSheets, stories as localStories, type Story } from "./stories";

export const storiesQueryOptions = queryOptions({
  queryKey: ["stories"],
  staleTime: 5 * 60_000,
  queryFn: async (): Promise<Story[]> => {
    const remote = await fetchStoriesFromSheets();
    const bySlug = new Map<string, Story>();
    for (const story of [...localStories, ...remote]) {
      bySlug.set(story.slug, story);
    }
    return [...bySlug.values()];
  },
});
