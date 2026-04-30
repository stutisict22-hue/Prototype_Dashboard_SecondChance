export interface ParticipantContact {
  phone: string;
  email: string;
  whatsapp: string;
  district: string;
}

export interface Participant {
  id: string;
  name: string;
  age: number;
  enrollmentDate: string;
  currentPhase: 1 | 2 | 3 | 4 | 5 | 6;
  trustScore: number;
  isActive: boolean;
  contact?: ParticipantContact;
}

export interface HeartRateData {
  value: number;
  variability: number;
  status: 'normal' | 'elevated' | 'critical';
}

export interface ActivityData {
  steps: number;
  calories: number;
  activeMinutes: number;
  idleMinutes: number;
  status: 'active' | 'moderate' | 'idle';
}

export interface SleepData {
  duration: number;
  quality: number;
  deepSleep: number;
  remSleep: number;
  interruptions: number;
  status: 'good' | 'fair' | 'poor';
}

export interface StressData {
  level: number;
  detectedActivities: string[];
  status: 'low' | 'moderate' | 'high';
}

export interface LocationData {
  latitude: number;
  longitude: number;
  flagged: boolean;
  zone: 'safe' | 'monitored' | 'restricted';
}

export interface AlertFlags {
  hrvSpike: boolean;
  idleAlert: boolean;
  locationAlert: boolean;
  sleepAnomaly: boolean;
}

export interface BiometricData {
  participantId: string;
  timestamp: string;
  heartRate: HeartRateData;
  activity: ActivityData;
  sleep: SleepData | null;
  stress: StressData;
  location: LocationData;
  alertFlags: AlertFlags;
}

export interface Alert {
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

export interface DashboardSummary {
  totalParticipants: number;
  activeAlerts: number;
  avgTrustScore: number;
  complianceRate: number;
}

export interface ChartDataPoint {
  time: string;
  value: number;
  avg?: number;
}

export interface ParticipantBiometrics {
  participant: Participant;
  current: BiometricData;
  daily: BiometricData[];
  weekly: BiometricData[];
}

// ── Ticket system ─────────────────────────────────────────────────────────────

export type TicketCategory = 'Low Mood' | 'Craving' | 'Med Issue' | 'Emergency' | 'Other';
export type TicketStatus = 'open' | 'in_progress' | 'resolved';

export interface TicketMessage {
  id: string;
  sender: 'candidate' | 'social_worker';
  senderName: string;
  text: string;
  timestamp: string;
}

export interface Ticket {
  id: string;
  participantId: string;
  category: TicketCategory;
  description: string;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
  messages: TicketMessage[];
}

// ── Candidate portal ──────────────────────────────────────────────────────────

export interface CheckIn {
  participantId: string;
  date: string;
  moodScore: number; // 1–10
  note: string;
  completed: boolean;
}

export interface Badge {
  id: string;
  label: string;
  description: string;
  earned: boolean;
  earnedDate?: string;
}

export interface MedicationReminder {
  name: string;
  dosage: string;
  time: string;
  taken: boolean;
}

export interface SocialWorkerContact {
  name: string;
  initials: string;
  role: 'Social Worker' | 'Doctor';
  phone: string;
  whatsapp: string;
  email: string;
}

// ── Government dashboard ──────────────────────────────────────────────────────

export interface GovDistrict {
  name: string;
  active: number;
  critical: number;
  lat: number;
  lng: number;
}

export interface GovMetrics {
  totalEnrolled: number;
  activeThisWeek: number;
  alertsThisWeek: number;
  alertsResolved: number;
  avgTrustScore: number;
  complianceRate: number;
  districts: GovDistrict[];
}

// ── Role ──────────────────────────────────────────────────────────────────────

export type AppRole = 'candidate' | 'social_worker' | 'government' | null;
