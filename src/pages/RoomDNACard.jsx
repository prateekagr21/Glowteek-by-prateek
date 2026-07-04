import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Lightbulb, ChevronRight, Sparkles } from 'lucide-react';

// Maps color temp values to a display gradient colour
const TEMP_GLOW = {
  2700: { from: '#FFF4C2', to: '#FFCF70', label: '2700K · Warm White', dot: '#F5A623' },
  3000: { from: '#FFF9E6', to: '#FFE08A', label: '3000K · Warm Neutral', dot: '#F0C040' },
  4000: { from: '#EDF6FF', to: '#B3D9FF', label: '4000K · Functional White', dot: '#6BAED6' },
};

const RoomDNACard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  // Receive data from Planner via router state
  const { userInputs, result } = location.state || {};

  // Guard: if somehow arrived here without data, redirect back
  useEffect(() => {
    if (!userInputs || !result) {
      navigate('/planner', { replace: true });
      return;
    }
    const timer = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(timer);
  }, [userInputs, result, navigate]);

  if (!userInputs || !result) return null;

  const tempKey = result.colorTempValue;
  const glow = TEMP_GLOW[tempKey] || TEMP_GLOW[3000];

  const handleSeeRecommendation = () => {
    navigate('/result', { state: { userInputs, result } });
  };

  return (
    <div
      className="min-h-screen bg-glow-beige font-sans flex flex-col selection:bg-glow-gold/30 overflow-x-hidden"
      style={{
        background: `radial-gradient(ellipse at 70% 20%, ${glow.from} 0%, #F5F0E8 60%)`,
      }}
    >
      {/* Header */}
      <header className="p-6 md:px-12 flex items-center">
        <button
          onClick={() => navigate('/planner')}
          className="w-12 h-12 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center text-glow-charcoal/60 hover:text-glow-charcoal hover:shadow-md transition-all border border-glow-charcoal/10"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 ml-4">
          <Lightbulb className="w-5 h-5 text-glow-gold" />
          <span className="text-base font-medium tracking-tight text-glow-charcoal">GlowTeek</span>
        </div>
      </header>

      {/* Main Card */}
      <main className="flex-1 flex items-center justify-center px-6 pb-20 pt-4">
        <div
          className={`w-full max-w-xl transition-all duration-700 ease-out ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {/* Eyebrow */}
          <p className="text-xs font-bold tracking-widest uppercase text-glow-gold mb-4 text-center">
            Your Room DNA
          </p>

          {/* Card */}
          <div className="bg-white/80 backdrop-blur-md rounded-[2.5rem] shadow-2xl border border-white/60 overflow-hidden">
            {/* Colour bar — represents colour temperature */}
            <div
              className="h-2 w-full"
              style={{ background: `linear-gradient(90deg, ${glow.from}, ${glow.to})` }}
            />

            <div className="p-8 md:p-12">
              {/* Room type chips */}
              <div className="flex flex-wrap gap-2 mb-8">
                {[userInputs.spaceType, userInputs.ambience, userInputs.spaceSize].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-glow-beige border border-glow-charcoal/10 text-glow-charcoal/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Profile name */}
              <h1 className="text-4xl md:text-5xl font-semibold text-glow-charcoal tracking-tight mb-4 leading-tight">
                {result.name}
              </h1>

              {/* Mood statement */}
              <p className="text-lg md:text-xl text-glow-charcoal/65 font-light leading-relaxed mb-8">
                {result.moodStatement}
              </p>

              {/* Colour temperature pill */}
              <div className="flex items-center gap-3 mb-10">
                <div
                  className="w-4 h-4 rounded-full shadow-inner"
                  style={{ background: glow.dot }}
                />
                <span className="text-sm font-medium text-glow-charcoal/70">{result.colorTemp}</span>
              </div>

              {/* Fixture preview — top 3 */}
              <div className="bg-glow-beige/60 rounded-2xl p-5 mb-10 border border-glow-charcoal/8">
                <p className="text-xs font-bold tracking-widest uppercase text-glow-charcoal/40 mb-4">
                  Key Fixtures
                </p>
                <ul className="space-y-3">
                  {(result.fixtures || result.baseFixtures || []).slice(0, 3).map((fixture, i) => {
                    const name = typeof fixture === 'string' ? fixture : fixture.name;
                    const flagged = fixture.flagged;
                    return (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-glow-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Sparkles className="w-3 h-3 text-glow-gold" />
                        </div>
                        <div>
                          <span
                            className={`text-sm font-medium ${
                              flagged ? 'text-glow-charcoal/40 line-through' : 'text-glow-charcoal'
                            }`}
                          >
                            {name}
                          </span>
                          {flagged && (
                            <p className="text-xs text-amber-600/80 mt-0.5">{fixture.note}</p>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* CTA */}
              <button
                id="see-recommendation-btn"
                onClick={handleSeeRecommendation}
                className="w-full flex items-center justify-center gap-3 bg-glow-charcoal text-glow-beige px-8 py-5 rounded-full text-lg font-medium hover:bg-glow-charcoal/90 transition-all shadow-xl hover:shadow-glow-charcoal/20 transform hover:-translate-y-1"
              >
                See My Recommendation <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Sub-hint */}
          <p className="text-center text-xs text-glow-charcoal/40 mt-6 font-light">
            Full placement guide, colour temperatures &amp; execution checklist inside
          </p>
        </div>
      </main>
    </div>
  );
};

export default RoomDNACard;
