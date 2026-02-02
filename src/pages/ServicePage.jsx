
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    Check, ChevronRight, User, Mail, Phone, Calendar,
    ArrowRight, Star, Shield, Clock, Scale
} from 'lucide-react';
import { serviceDetails, defaultService } from '../data/serviceDetails';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const ServicePage = () => {
    const { id } = useParams();
    const [service, setService] = useState(defaultService);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (id && serviceDetails[id]) {
            setService(serviceDetails[id]);
        } else {
            setService({
                ...defaultService,
                title: id ? id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Legal Service'
            });
        }
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await addDoc(collection(db, "service_inquiries"), {
                ...formData,
                serviceId: id || 'unknown',
                serviceName: service.title,
                createdAt: serverTimestamp(),
                status: 'new'
            });
            alert("Request submitted! We will contact you regarding " + service.title + " shortly.");
            setFormData({ name: '', email: '', phone: '', message: '' });
        } catch (error) {
            console.error("Error submitting request: ", error);
            alert("Error submitting request. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Safety check: Ensure Icon is a valid component
    const Icon = service?.icon || defaultService?.icon || Scale;

    return (
        <div className="min-h-screen bg-[#FDFBF7] py-12 px-4 md:px-8 lg:px-16">
            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto mb-8 flex items-center gap-2 text-sm text-gray-500">
                <Link to="/" className="hover:text-navy transition-colors">Home</Link>
                <ChevronRight size={14} />
                <span className="text-gray-400">Services</span>
                <ChevronRight size={14} />
                <span className="text-gold font-semibold truncate">{service.title}</span>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* LEFT: Service Details */}
                <div className="lg:col-span-2 space-y-8">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-navy/5 rounded-full text-navy font-bold text-sm mb-4">
                            <Icon size={18} className="text-gold" />
                            {service.title}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-serif text-navy mb-6 leading-tight">
                            {service.title}
                        </h1>
                        <p className="text-lg text-gray-600 leading-relaxed mb-8">
                            {service.description}
                        </p>
                    </div>

                    {/* Features / Why Choose Us */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-serif text-navy mb-6">What We Offer</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {service.features && service.features.map((feature, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <div className="mt-1 min-w-[20px] h-5 rounded-full bg-green-100 flex items-center justify-center">
                                        <Check size={12} className="text-green-600" />
                                    </div>
                                    <span className="font-medium text-gray-700">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Additional Info / Trust Markers */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center text-center hover:border-gold/30 transition-all">
                            <div className="w-12 h-12 bg-navy/5 rounded-full flex items-center justify-center mb-4 text-navy">
                                <Star size={24} />
                            </div>
                            <h3 className="font-bold text-navy mb-2">Top Rated Lawyers</h3>
                            <p className="text-sm text-gray-500">Verified experts with proven track records.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center text-center hover:border-gold/30 transition-all">
                            <div className="w-12 h-12 bg-navy/5 rounded-full flex items-center justify-center mb-4 text-navy">
                                <Shield size={24} />
                            </div>
                            <h3 className="font-bold text-navy mb-2">100% Confidential</h3>
                            <p className="text-sm text-gray-500">Your information is secure and private.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center text-center hover:border-gold/30 transition-all">
                            <div className="w-12 h-12 bg-navy/5 rounded-full flex items-center justify-center mb-4 text-navy">
                                <Clock size={24} />
                            </div>
                            <h3 className="font-bold text-navy mb-2">Quick Response</h3>
                            <p className="text-sm text-gray-500">Get connected within 24 hours.</p>
                        </div>
                    </div>
                </div>

                {/* RIGHT: Booking Form */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sticky top-24">
                        <h3 className="text-2xl font-serif text-navy mb-2">Book Consultation</h3>
                        <p className="text-gray-500 mb-6 text-sm">Fill in your details to connect with a {service.title} expert.</p>

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                    <input
                                        name="name" value={formData.name} onChange={handleChange} required
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                    <input
                                        name="email" value={formData.email} onChange={handleChange} required
                                        type="email"
                                        placeholder="john@example.com"
                                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Mobile Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                    <input
                                        name="phone" value={formData.phone} onChange={handleChange} required
                                        type="tel"
                                        placeholder="+91 98765 43210"
                                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-navy text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:bg-[#2a344a] transition-all flex items-center justify-center gap-2 mt-6 group disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Submitting...' : 'Book Now'} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>

                            <p className="text-xs text-center text-gray-400 mt-4">
                                By booking, you agree to our Terms of Service & Privacy Policy.
                            </p>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ServicePage;
