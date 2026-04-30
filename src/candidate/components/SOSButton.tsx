import { useState } from 'react';
import { AlertTriangle, Check } from 'lucide-react';

interface SOSButtonProps {
  workerName?: string;
}

export default function SOSButton({ workerName = 'Priya Suresh' }: SOSButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [sent, setSent] = useState(false);

  function handleConfirm() {
    setSent(true);
  }

  function handleClose() {
    setShowModal(false);
    setSent(false);
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-bold text-base py-4 rounded-2xl shadow-md transition-colors"
      >
        <AlertTriangle size={20} />
        SOS — Emergency Alert
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm">
            {!sent ? (
              <>
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-100 mx-auto mb-4">
                  <AlertTriangle size={28} className="text-red-500" />
                </div>
                <h3 className="text-text-primary font-bold text-lg text-center mb-2">Send Emergency Alert?</h3>
                <p className="text-text-secondary text-sm text-center mb-6">
                  Send emergency alert to <span className="font-semibold text-text-primary">{workerName}</span> and share your location?
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleClose}
                    className="flex-1 py-2.5 rounded-xl border border-slate-200 text-text-primary font-semibold text-sm hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold text-sm transition-colors"
                  >
                    Confirm
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 mx-auto mb-4">
                  <Check size={28} className="text-emerald-600" />
                </div>
                <h3 className="text-text-primary font-bold text-lg text-center mb-2">Alert Sent!</h3>
                <p className="text-text-secondary text-sm text-center mb-6">
                  <span className="font-semibold text-emerald-600">{workerName}</span> has been notified.
                </p>
                <button
                  onClick={handleClose}
                  className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm transition-colors"
                >
                  Done
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
