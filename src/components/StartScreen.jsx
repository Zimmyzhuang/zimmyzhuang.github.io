import { useState } from "react";
import CONFIG from "../config";
import { useLanguage } from "../LanguageContext";
import "./StartScreen.css";

export default function StartScreen({ onStart }) {
  const [exiting, setExiting] = useState(false);
  const { lang, setLang } = useLanguage();
  const s = CONFIG.strings[lang];
  const displayName = lang === "en" ? CONFIG.nameEn : CONFIG.name;

  const handleClick = () => {
    setExiting(true);
    setTimeout(onStart, 600);
  };

  const toggleLang = (e) => {
    e.stopPropagation();
    setLang(lang === "zh" ? "en" : "zh");
  };

  return (
    <div className={`start-screen ${exiting ? "exit" : ""}`}>
      <div className="start-bg-glow" />

      {/* Language toggle */}
      <button className="lang-toggle" onClick={toggleLang} aria-label="Switch language">
        <span className={`lang-label lang-label--en ${lang === "en" ? "active" : ""}`}>EN</span>
        <span className={`lang-toggle-track ${lang === "zh" ? "lang-toggle-track--zh" : ""}`}>
          <span className="lang-toggle-thumb" />
        </span>
        <span className={`lang-label lang-label--zh ${lang === "zh" ? "active" : ""}`}>中</span>
      </button>

      <div className="start-content">
        <div className="start-logo">
          <div className="start-logo-bars">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="bar" style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
        </div>
        <h1 className="start-title">
          <span className="start-name">{s.startTitle(displayName)}</span>
          <br />
          <span className="start-wrapped">{s.startWrapped}</span>
        </h1>
        <p className="start-year">2026</p>
        <button className="start-button" onClick={handleClick}>
          <span>{s.startButton}</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
          </svg>
        </button>
      </div>
      <p className="start-footnote">{s.startFootnote}</p>
    </div>
  );
}
