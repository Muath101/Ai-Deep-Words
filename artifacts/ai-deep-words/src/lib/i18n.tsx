import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

export type Lang = "en" | "ar";

interface LangCtx {
  lang: Lang;
  dir: "ltr" | "rtl";
  isAr: boolean;
  setLang: (l: Lang) => void;
  toggle: () => void;
  /** Pick the right string for the active language. */
  tr: (en: string, ar: string) => string;
}

const Ctx = createContext<LangCtx | null>(null);

function getInitialLang(): Lang {
  if (typeof window !== "undefined") {
    const saved = window.localStorage.getItem("adw-lang");
    if (saved === "ar" || saved === "en") return saved;
  }
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang);
  const dir: "ltr" | "rtl" = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = dir;
    root.classList.toggle("ar", lang === "ar");
    window.localStorage.setItem("adw-lang", lang);
  }, [lang, dir]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const toggle = useCallback(() => setLangState((p) => (p === "en" ? "ar" : "en")), []);
  const tr = useCallback((en: string, ar: string) => (lang === "ar" ? ar : en), [lang]);

  return (
    <Ctx.Provider value={{ lang, dir, isAr: lang === "ar", setLang, toggle, tr }}>
      {children}
    </Ctx.Provider>
  );
}

export function useLang(): LangCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLang must be used within a LanguageProvider");
  return ctx;
}
