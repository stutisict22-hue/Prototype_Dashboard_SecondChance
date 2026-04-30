import {
  Participant, BiometricData, Alert, DashboardSummary,
  Ticket, CheckIn, Badge, MedicationReminder, SocialWorkerContact, GovMetrics
} from './types';

export const mockParticipants: Participant[] = [
  { id: 'SC-001', name: 'Arun Kumar',       age: 24, enrollmentDate: '2024-11-15', currentPhase: 3, trustScore: 72, isActive: true,  contact: { phone: '+91 94470 11001', email: 'arun.kumar@mail.com',       whatsapp: '+919447011001', district: 'Thiruvananthapuram' } },
  { id: 'SC-002', name: 'Rajesh Nair',       age: 28, enrollmentDate: '2024-10-01', currentPhase: 4, trustScore: 85, isActive: true,  contact: { phone: '+91 94470 11002', email: 'rajesh.nair@mail.com',       whatsapp: '+919447011002', district: 'Kochi' } },
  { id: 'SC-003', name: 'Vineeth Thomas',    age: 22, enrollmentDate: '2024-12-10', currentPhase: 2, trustScore: 45, isActive: true,  contact: { phone: '+91 94470 11003', email: 'vineeth.thomas@mail.com',    whatsapp: '+919447011003', district: 'Thrissur' } },
  { id: 'SC-004', name: 'Mohammed Faris',    age: 26, enrollmentDate: '2024-09-05', currentPhase: 5, trustScore: 91, isActive: true,  contact: { phone: '+91 94470 11004', email: 'mohammed.faris@mail.com',    whatsapp: '+919447011004', district: 'Kozhikode' } },
  { id: 'SC-005', name: 'Kevin Mathew',      age: 30, enrollmentDate: '2024-08-20', currentPhase: 6, trustScore: 88, isActive: false, contact: { phone: '+91 94470 11005', email: 'kevin.mathew@mail.com',      whatsapp: '+919447011005', district: 'Kollam' } },
  { id: 'SC-006', name: 'Anand Pillai',      age: 25, enrollmentDate: '2024-10-15', currentPhase: 3, trustScore: 68, isActive: true,  contact: { phone: '+91 94470 11006', email: 'anand.pillai@mail.com',      whatsapp: '+919447011006', district: 'Palakkad' } },
  { id: 'SC-007', name: 'Shaji Menon',       age: 32, enrollmentDate: '2024-07-01', currentPhase: 6, trustScore: 95, isActive: true,  contact: { phone: '+91 94470 11007', email: 'shaji.menon@mail.com',       whatsapp: '+919447011007', district: 'Malappuram' } },
  { id: 'SC-008', name: 'Ravi Shankar',      age: 27, enrollmentDate: '2024-11-01', currentPhase: 2, trustScore: 52, isActive: true,  contact: { phone: '+91 94470 11008', email: 'ravi.shankar@mail.com',      whatsapp: '+919447011008', district: 'Kannur' } },
  { id: 'SC-009', name: 'George Chandy',     age: 29, enrollmentDate: '2024-09-15', currentPhase: 5, trustScore: 78, isActive: true,  contact: { phone: '+91 94470 11009', email: 'george.chandy@mail.com',     whatsapp: '+919447011009', district: 'Kottayam' } },
  { id: 'SC-010', name: 'Joseph Sebastian',  age: 24, enrollmentDate: '2024-12-05', currentPhase: 1, trustScore: 38, isActive: true,  contact: { phone: '+91 94470 11010', email: 'joseph.sebastian@mail.com',  whatsapp: '+919447011010', district: 'Alappuzha' } },
  { id: 'SC-011', name: 'Paulose Mathew',    age: 31, enrollmentDate: '2024-06-20', currentPhase: 6, trustScore: 92, isActive: true,  contact: { phone: '+91 94470 11011', email: 'paulose.mathew@mail.com',    whatsapp: '+919447011011', district: 'Idukki' } },
  { id: 'SC-012', name: 'Suresh Kumar',      age: 26, enrollmentDate: '2024-10-25', currentPhase: 4, trustScore: 64, isActive: true,  contact: { phone: '+91 94470 11012', email: 'suresh.kumar@mail.com',      whatsapp: '+919447011012', district: 'Wayanad' } },
  { id: 'SC-013', name: 'John Abraham',      age: 23, enrollmentDate: '2025-01-10', currentPhase: 1, trustScore: 55, isActive: true,  contact: { phone: '+91 94470 11013', email: 'john.abraham@mail.com',      whatsapp: '+919447011013', district: 'Kasaragod' } },
  { id: 'SC-014', name: 'Thomas Zacharia',   age: 28, enrollmentDate: '2024-08-15', currentPhase: 5, trustScore: 82, isActive: true,  contact: { phone: '+91 94470 11014', email: 'thomas.zacharia@mail.com',   whatsapp: '+919447011014', district: 'Pathanamthitta' } },
  { id: 'SC-015', name: 'Mathew Kurian',     age: 33, enrollmentDate: '2024-05-10', currentPhase: 6, trustScore: 89, isActive: false, contact: { phone: '+91 94470 11015', email: 'mathew.kurian@mail.com',     whatsapp: '+919447011015', district: 'Thrissur' } },
];

const generateHourlyData = (participantId: string, scenario: 'normal' | 'at-risk' | 'high-achiever' | 'critical' = 'normal'): BiometricData[] => {
  const data: BiometricData[] = [];
  const now = new Date();

  for (let h = 0; h < 24; h++) {
    const isHighRiskHour = h >= 18 && h <= 22;
    let baseHR = 65 + Math.random() * 15;
    let hrv = 40 + Math.random() * 40;
    let steps = 0;
    let calories = 0;
    let activeMinutes = 0;
    let stressLevel = 30 + Math.random() * 20;

    if (scenario === 'at-risk') {
      baseHR = h >= 18 ? 85 + Math.random() * 25 : 70 + Math.random() * 15;
      hrv = h >= 18 ? 20 + Math.random() * 20 : 35 + Math.random() * 30;
      if (isHighRiskHour && Math.random() > 0.7) steps = 0;
    } else if (scenario === 'high-achiever') {
      baseHR = 58 + Math.random() * 12;
      hrv = 60 + Math.random() * 30;
      steps = h >= 6 && h <= 22 ? Math.round(400 + Math.random() * 600) : 0;
      activeMinutes = h >= 6 && h <= 22 ? Math.round(8 + Math.random() * 12) : 0;
    } else if (scenario === 'critical') {
      baseHR = 90 + Math.random() * 40;
      hrv = 15 + Math.random() * 20;
      stressLevel = 70 + Math.random() * 25;
    }

    if (h >= 6 && h <= 22 && scenario !== 'at-risk') {
      steps = Math.round(Math.random() * 500);
      calories = Math.round(20 + Math.random() * 40);
      activeMinutes = Math.round(Math.random() * 10);
    }

    data.push({
      participantId,
      timestamp: new Date(now.getTime() - (23 - h) * 60 * 60 * 1000).toISOString(),
      heartRate: {
        value: Math.round(baseHR),
        variability: Math.round(hrv),
        status: baseHR > 120 ? 'critical' : baseHR > 100 ? 'elevated' : 'normal'
      },
      activity: {
        steps,
        calories,
        activeMinutes,
        idleMinutes: (h < 6 || h > 22) ? Math.round(Math.random() * 60) : 0,
        status: steps > 200 ? 'active' : steps > 50 ? 'moderate' : 'idle'
      },
      sleep: h >= 0 && h <= 6 ? {
        duration: h === 6 ? (scenario === 'high-achiever' ? 8 : scenario === 'at-risk' ? 5 : 7) + Math.random() * 2 : 0,
        quality: scenario === 'high-achiever' ? 80 + Math.random() * 20 : scenario === 'at-risk' ? 40 + Math.random() * 20 : 60 + Math.random() * 30,
        deepSleep: 1.5 + Math.random() * 1.5,
        remSleep: 1 + Math.random() * 1,
        interruptions: scenario === 'at-risk' ? Math.round(2 + Math.random() * 4) : Math.round(Math.random() * 2),
        status: scenario === 'high-achiever' ? 'good' : scenario === 'at-risk' ? 'poor' : 'fair'
      } : null,
      stress: {
        level: Math.round(isHighRiskHour ? stressLevel + 20 : stressLevel),
        detectedActivities: [],
        status: stressLevel > 66 ? 'high' : stressLevel > 33 ? 'moderate' : 'low'
      },
      location: {
        latitude: 10.8505 + (Math.random() - 0.5) * 0.1,
        longitude: 76.2711 + (Math.random() - 0.5) * 0.1,
        flagged: scenario === 'critical' && isHighRiskHour && Math.random() > 0.8,
        zone: 'safe'
      },
      alertFlags: {
        hrvSpike: scenario === 'critical' && Math.random() > 0.85,
        idleAlert: scenario === 'at-risk' && isHighRiskHour && Math.random() > 0.75,
        locationAlert: scenario === 'critical' && Math.random() > 0.95,
        sleepAnomaly: scenario === 'at-risk' && Math.random() > 0.8
      }
    });
  }
  return data;
};

export const getParticipantBiometrics = (participant: Participant): { current: BiometricData; hourly: BiometricData[] } => {
  let scenario: 'normal' | 'at-risk' | 'high-achiever' | 'critical' = 'normal';
  if (participant.trustScore < 50) scenario = 'at-risk';
  if (participant.trustScore > 90) scenario = 'high-achiever';
  if (participant.id === 'SC-003' || participant.id === 'SC-010') scenario = 'critical';

  const hourly = generateHourlyData(participant.id, scenario);
  return { current: hourly[23], hourly };
};

export const mockAlerts: Alert[] = [
  {
    id: 'ALT-001', type: 'hrvSpike', severity: 'critical',
    participantId: 'SC-003', participantName: 'Vineeth Thomas',
    title: 'HRV Spike Alert',
    description: 'HRV dropped from 62ms to 24ms. Sustained for 15 minutes.',
    timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(), acknowledged: false
  },
  {
    id: 'ALT-002', type: 'idleAlert', severity: 'warning',
    participantId: 'SC-010', participantName: 'Joseph Sebastian',
    title: 'Idle Alert',
    description: '2.5 hours inactive during high-risk hours (6PM-10PM).',
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(), acknowledged: false
  },
  {
    id: 'ALT-003', type: 'locationAlert', severity: 'critical',
    participantId: 'SC-003', participantName: 'Vineeth Thomas',
    title: 'Restricted Zone Entry',
    description: 'Entered restricted zone near downtown. Location flagged.',
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(), acknowledged: false
  },
  {
    id: 'ALT-004', type: 'sleepAnomaly', severity: 'info',
    participantId: 'SC-008', participantName: 'Ravi Shankar',
    title: 'Sleep Anomaly Detected',
    description: 'Only 4 hours sleep with 3 interruptions. Quality score: 38.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), acknowledged: true
  },
  {
    id: 'ALT-005', type: 'idleAlert', severity: 'warning',
    participantId: 'SC-006', participantName: 'Anand Pillai',
    title: 'Idle Alert',
    description: '1.5 hours inactive during high-risk hours.',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), acknowledged: false
  },
  {
    id: 'ALT-006', type: 'heartRateAnomaly', severity: 'warning',
    participantId: 'SC-012', participantName: 'Suresh Kumar',
    title: 'Heart Rate Elevated',
    description: 'Sustained heart rate above 110 BPM for 30 minutes.',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), acknowledged: true
  },
];

export const getDashboardSummary = (): DashboardSummary => ({
  totalParticipants: 127,
  activeAlerts: mockAlerts.filter(a => !a.acknowledged).length,
  avgTrustScore: 68,
  complianceRate: 94
});

// ── Tickets ───────────────────────────────────────────────────────────────────

export const mockTickets: Ticket[] = [
  {
    id: 'TKT-001', participantId: 'SC-003', category: 'Craving',
    description: 'Feeling strong cravings tonight, not sure how to handle it.',
    status: 'open',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    messages: [
      { id: 'M-001', sender: 'candidate', senderName: 'Vineeth Thomas', text: 'Feeling strong cravings tonight, not sure how to handle it.', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
      { id: 'M-002', sender: 'social_worker', senderName: 'Priya Suresh', text: 'Hi Vineeth, I am here. Try the breathing exercise we practiced. Can you call me in 5 minutes?', timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString() },
    ]
  },
  {
    id: 'TKT-002', participantId: 'SC-003', category: 'Med Issue',
    description: 'I forgot to take my medication this morning.',
    status: 'resolved',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
    messages: [
      { id: 'M-003', sender: 'candidate', senderName: 'Vineeth Thomas', text: 'I forgot to take my medication this morning.', timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() },
      { id: 'M-004', sender: 'social_worker', senderName: 'Priya Suresh', text: 'Take it now if it has been less than 4 hours. Otherwise skip and continue tomorrow. Let me know once done.', timestamp: new Date(Date.now() - 23 * 60 * 60 * 1000).toISOString() },
      { id: 'M-005', sender: 'candidate', senderName: 'Vineeth Thomas', text: 'Done, thank you!', timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString() },
    ]
  },
  {
    id: 'TKT-003', participantId: 'SC-010', category: 'Low Mood',
    description: 'Feeling very low today, do not want to go out.',
    status: 'in_progress',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    messages: [
      { id: 'M-006', sender: 'candidate', senderName: 'Joseph Sebastian', text: 'Feeling very low today, do not want to go out.', timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString() },
      { id: 'M-007', sender: 'social_worker', senderName: 'Priya Suresh', text: 'That is okay Joseph. Stay home today if needed. I will call you in an hour.', timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString() },
    ]
  },
];

// ── Candidate-portal data (for SC-003 Vineeth Thomas as the demo candidate) ──

export const candidateCheckIn: CheckIn = {
  participantId: 'SC-003',
  date: new Date().toISOString().split('T')[0],
  moodScore: 0,
  note: '',
  completed: false,
};

export const candidateBadges: Badge[] = [
  { id: 'B-001', label: '7-Day Streak',   description: 'Checked in 7 days in a row',   earned: true,  earnedDate: '2026-04-27' },
  { id: 'B-002', label: 'Step Champion',  description: 'Reached 8,000 steps in a day',  earned: true,  earnedDate: '2026-04-28' },
  { id: 'B-003', label: 'Sleep Well',     description: '7+ hours for 5 nights',         earned: false },
  { id: 'B-004', label: 'Calm Mind',      description: 'Stress below 40 for 3 days',    earned: false },
  { id: 'B-005', label: 'Phase Hero',     description: 'Completed Phase 2',             earned: true,  earnedDate: '2026-04-10' },
];

export const candidateMedication: MedicationReminder[] = [
  { name: 'Naltrexone', dosage: '50mg', time: '08:00 AM', taken: true },
  { name: 'Vitamin B12', dosage: '500mcg', time: '08:00 PM', taken: false },
];

export const candidatePOC: SocialWorkerContact[] = [
  { name: 'Priya Suresh',  initials: 'PS', role: 'Social Worker', phone: '+91 98950 00001', whatsapp: '+919895000001', email: 'priya.suresh@secondchance.org' },
  { name: 'Dr. Arjun Mehta', initials: 'AM', role: 'Doctor',      phone: '+91 98950 00002', whatsapp: '+919895000002', email: 'arjun.mehta@secondchance.org' },
];

// ── Government metrics ────────────────────────────────────────────────────────

export const govMetrics: GovMetrics = {
  totalEnrolled: 127,
  activeThisWeek: 118,
  alertsThisWeek: 12,
  alertsResolved: 8,
  avgTrustScore: 68,
  complianceRate: 94,
  districts: [
    { name: 'Thiruvananthapuram', active: 22, critical: 2, lat: 8.5241,  lng: 76.9366 },
    { name: 'Kochi',              active: 18, critical: 1, lat: 9.9312,  lng: 76.2673 },
    { name: 'Thrissur',           active: 15, critical: 3, lat: 10.5276, lng: 76.2144 },
    { name: 'Kozhikode',          active: 14, critical: 1, lat: 11.2588, lng: 75.7804 },
    { name: 'Kannur',             active: 12, critical: 0, lat: 11.8745, lng: 75.3704 },
    { name: 'Palakkad',           active: 10, critical: 1, lat: 10.7867, lng: 76.6548 },
    { name: 'Malappuram',         active:  9, critical: 0, lat: 11.0510, lng: 76.0711 },
    { name: 'Kollam',             active:  8, critical: 2, lat: 8.8932,  lng: 76.6141 },
    { name: 'Kottayam',           active:  7, critical: 0, lat: 9.5916,  lng: 76.5222 },
    { name: 'Alappuzha',          active:  5, critical: 1, lat: 9.4981,  lng: 76.3388 },
  ]
};

// ── Chart helpers (unchanged) ─────────────────────────────────────────────────

export const generateHeartRateChartData = () => {
  const hours = [];
  const currentValues = [];
  const avgValues = [];
  const now = new Date();
  for (let i = 0; i < 24; i++) {
    const hour = new Date(now.getTime() - (23 - i) * 60 * 60 * 1000).getHours();
    hours.push(`${hour}:00`);
    currentValues.push(Math.round(65 + Math.random() * 20));
    avgValues.push(Math.round(68 + Math.random() * 10));
  }
  return { hours, currentValues, avgValues };
};

export const generateActivityChartData = () => ({
  days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  steps: [8500, 10200, 7800, 9200, 11000, 6500, 8100],
  calories: [2100, 2450, 1900, 2200, 2600, 1800, 2050],
});

export const generateSleepChartData = () => ({
  days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  hours: [6.5, 7.5, 5.5, 8, 7, 9, 6],
  quality: [65, 75, 45, 85, 70, 90, 55],
});

export const generateStressChartData = () => {
  const hours = [];
  const levels = [];
  for (let i = 0; i < 24; i++) {
    hours.push(`${i}:00`);
    const isHighRisk = i >= 18 && i <= 22;
    levels.push(Math.round(isHighRisk ? 55 + Math.random() * 30 : 30 + Math.random() * 25));
  }
  return { hours, levels };
};
