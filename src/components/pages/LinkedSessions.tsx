"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Avatar } from "../ui/Avatar";
import { Sparkles, Clock, ArrowLeftRight, Calendar as CalendarIcon } from "lucide-react";

interface SessionProps {
  date: string;
  doctor: string;
  chiefComplaint: string;
  keywords: string[];
  color: string;
}

const sessions: SessionProps[] = [
  { date: "2026-04-15", doctor: "Dr. Smith", chiefComplaint: "Headache", keywords: ["Headache", "Migraine"], color: "#38BDF8" },
  { date: "2026-03-20", doctor: "Dr. Wang", chiefComplaint: "Fatigue", keywords: ["Fatigue", "Insomnia"], color: "#A78BFA" },
  { date: "2026-02-10", doctor: "Dr. Lee", chiefComplaint: "Chest Pain", keywords: ["Chest Pain", "Palpitations"], color: "#F472B6" },
  { date: "2025-12-05", doctor: "Dr. Smith", chiefComplaint: "Dizziness", keywords: ["Dizziness", "Anxiety"], color: "#34D399" },
  { date: "2025-10-22", doctor: "Dr. Wang", chiefComplaint: "Cough", keywords: ["Cough", "Cold"], color: "#FBBF24" },
  { date: "2025-08-15", doctor: "Dr. Chen", chiefComplaint: "Back Pain", keywords: ["Back Pain", "Posture"], color: "#FB923C" },
];

export function LinkedSessions() {
  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-white">Linked Sessions</h1>
        <p className="text-sm text-slate-400 mt-1">Longitudinal patient encounter history</p>
      </motion.div>

      {/* Timeline */}
      <Card>
        <CardHeader title="Encounter Timeline" subtitle="5 encounters · Spanning 8 months" />
        <CardContent>
          {/* Timeline track */}
          <div className="relative py-6 px-4">
            {/* Horizontal line */}
            <div className="absolute top-1/2 left-0 right-0 h-[3px] bg-slate-700 -translate-y-1/2" />

            {/* Sessions */}
            <div className="flex items-center justify-between relative">
              {sessions.map((session, i) => (
                <motion.div
                  key={session.date}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="flex flex-col items-center group"
                >
                  {/* Top labels */}
                  <div className="mb-4 text-center">
                    <p className="text-xs font-semibold text-white">{session.date}</p>
                    <p className="text-[10px] text-slate-400">{session.doctor}</p>
                  </div>

                  {/* Bubble */}
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg cursor-pointer relative z-10"
                    style={{ backgroundColor: `${session.color}30`, borderColor: session.color, borderWidth: "2px", borderStyle: "solid" }}
                  >
                    <span className="text-lg" style={{ color: session.color }}>
                      {i + 1}
                    </span>
                  </motion.div>

                  {/* Bottom labels */}
                  <div className="mt-4 text-center max-w-[80px]">
                    <p className="text-xs font-medium text-white">{session.chiefComplaint}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{session.keywords.join(", ")}</p>
                  </div>
                </motion.div>
              ))}

              {/* Connector arrows */}
              {sessions.map((_, i) => (
                <div key={`arrow-${i}`} className="absolute top-1/2 -translate-y-1/2" style={{ left: `${(i / (sessions.length - 1)) * 100 + (50 / (sessions.length - 1))}%` }}>
                  <ArrowLeftRight className="w-4 h-4 text-slate-600" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Session details */}
      <div className="grid grid-cols-2 gap-4">
        {sessions.slice(0, 2).map((session, i) => (
          <motion.div
            key={session.date}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="rounded-xl p-5 cursor-pointer hover:bg-slate-700/30 transition-colors"
            style={{ border: `1px solid ${session.color}30` }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold" style={{ color: session.color }}>
                {session.date}
              </span>
              <Badge variant="default">{session.chiefComplaint}</Badge>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <Avatar name={session.doctor} size="sm" />
              <span className="text-sm text-slate-300">{session.doctor}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {session.keywords.map((kw) => (
                <span key={kw} className="px-2 py-0.5 rounded-full text-[10px] bg-slate-700/40 text-slate-300 border border-slate-600/30">
                  {kw}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
