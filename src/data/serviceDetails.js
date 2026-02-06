
import {
    Scale, FileText, Users, Gavel, Shield, FileSignature,
    AlertTriangle, Home, Globe, MessageSquare, Building2,
    ShoppingBag, Monitor, HeartHandshake, BookOpen, FileCheck,
    Award, Target, CheckCircle, Clock, Star, Eye, Check
} from 'lucide-react';

export const serviceDetails = {
    // Lawyers Specialization
    'finance': {
        title: "Finance Lawyers",
        description: "Expert legal counsel for banking, finance, and securities regulations. We assist with loan agreements, debt restructuring, and regulatory compliance.",
        features: ["Banking Disputes", "Loan & Debt recovery", "Financial Fraud", "Investment Advisory"],
        icon: Scale,
        category: "Lawyers Specialization",
        bookingCategory: "Civil Lawyer"
    },
    'cheque-bounce': {
        title: "Cheque Bounce Lawyers",
        description: "Specialized legal assistance for Section 138 NI Act cases. We help you recover your money through legal notices and court representation.",
        features: ["Drafting Legal Notice", "Filing Criminal Complaint", "Defending Accused", "Settlement Negotiation"],
        icon: FileText,
        category: "Lawyers Specialization",
        bookingCategory: "Civil Lawyer"
    },
    'child-custody': {
        title: "Child Custody Lawyers",
        description: "Compassionate legal support for child custody battles, ensuring the best interests of the child are protected.",
        features: ["Custody Petitions", "Visitation Rights", "Guardianship", "International Custody"],
        icon: Users,
        category: "Lawyers Specialization",
        bookingCategory: "Family Lawyer"
    },
    'civil': {
        title: "Civil Lawyers",
        description: "We handle a wide range of civil disputes including property, contracts, and torts.",
        features: ["Civil Suits", "Injunctions", "Recovery Suits", "Damages Claims"],
        icon: Gavel,
        category: "Lawyers Specialization",
        bookingCategory: "Civil Lawyer"
    },
    'consumer': {
        title: "Consumer Protection Lawyers",
        description: "Fight against unfair trade practices and defective goods/services. We represent you in Consumer Forums.",
        features: ["Consumer Complaints", "Medical Negligence", "Product Liability", "Service Deficiency"],
        icon: Shield,
        category: "Lawyers Specialization",
        bookingCategory: "Consumer Lawyer"
    },
    'contract': {
        title: "Contract Lawyers",
        description: "Expertise in drafting, reviewing, and enforcing contracts to protect your business interests.",
        features: ["Contract Drafting", "Breach of Contract", "NDA & SLA", "Employment Agreements"],
        icon: FileSignature,
        category: "Lawyers Specialization",
        bookingCategory: "Legal Documentation"
    },
    'criminal': {
        title: "Criminal Lawyers",
        description: "Defense representation for criminal charges. We ensure your rights are protected throughout the legal process.",
        features: ["Bail Applications", "Criminal Trials", "FIR Quashing", "Appeals"],
        icon: AlertTriangle,
        category: "Lawyers Specialization",
        bookingCategory: "Criminal Lawyer"
    },
    'property': {
        title: "Property Lawyers",
        description: "Comprehensive legal services for real estate transactions, disputes, and registration.",
        features: ["Title Verification", "Property Registration", "Tenant Disputes", "Land Acquisition"],
        icon: Home,
        category: "Lawyers Specialization",
        bookingCategory: "Property Lawyer"
    },
    'divorce': {
        title: "Divorce Lawyers",
        description: "Sensitive and effective handling of divorce proceedings, alimony, and settlements.",
        features: ["Mutual Consent Divorce", "Contested Divorce", "Alimony", "Domestic Violence"],
        icon: Users,
        category: "Lawyers Specialization",
        bookingCategory: "Family Lawyer"
    },
    'family': {
        title: "Family Lawyers",
        description: "Holistic legal support for all family-related matters including adoption, succession, and disputes.",
        features: ["Adoption", "Succession Certificates", "Family Partition", "Will Drafting"],
        icon: Users,
        category: "Lawyers Specialization",
        bookingCategory: "Family Lawyer"
    },
    'cyber-crime': {
        title: "Cyber Crime Lawyers",
        description: "Legal defense and prosecution for internet-based crimes and digital fraud.",
        features: ["Data Theft", "Online Harassment", "Financial Fraud", "Identity Theft"],
        icon: Shield,
        category: "Lawyers Specialization",
        bookingCategory: "Civil Lawyer"
    },

    // Expert Services
    'tmt': {
        title: "Tech, Media & Telecom",
        description: "Specialized legal advice for the TMT sector, covering regulations, licensing, and IP.",
        features: ["Data Privacy", "Telecom Licensing", "Media Contracts", "Tech Regulations"],
        icon: Globe,
        category: "Expert Services",
        bookingCategory: "Company Law Matters"
    },
    'risk': {
        title: "Risk Management",
        description: "Strategic legal advice to identify and mitigate business and legal risks.",
        features: ["Compliance Audits", "Legal Risk Assessment", "Policy Drafting", "Crisis Management"],
        icon: Shield,
        category: "Expert Services",
        bookingCategory: "Company Law Matters"
    },

    // Legal Notices
    'money-recovery': {
        title: "Money Recovery Notice",
        description: "Formal legal demand for recovery of outstanding dues and debts.",
        features: ["Drafting Notice", "Legal Advice", "Response Handling", "Settlement"],
        icon: FileText,
        category: "Legal Notices",
        bookingCategory: "Legal Notices"
    },
    'recovery-dues': {
        title: "Recovery of Dues",
        description: "Legal assistance to recover salary, payments, or other dues owed to you.",
        features: ["Salary Recovery", "Vendor Payments", "Contract Dues", "Legal Action"],
        icon: FileCheck,
        category: "Legal Notices",
        bookingCategory: "Legal Notices"
    },
    'itr': {
        title: "Reply to ITR Notice",
        description: "Professional assistance in drafting and filing responses to Income Tax Notices.",
        features: ["Analysis of Notice", "Drafting Reply", "Tax Consultation", "Compliance"],
        icon: FileText,
        category: "Legal Notices",
        bookingCategory: "Others"
    },
    'caveat': {
        title: "Caveat Petition",
        description: "File a caveat to prevent ex-parte orders being passed against you in court.",
        features: ["Drafting Petition", "Filing in Court", "Legal Strategy", "Updates"],
        icon: Gavel,
        category: "Legal Notices",
        bookingCategory: "Civil Lawyer"
    },
    'tenant': {
        title: "Tenant Rental Notice",
        description: "Legal notices for eviction, rent recovery, or lease termination.",
        features: ["Eviction Notice", "Rent Recovery", "Lease Termination", "Dispute Resolution"],
        icon: Home,
        category: "Legal Notices",
        bookingCategory: "Property Lawyer"
    },

    // Litigation
    'defamation': {
        title: "Defamation Complaint",
        description: "Protect your reputation against false and damaging statements.",
        features: ["Civil Defamation", "Criminal Defamation", "Cease & Desist", "Damages Claim"],
        icon: MessageSquare,
        category: "Litigation",
        bookingCategory: "Civil Lawyer"
    },
    'ip': {
        title: "IP Infringement",
        description: "Legal action against violation of your Intellectual Property rights.",
        features: ["Trademark Infringement", "Copyright Violation", "Patent Disputes", "Injunctions"],
        icon: FileCheck,
        category: "Litigation",
        bookingCategory: "Trademark Lawyer"
    },
    'employment': {
        title: "Employment Dispute",
        description: "Resolution of disputes between employers and employees.",
        features: ["Wrongful Termination", "Harassment Claims", "Wage Disputes", "Contract Enforcement"],
        icon: Users,
        category: "Litigation",
        bookingCategory: "Labour Lawyer"
    },
    'rera': {
        title: "RERA Complaint",
        description: "Legal recourse for homebuyers against builders under the RERA Act.",
        features: ["Delayed Possession", "Refund Claims", "Defect Liability", "Builder Disputes"],
        icon: Building2,
        category: "Litigation",
        bookingCategory: "Property Lawyer"
    },

    // Consumer
    'automobile': {
        title: "Automobile Consumer Complaints",
        description: "Legal support for defects and service issues with vehicles.",
        features: ["Manufacturing Defects", "Service Issues", "Insurance Claims", "Dealer Fraud"],
        icon: AlertTriangle,
        category: "Consumer Complaints",
        bookingCategory: "Consumer Lawyer"
    },
    'bank': {
        title: "Banking & Finance Complaints",
        description: "Redressal for unfair banking practices and financial service issues.",
        features: ["Unfair Charges", "Loan Issues", "Credit Card Disputes", "Digital Banking Fraud"],
        icon: Building2,
        category: "Consumer Complaints",
        bookingCategory: "Consumer Lawyer"
    },
    'ecommerce': {
        title: "E-commerce Complaints",
        description: "Resolve disputes regarding online purchases, refunds, and delivery.",
        features: ["Defective Products", "Refund Refusals", "Delivery Issues", "Seller Fraud"],
        icon: ShoppingBag,
        category: "Consumer Complaints",
        bookingCategory: "Consumer Lawyer"
    },
    'real-estate': {
        title: "Real Estate Complaints",
        description: "Consumer complaints regarding property purchases and builder services.",
        features: ["Builder Delays", "False Promises", "Maintenance Issues", "Possession Delays"],
        icon: Home,
        category: "Consumer Complaints",
        bookingCategory: "Property Lawyer"
    },
    'insurance': {
        title: "Insurance Complaints",
        description: "Help with rejected claims and unfair insurance practices.",
        features: ["Claim Rejection", "Delay in Settlement", "Policy Disputes", "Ombudsman Complaints"],
        icon: Shield,
        category: "Consumer Complaints",
        bookingCategory: "Consumer Lawyer"
    },
    'medical': {
        title: "Medical Negligence",
        description: "Legal action against medical malpractice and negligence.",
        features: ["Diagnostic Errors", "Surgical Negligence", "Hospital Liability", "Compensation"],
        icon: HeartHandshake,
        category: "Consumer Complaints",
        bookingCategory: "Consumer Lawyer"
    },
    'travel': {
        title: "Travel & Airlines Complaints",
        description: "Consumer protection for travel-related service deficiencies.",
        features: ["Flight Cancellations", "Refund Issues", "Hotel Disputes", "Package Tour Issues"],
        icon: Globe,
        category: "Consumer Complaints",
        bookingCategory: "Consumer Lawyer"
    },
    'tech': {
        title: "Technology Service Complaints",
        description: "Resolve disputes with telecom, internet, and software providers.",
        features: ["Service Deficiency", "Billing Disputes", "Data Issues", "Warranty Claims"],
        icon: Monitor,
        category: "Consumer Complaints",
        bookingCategory: "Consumer Lawyer"
    },

    // DOCUMENTATION SERVICES
    // NGO & Section 8
    'ngo': {
        title: "NGO Registration",
        description: "Complete legal assistance for registering a Non-Governmental Organization in India. We guide you through the entire process.",
        features: ["Trust Deed Drafting", "Society Registration", "Bylaws Preparation", "Registrar Filing"],
        icon: Users,
        category: "NGO & Section 8",
        bookingCategory: "Company Law Matters"
    },
    'section-8': {
        title: "Section 8 Company Registration",
        description: "Register your non-profit as a Section 8 Company for better credibility and limited liability.",
        features: ["DSC & DIN", "Name Approval", "MoA & AoA Drafting", "Incorporation Certificate"],
        icon: Building2,
        category: "NGO & Section 8",
        bookingCategory: "Company Law Matters"
    },
    'trust-registration': {
        title: "Trust Registration",
        description: "Form a public or private charitable trust to manage assets and clear objectives.",
        features: ["Trust Deed Drafting", "Trustee Appointment", "Registration with Sub-Registrar", "PAN Application"],
        icon: HeartHandshake,
        category: "NGO & Section 8",
        bookingCategory: "Company Law Matters"
    },
    'society-registration': {
        title: "Society Registration",
        description: "Experts in registering cooperative societies for residential, charitable, or welfare purposes.",
        features: ["Memorandum of Association", "Rules & Regulations", "Affidavit drafting", "Registrar Approval"],
        icon: Users,
        category: "NGO & Section 8",
        bookingCategory: "Company Law Matters"
    },

    // NGO Compliance
    'ngo-compliance': {
        title: "NGO Annual Compliance",
        description: "Ensure your NGO stays compliant with all statutory regulations and annual filings.",
        features: ["Audit Report", "Annual Return Filing", "List of Governing Body", "Meeting Minutes"],
        icon: FileText,
        category: "NGO Compliance",
        bookingCategory: "Company Law Matters"
    },
    'section-8-compliance': {
        title: "Section 8 Compliance",
        description: "Mandatory annual compliance services for Section 8 companies to avoid penalties.",
        features: ["AOC-4 & MGT-7 Filing", "Income Tax Return", "Auditor Appointment", "Director KYC"],
        icon: FileCheck,
        category: "NGO Compliance",
        bookingCategory: "Company Law Matters"
    },
    'csr-1': {
        title: "CSR-1 Filing",
        description: "Registration for entities to undertake CSR activities. Mandatory for accessing CSR funding.",
        features: ["Form CSR-1 Filing", "Digital Signature", "Entity Verification", "Approval Tracking"],
        icon: FileSignature,
        category: "NGO Compliance",
        bookingCategory: "Company Law Matters"
    },
    '80g-12a': {
        title: "12A & 80G Registration",
        description: "Get tax exemption status for your NGO and offer tax benefits to your donors.",
        features: ["Form 10A Filing", "Activity Report", "Financial Statements", "Exemption Certificate"],
        icon: Scale,
        category: "NGO Compliance",
        bookingCategory: "Company Law Matters"
    },
    'darpan': {
        title: "NITI Aayog Darpan",
        description: "Register on the NGO Darpan portal to be eligible for government grants and schemes.",
        features: ["Profile Creation", "Unique ID Generation", "Grant Applications", "KYC Update"],
        icon: BookOpen,
        category: "NGO Compliance",
        bookingCategory: "Company Law Matters"
    },
    'fcra': {
        title: "FCRA Registration",
        description: "Obtain Foreign Contribution Regulation Act registration to receive overseas donations.",
        features: ["Prior Permission", "FCRA Registration", "Bank Account Setup", "Annual Returns"],
        icon: Shield,
        category: "NGO Compliance",
        bookingCategory: "Company Law Matters"
    },

    // Property Documentation
    'property-verification': {
        title: "Property Document Verification",
        description: "Thorough verification of property titles and legal documents before you buy.",
        features: ["Title Search Report", "Encumbrance Check", "Layout Approval Check", "Ownership History"],
        icon: Home,
        category: "Property Documentation",
        bookingCategory: "Property Lawyer"
    },
    'property-registration': {
        title: "Property Registration",
        description: "Assistance with sale deed drafting and registration at the Sub-Registrar office.",
        features: ["Sale Deed Drafting", "Stamp Duty Calculation", "Registration Appointment", "Legal Witnesses"],
        icon: FileSignature,
        category: "Property Documentation",
        bookingCategory: "Property Lawyer"
    },

    // Licenses & Others
    'gun-license': {
        title: "Gun License Consultation",
        description: "Legal guidance on eligibility, application, and documentation for obtaining a firearms license.",
        features: ["Eligibility Check", "Application Filing", "Police Verification Support", "Renewal"],
        icon: Shield,
        category: "Licenses & Others",
        bookingCategory: "Others"
    },
    'name-change': {
        title: "Name Change Service",
        description: "Officially change your name through the Gazette notification process.",
        features: ["Affidavit Preparation", "Newspaper Advertisement", "Gazette Notification", "Digital File"],
        icon: FileSignature,
        category: "Licenses & Others",
        bookingCategory: "Others"
    },
    'religion-change': {
        title: "Religion Change",
        description: "Legal procedure and documentation for official change of religion.",
        features: ["Conversion Affidavit", "Newspaper Ad", "Gazette Publication", "Legal Validations"],
        icon: BookOpen,
        category: "Licenses & Others",
        bookingCategory: "Others"
    },
    'gender-change': {
        title: "Gender Change",
        description: "Legal support for changing gender in official government identification documents.",
        features: ["Medical Certificate", "Affidavit", "Gazette Notification", "ID Update Support"],
        icon: Users,
        category: "Licenses & Others",
        bookingCategory: "Others"
    },

    // TRADEMARK & IP SERVICES
    // Trademark
    'trademark-registration': {
        title: "Trademark Registration",
        description: "Protect your brand identity by registering your logo, slogan, or brand name.",
        features: ["Class Search", "Application Filing", "Objection Handling", "Registration Certificate"],
        icon: Award,
        category: "Trademark Services",
        bookingCategory: "Trademark Lawyer"
    },
    'trademark-search': {
        title: "Trademark Search",
        description: "Comprehensive search to ensure your brand name is unique and available for registration.",
        features: ["Public Search", "Phonetic Similarity", "Class Classification", "Availability Report"],
        icon: Monitor,
        category: "Trademark Services",
        bookingCategory: "Trademark Lawyer"
    },
    'tm-objection': {
        title: "Respond to TM Objection",
        description: "Expert legal drafting to respond to objections raised by the Trademark Registry.",
        features: ["Examination Report Analysis", "Reply Drafting", "Legal Argument", "Filing Response"],
        icon: FileText,
        category: "Trademark Services",
        bookingCategory: "Trademark Lawyer"
    },
    'well-known-tm': {
        title: "Well Known Trademark",
        description: "Get your mark recognized as a 'Well Known Trademark' for broader protection across all classes.",
        features: ["Evidence Compilation", "Affidavit Filing", "Registry Application", "Legal Representation"],
        icon: Star,
        category: "Trademark Services",
        bookingCategory: "Trademark Lawyer"
    },
    'tm-watch': {
        title: "Trademark Watch",
        description: "Monitoring service to detect potential infringements of your registered trademark.",
        features: ["Market Surveillance", "Registry Monitoring", "Infringement Alerts", "Opposition Support"],
        icon: Eye,
        category: "Trademark Services",
        bookingCategory: "Trademark Lawyer"
    },
    'tm-renewal': {
        title: "Trademark Renewal",
        description: "Ensure your trademark protection doesn't expire. We handle the renewal process seamlessly.",
        features: ["Renewal Tracking", "Form Filing", "Fee Payment", "Pre-expiry Alerts"],
        icon: Clock,
        category: "Trademark Services",
        bookingCategory: "Trademark Lawyer"
    },
    'tm-assignment': {
        title: "Trademark Assignment",
        description: "Legal process for transferring ownership of a trademark to another party.",
        features: ["Assignment Deed", "Form TM-P Filing", "Registry Update", "Ownership Transfer"],
        icon: FileSignature,
        category: "Trademark Services",
        bookingCategory: "Trademark Lawyer"
    },
    'usa-tm': {
        title: "USA Trademark Registration",
        description: "Expand your brand to the global market with US Trademark registration (USPTO).",
        features: ["USPTO Search", "TEAS Filing", "Attorney Representation", "International Protection"],
        icon: Globe,
        category: "Trademark Services",
        bookingCategory: "Trademark Lawyer"
    },
    'tm-class-finder': {
        title: "Trademark Class Finder",
        description: "Identify the correct class (Nice Classification) for your goods or services.",
        features: ["Class Analysis", "Product Categorization", "Multi-class Strategy", "Filing Advice"],
        icon: CheckCircle,
        category: "Trademark Services",
        bookingCategory: "Trademark Lawyer"
    },

    // Copyright
    'copyright-registration': {
        title: "Copyright Registration",
        description: "Protect your creative works including literary, artistic, and software code.",
        features: ["Application Filing", "Work Submission", "Copyright Certificate", "Legal Protection"],
        icon: FileText,
        category: "Copyright & Patent",
        bookingCategory: "Trademark Lawyer"
    },
    'copyright-music': {
        title: "Copyright for Music",
        description: "Specialized copyright protection for musical compositions, lyrics, and sound recordings.",
        features: ["Musical Work Registration", "Sound Recording", "Artist Rights", "Royalty Protection"],
        icon: FileText,
        category: "Copyright & Patent",
        bookingCategory: "Trademark Lawyer"
    },

    // Patent
    'patent-search': {
        title: "Indian Patent Search",
        description: "Prior art search to determine the patentability of your invention.",
        features: ["Novelty Check", "Prior Art Report", "Patentability Opinion", "Global Database Search"],
        icon: Monitor,
        category: "Copyright & Patent",
        bookingCategory: "Trademark Lawyer"
    },
    'provisional-patent': {
        title: "Provisional Patent Application",
        description: "Secure an early priority date for your invention while you finalize the details.",
        features: ["Priority Date", "Invention Disclosure", "Form Filing", "12-Month Protection"],
        icon: FileCheck,
        category: "Copyright & Patent",
        bookingCategory: "Trademark Lawyer"
    },
    'patent-registration': {
        title: "Patent Registration (Complete)",
        description: "Full patent specification filing for long-term protection of your invention.",
        features: ["Complete Specification", "Claims Drafting", "Patent Examination", "Grant of Patent"],
        icon: Shield,
        category: "Copyright & Patent",
        bookingCategory: "Trademark Lawyer"
    },

    // Infringement
    'copyright-infringement': {
        title: "Copyright Infringement",
        description: "Legal action against unauthorized use of your copyrighted material.",
        features: ["Cease & Desist", "Takedown Notices", "Damages Claim", "Litigation Support"],
        icon: AlertTriangle,
        category: "Infringement & Design",
        bookingCategory: "Trademark Lawyer"
    },
    'patent-infringement': {
        title: "Patent Infringement",
        description: "Defend your patented invention against unauthorized manufacturing or sales.",
        features: ["Infringement Analysis", "Legal Notice", "Injunction Suits", "Royalty Recovery"],
        icon: Gavel,
        category: "Infringement & Design",
        bookingCategory: "Trademark Lawyer"
    },
    'trademark-infringement': {
        title: "Trademark Infringement",
        description: "Stop others from using your brand name or logo without permission.",
        features: ["Brand Protection", "Legal Notice", "Passing Off Suits", "Brand Enforcement"],
        icon: Shield,
        category: "Infringement & Design",
        bookingCategory: "Trademark Lawyer"
    },

    // Design
    'logo-design': {
        title: "Logo Design",
        description: "Professional logo design services tailored for trademark registration eligibility.",
        features: ["Unique Concepts", "Vector Files", "Brand Guidelines", "Copyright Transfer"],
        icon: Target,
        category: "Infringement & Design",
        bookingCategory: "Trademark Lawyer"
    },
    'design-registration': {
        title: "Design Registration",
        description: "Protect the aesthetic look and shape of your product under the Designs Act.",
        features: ["Novelty Check", "Representation Sheets", "Application Filing", "Design Certificate"],
        icon: Award,
        category: "Infringement & Design",
        bookingCategory: "Trademark Lawyer"
    }
};

export const defaultService = {
    title: "Legal Service",
    description: "Professional legal consultation and representation for your needs. Connect with expert lawyers to resolve your legal issues effectively.",
    features: ["Expert Consultation", "Document Review", "Legal Representation", "Strategic Advice"],
    icon: Scale
};
