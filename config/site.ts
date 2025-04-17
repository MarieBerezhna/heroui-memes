export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "HeroUI Memes",
  description:
    "This is a test-task project I made trying to get Junior Dev job at LEIME",
  navItems: [
    {
      label: "Table",
      href: "/table",
    },
    {
      label: "List",
      href: "/list",
    },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
