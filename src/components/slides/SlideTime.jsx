import { useState, useRef, useEffect, useCallback } from "react";
import CONFIG from "../../config";
import AnimatedNumber from "../AnimatedNumber";
import "./slides.css";

const { timeSpent } = CONFIG.slides;
const AUTO_SPIN_SPEED = 0.4; // degrees per frame (~24 deg/s → one revolution ~15s)

export default function SlideTime() {
  const [photoFailed, setPhotoFailed] = useState(false);
  const showPhoto = timeSpent.photo && !photoFailed;

  const diskRef = useRef(null);
  const labelRef = useRef(null);
  const angleRef = useRef(0);          // current cumulative rotation (degrees)
  const dragging = useRef(false);
  const lastPointerAngle = useRef(0);  // angle of pointer relative to center
  const rafRef = useRef(null);

  // Compute angle (degrees) from center of disk to a point
  const getAngleFromCenter = useCallback((clientX, clientY) => {
    const disk = diskRef.current;
    if (!disk) return 0;
    const rect = disk.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    return Math.atan2(clientY - cy, clientX - cx) * (180 / Math.PI);
  }, []);

  // Apply rotation to DOM
  const applyRotation = useCallback((deg) => {
    if (diskRef.current) diskRef.current.style.transform = `rotate(${deg}deg)`;
    if (labelRef.current) labelRef.current.style.transform = `translate(-50%, -50%) rotate(${-deg}deg)`;
  }, []);

  // Auto-spin loop
  useEffect(() => {
    let running = true;
    const spin = () => {
      if (!running) return;
      if (!dragging.current) {
        angleRef.current += AUTO_SPIN_SPEED;
        applyRotation(angleRef.current);
      }
      rafRef.current = requestAnimationFrame(spin);
    };
    rafRef.current = requestAnimationFrame(spin);
    return () => {
      running = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [applyRotation]);

  // --- Pointer handlers ---
  const getXY = (e) => {
    if (e.touches && e.touches.length > 0) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    return { x: e.clientX, y: e.clientY };
  };

  const handlePointerDown = useCallback((e) => {
    e.stopPropagation();
    const { x, y } = getXY(e);
    dragging.current = true;
    lastPointerAngle.current = getAngleFromCenter(x, y);
  }, [getAngleFromCenter]);

  const handlePointerMove = useCallback((e) => {
    if (!dragging.current) return;
    e.stopPropagation();
    const { x, y } = getXY(e);
    const newAngle = getAngleFromCenter(x, y);
    let delta = newAngle - lastPointerAngle.current;
    // Handle wrap-around at ±180
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    angleRef.current += delta;
    applyRotation(angleRef.current);
    lastPointerAngle.current = newAngle;
  }, [getAngleFromCenter, applyRotation]);

  const handlePointerUp = useCallback(() => {
    if (dragging.current) {
      dragging.current = false;
      // Eat the click event that fires right after mouseup so it
      // doesn't reach StoryViewer's click-to-navigate handler.
      const suppress = (e) => {
        e.stopPropagation();
        e.preventDefault();
      };
      window.addEventListener("click", suppress, { capture: true, once: true });
    }
  }, []);

  // Attach move/up to window so drag continues outside the element
  useEffect(() => {
    const onMove = (e) => handlePointerMove(e);
    const onUp = (e) => handlePointerUp(e);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  return (
    <div className="slide slide-time">
      <div className="slide-bg-gradient gradient-2" />
      <div className="slide-inner">

        {/* Spinning vinyl record — drag to scrub */}
        <div
          className="vinyl-wrapper anim-scale-up"
          style={{ animationDelay: "0.3s" }}
          onMouseDown={handlePointerDown}
          onTouchStart={handlePointerDown}
        >
          <div className="vinyl-disk" ref={diskRef}>
            <div className="vinyl-grooves" />
            <div className="vinyl-label" ref={labelRef}>
              {showPhoto ? (
                <img
                  src={timeSpent.photo}
                  alt=""
                  className="vinyl-photo"
                  draggable={false}
                  onError={() => setPhotoFailed(true)}
                />
              ) : (
                <div className="vinyl-photo-placeholder">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
              )}
              <div className="vinyl-spindle" />
            </div>
          </div>
        </div>

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
