"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ModeToggle } from "../mode/ModeToggle";
import { Input } from "../ui/Input";
import { useStore } from "@/store/useStore";
import { Badge } from "../ui/Badge";
import { Avatar } from "../ui/Avatar";
import {
  Search,
  Bell,
  ChevronDown,
  Wifi,
  WifiOff,
  BookOpen,
  RefreshCw,
  Mic,
  ClipboardList,
  Calendar,
  Activity,
  FileText,
  Sparkles,
} from "lucide-react";

export function TopNav() {
  const [searchOpen, setSearchOpen] = useState(false);
  const patient = useStore((s) => s.currentPatient);
  const mode = useStore((s) => s.mode);
  const setMode = useStore((s) => s.setMode);

  return (
    <header className="h-14 bg-medix-navy border-b border-slate-700/50 flex items-center px-4 gap-4 shrink-0">
      {/* Left: Logo + Status */}
      <div className="flex items-center gap-3 min-w-fit">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-medix-blue to-blue-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-sm tracking-wide">Medix</span>
          <Badge variant="info">v0.1.0</Badge>
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <Wifi className="w-3 h-3 text-emerald-400" />
            <span className="text-[10px] text-emerald-400 font-medium">Online</span>
          </div>
        </motion.div>
      </div>

      {/* Center: Mode Toggle */}
      <div className="flex-1 flex justify-center">
        <ModeToggle />
      </div>

      {/* Right: Patient, Search, Notifications, Avatar */}
      <div className="flex items-center gap-3">
        {/* Patient Pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="px-3 py-1.5 rounded-full bg-medix-surfaceHover/60 border border-slate-600/40 flex items-center gap-2"
        >
          <span className="text-sm font-medium">{patient.name}</span>
          <span className="text-xs text-slate-400">·</span>
          <span className="text-xs text-slate-300">{patient.gender}</span>
          <span className="text-xs text-slate-400">·</span>
          <span className="text-xs text-slate-300">{patient.age}y</span>
          <span className="text-xs text-slate-400">·</span>
          <span className="text-xs font-mono text-medix-accent">{patient.mrn}</span>
        </motion.div>

        {/* Search Bar */}
        <div className="relative">
          {searchOpen ? (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="flex items-center">
                <Input
                  placeholder="Search patients, records..."
                  className="w-48 h-8 text-sm bg-medix-navy-dark border-slate-600"
                  autoFocus
                  onBlur={() => setSearchOpen(false)}
                />
              </div>
            </motion.div>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="w-8 h-8 rounded-lg bg-medix-navy-dark border border-slate-600/40 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Notifications */}
        <button className="relative w-8 h-8 rounded-lg bg-medix-navy-dark border border-slate-600/40 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Doctor Avatar */}
        <div className="relative group">
          <button className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-slate-800/60 transition-colors">
            <Avatar name="Dr. Chen" size="sm" />
            <span className="text-sm text-slate-300 hidden md:inline">Dr. Chen</span>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>
    </header>
  );
}
