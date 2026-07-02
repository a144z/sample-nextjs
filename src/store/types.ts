export type Patient = {
  id: string;
  name: string;
  gender: "M" | "F";
  age: number;
  mrn: string;
  chiefComplaint: string;
  avatarUrl?: string;
};

export type Appointment = {
  id: string;
  time: string;
  patientName: string;
  type: string;
  status: "scheduled" | "completed" | "cancelled";
  durationMinutes: number;
};

export type Keyword = {
  id: string;
  label: string;
  count: number;
  category: string;
};

export type EncounterData = {
  id: string;
  timestamp: string;
  speaker: "doctor" | "patient";
  text: string;
};

export type StructuredData = {
  id: string;
  field: string;
  value: string;
};

export type SOAPNote = {
  id: string;
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
};

export type AIInsight = {
  id: string;
  title: string;
  description: string;
  type: "diagnosis" | "medication" | "lab" | "warning";
};

export type GraphNode = {
  id: string;
  label: string;
  category: string;
};

export type GraphEdge = {
  source: string;
  target: string;
  relation: string;
};

export type EncounterSession = {
  id: string;
  date: string;
  doctor: string;
  chiefComplaint: string;
  keywords: string[];
  color: string;
};
