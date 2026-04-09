import { useState, useEffect, useCallback } from "react";

export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("dark-mode") === "1";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("dark-mode", isDark ? "1" : "0");
  }, [isDark]);

  const toggle = useCallback(() => setIsDark((p) => !p), []);

  return { isDark, toggle };
}
