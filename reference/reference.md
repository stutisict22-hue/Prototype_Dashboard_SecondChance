
---

## **SECOND CHANCE - HEALTH MONITORING DASHBOARD**

### **Project Overview**
Build a real-time health monitoring dashboard for the "Second Chance" rehabilitation program. This dashboard will receive biometric data from smartwatch devices, display participant health metrics, and enable care teams to monitor recovery progress through visual analytics and alerts.

### **Technology Stack**
- **Frontend**: React with TypeScript + Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts or Chart.js
- **Icons**: Lucide React
- **State Management**: React Context + Hooks
- **Mock Data**: Simulated smartwatch API responses

---

## **1. DASHBOARD STRUCTURE**

### **1.1 Overall Layout**
```
┌─────────────────────────────────────────────────────────────┐
│  SIDEBAR (240px)          │  MAIN CONTENT AREA              │
│  ─────────────────       │  ─────────────────────────────── │
│  Logo + Program Name     │  Header (Search, Notifications)  │
│  ─────────────────       │  ─────────────────────────────── │
│  Navigation Menu         │  Dashboard Content               │
│  • Dashboard (Home)       │  ┌─────────────────────────────┐│
│  • Participants          │  │ Summary Cards Row            ││
│  • Alerts & Warnings     │  │ (4 metric cards)              ││
│  • Reports               │  ├─────────────────────────────┤│
│  • Settings              │  │ Charts Section (2x2 grid)    ││
│  ─────────────────       │  │ • Heart Rate Trends          ││
│  User Profile            │  │ • Activity Overview           ││
│                          │  │ • Sleep Quality              ││
│                          │  │ • Stress Level Analysis      ││
│                          │  ├─────────────────────────────┤│
│                          │  │ Participants Table           ││
│                          │  └─────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

### **1.2 Color Palette**
| Color Name | Hex Code | Usage |
|------------|----------|-------|
| Primary | #2563EB | Main actions, active states |
| Secondary | #7C3AED | Secondary elements |
| Success | #10B981 | Normal metrics, positive changes |
| Warning | #F59E0B | Caution alerts, attention needed |
| Danger | #EF4444 | Critical alerts, anomalies |
| Background | #F8FAFC | Main background |
| Card BG | #FFFFFF | Card backgrounds |
| Text Primary | #1E293B | Main text |
| Text Secondary | #64748B | Secondary text |

### **1.3 Typography**
| Element | Font | Size | Weight |
|---------|------|------|--------|
| Headings | Inter | 24px, 20px, 18px | 600-700 |
| Body | Inter | 14px-16px | 400-500 |
| Labels | Inter | 12px | 500 |
| Numbers | Inter | 28px-36px | 700 |

---

## **2. MOCK DATA SPECIFICATIONS**

### **2.1 Smartwatch API Response Structure**

```typescript
// Individual participant data model
interface Participant {
  id: string;
  name: string;
  age: number;
  enrollmentDate: string;
  currentPhase: 1 | 2 | 3 | 4 | 5 | 6;
  trustScore: number; // 0-100
  isActive: boolean;
}

// Biometric data model
interface BiometricData {
  participantId: string;
  timestamp: string;
  heartRate: {
    value: number;        // BPM (60-100 normal)
    variability: number; // HRV in ms (20-100 normal)
    status: 'normal' | 'elevated' | 'critical';
  };
  activity: {
    steps: number;
    calories: number;
    activeMinutes: number;
    idleMinutes: number;
    status: 'active' | 'moderate' | 'idle';
  };
  sleep: {
    duration: number;     // Hours
    quality: number;      // 0-100 score
    deepSleep: number;    // Hours
    remSleep: number;      // Hours
    interruptions: number;
    status: 'good' | 'fair' | 'poor';
  };
  stress: {
    level: number;        // 0-100
    detectedActivities: string[];
    status: 'low' | 'moderate' | 'high';
  };
  location: {
    latitude: number;
    longitude: number;
    flagged: boolean;
    zone: 'safe' | 'monitored' | 'restricted';
  };
  alertFlags: {
    hrvSpike: boolean;
    idleAlert: boolean;
    locationAlert: boolean;
    sleepAnomaly: boolean;
  };
}
```

### **2.2 Mock Data Generation Rules**

**Heart Rate Parameters:**
- Normal range: 60-80 BPM
- Resting: 55-70 BPM
- Post-activity: 90-120 BPM
- Suspicious spike: >120 BPM sustained
- Critical: >150 BPM or <45 BPM

**Heart Rate Variability (HRV):**
- Normal: 40-80 ms
- Elevated stress: <30 ms
- Drug use indicator: Sudden drop >50% or erratic patterns

**Activity Targets:**
- Daily step goal: 8,000-10,000 steps
- Active minutes target: 60+ minutes
- Idle detection: >2 hours during 6PM-10PM (high-risk hours)

**Sleep Quality:**
- Good: 7-9 hours, quality score >70
- Fair: 5-7 hours, quality 50-70
- Poor: <5 hours or quality <50

**GPS Zones:**
- Safe zones: Home, workplace, rehab center
- Monitored zones: Public areas, parks
- Restricted zones: Bars, clubs, known drug areas

### **2.3 Sample Mock Data (5 Participants)**

```javascript
const mockParticipants = [
  {
    id: "SC-001",
    name: "Arun Kumar",
    age: 24,
    enrollmentDate: "2024-11-15",
    currentPhase: 3,
    trustScore: 72,
    isActive: true
  },
  {
    id: "SC-002",
    name: "Rajesh Nair",
    age: 28,
    enrollmentDate: "2024-10-01",
    currentPhase: 4,
    trustScore: 85,
    isActive: true
  },
  {
    id: "SC-003",
    name: "Vineeth Thomas",
    age: 22,
    enrollmentDate: "2024-12-10",
    currentPhase: 2,
    trustScore: 45,
    isActive: true
  },
  {
    id: "SC-004",
    name: "Mohammed Faris",
    age: 26,
    enrollmentDate: "2024-09-05",
    currentPhase: 5,
    trustScore: 91,
    isActive: true
  },
  {
    id: "SC-005",
    name: "Kevin Mathew",
    age: 30,
    enrollmentDate: "2024-08-20",
    currentPhase: 6,
    trustScore: 88,
    isActive: false
  }
];

const generateHourlyBiometrics = (participantId, days = 7) => {
  const data = [];
  const now = new Date();
  
  for (let d = days - 1; d >= 0; d--) {
    for (let h = 0; h < 24; h++) {
      const baseHR = 65 + Math.random() * 15;
      const isHighRiskHour = h >= 18 && h <= 22;
      
      data.push({
        participantId,
        timestamp: new Date(now - d * 24 * 60 * 60 * 1000 + h * 60 * 60 * 1000).toISOString(),
        heartRate: {
          value: Math.round(baseHR + (Math.random() > 0.95 ? 30 : 0)),
          variability: Math.round(40 + Math.random() * 40),
          status: baseHR > 100 ? 'elevated' : 'normal'
        },
        activity: {
          steps: h >= 6 && h <= 22 ? Math.round(Math.random() * 500) : 0,
          calories: h >= 6 && h <= 22 ? Math.round(20 + Math.random() * 40) : 0,
          activeMinutes: h >= 6 && h <= 22 ? Math.round(Math.random() * 10) : 0,
          idleMinutes: h < 6 || h > 22 ? Math.round(Math.random() * 60) : 0,
          status: h >= 6 && h <= 22 ? 'active' : 'idle'
        },
        sleep: h >= 0 && h <= 6 ? {
          duration: h === 6 ? 7 + Math.random() * 2 : 0,
          quality: 60 + Math.random() * 40,
          deepSleep: 1.5 + Math.random() * 1.5,
          remSleep: 1 + Math.random() * 1,
          interruptions: Math.round(Math.random() * 3),
          status: 'good'
        } : null,
        stress: {
          level: Math.round(isHighRiskHour ? 60 + Math.random() * 30 : 30 + Math.random() * 20),
          detectedActivities: [],
          status: 'moderate'
        },
        location: {
          latitude: 10.8505 + (Math.random() - 0.5) * 0.1,
          longitude: 76.2711 + (Math.random() - 0.5) * 0.1,
          flagged: false,
          zone: 'safe'
        },
        alertFlags: {
          hrvSpike: Math.random() > 0.98,
          idleAlert: isHighRiskHour && Math.random() > 0.9,
          locationAlert: false,
          sleepAnomaly: Math.random() > 0.95
        }
      });
    }
  }
  return data;
};
```

---

## **3. DASHBOARD PAGES & COMPONENTS**

### **3.1 Summary Cards (Top Row - 4 Cards)**

| Card | Metric | Color Indicator | Trend |
|------|--------|-----------------|-------|
| Total Participants | 127 | Blue | +12 this month |
| Active Alerts | 8 | Red/Amber | -3 from yesterday |
| Avg Trust Score | 68% | Green | +5% this month |
| Compliance Rate | 94% | Green | +2% from last week |

### **3.2 Charts Section (2x2 Grid)**

**Chart 1: Heart Rate Trends (Line Chart)**
- X-axis: Time (24 hours)
- Y-axis: BPM (40-180)
- Lines: Current day vs 7-day average
- Threshold lines: Normal zone (60-100), Warning (>100), Critical (>120)
- Interactive tooltips showing exact values

**Chart 2: Activity Overview (Area Chart)**
- Stacked area: Steps, Active minutes, Calories burned
- Daily totals with weekly comparison
- Goal line at 10,000 steps

**Chart 3: Sleep Quality (Bar + Line Combo)**
- Bar chart: Hours slept per night
- Line overlay: Sleep quality score
- Color coding: Good (green), Fair (amber), Poor (red)

**Chart 4: Stress Level Analysis (Gauge + Timeline)**
- Gauge showing current stress level (0-100)
- Color zones: Low (0-33), Moderate (34-66), High (67-100)
- Timeline showing stress patterns over the day

### **3.3 Participants Table**

| Column | Description |
|--------|-------------|
| ID | SC-XXX format |
| Name | Participant name |
| Phase | Current program phase (1-6) |
| Trust Score | Circular progress indicator |
| Last Sync | Time since last smartwatch sync |
| Status | Active/Inactive badge |
| Alerts | Alert count with severity color |
| Actions | View details, Generate report |

### **3.4 Alert System**

**Alert Types:**
1. **HRV Spike Alert** (Critical - Red)
   - Trigger: HRV drops >50% or erratic pattern
   - Action: Immediate care team notification

2. **Idle Alert** (Warning - Amber)
   - Trigger: >2 hours idle during high-risk hours (6PM-10PM)
   - Action: Check-in prompt sent

3. **Location Alert** (Critical - Red)
   - Trigger: Entering restricted zone
   - Action: Immediate notification + authorities

4. **Sleep Anomaly** (Info - Blue)
   - Trigger: Sleep <4 hours or >12 hours, quality <40
   - Action: Log for weekly review

5. **Heart Rate Anomaly** (Warning - Amber)
   - Trigger: Sustained HR >120 or <45
   - Action: Medical follow-up required

**Alert Card Design:**
```
┌──────────────────────────────────────────────────┐
│ 🔴 HRV SPIKE ALERT                      2 min ago │
│ ──────────────────────────────────────────────── │
│ Participant: Arun Kumar (SC-001)                 │
│ Value: HRV dropped from 65ms to 28ms             │
│ Duration: 15 minutes sustained                   │
│ Location: Home (Safe Zone)                       │
│ ──────────────────────────────────────────────── │
│ [Acknowledge] [Contact Participant] [Dismiss]   │
└──────────────────────────────────────────────────┘
```

---

## **4. PARTICIPANT DETAIL VIEW**

### **4.1 Profile Header**
- Large avatar placeholder with initials
- Name, ID, Age, Enrollment date
- Current phase with progress bar (1-6)
- Trust Score badge with circular progress

### **4.2 Real-Time Metrics Grid**
| Metric | Current Value | Normal Range | Status |
|--------|--------------|--------------|--------|
| Heart Rate | 72 BPM | 60-100 | ✓ Normal |
| HRV | 58 ms | 40-80 | ✓ Normal |
| Steps Today | 4,521 | 8,000 goal | ⚠ Behind |
| Sleep Last Night | 6.5 hrs | 7-9 hrs | ⚠ Fair |
| Stress Level | 42/100 | <50 | ✓ Low |

### **4.3 7-Day Trend Charts**
- Individual charts for HR, HRV, Steps, Sleep, Stress
- Day-by-day breakdown with color coding
- Hover for detailed values

### **4.4 Location Map**
- Google Maps / Leaflet integration
- Current location marker
- Safe zones highlighted in green
- Restricted zones in red
- Recent location history trail

### **4.5 Timeline/Event Log**
| Timestamp | Event Type | Description |
|-----------|------------|-------------|
| 10:45 AM | Check-in | Participant logged daily check-in |
| 08:30 PM | Idle Alert | 45 minutes inactive during high-risk hours |
| 07:15 AM | Sleep | Woke up, quality score: 72 |
| 11:30 PM | Location | Home - Safe zone |

### **4.6 Medical Verification History**
| Date | Status | Result |
|------|--------|--------|
| 2024-12-01 | ✓ Verified | Clean |
| 2024-10-01 | ✓ Verified | Clean |
| 2024-08-01 | ✓ Verified | Clean |

---

## **5. INTERACTION REQUIREMENTS**

### **5.1 Filtering & Search**
- Search by name or ID
- Filter by: Phase (1-6), Trust Score range, Alert status
- Date range selector for historical data
- Sort by: Name, Trust Score, Last Sync, Alert Count

### **5.2 Real-Time Updates**
- Auto-refresh every 30 seconds
- Visual indicator when data updates
- Smooth animations for value changes

### **5.3 Notifications**
- Toast notifications for new alerts
- Desktop notification permission request
- Notification sound option

### **5.4 Export Features**
- Export participant report as PDF
- Export data as CSV
- Print view for official reports

---

## **6. RESPONSIVE DESIGN**

| Breakpoint | Layout |
|------------|--------|
| Desktop (>1280px) | Full sidebar + 2-column charts |
| Tablet (768-1279px) | Collapsed sidebar + single column |
| Mobile (<768px) | Bottom navigation + stacked cards |

---

## **7. TECHNICAL IMPLEMENTATION NOTES**

### **7.1 Mock API Simulation**
```typescript
// Simulated API endpoint structure
const API_BASE = '/api';

// Endpoints to mock:
// GET /participants - List all participants
// GET /participants/:id - Single participant details
// GET /participants/:id/biometrics?from=&to= - Time-series data
// GET /participants/:id/alerts - Participant alerts
// GET /alerts - All active alerts
// POST /alerts/:id/acknowledge - Acknowledge alert
// GET /dashboard/summary - Dashboard aggregations
```

### **7.2 Performance Requirements**
- Initial load: <3 seconds
- Chart rendering: <500ms
- Data refresh: Non-blocking
- Smooth 60fps animations

### **7.3 Accessibility**
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support
- Color contrast requirements met

---

## **8. MOCK DATA SCENARIOS FOR TESTING**

### **Scenario 1: Normal Participant**
- All metrics within normal range
- Trust score increasing steadily
- No alerts triggered

### **Scenario 2: At-Risk Participant**
- HRV showing erratic patterns
- Multiple idle alerts
- Declining trust score
- Requires intervention

### **Scenario 3: High Achiever**
- Consistently excellent metrics
- Above-average activity levels
- Trust score >90%
- Model participant

### **Scenario 4: Critical Alert**
- HRV spike detected
- Location in restricted zone
- Immediate notification triggered
- Heart rate anomaly

---

## **9. FINAL PROMPT FOR CLAUDE CODE**

```
Build a comprehensive health monitoring dashboard for the "Second Chance" rehabilitation program. This is a prototype dashboard using mock data simulating smartwatch biometric readings.

## Core Features Required:

1. **Sidebar Navigation**
   - Program logo and name
   - Navigation menu: Dashboard, Participants, Alerts, Reports, Settings
   - User profile section at bottom

2. **Dashboard Home Page**
   - 4 summary metric cards at top: Total Participants (127), Active Alerts (8), Avg Trust Score (68%), Compliance Rate (94%)
   - 2x2 chart grid:
     * Heart Rate Trends (24-hour line chart with threshold lines)
     * Activity Overview (area chart with step goal line)
     * Sleep Quality (bar + line combo chart)
     * Stress Level (gauge visualization)
   - Participants table with sorting and filtering

3. **Participant Detail Page**
   - Profile header with avatar, name, phase progress bar, trust score
   - Real-time metrics grid (heart rate, HRV, steps, sleep, stress)
   - 7-day trend mini charts for each metric
   - Location map (use placeholder/static map for now)
   - Event timeline log
   - Medical verification history

4. **Alerts Page**
   - List of all active alerts sorted by severity
   - Alert cards with participant info, metric details, timestamp
   - Action buttons: Acknowledge, Contact, Dismiss
   - Filter by alert type and severity

5. **Mock Data Generation**
   - Generate realistic mock data for 15+ participants
   - Each participant has hourly biometric readings
   - Include edge cases: normal, at-risk, high-achiever, critical
   - Realistic values within physiological ranges

## Design Specifications:
- Color scheme: Blue primary (#2563EB), with semantic colors (green=good, amber=warning, red=critical)
- Card-based layout with subtle shadows
- Smooth animations for data updates
- Inter font family
- Fully responsive down to mobile

## Technical Stack:
- React + TypeScript + Vite
- Tailwind CSS for styling
- Recharts for all charts
- Lucide React for icons
- React Router for navigation
- Context API for state management

## Important Notes:
- Use ONLY mock data (no real API calls)
- Make the dashboard visually impressive and production-ready
- Include realistic mock data scenarios for testing
- Deploy the final build using the deploy tool
```

---

## **10. DELIVERABLES CHECKLIST**

| Item | Status |
|------|--------|
| Sidebar with navigation | ☐ |
| Dashboard summary cards | ☐ |
| Heart rate trend chart | ☐ |
| Activity overview chart | ☐ |
| Sleep quality chart | ☐ |
| Stress level gauge | ☐ |
| Participants table | ☐ |
| Participant detail view | ☐ |
| Alerts system | ☐ |
| Mock data generator | ☐ |
| Responsive design | ☐ |
| Deployment | ☐ |

