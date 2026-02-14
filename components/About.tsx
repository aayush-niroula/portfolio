
import * as React from 'react';
import { useGetSiteContentQuery, useGetSkillsQuery, useGetSocialLinksQuery } from '../src/store/api';

const About: React.FC = () => {
  const { data: siteContent = [], isLoading: contentLoading } = useGetSiteContentQuery();
  const { data: skills = [], isLoading: skillsLoading } = useGetSkillsQuery();
  const { data: socialLinks = [] } = useGetSocialLinksQuery();

  // Get content from database or use defaults
  const getContent = (key: string, defaultValue: string) => {
    const item = siteContent.find((c: any) => c.key === key);
    return item?.value || defaultValue;
  };

  // Group skills by category
  const categories = skills.reduce((acc: Record<string, typeof skills>, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const stack = [
    { name: 'Frontend', tools: categories['Frontend']?.map(s => s.name) || ['React', 'Next.js', 'Tailwind', 'Redux'], icon: 'auto_awesome' },
    { name: 'Backend', tools: categories['Backend']?.map(s => s.name) || ['Node.js', 'Express', 'PostgreSQL'], icon: 'dns' },
    { name: 'Databases', tools: categories['Databases']?.map(s => s.name) || ['MongoDB', 'SQL'], icon: 'storage' },
    { name: 'Tools', tools: categories['Tools']?.map(s => s.name) || ['Git', 'Docker'], icon: 'build' },
  ];

  const getSocialUrl = (platform: string) => {
    const link = socialLinks.find((s: any) => s.platform === platform);
    return link?.url || '#';
  };

  const githubUrl = getSocialUrl('GitHub');
  const emailUrl = getSocialUrl('Email');

  const isLoading = contentLoading || skillsLoading;

  if (isLoading) {
    return (
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4 text-center lg:text-left">
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-[10px] font-bold tracking-widest uppercase">
              Professional Bio
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-slate-900 dark:text-white">
              Solving complex problems with <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-500">elegant solutions.</span>
            </h2>
          </div>

          <div className="bg-white dark:bg-slate-800/40 p-6 md:p-8 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-black/20 backdrop-blur-md border border-slate-100 dark:border-slate-700/50 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl pointer-events-none"></div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-8 text-center sm:text-left">
              <div className="relative h-20 w-20 shrink-0 rounded-2xl overflow-hidden rotate-3 sm:group-hover:rotate-0 transition-transform duration-500 border border-slate-200 dark:border-slate-700">
                <img src="https://picsum.photos/seed/aayush-dev/300/300" alt="Profile" className="h-full w-full object-cover" />
              </div>
              <div className="pt-2">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Aayush Niroula</h3>
                <p className="text-primary font-medium text-sm md:text-base">Computer Science @AIMS College</p>
              </div>
            </div>

            <div className="space-y-5 text-slate-600 dark:text-slate-300 leading-relaxed text-base md:text-lg">
              <p>
                {getContent('about_content', 'I am a final-year Computer Science student with a deep-seated passion for full-stack architecture. My journey began with building basic scripts, which quickly evolved into architecting production-ready applications.')}
              </p>
            </div>

            <div className="mt-8 p-5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
              <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 text-center sm:text-left">Core Philosophy</h4>
              <p className="text-base md:text-lg italic font-medium text-slate-800 dark:text-slate-200 leading-snug text-center sm:text-left">
                "Code is the medium, but the user's experience is the message."
              </p>
            </div>
          </div>

          <div className="flex flex-col xs:flex-row flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-6 pt-4">
            <a
              href="/api/assets/resume"
              download="resume.pdf"
              className="w-full xs:w-auto px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span className="material-icons text-xl">download</span>
              Resume
            </a>
            <div className="flex items-center gap-4">
              {githubUrl && githubUrl !== '#' && (
                <a href={githubUrl} target="_blank" className="h-12 w-12 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white transition-all">
                  <span className="material-icons">terminal</span>
                </a>
              )}
              {emailUrl && emailUrl !== '#' && (
                <a href={emailUrl} className="h-12 w-12 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white transition-all">
                  <span className="material-icons">alternate_email</span>
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6 mt-12 lg:mt-0">
          {stack.map((item, idx) => (
            <div key={idx} className="group p-5 md:p-6 bg-white dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-primary/50 transition-all duration-300 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <span className="material-icons text-xl md:text-2xl">{item.icon}</span>
                </div>
                <h4 className="text-base md:text-lg font-bold text-slate-900 dark:text-white">{item.name}</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {item.tools.map(tool => (
                  <span key={tool} className="px-3 py-1 text-[10px] md:text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
