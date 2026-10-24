"use client";

import { useTheme } from "@/components/theme-provider";
import { SITE } from "@/data/site";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/notes", label: "Notes" },
];

const ITEM = "relative z-[1] inline-flex h-10 items-center rounded-full px-4 transition-colors duration-300";
const CLOSE_MS = 220;

type CardState = "closed" | "open" | "closing";

export function DockNav() {
  const pathname = usePathname();
  const { mode, toggleMode } = useTheme();
  const [card, setCard] = useState<CardState>("closed");
  const [copied, setCopied] = useState(false);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<number>();

  const open = card === "open";
  const current = NAV.find((n) => (n.href === "/" ? pathname === "/" : pathname.startsWith(n.href)))?.href ?? null;
  const highlighted = open ? "contact" : current;

  const close = useCallback(() => {
    setCard((c) => (c === "open" ? "closing" : c));
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setCard("closed"), CLOSE_MS);
  }, []);

  const toggle = () => {
    if (open) return close();
    window.clearTimeout(closeTimer.current);
    setCard("open");
  };

  // The highlight pill slides to whichever item is active.
  useLayoutEffect(() => {
    const measure = () => {
      const el = navRef.current?.querySelector<HTMLElement>(`[data-key="${highlighted}"]`);
      setPill(el ? { left: el.offsetLeft, width: el.offsetWidth } : null);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [highlighted]);

  // Close on navigation, Esc, or a tap outside the dock and card.
  useEffect(() => close(), [pathname, close]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open, close]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${SITE.email}`;
    }
  };

  return (
    <div ref={wrapRef} className="fixed bottom-[22px] left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-2.5">
      {card !== "closed" && (
        <div
          id="contact-card"
          role="dialog"
          aria-label="Contact"
          className={cn(
            "contact-card w-[min(340px,calc(100vw-32px))] rounded-[20px] border border-border bg-card p-[18px] shadow-[0_18px_50px_rgba(0,0,0,0.35)]",
            card === "closing" ? "card-out" : "card-in",
          )}
        >
          <p className="eyebrow">Say hello</p>
          <div className="mt-3 flex items-center justify-between gap-3">
            <a href={`mailto:${SITE.email}`} className="truncate text-[15px] font-medium hover:text-accent">
              {SITE.email}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="h-9 shrink-0 rounded-full border border-border px-3.5 font-mono text-[11px] uppercase tracking-[0.08em] hover:border-muted-foreground"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-1 border-t border-border pt-3">
            {SITE.socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 items-center rounded-lg px-2 text-[14px] hover:bg-muted hover:text-accent"
              >
                {s.name} ↗
              </a>
            ))}
          </div>
          {SITE.resumeUrl && (
            <a
              href={SITE.resumeUrl}
              download="Savi-Singh-Resume.pdf"
              className="mt-3 flex h-11 items-center justify-center gap-2 rounded-full bg-accent text-[14px] font-semibold text-accent-foreground hover:opacity-90"
            >
              Download full resume ↓
            </a>
          )}
        </div>
      )}

      <nav
        ref={navRef}
        aria-label="Primary"
        className="relative flex gap-0.5 rounded-full border border-border bg-card p-1 text-[13px] shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
      >
        {pill && (
          <span
            aria-hidden="true"
            className="absolute bottom-1 top-1 rounded-full bg-foreground transition-[left,width] duration-[450ms] ease-[cubic-bezier(.34,1.35,.64,1)]"
            style={{ left: pill.left, width: pill.width }}
          />
        )}
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            data-key={item.href}
            className={cn(ITEM, highlighted === item.href ? "text-background" : "hover:text-accent")}
          >
            {item.label}
          </Link>
        ))}
        <button
          type="button"
          data-key="contact"
          onClick={toggle}
          aria-expanded={open}
          aria-controls="contact-card"
          className={cn(ITEM, open ? "text-background" : "hover:text-accent")}
        >
          Contact
        </button>
        <span aria-hidden="true" className="mx-1 w-px self-stretch bg-border" />
        <button
          type="button"
          onClick={toggleMode}
          aria-label={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          className="relative z-[1] grid size-10 place-items-center rounded-full transition-colors hover:text-accent"
        >
          {mode === "dark" ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M21 13a9 9 0 1 1-10-10 7 7 0 0 0 10 10z" />
            </svg>
          )}
        </button>
      </nav>
    </div>
  );
}
