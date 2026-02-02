import React, { useState } from 'react';
import { CheckCircle, Users, TrendingUp, ShieldCheck } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Partner = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        licenseNo: '',
        mobile: '',
        email: '',
        city: '',
        experience: '',
        specialization: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await addDoc(collection(db, "partners"), {
                ...formData,
                createdAt: serverTimestamp(),
                status: 'new'
            });
            alert("Application submitted successfully! We will contact you shortly.");
            setFormData({
                fullName: '',
                licenseNo: '',
                mobile: '',
                email: '',
                city: '',
                experience: '',
                specialization: ''
            });
        } catch (error) {
            console.error("Error adding document: ", error);
            alert("Error submitting application. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex flex-col lg:flex-row bg-cream">

            {/* LEFT SIDE - The Pitch (Premium Dark Theme) */}
            <div className="lg:w-5/12 bg-navy text-white p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden">
                {/* Background Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/assets/hero-image.png')] opacity-10 bg-cover bg-center pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold opacity-10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>

                <div className="relative z-10">
                    <h4 className="text-gold font-bold tracking-widest uppercase mb-4 text-sm">Join Legaro.in</h4>
                    <h1 className="text-4xl lg:text-5xl font-serif mb-6 leading-tight">
                        Elevate Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-[#F3E5AB]">Legal Practice</span>
                    </h1>

                    <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                        Join Tamil Nadu's fastest-growing digital legal platform. We connect you with verified clients while you focus on what matters most—practicing law.
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gold shrink-0">
                                <Users size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Verified Clients</h3>
                                <p className="text-sm text-gray-400">Pre-screened clients matching your specialization.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gold shrink-0">
                                <ShieldCheck size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Guaranteed Payments</h3>
                                <p className="text-sm text-gray-400">Secure escrow payments for consultations.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gold shrink-0">
                                <TrendingUp size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Practice Growth</h3>
                                <p className="text-sm text-gray-400">Digital presence and reputation management.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE - The Form */}
            <div className="lg:w-7/12 p-6 lg:p-12 flex items-center justify-center bg-cream">
                <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                    <h2 className="text-2xl font-serif text-navy mb-2">Partner Application</h2>
                    <p className="text-gray-500 mb-6 text-sm">Fill in your details to schedule an interview with our panel.</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Full Name</label>
                                <input
                                    name="fullName" value={formData.fullName} onChange={handleChange} required
                                    type="text" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-gold focus:ring-0 outline-none transition-all" placeholder="Adv. Name"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Bar License No.</label>
                                <input
                                    name="licenseNo" value={formData.licenseNo} onChange={handleChange} required
                                    type="text" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-gold focus:ring-0 outline-none transition-all" placeholder="TN/XXXX/YYYY"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Mobile Number</label>
                                <input
                                    name="mobile" value={formData.mobile} onChange={handleChange} required
                                    type="tel" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-gold focus:ring-0 outline-none transition-all" placeholder="+91 98765 43210"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Email Address</label>
                                <input
                                    name="email" value={formData.email} onChange={handleChange} required
                                    type="email" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-gold focus:ring-0 outline-none transition-all" placeholder="lawyer@example.com"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">City of Practice</label>
                                <input
                                    name="city" value={formData.city} onChange={handleChange} required
                                    type="text" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-gold focus:ring-0 outline-none transition-all" placeholder="e.g. Chennai"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Experience (Years)</label>
                                <select
                                    name="experience" value={formData.experience} onChange={handleChange} required
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-gold focus:ring-0 outline-none transition-all"
                                >
                                    <option value="">Select...</option>
                                    <option value="0-3">0-3 Years</option>
                                    <option value="3-5">3-5 Years</option>
                                    <option value="5-10">5-10 Years</option>
                                    <option value="10+">10+ Years</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Primary Specialization</label>
                            <select
                                name="specialization" value={formData.specialization} onChange={handleChange} required
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-gold focus:ring-0 outline-none transition-all"
                            >
                                <option value="">Select Specialization...</option>
                                <option value="civil">Civil Litigation</option>
                                <option value="criminal">Criminal Defense</option>
                                <option value="corporate">Corporate Law</option>
                                <option value="family">Family/Divorce</option>
                                <option value="property">Property/Real Estate</option>
                            </select>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-navy text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-2xl hover:bg-[#2a344a] transition-all transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Submitting...' : 'Apply for Partnership'}
                            </button>
                            <p className="text-center text-xs text-gray-400 mt-3">
                                By applying, you agree to our Terms of Service & Lawyer Code of Conduct.
                            </p>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Partner;
