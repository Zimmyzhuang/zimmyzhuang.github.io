import CONFIG from "../../config";
import PhotoFrame from "../PhotoFrame";
import AnimatedNumber from "../AnimatedNumber";
import "./slides.css";

const { timeSpent } = CONFIG.slides;

export default function SlideTime() {
  return (
    <div className="slide slide-time">
      <div className="slide-bg-gradient gradient-2" />
      <div className="slide-inner">
        <PhotoFrame src={timeSpent.photo} size="small" delay={0.3} />
        <p className="slide-label anim-fade-up" style={{ animationDelay: "0.5s" }}>
          We spent approximately
        </p>
        <div className="big-stat anim-scale-up" style={{ animationDelay: "0.8s" }}>
          <AnimatedNumber value={timeSpent.number} />
        </div>
        <p className="slide-stat-label anim-fade-up" style={{ animationDelay: "1.1s" }}>
          {timeSpent.label}
        </p>
        <p className="slide-footnote anim-fade-up" style={{ animationDelay: "1.4s" }}>
          {timeSpent.subtext}
        </p>
      </div>
    </div>
  );
}
