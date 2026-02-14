import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../store/authSlice';
import {
    useGetProjectsQuery,
    useGetSkillsQuery,
    useGetExperiencesQuery,
    useGetEducationQuery,
    useGetSocialLinksQuery,
    useGetContactMessagesQuery,
    useGetUnreadCountQuery,
    useDeleteProjectMutation,
    useDeleteSkillMutation,
    useDeleteExperienceMutation,
    useDeleteEducationMutation,
    useDeleteSocialLinkMutation,
    useDeleteContactMessageMutation,
    useMarkAsReadMutation,
    useGetSiteContentQuery,
    useCreateProjectMutation,
    useUpdateProjectMutation,
    useCreateSkillMutation,
    useUpdateSkillMutation,
    useCreateExperienceMutation,
    useUpdateExperienceMutation,
    useCreateEducationMutation,
    useUpdateEducationMutation,
    useCreateSocialLinkMutation,
    useUpdateSocialLinkMutation,
} from '../store/api';

const AdminDashboard: React.FC = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    const [activeTab, setActiveTab] = useState('overview');
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState('');
    const [uploading, setUploading] = useState(false);

    // Show form states
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showSkillForm, setShowSkillForm] = useState(false);
    const [showExperienceForm, setShowExperienceForm] = useState(false);
    const [showEducationForm, setShowEducationForm] = useState(false);
    const [showSocialForm, setShowSocialForm] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);

    // Data fetching
    const { data: projects = [], isLoading: projectsLoading } = useGetProjectsQuery();
    const { data: skills = [], isLoading: skillsLoading } = useGetSkillsQuery();
    const { data: experiences = [], isLoading: experiencesLoading } = useGetExperiencesQuery();
    const { data: education = [], isLoading: educationLoading } = useGetEducationQuery();
    const { data: socialLinks = [], isLoading: socialLinksLoading } = useGetSocialLinksQuery();
    const { data: messages = [], isLoading: messagesLoading } = useGetContactMessagesQuery();
    const { data: unreadCount } = useGetUnreadCountQuery();
    const { data: siteContent = [] } = useGetSiteContentQuery();

    // Mutations
    const [deleteProject] = useDeleteProjectMutation();
    const [deleteSkill] = useDeleteSkillMutation();
    const [deleteExperience] = useDeleteExperienceMutation();
    const [deleteEducation] = useDeleteEducationMutation();
    const [deleteSocialLink] = useDeleteSocialLinkMutation();
    const [deleteMessage] = useDeleteContactMessageMutation();
    const [markAsRead] = useMarkAsReadMutation();
    
    // Create/Update mutations
    const [createProject] = useCreateProjectMutation();
    const [updateProject] = useUpdateProjectMutation();
    const [createSkill] = useCreateSkillMutation();
    const [updateSkill] = useUpdateSkillMutation();
    const [createExperience] = useCreateExperienceMutation();
    const [updateExperience] = useUpdateExperienceMutation();
    const [createEducation] = useCreateEducationMutation();
    const [updateEducation] = useUpdateEducationMutation();
    const [createSocialLink] = useCreateSocialLinkMutation();
    const [updateSocialLink] = useUpdateSocialLinkMutation();

    const handleLogout = () => {
        dispatch(logout());
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append('resume', file);

        setUploading(true);
        setMessage('');

        try {
            const token = localStorage.getItem('token');
            const res = await fetch('/api/assets/resume', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (res.ok) {
                setMessage('Resume uploaded successfully!');
                setFile(null);
            } else {
                setMessage('Failed to upload resume.');
            }
        } catch (err) {
            setMessage('Error uploading file.');
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (type: string, id: string) => {
        if (!confirm(`Are you sure you want to delete this ${type}?`)) return;

        try {
            switch (type) {
                case 'project':
                    await deleteProject(id).unwrap();
                    break;
                case 'skill':
                    await deleteSkill(id).unwrap();
                    break;
                case 'experience':
                    await deleteExperience(id).unwrap();
                    break;
                case 'education':
                    await deleteEducation(id).unwrap();
                    break;
                case 'social':
                    await deleteSocialLink(id).unwrap();
                    break;
                case 'message':
                    await deleteMessage(id).unwrap();
                    break;
            }
        } catch (err) {
            alert(`Failed to delete ${type}`);
        }
    };

    const handleMarkAsRead = async (id: string) => {
        try {
            await markAsRead(id).unwrap();
        } catch (err) {
            alert('Failed to mark message as read');
        }
    };

    // Project form handlers
    const handleProjectSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const projectData = {
            title: formData.get('title')?.toString() || '',
            description: formData.get('description')?.toString() || '',
            imageUrl: formData.get('imageUrl')?.toString() || '',
            projectUrl: formData.get('projectUrl')?.toString() || '',
            liveDemoUrl: formData.get('liveDemoUrl')?.toString() || '',
            githubUrl: formData.get('githubUrl')?.toString() || '',
            tags: formData.get('tags')?.toString().split(',').map(t => t.trim()) || [],
            featured: formData.get('featured') === 'on',
            order: parseInt(formData.get('order')?.toString() || '0'),
        };

        try {
            if (editingItem) {
                await updateProject({ id: editingItem.id, data: projectData }).unwrap();
                setMessage('Project updated successfully!');
            } else {
                await createProject(projectData).unwrap();
                setMessage('Project created successfully!');
            }
            setShowProjectForm(false);
            setEditingItem(null);
        } catch (err) {
            setMessage('Failed to save project');
        }
    };

    // Skill form handlers
    const handleSkillSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const skillData = {
            name: formData.get('name')?.toString() || '',
            icon: formData.get('icon')?.toString() || '',
            category: formData.get('category')?.toString() || 'Frontend',
            level: parseInt(formData.get('level')?.toString() || '80'),
            order: parseInt(formData.get('order')?.toString() || '0'),
        };

        try {
            if (editingItem) {
                await updateSkill({ id: editingItem.id, data: skillData }).unwrap();
                setMessage('Skill updated successfully!');
            } else {
                await createSkill(skillData).unwrap();
                setMessage('Skill created successfully!');
            }
            setShowSkillForm(false);
            setEditingItem(null);
        } catch (err) {
            setMessage('Failed to save skill');
        }
    };

    // Experience form handlers
    const handleExperienceSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const experienceData = {
            title: formData.get('title')?.toString() || '',
            company: formData.get('company')?.toString() || '',
            location: formData.get('location')?.toString() || '',
            startDate: formData.get('startDate')?.toString() || '',
            endDate: formData.get('endDate')?.toString() || undefined,
            current: formData.get('current') === 'on',
            description: formData.get('description')?.toString() || '',
            order: parseInt(formData.get('order')?.toString() || '0'),
        };

        try {
            if (editingItem) {
                await updateExperience({ id: editingItem.id, data: experienceData }).unwrap();
                setMessage('Experience updated successfully!');
            } else {
                await createExperience(experienceData).unwrap();
                setMessage('Experience created successfully!');
            }
            setShowExperienceForm(false);
            setEditingItem(null);
        } catch (err) {
            setMessage('Failed to save experience');
        }
    };

    // Education form handlers
    const handleEducationSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const educationData = {
            degree: formData.get('degree')?.toString() || '',
            institution: formData.get('institution')?.toString() || '',
            location: formData.get('location')?.toString() || '',
            startDate: formData.get('startDate')?.toString() || '',
            endDate: formData.get('endDate')?.toString() || undefined,
            current: formData.get('current') === 'on',
            description: formData.get('description')?.toString() || '',
            order: parseInt(formData.get('order')?.toString() || '0'),
        };

        try {
            if (editingItem) {
                await updateEducation({ id: editingItem.id, data: educationData }).unwrap();
                setMessage('Education updated successfully!');
            } else {
                await createEducation(educationData).unwrap();
                setMessage('Education created successfully!');
            }
            setShowEducationForm(false);
            setEditingItem(null);
        } catch (err) {
            setMessage('Failed to save education');
        }
    };

    // Social link form handlers
    const handleSocialSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const socialData = {
            platform: formData.get('platform')?.toString() || '',
            url: formData.get('url')?.toString() || '',
            icon: formData.get('icon')?.toString() || '',
            order: parseInt(formData.get('order')?.toString() || '0'),
        };

        try {
            if (editingItem) {
                await updateSocialLink({ id: editingItem.id, data: socialData }).unwrap();
                setMessage('Social link updated successfully!');
            } else {
                await createSocialLink(socialData).unwrap();
                setMessage('Social link created successfully!');
            }
            setShowSocialForm(false);
            setEditingItem(null);
        } catch (err) {
            setMessage('Failed to save social link');
        }
    };

    const editItem = (item: any) => {
        setEditingItem(item);
        if (activeTab === 'projects') setShowProjectForm(true);
        if (activeTab === 'skills') setShowSkillForm(true);
        if (activeTab === 'experience') setShowExperienceForm(true);
        if (activeTab === 'education') setShowEducationForm(true);
        if (activeTab === 'social') setShowSocialForm(true);
    };

    const closeForms = () => {
        setShowProjectForm(false);
        setShowSkillForm(false);
        setShowExperienceForm(false);
        setShowEducationForm(false);
        setShowSocialForm(false);
        setEditingItem(null);
        setMessage('');
    };

    const isLoading = projectsLoading || skillsLoading || experiencesLoading || educationLoading || socialLinksLoading || messagesLoading;

    // Form components
    const renderProjectForm = () => (
        <form onSubmit={handleProjectSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Title *</label>
                <input name="title" required defaultValue={editingItem?.title} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white" />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Description *</label>
                <textarea name="description" required defaultValue={editingItem?.description} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white" rows={3} />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Image URL</label>
                <input name="imageUrl" defaultValue={editingItem?.imageUrl} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white" />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Project URL</label>
                <input name="projectUrl" defaultValue={editingItem?.projectUrl} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white" />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Live Demo URL</label>
                <input name="liveDemoUrl" defaultValue={editingItem?.liveDemoUrl} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white" />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">GitHub URL</label>
                <input name="githubUrl" defaultValue={editingItem?.githubUrl} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white" />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Tags (comma separated)</label>
                <input name="tags" defaultValue={editingItem?.tags?.join(', ')} placeholder="React, Node.js, MongoDB" className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white" />
            </div>
            <div className="flex gap-4">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-300 mb-1">Order</label>
                    <input name="order" type="number" defaultValue={editingItem?.order || 0} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white" />
                </div>
                <div className="flex items-center pt-6">
                    <input name="featured" type="checkbox" defaultChecked={editingItem?.featured} className="w-4 h-4 mr-2" />
                    <label className="text-sm text-slate-300">Featured</label>
                </div>
            </div>
            {message && <div className={`p-3 rounded-lg text-sm ${message.includes('success') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{message}</div>}
            <div className="flex gap-2">
                <button type="submit" className="flex-1 py-2 bg-primary hover:bg-cyan-600 text-white rounded-lg font-semibold">
                    {editingItem ? 'Update Project' : 'Create Project'}
                </button>
                <button type="button" onClick={closeForms} className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg">
                    Cancel
                </button>
            </div>
        </form>
    );

    const renderSkillForm = () => (
        <form onSubmit={handleSkillSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Skill Name *</label>
                <input name="name" required defaultValue={editingItem?.name} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white" />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Icon (Material Icons name)</label>
                <input name="icon" defaultValue={editingItem?.icon} placeholder="code" className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white" />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Category *</label>
                <select name="category" required defaultValue={editingItem?.category || 'Frontend'} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white">
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Tools">Tools</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div className="flex gap-4">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-300 mb-1">Level (0-100)</label>
                    <input name="level" type="number" min="0" max="100" defaultValue={editingItem?.level || 80} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white" />
                </div>
                <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-300 mb-1">Order</label>
                    <input name="order" type="number" defaultValue={editingItem?.order || 0} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white" />
                </div>
            </div>
            {message && <div className={`p-3 rounded-lg text-sm ${message.includes('success') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{message}</div>}
            <div className="flex gap-2">
                <button type="submit" className="flex-1 py-2 bg-primary hover:bg-cyan-600 text-white rounded-lg font-semibold">
                    {editingItem ? 'Update Skill' : 'Create Skill'}
                </button>
                <button type="button" onClick={closeForms} className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg">
                    Cancel
                </button>
            </div>
        </form>
    );

    const renderExperienceForm = () => (
        <form onSubmit={handleExperienceSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Job Title *</label>
                <input name="title" required defaultValue={editingItem?.title} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white" />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Company *</label>
                <input name="company" required defaultValue={editingItem?.company} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white" />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Location</label>
                <input name="location" defaultValue={editingItem?.location} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white" />
            </div>
            <div className="flex gap-4">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-300 mb-1">Start Date *</label>
                    <input name="startDate" type="date" required defaultValue={editingItem?.startDate?.split('T')[0]} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white" />
                </div>
                <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-300 mb-1">End Date</label>
                    <input name="endDate" type="date" defaultValue={editingItem?.endDate?.split('T')[0]} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white" disabled={editingItem?.current} />
                </div>
            </div>
            <div className="flex items-center">
                <input name="current" type="checkbox" defaultChecked={editingItem?.current} className="w-4 h-4 mr-2" />
                <label className="text-sm text-slate-300">I currently work here</label>
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Description</label>
                <textarea name="description" defaultValue={editingItem?.description} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white" rows={3} />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Order</label>
                <input name="order" type="number" defaultValue={editingItem?.order || 0} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white" />
            </div>
            {message && <div className={`p-3 rounded-lg text-sm ${message.includes('success') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{message}</div>}
            <div className="flex gap-2">
                <button type="submit" className="flex-1 py-2 bg-primary hover:bg-cyan-600 text-white rounded-lg font-semibold">
                    {editingItem ? 'Update Experience' : 'Create Experience'}
                </button>
                <button type="button" onClick={closeForms} className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg">
                    Cancel
                </button>
            </div>
        </form>
    );

    const renderEducationForm = () => (
        <form onSubmit={handleEducationSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Degree *</label>
                <input name="degree" required defaultValue={editingItem?.degree} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white" />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Institution *</label>
                <input name="institution" required defaultValue={editingItem?.institution} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white" />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Location</label>
                <input name="location" defaultValue={editingItem?.location} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white" />
            </div>
            <div className="flex gap-4">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-300 mb-1">Start Date *</label>
                    <input name="startDate" type="date" required defaultValue={editingItem?.startDate?.split('T')[0]} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white" />
                </div>
                <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-300 mb-1">End Date</label>
                    <input name="endDate" type="date" defaultValue={editingItem?.endDate?.split('T')[0]} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white" disabled={editingItem?.current} />
                </div>
            </div>
            <div className="flex items-center">
                <input name="current" type="checkbox" defaultChecked={editingItem?.current} className="w-4 h-4 mr-2" />
                <label className="text-sm text-slate-300">Currently studying here</label>
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Description</label>
                <textarea name="description" defaultValue={editingItem?.description} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white" rows={3} />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Order</label>
                <input name="order" type="number" defaultValue={editingItem?.order || 0} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white" />
            </div>
            {message && <div className={`p-3 rounded-lg text-sm ${message.includes('success') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{message}</div>}
            <div className="flex gap-2">
                <button type="submit" className="flex-1 py-2 bg-primary hover:bg-cyan-600 text-white rounded-lg font-semibold">
                    {editingItem ? 'Update Education' : 'Create Education'}
                </button>
                <button type="button" onClick={closeForms} className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg">
                    Cancel
                </button>
            </div>
        </form>
    );

    const renderSocialForm = () => (
        <form onSubmit={handleSocialSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Platform *</label>
                <input name="platform" required defaultValue={editingItem?.platform} placeholder="GitHub, LinkedIn, Twitter" className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white" />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">URL *</label>
                <input name="url" required defaultValue={editingItem?.url} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white" />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Icon (Material Icons name)</label>
                <input name="icon" defaultValue={editingItem?.icon} placeholder="code" className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white" />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Order</label>
                <input name="order" type="number" defaultValue={editingItem?.order || 0} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white" />
            </div>
            {message && <div className={`p-3 rounded-lg text-sm ${message.includes('success') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{message}</div>}
            <div className="flex gap-2">
                <button type="submit" className="flex-1 py-2 bg-primary hover:bg-cyan-600 text-white rounded-lg font-semibold">
                    {editingItem ? 'Update Social Link' : 'Create Social Link'}
                </button>
                <button type="button" onClick={closeForms} className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg">
                    Cancel
                </button>
            </div>
        </form>
    );

    return (
        <div className="min-h-screen bg-slate-900 text-white p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8 border-b border-slate-700 pb-4">
                    <div>
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-cyan-400">
                            Admin Dashboard
                        </h1>
                        {user && <p className="text-slate-400 text-sm mt-1">Logged in as {user.email}</p>}
                    </div>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-all text-sm font-semibold border border-red-500/20"
                    >
                        Logout
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 overflow-x-auto">
                    {['overview', 'projects', 'skills', 'experience', 'education', 'social', 'messages', 'content'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => { setActiveTab(tab); closeForms(); }}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
                                activeTab === tab
                                    ? 'bg-primary text-white'
                                    : 'bg-slate-800 text-slate-400 hover:text-white'
                            }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            {tab === 'messages' && unreadCount?.count ? (
                                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                                    {unreadCount.count}
                                </span>
                            ) : null}
                        </button>
                    ))}
                </div>

                {isLoading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
                        <p className="text-slate-400 mt-4">Loading...</p>
                    </div>
                ) : (
                    <>
                        {/* Overview */}
                        {activeTab === 'overview' && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                                    <p className="text-slate-400 text-sm">Projects</p>
                                    <p className="text-3xl font-bold text-primary">{projects.length}</p>
                                </div>
                                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                                    <p className="text-slate-400 text-sm">Skills</p>
                                    <p className="text-3xl font-bold text-primary">{skills.length}</p>
                                </div>
                                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                                    <p className="text-slate-400 text-sm">Experiences</p>
                                    <p className="text-3xl font-bold text-primary">{experiences.length}</p>
                                </div>
                                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                                    <p className="text-slate-400 text-sm">Unread Messages</p>
                                    <p className="text-3xl font-bold text-red-400">{unreadCount?.count || 0}</p>
                                </div>
                            </div>
                        )}

                        {/* Projects */}
                        {activeTab === 'projects' && (
                            <div className="space-y-4">
                                {!showProjectForm ? (
                                    <>
                                        <button
                                            onClick={() => { setShowProjectForm(true); setEditingItem(null); setMessage(''); }}
                                            className="mb-4 px-4 py-2 bg-primary hover:bg-cyan-600 text-white rounded-lg font-semibold"
                                        >
                                            + Add New Project
                                        </button>
                                        <div className="grid gap-4">
                                            {projects.map((project) => (
                                                <div key={project.id} className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex justify-between items-center">
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold">{project.title}</h3>
                                                        <p className="text-slate-400 text-sm">{project.description.slice(0, 50)}...</p>
                                                        <div className="flex gap-2 mt-2">
                                                            {project.liveDemoUrl && <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">Live Demo</span>}
                                                            {project.featured && <span className="text-xs px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded">Featured</span>}
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button onClick={() => editItem(project)} className="text-primary hover:text-cyan-300 px-3 py-1">Edit</button>
                                                        <button onClick={() => handleDelete('project', project.id)} className="text-red-400 hover:text-red-300 px-3 py-1">Delete</button>
                                                    </div>
                                                </div>
                                            ))}
                                            {projects.length === 0 && <p className="text-slate-400">No projects found</p>}
                                        </div>
                                    </>
                                ) : (
                                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                                        <h3 className="text-xl font-semibold mb-4">{editingItem ? 'Edit Project' : 'Add New Project'}</h3>
                                        {renderProjectForm()}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Skills */}
                        {activeTab === 'skills' && (
                            <div className="space-y-4">
                                {!showSkillForm ? (
                                    <>
                                        <button
                                            onClick={() => { setShowSkillForm(true); setEditingItem(null); setMessage(''); }}
                                            className="mb-4 px-4 py-2 bg-primary hover:bg-cyan-600 text-white rounded-lg font-semibold"
                                        >
                                            + Add New Skill
                                        </button>
                                        <div className="grid gap-4">
                                            {skills.map((skill) => (
                                                <div key={skill.id} className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex justify-between items-center">
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold">{skill.name}</h3>
                                                        <p className="text-slate-400 text-sm">{skill.category} - Level: {skill.level}%</p>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button onClick={() => editItem(skill)} className="text-primary hover:text-cyan-300 px-3 py-1">Edit</button>
                                                        <button onClick={() => handleDelete('skill', skill.id)} className="text-red-400 hover:text-red-300 px-3 py-1">Delete</button>
                                                    </div>
                                                </div>
                                            ))}
                                            {skills.length === 0 && <p className="text-slate-400">No skills found</p>}
                                        </div>
                                    </>
                                ) : (
                                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                                        <h3 className="text-xl font-semibold mb-4">{editingItem ? 'Edit Skill' : 'Add New Skill'}</h3>
                                        {renderSkillForm()}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Experience */}
                        {activeTab === 'experience' && (
                            <div className="space-y-4">
                                {!showExperienceForm ? (
                                    <>
                                        <button
                                            onClick={() => { setShowExperienceForm(true); setEditingItem(null); setMessage(''); }}
                                            className="mb-4 px-4 py-2 bg-primary hover:bg-cyan-600 text-white rounded-lg font-semibold"
                                        >
                                            + Add New Experience
                                        </button>
                                        <div className="grid gap-4">
                                            {experiences.map((exp) => (
                                                <div key={exp.id} className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex justify-between items-center">
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold">{exp.title}</h3>
                                                        <p className="text-slate-400 text-sm">{exp.company} {exp.current && <span className="text-green-400">(Current)</span>}</p>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button onClick={() => editItem(exp)} className="text-primary hover:text-cyan-300 px-3 py-1">Edit</button>
                                                        <button onClick={() => handleDelete('experience', exp.id)} className="text-red-400 hover:text-red-300 px-3 py-1">Delete</button>
                                                    </div>
                                                </div>
                                            ))}
                                            {experiences.length === 0 && <p className="text-slate-400">No experiences found</p>}
                                        </div>
                                    </>
                                ) : (
                                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                                        <h3 className="text-xl font-semibold mb-4">{editingItem ? 'Edit Experience' : 'Add New Experience'}</h3>
                                        {renderExperienceForm()}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Education */}
                        {activeTab === 'education' && (
                            <div className="space-y-4">
                                {!showEducationForm ? (
                                    <>
                                        <button
                                            onClick={() => { setShowEducationForm(true); setEditingItem(null); setMessage(''); }}
                                            className="mb-4 px-4 py-2 bg-primary hover:bg-cyan-600 text-white rounded-lg font-semibold"
                                        >
                                            + Add New Education
                                        </button>
                                        <div className="grid gap-4">
                                            {education.map((edu) => (
                                                <div key={edu.id} className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex justify-between items-center">
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold">{edu.degree}</h3>
                                                        <p className="text-slate-400 text-sm">{edu.institution} {edu.current && <span className="text-green-400">(Current)</span>}</p>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button onClick={() => editItem(edu)} className="text-primary hover:text-cyan-300 px-3 py-1">Edit</button>
                                                        <button onClick={() => handleDelete('education', edu.id)} className="text-red-400 hover:text-red-300 px-3 py-1">Delete</button>
                                                    </div>
                                                </div>
                                            ))}
                                            {education.length === 0 && <p className="text-slate-400">No education found</p>}
                                        </div>
                                    </>
                                ) : (
                                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                                        <h3 className="text-xl font-semibold mb-4">{editingItem ? 'Edit Education' : 'Add New Education'}</h3>
                                        {renderEducationForm()}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Social Links */}
                        {activeTab === 'social' && (
                            <div className="space-y-4">
                                {!showSocialForm ? (
                                    <>
                                        <button
                                            onClick={() => { setShowSocialForm(true); setEditingItem(null); setMessage(''); }}
                                            className="mb-4 px-4 py-2 bg-primary hover:bg-cyan-600 text-white rounded-lg font-semibold"
                                        >
                                            + Add New Social Link
                                        </button>
                                        <div className="grid gap-4">
                                            {socialLinks.map((link) => (
                                                <div key={link.id} className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex justify-between items-center">
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold">{link.platform}</h3>
                                                        <p className="text-slate-400 text-sm">{link.url}</p>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button onClick={() => editItem(link)} className="text-primary hover:text-cyan-300 px-3 py-1">Edit</button>
                                                        <button onClick={() => handleDelete('social', link.id)} className="text-red-400 hover:text-red-300 px-3 py-1">Delete</button>
                                                    </div>
                                                </div>
                                            ))}
                                            {socialLinks.length === 0 && <p className="text-slate-400">No social links found</p>}
                                        </div>
                                    </>
                                ) : (
                                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                                        <h3 className="text-xl font-semibold mb-4">{editingItem ? 'Edit Social Link' : 'Add New Social Link'}</h3>
                                        {renderSocialForm()}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Messages */}
                        {activeTab === 'messages' && (
                            <div className="grid gap-4">
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`bg-slate-800 p-4 rounded-xl border border-slate-700 ${!msg.read ? 'border-l-4 border-l-primary' : ''}`}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-semibold">{msg.name}</h3>
                                                <p className="text-slate-400 text-sm">{msg.email}</p>
                                                {msg.subject && <p className="text-primary text-sm mt-1">{msg.subject}</p>}
                                                <p className="mt-2">{msg.message}</p>
                                                <p className="text-slate-500 text-xs mt-2">
                                                    {new Date(msg.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className="flex gap-2">
                                                {!msg.read && (
                                                    <button
                                                        onClick={() => handleMarkAsRead(msg.id)}
                                                        className="text-primary hover:text-cyan-300 text-sm"
                                                    >
                                                        Mark Read
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleDelete('message', msg.id)}
                                                    className="text-red-400 hover:text-red-300"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {messages.length === 0 && <p className="text-slate-400">No messages found</p>}
                            </div>
                        )}

                        {/* Content */}
                        {activeTab === 'content' && (
                            <div className="grid gap-4">
                                {siteContent.map((content) => (
                                    <div key={content.key} className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                                        <h3 className="font-semibold text-primary">{content.key}</h3>
                                        <p className="text-slate-300 mt-1">{content.value}</p>
                                    </div>
                                ))}
                                {siteContent.length === 0 && <p className="text-slate-400">No content found</p>}
                            </div>
                        )}

                        {/* Resume Upload Section */}
                        <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-xl max-w-xl mx-auto mt-8">
                            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                <span className="material-icons text-primary">upload_file</span>
                                Update Resume
                            </h2>

                            <form onSubmit={handleUpload} className="space-y-6">
                                <div className="border-2 border-dashed border-slate-600 rounded-xl p-8 text-center hover:border-primary/50 transition-colors group cursor-pointer relative">
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        onChange={handleFileChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <div className="flex flex-col items-center gap-3">
                                        <span className="material-icons text-4xl text-slate-500 group-hover:text-primary transition-colors">cloud_upload</span>
                                        <p className="text-slate-400 group-hover:text-slate-200 transition-colors font-medium">
                                            {file ? file.name : "Drag & drop or click to select PDF"}
                                        </p>
                                    </div>
                                </div>

                                {message && !showProjectForm && !showSkillForm && !showExperienceForm && !showEducationForm && !showSocialForm && (
                                    <div className={`p-4 rounded-lg text-sm font-medium ${message.includes('success') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                        {message}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={!file || uploading}
                                    className={`w-full py-3 rounded-xl font-bold transition-all ${!file || uploading
                                            ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                                            : 'bg-primary hover:bg-cyan-600 text-white shadow-lg shadow-primary/25'
                                        }`}
                                >
                                    {uploading ? 'Uploading...' : 'Upload Resume'}
                                </button>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
