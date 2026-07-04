import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lightbulb, Home, Sun, CheckCircle2, ChevronRight, AlertCircle, Eye, Sparkles } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();

  const handleStartPlanning = () => {
    navigate('/planner');
  };

  return (
    <div className="min-h-screen bg-glow-beige text-glow-charcoal font-sans selection:bg-glow-gold/30">
      {/* Navbar Placeholder */}
      <nav className="w-full max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-glow-gold" />
          <span className="text-xl font-medium tracking-tight">GlowTeek</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-24 text-center">
        <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-glow-charcoal mb-6 leading-tight">
          Illuminate your space, <br className="hidden md:block" />
          <span className="text-glow-gold italic font-light">beautifully.</span>
        </h1>
        <p className="text-lg md:text-xl text-glow-charcoal/70 max-w-2xl mx-auto mb-12 font-light">
          Premium lighting recommendations tailored for Indian homes. Transform your rooms with the perfect ambience, without the guesswork.
        </p>
        <button 
          onClick={handleStartPlanning}
          className="inline-flex items-center gap-3 bg-glow-charcoal text-glow-beige px-8 py-4 rounded-full text-lg font-medium hover:bg-glow-charcoal/90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Plan My Lighting <ChevronRight className="w-5 h-5" />
        </button>
      </section>

      {/* Pain Points Section */}
      <section className="bg-glow-white py-24 px-6 rounded-t-[3rem] shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-medium mb-4">Why is lighting so hard?</h2>
            <p className="text-glow-charcoal/60 font-light text-lg">Avoid the common pitfalls that ruin a beautiful interior.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              "Too bright or too dim",
              "Harsh shadows overhead",
              "Wrong color temperatures",
              "Ignoring natural light",
              "Cluttered false ceilings"
            ].map((point, i) => (
              <div key={i} className="bg-glow-gray/50 p-6 rounded-2xl border border-glow-charcoal/5 hover:border-glow-gold/30 transition-colors">
                <AlertCircle className="w-8 h-8 text-glow-gold mb-4 opacity-80" />
                <h3 className="font-medium text-lg leading-snug">{point}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium mb-4">How it works</h2>
          <p className="text-glow-charcoal/60 font-light text-lg">Three simple steps to your perfect lighting plan.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-glow-charcoal/10 -z-10 -translate-y-12"></div>
          
          {[
            { icon: <Home />, title: "1. Tell us about your space", desc: "Share details like room type, size, and existing natural light." },
            { icon: <Eye />, title: "2. Define your desired ambience", desc: "Choose the mood you want to create—from cozy to productive." },
            { icon: <Sparkles />, title: "3. Get a tailored plan", desc: "Receive specific fixture recommendations and placement guides." }
          ].map((step, i) => (
            <div key={i} className="bg-glow-beige p-8 rounded-3xl border border-glow-gold/20 shadow-sm relative group hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-glow-white rounded-2xl flex items-center justify-center text-glow-gold shadow-sm mb-6 group-hover:scale-110 transition-transform">
                {step.icon}
              </div>
              <h3 className="text-xl font-medium mb-3">{step.title}</h3>
              <p className="text-glow-charcoal/70 font-light leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sample Recommendation Preview */}
      <section className="bg-glow-gray/30 py-24 px-6 rounded-[3rem] mx-4 md:mx-auto max-w-7xl mb-24 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-glow-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-medium mb-6">See the difference expert lighting makes.</h2>
            <p className="text-glow-charcoal/70 font-light text-lg mb-8">
              Our plans provide exact fixture types, color temperatures, and placement strategies to achieve that premium studio look.
            </p>
            <ul className="space-y-4 mb-10">
              {['Layered ambient & task lighting', 'Warm 2700K-3000K temperatures', 'Glare-free recessed options'].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 font-medium text-glow-charcoal/80">
                  <CheckCircle2 className="w-5 h-5 text-glow-gold" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="lg:w-1/2 w-full">
            <div className="bg-glow-white p-8 rounded-3xl shadow-xl border border-glow-charcoal/5 relative transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="absolute -top-4 -left-4 bg-glow-gold text-glow-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full shadow-md">Sample Plan</div>
              <h4 className="text-xl font-medium mb-2">Modern Cozy Living Room</h4>
              <p className="text-sm text-glow-charcoal/50 mb-6 border-b border-glow-gray pb-4">Standard Size • Low Daylight • No False Ceiling</p>
              
              <div className="space-y-4">
                <div className="bg-glow-beige p-4 rounded-2xl flex items-center gap-4 border border-transparent hover:border-glow-gold/20 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-glow-white flex items-center justify-center text-glow-charcoal/40 shadow-sm"><Sun className="w-6 h-6"/></div>
                  <div>
                    <h5 className="font-medium text-sm">Floor Lamp (Ambient)</h5>
                    <p className="text-xs text-glow-charcoal/60 mt-1">Warm White (2700K) • Dimmable</p>
                  </div>
                </div>
                <div className="bg-glow-beige p-4 rounded-2xl flex items-center gap-4 border border-transparent hover:border-glow-gold/20 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-glow-white flex items-center justify-center text-glow-charcoal/40 shadow-sm"><Lightbulb className="w-6 h-6"/></div>
                  <div>
                    <h5 className="font-medium text-sm">Table Lamp (Task)</h5>
                    <p className="text-xs text-glow-charcoal/60 mt-1">Soft White (3000K) • Linen Shade</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="text-center pb-32 px-6">
        <h2 className="text-3xl md:text-5xl font-medium mb-8">Ready to transform your home?</h2>
        <button 
          onClick={handleStartPlanning}
          className="inline-flex items-center gap-3 bg-glow-charcoal text-glow-beige px-10 py-5 rounded-full text-lg font-medium hover:bg-glow-charcoal/90 transition-all shadow-2xl hover:shadow-glow-charcoal/20 transform hover:-translate-y-1"
        >
          Start Planning <ChevronRight className="w-5 h-5" />
        </button>
      </section>
      
      {/* Simple Footer */}
      <footer className="text-center py-8 border-t border-glow-charcoal/10 text-glow-charcoal/40 text-sm font-light">
        <p>&copy; {new Date().getFullYear()} GlowTeek. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
