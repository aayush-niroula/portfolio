
import * as React from 'react';
import { useGetSiteContentQuery } from '../src/store/api';

const Hero: React.FC = () => {
  const { data: siteContent = [], isLoading } = useGetSiteContentQuery();

  // Get content from database or use defaults
  const getContent = (key: string, defaultValue: string) => {
    const item = siteContent.find((c: any) => c.key === key);
    return item?.value || defaultValue;
  };

  const heroTitle = getContent('hero_title', "Hi, I'm Aayush.");
  const heroSubtitle = getContent('hero_subtitle', 'Building the future of web.');
  const heroDescription = getContent('hero_description', "I'm an IT Student & Full Stack Developer passionate about crafting accessible, pixel-perfect, and performant user experiences.");

  if (isLoading) {
    return (
      <main className="relative min-h-[90vh] lg:min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-10 lg:py-0">
          <div className="animate-pulse">
            <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-4"></div>
            <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-[90vh] lg:min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Blobs - Hidden on very small screens to reduce clutter */}
      <div className="hidden sm:block absolute top-20 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="hidden sm:block absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-10 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left space-y-6 md:space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit mx-auto lg:mx-0">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-[10px] md:text-xs font-semibold text-primary uppercase tracking-wide">Available for Internship</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15] lg:leading-[1.1]">
                {heroTitle}
                <br />
                <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-slate-700 dark:text-slate-300">{heroSubtitle}</span>
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed px-2 sm:px-0">
                {heroDescription}
              </p>
            </div>

            <div className="flex flex-col xs:flex-row gap-4 justify-center lg:justify-start pt-2 px-4 sm:px-0">
              <a className="inline-flex items-center justify-center px-6 md:px-8 py-3.5 md:py-4 text-sm md:text-base font-semibold text-white transition-all duration-300 bg-primary border border-transparent rounded-xl hover:bg-cyan-500 hover:scale-105 hover:shadow-lg hover:shadow-primary/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary" href="#projects">
                View Projects
                <span className="material-icons ml-2 text-sm">arrow_forward</span>
              </a>
              <a className="inline-flex items-center justify-center px-6 md:px-8 py-3.5 md:py-4 text-sm md:text-base font-semibold text-slate-700 dark:text-slate-200 transition-all duration-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-primary/50 dark:hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-200" href="#contact">
                Contact Me
              </a>
            </div>

            <div className="pt-8 border-t border-slate-200 dark:border-slate-800 mt-8">
              <p className="text-[10px] md:text-xs font-bold text-slate-400 dark:text-slate-500 mb-6 uppercase tracking-[0.2em]">Top Tech Stack</p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-5 sm:gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="flex items-center gap-2 group cursor-default">
                  <span className="material-icons text-2xl md:text-3xl group-hover:text-[#61DAFB] transition-colors">code</span>
                  <span className="text-xs md:text-sm font-semibold group-hover:text-[#61DAFB] transition-colors">React</span>
                </div>
                <div className="flex items-center gap-2 group cursor-default">
                  <span className="material-icons text-2xl md:text-3xl group-hover:text-[#3178C6] transition-colors">data_object</span>
                  <span className="text-xs md:text-sm font-semibold group-hover:text-[#3178C6] transition-colors">TS</span>
                </div>
                <div className="flex items-center gap-2 group cursor-default">
                  <span className="material-icons text-2xl md:text-3xl group-hover:text-black dark:group-hover:text-white transition-colors">terminal</span>
                  <span className="text-xs md:text-sm font-semibold group-hover:text-black dark:group-hover:text-white transition-colors">Next</span>
                </div>
                <div className="flex items-center gap-2 group cursor-default">
                  <span className="material-icons text-2xl md:text-3xl group-hover:text-[#339933] transition-colors">dns</span>
                  <span className="text-xs md:text-sm font-semibold group-hover:text-[#339933] transition-colors">Node</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex justify-center lg:justify-end mt-12 lg:mt-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary/20 via-cyan-200/20 to-transparent blob-shape -z-10"></div>
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[420px] lg:h-[480px] rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-all duration-500 group">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
              <img src="/1.jpeg" alt="Aayush Niroula" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute bottom-4 left-4 right-4 z-20 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm p-3 md:p-4 rounded-xl shadow-lg border border-white/20 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg shrink-0">
                    <span className="material-icons text-green-600 dark:text-green-400 text-lg md:text-xl">check_circle</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Status</p>
                    <p className="text-xs md:text-sm font-bold text-slate-800 dark:text-white truncate">Open to Collaborations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Hero;
