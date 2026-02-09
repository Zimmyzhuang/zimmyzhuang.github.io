import { useState, useRef, useCallback } from "react";
import { LanguageProvider } from "./LanguageContext";
import StartScreen from "./components/StartScreen";
import StoryViewer from "./components/StoryViewer";
import ThankYou from "./components/ThankYou";
import "./App.css";

export default function App() {
  const [screen, setScreen] = useState("start"); // start | story | thankyou
  const audioRef = useRef(null);

  const handleStart = useCallback(() => {
    // Unlock audio on user gesture — required by mobile browsers.
    // We set a flag so the unlock callback knows not to pause audio
    // if StoryViewer has already started playing the first song.
    const audio = audioRef.current;
    if (audio) {
      audio.muted = true;
      audio.__unlocking = true;
      audio.play()
        .then(() => {
          // Only pause if StoryViewer hasn't already taken over
          if (audio.__unlocking) {
            audio.pause();
            audio.currentTime = 0;
          }
          audio.muted = false;
        })
        .catch(() => {})
        .finally(() => { audio.__unlocking = false; });
    }
    setScreen("story");
  }, []);

  const handleComplete = useCallback(() => {
    setScreen("thankyou");
  }, []);

  const handleHome = useCallback(() => {
    // Stop all audio (slide songs + whisper)
    const audio = audioRef.current;
    if (audio) { audio.pause(); audio.currentTime = 0; }
    if (window.__whisperAudio) { window.__whisperAudio.pause(); window.__whisperAudio.currentTime = 0; }
    setScreen("start");
  }, []);

  return (
    <LanguageProvider>
      <div className="app">
        {/* Shared audio element — lives here so it can be unlocked on Start tap */}
        <audio ref={audioRef} preload="auto" />

        {screen === "start" && <StartScreen onStart={handleStart} />}
        {screen === "story" && <StoryViewer onComplete={handleComplete} onHome={handleHome} audioRef={audioRef} />}
        {screen === "thankyou" && <ThankYou onHome={handleHome} />}
      </div>
    </LanguageProvider>
  );
}
