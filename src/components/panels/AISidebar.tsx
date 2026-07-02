"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "../ui/Card";
import { useStore } from "@/store/useStore";
import { Sparkles, Clock, TrendingUp, FileText, AlertTriangle, CheckCircle, Activity, BarChart3 } from "lucide-react";

interface HeatmapCell {
  hour: number;
  day: string;
  value: number;
}

const heatmapData: HeatmapCell[] = [
  { hour: 9, day: "Mon", value: 5 },
  { hour: 10, day: "Mon", value: 8 },
  { hour: 11, day: "Mon", value: 6 },
  { hour: 14, day: "Mon", value: 7 },
  { hour: 15, day: "Mon", value: 9 },
  { hour: 16, day: "Mon", value: 4 },
  { hour: 9, day: "Tue", value: 6 },
  { hour: 10, day: "Tue", value: 7 },
  { hour: 11, day: "Tue", value: 9 },
  { hour: 14, day: "Tue", value: 8 },
  { hour: 15, day: "Tue", value: 5 },
  { hour: 9, day: "Wed", value: 7 },
  { hour: 10, day: "Wed", value: 6 },
  { hour: 11, day: "Wed", value: 8 },
  { hour: 14, day: "Wed", value: 9 },
  { hour: 15, day: "Wed", value: 7 },
  { hour: 9, day: "Thu", value: 8 },
  { hour: 10, day: "Thu", value: 5 },
  { hour: 11, day: "Thu", value: 6 },
  { hour: 14, day: "Thu", value: 7 },
  { hour: 15, day: "Thu", value: 8 },
  { hour: 9, day: "Fri", value: 6 },
  { hour: 10, day: "Fri", value: 7 },
  { hour: 11, day: "Fri", value: 5 },
  { hour: 14, day: "Fri", value: 8 },
];

export function AISidebar() {
  const aiInsights = useStore((s) => s.aiInsights);

  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-[320px] shrink-0"
    >
      <div className="space-y-4">
        {/* Notes per hour */}
        <Card>
          <CardHeader title="Notes/Hour" subtitle="Today's productivity" />
          <CardContent>
            <div className="flex items-end gap-2 mb-3">
              <span className="text-3xl font-bold text-white">12.4</span>
              <span className="text-sm text-emerald-400 mb-1">+8%</span>
            </div>
            <div className="w-full bg-slate-700/30 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "78%" }}
                transition={{ delay: 0.5, duration: 1 }}
                className="h-2 rounded-full bg-gradient-to-r from-medix-blue to-blue-400"
              />
            </div>
          </CardContent>
        </Card>

        {/* Average visit duration */}
        <Card>
          <CardHeader title="Avg Visit Duration" subtitle="Compared to last week" />
          <CardContent>
            <div className="flex items-end gap-2 mb-3">
              <span className="text-3xl font-bold text-white">24m</span>
              <span className="text-sm text-emerald-400 mb-1">-3m</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <TrendingUp className="w-3 h-3" />
              <span>Efficiency improving</span>
            </div>
          </CardContent>
        </Card>

        {/* Task completion trends */}
        <Card>
          <CardHeader title="Task Completion" subtitle="This week" />
          <CardContent>
            <div className="space-y-3">
              {[
                { day: "Mon", pct: 85 },
                { day: "Tue", pct: 72 },
                { day: "Wed", pct: 90 },
                { day: "Thu", pct: 68 },
                { day: "Fri", pct: 95 },
              ].map((day) => (
                <div key={day.day} className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 w-6">{day.day}</span>
                  <div className="flex-1 bg-slate-700/30 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${day.pct}%` }}
                      transition={{ delay: 0.6 + day.day.charCodeAt(0) * 0.05, duration: 0.8 }}
                      className={`h-2 rounded-full ${
                        day.pct >= 90 ? "bg-emerald-400" : day.pct >= 75 ? "bg-blue-400" : "bg-amber-400"
                      }`}
                    />
                  </div>
                  <span className="text-xs text-slate-400 w-8 text-right">{day.pct}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Workload heatmap */}
        <Card>
          <CardHeader title="Workload" subtitle="Visits per hour by day" />
          <CardContent>
            <div className="grid grid-cols-2 gap-1.5">
              {heatmapData.map((cell, i) => (
                <motion.div
                  key={`${cell.day}-${cell.hour}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.02 }}
                  className="h-8 rounded flex items-center justify-center text-xs font-medium transition-all hover:scale-105 cursor-pointer"
                  style={{
                    backgroundColor: `rgba(56, 189, 248, ${0.1 + (cell.value / 10) * 0.6})`,
                    color: cell.value >= 8 ? "white" : "#94A3B8",
                  }}
                >
                  {cell.hour}h · {cell.day.slice(0, 1)}
                  <span className="ml-1">{cell.value}</span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
