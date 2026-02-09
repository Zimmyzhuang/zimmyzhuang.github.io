import CONFIG from "../../config";
import PhotoFrame from "../PhotoFrame";
import "./slides.css";

const { topMoments } = CONFIG.slides;

export default function SlideMoments() {
  return (
    <div className="slide slide-moments">
      <div className="slide-bg-gradient gradient-5" />
      <div className="slide-inner slide-inner--top">
        <PhotoFrame src={topMoments.photo} size="medium" rotate={3} delay={0.2} />
        <p className="slide-label anim-fade-up" style={{ animationDelay: "0.3s" }}>
          {topMoments.title}
        </p>

        <ol className="moments-list">
          {topMoments.moments.map((moment, i) => (
            <li
              key={i}
              className="moment-item anim-slide-in-left"
              style={{ animationDelay: `${0.5 + i * 0.2}s` }}
            >
              <span className="moment-number">#{i + 1}</span>
              <span className="moment-text">{moment}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
