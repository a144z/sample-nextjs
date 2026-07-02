"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AudioWaveform } from "./AudioWaveform";
import { Button } from "../ui/Button";
import { Pause, Play, StopCircle } from "lucide-react";
import { useStore } from "@/store/useStore";
import { formatDuration } from "@/lib/utils";

export function RecordingControls() {
  const isRecording = useStore((s) => s.isRecording);
  const isPaused = useStore((s) => s.isPaused);
  const recordingDuration = useStore((s) => s.recordingDuration);
  const tickDuration = useStore((s) => s.tickDuration);
  const togglePause = useStore((s) => s.togglePause);

  // Tick duration every second when recording and not paused
  useEffect(() => {
    if (isRecording && !isPaused) {
      const interval = setInterval(() => tickDuration(1000), 1000);
      return () => clearInterval(interval);
    }
  }, [isRecording, isPaused, tickDuration]);

  if (!isRecording) return null;

  return (
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 60, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="bg-medix-navy-dark/95 backdrop-blur-xl border border-slate-600/50 rounded-2xl px-6 py-4 shadow-2xl flex items-center gap-6">
        {/* Recording indicator */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-3 h-3 bg-red-500 rounded-full"
        />

        {/* Duration */}
        <span className="font-mono text-lg font-semibold text-white">
          {formatDuration(recordingDuration)}
        </span>

        {/* Waveform */}
        <AudioWaveform isActive={!isPaused} barCount={60} height={32} />

        {/* Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={togglePause}
            className="h-10 w-10 rounded-full p-0 flex items-center justify-center"
          >
            {isPaused ? (
              <Play className="w-4 h-4" />
            ) : (
              <Pause className="w-4 h-4" />
            )}
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              useStore.getState().setMode("cockpit");
            }}
            className="h-10 px-4 gap-2"
          >
            <StopCircle className="w-4 h-4" />
            <span>End Visit</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
