import CONFIG from "../config";
import PhotoFrame from "./PhotoFrame";
import "./ThankYou.css";

const { thankYou } = CONFIG.slides;

export default function ThankYou() {
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
          <p className="thankyou-credits">Made with way too much effort</p>
          <p className="thankyou-year">Wrapped 2026</p>
        </div>
      </div>
    </div>
  );
}
