import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  Lightbulb,
  Sparkles,
  AlertTriangle,
  ChevronRight,
  ListChecks,
  Thermometer,
  MapPin,
} from 'lucide-react';
import { buildWhyText } from '../data/recommendationEngine';
import ExecutionChecklist from '../components/ExecutionChecklist';
import FeedbackWidget from '../components/FeedbackWidget';

const TEMP_BADGE = {
  2700: { bg: '#FFF4C2', text: '#B5860D', label: '2700K · Warm White ✨' },
  3000: { bg: '#FFF9E6', text: '#A07800', label: '3000K · Warm Neutral ☀️' },
  4000: { bg: '#EDF6FF', text: '#2B6CB0', label: '4000K · Functional White 💡' },
};

const ResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [checklistOpen, setChecklistOpen] = useState(false);

  // Data from router state (passed from RoomDNACard)
  const { userInputs, result } = location.state || {};

  useEffect(() => {
    if (!userInputs || !result) {
      navigate('/planner', { replace: true });
      return;
    }
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, [userInputs, result, navigate]);

  if (!userInputs || !result) return null;

  // Build explanatory paragraph via the engine's assembler
  const whyText = buildWhyText(userInputs, result);

  const tempBadge = TEMP_BADGE[result.colorTempValue] || TEMP_BADGE[3000];
  const fixtures = result.fixtures || result.baseFixtures || [];

  return (
    <div className="min-h-screen bg-glow-beige font-sans selection:bg-glow-gold/30">
      {/* Sticky Header */}
      <header className="sticky top-0 z-30 bg-glow-beige/80 backdrop-blur-md border-b border-glow-charcoal/8 px-6 md:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/room-dna', { state: { userInputs, result } })}
            className="w-10 h-10 bg-glow-white rounded-full flex items-center justify-center text-glow-charcoal/60 hover:text-glow-charcoal hover:shadow-md transition-all border border-glow-charcoal/8"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-glow-gold" />
            <span className="text-sm font-medium tracking-tight text-glow-charcoal">GlowTeek</span>
          </div>
        </div>

        {/* Execution Checklist trigger */}
        <button
          id="open-checklist-btn"
          onClick={() => setChecklistOpen(true)}
          className="flex items-center gap-2 bg-glow-charcoal text-glow-beige px-5 py-2.5 rounded-full text-sm font-medium hover:bg-glow-charcoal/90 transition-all shadow-md"
        >
          <ListChecks className="w-4 h-4" />
          Execution Plan
        </button>
      </header>

      {/* Main content */}
      <main
        className={`max-w-3xl mx-auto px-6 py-12 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Breadcrumb tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[userInputs.spaceType, userInputs.ambience, userInputs.spaceSize, userInputs.naturalLight, userInputs.falseCeiling].map(
            (tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-medium bg-glow-white border border-glow-charcoal/10 text-glow-charcoal/60"
              >
                {tag}
              </span>
            )
          )}
        </div>

        {/* Title section */}
        <div className="mb-10">
          <p className="text-xs font-bold tracking-widest uppercase text-glow-gold mb-3">
            Your Lighting Blueprint
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-glow-charcoal tracking-tight mb-4 leading-tight">
            {result.name}
          </h1>
          <p className="text-xl text-glow-charcoal/60 font-light leading-relaxed">
            {result.moodStatement}
          </p>
        </div>

        {/* Colour temperature badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-10 border"
          style={{ background: tempBadge.bg, color: tempBadge.text, borderColor: tempBadge.text + '33' }}
        >
          <Thermometer className="w-4 h-4" />
          <span className="text-sm font-medium">{result.colorTemp}</span>
        </div>

        {/* ─── WHY THIS WORKS ─────────────────────────── */}
        <section className="mb-10 bg-glow-white rounded-3xl p-8 border border-glow-charcoal/8 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <Sparkles className="w-5 h-5 text-glow-gold" />
            <h2 className="text-lg font-semibold text-glow-charcoal">Why This Works</h2>
          </div>
          <p className="text-glow-charcoal/70 leading-relaxed font-light">{whyText}</p>

          {/* Color temp shift note if applicable */}
          {result.colorTempShiftNote && (
            <div className="mt-4 bg-glow-beige/70 rounded-xl p-4 border border-glow-gold/20">
              <p className="text-sm text-glow-charcoal/70 italic">{result.colorTempShiftNote}</p>
            </div>
          )}
        </section>

        {/* ─── LIGHTING STYLE ─────────────────────────── */}
        <section className="mb-10 bg-glow-white rounded-3xl p-8 border border-glow-charcoal/8 shadow-sm">
          <h2 className="text-lg font-semibold text-glow-charcoal mb-4">Lighting Style</h2>
          <p className="text-glow-charcoal/70 leading-relaxed font-light">{result.lightingStyle}</p>
        </section>

        {/* ─── FIXTURES ───────────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-glow-charcoal mb-5">Recommended Fixtures</h2>
          <ul className="space-y-3">
            {fixtures.map((fixture, i) => {
              const name = typeof fixture === 'string' ? fixture : fixture.name;
              const flagged = fixture?.flagged;
              return (
                <li
                  key={i}
                  className={`flex items-start gap-4 bg-glow-white rounded-2xl p-5 border transition-colors ${
                    flagged ? 'border-amber-200 opacity-70' : 'border-glow-charcoal/8 hover:border-glow-gold/30'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      flagged ? 'bg-amber-100' : 'bg-glow-gold/15'
                    }`}
                  >
                    {flagged ? (
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                    ) : (
                      <Sparkles className="w-4 h-4 text-glow-gold" />
                    )}
                  </div>
                  <div>
                    <p
                      className={`text-sm font-medium ${
                        flagged ? 'line-through text-glow-charcoal/50' : 'text-glow-charcoal'
                      }`}
                    >
                      {name}
                    </p>
                    {fixture?.note && (
                      <p className="text-xs text-amber-600/80 mt-1">{fixture.note}</p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        {/* ─── PLACEMENT GUIDE ────────────────────────── */}
        <section className="mb-10 bg-glow-white rounded-3xl p-8 border border-glow-charcoal/8 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <MapPin className="w-5 h-5 text-glow-gold" />
            <h2 className="text-lg font-semibold text-glow-charcoal">Placement Guide</h2>
          </div>
          <p className="text-glow-charcoal/70 leading-relaxed font-light">
            {result.placementNote || result.placement}
          </p>
          {result.spaceNote && (
            <div className="mt-5 bg-glow-beige/70 rounded-xl p-4 border border-glow-charcoal/8">
              <p className="text-sm text-glow-charcoal/70">{result.spaceNote}</p>
            </div>
          )}
        </section>

        {/* ─── COMMON MISTAKES ────────────────────────── */}
        {result.mistakes && result.mistakes.length > 0 && (
          <section className="mb-10 bg-glow-white rounded-3xl p-8 border border-glow-charcoal/8 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <h2 className="text-lg font-semibold text-glow-charcoal">Avoid These Mistakes</h2>
            </div>
            <ul className="space-y-3">
              {result.mistakes.map((mistake, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-amber-400 mt-0.5 flex-shrink-0">✕</span>
                  <p className="text-sm text-glow-charcoal/70 font-light">{mistake}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ─── PRO TIP ────────────────────────────────── */}
        {result.proTip && (
          <section className="mb-10 bg-glow-gold/10 rounded-3xl p-8 border border-glow-gold/25">
            <p className="text-xs font-bold tracking-widest uppercase text-glow-gold mb-3">
              Pro Tip
            </p>
            <p className="text-glow-charcoal/80 leading-relaxed font-light">{result.proTip}</p>
          </section>
        )}

        {/* ─── EXECUTION PLAN CTA ─────────────────────── */}
        <div className="mb-10 bg-glow-charcoal rounded-3xl p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-lg font-semibold text-glow-beige mb-1">Ready to execute?</h2>
            <p className="text-sm text-glow-beige/60 font-light">
              Open the step-by-step checklist to track your project.
            </p>
          </div>
          <button
            onClick={() => setChecklistOpen(true)}
            className="flex items-center gap-2 bg-glow-gold text-glow-charcoal px-6 py-3 rounded-full font-medium hover:bg-glow-gold/90 transition-all shadow-lg flex-shrink-0"
          >
            Open Checklist <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* ─── FEEDBACK WIDGET ────────────────────────── */}
        <div id="feedback-section">
          <FeedbackWidget
            userInputs={userInputs}
            recommendationName={result.name}
          />
        </div>

        {/* Return home */}
        <div className="text-center mt-12 pb-4">
          <button
            onClick={() => navigate('/')}
            className="text-sm text-glow-charcoal/40 hover:text-glow-charcoal transition-colors underline underline-offset-4"
          >
            ← Back to GlowTeek Home
          </button>
        </div>
      </main>

      {/* Execution Checklist slide-in panel */}
      <ExecutionChecklist
        result={result}
        userInputs={userInputs}
        isOpen={checklistOpen}
        onClose={() => setChecklistOpen(false)}
      />
    </div>
  );
};

export default ResultPage;
