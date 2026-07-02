# Medix Co-pilot — Features

This document provides a comprehensive feature list for the Medix Co-pilot clinic web UI, organized by category.

## 1. Core Design Philosophy

- **Dark-first UI** — Designed for clinical environments with reduced eye strain
- **Two-mode architecture** — Listening Mode for active encounters, Cockpit Mode for management
- **Real-time feedback** — Waveforms, counters, and status indicators update live
- **Glassmorphism panels** — Semi-transparent cards with backdrop blur for depth
- **Spring animations** — Smooth Framer Motion transitions throughout
- **Responsive layout** — Fixed sidebar with fluid content area

## 2. Global Navigation & Shell

### AppLayout
- Fixed dark sidebar on the left (70px width)
- Top navigation bar with logo, patient info, search, and avatar
- Main content area that adapts to mode
- Floating recording controls when active
- Smooth mode transitions with spring animations

### TopNav
- **Logo** — Medix branding with sparkle icon and version badge
- **Online indicator** — Green dot showing system status
- **Mode toggle** — Animated pill switch between Listening/Cockpit modes
- **Patient pill** — Displays patient name, gender, age, and MRN
- **Search bar** — Expandable search with focus/blur transitions
- **Notifications bell** — With red badge for unread items
- **Doctor avatar** — Dropdown menu for clinic switching

### Sidebar
- 8 navigation icons: Home, Refresh, Record, Clipboard, Calendar, Monitor, Documents, AI Tools
- Active state with blue highlight
- Hover tooltips on each icon
- Top indicator bar that changes color based on mode
- Compact layout optimized for clinical use

## 3. Listening Mode Features

### ListeningPanel
- **Patient header** — Large avatar, name, demographics, and chief complaint
- **Three-column layout:**
  - **Keywords** (left) — Color-coded pills showing detected terms with counts
  - **Live Transcript** (center) — Scrolling chat-style transcript of the encounter
  - **Vitals + AI Insights** (right) — Structured vitals and generated AI observations
- **SOAP Notes** — Auto-generated four-section note (Subjective, Objective, Assessment, Plan)
- All sections animate in with staggered timing

### RecordingControls
- Floating bar at bottom of screen when recording is active
- Pulsing red recording indicator dot
- Duration counter formatted as `mm:ss`
- Mini waveform visualization
- Pause/Resume and End Visit buttons
- End Visit transitions to Cockpit Mode

### AudioWaveform
- 80 animated bars with spring-physics movement
- Color gradient: green (low) → yellow (medium) → orange (high)
- Real-time height updates based on audio amplitude
- Center-biased pattern for natural waveform appearance
- Toggleable active/inactive states

### ModeToggle
- Spring-animated sliding indicator between Listening and Cockpit modes
- Gradient background that shifts color based on mode (blue vs purple)
- Clean pill-style toggle with clear visual separation

## 4. Cockpit Mode Features

### CockpitPanel
- Four tabs: **Schedule**, **Pre-chart**, **All Patients**, **Tasks**

#### Schedule Tab
- Full day's appointments with time slot grid
- Patient cards showing name, type, status, and duration
- Circular clock visualization showing daily schedule progress
- Knowledge Graph with Recharts line chart for health metrics

#### Pre-chart Tab
- Quick stats (Ready, Pending, Incomplete, Completed)
- Upcoming patient cards with status badges
- One-click access to patient records

#### All Patients Tab
- Grid of patient cards with avatars
- Status indicators (Active, Chronic, New)
- Hover animations and click-through to detailed views

#### Tasks Tab
- Checklist-style task management
- Priority badges (High, Medium, Low)
- Completion tracking with progress indicator
- Click-to-toggle completion state

### KnowledgeGraph
- Area chart from Recharts showing Health Score vs Risk Score trends
- Gradient fills with custom SVG definitions
- Responsive container that adapts to parent width
- Interactive tooltips on hover
- Legend with color-coded metrics

## 5. Linked Sessions Features

### LinkedSessions Page
- **Timeline view** — Horizontal timeline of patient encounters
  - Colored circular bubbles for each encounter
  - Date labels above, chief complaint below
  - Connector arrows between sessions
  - Hover-to-enlarge animation
- **Session detail cards** — Two-column card layout showing recent encounters
  - Doctor avatar and name
  - Chief complaint badge
  - Keyword tags with color coding

## 6. AI Search Features

### AISearch Page
- **Search bar** — Large input with voice and AI-powered search
  - Quick prompt button for common questions
  - Enter key support
- **Loading state** — Animated spinner with context message
- **Results display** — Styled cards showing:
  - Concise AI-generated answer
  - Confidence percentage badge
  - Source citations (Clinical Guideline, Literature, Patient Record)
  - "Insert into Note" button for direct integration
- **Conversation interface** — Chat-style follow-up with bot and user avatars

## 7. Visit Workflow

### Pre-charting
1. View today's schedule from Cockpit Mode
2. Select upcoming patients to review records
3. AI-generated pre-chart summaries appear
4. Flag any incomplete data for review

### During Visit (Listening Mode)
1. Enter Listening Mode from patient pill
2. Start recording — waveform begins animating
3. Real-time keyword detection on the left panel
4. Live transcript updates in center panel
5. Vitals auto-populate from connected devices
6. AI Insights appear in right sidebar
7. SOAP note generates automatically
8. End Visit button saves and transitions to Cockpit

### Post-visit
1. Review generated SOAP note
2. Edit any section as needed
3. Insert AI search results if needed
4. Save note to patient record
5. Review linked sessions for longitudinal context

## 8. Technical Architecture

### State Management (Zustand)
- Single store with typed state slices
- Actions for all state mutations
- Selectors for derived state
- Hot reloading support during development
- TypeScript types for all entities

### Component Hierarchy
```
AppLayout
├── Sidebar (left, fixed)
├── Main Content
│   ├── TopNav (top, fixed)
│   └── PageContent
│       ├── ListeningPanel (when mode = listening)
│       │   ├── PatientHeader
│       │   ├── KeywordsColumn
│       │   ├── LiveTranscript
│       │   ├── Vitals + AI Insights
│       │   └── SOAP Notes
│       └── CockpitPanel (when mode = cockpit)
│           ├── ScheduleTab
│           ├── PreChartTab
│           ├── AllPatientsTab
│           └── TasksTab
└── RecordingControls (floating, bottom)
```

### Data Flow
1. Audio input → AudioWaveform component
2. Transcribed text → encounterData in store
3. AI processing → aiInsights in store
4. SOAP generation → soapNote in store
5. All data flows through Zustand for reactivity
