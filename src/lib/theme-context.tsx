"use client";

import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Starts "light" on both server and the first client render so hydration
  // matches; the stored preference is applied right after mount instead.
  const [theme, setTheme] = useState<Theme>("light");
  const isFirstPersist = useRef(true);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("theme") as Theme | null;
      // One-time hydration from localStorage post-mount, intentionally not
      // in the lazy initializer, so the first client render matches SSR.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored === "light" || stored === "dark") setTheme(stored);
    } catch {
      // ignore malformed storage
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    if (isFirstPersist.current) {
      isFirstPersist.current = false;
      return;
    }
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
