import CONFIG from "../../config";
import { useLanguage, t } from "../../LanguageContext";
import PhotoFrame from "../PhotoFrame";
import "./slides.css";

export default function SlideLocation() {
  const { lang } = useLanguage();
  const topLocation = t(CONFIG.slides.topLocation, lang);

  return (
    <div className="slide slide-location">
      <div className="slide-bg-gradient gradient-3" />
      <div className="slide-inner">
        <p className="slide-label anim-fade-up" style={{ animationDelay: "0.2s" }}>
          {topLocation.subtitle}
        </p>
        <PhotoFrame src={topLocation.photo} size="medium" rotate={2} delay={0.5} />
        <h1 className="location-name anim-fade-up" style={{ animationDelay: "0.9s" }}>
          {topLocation.location}
        </h1>
        <p className="slide-footnote anim-fade-up" style={{ animationDelay: "1.2s" }}>
          {topLocation.footnote}
        </p>
      </div>
    </div>
  );
}
