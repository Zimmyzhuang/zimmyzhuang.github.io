import { useState } from "react";
import "./PhotoFrame.css";

/**
 * A styled photo frame that displays an image on a slide.
 * Shows a placeholder when no photo is provided or if the image fails to load.
 *
 * Props:
 *  - src: image path (e.g. "/assets/photo1.jpg")
 *  - size: "small" | "medium" | "large" (default "medium")
 *  - shape: "rounded" | "circle" (default "rounded")
 *  - rotate: slight tilt in degrees (e.g. -3, 2) for a polaroid feel
 *  - className: extra classes
 *  - delay: animation delay in seconds
 */
export default function PhotoFrame({
  src,
  size = "medium",
  shape = "rounded",
  rotate = 0,
  className = "",
  delay = 0.5,
}) {
  const [failed, setFailed] = useState(false);
  const showImage = src && !failed;

  return (
    <div
      className={`photo-frame photo-frame--${size} photo-frame--${shape} ${className} anim-scale-up`}
      style={{
        animationDelay: `${delay}s`,
        "--rotate": `${rotate}deg`,
      }}
    >
      {showImage ? (
        <img
          src={src}
          alt=""
          className="photo-frame__img"
          draggable={false}
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="photo-frame__placeholder">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <span>Add photo</span>
        </div>
      )}
    </div>
  );
}
