
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-[#0b1418] border-t border-slate-200 dark:border-slate-800/60 pt-16 pb-8 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2 space-y-4">
            <a className="inline-flex items-center gap-2 group" href="#">
              <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white font-bold text-xl group-hover:rotate-12 transition-transform">AN</div>
              <span className="text-2xl font-bold tracking-tighter text-slate-900 dark:text-white">Aayush.dev<span className="text-primary">.</span></span>
            </a>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm text-sm leading-relaxed">
              A dedicated Computer Science student passionate about building accessible, pixel-perfect, and performant web experiences.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">Navigation</h3>
            <ul className="space-y-2">
              <li><a className="text-slate-500 dark:text-slate-400 hover:text-primary transition-colors text-sm" href="#">Home</a></li>
              <li><a className="text-slate-500 dark:text-slate-400 hover:text-primary transition-colors text-sm" href="#about">About Me</a></li>
              <li><a className="text-slate-500 dark:text-slate-400 hover:text-primary transition-colors text-sm" href="#projects">Projects</a></li>
              <li><a className="text-slate-500 dark:text-slate-400 hover:text-primary transition-colors text-sm" href="#">Resume</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">Contact</h3>
            <ul className="space-y-2">
              <li><a className="text-slate-500 dark:text-slate-400 hover:text-primary transition-colors text-sm flex items-center gap-2" href="mailto:ayushniroula644@gmail.com"><span className="material-icons text-xs">mail</span> Email Me</a></li>
              <li><span className="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-2"><span className="material-icons text-xs">place</span> Letang, Morang, Nepal</span></li>
              <li><a className="text-slate-500 dark:text-slate-400 hover:text-primary transition-colors text-sm flex items-center gap-2" href="https://github.com/aayush-niroula" target="_blank" rel="noopener noreferrer"><span className="material-icons text-xs">code</span> GitHub</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400 dark:text-slate-500 text-center md:text-left">
            © {new Date().getFullYear()} Aayush Niroula. Built with React & Tailwind.
          </p>
          <div className="flex gap-6">
            <a className="text-slate-400 dark:text-slate-500 hover:text-primary transition-colors text-xs" href="#">Privacy Policy</a>
            <a className="text-slate-400 dark:text-slate-500 hover:text-primary transition-colors text-xs" href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
