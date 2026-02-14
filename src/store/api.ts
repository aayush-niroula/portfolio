import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from './index';

// Types
export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  projectUrl?: string;
  liveDemoUrl?: string;
  githubUrl?: string;
  tags: string[];
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  id: string;
  name: string;
  icon: string;
  category: string;
  level: number;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface SiteContent {
  key: string;
  value: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Admin {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  token: string;
  admin: Admin;
}

// API Slice
const baseUrl = import.meta.env.VITE_API_URL || '/api';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Project', 'Skill', 'Experience', 'Education', 'SocialLink', 'SiteContent', 'ContactMessage'],
  endpoints: (builder) => ({
    // Health Check
    healthCheck: builder.query<{ status: string; timestamp: string }, void>({
      query: () => '/health',
    }),

    // Auth
    login: builder.mutation<AuthResponse, { email: string; password: string }>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getCurrentUser: builder.query<Admin, void>({
      query: () => '/auth/me',
    }),

    // Projects
    getProjects: builder.query<Project[], void>({
      query: () => '/projects',
      providesTags: ['Project'],
    }),
    getFeaturedProjects: builder.query<Project[], void>({
      query: () => '/projects/featured',
      providesTags: ['Project'],
    }),
    getProject: builder.query<Project, string>({
      query: (id) => `/projects/${id}`,
    }),
    createProject: builder.mutation<Project, Partial<Project>>({
      query: (project) => ({
        url: '/projects',
        method: 'POST',
        body: project,
      }),
      invalidatesTags: ['Project'],
    }),
    updateProject: builder.mutation<Project, { id: string; data: Partial<Project> }>({
      query: ({ id, data }) => ({
        url: `/projects/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Project'],
    }),
    deleteProject: builder.mutation<void, string>({
      query: (id) => ({
        url: `/projects/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Project'],
    }),

    // Skills
    getSkills: builder.query<Skill[], void>({
      query: () => '/skills',
      providesTags: ['Skill'],
    }),
    getSkillsByCategory: builder.query<Skill[], string>({
      query: (category) => `/skills/category/${category}`,
    }),
    getSkill: builder.query<Skill, string>({
      query: (id) => `/skills/${id}`,
    }),
    createSkill: builder.mutation<Skill, Partial<Skill>>({
      query: (skill) => ({
        url: '/skills',
        method: 'POST',
        body: skill,
      }),
      invalidatesTags: ['Skill'],
    }),
    updateSkill: builder.mutation<Skill, { id: string; data: Partial<Skill> }>({
      query: ({ id, data }) => ({
        url: `/skills/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Skill'],
    }),
    deleteSkill: builder.mutation<void, string>({
      query: (id) => ({
        url: `/skills/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Skill'],
    }),

    // Experience
    getExperiences: builder.query<Experience[], void>({
      query: () => '/experience',
      providesTags: ['Experience'],
    }),
    getExperience: builder.query<Experience, string>({
      query: (id) => `/experience/${id}`,
    }),
    createExperience: builder.mutation<Experience, Partial<Experience>>({
      query: (experience) => ({
        url: '/experience',
        method: 'POST',
        body: experience,
      }),
      invalidatesTags: ['Experience'],
    }),
    updateExperience: builder.mutation<Experience, { id: string; data: Partial<Experience> }>({
      query: ({ id, data }) => ({
        url: `/experience/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Experience'],
    }),
    deleteExperience: builder.mutation<void, string>({
      query: (id) => ({
        url: `/experience/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Experience'],
    }),

    // Education
    getEducation: builder.query<Education[], void>({
      query: () => '/education',
      providesTags: ['Education'],
    }),
    getEducationItem: builder.query<Education, string>({
      query: (id) => `/education/${id}`,
    }),
    createEducation: builder.mutation<Education, Partial<Education>>({
      query: (education) => ({
        url: '/education',
        method: 'POST',
        body: education,
      }),
      invalidatesTags: ['Education'],
    }),
    updateEducation: builder.mutation<Education, { id: string; data: Partial<Education> }>({
      query: ({ id, data }) => ({
        url: `/education/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Education'],
    }),
    deleteEducation: builder.mutation<void, string>({
      query: (id) => ({
        url: `/education/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Education'],
    }),

    // Social Links
    getSocialLinks: builder.query<SocialLink[], void>({
      query: () => '/social',
      providesTags: ['SocialLink'],
    }),
    getSocialLink: builder.query<SocialLink, string>({
      query: (id) => `/social/${id}`,
    }),
    createSocialLink: builder.mutation<SocialLink, Partial<SocialLink>>({
      query: (link) => ({
        url: '/social',
        method: 'POST',
        body: link,
      }),
      invalidatesTags: ['SocialLink'],
    }),
    updateSocialLink: builder.mutation<SocialLink, { id: string; data: Partial<SocialLink> }>({
      query: ({ id, data }) => ({
        url: `/social/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['SocialLink'],
    }),
    deleteSocialLink: builder.mutation<void, string>({
      query: (id) => ({
        url: `/social/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['SocialLink'],
    }),

    // Site Content
    getSiteContent: builder.query<SiteContent[], void>({
      query: () => '/content',
      providesTags: ['SiteContent'],
    }),
    getSiteContentByKey: builder.query<SiteContent, string>({
      query: (key) => `/content/${key}`,
    }),
    updateSiteContent: builder.mutation<SiteContent, { key: string; value: string; type?: string }>({
      query: ({ key, ...data }) => ({
        url: `/content/${key}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['SiteContent'],
    }),
    bulkUpdateContent: builder.mutation<SiteContent[], { items: { key: string; value: string; type?: string }[] }>({
      query: (data) => ({
        url: '/content/bulk',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['SiteContent'],
    }),

    // Contact
    submitContact: builder.mutation<{ message: string; id: string }, { name: string; email: string; subject?: string; message: string }>({
      query: (contact) => ({
        url: '/contact',
        method: 'POST',
        body: contact,
      }),
    }),
    getContactMessages: builder.query<ContactMessage[], void>({
      query: () => '/contact',
      providesTags: ['ContactMessage'],
    }),
    getUnreadCount: builder.query<{ count: number }, void>({
      query: () => '/contact/unread/count',
    }),
    markAsRead: builder.mutation<ContactMessage, string>({
      query: (id) => ({
        url: `/contact/${id}/read`,
        method: 'PUT',
      }),
      invalidatesTags: ['ContactMessage'],
    }),
    deleteContactMessage: builder.mutation<void, string>({
      query: (id) => ({
        url: `/contact/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ContactMessage'],
    }),

    // Resume (public)
    getResume: builder.query<{ exists: boolean; url?: string; filename?: string }, void>({
      query: () => '/assets/resume/public',
    }),
  }),
});

export const {
  // Health
  useHealthCheckQuery,
  
  // Auth
  useLoginMutation,
  useGetCurrentUserQuery,
  
  // Projects
  useGetProjectsQuery,
  useGetFeaturedProjectsQuery,
  useGetProjectQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  
  // Skills
  useGetSkillsQuery,
  useGetSkillsByCategoryQuery,
  useGetSkillQuery,
  useCreateSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
  
  // Experience
  useGetExperiencesQuery,
  useGetExperienceQuery,
  useCreateExperienceMutation,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
  
  // Education
  useGetEducationQuery,
  useGetEducationItemQuery,
  useCreateEducationMutation,
  useUpdateEducationMutation,
  useDeleteEducationMutation,
  
  // Social Links
  useGetSocialLinksQuery,
  useGetSocialLinkQuery,
  useCreateSocialLinkMutation,
  useUpdateSocialLinkMutation,
  useDeleteSocialLinkMutation,
  
  // Site Content
  useGetSiteContentQuery,
  useGetSiteContentByKeyQuery,
  useUpdateSiteContentMutation,
  useBulkUpdateContentMutation,
  
  // Contact
  useSubmitContactMutation,
  useGetContactMessagesQuery,
  useGetUnreadCountQuery,
  useMarkAsReadMutation,
  useDeleteContactMessageMutation,

  // Resume
  useGetResumeQuery,
} = api;
