import { useState, useCallback } from "react";

const STORAGE_KEY = "scripture-bookmarks";

function loadBookmarks(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Set<string>>(loadBookmarks);

  const toggle = useCallback((ref: string) => {
    setBookmarks((prev) => {
      const next = new Set(prev);
      if (next.has(ref)) next.delete(ref);
      else next.add(ref);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      return next;
    });
  }, []);

  const isBookmarked = useCallback((ref: string) => bookmarks.has(ref), [bookmarks]);

  return { bookmarks, toggle, isBookmarked };
}
