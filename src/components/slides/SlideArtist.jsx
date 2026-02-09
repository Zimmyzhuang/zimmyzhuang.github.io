import CONFIG from "../../config";
import { useLanguage, t } from "../../LanguageContext";
import PhotoFrame from "../PhotoFrame";
import "./slides.css";

export default function SlideArtist() {
  const { lang } = useLanguage();
  const topArtist = t(CONFIG.slides.topArtist, lang);

  return (
    <div className="slide slide-artist">
      <div className="slide-bg-gradient gradient-4" />
      <div className="slide-inner">
        <p className="slide-label anim-fade-up" style={{ animationDelay: "0.2s" }}>
          {topArtist.title}
        </p>
        <PhotoFrame src={topArtist.photo} size="medium" delay={0.4} />
        <h1 className="artist-name anim-fade-up" style={{ animationDelay: "0.8s" }}>
          {topArtist.artist}
        </h1>
        <p className="artist-streams anim-fade-up" style={{ animationDelay: "1s" }}>
          {topArtist.streams}
        </p>
        <p className="slide-footnote anim-fade-up" style={{ animationDelay: "1.2s" }}>
          {topArtist.subtitle}
        </p>
      </div>
    </div>
  );
}
