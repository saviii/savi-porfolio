"use client";

import { cn } from "@/lib/utils";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export type TileDef = {
  id: string;
  name: string;
  // Grid spans for each breakpoint.
  className: string;
  // Shown when someone shakes the tile.
  shake: string;
  nudge?: boolean;
  content: React.ReactNode;
};

type Point = { x: number; y: number };
type Pos = Point & { r: number };

type Drag = {
  id: string;
  sx: number;
  sy: number;
  lx: number;
  dir: number;
  rev: number;
  moved: boolean;
  next: Pos | null;
};

const INTERACTIVE = "button,a,input,label,select,textarea,pre";

export function HomeGrid({ tiles }: { tiles: TileDef[] }) {
  const ids = tiles.map((t) => t.id);
  const [order, setOrder] = useState<string[]>(ids);
  const [pos, setPos] = useState<Record<string, Pos>>({});
  const [flip, setFlip] = useState<Record<string, Point>>({});
  const [flipping, setFlipping] = useState(false);
  const [dragId, setDragId] = useState<string | null>(null);
  const [over, setOver] = useState<string | null>(null);
  const [top, setTop] = useState<string | null>(null);
  const [wob, setWob] = useState<string | null>(null);
  const [toast, setToast] = useState("");

  const gridRef = useRef<HTMLDivElement>(null);
  const drag = useRef<Drag | null>(null);
  const overRef = useRef<string | null>(null);
  const raf = useRef(0);
  const flipFrom = useRef<{ from: Record<string, Point>; pos: Record<string, Point> } | null>(null);
  const timers = useRef<{ toast?: number; wob?: number }>({});

  // Layout position of every tile, ignoring transforms.
  const measure = () => {
    const m: Record<string, Point> = {};
    gridRef.current?.querySelectorAll<HTMLElement>("[data-tile]").forEach((el) => {
      m[el.dataset.tile!] = { x: el.offsetLeft, y: el.offsetTop };
    });
    return m;
  };

  // FLIP: after a reorder, start each tile where it was and spring it home.
  useLayoutEffect(() => {
    if (!flipFrom.current) return;
    const { from, pos: offsets } = flipFrom.current;
    flipFrom.current = null;
    const to = measure();
    const next: Record<string, Point> = {};
    for (const id of Object.keys(to)) {
      if (!from[id]) continue;
      const o = offsets[id] ?? { x: 0, y: 0 };
      const dx = from[id].x + o.x - to[id].x;
      const dy = from[id].y + o.y - to[id].y;
      if (Math.abs(dx) + Math.abs(dy) > 1) next[id] = { x: dx, y: dy };
    }
    setFlip(next);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setFlip({});
        setFlipping(false);
      }),
    );
  }, [order]);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      const d = drag.current;
      if (!d) return;
      const dx = e.clientX - d.sx;
      const dy = e.clientY - d.sy;
      if (!d.moved) {
        if (Math.abs(dx) + Math.abs(dy) < 5) return;
        d.moved = true;
        setDragId(d.id);
        setTop(d.id);
      }
      const vx = e.clientX - d.lx;
      d.lx = e.clientX;
      const s = Math.sign(vx);
      if (Math.abs(vx) > 4 && s !== d.dir) {
        if (d.dir !== 0) d.rev++;
        d.dir = s;
      }
      d.next = { x: dx, y: dy, r: Math.max(-14, Math.min(14, vx * 0.9)) };
      if (!raf.current) {
        raf.current = requestAnimationFrame(() => {
          raf.current = 0;
          const cur = drag.current;
          if (cur?.next) setPos((p) => ({ ...p, [cur.id]: cur.next! }));
        });
      }

      let target: string | null = null;
      for (const el of document.elementsFromPoint(e.clientX, e.clientY)) {
        const tile = (el as HTMLElement).closest<HTMLElement>("[data-tile]");
        if (tile && tile.dataset.tile !== d.id) {
          target = tile.dataset.tile!;
          break;
        }
      }
      if (target !== overRef.current) {
        overRef.current = target;
        setOver(target);
      }
    };

    const up = () => {
      const d = drag.current;
      drag.current = null;
      if (!d || !d.moved) return;
      const last = d.next ?? { x: 0, y: 0, r: 0 };
      const target = overRef.current;
      overRef.current = null;
      setOver(null);
      setDragId(null);

      if (target && target !== d.id) {
        flipFrom.current = { from: measure(), pos: { [d.id]: { x: last.x, y: last.y } } };
        setFlipping(true);
        setOrder((o) => {
          const n = [...o];
          const a = n.indexOf(d.id);
          const b = n.indexOf(target);
          [n[a], n[b]] = [n[b], n[a]];
          return n;
        });
        setPos((p) => {
          const n = { ...p };
          delete n[d.id];
          return n;
        });
        return;
      }

      // Dropped on nothing: spring back with a wobble.
      setPos((p) => {
        const n = { ...p };
        delete n[d.id];
        return n;
      });
      setWob(d.id);
      window.clearTimeout(timers.current.wob);
      timers.current.wob = window.setTimeout(() => setWob(null), 750);
      if (d.rev >= 4) {
        setToast(tiles.find((t) => t.id === d.id)?.shake ?? "Shaken, not stirred.");
        window.clearTimeout(timers.current.toast);
        timers.current.toast = window.setTimeout(() => setToast(""), 2200);
      }
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    const t = timers.current;
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.clearTimeout(t.toast);
      window.clearTimeout(t.wob);
      cancelAnimationFrame(raf.current);
    };
  }, [tiles]);

  const onPointerDown = (id: string, e: React.PointerEvent) => {
    // Touch scrolls the page instead; drag is a pointer-device toy.
    if (e.pointerType === "touch" || e.button !== 0) return;
    if ((e.target as HTMLElement).closest(INTERACTIVE)) return;
    drag.current = { id, sx: e.clientX, sy: e.clientY, lx: e.clientX, dir: 0, rev: 0, moved: false, next: null };
  };

  const resetLayout = () => {
    flipFrom.current = { from: measure(), pos: {} };
    setFlipping(true);
    setOrder(ids);
    setPos({});
  };

  const moved = order.some((id, i) => id !== ids[i]);
  const overName = tiles.find((t) => t.id === over)?.name;
  const hint = dragId ? (over ? `Drop to swap with ${overName}` : "Drop on another tile to swap") : toast;

  return (
    <>
      {moved && (
        <button
          type="button"
          onClick={resetLayout}
          className="pop fixed right-5 top-5 z-[45] inline-flex h-10 items-center gap-2 rounded-full border border-dashed border-accent bg-background px-3.5 font-mono text-[11px] uppercase tracking-[0.08em]"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" />
          </svg>
          Reset layout
        </button>
      )}

      <div
        ref={gridRef}
        className="grid grid-cols-12 gap-3.5 [grid-auto-flow:row_dense]"
        style={{ userSelect: dragId ? "none" : undefined }}
      >
        {tiles.map((t) => {
          const p = pos[t.id] ?? { x: 0, y: 0, r: 0 };
          const f = flip[t.id] ?? { x: 0, y: 0 };
          const dragging = dragId === t.id;
          const isOver = over === t.id;
          return (
            <article
              key={t.id}
              data-tile={t.id}
              onPointerDown={(e) => onPointerDown(t.id, e)}
              className={cn("htile col-span-12", t.className, t.nudge && "nudge", wob === t.id && "wobble")}
              style={{
                order: order.indexOf(t.id),
                transform: `translate(${p.x + f.x}px, ${p.y + f.y}px) rotate(${p.r}deg) scale(${dragging ? 1.03 : isOver ? 0.97 : 1})`,
                transition: dragging
                  ? "transform .1s ease-out, box-shadow .2s"
                  : flipping
                    ? "none"
                    : "transform .7s cubic-bezier(.34,1.4,.64,1), box-shadow .3s, border-color .3s",
                zIndex: dragging ? 999 : top === t.id ? 2 : 1,
                boxShadow: dragging
                  ? "0 34px 70px rgba(0,0,0,.45)"
                  : isOver
                    ? "0 0 0 2px hsl(var(--accent)), 0 0 0 10px hsl(var(--accent) / .25)"
                    : "none",
              }}
            >
              <span className="grip" aria-hidden="true">
                <svg width="7" height="13" viewBox="0 0 12 16" fill="currentColor">
                  <circle cx="3.5" cy="3" r="1.5" />
                  <circle cx="8.5" cy="3" r="1.5" />
                  <circle cx="3.5" cy="8" r="1.5" />
                  <circle cx="8.5" cy="8" r="1.5" />
                  <circle cx="3.5" cy="13" r="1.5" />
                  <circle cx="8.5" cy="13" r="1.5" />
                </svg>
              </span>
              {t.content}
            </article>
          );
        })}
      </div>

      {hint && (
        <div role="status" className="fixed bottom-[84px] left-1/2 z-50 -translate-x-1/2">
          <div className="pop whitespace-nowrap rounded-full bg-accent px-4 py-2.5 font-mono text-xs text-accent-foreground">
            {hint}
          </div>
        </div>
      )}
    </>
  );
}
