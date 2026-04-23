import { Participant } from '../data/types';
import { getParticipantBiometrics } from '../data/mockData';
import { HeartRateChart, ActivityChart, SleepChart, StressChart } from '../components/Charts';
import { ArrowLeft, MapPin, Clock, Heart, Activity, Moon, Zap, AlertTriangle, Shield, CheckCircle } from 'lucide-react';

interface ParticipantDetailProps {
  participant: Participant;
  onBack: () => void;
}

export default function ParticipantDetail({ participant, onBack }: ParticipantDetailProps) {
  const { current } = getParticipantBiometrics(participant);

  const metrics = [
    {
      label: 'Heart Rate',
      value: `${current.heartRate.value} BPM`,
      status: current.heartRate.status,
      icon: Heart,
      normal: '60-100 BPM',
      color: current.heartRate.status === 'critical' ? 'text-danger' : current.heartRate.status === 'elevated' ? 'text-warning' : 'text-success'
    },
    { label: 'HRV', value: `${current.heartRate.variability} ms`, status: current.heartRate.status === 'critical' ? 'warning' : 'normal', icon: Zap, normal: '40-80 ms', color: current.heartRate.variability < 30 ? 'text-warning' : 'text-success' },
    { label: 'Steps Today', value: current.activity.steps.toLocaleString(), status: current.activity.steps >= 8000 ? 'normal' : 'warning', icon: Activity, normal: '8,000 goal', color: current.activity.steps >= 8000 ? 'text-success' : 'text-warning' },
    { label: 'Sleep Last Night', value: current.sleep ? `${current.sleep.duration.toFixed(1)} hrs` : 'N/A', status: current.sleep?.status || 'unknown', icon: Moon, normal: '7-9 hours', color: current.sleep?.status === 'good' ? 'text-success' : current.sleep?.status === 'fair' ? 'text-warning' : 'text-danger' },
    { label: 'Stress Level', value: `${current.stress.level}/100`, status: current.stress.status, icon: AlertTriangle, normal: '<50', color: current.stress.level > 66 ? 'text-danger' : current.stress.level > 33 ? 'text-warning' : 'text-success' }
  ];

  const phaseProgress = (participant.currentPhase / 6) * 100;

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors">
        <ArrowLeft size={18} />
        Back to Dashboard
      </button>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
          <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
            {participant.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
              <div>
                <h2 className="text-2xl font-bold text-text-primary">{participant.name}</h2>
                <p className="text-text-secondary">{participant.id} | Age {participant.age} | Enrolled {participant.enrollmentDate}</p>
              </div>
              <div className="text-left sm:text-right flex-shrink-0">
                <div className={`text-sm font-medium ${participant.trustScore >= 75 ? 'text-success' : participant.trustScore >= 50 ? 'text-warning' : 'text-danger'}`}>
                  Trust Score
                </div>
                <div className="text-3xl font-bold">{participant.trustScore}%</div>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-text-secondary">Program Phase</span>
                <span className="text-sm font-medium text-primary">Phase {participant.currentPhase} of 6</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${phaseProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-4">
        {metrics.map(metric => (
          <div key={metric.label} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-2 text-text-secondary text-xs font-medium uppercase tracking-wide mb-2">
              <metric.icon size={14} />
              {metric.label}
            </div>
            <div className={`text-2xl font-bold ${metric.color}`}>{metric.value}</div>
            <div className="text-xs text-text-secondary mt-1">Normal: {metric.normal}</div>
            <div className={`mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
              metric.status === 'normal' ? 'bg-emerald-100 text-success' :
              metric.status === 'warning' || metric.status === 'elevated' ? 'bg-amber-100 text-warning' :
              metric.status === 'critical' ? 'bg-red-100 text-danger' :
              metric.status === 'good' ? 'bg-emerald-100 text-success' :
              metric.status === 'fair' ? 'bg-amber-100 text-warning' :
              metric.status === 'poor' ? 'bg-red-100 text-danger' :
              'bg-gray-100 text-text-secondary'
            }`}>
              {metric.status === 'normal' || metric.status === 'good' ? <CheckCircle size={10} /> : <AlertTriangle size={10} />}
              {metric.status}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <HeartRateChart />
        <ActivityChart />
        <SleepChart />
        <StressChart />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
            <MapPin size={18} />
            Location
          </h3>
          <div className="bg-gray-100 rounded-lg h-40 flex items-center justify-center mb-4">
            <div className="text-center">
              <MapPin size={32} className="text-primary mx-auto mb-2" />
              <p className="text-sm text-text-secondary">Map placeholder</p>
              <p className="text-xs text-text-secondary mt-1">Lat: {current.location.latitude.toFixed(4)}</p>
              <p className="text-xs text-text-secondary">Lng: {current.location.longitude.toFixed(4)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${current.location.zone === 'safe' ? 'bg-success' : current.location.zone === 'monitored' ? 'bg-warning' : 'bg-danger'}`}></span>
            <span className="text-sm font-medium text-text-primary capitalize">{current.location.zone} Zone</span>
            {current.location.flagged && (
              <span className="ml-auto px-2 py-0.5 bg-red-100 text-danger text-xs font-medium rounded">FLAGGED</span>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
            <Clock size={18} />
            Recent Activity
          </h3>
          <div className="space-y-3">
            {[
              { time: '10:45 AM', event: 'Daily check-in completed', type: 'check' },
              { time: '08:30 PM', event: 'Idle alert - 45 min inactive', type: 'warning' },
              { time: '07:15 AM', event: 'Woke up, quality: 72', type: 'sleep' },
              { time: '11:30 PM', event: 'Location: Home (Safe)', type: 'location' }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <span className="text-text-secondary text-xs min-w-[60px]">{item.time}</span>
                <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                  item.type === 'check' ? 'bg-success' :
                  item.type === 'warning' ? 'bg-warning' :
                  item.type === 'sleep' ? 'bg-secondary' : 'bg-primary'
                }`}></span>
                <span className="text-text-primary">{item.event}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
            <Shield size={18} />
            Medical Verification
          </h3>
          <div className="space-y-3">
            {[
              { date: '2025-03-01', status: 'Verified', result: 'Clean' },
              { date: '2025-01-01', status: 'Verified', result: 'Clean' },
              { date: '2024-11-01', status: 'Verified', result: 'Clean' }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-text-secondary">{item.date}</span>
                <div className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-success" />
                  <span className="text-sm font-medium text-success">{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}