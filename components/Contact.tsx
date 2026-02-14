import React, { useState } from 'react';
import { useSubmitContactMutation } from '../src/store/api';

const Contact: React.FC = () => {
  const [submitContact, { isLoading }] = useSubmitContactMutation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: null, message: '' });

    try {
      await submitContact(formData).unwrap();
      setStatus({ type: 'success', message: 'Message sent successfully!' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-12 relative overflow-hidden bg-slate-50 dark:bg-slate-900/50">
      <div className="hidden lg:block absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
        <div className="space-y-8 text-center lg:text-left">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
              Let's Build <br className="hidden sm:block" /> <span className="text-primary">Something Together</span>
            </h2>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-md mx-auto lg:mx-0 leading-relaxed">
              I'm open to new opportunities, collaborations, or just a technical chat. Let's make something amazing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
            <a href="mailto:aayush.niroula@gmail.com" className="group flex items-center p-4 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-primary/50 transition-all duration-300 text-left">
              <div className="p-3 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <span className="material-icons">email</span>
              </div>
              <div className="ml-4 min-w-0">
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Email Me</p>
                <p className="text-sm md:text-base font-bold text-slate-900 dark:text-white truncate">ayushniroula644@gmail.com</p>
              </div>
            </a>
            <div className="group flex items-center p-4 bglate-800/50 border border-slate-200 dark-white dark:bg-s:border-slate-700 rounded-xl text-left">
              <div className="p-3 bg-primary/10 rounded-lg text-primary">
                <span className="material-icons">location_on</span>
              </div>
              <div className="ml-4">
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Based in</p>
                <p className="text-sm md:text-base font-bold text-slate-900 dark:text-white">Letang,Morang,Nepal</p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mb-6 uppercase tracking-[0.2em]">Connect with me</p>
            <div className="flex justify-center lg:justify-start gap-4">
              <a href="https://github.com/aayush-niroula" target="_blank" className="w-12 h-12 flex items-center justify-center rounded-xl bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-primary hover:text-white transition-all shadow-sm border border-slate-100 dark:border-slate-700">
                <span className="material-icons">terminal</span>
              </a>
              <a href="#" className="w-12 h-12 flex items-center justify-center rounded-xl bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-primary hover:text-white transition-all shadow-sm border border-slate-100 dark:border-slate-700">
                <span className="material-icons">link</span>
              </a>
            </div>
          </div>
        </div>

        <div className="relative group mt-8 lg:mt-0">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10 border border-slate-100 dark:border-slate-800">
            <form className="space-y-5 md:space-y-6" onSubmit={handleSubmit}>
              {status.message && (
                <div className={`p-4 rounded-lg text-sm font-medium ${status.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {status.message}
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Your Name</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                    placeholder="Enter name"
                    type="text"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Your Email</label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                    placeholder="Email address"
                    type="email"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Category</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none appearance-none"
                >
                  <option value="">Select a category</option>
                  <option value="Project Inquiry">Project Inquiry</option>
                  <option value="Collaboration">Collaboration</option>
                  <option value="General Message">General Message</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none resize-none"
                  placeholder="Write your message here..."
                  rows={4}
                  required
                ></textarea>
              </div>
              <button
                className="w-full py-4 px-6 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-base md:text-lg shadow-lg shadow-primary/30 active:scale-95 transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={isLoading}
              >
                <span>{isLoading ? 'Sending...' : 'Send Message'}</span>
                <span className="material-icons text-base md:text-xl">send</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
