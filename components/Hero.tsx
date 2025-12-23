import React, { useState, useEffect } from 'react';
import { Linkedin } from 'lucide-react';

// Simple X (Twitter) Logo Component
const XIcon = ({ className }: { className?: string }) => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={className}>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
  </svg>
);

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // --- Auto-Scroll Logic ---
  useEffect(() => {
    // If on slide 1 (Bio), wait 15 seconds. Otherwise (Home), wait 5 seconds.
    const duration = currentSlide === 1 ? 15000 : 5000;

    const slideTimer = setTimeout(() => {
      setCurrentSlide(prev => (prev === 0 ? 1 : 0));
    }, duration);

    // Cleanup: Reset timer on unmount or when slide changes manually
    return () => clearTimeout(slideTimer);
  }, [currentSlide]);

  // --- Swipe Gesture Logic ---
  const [touchStart, setTouchStart] = useState<{x: number, y: number} | null>(null);
  const [touchEnd, setTouchEnd] = useState<{x: number, y: number} | null>(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null); 
    setTouchStart({
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY
    });
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY
    });
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const xDistance = touchStart.x - touchEnd.x;
    const yDistance = touchStart.y - touchEnd.y;
    
    // Check if the gesture is predominantly horizontal
    // This prevents vertical scrolling from triggering a slide switch
    if (Math.abs(xDistance) > Math.abs(yDistance)) {
        if (Math.abs(xDistance) > minSwipeDistance) {
            if (xDistance > 0) {
                // Swipe Left -> Next Slide (Toggle)
                setCurrentSlide(prev => (prev === 1 ? 0 : 1));
            } else {
                // Swipe Right -> Prev Slide (Toggle)
                setCurrentSlide(prev => (prev === 0 ? 1 : 0));
            }
        }
    }
  };

  return (
    <section 
      className="relative w-full h-[calc(100vh-60px)] md:h-[calc(100vh-100px)] min-h-[500px] md:min-h-[750px] overflow-hidden bg-black text-white"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Fixed Background Image - Persistent across slides */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://i.ibb.co/GfyNp3Qs/grok-lake-image.jpg" 
          alt="Misty lake with forest reflection" 
          className="object-cover w-full h-full"
        />
        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Carousel Track */}
      <div 
        className="relative z-10 w-full h-full flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        
        {/* --- SLIDE 1: Home / Coming Soon --- */}
        <div className="w-full h-full flex-shrink-0 flex items-start justify-center p-4 pt-32 md:pt-48">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto w-full">
            {/* Main Headline */}
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif mb-6 tracking-wide drop-shadow-sm">
              Coming Soon.
            </h2>
            
            {/* Description */}
            <p className="text-lg md:text-xl font-serif max-w-2xl text-gray-200 mb-8 md:mb-12 leading-relaxed px-4">
              Evidence-based psychiatry for anxiety, mood <br className="hidden md:block"/>
              disorders, ADHD, and burnout.
            </p>

            {/* Location/Credentials - Small Caps */}
            <div className="text-xs md:text-sm tracking-[0.25em] uppercase text-gray-300 mb-8 md:mb-12 font-light">
              North Atlanta &bull; Mayo Clinic&ndash;Trained
            </div>

            {/* Social Links */}
            <div className="flex gap-10 items-center justify-center">
              <a 
                href="https://x.com/DrNolanAyers" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white/70 hover:text-white transition-all transform hover:scale-110 duration-300"
                aria-label="Visit our X (formerly Twitter) page"
              >
                <XIcon className="w-8 h-8" />
              </a>
              <a 
                href="https://www.linkedin.com/in/nolanayersmd" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white/70 hover:text-white transition-all transform hover:scale-110 duration-300"
                aria-label="Visit our LinkedIn page"
              >
                <Linkedin className="w-8 h-8" />
              </a>
            </div>

          </div>
        </div>

        {/* --- SLIDE 2: About Dr. Ayers --- */}
        <div className="w-full h-full flex-shrink-0 flex items-center justify-center p-4 pb-32 md:p-8 lg:p-16 overflow-y-auto md:overflow-hidden">
          {/* Content Card with Glassmorphism */}
          <div className="bg-black/60 backdrop-blur-md rounded-xl p-6 md:p-10 lg:p-14 max-w-7xl w-full flex flex-col lg:flex-row gap-8 lg:gap-16 items-start shadow-2xl border border-white/10 my-auto">
            
            {/* --- MOBILE LAYOUT START: Image -> Quote -> Text --- */}
            
            {/* Mobile Image */}
            <div className="lg:hidden w-full mb-2">
               <div className="aspect-[3/3.5] w-full rounded-sm overflow-hidden bg-gray-800 shadow-lg relative">
                  <img 
                    src="https://i.ibb.co/sp8rgZNs/IMG-0291-2.jpg" 
                    alt="Dr. Nolan Ayers" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
               </div>
            </div>

            {/* Mobile Quote */}
            <div className="lg:hidden w-full mb-4 pl-4 border-l-2 border-white/40">
                <p className="font-serif italic text-lg text-white/90 leading-relaxed">
                  “Mental health is not just symptom relief. It is agency, connection, and meaning restored.”
                </p>
            </div>

            {/* --- MOBILE LAYOUT END --- */}


            {/* Left Column: Text Content (Desktop & Mobile) */}
            <div className="flex-1 space-y-6 md:space-y-8 text-left">
              <h2 className="text-3xl md:text-5xl font-serif text-white mb-2">About Dr. Ayers</h2>
              
              {/* Background Text */}
              <div className="space-y-4">
                <h3 className="hidden md:block text-xs tracking-[0.2em] uppercase text-gray-400 font-semibold">Background</h3>
                <p className="text-gray-200 leading-relaxed font-sans font-light text-sm md:text-base">
                  Dr. Nolan Ayers grew up in Cumming, Georgia. He studied at the University of Georgia, earned his medical degree at the Medical College of Georgia, and he will complete psychiatry residency at Mayo Clinic in Spring 2026, where he currently serves as Chief Resident.
                </p>
              </div>

              {/* Training Text */}
              <div className="space-y-4">
                <h3 className="hidden md:block text-xs tracking-[0.2em] uppercase text-gray-400 font-semibold">Training</h3>
                <p className="text-gray-200 leading-relaxed font-sans font-light text-sm md:text-base">
                  His training is broad and clinically rigorous, with experience across complex mood disorders, perinatal psychiatry, geriatric psychiatry, functional neurological disorders, and psychotherapy. He also trained in neuromodulatory treatments including transcranial magnetic stimulation (TMS), ketamine-based interventions, and electroconvulsive therapy (ECT).
                </p>
              </div>

              {/* Desktop Quote (Hidden on Mobile) */}
              <div className="hidden lg:block pt-4 border-l-2 border-white/30 pl-6">
                <p className="font-serif italic text-xl md:text-2xl text-white/90 leading-relaxed">
                  “Mental health is not just symptom relief. It is agency, connection, and meaning restored.”
                </p>
              </div>
            </div>

            {/* Right Column: Headshot (Desktop Only) */}
            <div className="hidden lg:block w-[400px] flex-shrink-0">
               <div className="aspect-[3/4] w-full rounded-sm overflow-hidden bg-gray-800 shadow-lg relative group">
                  <img 
                    src="https://i.ibb.co/sp8rgZNs/IMG-0291-2.jpg" 
                    alt="Dr. Nolan Ayers" 
                    className="w-full h-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
               </div>
            </div>

          </div>
        </div>

      </div>

      {/* Carousel Navigation Dots */}
      <div className="absolute bottom-20 md:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 z-20">
          <button 
            onClick={() => setCurrentSlide(0)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentSlide === 0 ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'}`}
            aria-label="Go to slide 1"
          />
          <button 
            onClick={() => setCurrentSlide(1)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentSlide === 1 ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'}`}
            aria-label="Go to slide 2"
          />
      </div>

    </section>
  );
};

export default Hero;