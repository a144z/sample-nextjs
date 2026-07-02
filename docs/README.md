# Medix Co-pilot — Clinic Web UI

## Overview

Medix Co-pilot is an AI-powered clinic management web application designed to assist physicians during patient encounters. It features two primary modes — **Listening Mode** for real-time voice capture and AI analysis, and **Cockpit Mode** for comprehensive schedule management and dashboard analytics.

The application provides a dark-themed, modern interface with animated components, real-time waveform visualization, auto-generated SOAP notes, and intelligent insights powered by an integrated knowledge graph.

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript 5.x
- **Styling:** Tailwind CSS v4 + @tailwindcss/typography
- **Animations:** Framer Motion
- **Charts:** Recharts
- **State Management:** Zustand (v5)
- **Icons:** Lucide React
- **UI Components:** Custom (Button, Avatar, Badge, Card, Input)
- **Theming:** next-themes with CSS custom properties
- **Package Manager:** npm

## Quick Start

```bash
cd sample-nextjs

# Install dependencies
npm install

# Run development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
sample-nextjs/
├── src/app/              # Next.js App Router pages & layouts
├── src/components/       # React components
│   ├── layout/           # AppLayout, TopNav, Sidebar
│   ├── audio/            # AudioWaveform, RecordingControls
│   ├── mode/             # ModeToggle, ListeningPanel, CockpitPanel
│   ├── panels/           # KnowledgeGraph, AISidebar
│   ├── pages/            # LinkedSessions, AISearch
│   └── ui/               # Shared UI primitives
├── src/store/            # Zustand state management
├── src/lib/              # Utilities & helpers
├── public/               # Static assets
└── docs/                 # Documentation
```

## Key Features

- **Listening Mode** — Real-time voice capture with animated waveform, live transcript, auto-generated SOAP notes, and AI insights sidebar
- **Cockpit Mode** — Tabbed dashboard with schedule view, pre-charting, patient grid, and task management
- **Knowledge Graph** — Visualized patient data using Recharts with health and risk score tracking
- **AI Search** — Intelligent search over patient records with source citations
- **Linked Sessions** — Longitudinal patient history with visual timeline

## Environment Variables

Copy `.env.local.example` to `.env.local` and update the values:

| Variable | Description | Default |
|----------|-------------|---------|
| `NEO4J_URI` | Neo4j database connection | `bolt://localhost:7687` |
| `POSTGRES_URL` | PostgreSQL connection string | `postgresql://localhost:5432/medix` |

## License

Private — Medix Co-pilot © 2026
