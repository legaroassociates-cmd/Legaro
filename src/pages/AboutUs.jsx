
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Target, Eye, Shield, Award, Users, ArrowRight, Gavel, CheckCircle, ShieldCheck } from 'lucide-react';

const LawyerCard = ({ lawyer }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate();

    const handleBookNow = () => {
        // Convert name to URL-friendly string format if needed, 
        // essentially passing it to the booking page
        navigate(`/book-consultation?lawyer=${encodeURIComponent(lawyer.name)}`);
    };

    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all hover:scale-[1.02] duration-300 flex flex-col md:flex-row group h-full">
            {/* Image Container */}
            <div className="md:w-2/5 relative overflow-hidden h-64 md:h-auto bg-gray-100 shrink-0">
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
                    <p className="text-gold-dark text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis">{lawyer.title}</p>
                </div>

                <div className="mb-6 relative">
                    <p className={`text-gray-600 text-sm leading-relaxed text-justify ${!isExpanded ? 'line-clamp-3' : ''}`}>
                        {lawyer.bio}
                    </p>
                    {lawyer.bio.length > 150 && (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-gold hover:text-navy text-xs font-bold mt-1 focus:outline-none transition-colors"
                        >
                            {isExpanded ? 'Read Less' : 'Read More'}
                        </button>
                    )}
                </div>

                <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {lawyer.specialization.slice(0, 3).map((spec, idx) => (
                            <span key={idx} className="bg-gray-100 text-navy text-[10px] px-2 py-1 rounded">
                                {spec}
                            </span>
                        ))}
                    </div>

                    <button
                        onClick={handleBookNow}
                        className="w-full bg-navy text-white py-2.5 rounded-lg text-sm font-bold hover:bg-gold hover:text-navy transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-md"
                    >
                        Book Appointment <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
};

import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const AboutUs = () => {
    const [lawyers, setLawyers] = useState([]);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        const fetchLawyers = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "lawyers"));
                const fetchedLawyers = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                // Optional: Sort by experience or specific order if needed
                setLawyers(fetchedLawyers);
            } catch (error) {
                console.error("Error fetching lawyers:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLawyers();
    }, []);

    return (
        <div className="min-h-screen bg-[#FDFBF7]">
            {/* Hero Section */}
            <div className="bg-navy text-white text-center py-24 px-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

                <h1 className="text-4xl md:text-6xl font-serif font-bold mb-8 animate-fade-in-up leading-tight">
                    More Than Just Legal Advice, <br />
                    <span className="text-gold">We Are Your Strategic Partners.</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-100 font-light">
                    From complex litigation to seamless documentation, Legaro bridges the gap between your legal needs and expert solutions. We believe in improved access, absolute transparency, and a partner-led approach to securing your rights.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 space-y-20 py-20 animate-fade-in">

                {/* Team Section (Moved Up) */}
                <div>
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-gold/10 text-gold-dark px-5 py-2 rounded-full text-sm font-bold mb-6 tracking-wide uppercase">
                            <ShieldCheck size={16} /> Verified Partners
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif text-navy mb-6">The Minds Behind Legaro</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                            Distinguished legal professionals with decades of experience, dedicated to securing your rights and shaping your success.
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {lawyers.map((lawyer) => (
                                <LawyerCard key={lawyer.id} lawyer={lawyer} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Mission & Vision Grid (Moved Down) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:border-gold/30 hover:scale-[1.02] transition-all duration-300 group">
                        <div className="w-16 h-16 bg-navy/5 rounded-2xl flex items-center justify-center text-navy mb-8 group-hover:bg-navy group-hover:text-gold transition-colors">
                            <Target size={32} />
                        </div>
                        <h2 className="text-3xl font-serif text-navy mb-4">Our Mission</h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            To dismantle barriers to high-quality legal services. We strive to make expert counsel accessible, affordable, and understandable for every Indian citizen, simplifying the complex to provide you with peace of mind.
                        </p>
                    </div>

                    <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:border-gold/30 hover:scale-[1.02] transition-all duration-300 group">
                        <div className="w-16 h-16 bg-navy/5 rounded-2xl flex items-center justify-center text-navy mb-8 group-hover:bg-navy group-hover:text-gold transition-colors">
                            <Eye size={32} />
                        </div>
                        <h2 className="text-3xl font-serif text-navy mb-4">Our Vision</h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            To orchestrate a digital ecosystem where justice is just a click away. We envision a society empowered by legal knowledge, where trust and technology converge to protect what matters most to you.
                        </p>
                    </div>
                </div>

                {/* Core Values */}
                <div>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-serif text-navy mb-4">Our Core Values</h2>
                        <div className="w-24 h-1 bg-gold mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-8 bg-white rounded-2xl border border-transparent hover:border-gray-100 hover:shadow-lg hover:scale-105 transition-all duration-300 group">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gold group-hover:bg-navy group-hover:scale-110 transition-all duration-300">
                                <Shield size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-navy mb-3">Integrity First</h3>
                            <p className="text-gray-600">
                                We uphold the highest standards of ethics and honesty. Your trust is our most valuable asset.
                            </p>
                        </div>
                        <div className="text-center p-8 bg-white rounded-2xl border border-transparent hover:border-gray-100 hover:shadow-lg hover:scale-105 transition-all duration-300 group">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gold group-hover:bg-navy group-hover:scale-110 transition-all duration-300">
                                <Award size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-navy mb-3">Excellence</h3>
                            <p className="text-gray-600">
                                We partner with only the best legal minds to ensure you receive top-tier representation and advice.
                            </p>
                        </div>
                        <div className="text-center p-8 bg-white rounded-2xl border border-transparent hover:border-gray-100 hover:shadow-lg hover:scale-105 transition-all duration-300 group">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gold group-hover:bg-navy group-hover:scale-110 transition-all duration-300">
                                <Users size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-navy mb-3">Client Centric</h3>
                            <p className="text-gray-600">
                                Your needs drive us. We listen, understand, and tailor our solutions to your specific situation.
                            </p>
                        </div>
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
                            <Link to="/contact" className="inline-flex items-center gap-2 bg-gold text-navy font-bold px-8 py-3 rounded-full hover:bg-white transition-colors">
                                Talk to Us <ArrowRight size={20} />
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
