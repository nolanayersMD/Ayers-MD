import React, { useState } from 'react';
import { Check, Loader2, AlertCircle } from 'lucide-react';

// --- CONFIGURATION START ---
// Paste your Google Form "Action URL" here (ends in /formResponse):
const GOOGLE_FORM_ACTION_URL = ""; 

// Paste your Google Form "Entry ID" here (e.g., "entry.123456789"):
const GOOGLE_FORM_ENTRY_ID = "";
// --- CONFIGURATION END ---

const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Developer safeguard: Simulate success if IDs aren't set yet
    if (!GOOGLE_FORM_ACTION_URL || !GOOGLE_FORM_ENTRY_ID) {
      console.warn("Google Form IDs not set in NewsletterForm.tsx. Simulating success.");
      setStatus('loading');
      setTimeout(() => {
        setStatus('success');
        setEmail('');
      }, 1000);
      return;
    }

    setStatus('loading');
    setErrorMessage('');
    
    try {
      // 1. Create a FormData object to mimic a standard HTML form submission
      const formData = new FormData();
      formData.append(GOOGLE_FORM_ENTRY_ID, email);

      // 2. Send the data to Google
      // IMPORTANT: Google Forms does not allow "CORS" (Cross-Origin Resource Sharing).
      // We must use mode: 'no-cors'. This means the browser sends the data, 
      // but we CANNOT read the response (we won't know if it's a 200 OK or 400 Error).
      // We have to assume if the network request didn't fail, Google accepted it.
      await fetch(GOOGLE_FORM_ACTION_URL, {
        method: 'POST',
        mode: 'no-cors', 
        body: formData,
      });

      // Since 'no-cors' prevents reading the response, we assume success
      setStatus('success');
      setEmail('');

    } catch (error) {
      console.error(error);
      setErrorMessage("Unable to connect. Please check your internet.");
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center animate-fade-in">
        <div className="w-12 h-12 rounded-full border-2 border-white/50 flex items-center justify-center text-white mb-2">
            <Check className="w-6 h-6" />
        </div>
        <p className="text-white font-serif text-lg">You've been added to the list.</p>
        <button 
          onClick={() => setStatus('idle')} 
          className="text-xs text-white/50 mt-4 hover:text-white underline"
        >
          Add another email
        </button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 w-full justify-center relative">
        <input
          type="email"
          name="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className={`px-6 py-3 md:py-4 rounded-full border ${status === 'error' ? 'border-red-400 bg-red-900/20' : 'border-white/60 bg-white/10'} text-white placeholder:text-gray-300 focus:outline-none focus:bg-white/20 focus:border-white transition-all backdrop-blur-sm w-full md:w-80 text-center md:text-left`}
          disabled={status === 'loading'}
          required
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-8 py-3 md:py-4 rounded-full border border-white text-white font-medium tracking-wider hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 uppercase text-sm"
        >
          {status === 'loading' ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              Notify Me
            </>
          )}
        </button>
      </form>
      
      {/* Error Message Display */}
      {status === 'error' && (
        <div className="flex items-center gap-2 mt-3 text-red-200 text-sm bg-red-900/40 px-4 py-2 rounded-lg backdrop-blur-sm animate-fade-in">
          <AlertCircle className="w-4 h-4" />
          <span>{errorMessage || "Please verify your email and try again."}</span>
        </div>
      )}
    </div>
  );
};

export default NewsletterForm;