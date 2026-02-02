
import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Eye, Shield, Award, Users, ArrowRight, Gavel, CheckCircle, ShieldCheck } from 'lucide-react';
import { lawyersData } from '../data/lawyers';

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-[#FDFBF7]">
            {/* Hero Section */}
            <div className="bg-navy text-white text-center py-20 px-4">
                <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 animate-fade-in-up">
                    We Are <span className="text-gold">Legaro.in</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-100">
                    Democratizing legal access in India. We bridge the gap between people and expert legal assistance through technology and transparency.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 space-y-20 py-20 animate-fade-in">

                {/* Mission & Vision Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-gold/30 transition-all">
                        <div className="w-14 h-14 bg-navy/5 rounded-full flex items-center justify-center text-navy mb-6">
                            <Target size={32} />
                        </div>
                        <h2 className="text-3xl font-serif text-navy mb-4">Our Mission</h2>
                        <p className="text-gray-600 leading-relaxed">
                            To make high-quality legal services accessible, affordable, and understandable for every Indian citizen. We strive to simplify complex legal procedures and provide peace of mind through expert guidance.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-gold/30 transition-all">
                        <div className="w-14 h-14 bg-navy/5 rounded-full flex items-center justify-center text-navy mb-6">
                            <Eye size={32} />
                        </div>
                        <h2 className="text-3xl font-serif text-navy mb-4">Our Vision</h2>
                        <p className="text-gray-600 leading-relaxed">
                            To be the most trusted legal technology platform in India, creating a ecosystem where legal justice is just a click away, fostering a society empowered by legal knowledge and support.
                        </p>
                    </div>
                </div>

                {/* Core Values */}
                <div>
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-serif text-navy mb-4">Our Core Values</h2>
                        <div className="w-24 h-1 bg-gold mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6 group">
                            <div className="w-16 h-16 bg-white border border-gray-100 shadow-md rounded-full flex items-center justify-center mx-auto mb-6 text-gold group-hover:scale-110 transition-transform">
                                <Shield size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-navy mb-3">Integrity First</h3>
                            <p className="text-gray-600 text-sm">
                                We uphold the highest standards of ethics and honesty. Your trust is our most valuable asset.
                            </p>
                        </div>
                        <div className="text-center p-6 group">
                            <div className="w-16 h-16 bg-white border border-gray-100 shadow-md rounded-full flex items-center justify-center mx-auto mb-6 text-gold group-hover:scale-110 transition-transform">
                                <Award size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-navy mb-3">Excellence</h3>
                            <p className="text-gray-600 text-sm">
                                We partner with only the best legal minds to ensure you receive top-tier representation and advice.
                            </p>
                        </div>
                        <div className="text-center p-6 group">
                            <div className="w-16 h-16 bg-white border border-gray-100 shadow-md rounded-full flex items-center justify-center mx-auto mb-6 text-gold group-hover:scale-110 transition-transform">
                                <Users size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-navy mb-3">Client Centric</h3>
                            <p className="text-gray-600 text-sm">
                                Your needs drive us. We listen, understand, and tailor our solutions to your specific situation.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Meet Our Expert Counsel */}
                <div>
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-gold/10 text-gold-dark px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                            <ShieldCheck size={16} /> Verified Partners
                        </div>
                        <h2 className="text-4xl font-serif text-navy mb-4">Meet Our Expert Counsel</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Distinguished legal professionals with decades of experience, dedicated to securing your rights.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {lawyersData.map((lawyer) => (
                            <div key={lawyer.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all flex flex-col md:flex-row group">
                                {/* Image Container */}
                                <div className="md:w-2/5 relative overflow-hidden h-64 md:h-auto bg-gray-100">
                                    <img
                                        src={lawyer.image}
                                        alt={lawyer.name}
                                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 left-4 bg-navy/90 text-white text-xs font-bold px-3 py-1 rounded backdrop-blur-sm">
                                        {lawyer.experience} Exp.
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 md:w-3/5 flex flex-col">
                                    <div className="mb-4">
                                        <h3 className="text-xl font-bold text-navy leading-tight mb-1">{lawyer.name}</h3>
                                        <p className="text-gold-dark text-sm font-medium">{lawyer.title}</p>
                                    </div>

                                    <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                                        {lawyer.bio}
                                    </p>

                                    <div className="mt-auto">
                                        <p className="text-xs font-bold text-gray-400 uppercase mb-2">Key Areas</p>
                                        <div className="flex flex-wrap gap-2">
                                            {lawyer.specialization.slice(0, 3).map((spec, idx) => (
                                                <span key={idx} className="bg-gray-100 text-navy text-xs px-2 py-1 rounded">
                                                    {spec}
                                                </span>
                                            ))}
                                            {lawyer.specialization.length > 3 && (
                                                <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded">
                                                    +{lawyer.specialization.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Why Choose Us */}
                <div className="bg-navy rounded-3xl p-10 md:p-16 text-white relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 opacity-5 pointer-events-none">
                        <Gavel size={400} />
                    </div>

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Why Legaro?</h2>
                            <p className="text-gray-300 mb-8 text-lg">
                                We combine the wisdom of experienced lawyers with the efficiency of modern technology.
                            </p>
                            <Link to="/book-consultation" className="inline-flex items-center gap-2 bg-gold text-navy font-bold px-8 py-3 rounded-full hover:bg-white transition-colors">
                                Get Started <ArrowRight size={20} />
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {[
                                "Verified Expert Lawyers",
                                "Transparent, Fixed Pricing",
                                "100% Confidential & Secure",
                                "Timely Updates & Support",
                                "Digital-First Documentation"
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-4 bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                                    <CheckCircle className="text-gold shrink-0" size={24} />
                                    <span className="font-medium text-lg">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AboutUs;
