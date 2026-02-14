import * as React from 'react';
import { useState } from 'react';
import { useLoginMutation } from '../store/api';
import { useAppDispatch } from '../store/hooks';
import { setCredentials } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

const AdminLogin: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        try {
            const result = await login({ email, password }).unwrap();
            dispatch(setCredentials({
                token: result.token,
                user: result.admin
            }));
            navigate('/admin');
        } catch (err: any) {
            setError(err.data?.error || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white">
            <div className="bg-slate-800 p-8 rounded-xl shadow-lg w-full max-w-md border border-slate-700">
                <h2 className="text-2xl font-bold mb-6 text-center text-primary">Admin Access</h2>
                {error && <p className="text-red-500 mb-4 text-sm text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-slate-400">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-white"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-slate-400">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-white"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-primary hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition-colors mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
