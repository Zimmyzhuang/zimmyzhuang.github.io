import { createContext, useContext, useState } from "react";

const LanguageContext = createContext({ lang: "zh", setLang: () => {} });

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("zh");
  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

/**
 * Merge English overrides from config.en into the config object.
 * When lang === "zh", returns the config as-is.
 * When lang === "en", spreads config.en on top.
 */
export function t(config, lang) {
  if (lang === "en" && config.en) {
    return { ...config, ...config.en };
  }
  return config;
}
