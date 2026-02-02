
import React from 'react';
import { Link } from 'react-router-dom';
import { serviceDetails } from '../data/serviceDetails';
import { ChevronRight, FileText } from 'lucide-react';

const DocumentationServices = () => {
    // Filter generic/lawyer services and keep only doc ones
    // A simple way is to list the explicit keys we just added.
    const docKeys = [
        'ngo', 'section-8', 'trust-registration', 'society-registration',
        'ngo-compliance', 'section-8-compliance', 'csr-1', '80g-12a', 'darpan', 'fcra',
        'property-verification', 'property-registration', 'rera',
        'gun-license', 'name-change', 'religion-change', 'gender-change'
    ];

    return (
        <div className="min-h-screen bg-[#FDFBF7] py-16 px-4 md:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                    <FileText className="text-gold" size={40} />
                    <h1 className="text-4xl md:text-5xl font-serif text-navy">Documentation Services</h1>
                </div>
                <p className="text-gray-600 mb-12 max-w-2xl text-lg">
                    Expert assistance with legal registrations, filings, and compliance.
                    We handle the paperwork so you can focus on your goals.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {docKeys.map((key) => {
                        const service = serviceDetails[key];
                        // RERA might be undefined if we didn't add it explicitly to serviceDetails in the previous step 
                        // (it was in litigation, but check if we added a specific doc one - we relied on litigation one?
                        // Actually I didn't add 'rera' directly in the previous step's ReplacementContent. 
                        // 'rera' is already in serviceDetails under Litigation. That works fine!)

                        if (!service) return null;

                        const Icon = service.icon;

                        return (
                            <Link
                                key={key}
                                to={`/doc/${key}`}
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

export default DocumentationServices;
