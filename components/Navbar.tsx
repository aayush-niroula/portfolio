
import React, { useState } from 'react';
import { useGetResumeQuery } from '../src/store/api';
import { API_URL } from '../constants';

interface NavbarProps {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleDarkMode, isDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: resumeData, isLoading: isResumeLoading } = useGetResumeQuery();

  const handleResumeDownload = () => {
    if (resumeData?.exists && resumeData?.url) {
      window.open(`${API_URL}${resumeData.url}`, '_blank');
    }
  };

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
  ];

  return (
    <nav className="fixed w-full z-50 top-0 left-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800/60 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/30 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
              AN
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">Aayush<span className="text-primary">.</span>dev</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all"
              >
                {link.name}
              </a>
            ))}
            <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2"></div>
            <a 
              href="https://github.com/aayush-niroula" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:text-primary hover:bg-primary/10 transition-all"
              aria-label="GitHub"
            >
              <span className="material-icons text-xl">code</span>
            </a>
            <button 
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:text-primary hover:bg-primary/10 transition-all"
              aria-label="Toggle dark mode"
            >
              <span className="material-icons text-xl">{isDarkMode ? 'light_mode' : 'dark_mode'}</span>
            </button>
            <a 
              onClick={handleResumeDownload}
              className="ml-4 px-6 py-2.5 text-sm font-bold bg-primary text-white rounded-xl hover:bg-primary-dark transition-all duration-300 shadow-md shadow-primary/20 hover:shadow-primary/40 active:scale-95 cursor-pointer"
            >
              {isResumeLoading ? 'Loading...' : 'Resume'}
            </a>
          </div>
          
          <div className="md:hidden flex items-center gap-3">
             <button 
              onClick={toggleDarkMode} 
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
            >
                <span className="material-icons text-xl">{isDarkMode ? 'light_mode' : 'dark_mode'}</span>
             </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-primary focus:outline-none transition-colors"
            >
              <span className="material-icons text-3xl">{isMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute w-full bg-white dark:bg-background-dark border-b border-slate-200 dark:border-slate-800 transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pt-2 pb-6 space-y-1">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-3 text-base font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-primary rounded-xl transition-all"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 px-4">
            <a 
              onClick={handleResumeDownload}
              className="block w-full py-4 text-center text-sm font-bold bg-primary text-white rounded-xl cursor-pointer"
            >
              {isResumeLoading ? 'Loading...' : 'Download Resume'}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
