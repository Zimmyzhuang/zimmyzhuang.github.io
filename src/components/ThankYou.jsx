import { useState, useCallback } from "react";
import CONFIG from "../config";
import { useLanguage, t } from "../LanguageContext";
import PhotoFrame from "./PhotoFrame";
import "./ThankYou.css";

export default function ThankYou({ onHome }) {
  const { lang } = useLanguage();
  const thankYou = t(CONFIG.slides.thankYou, lang);
  const s = CONFIG.strings[lang];
  const [muted, setMuted] = useState(false);
  const [paused, setPaused] = useState(false);

  const toggleMute = useCallback(() => {
    setMuted((m) => {
      const next = !m;
      if (window.__whisperAudio) window.__whisperAudio.muted = next;
      return next;
    });
  }, []);

  const togglePause = useCallback(() => {
    setPaused((p) => {
      const next = !p;
      if (window.__whisperAudio) {
        if (next) window.__whisperAudio.pause();
        else window.__whisperAudio.play().catch(() => {});
      }
      return next;
    });
  }, []);

  return (
    <div className="thankyou">
      <div className="thankyou-bg">
        <div className="thankyou-blob blob-1" />
        <div className="thankyou-blob blob-2" />
        <div className="thankyou-blob blob-3" />
      </div>
      <div className="thankyou-content">
        <PhotoFrame src={thankYou.photo} size="medium" rotate={-2} delay={0.2} />
        <span className="thankyou-emoji anim-ty-scale" style={{ animationDelay: "0.5s" }}>{thankYou.emoji}</span>
        <h1 className="thankyou-title anim-ty-fade" style={{ animationDelay: "0.7s" }}>
          {thankYou.title}
        </h1>
        <p className="thankyou-subtitle anim-ty-fade" style={{ animationDelay: "1s" }}>
          {thankYou.subtitle}
        </p>
        <div className="thankyou-footer anim-ty-fade" style={{ animationDelay: "1.4s" }}>
          <p className="thankyou-credits">{s.thankYouCredits}</p>
          <p className="thankyou-year">{s.thankYouYear}</p>
        </div>
      </div>

      <button className="thankyou-home-btn" onClick={() => onHome?.()} aria-label="Go to start">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12l9-9 9 9" />
          <path d="M5 10v10a1 1 0 001 1h3v-6h6v6h3a1 1 0 001-1V10" />
        </svg>
      </button>

      <button className="thankyou-pause-btn" onClick={togglePause} aria-label={paused ? "Play" : "Pause"}>
        {paused ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <polygon points="6 3 20 12 6 21 6 3" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <rect x="5" y="3" width="5" height="18" rx="1" />
            <rect x="14" y="3" width="5" height="18" rx="1" />
          </svg>
        )}
      </button>

      <button className="thankyou-mute-btn" onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"}>
        {muted ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        )}
      </button>
    </div>
  );
}
