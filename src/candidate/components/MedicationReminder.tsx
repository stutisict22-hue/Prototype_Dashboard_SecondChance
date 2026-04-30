import { useState } from 'react';
import { Pill, Check } from 'lucide-react';
import { MedicationReminder as MedicationReminderType } from '../../data/types';

interface MedicationReminderProps {
  medications: MedicationReminderType[];
}

export default function MedicationReminder({ medications }: MedicationReminderProps) {
  const [taken, setTaken] = useState<Record<string, boolean>>(
    Object.fromEntries(medications.map((m) => [m.name, m.taken]))
  );

  return (
    <div className="flex flex-col gap-3">
      {medications.map((med) => (
        <div
          key={med.name}
          className="flex items-center justify-between bg-white border border-slate-100 rounded-2xl px-4 py-3 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
              <Pill size={18} className="text-emerald-600" />
            </div>
            <div>
              <p className="font-semibold text-text-primary text-sm">{med.name}</p>
              <p className="text-xs text-text-secondary">{med.dosage} · {med.time}</p>
            </div>
          </div>

          {taken[med.name] ? (
            <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-semibold">
              <Check size={16} />
              <span>Taken</span>
            </div>
          ) : (
            <button
              onClick={() => setTaken((prev) => ({ ...prev, [med.name]: true }))}
              className="text-xs font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors px-3 py-1.5 rounded-full"
            >
              Mark Taken
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
