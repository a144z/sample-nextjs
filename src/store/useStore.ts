import { create } from "zustand";
import type {
  Patient,
  Keyword,
  EncounterData,
  StructuredData,
  SOAPNote,
  AIInsight,
  Appointment,
  GraphNode,
  GraphEdge,
  EncounterSession,
} from "./types";

export type { Appointment };

export type Mode = "listening" | "cockpit";

interface AppState {
  mode: Mode;
  setMode: (mode: Mode) => void;

  patient: Patient | null;
  setPatient: (patient: Patient) => void;
  currentPatient: Patient;

  isRecording: boolean;
  isPaused: boolean;
  recordingDuration: number;
  toggleRecording: () => void;
  togglePause: () => void;
  resetRecording: () => void;
  tickDuration: (ms: number) => void;

  keywords: Keyword[];
  setKeywords: (keywords: Keyword[]) => void;

  encounterData: EncounterData[];
  addEncounterEntry: (entry: Omit<EncounterData, "id">) => void;
  clearEncounterData: () => void;

  structuredData: StructuredData[];
  setStructuredData: (data: StructuredData[]) => void;

  soapNote: SOAPNote;
  updateSOAPField: (field: keyof Omit<SOAPNote, "id">, value: string) => void;

  aiInsights: AIInsight[];
  setAIInsights: (insights: AIInsight[]) => void;

  appointments: Appointment[];
  setAppointments: (appointments: Appointment[]) => void;

  activeCockpitTab: "schedule" | "pre-chart" | "all-patients" | "tasks";
  setActiveCockpitTab: (tab: "schedule" | "pre-chart" | "all-patients" | "tasks") => void;

  graphNodes: GraphNode[];
  graphEdges: GraphEdge[];
  setGraphData: (nodes: GraphNode[], edges: GraphEdge[]) => void;

  sessions: EncounterSession[];
  setSessions: (sessions: EncounterSession[]) => void;

  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: AIInsight[];
  setSearchResults: (results: AIInsight[]) => void;
  isSearching: boolean;
  setIsSearching: (searching: boolean) => void;
}

export const useStore = create<AppState>((set, get) => ({
  mode: "listening",
  setMode: (mode) => set({ mode }),

  patient: null,
  currentPatient: {
    id: "P001",
    name: "张**",
    gender: "F",
    age: 52,
    mrn: "MRN 12345",
    chiefComplaint: "Persistent headache and fatigue for 3 months",
  },
  setPatient: (patient) => set({ patient }),

  isRecording: false,
  isPaused: false,
  recordingDuration: 0,
  toggleRecording: () => {
    const { isRecording } = get();
    if (!isRecording) {
      set({ isRecording: true, isPaused: false });
    } else {
      set({ isRecording: false, isPaused: false });
    }
  },
  togglePause: () => {
    const { isPaused } = get();
    set({ isPaused: !isPaused });
  },
  resetRecording: () => set({ isRecording: false, isPaused: false, recordingDuration: 0 }),
  tickDuration: (ms) => set((state) => ({ recordingDuration: state.recordingDuration + ms })),

  keywords: [
    { id: "k1", label: "Headache", count: 8, category: "Symptom" },
    { id: "k2", label: "Fatigue", count: 6, category: "Symptom" },
    { id: "k3", label: "Insomnia", count: 4, category: "Symptom" },
    { id: "k4", label: "Anxiety", count: 3, category: "Mental Health" },
    { id: "k5", label: "Dizziness", count: 2, category: "Symptom" },
    { id: "k6", label: "Palpitations", count: 2, category: "Cardiovascular" },
    { id: "k7", label: "Medication Non-adherence", count: 3, category: "History" },
    { id: "k8", label: "Dietary Changes", count: 2, category: "Lifestyle" },
  ],
  setKeywords: (keywords) => set({ keywords }),

  encounterData: [],
  addEncounterEntry: (entry) =>
    set((state) => ({ encounterData: [...state.encounterData, { ...entry, id: Date.now().toString() }] })),
  clearEncounterData: () => set({ encounterData: [] }),

  structuredData: [
    { id: "s1", field: "Blood Pressure", value: "130/85 mmHg" },
    { id: "s2", field: "Heart Rate", value: "78 bpm" },
    { id: "s3", field: "Temperature", value: "36.8°C" },
    { id: "s4", field: "Respiratory Rate", value: "16/min" },
    { id: "s5", field: "SpO2", value: "98%" },
  ],
  setStructuredData: (structuredData) => set({ structuredData }),

  soapNote: {
    id: "sn1",
    subjective: "Patient reports persistent headache and fatigue for the past 3 months. States that headaches are worse in the morning and improve throughout the day.",
    objective: "BP 130/85, HR 78, Temp 36.8°C, SpO2 98%. Physical examination reveals mild tenderness on temporal regions bilaterally. No neurological deficits noted.",
    assessment: "Likely tension-type headache with associated fatigue syndrome. Differential includes migraines and sleep-disordered breathing.",
    plan: "1. Start amitriptyline 10mg at bedtime\n2. Recommend sleep study\n3. Follow up in 4 weeks\n4. Consider CT head if symptoms persist",
  },
  updateSOAPField: (field, value) => set((state) => ({ soapNote: { ...state.soapNote, [field]: value } })),

  aiInsights: [
    { id: "i1", title: "Potential Sleep Apnea", description: "Patient's symptoms correlate with sleep apnea patterns. Recommend polysomnography.", type: "diagnosis" },
    { id: "i2", title: "Medication Interaction", description: "Current medications may interact. Review with pharmacist recommended.", type: "medication" },
    { id: "i3", title: "Lab Results Pending", description: "CBC, TSH, and Vitamin D levels pending. Consider reviewing upon completion.", type: "lab" },
    { id: "i4", title: "Flag: Family History", description: "Mother had similar symptoms. Consider genetic component.", type: "warning" },
  ],
  setAIInsights: (aiInsights) => set({ aiInsights }),

  appointments: [
    { id: "a1", time: "09:00", patientName: "张**", type: "Follow-up", status: "completed", durationMinutes: 30 },
    { id: "a2", time: "09:30", patientName: "李*", type: "New Patient", status: "scheduled", durationMinutes: 45 },
    { id: "a3", time: "10:30", patientName: "王*", type: "Routine", status: "scheduled", durationMinutes: 20 },
    { id: "a4", time: "11:00", patientName: "陈*", type: "Urgent", status: "scheduled", durationMinutes: 30 },
    { id: "a5", time: "14:00", patientName: "刘*", type: "Follow-up", status: "scheduled", durationMinutes: 30 },
    { id: "a6", time: "14:30", patientName: "赵*", type: "New Patient", status: "scheduled", durationMinutes: 45 },
    { id: "a7", time: "15:30", patientName: "黄*", type: "Routine", status: "scheduled", durationMinutes: 20 },
  ],
  setAppointments: (appointments) => set({ appointments }),

  activeCockpitTab: "schedule",
  setActiveCockpitTab: (activeCockpitTab) => set({ activeCockpitTab }),

  graphNodes: [
    { id: "n1", label: "Headache", category: "symptom" },
    { id: "n2", label: "Fatigue", category: "symptom" },
    { id: "n3", label: "Insomnia", category: "symptom" },
    { id: "n4", label: "Anxiety", category: "mental" },
    { id: "n5", label: "Hypertension", category: "condition" },
    { id: "n6", label: "Sleep Apnea", category: "condition" },
    { id: "n7", label: "Amitriptyline", category: "medication" },
  ],
  graphEdges: [
    { source: "n1", target: "n3", relation: "associated" },
    { source: "n1", target: "n4", relation: "triggers" },
    { source: "n2", target: "n6", relation: "correlates" },
    { source: "n3", target: "n6", relation: "suggests" },
    { source: "n1", target: "n5", relation: "linked" },
    { source: "n5", target: "n7", relation: "treated-by" },
  ],
  setGraphData: (graphNodes, graphEdges) => set({ graphNodes, graphEdges }),

  sessions: [
    { id: "e1", date: "2026-04-15", doctor: "Dr. Smith", chiefComplaint: "Headache", keywords: ["Headache", "Migraine"], color: "#38BDF8" },
    { id: "e2", date: "2026-03-20", doctor: "Dr. Wang", chiefComplaint: "Fatigue", keywords: ["Fatigue", "Insomnia"], color: "#A78BFA" },
    { id: "e3", date: "2026-02-10", doctor: "Dr. Lee", chiefComplaint: "Chest Pain", keywords: ["Chest Pain", "Palpitations"], color: "#F472B6" },
    { id: "e4", date: "2025-12-05", doctor: "Dr. Smith", chiefComplaint: "Dizziness", keywords: ["Dizziness", "Anxiety"], color: "#34D399" },
    { id: "e5", date: "2025-10-22", doctor: "Dr. Wang", chiefComplaint: "Cough", keywords: ["Cough", "Cold"], color: "#FBBF24" },
  ],
  setSessions: (sessions) => set({ sessions }),

  searchQuery: "",
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  searchResults: [],
  setSearchResults: (searchResults) => set({ searchResults }),
  isSearching: false,
  setIsSearching: (isSearching) => set({ isSearching }),
}));
