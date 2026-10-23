import { SITE } from "@/data/site";

export function SiteFooter() {
  const updated = new Date(`${SITE.lastUpdated}T00:00:00`).toLocaleDateString(
    "en-US",
    { month: "long", day: "numeric", year: "numeric" },
  );

  return (
    <footer className="flex flex-col gap-4 border-t border-foreground/10 py-8 text-sm text-foreground/60 sm:flex-row sm:items-center sm:justify-between">
      <p>
        © {new Date().getFullYear()} {SITE.name}. Always a work in progress, last
        tinkered with {updated}.
      </p>
      <ul className="flex gap-4">
        {SITE.socials.map((s) => (
          <li key={s.name}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-tomato"
            >
              {s.name}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
