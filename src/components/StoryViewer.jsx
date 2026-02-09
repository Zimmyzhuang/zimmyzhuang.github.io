import { useState, useEffect, useRef, useCallback } from "react";
import CONFIG from "../config";
import ProgressBar from "./ProgressBar";
import SlideIntro from "./slides/SlideIntro";
import SlideTime from "./slides/SlideTime";
import SlideLocation from "./slides/SlideLocation";
import SlideArtist from "./slides/SlideArtist";
import SlideAura from "./slides/SlideAura";
import SlideMoments from "./slides/SlideMoments";
import SlideFinalAsk from "./slides/SlideFinalAsk";
import "./StoryViewer.css";

const SLIDE_COMPONENTS = [
  SlideIntro,
  SlideTime,
  SlideLocation,
  SlideArtist,
  SlideAura,
  SlideMoments,
  SlideFinalAsk,
];

const TOTAL_SLIDES = SLIDE_COMPONENTS.length;
const SWIPE_THRESHOLD = 50;

export default function StoryViewer({ onComplete }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState("forward");
  const [slideKey, setSlideKey] = useState(0);

  // Refs so navigation helpers always read the latest slide
  const currentSlideRef = useRef(0);
  const timerRef = useRef(null);

  // Pointer tracking for swipe
  const pointerStartRef = useRef({ x: 0, y: 0, time: 0 });
  const didSwipeRef = useRef(false);
  const isPointerDown = useRef(false);

  // Keep ref in sync
  useEffect(() => {
    currentSlideRef.current = currentSlide;
  }, [currentSlide]);

  const isFinalSlide = currentSlide === TOTAL_SLIDES - 1;

  // ---- Navigation helpers ----
  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const navigate = useCallback((targetIndex) => {
    const cur = currentSlideRef.current;
    if (targetIndex < 0 || targetIndex >= TOTAL_SLIDES) return;
    if (targetIndex !== cur) {
      setDirection(targetIndex > cur ? "forward" : "back");
      setCurrentSlide(targetIndex);
    }
    // Always bump the key — replays the slide if same index, animates if different
    setSlideKey((k) => k + 1);
  }, []);

  const goForward = useCallback(() => {
    navigate(currentSlideRef.current + 1);
  }, [navigate]);

  const goBack = useCallback(() => {
    navigate(currentSlideRef.current - 1);
  }, [navigate]);

  const goToSlide = useCallback((index) => {
    navigate(index);
  }, [navigate]);

  // ---- Auto-advance timer ----
  // Resets when slide changes OR when the same slide is replayed (slideKey changes)
  useEffect(() => {
    clearTimer();
    if (currentSlide === TOTAL_SLIDES - 1) return; // Don't auto-advance final slide
    timerRef.current = setTimeout(() => {
      goForward();
    }, CONFIG.autoAdvanceMs);
    return clearTimer;
  }, [currentSlide, slideKey, clearTimer, goForward]);

  // ---- Pointer helpers ----
  const getPointerPos = (e) => {
    if (e.touches && e.touches.length > 0) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    if (e.changedTouches && e.changedTouches.length > 0) {
      return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  };

  // Check if an event target is inside the progress bar or a button
  const isBarOrButton = (e) =>
    e.target.closest(".progress-bar") || e.target.closest("button");

  const handlePointerDown = useCallback((e) => {
    if (isBarOrButton(e)) return;
    const pos = getPointerPos(e);
    pointerStartRef.current = { x: pos.x, y: pos.y, time: Date.now() };
    didSwipeRef.current = false;
    isPointerDown.current = true;
  }, []);

  const handlePointerUp = useCallback((e) => {
    if (!isPointerDown.current) return;
    isPointerDown.current = false;
    if (isBarOrButton(e)) return;

    const pos = getPointerPos(e);
    const deltaX = pos.x - pointerStartRef.current.x;
    const deltaY = pos.y - pointerStartRef.current.y;

    if (Math.abs(deltaX) > SWIPE_THRESHOLD && Math.abs(deltaX) > Math.abs(deltaY)) {
      didSwipeRef.current = true;
      if (deltaX < 0) {
        goForward();
      } else {
        goBack();
      }
    }
  }, [goForward, goBack]);

  // ---- Click / tap ----
  const handleClick = useCallback((e) => {
    if (didSwipeRef.current) {
      didSwipeRef.current = false;
      return;
    }
    if (isBarOrButton(e)) return;

    const x = e.clientX || 0;
    if (x < window.innerWidth * 0.3) {
      goBack();
    } else {
      goForward();
    }
  }, [goForward, goBack]);

  const CurrentSlideComponent = SLIDE_COMPONENTS[currentSlide];

  return (
    <div
      className="story-viewer"
      onClick={handleClick}
      onMouseDown={handlePointerDown}
      onMouseUp={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchEnd={handlePointerUp}
    >
      <ProgressBar
        total={TOTAL_SLIDES}
        current={currentSlide}
        duration={isFinalSlide ? 0 : CONFIG.autoAdvanceMs}
        animKey={slideKey}
        onSegmentClick={goToSlide}
      />

      <div className={`slide-container slide-${direction}`} key={slideKey}>
        <CurrentSlideComponent onComplete={onComplete} />
      </div>
    </div>
  );
}
