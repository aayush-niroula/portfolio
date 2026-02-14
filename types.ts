
export interface Skill {
  name: string;
  icon: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  repoUrl: string;
  status: 'Completed' | 'In Progress' | 'v1.0';
  category: 'Web Dev' | 'Mobile' | 'Systems';
}

export interface TimelineItem {
  id: string;
  type: 'experience' | 'education';
  title: string;
  subtitle: string;
  date: string;
  description: string[];
  tags?: string[];
  gpa?: string;
}
