"use client";

import {
  DEFAULT_MODE,
  DEFAULT_PALETTE,
  PALETTES,
  STORAGE_KEYS,
  type Mode,
  type PaletteId,
} from "@/lib/theme";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

type ThemeContextValue = {
  palette: PaletteId;
  mode: Mode;
  // Bumps on every change so the portrait can replay its swap effect.
  changes: number;
  setPalette: (id: PaletteId) => void;
  nextPalette: () => void;
  toggleMode: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function save(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Private windows can block storage; the choice just won't persist.
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [palette, setPaletteState] = useState<PaletteId>(DEFAULT_PALETTE);
  const [mode, setMode] = useState<Mode>(DEFAULT_MODE);
  const [changes, setChanges] = useState(0);

  // The head script already applied the saved choice; adopt it.
  useEffect(() => {
    const d = document.documentElement.dataset;
    if (PALETTES.some((p) => p.id === d.palette)) setPaletteState(d.palette as PaletteId);
    if (d.mode === "light" || d.mode === "dark") setMode(d.mode);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.palette = palette;
    document.documentElement.dataset.mode = mode;
  }, [palette, mode]);

  const setPalette = useCallback((id: PaletteId) => {
    setPaletteState(id);
    setChanges((c) => c + 1);
    save(STORAGE_KEYS.palette, id);
  }, []);

  const nextPalette = useCallback(() => {
    setPaletteState((current) => {
      const i = PALETTES.findIndex((p) => p.id === current);
      const next = PALETTES[(i + 1) % PALETTES.length].id;
      save(STORAGE_KEYS.palette, next);
      return next;
    });
    setChanges((c) => c + 1);
  }, []);

  const toggleMode = useCallback(() => {
    setMode((m) => {
      const next = m === "dark" ? "light" : "dark";
      save(STORAGE_KEYS.mode, next);
      return next;
    });
    setChanges((c) => c + 1);
  }, []);

  return (
    <ThemeContext.Provider value={{ palette, mode, changes, setPalette, nextPalette, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
