
import * as React from 'react';
import { useState, useEffect } from 'react';

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 p-3 md:p-4 rounded-2xl bg-primary text-white shadow-2xl shadow-primary/40 transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 hover:bg-primary-dark active:scale-95 focus:outline-none focus:ring-4 focus:ring-primary/20 ${isVisible ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-20 opacity-0 pointer-events-none'
        }`}
      aria-label="Back to top"
    >
      <span className="material-icons text-2xl md:text-3xl">arrow_upward</span>
      <span className="absolute -top-1 -right-1 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-20"></span>
      </span>
    </button>
  );
};

export default BackToTop;
