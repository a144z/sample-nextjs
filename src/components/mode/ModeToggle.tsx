"use client";

import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";

export function ModeToggle() {
  const mode = useStore((s) => s.mode);
  const setMode = useStore((s) => s.setMode);

  return (
    <div className="relative flex items-center">
      {/* Background pill */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className={`w-[200px] h-9 rounded-full p-1 ${mode === "listening" ? "bg-gradient-to-r from-medix-blue to-blue-500" : "bg-gradient-to-r from-purple-600 to-purple-500"}`}
      />

      {/* Toggle buttons */}
      <div className="absolute inset-1 flex">
        <button
          onClick={() => setMode("listening")}
          className={`flex-1 text-sm font-medium transition-colors relative z-10 ${mode === "listening" ? "text-white" : "text-white/60 hover:text-white"}`}
        >
          Listening
        </button>
        <button
          onClick={() => setMode("cockpit")}
          className={`flex-1 text-sm font-medium transition-colors relative z-10 ${mode === "cockpit" ? "text-white" : "text-white/60 hover:text-white"}`}
        >
          Cockpit
        </button>
      </div>

      {/* Sliding indicator */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className={`absolute w-[calc(50%-4px)] h-7 rounded-full ${mode === "listening" ? "left-1 bg-white" : "left-[calc(50%+2px)] bg-white/20"}`}
      />
    </div>
  );
}
