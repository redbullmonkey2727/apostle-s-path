import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { UILanguage, TranslationStrings, translations, languageLabels } from "./translations";

interface LanguageContextValue {
  lang: UILanguage;
  setLang: (l: UILanguage) => void;
  t: TranslationStrings;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => {},
  t: translations.en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<UILanguage>(() => {
    const saved = localStorage.getItem("ui-lang");
    return (saved as UILanguage) || "en";
  });

  const setLang = useCallback((l: UILanguage) => {
    setLangState(l);
    localStorage.setItem("ui-lang", l);
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  return useContext(LanguageContext);
}

export { languageLabels };
export type { UILanguage };
