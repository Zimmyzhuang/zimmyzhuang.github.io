import CONFIG from "../../config";
import PhotoFrame from "../PhotoFrame";
import "./slides.css";

const { intro } = CONFIG.slides;

export default function SlideIntro() {
  return (
    <div className="slide slide-intro">
      <div className="slide-bg-gradient gradient-1" />
      <div className="slide-inner">
        <PhotoFrame src={intro.photo} size="large" rotate={-2} delay={0.3} />
        <p className="slide-label anim-fade-up" style={{ animationDelay: "0.6s" }}>
          {intro.greeting},
        </p>
        <h1 className="slide-hero-text anim-fade-up" style={{ animationDelay: "0.8s" }}>
          {CONFIG.name}.
        </h1>
        <p className="slide-body anim-fade-up" style={{ animationDelay: "1.1s" }}>
          {intro.subtitle}
        </p>
        <p className="slide-cta-text anim-fade-up" style={{ animationDelay: "1.4s" }}>
          {intro.cta}
        </p>
      </div>
    </div>
  );
}
