import { useState, useCallback, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import CONFIG from "../../config";
import PhotoFrame from "../PhotoFrame";
import "./SlidePuzzle.css";
import "./slides.css";

const { puzzle, finalAsk } = CONFIG.slides;

/* ============================================
   Rose confetti burst (on puzzle solve)
   ============================================ */
function fireRoseConfetti() {
  const scalar = 2;
  const rose = confetti.shapeFromText({ text: "🌹", scalar });
  const petal = confetti.shapeFromText({ text: "🌸", scalar });
  const heart = confetti.shapeFromText({ text: "❤️", scalar });
  const shapes = [rose, rose, petal, heart];

  confetti({
    particleCount: 40,
    spread: 100,
    origin: { y: 0.55 },
    shapes,
    scalar,
    ticks: 200,
    gravity: 0.8,
  });
  confetti({
    particleCount: 20,
    angle: 60,
    spread: 55,
    origin: { x: 0, y: 0.65 },
    shapes,
    scalar,
    ticks: 200,
    gravity: 0.8,
  });
  confetti({
    particleCount: 20,
    angle: 120,
    spread: 55,
    origin: { x: 1, y: 0.65 },
    shapes,
    scalar,
    ticks: 200,
    gravity: 0.8,
  });

  const end = Date.now() + 2000;
  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 45,
      origin: { x: 0, y: 0.7 },
      shapes,
      scalar,
      ticks: 150,
      gravity: 1,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 45,
      origin: { x: 1, y: 0.7 },
      shapes,
      scalar,
      ticks: 150,
      gravity: 1,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

/* ============================================
   Answer confetti (on Yes / Absolutely)
   ============================================ */
function fireAnswerConfetti() {
  const colors = ["#B11226", "#E8A0B8", "#8B1E3F", "#E6C46A", "#FFF4EC"];

  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 },
    colors,
  });

  const end = Date.now() + 3000;
  const frame = () => {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();
}

/* ============================================
   Puzzle constants & helpers
   ============================================ */
const GRID = 3;
const TOTAL = GRID * GRID;
const SOLVED = Array.from({ length: TOTAL }, (_, i) => i);

const getRow = (i) => Math.floor(i / GRID);
const getCol = (i) => i % GRID;

function createShuffled() {
  const b = [...SOLVED];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

const checkSolved = (b) => b.every((v, i) => v === i);

/* ============================================
   Component — 4 phases:
     playing → celebrating → asking → answered
   ============================================ */
export default function SlidePuzzle({ onComplete }) {
  const [phase, setPhase] = useState("playing");
  const phaseRef = useRef("playing");

  const [board, setBoard] = useState(() => {
    let b;
    do {
      b = createShuffled();
    } while (checkSolved(b));
    return b;
  });
  const [moves, setMoves] = useState(0);

  /* ---- refs ---- */
  const gridRef = useRef(null);
  const boardRef = useRef(board);
  const dragRef = useRef(null);
  const tileElemsRef = useRef({});
  const prevHoverRef = useRef(-1);
  const listenersRef = useRef(null);

  useEffect(() => {
    boardRef.current = board;
  }, [board]);
  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  // Clean up document listeners on unmount
  useEffect(() => {
    return () => {
      if (listenersRef.current) {
        document.removeEventListener("pointermove", listenersRef.current.move);
        document.removeEventListener("pointerup", listenersRef.current.up);
        document.removeEventListener("pointercancel", listenersRef.current.up);
      }
    };
  }, []);

  const getCellIdx = (clientX, clientY, gridRect) => {
    const col = Math.floor(((clientX - gridRect.left) / gridRect.width) * GRID);
    const row = Math.floor(((clientY - gridRect.top) / gridRect.height) * GRID);
    if (row >= 0 && row < GRID && col >= 0 && col < GRID)
      return row * GRID + col;
    return -1;
  };

  /* ---- drag start ---- */
  const handlePointerDown = useCallback((e, tileVal) => {
    if (phaseRef.current !== "playing" || dragRef.current) return;
    e.preventDefault();
    e.stopPropagation();

    const posIdx = boardRef.current.indexOf(tileVal);
    const gridRect = gridRef.current.getBoundingClientRect();
    const elem = e.currentTarget;

    dragRef.current = {
      tileVal,
      origIdx: posIdx,
      startX: e.clientX,
      startY: e.clientY,
      gridRect,
      elem,
    };

    elem.classList.add("puzzle-tile--dragging");
    elem.style.transition = "none";
    elem.style.zIndex = "10";

    const onMove = (ev) => {
      const info = dragRef.current;
      if (!info) return;
      ev.preventDefault();

      const dx = ev.clientX - info.startX;
      const dy = ev.clientY - info.startY;
      const col = getCol(info.origIdx);
      const row = getRow(info.origIdx);
      info.elem.style.transform = `translate(calc(${col * 100}% + ${dx}px), calc(${row * 100}% + ${dy}px))`;

      const targetIdx = getCellIdx(ev.clientX, ev.clientY, info.gridRect);
      const hoverIdx =
        targetIdx >= 0 && targetIdx !== info.origIdx ? targetIdx : -1;

      if (prevHoverRef.current !== hoverIdx) {
        if (prevHoverRef.current >= 0) {
          const prevVal = boardRef.current[prevHoverRef.current];
          tileElemsRef.current[prevVal]?.classList.remove(
            "puzzle-tile--drop-target"
          );
        }
        if (hoverIdx >= 0) {
          const val = boardRef.current[hoverIdx];
          tileElemsRef.current[val]?.classList.add("puzzle-tile--drop-target");
        }
        prevHoverRef.current = hoverIdx;
      }
    };

    const onUp = (ev) => {
      const info = dragRef.current;
      if (!info) return;

      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointercancel", onUp);
      listenersRef.current = null;

      info.elem.classList.remove("puzzle-tile--dragging");
      info.elem.style.zIndex = "";

      if (prevHoverRef.current >= 0) {
        const val = boardRef.current[prevHoverRef.current];
        tileElemsRef.current[val]?.classList.remove("puzzle-tile--drop-target");
        prevHoverRef.current = -1;
      }

      const targetIdx = getCellIdx(ev.clientX, ev.clientY, info.gridRect);

      if (targetIdx >= 0 && targetIdx !== info.origIdx) {
        const tCol = getCol(targetIdx);
        const tRow = getRow(targetIdx);
        info.elem.style.transition = "none";
        info.elem.style.transform = `translate(${tCol * 100}%, ${tRow * 100}%)`;

        dragRef.current = null;

        setBoard((b) => {
          const next = [...b];
          [next[info.origIdx], next[targetIdx]] = [
            next[targetIdx],
            next[info.origIdx],
          ];
          return next;
        });
        setMoves((c) => c + 1);
      } else {
        const col = getCol(info.origIdx);
        const row = getRow(info.origIdx);
        info.elem.style.transition =
          "transform 0.25s cubic-bezier(0.25,0.46,0.45,0.94)";
        info.elem.style.transform = `translate(${col * 100}%, ${row * 100}%)`;
        dragRef.current = null;
      }
    };

    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerup", onUp);
    document.addEventListener("pointercancel", onUp);
    listenersRef.current = { move: onMove, up: onUp };
  }, []);

  /* ---- Whisper audio for the big question ---- */
  const whisperRef = useRef(null);
  useEffect(() => {
    const audio = new Audio("/songs/whisper.mp3");
    audio.preload = "auto";
    audio.volume = CONFIG.volume;
    whisperRef.current = audio;
    // No cleanup — whisper keeps playing through the ThankYou screen
  }, []);

  /* ---- Win detection → celebrating → asking ---- */
  useEffect(() => {
    if (phaseRef.current === "playing" && moves > 0 && checkSolved(board)) {
      setPhase("celebrating");
      fireRoseConfetti();
      const t = setTimeout(() => {
        setPhase("asking");
      }, 2500);
      return () => clearTimeout(t);
    }
  }, [board, moves]);

  /* ---- Answer handler ---- */
  const handleAnswer = useCallback(() => {
    if (phaseRef.current !== "asking") return;
    setPhase("answered");
    // Play whisper when she says yes — continues into ThankYou screen
    if (whisperRef.current) {
      whisperRef.current.currentTime = 0;
      whisperRef.current.play().catch(() => {});
    }
    fireAnswerConfetti();
    setTimeout(() => onComplete?.(), 3500);
  }, [onComplete]);

  /* ---- Gradient cross-fade ---- */
  const showFinalGradient = phase === "asking" || phase === "answered";

  return (
    <div className="slide slide-puzzle">
      <div
        className="slide-bg-gradient gradient-puzzle"
        style={{
          opacity: showFinalGradient ? 0 : 0.85,
          transition: "opacity 1s ease",
        }}
      />
      <div
        className="slide-bg-gradient gradient-final"
        style={{
          opacity: showFinalGradient ? 1 : 0,
          transition: "opacity 1s ease",
        }}
      />

      <div className="slide-inner">
        {/* ---- PHASE: PLAYING ---- */}
        {phase === "playing" && (
          <>
            <p
              className="slide-label anim-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              One last thing...
            </p>
            <h2
              className="puzzle-title anim-fade-up"
              style={{ animationDelay: "0.35s" }}
            >
              {puzzle.title}
            </h2>

            <div
              className="puzzle-container anim-scale-up"
              style={{ animationDelay: "0.6s" }}
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              onMouseUp={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
            >
              <div className="puzzle-grid" ref={gridRef}>
                {board.map((tileVal, posIdx) => {
                  const posRow = getRow(posIdx);
                  const posCol = getCol(posIdx);
                  const origRow = getRow(tileVal);
                  const origCol = getCol(tileVal);

                  return (
                    <div
                      key={tileVal}
                      ref={(el) => {
                        tileElemsRef.current[tileVal] = el;
                      }}
                      className="puzzle-tile"
                      onPointerDown={(e) => handlePointerDown(e, tileVal)}
                      style={{
                        transform: `translate(${posCol * 100}%, ${posRow * 100}%)`,
                        transition:
                          "transform 0.25s cubic-bezier(0.25,0.46,0.45,0.94)",
                        backgroundImage: `url(${puzzle.photo})`,
                        backgroundSize: "300% 300%",
                        backgroundPosition: `${origCol * 50}% ${origRow * 50}%`,
                      }}
                    />
                  );
                })}
              </div>
            </div>

            <p
              className="puzzle-hint anim-fade-up"
              style={{ animationDelay: "0.9s" }}
            >
              {puzzle.hint}
            </p>
          </>
        )}

        {/* ---- PHASE: CELEBRATING ---- */}
        {phase === "celebrating" && (
          <div className="puzzle-solved anim-scale-up">
            <div className="puzzle-complete-image">
              <img src={puzzle.photo} alt="" />
            </div>
            <h2 className="puzzle-solved-text">{puzzle.solvedText}</h2>
          </div>
        )}

        {/* ---- PHASE: ASKING ---- */}
        {phase === "asking" && (
          <>
            <PhotoFrame
              src={finalAsk.photo}
              size="medium"
              rotate={-2}
              delay={0.2}
            />
            <p
              className="slide-label anim-fade-up"
              style={{ animationDelay: "0.5s" }}
            >
              {finalAsk.preQuestion}
            </p>
            <h1
              className="final-question anim-scale-up"
              style={{ animationDelay: "0.9s" }}
            >
              {finalAsk.question}
            </h1>
            <div
              className="final-buttons anim-fade-up"
              style={{ animationDelay: "1.3s" }}
            >
              <button className="btn-yes pulse-green" onClick={handleAnswer}>
                {finalAsk.buttonA}
              </button>
              <button className="btn-absolutely" onClick={handleAnswer}>
                {finalAsk.buttonB}
              </button>
            </div>
          </>
        )}

        {/* ---- PHASE: ANSWERED ---- */}
        {phase === "answered" && (
          <div className="answered-state anim-scale-up">
            <span className="answered-emoji">💖</span>
            <h1 className="answered-text">I knew it.</h1>
          </div>
        )}
      </div>
    </div>
  );
}
