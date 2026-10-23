// Case studies. Each one renders at /work/[slug].
// Keep them short: what was the problem, what did you do, what happened.

export type CaseStudy = {
  slug: string;
  company: string;
  title: string;
  blurb: string;
  years: string;
  color: "butter" | "sage" | "sky" | "lilac" | "tomato" | "card";
  metric?: { value: string; label: string };
  tags: string[];
  context: string;
  approach: string[];
  outcome: string;
  links?: { label: string; href: string }[];
  inProgress?: boolean;
};

export const WORK: CaseStudy[] = [
  {
    slug: "yahoo-finance-core-platform",
    company: "Yahoo Finance",
    title: "The plumbing behind every Yahoo Finance product",
    blurb:
      "Leading the Core Product Platform team: shared services, a content taxonomy, and follow signals.",
    years: "2024 – now",
    color: "sky",
    tags: ["Platform", "Taxonomy", "Personalization"],
    inProgress: true,
    context:
      "Yahoo Finance runs many products on top of a common set of services. When those foundations are inconsistent, every team pays for it in reliability and speed.",
    approach: [
      "Leading the Core Product Platform team that builds and maintains foundational services used across multiple Yahoo Finance products.",
      "Directing the build-out of a content taxonomy and follow signals, so the product understands what people care about.",
      "Prioritizing reliability and scalability work alongside new capabilities.",
    ],
    outcome:
      "In progress. More to share once it ships.",
  },
  {
    slug: "smartnews-ai-ranking",
    company: "SmartNews",
    title: "Teaching a news feed what's worth reading",
    blurb:
      "Integrated a GenAI-powered ranking system that scores every article before it reaches the feed.",
    years: "2022 – 2023",
    color: "butter",
    metric: { value: "+7%", label: "Day-7 retention" },
    tags: ["Generative AI", "Ranking", "Prompt engineering"],
    context:
      "A news feed lives or dies by relevance. Traditional signals told us what people clicked, not whether an article was actually worth their time.",
    approach: [
      "Initiated and led the integration of a generative-AI-powered ranking system into SmartNews.",
      "Developed and productionized prompts that score each article on key attributes, feeding those scores into ranking decisions.",
      "Worked across engineering, ML, and data science to take it from experiment to production.",
    ],
    outcome:
      "Article relevance improved significantly, and Day-7 retention rose by 7%.",
  },
  {
    slug: "smartnews-push",
    company: "SmartNews",
    title: "Rebuilding push notifications from the ground up",
    blurb:
      "New vision and roadmap for the push system: fewer, better, more personal notifications.",
    years: "2022 – 2023",
    color: "tomato",
    metric: { value: "+8%", label: "revenue" },
    tags: ["Notifications", "Engagement", "Personalization"],
    context:
      "Push is the most direct line to a user, and the easiest one to burn. The existing system wasn't built for personalization.",
    approach: [
      "Developed the product vision and roadmap to overhaul the push notification system.",
      "Focused on relevance and timing to improve engagement without adding noise.",
      "Also led a cross-functional team of 20+ engineers, designers, and data scientists to build, launch, and manage SmartNews 2.0.",
    ],
    outcome: "The overhaul drove an 8% increase in revenue.",
  },
  {
    slug: "medium-threaded-responses",
    company: "Medium",
    title: "Making conversations on Medium worth having",
    blurb:
      "Led Threaded Responses, which changed how readers talk to writers and each other.",
    years: "2020 – 2021",
    color: "sage",
    metric: { value: "+12%", label: "user comments" },
    tags: ["Community", "UX", "GTM"],
    context:
      "Responses on Medium were flat and hard to follow, so good conversations got lost.",
    approach: [
      "Led development and launch of Threaded Responses across mobile and web.",
      "Developed and executed the go-to-market strategy for the improved response experience.",
      "Partnered with design, engineering, and marketing from concept through launch.",
    ],
    outcome:
      "More focused, organized conversations, and a 12% increase in user comments.",
    links: [
      {
        label: "Launch post",
        href: "https://blog.medium.com/take-conversations-deeper-with-threaded-responses-1d1ec6e475e3",
      },
    ],
  },
  {
    slug: "medium-mobile-redesign",
    company: "Medium",
    title: "Redesigning Medium on iOS and Android",
    blurb:
      "A ground-up redesign of the Medium mobile apps, built around relationships between readers and writers.",
    years: "2019 – 2022",
    color: "lilac",
    tags: ["Mobile", "Redesign", "iOS & Android"],
    context:
      "The mobile apps were where readers spent their time, but the experience hadn't kept up with what Medium wanted to be.",
    approach: [
      "Led the comprehensive redesign of the Medium app on iOS and Android.",
      "Worked closely with design, engineering, and marketing to rebuild the UI and UX from the ground up.",
    ],
    outcome: "A more relational Medium on mobile, shipped on both platforms.",
    links: [
      {
        label: "Launch post",
        href: "https://blog.medium.com/a-relational-medium-on-mobile-1c9c2111301d",
      },
    ],
  },
  {
    slug: "evie-launcher",
    company: "Evie Labs",
    title: "Growing the #1 rated Android launcher",
    blurb: "Managed Evie Launcher from a scrappy favorite to hundreds of thousands of daily users.",
    years: "2016 – 2019",
    color: "card",
    metric: { value: "30k → 400k", label: "daily active users" },
    tags: ["Android", "Growth", "Startup"],
    context:
      "Evie was a small team with a beloved product in a crowded category: Android home-screen launchers.",
    approach: [
      "Owned the product for the #1 rated Android launcher.",
      "Drove the roadmap through Evie's acquisition by Medium.",
    ],
    outcome: "DAUs scaled from 30k to 400k.",
  },
];

export function getCaseStudy(slug: string) {
  return WORK.find((w) => w.slug === slug);
}
