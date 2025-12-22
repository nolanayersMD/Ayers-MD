import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 py-12 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-600 text-sm">
          
          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-gray-900 font-semibold text-lg">Contact</h3>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4" />
              <span>contact@practice.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4" />
              <span>(555) 123-4567</span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-gray-900 font-semibold text-lg">Location</h3>
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
              <span>
                123 Wellness Blvd, Suite 400<br />
                Cityville, ST 12345
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:items-end">
            <h3 className="font-serif text-gray-900 font-semibold text-lg">Emergency</h3>
            <p className="text-gray-500 max-w-xs md:text-right">
              If this is a medical emergency, please dial 911 or visit your nearest emergency room immediately.
            </p>
          </div>

        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} Dr. Sarah Bennett Psychiatry. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;