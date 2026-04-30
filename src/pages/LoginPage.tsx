import { AppRole } from '../data/types';
import { Heart, Shield, Building2, ArrowRight } from 'lucide-react';

interface LoginPageProps {
  onSelectRole: (role: AppRole) => void;
}

const roles = [
  {
    role: 'candidate' as AppRole,
    title: 'Candidate Portal',
    subtitle: 'Your personal recovery dashboard',
    description: 'View your vitals, track progress, raise support tickets and connect with your care team.',
    icon: Heart,
    accent: 'from-emerald-500 to-teal-600',
    border: 'border-emerald-200 hover:border-emerald-400',
    badge: 'bg-emerald-100 text-emerald-700',
    demoUser: 'Demo: Vineeth Thomas (SC-003)',
  },
  {
    role: 'social_worker' as AppRole,
    title: 'Care Team Dashboard',
    subtitle: 'Social Worker / Doctor view',
    description: 'Monitor all participants, respond to alerts, manage tickets and coordinate care.',
    icon: Shield,
    accent: 'from-blue-500 to-indigo-600',
    border: 'border-blue-200 hover:border-blue-400',
    badge: 'bg-blue-100 text-blue-700',
    demoUser: 'Demo: Priya Suresh (Social Worker)',
  },
  {
    role: 'government' as AppRole,
    title: 'Excise Department',
    subtitle: 'Government oversight portal',
    description: 'Statewide metrics, district heatmaps, read-only candidate records and bulk reporting.',
    icon: Building2,
    accent: 'from-slate-600 to-slate-800',
    border: 'border-slate-200 hover:border-slate-400',
    badge: 'bg-slate-100 text-slate-700',
    demoUser: 'Demo: Kerala Excise Officer',
  },
];

export default function LoginPage({ onSelectRole }: LoginPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col items-center justify-center p-6">
      {/* Brand header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl shadow-lg mb-4">
          <span className="text-white font-bold text-2xl">SC</span>
        </div>
        <h1 className="text-3xl font-bold text-text-primary">Second Chance</h1>
        <p className="text-text-secondary mt-1 text-base">Empowering Recovery — Kerala State Program</p>
      </div>

      <p className="text-sm text-text-secondary mb-8 font-medium uppercase tracking-widest">Select your role to continue</p>

      {/* Role cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-4xl">
        {roles.map(({ role, title, subtitle, description, icon: Icon, accent, border, badge, demoUser }) => (
          <button
            key={role}
            onClick={() => onSelectRole(role)}
            className={`group relative bg-white rounded-2xl border-2 ${border} p-6 text-left transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
          >
            {/* Icon */}
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${accent} text-white mb-4 shadow-md`}>
              <Icon size={22} />
            </div>

            <h2 className="font-bold text-text-primary text-lg leading-tight">{title}</h2>
            <p className={`text-xs font-semibold mt-0.5 mb-3 px-2 py-0.5 rounded-full inline-block ${badge}`}>{subtitle}</p>
            <p className="text-sm text-text-secondary leading-relaxed mb-5">{description}</p>

            {/* Demo tag */}
            <p className="text-xs text-text-secondary italic mb-4">{demoUser}</p>

            <div className="flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
              Enter Dashboard
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        ))}
      </div>

      <p className="mt-10 text-xs text-text-secondary text-center max-w-sm">
        This is a prototype for demonstration purposes. No real patient data is used.
        All data shown is simulated for the Second Chance pilot program.
      </p>
    </div>
  );
}
