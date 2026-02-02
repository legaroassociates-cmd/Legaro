
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Lock, User } from 'lucide-react';

const AdminLogin = () => {
    const [adminId, setAdminId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const hashPassword = async (password) => {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hash = await crypto.subtle.digest('SHA-256', data);
        return Array.from(new Uint8Array(hash))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const hashedPassword = await hashPassword(password);

            // Query DB for this Admin ID
            const q = query(collection(db, 'admins'), where('adminId', '==', adminId));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                throw new Error("Invalid Admin ID");
            }

            const adminData = querySnapshot.docs[0].data();

            if (adminData.password === hashedPassword) {
                // Success!
                sessionStorage.setItem('legaro_admin_session', 'true');
                // Cleanup old local storage if exists
                localStorage.removeItem('legaro_admin_session');
                navigate('/admin/dashboard');
            } else {
                throw new Error("Invalid Password");
            }

        } catch (err) {
            console.error(err);
            setError("Invalid Admin ID or Password.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-navy flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-serif text-navy font-bold mb-2">Admin Panel</h1>
                    <p className="text-gray-500 text-sm">Legaro.in Secure Access</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 text-center border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Admin ID</label>
                        <div className="relative">
                            <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
                            <input
                                type="text"
                                value={adminId}
                                onChange={(e) => setAdminId(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all"
                                placeholder="Enter Admin ID"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gold text-navy font-bold py-3 rounded-lg hover:bg-gold-dark transition-colors shadow-lg disabled:opacity-70"
                    >
                        {isLoading ? 'Signing In...' : 'Login to Dashboard'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <a href="/" className="text-sm text-gray-400 hover:text-navy">Back to Website</a>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
