
import { Project, TimelineItem, SkillCategory } from './types';

// API Configuration - Change this URL in one place for deployment
// For local development: 'http://localhost:5000/api'
// For production: your deployed backend URL with /api suffix
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Languages",
    skills: [
      { name: "TypeScript", icon: "data_object" },
      { name: "JavaScript", icon: "code" },
      { name: "C++", icon: "settings_suggest" },
      { name: "Python", icon: "terminal" },
      { name: "Go (Golang)", icon: "bolt" }
    ]
  },
  {
    category: "Web Frameworks",
    skills: [
      { name: "React.js", icon: "layers" },
      { name: "Next.js", icon: "dynamic_feed" },
      { name: "Tailwind CSS", icon: "palette" },
      { name: "Redux Toolkit", icon: "hub" },
      { name: "Express.js", icon: "api" }
    ]
  },
  {
    category: "Database & Backend",
    skills: [
      { name: "Node.js", icon: "dns" },
      { name: "PostgreSQL", icon: "storage" },
      { name: "MongoDB", icon: "database" },
      { name: "Redis", icon: "speed" }
    ]
  },
  {
    category: "Tools & DevOps",
    skills: [
      { name: "Git / GitHub", icon: "account_tree" },
      { name: "Docker", icon: "dock" },
      { name: "Linux", icon: "computer" },
      { name: "Socket.io", icon: "electric_bolt" }
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "p-insta",
    title: "Instagram Clone",
    description: "A high-fidelity social media platform featuring image uploads, real-time likes, comments, and a responsive mobile-first UI mimicking the Instagram experience.",
    image: "https://picsum.photos/seed/instaclone/800/450",
    tags: ["React", "Firebase", "Tailwind", "Cloudinary"],
    liveUrl: "https://instagramclone-u8xy.onrender.com",
    repoUrl: "https://github.com/aayush-niroula",
    status: "Completed",
    category: "Web Dev"
  },
  {
    id: "p-social",
    title: "Social Echo",
    description: "A full-featured social networking platform. Built with React, Node.js, and MongoDB, featuring real-time messaging, post interactions, and a clean modern UI.",
    image: "https://picsum.photos/seed/secho/800/450",
    tags: ["MERN Stack", "Socket.io", "Tailwind"],
    repoUrl: "https://github.com/aayush-niroula/social-echo",
    status: "Completed",
    category: "Web Dev"
  },
  {
    id: "p-ecom",
    title: "Modern E-Commerce",
    description: "High-performance storefront built with Next.js 14. Includes server actions, complex state management, and Stripe integration for seamless payments.",
    image: "https://picsum.photos/seed/store/800/450",
    tags: ["Next.js", "TypeScript", "Prisma", "Stripe"],
    repoUrl: "https://github.com/aayush-niroula",
    status: "v1.0",
    category: "Web Dev"
  },
  {
    id: "p-blog",
    title: "Blogify Engine",
    description: "A Markdown-powered blogging platform with SEO optimization, automated sitemaps, and a highly customizable theme system.",
    image: "https://picsum.photos/seed/blogengine/800/450",
    tags: ["Next.js", "MDX", "Framer Motion"],
    repoUrl: "https://github.com/aayush-niroula",
    status: "Completed",
    category: "Web Dev"
  },
  {
    id: "p-system",
    title: "Distributed Task Queue",
    description: "A backend system for managing asynchronous tasks across multiple worker nodes, implemented with Go and Redis for high throughput.",
    image: "https://picsum.photos/seed/worker/800/450",
    tags: ["Go", "Redis", "Docker"],
    repoUrl: "https://github.com/aayush-niroula",
    status: "In Progress",
    category: "Systems"
  }
];

export const TIMELINE: TimelineItem[] = [
  {
    id: "exp-f",
    type: "experience",
    title: "Full Stack Developer",
    subtitle: "Open Source Contributor",
    date: "2023 - Present",
    description: [
      "Actively contributing to various JavaScript and C++ open-source projects.",
      "Developing production-grade personal projects focusing on scalability and clean architecture.",
      "Experimenting with distributed systems and microservices using Go."
    ],
    tags: ["TypeScript", "Go", "Docker"]
  },
  {
    id: "exp-i",
    type: "experience",
    title: "Frontend Intern",
    subtitle: "Innovation Lab",
    date: "Summer 2023",
    description: [
      "Developed interactive UI components for a data visualization dashboard.",
      "Improved frontend performance by implementing lazy loading and code-splitting.",
      "Collaborated with backend engineers to integrate RESTful APIs seamlessly."
    ],
    tags: ["React", "D3.js", "Redux"]
  },
  {
    id: "edu-be",
    type: "education",
    title: "B.E. Computer Engineering",
    subtitle: "Pulchowk Campus, Tribhuvan University",
    date: "2021 - 2025",
    description: [
      "Rigorous coursework in Data Structures, Algorithms, OS, and Database Management.",
      "Consistently maintaining a high academic standing with a focus on Software Engineering.",
      "Active participant in competitive programming and hackathons."
    ],
    gpa: "3.91 / 4.0"
  }
];
