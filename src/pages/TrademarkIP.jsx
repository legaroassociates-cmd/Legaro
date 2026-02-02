
import React from 'react';
import { Link } from 'react-router-dom';
import { serviceDetails } from '../data/serviceDetails';
import { ChevronRight, Award, Monitor, FileText, Star, Eye, Clock, FileSignature, Globe, CheckCircle, AlertTriangle, Gavel, Shield, Target, UserCheck } from 'lucide-react';

const TrademarkIP = () => {
    // Group keys by category for better organization
    const categories = {
        'Trademark Services': [
            'trademark-registration', 'trademark-search', 'tm-objection', 'well-known-tm',
            'tm-watch', 'tm-renewal', 'tm-assignment', 'usa-tm', 'tm-class-finder'
        ],
        'Copyright': [
            'copyright-registration', 'copyright-music'
        ],
        'Patent Services': [
            'patent-search', 'provisional-patent', 'patent-registration'
        ],
        'Infringement Protection': [
            'copyright-infringement', 'patent-infringement', 'trademark-infringement'
        ],
        'Design & Logo': [
            'logo-design', 'design-registration'
        ]
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] py-16 px-4 md:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                    <Award className="text-gold" size={40} />
                    <h1 className="text-4xl md:text-5xl font-serif text-navy">Trademark & IP Services</h1>
                </div>
                <p className="text-gray-600 mb-12 max-w-2xl text-lg">
                    Comprehensive Intellectual Property protection strategies.
                    Secure your brand, inventions, and creative works with our expert legal assistance.
                </p>

                <div className="space-y-16">
                    {Object.entries(categories).map(([categoryName, keys]) => (
                        <div key={categoryName}>
                            <h2 className="text-2xl font-serif text-navy mb-6 pl-4 border-l-4 border-gold">{categoryName}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {keys.map((key) => {
                                    const service = serviceDetails[key];
                                    if (!service) return null;
                                    const Icon = service.icon;

                                    return (
                                        <Link
                                            key={key}
                                            to={`/ip/${key}`}
                                            className="group bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-gold/30 transition-all flex flex-col"
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="w-12 h-12 rounded-full bg-navy/5 text-navy flex items-center justify-center group-hover:bg-navy group-hover:text-gold transition-colors">
                                                    <Icon size={24} />
                                                </div>
                                                <ChevronRight className="text-gray-300 group-hover:text-gold transition-colors" />
                                            </div>
                                            <h3 className="text-xl font-bold text-navy mb-2 group-hover:text-gold transition-colors">{service.title}</h3>
                                            <p className="text-sm text-gray-500 line-clamp-2">{service.description}</p>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrademarkIP;
