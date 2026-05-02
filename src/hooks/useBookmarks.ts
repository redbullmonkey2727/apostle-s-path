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

  const persist = (next: Set<string>) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
  };

  const toggle = useCallback((ref: string) => {
    setBookmarks((prev) => {
      const next = new Set(prev);
      if (next.has(ref)) next.delete(ref);
      else next.add(ref);
      persist(next);
      return next;
    });
  }, []);

  const isBookmarked = useCallback((ref: string) => bookmarks.has(ref), [bookmarks]);

  const exportBookmarks = useCallback(() => {
    const payload = {
      app: "nt-map",
      type: "bookmarks",
      version: 1,
      exportedAt: new Date().toISOString(),
      bookmarks: [...bookmarks],
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nt-map-bookmarks-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }, [bookmarks]);

  const importBookmarks = useCallback(async (file: File, mode: "merge" | "replace" = "merge") => {
    const text = await file.text();
    const parsed = JSON.parse(text);
    const incoming: string[] = Array.isArray(parsed)
      ? parsed
      : Array.isArray(parsed?.bookmarks)
        ? parsed.bookmarks
        : [];
    if (!incoming.every((s) => typeof s === "string")) {
      throw new Error("Invalid bookmarks file");
    }
    setBookmarks((prev) => {
      const next = mode === "replace" ? new Set<string>() : new Set(prev);
      for (const r of incoming) next.add(r);
      persist(next);
      return next;
    });
    return incoming.length;
  }, []);

  return { bookmarks, toggle, isBookmarked, exportBookmarks, importBookmarks };
}
