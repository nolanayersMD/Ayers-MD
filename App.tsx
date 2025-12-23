import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-primary bg-stone">
      <Header />
      <main className="flex-grow flex flex-col">
        <Hero />
      </main>
      {/* Footer is omitted for the immersive landing page feel, matching the reference image style */}
    </div>
  );
};

export default App;