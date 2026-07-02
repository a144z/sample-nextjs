# Medix Co-pilot — DevOps Guide

## Development Setup

### Prerequisites
- Node.js 18+ (LTS recommended)
- npm 9+ or yarn 1.22+
- Git 2.40+
- PostgreSQL 15+
- Neo4j 5+ (optional, for knowledge graph)

### Getting Started
```bash
# Clone the repository
git clone <repo-url>
cd sample-nextjs

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your database credentials

# Start development server
npm run dev
# → http://localhost:3000
```

### Development Scripts
| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js dev server (hot reload) |
| `npm run build` | Production build |
| `npm start` | Start production server on port 3000 |
| `npm run lint` | Run ESLint checks |

### Code Style
- TypeScript strict mode enabled
- Tailwind CSS with `clsx` and `tailwind-merge` for class composition
- Component naming: PascalCase, file-level exports preferred
- Import ordering: React → external → local → types
- Comments for complex logic; clear prop interfaces

## Build Process

### Compilation Pipeline
1. TypeScript compilation → ES2017 target
2. Next.js bundling with Turbopack (dev) / Webpack (prod)
3. CSS processing via Tailwind v4 PostCSS plugin
4. Tree-shaking and minification via ESBuild

### Output
- `.next/` — Build artifacts
- `out/` — Static export (if configured)
- Production bundle: ~250KB gzipped

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel

# Deploy with environment variables
vercel --prod --env NEO4J_URI=bolt://... --env POSTGRES_URL=postgresql://...
```

**Vercel Configuration (vercel.json):**
```json
{
  "version": 2,
  "builds": [
    { "src": "package.json", "use": "@vercel/next" }
  ],
  "env": {
    "NEO4J_URI": "@neo4j-uri",
    "POSTGRES_URL": "@postgres-url"
  }
}
```

### Railway / Render / Fly.io

All support Next.js deployment. Key considerations:
- Set `NODE_ENV=production`
- Ensure 512MB+ memory for build
- Set environment variables in dashboard

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEO4J_URI` | Yes | Bolt URL for Neo4j graph database |
| `NEO4J_USERNAME` | No | Neo4j username (default: neo4j) |
| `NEO4J_PASSWORD` | No | Neo4j password |
| `POSTGRES_URL` | Yes | PostgreSQL connection string |
| `NEXT_PUBLIC_APP_URL` | No | App URL for redirects |

## Monitoring & Logging

### Application Monitoring
- **Vercel Analytics** — Page views, performance metrics
- **Sentry** — Error tracking and performance monitoring
- **PostHog** — Product analytics (optional)

### Logging Strategy
```
src/lib/logger.ts
├── Console logging (dev): structured JSON to stdout
├── File logging (staging): /var/log/medix/*.log
└── External (prod): Sentry.io / Logtail
```

### Key Metrics
- **FCP** (First Contentful Paint) — Target: < 1.0s
- **LCP** (Largest Contentful Paint) — Target: < 2.5s
- **CLS** (Cumulative Layout Shift) — Target: < 0.1
- **API response time** — Target: < 200ms for encounter data

## CI/CD Pipeline Configuration

### GitHub Actions (.github/workflows/ci.yml)
```yaml
name: Medix CI/CD
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npm run lint

  test:
    runs-on: ubuntu-latest
    needs: lint
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npm test

  build:
    runs-on: ubuntu-latest
    needs: test
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npm run build

  deploy:
    runs-on: ubuntu-latest
    needs: build
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - run: npx vercel deploy --prod
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
```

## Database Architecture

### Neo4j (Knowledge Graph)
- **Purpose:** Patient relationships, symptom networks, treatment paths
- **Connection:** bolt://localhost:7687
- **Schema:**
  - Nodes: Patient, Symptom, Diagnosis, Medication
  - Relationships: HAS_SYMPTOM, TREATED_WITH, CONNECTED_TO

### PostgreSQL (Patient Records)
- **Purpose:** Structured patient data, appointments, encounters
- **Key Tables:**
  - `patients` — Demographics, vitals, history
  - `appointments` — Schedule, status, duration
  - `encounters` — Encounter sessions, SOAP notes
  - `knowledge_entries` — Graph node/edge metadata

### Backup Strategy
- PostgreSQL: Daily automated backups (30-day retention)
- Neo4j: Weekly snapshots + transaction log backups
- Disaster recovery: < 1 hour RTO

## Security & HIPAA Compliance

### Data Protection
- **Encryption in transit:** TLS 1.3 for all API calls
- **Encryption at rest:** AES-256 for database volumes
- **HIPAA BAA:** Configured with Vercel/Railway hosting
- **EHR integration:** HL7 FHIR R4 compliant APIs

### Access Control
- Role-based access control (RBAC)
- JWT token authentication with refresh tokens
- Session timeout: 30 minutes of inactivity
- Audit logging for all patient data access

### Compliance Checklist
- [x] Data Encryption
- [x] Audit Logging
- [x] Access Controls
- [x] Backup & Recovery
- [x] Business Associate Agreements
- [x] Regular Security Assessments
- [ ] HIPAA Risk Analysis (annual)
- [ ] BAA with all subprocessors
