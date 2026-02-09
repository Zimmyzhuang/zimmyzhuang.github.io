import { useState } from "react";
import confetti from "canvas-confetti";
import CONFIG from "../../config";
import { useLanguage, t } from "../../LanguageContext";
import PhotoFrame from "../PhotoFrame";
import "./slides.css";

export default function SlideFinalAsk({ onComplete }) {
  const { lang } = useLanguage();
  const finalAsk = t(CONFIG.slides.finalAsk, lang);
  const s = CONFIG.strings[lang];
  const [answered, setAnswered] = useState(false);

  const handleAnswer = () => {
    if (answered) return;
    setAnswered(true);

    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ["#B11226", "#E8A0B8", "#8B1E3F", "#E6C46A", "#FFF4EC"],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ["#B11226", "#E8A0B8", "#8B1E3F", "#E6C46A", "#FFF4EC"],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();

    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#B11226", "#E8A0B8", "#8B1E3F", "#E6C46A", "#FFF4EC"],
    });

    setTimeout(() => {
      onComplete();
    }, 3500);
  };

  return (
    <div className="slide slide-final">
      <div className="slide-bg-gradient gradient-final" />
      <div className="slide-inner">
        {!answered ? (
          <>
            <PhotoFrame src={finalAsk.photo} size="medium" rotate={-2} delay={0.2} />
            <p className="slide-label anim-fade-up" style={{ animationDelay: "0.5s" }}>
              {finalAsk.preQuestion}
            </p>
            <h1 className="final-question anim-scale-up" style={{ animationDelay: "0.9s" }}>
              {finalAsk.question}
            </h1>
            <div className="final-buttons anim-fade-up" style={{ animationDelay: "1.3s" }}>
              <button className="btn-yes pulse-green" onClick={handleAnswer}>
                {finalAsk.buttonA}
              </button>
              <button className="btn-absolutely" onClick={handleAnswer}>
                {finalAsk.buttonB}
              </button>
            </div>
          </>
        ) : (
          <div className="answered-state anim-scale-up">
            <span className="answered-emoji">💖</span>
            <h1 className="answered-text">{s.answeredText}</h1>
          </div>
        )}
      </div>
    </div>
  );
}
