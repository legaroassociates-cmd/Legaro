import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Building2, FileText, Scale, Users, FileCheck, Shield,
    Home, BookOpen, UserCheck, HeartHandshake, Gavel, FileSignature,
    Monitor, AlertTriangle, MessageSquare, Globe, ShoppingBag, ChevronRight, Award, Star
} from 'lucide-react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('property'); // Default to property
    const location = useLocation();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        {
            name: 'Lawyer Services',
            path: '/services',
            hasDropdown: true
        },
        {
            name: 'Documentation Services',
            path: '/documentation',
            hasDropdown: true
        },
        {
            name: 'Trade Mark IP',
            path: '/trademark-ip',
            hasDropdown: true
        },
        { name: 'Contact Us', path: '/contact' },
    ];

    // Data for Documentation Services Mega Menu
    const docServices = {
        ngo: [
            {
                category: 'NGO Registration',
                items: [
                    { name: 'NGO', icon: Users, path: '/doc/ngo' },
                    { name: 'Section 8 Company', icon: Building2, path: '/doc/section-8' },
                    { name: 'Trust Registration', icon: HeartHandshake, path: '/doc/trust-registration' },
                    { name: 'Society Registration', icon: Users, path: '/doc/society-registration' },
                ]
            },
            {
                category: 'NGO Compliance',
                items: [
                    { name: 'NGO Compliance', icon: FileCheck, path: '/doc/ngo-compliance' },
                    { name: 'Section 8 Compliance', icon: FileText, path: '/doc/section-8-compliance' },
                    { name: 'CSR-1 Filing', icon: FileSignature, path: '/doc/csr-1' },
                    { name: 'Sec.80G & Sec.12A', icon: Scale, path: '/doc/80g-12a' },
                    { name: 'Darpan Registration', icon: BookOpen, path: '/doc/darpan' },
                    { name: 'FCRA Registration', icon: Shield, path: '/doc/fcra' },
                ]
            }
        ],
        property: [
            {
                category: 'Property',
                items: [
                    { name: 'Property Title Verification', icon: Home, path: '/doc/property-verification' },
                    { name: 'Property Registration', icon: FileSignature, path: '/doc/property-registration' },
                    { name: 'RERA Complaint', icon: Gavel, path: '/doc/rera' },
                ]
            },
            {
                category: 'Licenses & Registrations',
                items: [
                    { name: 'Gun License', icon: Shield, path: '/doc/gun-license' },
                ]
            },
            {
                category: 'Name Change & Other Conditions',
                items: [
                    { name: 'Name Change', icon: UserCheck, path: '/doc/name-change' },
                    { name: 'Religion Change', icon: BookOpen, path: '/doc/religion-change' },
                    { name: 'Gender Change', icon: Users, path: '/doc/gender-change' },
                ]
            }
        ]
    };

    // Data for Lawyer Services Mega Menu
    const lawyerServices = {
        specialization: [
            {
                category: 'Lawyers Specialization',
                items: [
                    { name: 'Finance Lawyers', icon: Scale, path: '/lawyers/finance' },
                    { name: 'Cheque Bounce Lawyers', icon: FileText, path: '/lawyers/cheque-bounce' },
                    { name: 'Child Custody Lawyers', icon: Users, path: '/lawyers/child-custody' },
                    { name: 'Civil Lawyers', icon: Gavel, path: '/lawyers/civil' },
                    { name: 'Consumer Protection', icon: Shield, path: '/lawyers/consumer' },
                    { name: 'Contract Lawyers', icon: FileSignature, path: '/lawyers/contract' },
                    { name: 'Criminal Lawyers', icon: AlertTriangle, path: '/lawyers/criminal' },
                    { name: 'Property Lawyers', icon: Home, path: '/lawyers/property' },
                    { name: 'Divorce Lawyers', icon: Users, path: '/lawyers/divorce' },
                    { name: 'Family Lawyers', icon: Users, path: '/lawyers/family' },
                    { name: 'Cyber Crime', icon: Shield, path: '/lawyers/cyber-crime' },
                    { name: 'More...', icon: ChevronRight, path: '/lawyers/all' },
                ]
            },
            {
                category: 'Expert Services',
                items: [
                    { name: 'Tech, Media, Telecom', icon: Globe, path: '/expert/tmt' },
                    { name: 'Risk Management', icon: Shield, path: '/expert/risk' },
                ]
            }
        ],
        notice: [
            {
                category: 'Legal Notice',
                items: [
                    { name: 'Money Recovery Notice', icon: FileText, path: '/notice/money-recovery' },
                    { name: 'Recovery of Dues', icon: FileCheck, path: '/notice/recovery-dues' },
                    { name: 'Consumer Protection Notice', icon: Shield, path: '/notice/consumer' },
                    { name: 'Cheque Bounce Notice', icon: AlertTriangle, path: '/notice/cheque-bounce' },
                    { name: 'Reply to ITR Notice', icon: FileText, path: '/notice/itr' },
                    { name: 'Caveat Petition', icon: Gavel, path: '/notice/caveat' },
                    { name: 'Tenant Rental Notice', icon: Home, path: '/notice/tenant' },
                ]
            }
        ],
        litigation: [
            {
                category: 'Litigation & Disputes',
                items: [
                    { name: 'Defamation Complaint', icon: MessageSquare, path: '/litigation/defamation' },
                    { name: 'IP Infringement', icon: FileCheck, path: '/litigation/ip' },
                    { name: 'Employment Dispute', icon: Users, path: '/litigation/employment' },
                    { name: 'Contract Dispute', icon: FileSignature, path: '/litigation/contract' },
                    { name: 'Cheque Bounce', icon: FileText, path: '/litigation/cheque-bounce' },
                    { name: 'Property Litigation', icon: Home, path: '/litigation/property' },
                    { name: 'Cyber Crime', icon: Shield, path: '/litigation/cyber' },
                    { name: 'Divorce (Mutual/Contested)', icon: Users, path: '/litigation/divorce' },
                    { name: 'RERA Complaint', icon: Building2, path: '/litigation/rera' },
                ]
            }
        ],
        consumer: [
            {
                category: 'Consumer Complaints',
                items: [
                    { name: 'Automobile', icon: AlertTriangle, path: '/consumer/automobile' },
                    { name: 'Bank & Finance', icon: Building2, path: '/consumer/bank' },
                    { name: 'E-commerce', icon: ShoppingBag, path: '/consumer/ecommerce' },
                    { name: 'Real Estate', icon: Home, path: '/consumer/real-estate' },
                    { name: 'Insurance', icon: Shield, path: '/consumer/insurance' },
                    { name: 'Medical', icon: HeartHandshake, path: '/consumer/medical' },
                    { name: 'Travel', icon: Globe, path: '/consumer/travel' },
                    { name: 'Technology', icon: Monitor, path: '/consumer/tech' },
                ]
            }
        ]
    };

    // Data for Trademark & IP Services Mega Menu
    const ipServices = {
        trademark: [
            {
                category: 'Trademark Services',
                items: [
                    { name: 'Trademark Registration', icon: Award, path: '/ip/trademark-registration' },
                    { name: 'Trademark Search', icon: Monitor, path: '/ip/trademark-search' },
                    { name: 'Respond to Objection', icon: FileText, path: '/ip/tm-objection' },
                    { name: 'Well Known Trademark', icon: Star, path: '/ip/well-known-tm' },
                    { name: 'Trademark Watch', icon: Shield, path: '/ip/tm-watch' },
                    { name: 'Trademark Renewal', icon: FileCheck, path: '/ip/tm-renewal' },
                    { name: 'Trademark Assignment', icon: FileSignature, path: '/ip/tm-assignment' },
                    { name: 'USA Trademark', icon: Globe, path: '/ip/usa-tm' },
                    { name: 'Class Finder', icon: BookOpen, path: '/ip/tm-class-finder' },
                ]
            }
        ],
        copyright: [
            {
                category: 'Copyright',
                items: [
                    { name: 'Copyright Registration', icon: FileText, path: '/ip/copyright-registration' },
                    { name: 'Copyright Music', icon: FileText, path: '/ip/copyright-music' },
                ]
            }
        ],
        patent: [
            {
                category: 'Patent Services',
                items: [
                    { name: 'Indian Patent Search', icon: Monitor, path: '/ip/patent-search' },
                    { name: 'Provisional Patent', icon: FileCheck, path: '/ip/provisional-patent' },
                    { name: 'Patent Registration', icon: Shield, path: '/ip/patent-registration' },
                ]
            }
        ],
        infringement: [
            {
                category: 'Infringement Protection',
                items: [
                    { name: 'Copyright Infringement', icon: AlertTriangle, path: '/ip/copyright-infringement' },
                    { name: 'Patent Infringement', icon: Gavel, path: '/ip/patent-infringement' },
                    { name: 'Trademark Infringement', icon: Shield, path: '/ip/trademark-infringement' },
                ]
            }
        ],
        design: [
            {
                category: 'Design & Logo',
                items: [
                    { name: 'Logo Design', icon: UserCheck, path: '/ip/logo-design' },
                    { name: 'Design Registration', icon: Award, path: '/ip/design-registration' },
                ]
            }
        ]
    };

    // Configuration for Mega Menus
    const megaMenuConfig = {
        'Documentation Services': {
            defaultTab: 'ngo',
            tabs: [
                { id: 'ngo', label: 'NGO Services' },
                { id: 'property', label: 'Property & Personal' }
            ],
            data: docServices
        },
        'Lawyer Services': {
            defaultTab: 'specialization',
            tabs: [
                { id: 'specialization', label: 'Lawyers Specialization' },
                { id: 'notice', label: 'Legal Notice' },
                { id: 'litigation', label: 'Litigation' },
                { id: 'consumer', label: 'Consumer Complaint' }
            ],
            data: lawyerServices
        },
        'Trade Mark IP': {
            defaultTab: 'trademark',
            tabs: [
                { id: 'trademark', label: 'Trademark' },
                { id: 'copyright', label: 'Copyright' },
                { id: 'patent', label: 'Patent' },
                { id: 'infringement', label: 'Infringement' },
                { id: 'design', label: 'Design' }
            ],
            data: ipServices
        }
    };

    return (
        <nav className="flex flex-wrap justify-between items-center px-4 md:px-8 lg:px-16 py-4 bg-cream-dark border-b border-gray-100/50 sticky top-0 z-50 shadow-sm relative">
            <div className="flex items-center gap-2">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 no-underline text-current">
                    <span className="text-3xl text-gold">⚖️</span>
                    <span className="text-2xl font-bold font-serif text-gray-800 tracking-tight">
                        Legaro<span className="text-gold">.in</span>
                    </span>
                </Link>
            </div>

            {/* Desktop Menu */}
            <ul className="hidden lg:flex items-center gap-4 xl:gap-8 list-none m-0 p-0">
                {navLinks.map((item) => {
                    const menuConfig = megaMenuConfig[item.name];

                    return (
                        <li
                            key={item.name}
                            className="relative group"
                            onMouseEnter={() => menuConfig && setActiveTab(menuConfig.defaultTab)}
                        >
                            <Link
                                to={item.path}
                                className={`block py-3 no-underline font-medium hover:text-navy hover:border-b-2 hover:border-gold transition-all duration-200 text-sm xl:text-base whitespace-nowrap ${location.pathname === item.path ? 'text-navy border-b-2 border-gold' : 'text-gray-700'}`}
                            >
                                {item.name}
                            </Link>

                            {/* Mega Menu Dropdown */}
                            {item.hasDropdown && menuConfig && (
                                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-[750px] bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top z-50 overflow-hidden">
                                    {/* Tabs Header */}
                                    <div className="flex border-b border-gray-100 bg-white overflow-x-auto">
                                        {menuConfig.tabs.map((tab) => (
                                            <button
                                                key={tab.id}
                                                className={`flex-1 py-4 px-4 text-center font-semibold text-xs transition-colors uppercase tracking-wider whitespace-nowrap ${activeTab === tab.id ? 'bg-[#E5D8C0] text-navy border-b-2 border-navy' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                                                onMouseEnter={() => setActiveTab(tab.id)}
                                            >
                                                {tab.label}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Content Area */}
                                    <div className="p-8 bg-white min-h-[350px]">
                                        {menuConfig.data[activeTab] && (
                                            <div className="space-y-8 animate-fade-in">
                                                {menuConfig.data[activeTab].map((section, idx) => (
                                                    <div key={idx}>
                                                        <h3 className="text-xs uppercase tracking-wider text-gold-dark font-bold mb-4 border-b border-gray-100 pb-2">{section.category}</h3>
                                                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
                                                            {section.items.map((service, sIdx) => (
                                                                <Link key={sIdx} to={service.path} className="flex items-center gap-3 p-2 -ml-2 rounded-md hover:bg-cream transition-colors group/item no-underline">
                                                                    <div className="text-gray-400 group-hover/item:text-gold transition-colors">
                                                                        <service.icon size={16} />
                                                                    </div>
                                                                    <span className="text-gray-700 text-xs font-medium group-hover/item:text-navy line-clamp-1">{service.name}</span>
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </li>
                    );
                })}

                {/* Partner Button */}
                <li>
                    <Link to="/partner">
                        <button className="bg-gradient-to-r from-navy to-[#2a344a] text-white font-semibold py-2 px-5 rounded-full shadow hover:opacity-90 transition-opacity text-sm whitespace-nowrap border border-navy/20 hover:shadow-md">
                            Are you a Lawyer? Partner with us
                        </button>
                    </Link>
                </li>
            </ul>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden">
                <button className="text-navy p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Dropdown */}
            {isMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-cream border-b border-gray-200 shadow-lg lg:hidden flex flex-col p-4 gap-4 z-40">
                    {navLinks.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`text-gray-700 font-medium py-2 no-underline ${location.pathname === item.path ? 'text-gold' : ''}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <Link to="/partner" onClick={() => setIsMenuOpen(false)}>
                        <button className="w-full bg-gradient-to-r from-navy to-[#2a344a] text-white font-semibold py-3 rounded-md shadow">
                            Are you a Lawyer? Partner with us
                        </button>
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
