"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { currencyByCode, type Currency, type CurrencyCode } from "../i18n/currency";

type CurrencyContextValue = {
  currency: Currency;
  setCurrency: (code: CurrencyCode) => void;
};

const CurrencyContext = createContext<CurrencyContextValue | undefined>(undefined);
const STORAGE_KEY = "mk-currency";

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(currencyByCode("EUR"));

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) setCurrencyState(currencyByCode(stored));
  }, []);

  const setCurrency = (code: CurrencyCode) => {
    const next = currencyByCode(code);
    setCurrencyState(next);
    window.localStorage.setItem(STORAGE_KEY, next.code);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within a CurrencyProvider");
  return ctx;
}
