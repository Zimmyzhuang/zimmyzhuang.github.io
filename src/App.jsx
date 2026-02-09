import { useState, useCallback } from "react";
import StartScreen from "./components/StartScreen";
import StoryViewer from "./components/StoryViewer";
import ThankYou from "./components/ThankYou";
import "./App.css";

export default function App() {
  const [screen, setScreen] = useState("start"); // start | story | thankyou

  const handleStart = useCallback(() => {
    setScreen("story");
  }, []);

  const handleComplete = useCallback(() => {
    setScreen("thankyou");
  }, []);

  const handleHome = useCallback(() => {
    setScreen("start");
  }, []);

  return (
    <div className="app">
      {screen === "start" && <StartScreen onStart={handleStart} />}
      {screen === "story" && <StoryViewer onComplete={handleComplete} onHome={handleHome} />}
      {screen === "thankyou" && <ThankYou />}
    </div>
  );
}
