import React, { useState } from 'react';
import { logFeedback } from '../utils/logFeedback';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

export default function FeedbackWidget({ userInputs, recommendationName }) {
  const [phase, setPhase] = useState('idle'); // 'idle' | 'thumbs_down_followup' | 'submitted'
  const [selectedReason, setSelectedReason] = useState(null);

  const handleThumbsUp = () => {
    logFeedback({ rating: 'thumbs_up', userInputs, recommendationName });
    setPhase('submitted');
  };

  const handleThumbsDown = () => {
    setPhase('thumbs_down_followup');
  };

  const handleSubmitFollowUp = () => {
    if (!selectedReason) return;
    logFeedback({ rating: 'thumbs_down', followUpReason: selectedReason, userInputs, recommendationName });
    setPhase('submitted');
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-12 bg-glow-white rounded-3xl p-7 border border-glow-charcoal/8 shadow-sm text-glow-charcoal transition-all duration-300">
      {phase === 'idle' && (
        <div className="flex flex-col items-center text-center gap-5">
          <p className="text-xs font-bold tracking-widest uppercase text-glow-gold">Your Feedback</p>
          <h3 className="text-base font-medium text-glow-charcoal">Was this recommendation right for your room?</h3>
          <div className="flex gap-3 w-full sm:w-auto">
            <button
              onClick={handleThumbsUp}
              className="flex-1 sm:flex-none px-5 py-3 bg-glow-beige border border-glow-charcoal/10 rounded-2xl text-sm font-medium hover:border-glow-gold/40 hover:shadow-sm transition-all flex items-center justify-center gap-2 text-glow-charcoal"
            >
              <ThumbsUp className="w-4 h-4 text-glow-gold" /> Yes, this works
            </button>
            <button
              onClick={handleThumbsDown}
              className="flex-1 sm:flex-none px-5 py-3 bg-glow-beige border border-glow-charcoal/10 rounded-2xl text-sm font-medium hover:border-glow-charcoal/30 hover:shadow-sm transition-all flex items-center justify-center gap-2 text-glow-charcoal"
            >
              <ThumbsDown className="w-4 h-4 text-glow-charcoal/50" /> Not quite
            </button>
          </div>
        </div>
      )}

      {phase === 'thumbs_down_followup' && (
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-glow-gold mb-2">Help us improve</p>
            <h3 className="text-base font-medium text-glow-charcoal">What didn't feel right?</h3>
            <p className="text-sm text-glow-charcoal/50 mt-1">Pick one — it helps us get better.</p>
          </div>

          <div className="flex flex-col gap-2">
            {[
              { value: 'mismatch', label: "The recommendation didn't match my room feel" },
              { value: 'budget', label: "The fixtures seem too expensive / out of budget" },
              { value: 'options', label: "I wanted more options to choose from" }
            ].map((option) => (
              <label
                key={option.value}
                className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedReason === option.value
                    ? 'bg-glow-charcoal text-glow-beige border-glow-charcoal'
                    : 'bg-glow-beige border-glow-charcoal/10 hover:border-glow-charcoal/30'
                }`}
              >
                <input
                  type="radio"
                  name="feedback_reason"
                  value={option.value}
                  checked={selectedReason === option.value}
                  onChange={() => setSelectedReason(option.value)}
                  className="sr-only"
                />
                <span className="text-sm font-medium leading-tight select-none mt-0.5">{option.label}</span>
              </label>
            ))}
          </div>

          <button
            onClick={handleSubmitFollowUp}
            disabled={!selectedReason}
            className={`w-full py-3.5 rounded-2xl text-sm font-medium transition-all ${
              selectedReason
                ? 'bg-glow-charcoal text-glow-beige hover:bg-glow-charcoal/90 shadow-md'
                : 'bg-glow-gray text-glow-charcoal/30 cursor-not-allowed'
            }`}
          >
            Send Feedback
          </button>
        </div>
      )}

      {phase === 'submitted' && (
        <div className="flex flex-col items-center justify-center text-center py-6 gap-3">
          <div className="w-12 h-12 bg-glow-gold/15 text-glow-gold rounded-full flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-sm font-medium text-glow-charcoal">Thanks — that helps us improve.</p>
          <p className="text-xs text-glow-charcoal/40 font-light">We read every piece of feedback.</p>
        </div>
      )}
    </div>
  );
}
