import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ChevronRight } from 'lucide-react';
import { getRecommendation } from '../data/recommendationEngine';

const steps = [
  {
    id: 'spaceType',
    title: 'What space are we lighting?',
    options: [
      { value: 'Living Room', label: 'Living Room', desc: 'The heart of your home' },
      { value: 'Bedroom', label: 'Bedroom', desc: 'Your personal sanctuary' },
      { value: 'Dining', label: 'Dining', desc: 'Where conversations happen' },
      { value: 'Kitchen', label: 'Kitchen', desc: 'The culinary workspace' },
      { value: 'Puja Room', label: 'Puja Room', desc: 'Space for devotion and peace' }
    ]
  },
  {
    id: 'spaceSize',
    title: 'How large is this space?',
    options: [
      { value: 'Compact', label: 'Compact', desc: 'Cozy and intimate (Under 150 sq.ft)' },
      { value: 'Standard', label: 'Standard', desc: 'Average room size (150-300 sq.ft)' },
      { value: 'Spacious', label: 'Spacious', desc: 'Large and open (Over 300 sq.ft)' }
    ]
  },
  {
    id: 'naturalLight',
    title: 'How much natural light does it get?',
    options: [
      { value: 'Low Daylight', label: 'Low Daylight', desc: 'Small windows, mostly shaded' },
      { value: 'Moderate Daylight', label: 'Moderate Daylight', desc: 'Average window size, some direct sun' },
      { value: 'Bright Daylight', label: 'Bright Daylight', desc: 'Large windows, abundant sunshine' }
    ]
  },
  {
    id: 'ambience',
    title: 'What ambience do you desire?',
    options: [
      { value: 'Minimal & Soft', label: 'Minimal & Soft', desc: 'Clean, diffused, and understated' },
      { value: 'Productive & Focused', label: 'Productive & Focused', desc: 'Bright, alert, and functional' },
      { value: 'Cozy & Warm', label: 'Cozy & Warm', desc: 'Intimate, golden, and relaxing' },
      { value: 'Modern & Bright', label: 'Modern & Bright', desc: 'Vibrant, clear, and energetic' },
      { value: 'Luxury Hotel Feel', label: 'Luxury Hotel Feel', desc: 'Layered, dramatic, and premium' }
    ]
  },
  {
    id: 'falseCeiling',
    title: 'Do you have a false ceiling?',
    options: [
      { value: 'Existing False Ceiling', label: 'Yes, I have one', desc: 'Allows for recessed spotlights/cove lighting' },
      { value: 'No False Ceiling', label: 'No false ceiling', desc: 'Standard ceiling, requires surface fixtures' }
    ]
  }
];

const Planner = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [userInputs, setUserInputs] = useState({
    spaceType: '',
    spaceSize: '',
    naturalLight: '',
    ambience: '',
    falseCeiling: ''
  });
  const [animateState, setAnimateState] = useState('enter'); // 'enter', 'idle', 'exit'

  const activeStep = steps[currentStep];

  const handleSelect = (value) => {
    setUserInputs(prev => ({ ...prev, [activeStep.id]: value }));
  };

  const handleNext = () => {
    if (!userInputs[activeStep.id]) return;

    if (currentStep < steps.length - 1) {
      setAnimateState('exit');
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setAnimateState('enter');
      }, 300);
    } else {
      // Final step — call engine and navigate to Room DNA Card
      const finalInputs = { ...userInputs, [activeStep.id]: userInputs[activeStep.id] };
      const result = getRecommendation(finalInputs);
      setAnimateState('exit');
      setTimeout(() => {
        navigate('/room-dna', { state: { userInputs: finalInputs, result } });
      }, 300);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setAnimateState('exit');
      setTimeout(() => {
        setCurrentStep(prev => prev - 1);
        setAnimateState('enter');
      }, 300);
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    if (animateState === 'enter') {
      const timer = setTimeout(() => setAnimateState('idle'), 50);
      return () => clearTimeout(timer);
    }
  }, [animateState, currentStep]);


  const animationClass = 
    animateState === 'enter' ? 'opacity-0 translate-y-8' :
    animateState === 'exit' ? 'opacity-0 -translate-y-8' :
    'opacity-100 translate-y-0';

  return (
    <div className="min-h-screen bg-glow-beige font-sans flex flex-col selection:bg-glow-gold/30 overflow-x-hidden">
      {/* Header */}
      <header className="p-6 md:px-12 flex justify-between items-center z-10">
        <button 
          onClick={handleBack}
          className="w-12 h-12 bg-glow-white rounded-full flex items-center justify-center text-glow-charcoal/60 hover:text-glow-charcoal hover:shadow-md transition-all border border-glow-charcoal/5"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        
        {/* Progress Bar Container */}
        <div className="flex-1 max-w-xs mx-auto text-center hidden md:block">
          <div className="text-xs font-bold tracking-widest uppercase text-glow-gold mb-3">
            Step {currentStep + 1} of {steps.length}
          </div>
          <div className="h-1.5 w-full bg-glow-gray rounded-full overflow-hidden">
            <div 
              className="h-full bg-glow-gold transition-all duration-500 ease-out rounded-full"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="w-12 h-12"></div> {/* Spacer to center progress */}
      </header>

      {/* Mobile Progress (Visible only on small screens) */}
      <div className="md:hidden px-6 pb-6">
         <div className="text-xs font-bold tracking-widest uppercase text-glow-gold mb-2 text-center">
            Step {currentStep + 1} of {steps.length}
          </div>
          <div className="h-1.5 w-full bg-glow-gray rounded-full overflow-hidden">
            <div 
              className="h-full bg-glow-gold transition-all duration-500 ease-out rounded-full"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center max-w-4xl mx-auto w-full px-6 pb-24 relative">
        
        <div className={`w-full transition-all duration-500 ease-in-out ${animationClass}`}>
          <h1 className="text-3xl md:text-5xl font-medium text-center text-glow-charcoal mb-12 md:mb-16 tracking-tight">
            {activeStep.title}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 justify-center">
            {activeStep.options.map((option, idx) => {
              const isSelected = userInputs[activeStep.id] === option.value;
              return (
                <div 
                  key={idx}
                  onClick={() => handleSelect(option.value)}
                  className={`
                    relative cursor-pointer rounded-[2rem] p-6 md:p-8 transition-all duration-300
                    flex flex-col items-start text-left border-2
                    ${isSelected 
                      ? 'bg-glow-white border-glow-gold shadow-lg transform -translate-y-1' 
                      : 'bg-glow-white/50 border-transparent hover:bg-glow-white hover:shadow-md hover:-translate-y-1'
                    }
                  `}
                >
                  {/* Selection Indicator */}
                  <div className={`absolute top-6 right-6 transition-opacity duration-300 ${isSelected ? 'opacity-100' : 'opacity-0'}`}>
                    <CheckCircle2 className="w-6 h-6 text-glow-gold fill-glow-gold/20" />
                  </div>

                  <h3 className={`text-xl font-medium mb-3 transition-colors ${isSelected ? 'text-glow-charcoal' : 'text-glow-charcoal/80'}`}>
                    {option.label}
                  </h3>
                  <p className="text-glow-charcoal/60 font-light text-sm leading-relaxed mt-auto">
                    {option.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Next Button Sticky Footer */}
        <div className={`fixed bottom-8 left-0 right-0 flex justify-center z-20 px-6 transition-all duration-300 ${userInputs[activeStep.id] && animateState === 'idle' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
          <button 
            onClick={handleNext}
            className="flex items-center gap-3 bg-glow-charcoal text-glow-beige px-10 py-5 rounded-full text-lg font-medium hover:bg-glow-charcoal/90 transition-all shadow-2xl hover:shadow-glow-charcoal/30 transform hover:-translate-y-1"
          >
            {currentStep === steps.length - 1 ? 'See Recommendations' : 'Continue'} <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </main>
    </div>
  );
};

export default Planner;
