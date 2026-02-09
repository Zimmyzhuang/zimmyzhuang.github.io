import { useState, useEffect, useRef } from "react";

export default function AnimatedNumber({ value, duration = 2000 }) {
  const [display, setDisplay] = useState("0");
  const frameRef = useRef();

  useEffect(() => {
    // Parse target number (remove commas)
    const target = parseInt(value.replace(/,/g, ""), 10);
    if (isNaN(target)) {
      setDisplay(value);
      return;
    }

    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing: ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      setDisplay(current.toLocaleString());

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [value, duration]);

  return <span>{display}</span>;
}
