
## **SECOND CHANCE - GOVERNMENT COMPLIANCE & TELEMETRY DASHBOARD (GOD VIEW)**

### **Project Overview**
Build an enterprise-grade, real-time telemetry monitoring dashboard for the "Second Chance" NDPS rehabilitation program. This is the "God View" used by Kerala Police and Excise Department Care Teams. It must receive simulated smartwatch biometric data, calculate "Trust Scores," and use AI-logic flags to instantly triage and highlight participants showing signs of relapse (HRV spikes) or geofence violations (Idle in Flagged Zones).

### **Technology Stack**
- **Frontend**: React with TypeScript + Vite
- **Styling**: Tailwind CSS (Crisp, light-mode, clinical enterprise aesthetic—think modern healthcare or government portals)
- **Charts**: Recharts (Crucial for time-series biometric data)
- **Maps**: React-Leaflet (For GPS geofence tracking)
- **Icons**: Lucide React
- **State Management**: React Context + Custom Hooks for polling
- **Mock Data**: Built-in TypeScript simulation engine for real-time data streaming

---

## **1. DASHBOARD STRUCTURE**

### **1.1 Overall Layout**
```text
┌─────────────────────────────────────────────────────────────┐
│  SIDEBAR (260px)         │  MAIN CONTENT AREA (FLEET VIEW)   │
│  ─────────────────       │  ─────────────────────────────── │
│  🛡️ Second Chance OS     │  Top Nav: Global Search, Alerts  │
│  ─────────────────       │  ─────────────────────────────── │
│  Command Operations      │  God View Triage Dashboard       │
│  • Fleet Overview        │  ┌─────────────────────────────┐│
│  • High-Risk Alerts (2)  │  │ System Health & Metrics     ││
│  • Geofence Monitor      │  │ (4 command cards)           ││
│  • Verified Outcomes     │  ├─────────────────────────────┤│
│  ─────────────────       │  │ Live Participant Triage     ││
│  Admin & Logs            │  │ [URGENT] CAND-002 (Idle)    ││
│  • Audit Trail           │  │ [WARNING] CAND-014 (HRV)    ││
│  • Settings              │  │ [STABLE] CAND-001           ││
│                          │  │ [STABLE] CAND-003           ││
│  Officer Profile         │  └─────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

### **1.2 Color Palette (Clinical & Authoritative Aesthetic)**
| Color Name | Hex Code | Usage |
|------------|----------|-------|
| Background | #F8FAFC | Soft slate/gray for the main app background |
| Surface | #FFFFFF | Pure white for cards, panels, and sidebars |
| Primary | #2563EB | Professional deep blue for active states/lines |
| Success | #10B981 | Compliant status, high Trust Score |
| Warning | #F59E0B | Minor anomalies, pending verification |
| Critical | #EF4444 | Relapse risk, HRV Spikes, Flagged GPS |
| Text Main | #0F172A | Deep slate for maximum readability |
| Text Muted | #64748B | Timestamps, secondary labels, table headers |

### **1.3 Typography**
| Element | Font | Size | Weight |
|---------|------|------|--------|
| Headings | Inter | 24px, 20px, 18px | 600-700 |
| Data Readouts| Roboto Mono | 32px-48px | 700 (For live metrics) |
| Body | Inter | 14px-16px | 400 |

---

## **2. MOCK DATA SPECIFICATIONS**

### **2.1 Smartwatch API Response Structure**

```typescript
// Core participant profile
interface Participant {
  id: string; // e.g., "CAND-001"
  name: string;
  enrollmentDate: string;
  trustScore: number; // 0-300 scale
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  verifiedOutcomes: {
    identity: boolean;
    skills: 'Pending' | 'Certified';
    employment: 'Pending' | 'Placed';
  };
}

// Live telemetry payload (Simulating 3-second smartwatch pings)
interface TelemetryStream {
  participantId: string;
  timestamp: string;
  heartRate: number; // BPM
  hrv: number; // Heart Rate Variability (ms)
  steps: number; // Daily accumulated
  bloodOxygen: number; // Percentage
  gps: {
    lat: number;
    lng: number;
    isInFlaggedZone: boolean;
  };
  aiFlags: {
    isIdle: boolean;
    isHRVSpiking: boolean;
  };
}
```

### **2.2 Mock Data Generation Rules (The Simulation Engine)**

**Stable Candidate Logic (e.g., CAND-001):**
- **Heart Rate:** Fluctuates smoothly between 65-80 BPM.
- **Steps:** Incrementing naturally.
- **GPS:** Randomized safely within a 'Safe Zone' radius.
- **Trust Score:** 250+ (High).

**High-Risk Candidate Logic (e.g., CAND-002):**
- **HRV Anomaly:** Sudden spikes in Heart Rate (115-135 BPM) with highly erratic HRV (simulating substance stress).
- **Idle Alert:** Steps remain completely static (e.g., stuck at 2100) during a prolonged period.
- **Geofence:** GPS coordinates mapped specifically to a simulated "Red Zone" / Narcotic hotspot.
- **Trust Score:** Dropping rapidly (e.g., < 180).

---

## **3. DASHBOARD PAGES & COMPONENTS**

### **3.1 Fleet Command Metrics (Top Row - 4 Cards)**
| Card | Metric | Color Indicator | Data |
|------|--------|-----------------|-------|
| Active Fleet | 50 | Primary (Blue) | Total tracked participants |
| High-Risk Alerts | 2 | Critical (Red) | Blinking indicator if > 0 |
| Avg Trust Score | 215.4 | Success (Green)| Out of 300 |
| Geofence Breaches| 1 | Warning (Amber) | Live GPS alerts |

### **3.2 The Triage Table (Core Component)**
- This is a dynamic list of all participants. Use clean, subtle borders and a white background.
- **CRITICAL FUNCTION:** The table MUST auto-sort based on `riskLevel`. Any participant with a "HIGH" risk level or active `aiFlags` must be pinned to the absolute top with a light red warning background row highlight (`bg-red-50`).
- Columns: ID, Name, Trust Score (with progress bar), Current HR, Last Sync, Status/Alerts.

### **3.3 Geofence Overview Map**
- A React-Leaflet map showing markers for all active participants.
- Draw a visible red circle to represent a "Flagged Narcotic Zone".
- Markers inside the red zone should pulse.

---

## **4. PARTICIPANT DRILL-DOWN VIEW (The Operations Panel)**

When a user clicks on a specific candidate in the Triage Table, this detailed view opens.

### **4.1 Identity & Trust Header**
- Candidate Name & ID.
- Massive "Trust Score" gauge (out of 300).
- 3 Verification Badges: Identity, Skills, Employment (Green checkmarks or gray "Pending").

### **4.2 Live Vitals Row**
- Digital readouts for: Current Heart Rate, Daily Steps, Blood Oxygen (SpO2).
- Flash the Heart Rate box background light red (`bg-red-100`) if `isHRVSpiking` is true.

### **4.3 24-Hour Telemetry Chart (Recharts)**
- Line chart displaying Heart Rate over time with a clean white background and crisp gridlines.
- **AI Highlight:** If the participant had an HRV Spike, use Recharts `<ReferenceArea />` to draw a transparent red box over that specific time period on the chart, annotated with: *"AI Alert: HRV Spike / Suspected Relapse"*.

### **4.4 Contextual GPS Audit**
- A mini-map showing the specific user's location.
- Text log: *"Idle Alert: No movement detected in Sector Gamma (Flagged Zone) for 2+ hours."*

---

## **5. INTERACTION REQUIREMENTS**

### **5.1 The Simulation Loop (Crucial)**
- Create a `useTelemetrySimulation` React hook. 
- Using `setInterval`, this hook must push a new `TelemetryStream` payload to the global state every 3 seconds, updating the charts and triage table in real-time without page reloads.

### **5.2 Alert Acknowledgment**
- High-risk alerts must have an "Acknowledge" button. Clicking it changes the status from "URGENT" to "UNDER INVESTIGATION" and stops the UI from flashing.

---

## **6. RESPONSIVE DESIGN**
| Breakpoint | Layout |
|------------|--------|
| Desktop (>1280px) | Full sidebar, side-by-side triage table and map. |
| Tablet (768-1279px) | Collapsed sidebar, stacked layout. |

---

## **7. FINAL PROMPT FOR AI CODING AGENT (CURSOR/CLAUDE)**

```text
You are an expert Frontend Architect. Build the "Second Chance" Government Telemetry Dashboard using React, TypeScript, Tailwind CSS, Recharts, and React-Leaflet. 

This is a "God View" monitoring system for law enforcement rehabilitation tracking. The aesthetic must be strictly light-mode, highly clinical, highly accessible, and enterprise-grade (similar to modern healthcare EHRs or Salesforce portals). Use a soft slate background (#F8FAFC) with pure white (#FFFFFF) cards and deep slate (#0F172A) text for maximum readability.

CORE REQUIREMENTS:
1. Architecture: Build a layout with a left sidebar (Navigation) and a main content area.
2. The Simulation Engine: Do not use an external API. Write a custom React Hook (`useTelemetry`) that simulates a WebSocket connection. Every 3 seconds, it must generate realistic smartwatch data (HR, Steps, GPS) for 5 participants and update the state.
3. The Triage Table: In the main view, build a data table of participants. You MUST auto-sort this table so that participants with simulated `isHRVSpiking` or `isIdle` alerts jump to the top of the list with a soft red warning background highlight (e.g., `bg-red-50`).
4. Drill-Down View: When clicking a row, replace the main view with a Participant Dashboard. This must include:
   - A large Trust Score gauge (0-300).
   - Real-time digital readouts for BPM and Steps.
   - A Recharts time-series line chart showing Heart Rate.
   - USE RECHARTS `<ReferenceArea>` to explicitly highlight anomalous HRV spikes in red on the graph.
5. Map Integration: Use React-Leaflet to show a clean, light-themed map. Render a red circular "Restricted Zone". If Candidate-002's GPS coordinates fall inside this zone, trigger a critical UI alert.

Do not use placeholders like "Chart goes here." Implement the actual Recharts and Leaflet logic. Ensure the entire UI updates smoothly every 3 seconds when the mock data ticks. Output fully modular, production-ready code.
```

---

## **8. DELIVERABLES CHECKLIST**

| Item | Status |
|------|--------|
| Light-mode Sidebar & Shell | ☐ |
| Mock Telemetry Hook (3s polling) | ☐ |
| Auto-Sorting Triage Table | ☐ |
| Trust Score Visualizer | ☐ |
| Real-time Recharts HR Line Graph | ☐ |
| Recharts ReferenceArea (Anomaly Highlight) | ☐ |
| Light-themed Leaflet Map with Geofence Zones | ☐ |
| Verified Outcomes Badges | ☐ |
| Smooth UI updates without full re-renders| ☐ |