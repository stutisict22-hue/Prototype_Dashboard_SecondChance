import { useState } from 'react';
import { CheckCircle, Mic, MicOff } from 'lucide-react';
import { candidateCheckIn } from '../../data/mockData';

function getMoodEmoji(score: number): string {
  if (score <= 3) return '😔';
  if (score <= 6) return '😐';
  return '😊';
}

function getMoodLabel(score: number): string {
  if (score <= 2) return 'Very low';
  if (score <= 4) return 'Not great';
  if (score <= 6) return 'Okay';
  if (score <= 8) return 'Pretty good';
  return 'Feeling great';
}

export default function CheckIn() {
  const [completed, setCompleted] = useState(candidateCheckIn.completed);
  const [moodScore, setMoodScore] = useState(5);
  const [submittedScore, setSubmittedScore] = useState(candidateCheckIn.moodScore);
  const [note, setNote] = useState('');
  const [recording, setRecording] = useState(false);

  function handleSubmit() {
    setSubmittedScore(moodScore);
    setCompleted(true);
  }

  if (completed) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm p-8 flex flex-col items-center text-center w-full max-w-md">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
            <CheckCircle size={36} className="text-emerald-500" />
          </div>
          <h2 className="text-xl font-bold text-text-primary mb-1">You're all done!</h2>
          <p className="text-text-secondary text-sm mb-4">Check-in complete for today. See you tomorrow.</p>
          <div className="flex items-center gap-2 bg-emerald-50 rounded-xl px-4 py-2">
            <span className="text-2xl">{getMoodEmoji(submittedScore || moodScore)}</span>
            <div>
              <p className="text-xs text-text-secondary">Today's mood</p>
              <p className="font-bold text-emerald-700 text-sm">{submittedScore || moodScore} / 10 — {getMoodLabel(submittedScore || moodScore)}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary">How are you feeling today?</h1>
        <p className="text-text-secondary text-sm mt-1">Take a moment to check in with yourself.</p>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6 mb-4">
        <p className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-4">Mood</p>
        <div className="flex flex-col items-center gap-3">
          <span className="text-5xl">{getMoodEmoji(moodScore)}</span>
          <p className="text-base font-semibold text-text-primary">{getMoodLabel(moodScore)}</p>
          <div className="w-full flex items-center gap-3">
            <span className="text-xs text-text-secondary">1</span>
            <input
              type="range"
              min={1}
              max={10}
              value={moodScore}
              onChange={(e) => setMoodScore(Number(e.target.value))}
              className="flex-1 h-2 rounded-full accent-emerald-500 cursor-pointer"
            />
            <span className="text-xs text-text-secondary">10</span>
          </div>
          <p className="text-emerald-600 font-bold text-lg">{moodScore} / 10</p>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6 mb-4">
        <p className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-3">Voice Note</p>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setRecording((r) => !r)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              recording
                ? 'bg-red-100 text-red-500 animate-pulse'
                : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
            }`}
          >
            {recording ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
          <p className="text-sm text-text-secondary">
            {recording ? (
              <span className="text-red-500 font-medium">Recording... tap to stop</span>
            ) : (
              'Tap to record a voice note (optional)'
            )}
          </p>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6 mb-6">
        <p className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-3">Notes</p>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Anything you'd like to share?"
          rows={4}
          className="w-full text-sm text-text-primary placeholder-slate-400 border border-slate-200 rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-300"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-bold text-base rounded-2xl transition-colors shadow-sm"
      >
        Submit Check-In
      </button>
    </div>
  );
}
