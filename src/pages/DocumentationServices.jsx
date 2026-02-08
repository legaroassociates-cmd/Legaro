
import React from 'react';
import { Link } from 'react-router-dom';
import { serviceDetails } from '../data/serviceDetails';
import { ChevronRight, FileText } from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';

const DocumentationServices = () => {
    useDocumentTitle('Documentation Services - Legaro');
    const [searchQuery, setSearchQuery] = React.useState('');
    const [activeCategory, setActiveCategory] = React.useState('All');

    // Define services explicitly
    const docKeys = [
        'ngo', 'section-8', 'trust-registration', 'society-registration',
        'ngo-compliance', 'section-8-compliance', 'csr-1', '80g-12a', 'darpan', 'fcra',
        'property-verification', 'property-registration',
        'gun-license', 'name-change', 'religion-change', 'gender-change'
    ];

    // Manual Categorization for Filter
    const servicesByCategory = {
        "NGO & Trust": ['ngo', 'section-8', 'trust-registration', 'society-registration'],
        "NGO Compliance": ['ngo-compliance', 'section-8-compliance', 'csr-1', '80g-12a', 'darpan', 'fcra'],
        "Property": ['property-verification', 'property-registration'],
        "Personal": ['gun-license', 'name-change', 'religion-change', 'gender-change']
    };

    const categoryOrder = ["All", "NGO & Trust", "NGO Compliance", "Property", "Personal"];

    // Filter Logic
    const filteredServices = React.useMemo(() => {
        let keys = [];

        if (activeCategory === 'All') {
            keys = docKeys;
        } else {
            keys = servicesByCategory[activeCategory] || [];
        }

        // Apply Search
        if (searchQuery.trim()) {
            const lowerQuery = searchQuery.toLowerCase();
            return keys
                .map(key => ({ key, ...serviceDetails[key] }))
                .filter(s => s && (s.title.toLowerCase().includes(lowerQuery) || s.description.toLowerCase().includes(lowerQuery)));
        }

        return keys.map(key => ({ key, ...serviceDetails[key] })).filter(s => s);
    }, [activeCategory, searchQuery]);

    return (
        <div className="min-h-screen bg-[#FDFBF7] py-16 px-4 md:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <FileText className="text-gold" size={40} />
                        <h1 className="text-4xl md:text-5xl font-serif text-navy">Documentation Services</h1>
                    </div>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        Expert assistance with legal registrations, filings, and compliance.
                        We handle the paperwork so you can focus on your goals.
                    </p>
                </div>

                {/* SEARCH BAR */}
                <div className="max-w-xl mx-auto mb-10 relative">
                    <input
                        type="text"
                        placeholder="Search for a service (e.g., NGO, Property, Name Change)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-4 pl-12 rounded-full border border-gray-200 shadow-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                    />
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </div>

                {/* CATEGORY TOGGLES */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categoryOrder.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => {
                                setActiveCategory(cat);
                                setSearchQuery('');
                            }}
                            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${activeCategory === cat
                                ? 'bg-navy text-gold shadow-md transform scale-105'
                                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* RESULTS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredServices.length > 0 ? (
                        filteredServices.map((service) => {
                            const { key, title, description, icon: Icon } = service;

                            return (
                                <Link
                                    key={key}
                                    to={`/doc/${key}`}
                                    className="group bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-gold/30 transition-all flex flex-col h-full"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-12 h-12 rounded-full bg-navy/5 text-navy flex items-center justify-center group-hover:bg-navy group-hover:text-gold transition-colors">
                                            <Icon size={24} />
                                        </div>
                                        <ChevronRight className="text-gray-300 group-hover:text-gold transition-colors" />
                                    </div>
                                    <h3 className="text-xl font-bold text-navy mb-2 group-hover:text-gold transition-colors">{title}</h3>
                                    <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
                                </Link>
                            );
                        })
                    ) : (
                        <div className="col-span-full text-center py-20">
                            <p className="text-gray-500 text-lg">No services found matching "{searchQuery}".</p>
                            <button onClick={() => { setSearchQuery(''); setActiveCategory('All'); }} className="mt-4 text-gold font-semibold hover:underline">Clear Search</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DocumentationServices;
