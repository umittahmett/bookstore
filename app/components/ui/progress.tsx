"use client";

import { useEffect, useState } from "react";
import AnimatedCircularProgressBar from "@components/ui/animated-circular-progress-bar";

export function AnimatedCircularProgressBarDemo({ isLoading }: { isLoading: boolean }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (isLoading) {
      const handleIncrement = (prev: number) => {
        if (prev >= 100) {
          return 100;
        }
        return prev + 10
      };

      const interval = setInterval(() => setValue(handleIncrement), 50)
      return () => clearInterval(interval);
    } else {
      setValue(100)
    }
  }, [isLoading]);

  return (
    <AnimatedCircularProgressBar
      className="text-center text-white flex items-center justify-center"
      max={100}
      min={0}
      value={value}
      gaugePrimaryColor="#f59e0b"
      gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
    />
  );
}
