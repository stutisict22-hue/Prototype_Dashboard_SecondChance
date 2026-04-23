import { Participant, BiometricData, Alert, DashboardSummary } from './types';

export const mockParticipants: Participant[] = [
  { id: 'SC-001', name: 'Arun Kumar', age: 24, enrollmentDate: '2024-11-15', currentPhase: 3, trustScore: 72, isActive: true },
  { id: 'SC-002', name: 'Rajesh Nair', age: 28, enrollmentDate: '2024-10-01', currentPhase: 4, trustScore: 85, isActive: true },
  { id: 'SC-003', name: 'Vineeth Thomas', age: 22, enrollmentDate: '2024-12-10', currentPhase: 2, trustScore: 45, isActive: true },
  { id: 'SC-004', name: 'Mohammed Faris', age: 26, enrollmentDate: '2024-09-05', currentPhase: 5, trustScore: 91, isActive: true },
  { id: 'SC-005', name: 'Kevin Mathew', age: 30, enrollmentDate: '2024-08-20', currentPhase: 6, trustScore: 88, isActive: false },
  { id: 'SC-006', name: 'Anand Pillai', age: 25, enrollmentDate: '2024-10-15', currentPhase: 3, trustScore: 68, isActive: true },
  { id: 'SC-007', name: 'Shaji Menon', age: 32, enrollmentDate: '2024-07-01', currentPhase: 6, trustScore: 95, isActive: true },
  { id: 'SC-008', name: 'Ravi Shankar', age: 27, enrollmentDate: '2024-11-01', currentPhase: 2, trustScore: 52, isActive: true },
  { id: 'SC-009', name: 'George Chandy', age: 29, enrollmentDate: '2024-09-15', currentPhase: 5, trustScore: 78, isActive: true },
  { id: 'SC-010', name: 'Joseph Sebastian', age: 24, enrollmentDate: '2024-12-05', currentPhase: 1, trustScore: 38, isActive: true },
  { id: 'SC-011', name: 'Paulose Mathew', age: 31, enrollmentDate: '2024-06-20', currentPhase: 6, trustScore: 92, isActive: true },
  { id: 'SC-012', name: 'Suresh Kumar', age: 26, enrollmentDate: '2024-10-25', currentPhase: 4, trustScore: 64, isActive: true },
  { id: 'SC-013', name: 'John Abraham', age: 23, enrollmentDate: '2025-01-10', currentPhase: 1, trustScore: 55, isActive: true },
  { id: 'SC-014', name: 'Thomas Zacharia', age: 28, enrollmentDate: '2024-08-15', currentPhase: 5, trustScore: 82, isActive: true },
  { id: 'SC-015', name: 'Mathew Kurian', age: 33, enrollmentDate: '2024-05-10', currentPhase: 6, trustScore: 89, isActive: false },
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
      if (isHighRiskHour && Math.random() > 0.7) {
        steps = 0;
      }
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
    id: 'ALT-001',
    type: 'hrvSpike',
    severity: 'critical',
    participantId: 'SC-003',
    participantName: 'Vineeth Thomas',
    title: 'HRV Spike Alert',
    description: 'HRV dropped from 62ms to 24ms. Sustained for 15 minutes.',
    timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    acknowledged: false
  },
  {
    id: 'ALT-002',
    type: 'idleAlert',
    severity: 'warning',
    participantId: 'SC-010',
    participantName: 'Joseph Sebastian',
    title: 'Idle Alert',
    description: '2.5 hours inactive during high-risk hours (6PM-10PM).',
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    acknowledged: false
  },
  {
    id: 'ALT-003',
    type: 'locationAlert',
    severity: 'critical',
    participantId: 'SC-003',
    participantName: 'Vineeth Thomas',
    title: 'Restricted Zone Entry',
    description: 'Entered restricted zone near downtown. Location flagged.',
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    acknowledged: false
  },
  {
    id: 'ALT-004',
    type: 'sleepAnomaly',
    severity: 'info',
    participantId: 'SC-008',
    participantName: 'Ravi Shankar',
    title: 'Sleep Anomaly Detected',
    description: 'Only 4 hours sleep with 3 interruptions. Quality score: 38.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    acknowledged: true
  },
  {
    id: 'ALT-005',
    type: 'idleAlert',
    severity: 'warning',
    participantId: 'SC-006',
    participantName: 'Anand Pillai',
    title: 'Idle Alert',
    description: '1.5 hours inactive during high-risk hours.',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    acknowledged: false
  },
  {
    id: 'ALT-006',
    type: 'heartRateAnomaly',
    severity: 'warning',
    participantId: 'SC-012',
    participantName: 'Suresh Kumar',
    title: 'Heart Rate Elevated',
    description: 'Sustained heart rate above 110 BPM for 30 minutes.',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    acknowledged: true
  },
];

export const getDashboardSummary = (): DashboardSummary => ({
  totalParticipants: 127,
  activeAlerts: mockAlerts.filter(a => !a.acknowledged).length,
  avgTrustScore: 68,
  complianceRate: 94
});

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

export const generateActivityChartData = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const steps = [8500, 10200, 7800, 9200, 11000, 6500, 8100];
  const calories = [2100, 2450, 1900, 2200, 2600, 1800, 2050];

  return { days, steps, calories };
};

export const generateSleepChartData = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = [6.5, 7.5, 5.5, 8, 7, 9, 6];
  const quality = [65, 75, 45, 85, 70, 90, 55];

  return { days, hours, quality };
};

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