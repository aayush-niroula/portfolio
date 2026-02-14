
import React, { useState } from 'react';
import { useGetProjectsQuery } from '../src/store/api';

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Web Dev' | 'Mobile' | 'Systems'>('All');
  const { data: projects = [], isLoading } = useGetProjectsQuery();

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter((p: any) => p.category === filter);

  if (isLoading) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
        <div className="inline-block px-3 py-1 mb-4 text-[10px] font-bold tracking-widest text-primary uppercase bg-primary/10 rounded-full">
          My Portfolio
        </div>
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight">
          Crafting digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">experiences</span>
        </h2>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed px-4">
          A collection of my work in full-stack development, systems programming, and UI. Focusing on clean code.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-10 md:mb-14 px-2">
        {['All', 'Web Dev', 'Mobile', 'Systems'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab as any)}
            className={`px-4 md:px-6 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all active:scale-95 border ${
              filter === tab 
                ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30' 
                : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-700 hover:border-primary/50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
        {filteredProjects.map((project: any) => (
          <article key={project.id} className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 flex flex-col h-full group">
            <div className="relative overflow-hidden aspect-[16/10]">
              <img src={project.imageUrl || 'https://picsum.photos/seed/default/800/450'} alt={project.title} className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-4 right-4 z-10">
                <span className={`text-[10px] px-2 py-1 rounded-lg font-bold uppercase tracking-tight shadow-sm ${
                  project.featured ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
                }`}>
                  {project.featured ? 'Featured' : 'Project'}
                </span>
              </div>
            </div>
            <div className="p-5 md:p-6 flex flex-col flex-grow">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors mb-3">
                {project.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-grow leading-relaxed">
                {project.description}
              </p>
              <div className="space-y-5">
                <div className="flex flex-wrap gap-2">
                  {project.tags && project.tags.map((tag: string) => (
                    <span key={tag} className="px-2.5 py-1 text-[10px] font-bold text-primary bg-primary/5 border border-primary/10 rounded-lg">{tag}</span>
                  ))}
                </div>
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" className="inline-flex items-center text-xs md:text-sm font-bold text-gray-700 dark:text-gray-200 hover:text-primary transition-colors">
                      <span className="material-icons text-base md:text-lg mr-1.5">code</span>
                      Repo
                    </a>
                  )}
                  {project.liveDemoUrl && (
                    <a href={project.liveDemoUrl} target="_blank" className="inline-flex items-center text-xs md:text-sm font-bold text-green-500 hover:text-green-400 transition-colors">
                      <span className="material-icons text-base md:text-lg mr-1.5">play_circle</span>
                      Live
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Projects;
