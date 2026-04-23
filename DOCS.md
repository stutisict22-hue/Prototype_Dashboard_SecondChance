# Second Chance Dashboard - Complete Documentation

## Project Summary

**Second Chance** is a health monitoring dashboard for a rehabilitation/recovery program. It tracks participants' biometric data, trust scores, and program progress through a 6-phase system.

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 18 + TypeScript + Vite |
| **Routing** | React Router DOM (client-side state navigation) |
| **Charts** | Recharts for data visualization |
| **Icons** | Lucide React |
| **Styling** | Tailwind CSS |

---

## Project Structure

```
src/
├── main.tsx              # Application entry point
├── App.tsx               # Main app component with state management
├── data/
│   ├── types.ts          # TypeScript interfaces
│   └── mockData.ts       # Mock data generators
├── components/
│   ├── Sidebar.tsx       # Navigation sidebar
│   ├── Header.tsx        # Top header with search
│   ├── SummaryCards.tsx  # Dashboard stat cards
│   ├── Charts.tsx        # Recharts components
│   ├── ParticipantsTable.tsx  # Participant list table
│   └── AlertsPanel.tsx   # Alert display component
└── pages/
    ├── DashboardPage.tsx     # Main dashboard
    ├── ParticipantsPage.tsx  # Participant management
    ├── AlertsPage.tsx        # Alerts monitoring
    ├── ReportsPage.tsx       # Report generation
    ├── SettingsPage.tsx      # Configuration
    └── ParticipantDetail.tsx # Individual participant view
```

---

## Navigation Structure (5 Main Sections)

### 1. Dashboard (Home Page)

The main overview page with real-time facility metrics.

#### Components

| Component | Functionality |
|-----------|---------------|
| **Summary Cards** | 4 stats: Total Participants (127), Active Alerts (5), Avg Trust Score (68%), Compliance Rate (94%) |
| **Heart Rate Trends** | 24-hour line chart showing current HR vs 7-day avg with reference lines (60=Low, 100=High, 120=Critical) |
| **Activity Overview** | Weekly area chart showing steps with 10k goal reference line |
| **Sleep Quality** | Composed chart with bars (sleep hours) + line (quality score 0-100) |
| **Stress Analysis** | 24-hour area chart with zones (Low 0-33, Moderate 34-66, High 67-100) |
| **Participants Table** | Top 10 participants with trust scores, phases, alerts |
| **Alerts Panel** | 5 most recent unacknowledged alerts |

---

### 2. Participants Page

Full participant management and monitoring.

#### Features

- **Search** - Filter by name or ID
- **Filters** - By phase (1-6) and status (Active/Inactive)
- **Export** - Download participant data
- **Pagination** - Navigate through participant pages

#### Table Columns

| Column | Description |
|--------|-------------|
| Participant | Avatar + name + age |
| ID | Participant ID (e.g., SC-001) |
| Phase | Visual progress dots (1-6) |
| Trust Score | Circular progress indicator |
| Enrolled | Enrollment date |
| Status | Badge (Active/Inactive/Alert) |
| Actions | View details, Generate report |

#### Trust Score Visualization

| Score Range | Color | Status |
|-------------|-------|--------|
| ≥75 | Green | Good standing |
| 50-74 | Amber | Warning |
| <50 | Red | Critical |

---

### 3. Alerts Page

Real-time alert monitoring and response.

#### Alert Types

| Type | Description |
|------|-------------|
| `hrvSpike` | Heart Rate Variability dropped suddenly |
| `idleAlert` | Participant inactive during high-risk hours (6PM-10PM) |
| `locationAlert` | Entered restricted/monitored zone |
| `sleepAnomaly` | Abnormal sleep patterns |
| `heartRateAnomaly` | Sustained elevated heart rate |

#### Severity Levels

- **Critical** - Immediate attention required (red)
- **Warning** - Needs review (amber)
- **Info** - Informational (blue)

#### Actions per Alert

- **Acknowledge** - Mark as handled
- **Contact** - Call participant
- **Dismiss** - Remove alert

---

### 4. Reports Page

Generate and export various program reports.

#### Report Types

1. **Monthly Summary** - Complete facility overview for the month
2. **Progress Report** - Individual participant progress tracking
3. **Financial Report** - Payment history and outstanding balances
4. **Program Analytics** - Enrollment and completion rates
5. **Alert Summary** - Alert patterns and response times
6. **Trust Score Analysis** - Trust score trends and patterns

#### Features

- Generate button (creates report)
- Print button
- Export All button
- Recent Reports table with download options

---

### 5. Settings Page

System configuration and preferences.

#### Configuration Sections

| Section | Options |
|---------|---------|
| **Notifications** | Alert sounds, Desktop notifications, Email alerts, SMS |
| **Security** | 2FA, Session timeout, Access logs, Data encryption |
| **Data Management** | Retention, Backup, Export formats, API access |
| **User Management** | Team members, Roles/permissions, Activity logs |
| **Monitoring** | Sync interval, Refresh rate, Alert thresholds, Location tracking |

---

## Participant Detail Page

Accessed by clicking "View" on any participant row.

### Sections

#### 1. Header Card
- Avatar with initials
- Name, ID, Age, Enrollment date
- Trust Score (large percentage display)
- Phase progress bar (1-6)

#### 2. Live Metrics Grid (5 cards)

| Metric | Display | Normal Range |
|--------|---------|--------------|
| Heart Rate | BPM + status | 60-100 BPM |
| HRV | Milliseconds | 40-80 ms |
| Steps Today | Count | 8,000 goal |
| Sleep Last Night | Hours + quality | 7-9 hours |
| Stress Level | 0-100 scale | <50 |

#### 3. Charts (4 participant-specific)
- Heart Rate Trends (24 hours)
- Activity Overview (weekly)
- Sleep Quality (weekly)
- Stress Level Analysis (24 hours)

#### 4. Side Cards

**Location**
- GPS coordinates (latitude/longitude)
- Zone status: safe / monitored / restricted
- Flagged indicator for violations

**Recent Activity**
- Timeline of events
- Check-ins, alerts, wake-ups, location updates

**Medical Verification**
- Historical verification records
- Dates and results (Clean/Verified)

---

## Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      mockData.ts                            │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ - mockParticipants[] (15 sample participants)         │  │
│  │ - mockAlerts[] (6 sample alerts)                      │  │
│  │ - getParticipantBiometrics() - generates hourly data  │  │
│  │ - getDashboardSummary() - aggregates stats            │  │
│  │ - Chart data generators                               │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                        App.tsx                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ - activeTab state - controls which page renders       │  │
│  │ - selectedParticipant state - controls detail view    │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Pages → Components → Charts              │
└─────────────────────────────────────────────────────────────┘
```

---

## Key Business Logic

### Trust Score System

- **Range**: 0-100
- **Purpose**: Determines participant standing and program progression
- **Visual Indicators**:
  - Green (≥75): Good standing
  - Amber (50-74): Warning zone
  - Red (<50): Critical/requires intervention

### 6-Phase Program Structure

```
Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5 → Phase 6 (Complete)
```

- Visual indicators show current phase with filled dots
- Participants progress through phases based on trust score and compliance

### Alert Generation

Biometric data includes `alertFlags`:

```typescript
interface AlertFlags {
  hrvSpike: boolean;      // Sudden HRV drop
  idleAlert: boolean;     // Inactive during high-risk hours
  locationAlert: boolean; // Zone violation
  sleepAnomaly: boolean;  // Abnormal sleep patterns
}
```

### High-Risk Hours Logic

- **Time Window**: 6 PM - 10 PM
- **Behavior**:
  - Idle alerts more likely during this period
  - Stress levels artificially elevated in data generation
  - Location monitoring intensified

### Biometric Data Generation

Data generation adapts based on participant profile:

| Scenario | Trigger | Characteristics |
|----------|---------|-----------------|
| Normal | Default | Standard ranges |
| At-Risk | Trust Score <50 | Elevated HR, lower HRV, poor sleep |
| High-Achiever | Trust Score >90 | Lower HR, higher HRV, better activity |
| Critical | Specific IDs | Extreme values, frequent alerts |

---

## Data Models

### Core Interfaces

```typescript
// Participant profile
interface Participant {
  id: string;
  name: string;
  age: number;
  enrollmentDate: string;
  currentPhase: 1 | 2 | 3 | 4 | 5 | 6;
  trustScore: number;
  isActive: boolean;
}

// Real-time biometric reading
interface BiometricData {
  participantId: string;
  timestamp: string;
  heartRate: HeartRateData;
  activity: ActivityData;
  sleep: SleepData | null;
  stress: StressData;
  location: LocationData;
  alertFlags: AlertFlags;
}

// System alert
interface Alert {
  id: string;
  type: 'hrvSpike' | 'idleAlert' | 'locationAlert' | 'sleepAnomaly' | 'heartRateAnomaly';
  severity: 'critical' | 'warning' | 'info';
  participantId: string;
  participantName: string;
  title: string;
  description: string;
  timestamp: string;
  acknowledged: boolean;
}
```

---

## Responsive Design

| Breakpoint | Behavior |
|------------|----------|
| Mobile (<640px) | Sidebar collapses, single column layout, horizontal table scroll |
| Tablet (640-1024px) | 2-column grids, compact header |
| Desktop (>1024px) | Full sidebar, 4-column grids, expanded tables |
| Large Desktop (>1280px) | 3-column dashboard with side alerts panel |

---

## Running the Application

```bash
# Install dependencies
npm install

# Development server (hot reload)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

---

## Sample Data

### Participants (15 total)

| ID | Name | Age | Phase | Trust Score | Status |
|----|------|-----|-------|-------------|--------|
| SC-001 | Arun Kumar | 24 | 3 | 72 | Active |
| SC-002 | Rajesh Nair | 28 | 4 | 85 | Active |
| SC-003 | Vineeth Thomas | 22 | 2 | 45 | Active (Critical) |
| SC-004 | Mohammed Faris | 26 | 5 | 91 | Active |
| SC-005 | Kevin Mathew | 30 | 6 | 88 | Inactive |
| ... | ... | ... | ... | ... | ... |

### Active Alerts (6 total)

| ID | Type | Severity | Participant | Status |
|----|------|----------|-------------|--------|
| ALT-001 | HRV Spike | Critical | Vineeth Thomas | Unacknowledged |
| ALT-002 | Idle Alert | Warning | Joseph Sebastian | Unacknowledged |
| ALT-003 | Location Alert | Critical | Vineeth Thomas | Unacknowledged |
| ALT-004 | Sleep Anomaly | Info | Ravi Shankar | Acknowledged |
| ALT-005 | Idle Alert | Warning | Anand Pillai | Unacknowledged |
| ALT-006 | Heart Rate Elevated | Warning | Suresh Kumar | Acknowledged |

---

## Future Enhancement Opportunities

1. **Real-time Data** - WebSocket integration for live biometric streams
2. **Map Integration** - Google Maps/Leaflet for location tracking
3. **Report Generation** - PDF export with charts and summaries
4. **User Authentication** - Role-based access control
5. **API Integration** - Connect to actual wearable devices
6. **Notification System** - Push notifications for critical alerts
7. **Historical Trends** - Long-term data analysis and pattern detection
8. **Care Team Messaging** - In-app communication with participants

---

*Generated for Second Chance Health Monitoring Dashboard v0.1.0*