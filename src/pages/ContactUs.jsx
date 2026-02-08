import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, CheckCircle } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import useDocumentTitle from '../hooks/useDocumentTitle';

const ContactUs = () => {
    useDocumentTitle('Contact Us - Legaro');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await addDoc(collection(db, "contact_requests"), {
                ...formData,
                createdAt: serverTimestamp(),
                status: 'new'
            });
            alert("Message sent successfully! We will get back to you soon.");
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error("Error sending message: ", error);
            alert("Error sending message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7]">
            {/* Header Section */}
            <div className="bg-navy text-white py-20 px-4 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold opacity-10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 relative z-10">Get in Touch</h1>
                <p className="text-gray-300 max-w-xl mx-auto text-lg relative z-10">
                    Have a legal question or need assistance? We are here to help you navigate your legal journey with ease.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 -mt-10 relative z-20 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Contact Info Cards */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Address */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-navy/5 rounded-full flex items-center justify-center text-navy shrink-0">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-navy mb-1">Our Office</h3>
                                <p className="text-gray-600 text-sm">
                                    Legaro Associates<br />
                                    109 Padikuppam Road,<br />
                                    Anna Nagar West<br />
                                    Chennai, Tamil Nadu - 600040
                                </p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-navy/5 rounded-full flex items-center justify-center text-navy shrink-0">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-navy mb-1">Email Us</h3>
                                <p className="text-gray-600 text-sm">support.legaro@gmail.com</p>
                                <p className="text-gray-500 text-xs mt-1">We reply within 24 hours.</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10">
                            <h2 className="text-2xl font-serif text-navy mb-6 flex items-center gap-2">
                                <MessageSquare className="text-gold" /> Send us a Message
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Your Name</label>
                                        <input
                                            name="name" value={formData.name} onChange={handleChange} required
                                            type="text"
                                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-gold focus:ring-0 outline-none transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                                        <input
                                            name="email" value={formData.email} onChange={handleChange} required
                                            type="email"
                                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-gold focus:ring-0 outline-none transition-all"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                                    <input
                                        name="subject" value={formData.subject} onChange={handleChange} required
                                        type="text"
                                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-gold focus:ring-0 outline-none transition-all"
                                        placeholder="Regarding..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                                    <textarea
                                        name="message" value={formData.message} onChange={handleChange} required
                                        rows="5"
                                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-gold focus:ring-0 outline-none transition-all resize-none"
                                        placeholder="How can we help you?"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-navy text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:bg-[#2a344a] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'} <Send size={18} />
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ContactUs;
