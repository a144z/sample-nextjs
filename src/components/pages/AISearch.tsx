"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { useStore } from "@/store/useStore";
import {
  Search,
  Mic,
  Sparkles,
  FileText,
  ExternalLink,
  CheckCircle2,
  X,
  Bot,
  User,
} from "lucide-react";

const mockResults = [
  {
    id: "r1",
    query: "Headache treatments for chronic patients",
    answer: "Based on clinical guidelines, first-line treatments include: amitriptyline (10-25mg), topiramate, and lifestyle modifications. The patient's current prescription of amitriptyline aligns with recommended protocols.",
    sources: [
      { type: "Clinical Guideline", title: "AHA Headache Management 2025" },
      { type: "Patient Record", title: "Previous prescriptions (2024-2026)" },
    ],
    confidence: 92,
  },
  {
    id: "r2",
    query: "Sleep apnea symptoms in middle-aged women",
    answer: "Common symptoms include daytime fatigue, morning headaches, and insomnia. Risk factors for this patient: age 52, female, BMI ~26. Recommend polysomnography if STOP-BANG score is >=3.",
    sources: [
      { type: "Literature", title: "JAMA Internal Medicine - Sleep Disorders 2024" },
      { type: "Lab Data", title: "Patient's TSH and Vitamin D pending" },
    ],
    confidence: 87,
  },
  {
    id: "r3",
    query: "Medication interactions with amitriptyline",
    answer: "Key interactions: MAOIs (contraindicated), SSRIs (increased serotonin syndrome risk), and CYP2D6 inhibitors. Review current medication list for potential conflicts.",
    sources: [
      { type: "Drug Database", title: "Micromedex Interaction Checker" },
      { type: "Patient Record", title: "Current medications" },
    ],
    confidence: 95,
  },
];

export function AISearch() {
  const { searchQuery, setSearchQuery, isSearching, setIsSearching, searchResults } = useStore();
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setTimeout(() => {
      setShowResults(true);
      setIsSearching(false);
    }, 1200);
  };

  const handleInsert = (resultId: string) => {
    console.log("Inserted result:", resultId);
  };

  return (
    <div className="space-y-6 max-w-[800px] mx-auto">
      {/* Search Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-white">AI Search</h1>
        <p className="text-sm text-slate-400 mt-1">Ask anything about your patients</p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card variant="glass">
          <CardContent>
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Ask a medical question..."
                className="flex-1 bg-transparent text-white placeholder:text-slate-500 focus:outline-none text-base py-2"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery("What should I know about this patient?")}
                className="text-medix-accent"
              >
                <Mic className="w-4 h-4" />
              </Button>
              <Button variant="primary" size="sm" onClick={handleSearch}>
                Ask
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Loading State */}
      {isSearching && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-3 py-12"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-10 h-10 border-2 border-medix-blue border-t-transparent rounded-full"
          />
          <span className="text-sm text-slate-400">Analyzing patient data...</span>
        </motion.div>
      )}

      {/* Results */}
      {showResults && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">
              {mockResults.length} Results Found
            </h3>
            <Badge variant="info">AI Generated</Badge>
          </div>

          {mockResults.map((result, i) => (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="rounded-xl border border-slate-700/50 overflow-hidden hover:border-medix-blue/30 transition-colors"
            >
              {/* Answer section */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-medix-accent" />
                  <span className="text-xs font-medium text-medix-accent">Answer</span>
                  <Badge variant="success" className="ml-auto">
                    {result.confidence}% confidence
                  </Badge>
                </div>

                <p className="text-sm text-slate-200 leading-relaxed mb-4">{result.answer}</p>

                {/* Sources */}
                <div className="space-y-2">
                  <span className="text-xs font-medium text-slate-400">Sources</span>
                  {result.sources.map((source, si) => (
                    <div key={si} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-700/30 border border-slate-600/30">
                      <FileText className="w-3.5 h-3.5 text-medix-accent shrink-0" />
                      <span className="text-xs text-white font-medium">{source.title}</span>
                      <Badge variant="default" className="ml-auto text-[10px]">{source.type}</Badge>
                    </div>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 mt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleInsert(result.id)}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Insert into Note</span>
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View Full Source</span>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Chat interface */}
      {showResults && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader title="Continue Conversation" subtitle="Ask follow-up questions" />
            <CardContent className="space-y-4">
              {/* Messages */}
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Bot className="w-5 h-5 text-medix-accent shrink-0 mt-0.5" />
                  <div className="bg-slate-700/30 rounded-xl rounded-tl-sm p-3 max-w-[80%]">
                    <p className="text-sm text-slate-200">I found some relevant information about this patient's condition and treatment options. Would you like me to elaborate on any specific aspect?</p>
                  </div>
                </div>
              </div>

              {/* Input */}
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-slate-400 shrink-0" />
                <input
                  placeholder="Type a follow-up question..."
                  className="flex-1 bg-transparent text-white placeholder:text-slate-500 focus:outline-none text-sm py-2"
                />
                <Button variant="primary" size="sm">
                  Send
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
