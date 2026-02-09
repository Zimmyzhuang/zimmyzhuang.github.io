import { useState, useRef, useCallback } from "react";
import CONFIG from "./config";
import StartScreen from "./components/StartScreen";
import StoryViewer from "./components/StoryViewer";
import ThankYou from "./components/ThankYou";
import "./App.css";

export default function App() {
  const [screen, setScreen] = useState("start"); // start | story | thankyou
  const audioRef = useRef(null);

  const handleStart = useCallback(() => {
    // Try to play audio
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        // Autoplay blocked — that's ok, we tried
      });
    }
    setScreen("story");
  }, []);

  const handleComplete = useCallback(() => {
    setScreen("thankyou");
  }, []);

  return (
    <div className="app">
      {/* Persistent audio element */}
      <audio ref={audioRef} src={CONFIG.songPath} loop preload="auto" />

      {screen === "start" && <StartScreen onStart={handleStart} />}
      {screen === "story" && <StoryViewer onComplete={handleComplete} />}
      {screen === "thankyou" && <ThankYou />}
    </div>
  );
}
