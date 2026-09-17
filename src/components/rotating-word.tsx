"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type RotatingWordProps = {
  words: string[];
  className?: string;
  interval?: number;
};

export default function RotatingWord({
  words,
  className,
  interval = 2600,
}: RotatingWordProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % words.length),
      interval
    );
    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <span className={cn("inline-grid", className)}>
      {words.map((word, i) => (
        <span
          key={word}
          aria-hidden={i !== index}
          className={cn(
            "col-start-1 row-start-1 transition-all duration-500 ease-out",
            i === index
              ? "translate-y-0 opacity-100 blur-0"
              : "pointer-events-none translate-y-4 opacity-0 blur-sm"
          )}
        >
          {word}
        </span>
      ))}
    </span>
  );
}