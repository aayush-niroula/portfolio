
import React from 'react';
import { useGetExperiencesQuery, useGetEducationQuery } from '../src/store/api';

const Timeline: React.FC = () => {
  const { data: experiences = [], isLoading: expLoading } = useGetExperiencesQuery();
  const { data: education = [], isLoading: eduLoading } = useGetEducationQuery();

  const formatDate = (date: string | Date | null) => {
    if (!date) return 'Present';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  if (expLoading || eduLoading) {
    return (
      <section className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12 py-20 md:py-28">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12 py-20 md:py-28">
      <div className="mb-12 md:mb-16 text-center md:text-left px-2">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
          My Journey & <br className="hidden sm:block" />
          <span className="text-primary">Professional Growth</span>
        </h2>
        <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
          A chronological overview of my education and software engineering internships.
        </p>
      </div>

      <div className="relative">
        {/* Timeline Line - Position adjusted for mobile */}
        <div className="absolute left-6 md:left-8 top-4 bottom-0 w-[2px] timeline-line"></div>
        
        {/* Experience Section */}
        <div className="relative mb-12 md:mb-16">
          <div className="flex items-center gap-4 mb-8 -ml-1">
            <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-xl text-primary border border-primary/20">
              <span className="material-icons-round text-xl md:text-2xl">work_history</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold">Experience</h3>
          </div>

          {experiences
            .slice()
            .sort((a: any, b: any) => a.order - b.order)
            .map((exp: any) => (
            <div key={exp.id} className="relative pl-12 md:pl-28 py-4 md:py-6 group">
              <div className="absolute left-[20px] md:left-[30px] top-7 md:top-8 w-3 h-3 md:w-4 md:h-4 rounded-full border-[3px] border-white dark:border-background-dark bg-slate-300 dark:bg-slate-600 group-hover:bg-primary group-hover:scale-125 transition-all duration-300 shadow-sm z-10"></div>
              
              {/* Date for desktop */}
              <div className="hidden md:flex absolute left-[-2rem] top-7 justify-end w-32 pr-8">
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 font-mono text-right">
                  {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                </span>
              </div>

              <div className="relative bg-white dark:bg-neutral-dark p-5 md:p-6 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300">
                {/* Date for mobile */}
                <span className="md:hidden inline-block px-2 py-0.5 mb-3 text-[10px] font-mono font-bold rounded bg-primary/10 text-primary uppercase tracking-tight">
                  {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                </span>
                
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                  <div>
                    <h4 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white group-hover:text-primary transition-colors">{exp.title}</h4>
                    <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium mt-0.5">{exp.company} {exp.location && `• ${exp.location}`}</p>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Education Section */}
        <div className="relative">
          <div className="flex items-center gap-4 mb-8 -ml-1">
            <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-xl text-primary border border-primary/20">
              <span className="material-icons-round text-xl md:text-2xl">school</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold">Education</h3>
          </div>

          {education
            .slice()
            .sort((a: any, b: any) => a.order - b.order)
            .map((edu: any) => (
            <div key={edu.id} className="relative pl-12 md:pl-28 py-4 md:py-6 group">
              <div className="absolute left-[20px] md:left-[30px] top-7 md:top-8 w-3 h-3 md:w-4 md:h-4 rounded-full border-[3px] border-white dark:border-background-dark bg-slate-300 dark:bg-slate-600 group-hover:bg-primary group-hover:scale-125 transition-all duration-300 shadow-sm z-10"></div>
              
              <div className="hidden md:flex absolute left-[-2rem] top-7 justify-end w-32 pr-8">
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 font-mono text-right">
                  {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                </span>
              </div>

              <div className="relative bg-white dark:bg-neutral-dark p-5 md:p-6 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300">
                <span className="md:hidden inline-block px-2 py-0.5 mb-3 text-[10px] font-mono font-bold rounded bg-primary/10 text-primary uppercase tracking-tight">
                  {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                </span>
                
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                  <div>
                    <h4 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white group-hover:text-primary transition-colors">{edu.degree}</h4>
                    <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium mt-0.5">{edu.institution} {edu.location && `• ${edu.location}`}</p>
                  </div>
                </div>
                {edu.description && (
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                    {edu.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
