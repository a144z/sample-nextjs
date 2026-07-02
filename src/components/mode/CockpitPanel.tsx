"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";
import { Card, CardContent, CardHeader } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Avatar } from "../ui/Avatar";
import { KnowledgeGraph } from "../panels/KnowledgeGraph";
import { Clock, Calendar, ClipboardCheck, Users, ListTodo, Plus } from "lucide-react";
import type { Appointment } from "@/store/useStore";

type CockpitTab = "schedule" | "pre-chart" | "all-patients" | "tasks";

export function CockpitPanel() {
  const activeTab = useStore((s) => s.activeCockpitTab);
  const setActiveCockpitTab = useStore((s) => s.setActiveCockpitTab);
  const appointments = useStore((s) => s.appointments);

  return (
    <div className="space-y-4 max-w-[1400px] mx-auto">
      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2"
      >
        <TabButton
          tab="schedule"
          icon={<Clock className="w-4 h-4" />}
          label="Schedule"
        />
        <TabButton
          tab="pre-chart"
          icon={<ClipboardCheck className="w-4 h-4" />}
          label="Pre-chart"
        />
        <TabButton
          tab="all-patients"
          icon={<Users className="w-4 h-4" />}
          label="All Patients"
        />
        <TabButton
          tab="tasks"
          icon={<ListTodo className="w-4 h-4" />}
          label="Tasks"
        />
      </motion.div>

      {/* Tab Content */}
      {activeTab === "schedule" && <ScheduleView appointments={appointments} />}
      {activeTab === "pre-chart" && <PreChartView />}
      {activeTab === "all-patients" && <AllPatientsView />}
      {activeTab === "tasks" && <TasksView />}
    </div>
  );
}

function TabButton({ tab, icon, label }: { tab: CockpitTab; icon: React.ReactNode; label: string }) {
  const activeTab = useStore((s) => s.activeCockpitTab);
  const setActiveCockpitTab = useStore((s) => s.setActiveCockpitTab);

  return (
    <button
      onClick={() => setActiveCockpitTab(tab)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
        activeTab === tab
          ? "bg-medix-blue text-white shadow-lg shadow-medix-blue/25"
          : "text-slate-400 hover:text-white hover:bg-slate-700/50"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function ScheduleView({ appointments }: { appointments: Appointment[] }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Today's Schedule */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="col-span-2"
      >
        <Card>
          <CardHeader
            title="Today's Schedule"
            subtitle={`${appointments.length} appointments · ${new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}`}
          />
          <CardContent>
            <div className="space-y-3">
              {appointments.map((appt, i) => (
                <motion.div
                  key={appt.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  className="flex items-center gap-4 p-3 rounded-xl bg-slate-700/20 border border-slate-600/30 hover:bg-slate-700/40 cursor-pointer transition-colors group"
                >
                  {/* Time column */}
                  <div className="w-16 text-center shrink-0">
                    <span className="text-sm font-semibold text-white">{appt.time}</span>
                    <span className="block text-[10px] text-slate-500 mt-0.5">{Math.floor(appt.durationMinutes / 60)}h {appt.durationMinutes % 60}m</span>
                  </div>

                  {/* Divider */}
                  <div className="w-px h-8 bg-slate-600" />

                  {/* Patient info */}
                  <div className="flex items-center gap-3 flex-1">
                    <Avatar name={appt.patientName} size="sm" />
                    <div>
                      <p className="text-sm font-medium text-white">{appt.patientName}</p>
                      <p className="text-[11px] text-slate-400">{appt.type}</p>
                    </div>
                  </div>

                  {/* Status */}
                  <Badge variant={
                    appt.status === "completed" ? "success" :
                    appt.status === "cancelled" ? "danger" :
                    "info"
                  }>
                    {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                  </Badge>
                </motion.div>
              ))}

              {/* Add appointment button */}
              <Button variant="outline" size="sm" className="w-full border-dashed">
                <Plus className="w-4 h-4" />
                <span>Add Appointment</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Right side - Clock + Knowledge Graph */}
      <div className="space-y-4">
        {/* Circular Clock */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader title="Daily Overview" />
            <CardContent>
              <div className="flex justify-center py-4">
                <svg width="200" height="200" viewBox="0 0 200 200" className="w-full max-w-[200px]">
                  {/* Background circle */}
                  <circle cx="100" cy="100" r="85" fill="none" stroke="#334155" strokeWidth="12" />
                  {/* Progress arc for today's schedule */}
                  <circle
                    cx="100"
                    cy="100"
                    r="85"
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth="12"
                    strokeDasharray={`${(2 / 7) * 534} ${534}`}
                    strokeLinecap="round"
                    transform="rotate(-90 100 100)"
                    className="transition-all duration-1000"
                  />
                  {/* Hour markers */}
                  {[...Array(12)].map((_, i) => {
                    const angle = (i * 30 - 90) * (Math.PI / 180);
                    const x1 = 100 + 72 * Math.cos(angle);
                    const y1 = 100 + 72 * Math.sin(angle);
                    const x2 = 100 + 78 * Math.cos(angle);
                    const y2 = 100 + 78 * Math.sin(angle);
                    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#475569" strokeWidth="2" />;
                  })}
                  {/* Center text */}
                  <text x="100" y="95" textAnchor="middle" className="fill-white font-semibold" fontSize="18">
                    {new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })}
                  </text>
                  <text x="100" y="115" textAnchor="middle" className="fill-slate-400" fontSize="11">
                    {appointments.length} patients
                  </text>
                </svg>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Knowledge Graph */}
        <KnowledgeGraph />
      </div>
    </div>
  );
}

function PreChartView() {
  return (
    <Card>
      <CardHeader title="Pre-charting" subtitle="Prepare for upcoming patients" />
      <CardContent>
        <div className="space-y-4">
          {/* Quick stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { label: "Ready", value: "3", color: "text-emerald-400" },
              { label: "Pending", value: "4", color: "text-amber-400" },
              { label: "Incomplete", value: "1", color: "text-red-400" },
              { label: "Completed", value: "5", color: "text-blue-400" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-3 rounded-lg bg-slate-700/20">
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Patient cards */}
          {[
            { name: "李*", type: "New Patient", notes: "Pending records" },
            { name: "王*", type: "Routine", notes: "Follow-up on lab results" },
            { name: "陈*", type: "Urgent", notes: "Need prior auth" },
          ].map((patient, i) => (
            <motion.div
              key={patient.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="flex items-center justify-between p-4 rounded-xl bg-slate-700/20 border border-slate-600/30 hover:bg-slate-700/40 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3">
                <Avatar name={patient.name} size="sm" />
                <div>
                  <p className="font-medium text-white">{patient.name}</p>
                  <p className="text-xs text-slate-400">{patient.type} · {patient.notes}</p>
                </div>
              </div>
              <Badge variant={
                patient.type === "Urgent" ? "danger" :
                patient.type === "New Patient" ? "info" : "success"
              }>
                {patient.type}
              </Badge>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function AllPatientsView() {
  const patients = [
    { name: "张**", age: 52, mrn: "MRN 12345", status: "Active" },
    { name: "李*", age: 38, mrn: "MRN 12346", status: "Active" },
    { name: "王*", age: 65, mrn: "MRN 12347", status: "Chronic" },
    { name: "陈*", age: 45, mrn: "MRN 12348", status: "Active" },
    { name: "刘*", age: 71, mrn: "MRN 12349", status: "Chronic" },
    { name: "赵*", age: 29, mrn: "MRN 12350", status: "New" },
    { name: "黄*", age: 56, mrn: "MRN 12351", status: "Active" },
    { name: "周*", age: 43, mrn: "MRN 12352", status: "Active" },
  ];

  return (
    <Card>
      <CardHeader title="All Patients" subtitle={`${patients.length} patients`} />
      <CardContent>
        <div className="grid grid-cols-4 gap-4">
          {patients.map((patient, i) => (
            <motion.div
              key={patient.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 * i }}
              className="p-4 rounded-xl bg-slate-700/20 border border-slate-600/30 hover:bg-slate-700/40 cursor-pointer transition-all hover:scale-[1.02] text-center"
            >
              <Avatar name={patient.name} size="lg" className="mx-auto mb-3" />
              <p className="font-medium text-white text-sm">{patient.name}</p>
              <p className="text-xs text-slate-400 mt-1">{patient.age}y · {patient.mrn}</p>
              <Badge variant={
                patient.status === "Chronic" ? "warning" :
                patient.status === "New" ? "info" : "success"
              } className="mt-2">
                {patient.status}
              </Badge>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function TasksView() {
  const tasks = [
    { id: "t1", text: "Review lab results for Zhang", completed: true, priority: "high" },
    { id: "t2", text: "Prescribe blood work", completed: false, priority: "medium" },
    { id: "t3", text: "Follow up on CT scan", completed: false, priority: "high" },
    { id: "t4", text: "Update medication list", completed: true, priority: "low" },
    { id: "t5", text: "Schedule referral to cardiology", completed: false, priority: "medium" },
  ];

  return (
    <Card>
      <CardHeader title="Tasks" subtitle={`${tasks.filter(t => t.completed).length}/${tasks.length} completed`} />
      <CardContent>
        <div className="space-y-2">
          {tasks.map((task, i) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * i }}
              className={`flex items-center gap-3 p-3 rounded-lg border ${task.completed ? "bg-slate-800/40 border-transparent opacity-60" : "bg-slate-700/20 border-slate-600/30"} transition-colors cursor-pointer`}
            >
              <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 ${task.completed ? "bg-medix-blue" : "border border-slate-500"}`}>
                {task.completed && (
                  <svg width="12" height="12" viewBox="0 0 12 12">
                    <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  </svg>
                )}
              </div>
              <span className={`flex-1 text-sm ${task.completed ? "text-slate-400 line-through" : "text-white"}`}>
                {task.text}
              </span>
              <Badge variant={
                task.priority === "high" ? "danger" :
                task.priority === "medium" ? "warning" : "info"
              }>
                {task.priority}
              </Badge>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
