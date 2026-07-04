import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Circle } from 'lucide-react';

/**
 * ExecutionChecklist
 * Props:
 *   result      – the recommendation result object from the engine
 *   userInputs  – the collected user inputs
 *   isOpen      – boolean controlling slide-in visibility
 *   onClose     – function to close the panel
 */
const ExecutionChecklist = ({ result, userInputs, isOpen, onClose }) => {
  const [checked, setChecked] = useState({});

  // Build checklist items from result data
  const fixtures = result?.fixtures || result?.baseFixtures || [];
  const allItems = [
    ...fixtures.map((f, i) => ({
      id: `fixture-${i}`,
      category: 'Fixtures to Source',
      label: typeof f === 'string' ? f : f.name,
      flagged: f?.flagged,
      note: f?.note,
    })),
    {
      id: 'placement',
      category: 'Placement',
      label: result?.placementNote || result?.placement,
      isLong: true,
    },
    ...(result?.spaceNote
      ? [{ id: 'space-note', category: 'Space Tip', label: result.spaceNote }]
      : []),
    ...(result?.naturalLightNote
      ? [{ id: 'daylight', category: 'Daylight Note', label: result.naturalLightNote }]
      : []),
    ...(result?.mistakes || []).map((m, i) => ({
      id: `mistake-${i}`,
      category: 'Avoid These Mistakes',
      label: m,
    })),
    ...(result?.proTip
      ? [{ id: 'protip', category: 'Pro Tip', label: result.proTip }]
      : []),
  ];

  // Group by category
  const grouped = allItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const toggleCheck = (id) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const totalCheckable = allItems.filter((i) => !i.isLong).length;
  const totalChecked = Object.values(checked).filter(Boolean).length;
  const progress = totalCheckable > 0 ? Math.round((totalChecked / totalCheckable) * 100) : 0;

  // Prevent body scroll when panel is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-glow-charcoal/30 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Slide-in Panel */}
      <div
        className={`fixed bottom-0 right-0 z-50 h-full max-h-screen w-full md:w-[480px] bg-glow-white shadow-2xl flex flex-col transition-transform duration-500 ease-out ${
          isOpen
            ? 'translate-y-0 md:translate-y-0 md:translate-x-0'
            : 'translate-y-full md:translate-y-0 md:translate-x-full'
        }`}
        style={{ borderRadius: '2rem 2rem 0 0', borderTopRightRadius: '0', borderTopLeftRadius: '2rem' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-glow-charcoal/10 flex-shrink-0">
          <div>
            <h2 className="text-lg font-semibold text-glow-charcoal">Execution Checklist</h2>
            <p className="text-sm text-glow-charcoal/50 mt-0.5">
              {progress}% complete · {totalChecked}/{totalCheckable} items
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-glow-gray flex items-center justify-center text-glow-charcoal/60 hover:bg-glow-charcoal/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-glow-gray flex-shrink-0">
          <div
            className="h-full bg-glow-gold transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {Object.entries(grouped).map(([category, items]) => (
            <section key={category}>
              <p className="text-xs font-bold tracking-widest uppercase text-glow-charcoal/40 mb-3">
                {category}
              </p>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.id}>
                    {item.isLong ? (
                      // Non-checkable long text (placement)
                      <div className="bg-glow-beige/60 rounded-xl p-4 border border-glow-charcoal/8">
                        <p className="text-sm text-glow-charcoal/80 leading-relaxed">{item.label}</p>
                      </div>
                    ) : (
                      <button
                        onClick={() => !item.flagged && toggleCheck(item.id)}
                        className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-colors ${
                          item.flagged
                            ? 'opacity-50 cursor-not-allowed'
                            : checked[item.id]
                            ? 'bg-glow-gold/10 border border-glow-gold/30'
                            : 'hover:bg-glow-gray/60 border border-transparent'
                        }`}
                        disabled={!!item.flagged}
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          {checked[item.id] ? (
                            <CheckCircle2 className="w-5 h-5 text-glow-gold fill-glow-gold/20" />
                          ) : (
                            <Circle className="w-5 h-5 text-glow-charcoal/25" />
                          )}
                        </div>
                        <div>
                          <span
                            className={`text-sm font-medium leading-snug ${
                              checked[item.id]
                                ? 'line-through text-glow-charcoal/40'
                                : item.flagged
                                ? 'line-through text-glow-charcoal/40'
                                : 'text-glow-charcoal'
                            }`}
                          >
                            {item.label}
                          </span>
                          {item.note && (
                            <p className="text-xs text-amber-600/80 mt-1">{item.note}</p>
                          )}
                        </div>
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}

          {/* Done message */}
          {progress === 100 && (
            <div className="bg-glow-gold/10 border border-glow-gold/30 rounded-2xl p-5 text-center">
              <p className="text-sm font-medium text-glow-charcoal">
                🎉 All done! Your space is ready to glow.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ExecutionChecklist;
