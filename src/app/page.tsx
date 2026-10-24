import { BioTile } from "@/components/home/bio-tile";
import { GitHubTile } from "@/components/home/github-tile";
import { HomeGrid, type TileDef } from "@/components/home/home-grid";
import { LoopTile } from "@/components/home/loop-tile";
import { NotesTile } from "@/components/home/notes-tile";
import { RecolorTile } from "@/components/home/recolor-tile";
import { getGitHub } from "@/data/github";
import { getNotes } from "@/data/notes";
import { SITE } from "@/data/site";

export const revalidate = 86400;

export default async function Home() {
  const [notes, github] = await Promise.all([getNotes(), getGitHub(SITE.githubUser, SITE.featuredRepos)]);

  const noteLinks = notes
    .slice(0, 2)
    .map((n) => ({
      slug: n.slug,
      title: n.metadata.title,
      date: new Date(`${n.metadata.publishedAt}T00:00:00`).toLocaleDateString("en-US", { month: "short", day: "2-digit" }),
    }));

  // One-liners the dog brings back.
  const thoughts = [
    { text: "Every push notification is an ad for your app.", link: "On push notifications", href: "" },
    { text: "The model is the easy part. Taste is the hard part.", link: "On LLM ranking", href: "" },
    { text: "Earn the ask, then ask.", link: "On permission-first onboarding", href: "" },
    { text: "Would I pay to send this? If not, don't.", link: "The push gut check", href: "" },
    { text: "PMs who can sketch in code ask better questions.", link: "Why I prototype in code", href: "" },
  ];

  const tiles: TileDef[] = [
    { id: "bio", name: "Hello", className: "md:col-span-6 lg:col-span-5", shake: "Hi. Still here.", content: <BioTile /> },
    { id: "notes", name: "Notes", className: "md:col-span-6 lg:col-span-7", shake: "Drafts everywhere.", content: <NotesTile notes={noteLinks} /> },
    {
      id: "gh",
      name: "GitHub",
      className: "md:col-span-12 lg:col-span-8",
      shake: "git push --force? Bold.",
      nudge: true,
      content: <GitHubTile user={SITE.githubUser} data={github} />,
    },
    { id: "dog", name: "The loop", className: "md:col-span-6 lg:col-span-4", shake: "Woof. He's dizzy now.", content: <LoopTile thoughts={thoughts} /> },
    { id: "color", name: "Recolor", className: "md:col-span-6 lg:col-span-12", shake: "Wheeee.", content: <RecolorTile /> },
  ];

  return (
    <>
      <section className="flex flex-col gap-11 pb-[52px]">
        <h1 className="rise text-balance text-[52px] font-semibold leading-[0.92] tracking-[-0.055em] md:text-[88px] lg:text-[124px]">
          Product person building things that{" "}
          <span className="font-doto tracking-[-0.02em] text-accent">learn</span>
          <span className="caret" aria-hidden="true" />
        </h1>
        <p className="max-w-[620px] border-t border-border pt-[26px] text-xl leading-normal">
          Consumer products and applied AI, from zero to millions.
        </p>
      </section>

      <HomeGrid tiles={tiles} />
    </>
  );
}
