export interface Participant {
  id: string;
  name: string;
  age: number;
  enrollmentDate: string;
  currentPhase: 1 | 2 | 3 | 4 | 5 | 6;
  trustScore: number;
  isActive: boolean;
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