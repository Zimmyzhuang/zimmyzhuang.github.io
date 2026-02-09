import CONFIG from "../../config";
import { useLanguage, t } from "../../LanguageContext";
import PhotoFrame from "../PhotoFrame";
import "./slides.css";

export default function SlideAura() {
  const { lang } = useLanguage();
  const aura = t(CONFIG.slides.aura, lang);

  return (
    <div className="slide slide-aura">
      <div className="aura-bg">
        {aura.colors.map((color, i) => (
          <div
            key={i}
            className="aura-blob"
            style={{
              background: color,
              animationDelay: `${i * 0.8}s`,
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 20}%`,
            }}
          />
        ))}
      </div>
      <div className="slide-inner">
        <p className="slide-label anim-fade-up" style={{ animationDelay: "0.2s" }}>
          {aura.title}
        </p>
        <PhotoFrame src={aura.photo} size="medium" rotate={-3} delay={0.4} />
        <h1 className="aura-title anim-scale-up" style={{ animationDelay: "0.8s" }}>
          {aura.aura}
        </h1>
        <p className="aura-description anim-fade-up" style={{ animationDelay: "1.2s" }}>
          {aura.description}
        </p>
      </div>
    </div>
  );
}
