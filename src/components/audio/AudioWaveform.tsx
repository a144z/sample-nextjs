"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface AudioWaveformProps {
  barCount?: number;
  isActive?: boolean;
  height?: number;
}

export function AudioWaveform({ barCount = 80, isActive = true, height = 48 }: AudioWaveformProps) {
  const [bars, setBars] = useState<number[]>(Array(barCount).fill(5));
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setBars((prev) =>
          prev.map((bar, i) => {
            const center = Math.abs(i - barCount / 2);
            const baseHeight = barCount / 2 - center;
            const random = Math.random() * 30;
            return Math.min(bar + (Math.random() - 0.5) * 10, Math.max(baseHeight + random, 4));
          })
        );
      }, 80);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, barCount]);

  const getBarColor = (barValue: number): string => {
    const intensity = barValue / (barCount / 2 + 10);
    if (intensity < 0.4) return "#10B981"; // green-500
    if (intensity < 0.7) return "#F59E0B"; // amber-500
    return "#F97316"; // orange-500
  };

  const getBarHeight = (bar: number): number => {
    const center = Math.abs(bar - barCount / 2);
    const base = Math.max(barCount / 2 - center, 2) + bar * 0.4;
    return Math.min(base, height) * 0.6 + 2;
  };

  return (
    <div className="flex items-end gap-[2px] h-[48px]">
      {bars.map((bar, index) => (
        <motion.div
          key={index}
          initial={{ height: 4 }}
          animate={{ height: getBarHeight(bar) }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="w-[3px] rounded-full transition-colors duration-300"
          style={{ backgroundColor: getBarColor(bar) }}
        />
      ))}
    </div>
  );
}
