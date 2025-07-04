import { useEffect, useState } from "react";

export default function Loading({
  text = "Loading",
  speed = 300,
  maxDots = 3,
}) {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= maxDots ? "" : prev + "."));
    }, speed);

    return () => clearInterval(interval);
  }, [speed, maxDots]);

  return (
    <div className="flex h-full items-center justify-center">
      {text}
      <span>{dots}</span>
    </div>
  );
}
