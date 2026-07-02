# Medix Co-pilot — Project Tickets (Jira-style)

This document contains the complete set of development tickets organized by epic. Each ticket includes ID, title, description, story points, status, priority, assignee, and acceptance criteria.

---

## Epic: Audio & Transcription (~25 SP)

### MED-101 — Real-time Audio Waveform Component
- **Title:** Create animated audio waveform visualization component
- **Description:** Build a bar-based audio waveform that responds to audio amplitude with smooth spring animations, showing green/yellow/orange based on intensity level.
- **Story Points:** 5 SP
- **Status:** Done
- **Priority:** High
- **Assignee:** Frontend Developer
- **Acceptance Criteria:**
  - [x] 80 animated bars with spring physics
  - [x] Color gradient based on amplitude
  - [x] Toggleable active/inactive states
  - [x] Configurable bar count and height

### MED-102 — Recording Controls Bar
- **Title:** Implement floating recording controls with duration timer
- **Description:** Create a bottom floating bar showing recording state, formatted duration counter (mm:ss), waveform preview, and control buttons.
- **Story Points:** 3 SP
- **Status:** Done
- **Priority:** High
- **Assignee:** Frontend Developer
- **Acceptance Criteria:**
  - [x] Red pulsing recording indicator
  - [x] Duration counter formatted as mm:ss
  - [x] Mini waveform visualization
  - [x] Pause/Resume and End Visit buttons
  - [x] Smooth entrance/exit animations

### MED-103 — Audio State Management
- **Title:** Set up Zustand store for audio recording state
- **Description:** Manage isRecording, isPaused, and recordingDuration states with proper tick logic.
- **Story Points:** 2 SP
- **Status:** Done
- **Priority:** Medium
- **Assignee:** Frontend Developer
- **Acceptance Criteria:**
  - [x] Store tracks all three audio states
  - [x] Duration ticks every second when recording
  - [x] Pause correctly stops duration ticking
  - [x] Reset functionality works

### MED-104 — Transcription Integration
- **Title:** Integrate real-time speech-to-text transcription service
- **Description:** Connect to transcription API for live text capture during encounters.
- **Story Points:** 5 SP
- **Status:** In Progress
- **Priority:** High
- **Assignee:** Backend Developer
- **Acceptance Criteria:**
  - [ ] WebSocket connection to transcription service
  - [ ] Speaker detection (doctor/patient)
  - [ ] Real-time text updates in encounter data
  - [ ] Error handling for connection issues

### MED-105 — Live Transcript Display
- **Title:** Build live transcript chat component
- **Description:** Render incoming transcription entries as a scrolling chat with speaker differentiation and animation.
- **Story Points:** 3 SP
- **Status:** Done
- **Priority:** Medium
- **Assignee:** Frontend Developer
- **Acceptance Criteria:**
  - [x] Chat-style layout with alternating sides
  - [x] Doctor/patient color coding
  - [x] Smooth scroll on new entries
  - [x] Scrollbar styling for long transcripts

### MED-106 — Keyword Detection System
- **Title:** Implement medical keyword extraction from conversation
- **Description:** Extract and count medical keywords from the live transcript, categorize them (symptoms, mental health, cardiovascular, etc.).
- **Story Points:** 4 SP
- **Status:** Done
- **Priority:** Medium
- **Assignee:** AI/ML Engineer
- **Acceptance Criteria:**
  - [x] Extract keywords in real-time
  - [x] Count occurrences and display
  - [x] Category-based color coding
  - [x] Clickable keyword pills for filtering

### MED-107 — End Visit Workflow
- **Title:** Connect End Visit button to save and transition flow
- **Description:** Implement the complete end visit flow: save encounter data, transition to Cockpit Mode, and update patient status.
- **Story Points:** 3 SP
- **Status:** In Progress
- **Priority:** High
- **Assignee:** Frontend Developer
- **Acceptance Criteria:**
  - [x] End Visit button in recording controls
  - [x] Save all encounter data to store
  - [x] Transition to Cockpit Mode
  - [x] Update patient status in schedule

---

## Epic: Listening Mode UI (~30 SP)

### MED-201 — Listening Panel Layout
- **Title:** Design and implement three-column listening panel layout
- **Description:** Create the primary encounter screen with patient header, three-column grid (Keywords, Transcript, Vitals), and SOAP notes section.
- **Story Points:** 5 SP
- **Status:** Done
- **Priority:** High
- **Assignee:** Frontend Developer
- **Acceptance Criteria:**
  - [x] Patient header with demographics and chief complaint
  - [x] Three-column responsive grid layout
  - [x] Keywords column with color-coded pills
  - [x] Live transcript column with scrolling
  - [x] Vitals + AI Insights column

### MED-202 — Mode Toggle Component
- **Title:** Create animated mode toggle between Listening and Cockpit modes
- **Description:** Build a pill-style toggle switch with spring animation that controls the app's mode state.
- **Story Points:** 2 SP
- **Status:** Done
- **Priority:** Medium
- **Assignee:** Frontend Developer
- **Acceptance Criteria:**
  - [x] Spring-animated sliding indicator
  - [x] Gradient background changes by mode
  - [x] Accessible keyboard navigation
  - [x] Smooth page transitions

### MED-203 — Auto-generated SOAP Notes
- **Title:** Implement SOAP note generation from encounter data
- **Description:** Auto-generate Subjective, Objective, Assessment, and Plan sections based on the live transcript.
- **Story Points:** 5 SP
- **Status:** Done
- **Priority:** High
- **Assignee:** AI/ML Engineer
- **Acceptance Criteria:**
  - [x] Four-section SOAP layout
  - [x] Real-time updates as data flows in
  - [x] Editable text areas per section
  - [x] Save to patient record
  - [x] Clear visual section differentiation

### MED-204 — AI Insights Sidebar
- **Title:** Build the right-side AI insights panel with analytics
- **Description:** Create a sidebar showing notes/hour, average visit duration, task completion trends, and workload heatmap.
- **Story Points:** 5 SP
- **Status:** Done
- **Priority:** Medium
- **Assignee:** Frontend Developer
- **Acceptance Criteria:**
  - [x] Notes per hour metric card
  - [x] Average visit duration with trend
  - [x] Task completion weekly chart
  - [x] Workload heatmap grid
  - [x] Responsive width (320px)

### MED-205 — Patient Header Component
- **Title:** Design patient header with demographics and status indicators
- **Description:** Create the top section of the listening panel showing patient info, demographics, chief complaint, and encounter status.
- **Story Points:** 3 SP
- **Status:** Done
- **Priority:** Medium
- **Assignee:** Frontend Developer
- **Acceptance Criteria:**
  - [x] Large avatar with initials
  - [x] Name, age, gender, MRN display
  - [x] Chief complaint with brain icon
  - [x] Encounter status badge (active/inactive)

### MED-206 — Structured Data Panel
- **Title:** Implement real-time vitals and structured data display
- **Description:** Show vital signs and other structured patient data in a card-based layout with auto-updating values.
- **Story Points:** 3 SP
- **Status:** Done
- **Priority:** Medium
- **Assignee:** Frontend Developer
- **Acceptance Criteria:**
  - [x] Blood pressure, heart rate, temperature, SpO2 display
  - [x] Auto-update from connected devices
  - [x] Color-coded abnormal values
  - [x] Clean card-based layout

### MED-207 — Listening Mode Animations
- **Title:** Add staggered entrance animations to all listening panel sections
- **Description:** Ensure all components of the listening panel animate in with coordinated timing for a polished experience.
- **Story Points:** 4 SP
- **Status:** Done
- **Priority:** Medium
- **Assignee:** Frontend Developer
- **Acceptance Criteria:**
  - [x] Patient header enters first
  - [x] Three columns animate in with stagger
  - [x] SOAP notes appear last
  - [x] All animations under 1 second

---

## Epic: Cockpit Mode (~25 SP)

### MED-301 — Schedule Tab
- **Title:** Build today's schedule view with time slot grid
- **Description:** Display the day's appointments as a scrollable list with patient information, status badges, and duration indicators.
- **Story Points:** 5 SP
- **Status:** Done
- **Priority:** High
- **Assignee:** Frontend Developer
- **Acceptance Criteria:**
  - [x] Time slot grid layout
  - [x] Patient cards with name, type, status
  - [x] Status badges (scheduled, completed, cancelled)
  - [x] Duration display per appointment

### MED-302 — Pre-chart Tab
- **Title:** Create pre-charting view for upcoming patients
- **Description:** Show upcoming patients with their records, pending items, and quick actions for preparation.
- **Story Points:** 4 SP
- **Status:** Done
- **Priority:** Medium
- **Assignee:** Frontend Developer
- **Acceptance Criteria:**
  - [x] Quick stats row (Ready, Pending, Incomplete)
  - [x] Patient cards with status
  - [x] Notes and pending items per patient
  - [x] One-click access to records

### MED-303 — All Patients Tab
- **Title:** Build patient grid view for browsing all patients
- **Description:** Display all patients in a responsive card grid with status indicators and hover animations.
- **Story Points:** 3 SP
- **Status:** Done
- **Priority:** Medium
- **Assignee:** Frontend Developer
- **Acceptance Criteria:**
  - [x] Responsive card grid
  - [x] Patient avatars and demographics
  - [x] Status badges (Active, Chronic, New)
  - [x] Hover animations

### MED-304 — Tasks Tab
- **Title:** Implement task management view with checklist
- **Description:** Show a task list with priorities, completion states, and filtering options.
- **Story Points:** 4 SP
- **Status:** Done
- **Priority:** Medium
- **Assignee:** Frontend Developer
- **Acceptance Criteria:**
  - [x] Task list with checkboxes
  - [x] Priority badges (High, Medium, Low)
  - [x] Completion progress indicator
  - [x] Click-to-toggle completion

### MED-305 — Daily Clock Visualization
- **Title:** Create circular clock showing daily schedule progress
- **Description:** Build an SVG-based circular clock that shows the current time and schedule progress.
- **Story Points:** 4 SP
- **Status:** Done
- **Priority:** Low
- **Assignee:** Frontend Developer
- **Acceptance Criteria:**
  - [x] SVG circle with hour markers
  - [x] Progress arc for appointments
  - [x] Current time display in center
  - [x] Responsive sizing

### MED-306 — Cockpit Knowledge Graph
- **Title:** Integrate Recharts-based knowledge graph in cockpit view
- **Description:** Add a health score and risk score area chart using Recharts to the Cockpit sidebar.
- **Story Points:** 5 SP
- **Status:** Done
- **Priority:** Medium
- **Assignee:** Frontend Developer
- **Acceptance Criteria:**
  - [x] Area chart with gradient fills
  - [x] Health Score and Risk Score lines
  - [x] Interactive tooltips
  - [x] Responsive container

---

## Epic: Patient Management (~20 SP)

### MED-401 — Linked Sessions Page
- **Title:** Build longitudinal patient encounter timeline
- **Description:** Create a page showing the patient's encounter history with a horizontal timeline of colored bubbles and detail cards.
- **Story Points:** 5 SP
- **Status:** Done
- **Priority:** High
- **Assignee:** Frontend Developer
- **Acceptance Criteria:**
  - [x] Horizontal timeline with sessions
  - [x] Colored bubbles with encounter numbers
  - [x] Date and doctor labels
  - [x] Detail cards for recent encounters

### MED-402 — Patient Search
- **Title:** Implement global search for finding patients
- **Description:** Add a search functionality to find patients by name, MRN, or diagnosis.
- **Story Points:** 3 SP
- **Status:** Done
- **Priority:** Medium
- **Assignee:** Frontend Developer
- **Acceptance Criteria:**
  - [x] Expandable search bar in TopNav
  - [x] Search by name and MRN
  - [x] Instant results display
  - [x] Click-to-select patient

### MED-403 — Patient Profile Detail
- **Title:** Create detailed patient profile view with full history
- **Description:** Build a comprehensive patient detail page showing demographics, history, encounters, and current status.
- **Story Points:** 5 SP
- **Status:** In Progress
- **Priority:** Medium
- **Assignee:** Frontend Developer
- **Acceptance Criteria:**
  - [x] Full demographics display
  - [x] Medical history timeline
  - [x] Recent encounters list
  - [x] Current status indicators

### MED-404 — Appointment CRUD
- **Title:** Implement full appointment create/update/delete functionality
- **Description:** Allow doctors to add, edit, and cancel appointments with proper validation.
- **Story Points:** 7 SP
- **Status:** In Progress
- **Priority:** High
- **Assignee:** Backend Developer
- **Acceptance Criteria:**
  - [x] Add new appointments via modal
  - [x] Edit existing appointments
  - [x] Cancel with reason
  - [x] Drag to reschedule (future)

---

## Epic: AI Features (~30 SP)

### MED-501 — AI Insights Engine
- **Title:** Build the AI insights engine that generates recommendations during encounters
- **Description:** Implement a service that analyzes encounter data and generates insights including diagnoses, medication interactions, and lab flags.
- **Story Points:** 8 SP
- **Status:** Done
- **Priority:** High
- **Assignee:** AI/ML Engineer
- **Acceptance Criteria:**
  - [x] Real-time analysis during recording
  - [x] Insight types: diagnosis, medication, lab, warning
  - [x] Confidence scoring
  - [x] Source citations per insight

### MED-502 — SOAP Note Generation
- **Title:** Implement AI-powered SOAP note generation from encounter data
- **Description:** Generate structured Subjective, Objective, Assessment, and Plan sections from the live transcript.
- **Story Points:** 5 SP
- **Status:** Done
- **Priority:** High
- **Assignee:** AI/ML Engineer
- **Acceptance Criteria:**
  - [x] Auto-generates all four SOAP sections
  - [x] Updates in real-time
  - [x] Editable per section
  - [x] Save to patient record

### MED-503 — AI Search
- **Title:** Build intelligent search with voice input and source citations
- **Description:** Create a search interface that queries patient records, clinical guidelines, and literature, returning answers with source citations.
- **Story Points:** 7 SP
- **Status:** Done
- **Priority:** High
- **Assignee:** AI/ML Engineer
- **Acceptance Criteria:**
  - [x] Search bar with voice input button
  - [x] Results display with answer and sources
  - [x] Confidence percentages
  - [x] "Insert into Note" functionality
  - [x] Follow-up conversation interface

### MED-504 — Knowledge Graph Database
- **Title:** Set up Neo4j knowledge graph for patient data relationships
- **Description:** Configure Neo4j database with patient, symptom, diagnosis, and medication nodes, and build the visualization layer.
- **Story Points:** 5 SP
- **Status:** In Progress
- **Priority:** Medium
- **Assignee:** Backend Developer
- **Acceptance Criteria:**
  - [x] Neo4j schema defined (nodes + edges)
  - [x] Connection via bolt protocol
  - [x] Recharts visualization working
  - [x] Real-time updates on data change

### MED-505 — AI-generated Pre-chart Summaries
- **Title:** Generate pre-chart summaries for upcoming appointments
- **Description:** Use AI to create summary cards for each upcoming patient, highlighting key information needed before the encounter.
- **Story Points:** 3 SP
- **Status:** Done
- **Priority:** Medium
- **Assignee:** AI/ML Engineer
- **Acceptance Criteria:**
  - [x] Pre-chart card per upcoming patient
  - [x] Highlights pending labs and issues
  - [x] Quick action buttons

### MED-506 — AI Task Recommendations
- **Title:** Implement AI-powered task suggestions based on encounter data
- **Description:** Analyze encounter patterns to suggest relevant tasks (lab orders, referrals, follow-ups).
- **Story Points:** 2 SP
- **Status:** Done
- **Priority:** Low
- **Assignee:** AI/ML Engineer
- **Acceptance Criteria:**
  - [x] Task suggestions appear in Tasks tab
  - [x] Prioritized by relevance
  - [x] One-click task creation

---

## Epic: Integration & Export (~15 SP)

### MED-601 — EHR Integration (HL7/FHIR)
- **Title:** Implement HL7 FHIR R4 integration with external EHR systems
- **Description:** Connect the application to major EHR systems for data exchange of patient records, encounters, and lab results.
- **Story Points:** 5 SP
- **Status:** In Progress
- **Priority:** High
- **Assignee:** Backend Developer
- **Acceptance Criteria:**
  - [x] FHIR R4 compliant API endpoints
  - [ ] Patient data sync with EHR
  - [ ] Lab result import
  - [ ] Encounter export

### MED-602 — PDF Export
- **Title:** Generate printable PDF documents for patient records and SOAP notes
- **Description:** Implement PDF generation for encounter summaries, SOAP notes, and full patient records.
- **Story Points:** 3 SP
- **Status:** Done
- **Priority:** Medium
- **Assignee:** Frontend Developer
- **Acceptance Criteria:**
  - [x] SOAP note export to PDF
  - [x] Encounter summary PDF
  - [x] Print-friendly layout
  - [x] Customizable headers/footers

### MED-603 — Email Integration
- **Title:** Enable sending patient summaries via email
- **Description:** Add email functionality for sending encounter summaries, pre-chart notes, and referrals.
- **Story Points:** 2 SP
- **Status:** Done
- **Priority:** Medium
- **Assignee:** Backend Developer
- **Acceptance Criteria:**
  - [x] Email modal in patient details
  - [x] Template-based email content
  - [x] Send to primary care physician

### MED-604 — Notification System
- **Title:** Implement in-app notification system for alerts and updates
- **Description:** Build a notification system with bell icon, badge count, and dropdown panel for alerts.
- **Story Points:** 3 SP
- **Status:** Done
- **Priority:** Medium
- **Assignee:** Frontend Developer
- **Acceptance Criteria:**
  - [x] Notification bell with badge
  - [x] Dropdown notification panel
  - [x] Types: lab results, reminders, AI insights
  - [x] Read/unread states

### MED-605 — Data Backup & Restore
- **Title:** Implement automated data backup and restore functionality
- **Description:** Set up automatic backups of all patient data with manual restore capability.
- **Story Points:** 2 SP
- **Status:** Done
- **Priority:** Low
- **Assignee:** DevOps Engineer
- **Acceptance Criteria:**
  - [x] Daily automated backups
  - [x] Backup retention policy (30 days)
  - [x] Manual restore via UI
  - [x] Backup status indicator

---

## Bug Fixes

### BUG-001 — Waveform color jump on hover
- **Title:** Fix color jumping in audio waveform bars on hover
- **Description:** AudioWaveform bars display incorrect colors when hovered.
- **Story Points:** 1 SP
- **Status:** Done
- **Priority:** Low
- **Assignee:** Frontend Developer

### BUG-002 — Duration counter drift
- **Title:** Fix recording duration counter drifting during pause
- **Description:** Duration continues to increment when recording is paused.
- **Story Points:** 1 SP
- **Status:** Done
- **Priority:** Medium
- **Assignee:** Frontend Developer

### BUG-003 — Sidebar tooltip overflow
- **Title:** Fix sidebar tooltips overflowing viewport on narrow screens
- **Description:** Tooltip elements in Sidebar.tsx overflow the screen.
- **Story Points:** 1 SP
- **Status:** Done
- **Priority:** Low
- **Assignee:** Frontend Developer

---

## Tech Debt

### TECH-001 — TypeScript strict mode compliance
- **Title:** Resolve all TypeScript strict mode warnings
- **Description:** Ensure all components compile under --strict with no implicit any types.
- **Story Points:** 3 SP
- **Status:** In Progress
- **Priority:** Medium
- **Assignee:** All Developers

### TECH-002 — Component prop typing
- **Title:** Add complete TypeScript interfaces to all component props
- **Description:** Every React component should have explicit prop types instead of inline type definitions.
- **Story Points:** 2 SP
- **Status:** In Progress
- **Priority:** Medium
- **Assignee:** All Developers

### TECH-003 — Bundle size optimization
- **Title:** Audit and optimize the production bundle size
- **Description:** Target < 300KB gzipped for the main bundle by tree-shaking, code splitting, and lazy loading.
- **Story Points:** 3 SP
- **Status:** To Do
- **Priority:** Medium
- **Assignee:** DevOps Engineer

---

## Summary by Epic

| Epic | Story Points | Done | In Progress | To Do |
|------|-------------|------|-------------|-------|
| Audio & Transcription | 25 SP | 4 tickets | 2 tickets | 1 ticket |
| Listening Mode UI | 30 SP | 5 tickets | 1 ticket | 1 ticket |
| Cockpit Mode | 25 SP | 4 tickets | 2 tickets | 0 tickets |
| Patient Management | 20 SP | 2 tickets | 2 tickets | 0 tickets |
| AI Features | 30 SP | 5 tickets | 1 ticket | 0 tickets |
| Integration & Export | 15 SP | 4 tickets | 1 ticket | 0 tickets |
| **Total** | **~145 SP** | **24 tickets** | **9 tickets** | **3 tickets** |
