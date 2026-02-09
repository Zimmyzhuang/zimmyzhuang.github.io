import { useState } from "react";
import CONFIG from "../config";
import "./StartScreen.css";

export default function StartScreen({ onStart }) {
  const [exiting, setExiting] = useState(false);

  const handleClick = () => {
    setExiting(true);
    setTimeout(onStart, 600);
  };

  return (
    <div className={`start-screen ${exiting ? "exit" : ""}`}>
      <div className="start-bg-glow" />
      <div className="start-content">
        <div className="start-logo">
          <div className="start-logo-bars">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="bar" style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
        </div>
        <h1 className="start-title">
          <span className="start-name">{CONFIG.name}'s</span>
          <br />
          <span className="start-wrapped">Wrapped</span>
        </h1>
        <p className="start-year">2026</p>
        <button className="start-button" onClick={handleClick}>
          <span>Tap to Start</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
          </svg>
        </button>
      </div>
      <p className="start-footnote">Best experienced with sound on 🔊</p>
    </div>
  );
}
