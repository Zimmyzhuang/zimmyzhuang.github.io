import { useState, useEffect, useRef, useCallback } from "react";
import CONFIG from "../config";
import ProgressBar from "./ProgressBar";
import SlideIntro from "./slides/SlideIntro";
import SlideTime from "./slides/SlideTime";
import SlideLocation from "./slides/SlideLocation";
import SlideArtist from "./slides/SlideArtist";
import SlideAura from "./slides/SlideAura";
import SlideMoments from "./slides/SlideMoments";
import SlidePuzzle from "./slides/SlidePuzzle";
import "./StoryViewer.css";

// Each entry pairs a component with its config (which holds song + duration)
const SLIDES = [
  { Component: SlideIntro,    config: CONFIG.slides.intro },
  { Component: SlideTime,     config: CONFIG.slides.timeSpent },
  { Component: SlideLocation, config: CONFIG.slides.topLocation },
  { Component: SlideArtist,   config: CONFIG.slides.topArtist },
  { Component: SlideAura,     config: CONFIG.slides.aura },
  { Component: SlideMoments,  config: CONFIG.slides.topMoments },
  { Component: SlidePuzzle,   config: CONFIG.slides.puzzle },
];

const TOTAL_SLIDES = SLIDES.length;
const SWIPE_THRESHOLD = 50;

export default function StoryViewer({ onComplete, onHome }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState("forward");
  const [slideKey, setSlideKey] = useState(0);
  const [muted, setMuted] = useState(false);
  const [paused, setPaused] = useState(false);

  // Refs so navigation helpers always read the latest slide
  const currentSlideRef = useRef(0);
  const timerRef = useRef(null);
  const audioRef = useRef(null);

  // Pointer tracking for swipe
  const pointerStartRef = useRef({ x: 0, y: 0, time: 0 });
  const didSwipeRef = useRef(false);
  const isPointerDown = useRef(false);

  // Keep ref in sync
  useEffect(() => {
    currentSlideRef.current = currentSlide;
  }, [currentSlide]);

  // Current slide's config
  const slideConfig = SLIDES[currentSlide].config;
  const slideDuration = slideConfig.duration || 0;
  const isFinalSlide = currentSlide === TOTAL_SLIDES - 1;

  // ---- Per-slide audio ----
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const songPath = SLIDES[currentSlide].config.song;
    if (songPath) {
      audio.src = songPath;
      audio.currentTime = 0;
      audio.volume = CONFIG.volume;
      audio.play().catch(() => {
        // Autoplay blocked — that's ok
      });
    } else {
      audio.pause();
      audio.removeAttribute("src");
    }

    return () => {
      audio.pause();
    };
  }, [currentSlide, slideKey]);

  // Keep audio muted state in sync when toggling mid-song
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = muted;
    }
  }, [muted]);

  const toggleMute = useCallback((e) => {
    e.stopPropagation();
    setMuted((m) => !m);
  }, []);

  // Pause / resume audio
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audio.src) return;
    if (paused) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
  }, [paused]);

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

  // ---- Auto-advance timer (uses per-slide duration) ----
  // Resets when slide changes OR when the same slide is replayed (slideKey changes)
  useEffect(() => {
    clearTimer();
    if (paused) return;
    const duration = SLIDES[currentSlideRef.current].config.duration || 0;
    if (duration <= 0) return; // Don't auto-advance if no duration (e.g. puzzle)
    timerRef.current = setTimeout(() => {
      goForward();
    }, duration);
    return clearTimer;
  }, [currentSlide, slideKey, paused, clearTimer, goForward]);

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

  // Check if an event target is inside the progress bar, a button, the puzzle, or vinyl
  const isBarOrButton = (e) =>
    e.target.closest(".progress-bar") ||
    e.target.closest("button") ||
    e.target.closest(".puzzle-container") ||
    e.target.closest(".vinyl-wrapper");

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
    const w = window.innerWidth;
    if (x < w * 0.33) {
      goBack();
    } else if (x > w * 0.66) {
      goForward();
    } else {
      setPaused((p) => !p);
    }
  }, [goForward, goBack]);

  const CurrentSlideComponent = SLIDES[currentSlide].Component;

  return (
    <div
      className="story-viewer"
      onClick={handleClick}
      onMouseDown={handlePointerDown}
      onMouseUp={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchEnd={handlePointerUp}
    >
      {/* Hidden audio element for per-slide songs */}
      <audio ref={audioRef} preload="auto" />

      <ProgressBar
        total={TOTAL_SLIDES}
        current={currentSlide}
        duration={slideDuration}
        paused={paused}
        animKey={slideKey}
        onSegmentClick={goToSlide}
      />

      <div className={`slide-container slide-${direction}`} key={slideKey}>
        <CurrentSlideComponent onComplete={onComplete} />
      </div>

      <button className="home-btn" onClick={(e) => { e.stopPropagation(); onHome?.(); }} aria-label="Go to start">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12l9-9 9 9" />
          <path d="M5 10v10a1 1 0 001 1h3v-6h6v6h3a1 1 0 001-1V10" />
        </svg>
      </button>

      <button className="mute-btn" onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"}>
        {muted ? (
          /* Speaker off icon */
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          /* Speaker on icon */
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        )}
      </button>
    </div>
  );
}
