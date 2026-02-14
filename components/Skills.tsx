
import React from 'react';
import { useGetSkillsQuery } from '../src/store/api';

const Skills: React.FC = () => {
  const { data: skills = [], isLoading } = useGetSkillsQuery();

  // Group skills by category
  const categories = skills.reduce((acc: Record<string, typeof skills>, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  // Sort skills within each category by order
  Object.keys(categories).forEach(cat => {
    categories[cat].sort((a, b) => a.order - b.order);
  });

  const categoryOrder = ['Frontend', 'Backend', 'Databases', 'Tools'];

  const iconMap: Record<string, string> = {
    'Frontend': 'code',
    'Backend': 'dns',
    'Databases': 'storage',
    'Tools': 'build'
  };

  if (isLoading) {
    return (
      <section className="py-20 md:py-28 bg-slate-50 dark:bg-slate-900/30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-28 bg-slate-50 dark:bg-slate-900/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2 className="text-primary font-bold tracking-widest uppercase text-[10px] md:text-xs mb-3">Technical Arsenal</h2>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white px-2">Tools & Technologies</h1>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed px-4">
            A comprehensive overview of my technical expertise. I build scalable solutions using modern stacks.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-10">
          {categoryOrder.map((catName) => {
            const catSkills = categories[catName];
            if (!catSkills || catSkills.length === 0) return null;
            
            return (
              <div key={catName} className="bg-white dark:bg-slate-800/80 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-black/30 border border-slate-100 dark:border-slate-700/50 group hover:border-primary/30 transition-all duration-300">
                <div className="mb-6 pb-4 border-b border-slate-100 dark:border-slate-700 flex items-center gap-4">
                  <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <span className="material-icons text-xl md:text-2xl">{iconMap[catName] || 'code'}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                    {catName}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {catSkills.map((skill) => (
                    <div key={skill.id} className="group/tag px-3 md:px-4 py-1.5 md:py-2 bg-slate-50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-200 text-xs md:text-sm font-semibold rounded-xl border border-slate-200 dark:border-slate-600 hover:border-primary dark:hover:border-primary hover:text-primary dark:hover:text-primary transition-all cursor-default flex items-center gap-2">
                      <span className="material-icons text-base md:text-lg text-primary/60 group-hover/tag:text-primary">{skill.icon || 'code'}</span>
                      {skill.name}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
