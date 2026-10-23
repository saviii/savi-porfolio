// Single place to edit everything that isn't a note or a case study.

export const SITE = {
  name: "Savi Singh",
  firstName: "Savi",
  initials: "SS",
  url: "https://savi-portfolio.vercel.app",
  role: "Senior Product Manager",
  company: "Yahoo Finance",
  location: "San Francisco, CA",
  email: "savipablas@gmail.com",
  avatarUrl: "/me.png",
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

  // Chronological history for the About page.
  experience: [
    { company: "Yahoo Finance", title: "Senior Product Manager", period: "Dec 2024 – Now" },
    { company: "SmartNews", title: "Senior Product Manager", period: "2022 – 2024" },
    { company: "Medium", title: "Product Manager, Mobile Apps", period: "2019 – 2022" },
    { company: "Evie Labs (acq. by Medium)", title: "Product Manager", period: "2016 – 2019" },
    { company: "DirecTV", title: "Senior QA Engineer", period: "2013 – 2016" },
  ],
} as const;
