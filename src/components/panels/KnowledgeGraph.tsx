"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "../ui/Card";
import { useStore } from "@/store/useStore";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

interface DataPoint {
  name: string;
  value: number;
  value2?: number;
}

const chartData: DataPoint[] = [
  { name: "Jan", value: 30, value2: 45 },
  { name: "Feb", value: 45, value2: 50 },
  { name: "Mar", value: 55, value2: 48 },
  { name: "Apr", value: 65, value2: 55 },
  { name: "May", value: 72, value2: 60 },
  { name: "Jun", value: 78, value2: 65 },
  { name: "Jul", value: 85, value2: 70 },
  { name: "Aug", value: 90, value2: 72 },
  { name: "Sep", value: 95, value2: 75 },
  { name: "Oct", value: 100, value2: 80 },
];

export function KnowledgeGraph() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Card>
        <CardHeader
          title="Knowledge Graph"
          subtitle="Patient data visualization"
        />
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#38BDF8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorValue2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#A78BFA" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#A78BFA" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis
                  dataKey="name"
                  stroke="#64748B"
                  fontSize={10}
                />
                <YAxis stroke="#64748B" fontSize={10} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1E293B",
                    border: "1px solid #334155",
                    borderRadius: "8px",
                    color: "#F1F5F9",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#38BDF8"
                  fillOpacity={1}
                  fill="url(#colorValue)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="value2"
                  stroke="#A78BFA"
                  fillOpacity={1}
                  fill="url(#colorValue2)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-6 mt-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-400" />
              <span className="text-xs text-slate-400">Health Score</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-400" />
              <span className="text-xs text-slate-400">Risk Score</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
