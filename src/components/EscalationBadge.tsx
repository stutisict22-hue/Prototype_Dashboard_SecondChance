interface EscalationBadgeProps {
  step: 0 | 1 | 2 | 3;
}

const STEPS = ['SW', 'Doctor', 'Excise'];

export default function EscalationBadge({ step }: EscalationBadgeProps) {
  return (
    <div className="flex items-center gap-1">
      {STEPS.map((label, i) => {
        const filled = i < step;
        const active = i === step - 1;
        return (
          <div key={label} className="flex flex-col items-center">
            <div className="flex items-center">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                filled
                  ? active
                    ? 'bg-primary border-primary text-white'
                    : 'bg-success border-success text-white'
                  : 'bg-white border-gray-300 text-gray-400'
              }`}>
                {i + 1}
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-6 h-0.5 ${i < step - 1 ? 'bg-success' : 'bg-gray-200'}`} />
              )}
            </div>
            <span className={`text-xs mt-1 ${filled ? 'text-text-primary font-medium' : 'text-text-secondary'}`}>
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
