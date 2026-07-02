"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";
import { Badge } from "../ui/Badge";
import { Card, CardContent, CardHeader } from "../ui/Card";
import { Button } from "../ui/Button";
import { Sparkles, Brain, Zap, Eye, FileText, Clock, Activity, CheckCircle2 } from "lucide-react";

export function ListeningPanel() {
  const patient = useStore((s) => s.currentPatient);
  const keywords = useStore((s) => s.keywords);
  const encounterData = useStore((s) => s.encounterData);
  const structuredData = useStore((s) => s.structuredData);
  const soapNote = useStore((s) => s.soapNote);
  const aiInsights = useStore((s) => s.aiInsights);
  const addEncounterEntry = useStore((s) => s.addEncounterEntry);

  return (
    <div className="space-y-4 max-w-[1400px] mx-auto">
      {/* Patient Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card variant="glass" className="bg-gradient-to-r from-medix-blue/10 to-purple-500/10 border-medix-blue/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-medix-blue to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                {patient.name.replace("*","").slice(0, 2)}
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">{patient.name}</h1>
                <div className="flex items-center gap-3 mt-1">
                  <Badge variant="info">{patient.gender}</Badge>
                  <span className="text-sm text-slate-400">{patient.age} years old</span>
                  <span className="text-sm font-mono text-medix-accent">{patient.mrn}</span>
                </div>
              </div>
            </div>
            <Badge variant="success">Encounter Active</Badge>
          </div>
          <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2">
            <Brain className="w-4 h-4 text-medix-accent" />
            <span className="text-sm text-slate-300">
              <strong>C/C:</strong> {patient.chiefComplaint}
            </span>
          </div>
        </Card>
      </motion.div>

      {/* Main Grid - Three Columns */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-3 gap-4"
      >
        {/* Left Column - Keywords */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader title="Keywords" subtitle="Detected from conversation" />
            <CardContent>
              <div className="space-y-2">
                {keywords.map((kw, i) => (
                  <motion.div
                    key={kw.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    className="group flex items-center justify-between p-2 rounded-lg hover:bg-slate-700/40 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${getKeywordColor(kw.category)}`} />
                      <span className="text-sm text-slate-200">{kw.label}</span>
                    </div>
                    <span className="text-xs text-slate-500 font-mono">{kw.count}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Center Column - Real-Time Encounter Data */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader title="Live Transcript" subtitle="Real-time conversation" />
            <CardContent>
              <div className="space-y-3 h-[320px] overflow-y-auto pr-2 custom-scrollbar">
                {encounterData.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-slate-500">
                    <Zap className="w-8 h-8 mb-2 opacity-50" />
                    <span className="text-sm">Listening to encounter...</span>
                  </div>
                ) : (
                  encounterData.map((entry) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, x: entry.speaker === "doctor" ? -10 : 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex gap-2 ${entry.speaker === "doctor" ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-xl text-sm ${
                          entry.speaker === "doctor"
                            ? "bg-medix-blue/15 text-slate-200 border border-medix-blue/20"
                            : "bg-slate-700/30 text-slate-300"
                        }`}
                      >
                        <span className={`text-xs font-medium uppercase tracking-wide block mb-0.5 ${entry.speaker === "doctor" ? "text-medix-blue" : "text-slate-400"}`}>
                          {entry.speaker}
                        </span>
                        {entry.text}
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Column - Structured Data */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader title="Vitals" subtitle="Structured data" />
            <CardContent>
              <div className="space-y-2">
                {structuredData.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.05 }}
                    className="flex items-center justify-between p-2 rounded-lg bg-slate-700/20 border border-slate-600/30"
                  >
                    <span className="text-xs text-slate-400">{item.field}</span>
                    <span className="text-sm font-medium text-white">{item.value}</span>
                  </motion.div>
                ))}
              </div>

              {/* AI Insights */}
              <div className="mt-4 pt-4 border-t border-slate-600/30">
                <CardHeader title="AI Insights" subtitle="Generated during encounter" />
                <div className="space-y-2">
                  {aiInsights.map((insight) => (
                    <motion.div
                      key={insight.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 + insight.id.charCodeAt(0) * 0.05 }}
                      className="p-2 rounded-lg bg-slate-700/20 border border-slate-600/30"
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <Sparkles className="w-3 h-3 text-medix-accent" />
                        <span className="text-xs font-medium text-white">{insight.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-400">{insight.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* SOAP Notes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card>
          <CardHeader
            title="SOAP Note"
            subtitle="Auto-generated from encounter data"
          />
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              <SoapSection label="Subjective" icon={<Eye className="w-4 h-4" />} color="text-blue-400" value={soapNote.subjective} />
              <SoapSection label="Objective" icon={<Activity className="w-4 h-4" />} color="text-green-400" value={soapNote.objective} />
              <SoapSection label="Assessment" icon={<Brain className="w-4 h-4" />} color="text-purple-400" value={soapNote.assessment} />
              <SoapSection label="Plan" icon={<FileText className="w-4 h-4" />} color="text-amber-400" value={soapNote.plan} />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="ghost" size="sm">Discard</Button>
              <Button variant="outline" size="sm">Edit</Button>
              <Button size="sm">Save Note</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

function SoapSection({ label, icon, color, value }: { label: string; icon: React.ReactNode; color: string; value: string }) {
  return (
    <div className="space-y-2">
      <div className={`flex items-center gap-1.5 ${color}`}>
        {icon}
        <span className="text-xs font-semibold uppercase tracking-wide">{label}</span>
      </div>
      <p className="text-sm text-slate-300 whitespace-pre-line leading-relaxed">{value}</p>
    </div>
  );
}

function getKeywordColor(category: string): string {
  const colors: Record<string, string> = {
    "Symptom": "bg-emerald-400",
    "Mental Health": "bg-purple-400",
    "Cardiovascular": "bg-red-400",
    "History": "bg-amber-400",
    "Lifestyle": "bg-blue-400",
  };
  return colors[category] || "bg-slate-400";
}
