import React from 'react';
import { Linkedin } from 'lucide-react';

// Simple X (Twitter) Logo Component
const XIcon = ({ className }: { className?: string }) => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={className}>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
  </svg>
);

const Header: React.FC = () => {
  return (
    <header className="w-full py-2 md:py-5 px-4 md:px-12 lg:px-16 flex justify-between items-center bg-[#F2F2F0] z-50 transition-all duration-300">
      {/* Logo Section */}
      <div className="flex items-center gap-3 md:gap-4">
        <img 
          src="https://i.ibb.co/jkvf185b/Ayers-psychiatry-logo-roun-001-png-001-2.jpg" 
          alt="Ayers Psychiatry Logo" 
          className="w-9 h-9 md:w-12 md:h-12 rounded-full object-cover flex-shrink-0"
        />
        <div>
          <h1 className="text-lg md:text-2xl font-serif text-gray-900 leading-none tracking-tight">
            Ayers Psychiatry
          </h1>
          <p className="text-[0.5rem] md:text-[0.65rem] tracking-[0.2em] text-gray-600 uppercase mt-0.5 md:mt-1">
            Nolan Ayers, M.D.
          </p>
        </div>
      </div>

      {/* Social Links (Replaces Navigation) */}
      <div className="flex items-center gap-6">
        <a 
          href="https://x.com/DrNolanAyers" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-gray-500 hover:text-gray-900 transition-colors duration-300"
          aria-label="Visit our X (formerly Twitter) page"
        >
          <XIcon className="w-5 h-5" />
        </a>
        <a 
          href="https://www.linkedin.com/in/nolanayersmd" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-gray-500 hover:text-gray-900 transition-colors duration-300"
          aria-label="Visit our LinkedIn page"
        >
          <Linkedin className="w-5 h-5" />
        </a>
      </div>
    </header>
  );
};

export default Header;