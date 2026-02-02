
import React from 'react';
import { Link } from 'react-router-dom';
import { serviceDetails } from '../data/serviceDetails';
import { ChevronRight } from 'lucide-react';

const LawyerServices = () => {
    return (
        <div className="min-h-screen bg-[#FDFBF7] py-16 px-4 md:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-serif text-navy mb-4">Our Legal Services</h1>
                <p className="text-gray-600 mb-12 max-w-2xl">
                    Explore our comprehensive range of legal solutions tailored to your needs.
                    Click on a service to learn more and book a consultation.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(serviceDetails).map(([key, service]) => {
                        const Icon = service.icon;
                        const linkPath = `/lawyers/${key}`; // Defaulting to /lawyers/ prefix for simplicity, though some are /notice/ etc in Navbar. 
                        // In App.jsx, all prefixes point to ServicePage, so this works if we want to be generic, 
                        // BUT better to use the specific prefixes if we want perfect Breadcrumbs. 
                        // For now, let's use the matching prefix logic or just generic.

                        // Simple mapper for demonstration
                        let prefix = '/lawyers';
                        if (['money-recovery', 'recovery-dues', 'itr', 'caveat', 'tenant'].includes(key)) prefix = '/notice';
                        if (['defamation', 'ip', 'employment', 'rera'].includes(key)) prefix = '/litigation';
                        if (['automobile', 'bank', 'ecommerce', 'real-estate', 'insurance', 'medical', 'travel', 'tech'].includes(key)) prefix = '/consumer';
                        if (['tmt', 'risk'].includes(key)) prefix = '/expert';

                        return (
                            <Link
                                key={key}
                                to={`${prefix}/${key}`}
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
        </div>
    );
};

export default LawyerServices;
