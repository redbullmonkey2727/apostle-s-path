import { useState, useCallback, useMemo } from "react";
import { cities } from "@/data/paulData";

const STORAGE_KEY = "scripture-progress";

function loadViewed(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

export function useScriptureProgress() {
  const [viewed, setViewed] = useState<Set<string>>(loadViewed);

  const totalScriptures = useMemo(() => {
    let count = 0;
    for (const c of cities) count += c.scriptures.length;
    return count;
  }, []);

  const markViewed = useCallback((reference: string) => {
    setViewed((prev) => {
      const next = new Set(prev);
      next.add(reference);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      return next;
    });
  }, []);

  return { viewed, markViewed, viewedCount: viewed.size, totalScriptures };
}
