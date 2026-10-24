// Single place to edit everything that isn't a note or a case study.

export const SITE = {
  name: "Savi Singh",
  firstName: "Savi",
  initials: "SS",
  url: "https://savi-portfolio.vercel.app",
  role: "Principal Product Manager",
  company: "Yahoo Finance",
  location: "San Francisco, CA",
  email: "savipablas@gmail.com",
  avatarUrl: "/me.png",
  // Illustrated portraits; the homepage swaps between them with the color scheme.
  portraits: {
    light: "/portraits/light.webp",
    dark: "/portraits/dark.webp",
    blue: "/portraits/blue.webp",
  },
  githubUser: "saviii",
  // Repos featured on the homepage GitHub tile, in order. Any owner works (orgs too).
  // `description` overrides GitHub's when the repo doesn't have one.
  featuredRepos: [
    { repo: "meelni/meelni-prep", description: "AI voice agents that run PM mock interviews." },
    { repo: "vexorlabs/beacon", description: "Chrome DevTools for AI agents." },
    { repo: "saviii/savi-porfolio", description: "This site." },
  ],
  // Leave empty to hide the resume link in the footer.
  resumeUrl: "/resume.pdf",
  tagline:
    "Embracing the unknown: a PM on a quest to build, learn, and discover the magic in tech and life (with a few dog walks along the way).",
  description:
    "Savi Singh is a product leader with 10+ years building consumer products at Yahoo Finance, SmartNews, and Medium. Notes on products, AI, and the things in between.",
  lastUpdated: "2026-10-23",

  socials: [
    { name: "LinkedIn", href: "https://www.linkedin.com/in/saviii/" },
    { name: "X", href: "https://x.com/SaviPabla" },
    { name: "GitHub", href: "https://github.com/saviii" },
    { name: "Medium", href: "https://savi.medium.com/" },
  ],

  // The "Now" tile. Edit these one-liners whenever life changes.
  now: [
    { label: "Building", value: "Core platform, taxonomy & follow signals at Yahoo Finance" },
    { label: "Obsessing over", value: "LLMs as product infrastructure, not features" },
    { label: "Reading", value: "Whatever's on the nightstand this week" },
    { label: "Walking", value: "The dog, daily, non-negotiable" },
  ],

  // Headline numbers pulled from the work history.
  numbers: [
    { value: "+7%", label: "Day-7 retention from a GenAI ranking system" },
    { value: "+8%", label: "revenue from a push notification overhaul" },
    { value: "13×", label: "DAU growth on Evie, 30k → 400k" },
    { value: "+12%", label: "user comments after Medium's new responses" },
  ],

  stack: [
    "Cursor",
    "Notion",
    "Figma",
    "SQL",
    "Redash",
    "Tableau",
    "Jupyter",
    "JIRA",
    "Canva",
    "Google Analytics",
  ],

  // The "Loving / Bugging me" tile. Swap these out every so often.
  hotTakes: {
    loving: {
      title: "Cursor",
      body: "The first tool in years that changed how I prototype. PMs who can sketch in code ask better questions.",
    },
    bugging: {
      title: "Permission-first onboarding",
      body: "Asking for push permission before showing a shred of value. Earn the ask, then ask.",
    },
  },

  // Work history, newest first. Mirrors the resume; drives /work and /about.
  experience: [
    {
      company: "Yahoo Finance",
      title: "Principal Product Manager, AI",
      period: "Dec 2024 – Present",
      years: "2024 – now",
      line: "Took AlphaSpace from zero to launch, and built LLM experiences across news and portfolios.",
    },
    {
      company: "ODF27",
      title: "Founder Fellow",
      period: "Feb 2026 – May 2026",
      years: "2026",
      line: "Explored LLM evals and voice AI.",
    },
    {
      company: "SmartNews",
      title: "Senior PM, Mobile Apps & RecSys",
      period: "Jun 2022 – Nov 2024",
      years: "2022 – 2024",
      line: "Launched AI-powered ranking and overhauled push notifications.",
    },
    {
      company: "Medium",
      title: "Product Manager, Mobile Apps",
      period: "Jul 2019 – Mar 2022",
      years: "2019 – 2022",
      line: "Redesigned the iOS and Android apps and launched a new commenting experience.",
    },
    {
      company: "Evie Labs",
      title: "Product Manager · acquired by Medium",
      period: "Nov 2016 – Jul 2019",
      years: "2016 – 2019",
      line: "Led product for Evie, the #1-rated Android launcher.",
    },
    {
      company: "DirecTV",
      title: "Senior QA Engineer",
      period: "Jun 2013 – Oct 2016",
      years: "2013 – 2016",
      line: "Led QA strategy for NFL Sunday Ticket and March Madness.",
    },
  ],

  // Side projects, shown under the work timeline.
  projects: [
    { name: "Meelni", href: "http://meelni.com", line: "AI voice agents that run PM mock interviews." },
    { name: "Beacon", href: "https://github.com/vexorlabs/beacon", line: "Observability for autonomous AI agents." },
  ],

  talks: [
    {
      title: "How a news app decides what to push you",
      where: "UC Berkeley",
      date: "Nov 2023",
      href: "",
    },
  ],

  // Shown in the homepage notes tile under "Written about the work".
  press: [
    {
      title: "Threaded responses",
      outlet: "Medium Blog",
      href: "https://blog.medium.com/take-conversations-deeper-with-threaded-responses-1d1ec6e475e3",
    },
    {
      title: "A relational Medium on mobile",
      outlet: "Medium Blog",
      href: "https://blog.medium.com/a-relational-medium-on-mobile-1c9c2111301d",
    },
  ],
} as const;
