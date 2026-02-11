import React, { useState } from 'react';
import { db, storage } from '../firebase';
import { collection, query, where, getDocs, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { Shield, User, Calendar, Briefcase, Phone, Mail, Upload, CheckCircle } from 'lucide-react';

const PartnerOnboarding = () => {
    const [step, setStep] = useState(1); // 1: Login, 2: Form, 3: Success
    const navigate = useNavigate();

    // Login State
    const [loginData, setLoginData] = useState({ firstName: '', dob: '' });
    const [loading, setLoading] = useState(false);
    const [partnerData, setPartnerData] = useState(null); // Validated partner

    // Registration Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        bio: '',
        experience: '',
        specialization: [],
        title: '',
        image: null
    });

    const specializationsList = [
        'Corporate Law', 'Family Law', 'Criminal Defense', 'Property & Real Estate',
        'Intellectual Property', 'Banking & Finance', 'Labor & Employment', 'Taxation',
        'Cyber Law', 'Consumer Protection', 'Startup Advisory', 'Others'
    ];

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Normalize inputs
            const firstName = loginData.firstName.trim().toLowerCase();
            const dob = loginData.dob.trim(); // YYYY-MM-DD or whatever format admin entered

            // Query logic: Since we don't have exact first name field in DB, we fetch potentially matching partners
            // This is slightly inefficient but safe for low volume
            // We look for partners with status 'onboarding_sent' or 'interview_scheduled' (if hired immediately)
            // But strict check is 'onboarding_sent'.

            const q = query(
                collection(db, 'partners'),
                where('status', 'in', ['onboarding_sent', 'onboarding'])
            );

            const snap = await getDocs(q);
            let foundPartner = null;

            snap.docs.forEach(doc => {
                const data = doc.data();
                if (!data.name || !data.dob) return;

                // key check
                const dbFirstName = data.name.split(' ')[0].toLowerCase();
                if (dbFirstName === firstName && data.dob === dob) {
                    foundPartner = { id: doc.id, ...data };
                }
            });

            if (foundPartner) {
                setPartnerData(foundPartner);
                setFormData(prev => ({
                    ...prev,
                    name: foundPartner.name,
                    email: foundPartner.email,
                    phone: foundPartner.phone,
                    // Pre-fill others if available
                }));
                setStep(2);
            } else {
                alert("Invalid Credentials. Please check your First Name and Date of Birth (YYYY-MM-DD) as provided in your application.");
            }

        } catch (error) {
            console.error("Login Error:", error);
            alert("An error occurred during verification.");
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (file) => {
        if (!file) return null;
        const storageRef = ref(storage, `lawyers/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
        return await getDownloadURL(storageRef);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.title || !formData.experience) {
            alert("Please fill all required fields.");
            return;
        }

        setLoading(true);
        try {
            // Upload Image if present
            let imageUrl = '';
            if (formData.image) {
                imageUrl = await handleFileUpload(formData.image);
            }

            // Create Lawyer Profile
            await addDoc(collection(db, 'lawyers'), {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                bio: formData.bio,
                experience: formData.experience,
                specialization: formData.specialization,
                title: formData.title,
                image: imageUrl,
                priority: 0,
                status: 'active',
                createdAt: serverTimestamp(),
                partnerId: partnerData.id // Link to partner app
            });

            // Update Partner Status
            await updateDoc(doc(db, 'partners', partnerData.id), {
                status: 'onboarded',
                onboardedAt: serverTimestamp()
            });

            setStep(3);
        } catch (error) {
            console.error("Submission Error:", error);
            alert("Failed to submit profile. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const toggleSpec = (spec) => {
        setFormData(prev => {
            if (prev.specialization.includes(spec)) {
                return { ...prev, specialization: prev.specialization.filter(s => s !== spec) };
            } else {
                return { ...prev, specialization: [...prev.specialization, spec] };
            }
        });
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-6 text-navy font-sans">
            {/* Header */}
            <div className="text-center mb-10 animate-fade-in">
                <div className="flex items-center justify-center gap-2 mb-4">
                    <Shield className="text-gold" size={40} />
                    <span className="text-3xl font-serif font-bold tracking-tight">Legaro<span className="text-gold">.in</span></span>
                </div>
                <h1 className="text-2xl font-bold">Partner Onboarding Portal</h1>
                <p className="text-gray-500 mt-2">Welcome to the team. Let's set up your profile.</p>
            </div>

            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-8 lg:p-12 border border-gray-100 relative overflow-hidden animate-slide-up">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-navy to-gold"></div>

                {step === 1 && (
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-3 text-sm text-blue-800 mb-6">
                            <User size={20} className="shrink-0" />
                            <p>Please enter your First Name and Date of Birth as provided in your application to access the onboarding form.</p>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">First Name</label>
                            <input
                                type="text"
                                className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all font-medium"
                                placeholder="e.g. Rahul"
                                value={loginData.firstName}
                                onChange={e => setLoginData({ ...loginData, firstName: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">Date of Birth (YYYY-MM-DD)</label>
                            <input
                                type="date"
                                className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all font-medium"
                                value={loginData.dob}
                                onChange={e => setLoginData({ ...loginData, dob: e.target.value })}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-navy text-white font-bold rounded-xl hover:bg-gold hover:text-navy transition-all shadow-lg transform active:scale-95 disabled:opacity-50"
                        >
                            {loading ? 'Verifying...' : 'Access Portal'}
                        </button>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">Full Name</label>
                                <input
                                    type="text"
                                    className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">Professional Title</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Senior Advocate"
                                    className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-gold"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">Years of Experience</label>
                                <input
                                    type="text"
                                    placeholder="e.g. 8 Years"
                                    className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-gold"
                                    value={formData.experience}
                                    onChange={e => setFormData({ ...formData, experience: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">Contact Email</label>
                                <input
                                    type="email"
                                    className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-gold"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">Bio / Summary</label>
                            <textarea
                                className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-gold h-24"
                                placeholder="Brief introduction related to your expertise..."
                                value={formData.bio}
                                onChange={e => setFormData({ ...formData, bio: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">Areas of Specialization</label>
                            <div className="flex flex-wrap gap-2">
                                {specializationsList.map(spec => (
                                    <button
                                        key={spec}
                                        type="button"
                                        onClick={() => toggleSpec(spec)}
                                        className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${formData.specialization.includes(spec)
                                                ? 'bg-navy text-white border-navy'
                                                : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
                                            }`}
                                    >
                                        {spec}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">Profile Photo</label>
                            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                                <input
                                    type="file"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={e => setFormData({ ...formData, image: e.target.files[0] })}
                                    accept="image/*"
                                />
                                {formData.image ? (
                                    <div className="flex items-center justify-center gap-2 text-green-600 font-bold">
                                        <CheckCircle size={20} />
                                        {formData.image.name}
                                    </div>
                                ) : (
                                    <div className="text-gray-400 flex flex-col items-center gap-2">
                                        <Upload size={24} />
                                        <span>Click to upload profile picture</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-navy text-white font-bold rounded-xl hover:bg-gold hover:text-navy transition-all shadow-lg transform active:scale-95 disabled:opacity-50 mt-4"
                        >
                            {loading ? 'Submitting Profile...' : 'Complete Onboarding'}
                        </button>
                    </form>
                )}

                {step === 3 && (
                    <div className="text-center py-12">
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                            <CheckCircle size={40} />
                        </div>
                        <h2 className="text-3xl font-serif font-bold text-navy mb-4">Welcome Aboard!</h2>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">
                            Your profile has been successfully created. You are now officially a Partner at Legaro Associates.
                            Our admin team will reach out shortly for orientation.
                        </p>
                        <button
                            onClick={() => navigate('/')}
                            className="px-8 py-3 bg-navy text-white font-bold rounded-xl hover:bg-gold hover:text-navy transition-colors"
                        >
                            Go to Home
                        </button>
                    </div>
                )}
            </div>

            <p className="mt-8 text-xs text-gray-400">&copy; {new Date().getFullYear()} Legaro Associates. All rights reserved.</p>
        </div>
    );
};

export default PartnerOnboarding;
