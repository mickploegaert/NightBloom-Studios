export type Lang = "en" | "nl";

export const translations = {
  nav_home: { en: "Home", nl: "Home" },
  nav_about: { en: "About", nl: "Over ons" },
  nav_work: { en: "Our Work", nl: "Ons Werk" },
  nav_websites: { en: "Websites", nl: "Websites" },
  nav_contact: { en: "Contact", nl: "Contact" },
  nav_lets_talk: { en: "Let's Talk", nl: "Laten we praten" },

  hero_label: { en: "MK STUDIOS", nl: "MK STUDIOS" },
  hero_heading_1: { en: "Where ideas", nl: "Waar ideeën" },
  hero_heading_2: { en: "blossom.", nl: "bloeien." },
  hero_subtitle: {
    en: "We design and build digital experiences that inspire, connect, and grow.",
    nl: "Wij ontwerpen en bouwen digitale ervaringen die inspireren, verbinden en laten groeien.",
  },
  hero_cta_primary: { en: "Get Started", nl: "Aan de slag" },
  hero_cta_secondary: { en: "Our Work →", nl: "Ons werk →" },

  footer_tagline: {
    en: "Let's build something brilliant together.",
    nl: "Laten we samen iets geweldigs bouwen.",
  },
  footer_location: {
    en: "Zeeland, NL.\nWe design and build digital experiences that inspire, connect, and grow.",
    nl: "Zeeland, NL.\nWij ontwerpen en bouwen digitale ervaringen die inspireren, verbinden en laten groeien.",
  },
  footer_rights: { en: "ALL RIGHTS RESERVED.", nl: "ALLE RECHTEN VOORBEHOUDEN." },
  footer_made_in: { en: "MADE IN THE NETHERLANDS", nl: "GEMAAKT IN NEDERLAND" },

  newsletter_heading: { en: "Stay in the loop", nl: "Blijf op de hoogte" },
  newsletter_subtext: {
    en: "Occasional updates on new projects and openings. No spam.",
    nl: "Af en toe een update over nieuwe projecten. Geen spam.",
  },
  newsletter_placeholder: { en: "you@company.com", nl: "jij@bedrijf.nl" },
  newsletter_button: { en: "Subscribe", nl: "Aanmelden" },
  newsletter_success: { en: "You're in! Thanks for subscribing.", nl: "Gelukt! Bedankt voor je aanmelding." },
} as const;

export type TranslationKey = keyof typeof translations;
