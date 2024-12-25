import React from 'react';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-dallas-navy mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-white font-medium mb-2">Contact Us</p>
            <div className="space-x-4">
              <a 
                href="mailto:customerservice@furnished-apartments-dallas.com"
                className="text-dallas-gold hover:text-white transition-colors"
              >
                customerservice@furnished-apartments-dallas.com
              </a>
              <span className="text-white">|</span>
              <a 
                href="tel:713-766-0495"
                className="text-dallas-gold hover:text-white transition-colors"
              >
                713-766-0495
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}