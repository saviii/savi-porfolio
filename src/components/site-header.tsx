"use client";

import { SITE } from "@/data/site";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/work", label: "Work" },
  { href: "/notes", label: "Notes" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 -mx-4 mb-6 px-4 pt-4 sm:-mx-6 sm:px-6">
      <nav className="flex items-center justify-between rounded-full border border-foreground/10 bg-card/80 py-2 pl-2 pr-2 shadow-sm backdrop-blur-md">
        <Link
          href="/"
          className="group flex items-center gap-2 rounded-full py-1 pl-1 pr-3"
        >
          <span className="grid size-8 place-items-center rounded-full bg-tomato font-display text-sm font-bold text-card transition-transform group-hover:rotate-12">
            {SITE.initials[0]}
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            {SITE.name}
          </span>
        </Link>
        <ul className="flex items-center gap-1">
          {NAV.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-sm font-medium transition-colors sm:px-4",
                    active
                      ? "bg-ink text-card"
                      : "text-foreground/70 hover:bg-secondary hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li className="hidden sm:block">
            <a
              href={`mailto:${SITE.email}`}
              className="ml-1 rounded-full bg-tomato px-4 py-1.5 text-sm font-medium text-card transition-opacity hover:opacity-90"
            >
              Say hi
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
