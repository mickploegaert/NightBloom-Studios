export type PackageId = "essential" | "advanced" | "custom";

export type Project = {
  title: string;
  image: string;
  link: string;
  focus: "top" | "center";
  package: PackageId;
  category: { en: string; nl: string };
  description: { en: string; nl: string };
};

export function packageLabel(id: PackageId, lang: "en" | "nl"): string {
  if (id === "essential") return "Essential";
  if (id === "advanced") return "Advanced";
  return lang === "nl" ? "Op maat" : "Custom";
}

export const PROJECTS: Project[] = [
  {
    title: "Axelfest",
    image: "/axelfestproject.jpg",
    link: "https://axelfest.nl",
    focus: "center",
    package: "advanced",
    category: { en: "Festival website", nl: "Festivalwebsite" },
    description: {
      en: "Ticket sales stay fast when the drop hits.",
      nl: "De kaartverkoop blijft snel als de drop begint.",
    },
  },
  {
    title: "Compa",
    image: "/compa-project.jpg",
    link: "https://compagass.com/",
    focus: "top",
    package: "essential",
    category: { en: "Creator website", nl: "Creatorwebsite" },
    description: {
      en: "A new video is ready every day at 15:00.",
      nl: "Elke dag om 15:00 staat er een nieuwe video.",
    },
  },
  {
    title: "Exclusive Masterpiece",
    image: "/exclusive-project.jpg",
    link: "https://exclusivemasterpiece.site/",
    focus: "center",
    package: "advanced",
    category: { en: "Watch dealer", nl: "Horlogedealer" },
    description: {
      en: "Buyers see the watch in the store before they deal.",
      nl: "Kopers zien het horloge in de winkel voordat ze kopen.",
    },
  },
  {
    title: "MK Studios",
    image: "/mkstudiosproject.png",
    link: "https://mkstudios.vercel.app/",
    focus: "center",
    package: "custom",
    category: { en: "Studio website", nl: "Studiosite" },
    description: {
      en: "Shows the work, the packages, and the price in the visitor's currency.",
      nl: "Toont het werk, de pakketten en de prijs in de valuta van de bezoeker.",
    },
  },
];
