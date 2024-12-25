import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const handleStartCheckIn = () => {
    navigate('/check-in');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-4xl md:text-6xl font-lato tracking-tight mb-12">
          WELCOME TO F.A.D FURNISHED APARTMENTS DALLAS
        </h1>
        
        <button 
          onClick={handleStartCheckIn}
          className="inline-block px-12 py-5 bg-dallas-blue text-white text-xl font-medium rounded-lg hover:bg-dallas-navy transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Start New Check-In
        </button>

        <div className="mt-8 text-dallas-blue">
          <div className="text-lg font-bold">Contact Us</div>
          <a 
            href="mailto:customerservice@furnished-apartments-dallas.com" 
            className="block mt-2 hover:text-dallas-gold transition-colors"
          >
            customerservice@furnished-apartments-dallas.com
          </a>
          <a 
            href="tel:713-766-0495" 
            className="block mt-2 hover:text-dallas-gold transition-colors"
          >
            713-766-0495
          </a>
        </div>
      </div>
    </div>
  );
}