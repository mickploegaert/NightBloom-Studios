export type CurrencyCode =
  | "EUR"
  | "USD"
  | "GBP"
  | "CNY"
  | "JPY"
  | "AED"
  | "SAR"
  | "CAD"
  | "AUD"
  | "CHF"
  | "INR";

export type Currency = {
  code: CurrencyCode;
  region: { en: string; nl: string };
  rate: number;
  step: number;
};

/** Rounded guides from the euro price. Not a live exchange rate. */
export const CURRENCIES: Currency[] = [
  { code: "EUR", region: { en: "Europe", nl: "Europa" }, rate: 1, step: 1 },
  { code: "USD", region: { en: "United States", nl: "Amerika" }, rate: 1.09, step: 50 },
  { code: "CNY", region: { en: "China", nl: "China" }, rate: 7.8, step: 100 },
  { code: "JPY", region: { en: "Japan", nl: "Japan" }, rate: 165, step: 1000 },
  { code: "AED", region: { en: "UAE", nl: "Arabisch · VAE" }, rate: 4, step: 100 },
  { code: "SAR", region: { en: "Saudi Arabia", nl: "Arabisch · Saudi-Arabië" }, rate: 4.1, step: 100 },
  { code: "GBP", region: { en: "United Kingdom", nl: "Verenigd Koninkrijk" }, rate: 0.84, step: 50 },
  { code: "CAD", region: { en: "Canada", nl: "Canada" }, rate: 1.5, step: 50 },
  { code: "AUD", region: { en: "Australia", nl: "Australië" }, rate: 1.65, step: 50 },
  { code: "CHF", region: { en: "Switzerland", nl: "Zwitserland" }, rate: 0.94, step: 50 },
  { code: "INR", region: { en: "India", nl: "India" }, rate: 91, step: 500 },
];

export function currencyByCode(code: string): Currency {
  return CURRENCIES.find((item) => item.code === code) ?? CURRENCIES[0];
}

export function convertFromEur(euros: number, currency: Currency): number {
  return Math.round((euros * currency.rate) / currency.step) * currency.step;
}

export function formatFromEur(euros: number, currency: Currency): string {
  const amount = convertFromEur(euros, currency);
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: currency.code,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatRange(min: number | null, max: number | null, currency: Currency): string {
  if (min == null && max != null) return `< ${formatFromEur(max, currency)}`;
  if (min != null && max == null) return `${formatFromEur(min, currency)}+`;
  if (min != null && max != null) return `${formatFromEur(min, currency)} – ${formatFromEur(max, currency)}`;
  return "";
}
