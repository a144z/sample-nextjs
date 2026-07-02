"use client";

import { TopNav } from "./TopNav";
import { Sidebar } from "./Sidebar";
import { RecordingControls } from "../audio/RecordingControls";
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils";
import { ListeningPanel } from "../mode/ListeningPanel";
import { CockpitPanel } from "../mode/CockpitPanel";

export function AppLayout() {
  const mode = useStore((s) => s.mode);
  const isRecording = useStore((s) => s.isRecording);

  return (
    <div className="h-screen w-screen bg-medix-navy-dark text-white flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navigation */}
        <TopNav />

        {/* Page Content */}
        <div
          className={cn(
            "flex-1 overflow-y-auto p-6 transition-all duration-500",
            mode === "listening" && isRecording ? "pb-24" : "pb-6"
          )}
        >
          {mode === "listening" ? <ListeningPanel /> : <CockpitPanel />}
        </div>
      </div>

      {/* Recording Controls (floating bar) */}
      {isRecording && mode === "listening" && (
        <RecordingControls />
      )}
    </div>
  );
}
