"use client";

import { useEffect, useRef, useState } from "react";
import { CURRENCIES, type CurrencyCode } from "../i18n/currency";
import { useLanguage } from "./LanguageProvider";
import { useCurrency } from "./CurrencyProvider";

export default function CurrencySwitch() {
  const { lang } = useLanguage();
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    window.addEventListener("mousedown", onPointer);
    return () => window.removeEventListener("mousedown", onPointer);
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center gap-3 border border-black/15 bg-white px-4 py-2 text-[11px] font-bold tracking-[0.18em] text-black uppercase dark:border-white/20 dark:bg-black dark:text-white"
      >
        <span>{currency.code}</span>
        <span className="font-medium tracking-normal normal-case text-black/45 dark:text-white/45">
          {currency.region[lang]}
        </span>
        <span aria-hidden className="text-black/40 dark:text-white/40">{open ? "–" : "+"}</span>
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-30 mt-2 max-h-80 w-64 overflow-auto border border-black/10 bg-white py-1 shadow-xl dark:border-white/15 dark:bg-black"
        >
          {CURRENCIES.map((item) => (
            <li key={item.code}>
              <button
                type="button"
                role="option"
                aria-selected={item.code === currency.code}
                onClick={() => {
                  setCurrency(item.code as CurrencyCode);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm ${
                  item.code === currency.code
                    ? "text-brand"
                    : "text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white"
                }`}
              >
                <span className="font-bold tracking-wide">{item.code}</span>
                <span className="text-xs">{item.region[lang]}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
