// Color schemes for the whole site. Token values live in globals.css under
// [data-palette][data-mode]; these entries drive the recolor tile and portraits.

export type Mode = "dark" | "light";

export const PALETTES = [
  { id: "signal", name: "Signal", line: "Lava red. The default.", dark: "#FF4A1C", light: "#E8401A" },
  { id: "klein", name: "Klein", line: "The bluest blue.", dark: "#3D5BFF", light: "#2B45F0" },
  { id: "phosphor", name: "Phosphor", line: "Old terminal, new tricks.", dark: "#3BFF7A", light: "#0E9F4A" },
  { id: "ultraviolet", name: "Ultraviolet", line: "After midnight.", dark: "#A86BFF", light: "#7A3BEB" },
  { id: "sodium", name: "Sodium", line: "Streetlight on a dog walk.", dark: "#FFB020", light: "#D98A00" },
  { id: "mono", name: "Mono", line: "Just the facts.", dark: "#F2F2F2", light: "#111111" },
] as const;

export type PaletteId = (typeof PALETTES)[number]["id"];

export const DEFAULT_PALETTE: PaletteId = "signal";
export const DEFAULT_MODE: Mode = "dark";

export const STORAGE_KEYS = { palette: "savi-palette", mode: "savi-mode" } as const;

// Runs in <head> before paint so a returning visitor never sees the default flash.
export const THEME_INIT_SCRIPT = `(function(){var d=document.documentElement;var p="${DEFAULT_PALETTE}",m="${DEFAULT_MODE}";try{p=localStorage.getItem("${STORAGE_KEYS.palette}")||p;m=localStorage.getItem("${STORAGE_KEYS.mode}")||m;}catch(e){}d.dataset.palette=p;d.dataset.mode=m;})();`;

// Which illustrated portrait suits the current scheme.
export function portraitFor(palette: PaletteId, mode: Mode): "light" | "dark" | "blue" {
  if (mode === "light") return "light";
  return palette === "klein" || palette === "ultraviolet" ? "blue" : "dark";
}

// Edge color of each portrait image, so the frame blends into it.
export const PORTRAIT_BG = { light: "#FEFEFE", dark: "#0E0D12", blue: "#0E0F15" } as const;
