import { useRef, useCallback } from "react";
import "./ProgressBar.css";

export default function ProgressBar({ total, current, duration, animKey, paused, onSegmentClick }) {
  const barRef = useRef(null);

  // Figure out which segment was tapped based on X position
  const getSegmentFromX = useCallback((clientX) => {
    const bar = barRef.current;
    if (!bar) return -1;
    const rect = bar.getBoundingClientRect();
    const x = clientX - rect.left;
    const ratio = x / rect.width;
    const index = Math.floor(ratio * total);
    return Math.max(0, Math.min(total - 1, index));
  }, [total]);

  // Unified handler for both touch and click
  const handleTap = useCallback((clientX, e) => {
    e.stopPropagation();
    const index = getSegmentFromX(clientX);
    if (index >= 0 && onSegmentClick) {
      onSegmentClick(index);
    }
  }, [getSegmentFromX, onSegmentClick]);

  const handleClick = useCallback((e) => {
    handleTap(e.clientX, e);
  }, [handleTap]);

  const handleTouchEnd = useCallback((e) => {
    e.preventDefault(); // Prevent ghost click
    if (e.changedTouches && e.changedTouches.length > 0) {
      handleTap(e.changedTouches[0].clientX, e);
    }
  }, [handleTap]);

  return (
    <div
      className="progress-bar"
      ref={barRef}
      onClick={handleClick}
      onTouchEnd={handleTouchEnd}
    >
      {Array.from({ length: total }, (_, i) => {
        let className = "progress-segment";
        if (i < current) className += " complete";
        else if (i === current) className += " active";

        return (
          <div key={i} className={className}>
            {i === current && duration > 0 && (
              <div
                key={animKey}
                className="progress-fill"
                style={{
                  animationDuration: `${duration}ms`,
                  animationPlayState: paused ? "paused" : "running",
                }}
              />
            )}
            {i < current && <div className="progress-fill complete-fill" />}
          </div>
        );
      })}
    </div>
  );
}
