"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";
import {
  Home,
  RefreshCw,
  Mic,
  ClipboardList,
  Calendar,
  Activity,
  FileText,
  Sparkles,
  MapPin,
} from "lucide-react";

interface NavItem {
  icon: React.ElementType;
  label: string;
  tooltip: string;
}

const navItems: NavItem[] = [
  { icon: Home, label: "Home", tooltip: "Home" },
  { icon: RefreshCw, label: "Refresh", tooltip: "Refresh Data" },
  { icon: Mic, label: "Record", tooltip: "Recording" },
  { icon: ClipboardList, label: "Clipboard", tooltip: "Clipboard" },
  { icon: Calendar, label: "Calendar", tooltip: "Calendar" },
  { icon: Activity, label: "Monitor", tooltip: "Monitor" },
  { icon: FileText, label: "Documents", tooltip: "Documents" },
  { icon: Sparkles, label: "AI Tools", tooltip: "AI Tools" },
];

export function Sidebar() {
  const [activeItem, setActiveItem] = useState<string>("Home");
  const mode = useStore((s) => s.mode);
  const [isCollapsed] = useState(false);

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`${isCollapsed ? "w-16" : "w-[70px]"} bg-medix-navy border-r border-slate-700/50 flex flex-col items-center py-4 gap-1 shrink-0`}
    >
      {/* Top indicator */}
      <div className="mb-4">
        <motion.div
          layout
          className={`w-1 h-8 rounded-full ${mode === "listening" ? "bg-medix-blue" : "bg-purple-500"}`}
        />
      </div>

      {navItems.map((item) => (
        <button
          key={item.label}
          onClick={() => setActiveItem(item.label)}
          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 relative group
            ${activeItem === item.label ? "bg-medix-blue/20 text-medix-blue" : "text-slate-400 hover:text-white hover:bg-slate-700/50"}`}
          title={item.tooltip}
        >
          <item.icon className="w-[18px] h-[18px]" />
          {/* Tooltip */}
          <span className="absolute left-14 px-2 py-1 bg-slate-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
            {item.tooltip}
          </span>
        </button>
      ))}

      {/* Bottom spacer */}
      <div className="flex-1" />

      {/* Status indicator at bottom */}
      <div className="w-8 h-[2px] bg-slate-700/50 mx-auto mb-2" />
    </motion.aside>
  );
}
