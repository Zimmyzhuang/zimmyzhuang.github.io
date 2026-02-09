import { useState } from "react";
import "./SlideBackground.css";

/**
 * Reusable slide background with optional photo + gradient overlay.
 * If the photo fails to load, automatically falls back to the gradient.
 *
 * Props:
 *  - photo: path to image (e.g. "/assets/photo1.jpg")
 *  - gradient: CSS gradient class name (e.g. "gradient-1")
 *  - overlay: custom overlay CSS background string
 *  - duotone: duotone tint color (e.g. "#FF0055")
 *  - className: extra classes
 */
export default function SlideBackground({ photo, gradient, overlay, duotone, className = "" }) {
  const [photoFailed, setPhotoFailed] = useState(false);

  const showPhoto = photo && !photoFailed;

  if (showPhoto) {
    return (
      <div className={`slide-bg-photo-wrap ${className}`}>
        <img
          src={photo}
          alt=""
          className="slide-bg-photo"
          draggable={false}
          onError={() => setPhotoFailed(true)}
        />
        {/* Duotone tint layer */}
        {duotone && (
          <div
            className="slide-bg-duotone"
            style={{ background: duotone }}
          />
        )}
        {/* Dark gradient overlay for text readability */}
        <div
          className="slide-bg-overlay"
          style={overlay ? { background: overlay } : undefined}
        />
      </div>
    );
  }

  // Fallback: gradient-only background
  if (gradient) {
    return <div className={`slide-bg-gradient ${gradient} ${className}`} />;
  }

  return null;
}
