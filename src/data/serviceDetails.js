
import {
    Scale, FileText, Users, Gavel, Shield, FileSignature,
    AlertTriangle, Home, Globe, MessageSquare, Building2,
    ShoppingBag, Monitor, HeartHandshake, BookOpen, FileCheck,
    Award, Target, CheckCircle, Clock, Star, Eye, Check, Handshake, Search, User
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
    },

    // BUSINESS REGISTRATION SERVICES
    // Company Registration
    'pvt-ltd': {
        title: "Private Limited Company",
        description: "The most popular legal structure for businesses in India. limited liability, separate legal entity, and ease of raising funds.",
        features: ["Name Approval", "DSC & DIN", "MoA & AoA", "Certificate of Incorporation"],
        icon: Building2,
        category: "Company Registration",
        bookingCategory: "Company Law Matters"
    },
    'llp': {
        title: "Limited Liability Partnership (LLP)",
        description: "A hybrid structure combining the benefits of a partnership with limited liability. Ideal for professional firms.",
        features: ["LLP Agreement", "DPIN for Partners", "Name Reservation", "Incorporation Certificate"],
        icon: Users,
        category: "Company Registration",
        bookingCategory: "Company Law Matters"
    },
    'opc': {
        title: "One Person Company (OPC)",
        description: "A perfect structure for solo entrepreneurs who want limited liability and corporate status.",
        features: ["Single Shareholder", "Nominee Appointment", "Director Identification", "Legal Entity Status"],
        icon: Users,
        category: "Company Registration",
        bookingCategory: "Company Law Matters"
    },
    'proprietorship': {
        title: "Sole Proprietorship",
        description: "The simplest form of business entity. Easy to start, with minimal compliance requirements.",
        features: ["GST Registration", "MSME/Udyam", "Shop & Establishment", "Business Bank Account"],
        icon: Users,
        category: "Company Registration",
        bookingCategory: "Company Law Matters"
    },
    'nidhi': {
        title: "Nidhi Company",
        description: "A non-banking financial company formulation for borrowing and lending money between members.",
        features: ["NDH-4 Filing", "Minimum 7 Members", "Savings & Loan Rules", "Compliance Management"],
        icon: Building2,
        category: "Company Registration",
        bookingCategory: "Company Law Matters"
    },
    'producer': {
        title: "Producer Company",
        description: "For farmers and agricultural producers to organize as a corporate entity.",
        features: ["Farmer Members", "Agricultural Activities", "Limited Liability", "Profit Sharing"],
        icon: Users,
        category: "Company Registration",
        bookingCategory: "Company Law Matters"
    },
    'partnership': {
        title: "Partnership Firm",
        description: "Register a traditional partnership firm with a formal deed.",
        features: ["Partnership Deed", "Firm Registration", "PAN Card", "Legal Status"],
        icon: Handshake,
        category: "Company Registration",
        bookingCategory: "Company Law Matters"
    },
    'startup-india': {
        title: "Startup India Registration",
        description: "Get recognized by DPIIT to avail tax benefits, easier compliance, and IPR fast-tracking.",
        features: ["DPIIT Recognition", "Tax Exemption", "Self-Certification", "Govt Tenders"],
        icon: Award,
        category: "Company Registration",
        bookingCategory: "Company Law Matters"
    },

    // International Business
    'us-inc': {
        title: "US Incorporation",
        description: "Expand globally by registering your company in the USA (Delaware/Wyoming).",
        features: ["C-Corp / LLC", "EIN (Tax ID)", "US Bank Account", "Registered Agent"],
        icon: Globe,
        category: "International Business",
        bookingCategory: "Company Law Matters"
    },
    'singapore-inc': {
        title: "Singapore Incorporation",
        description: "Set up your business in Asia's financial hub with low taxes and global connectivity.",
        features: ["ACRA Registration", "Corporate Secretary", "Local Address", "BizFile Profile"],
        icon: Globe,
        category: "International Business",
        bookingCategory: "Company Law Matters"
    },
    'uk-inc': {
        title: "UK Incorporation",
        description: "Register a Private Limited Company (Ltd) in the United Kingdom.",
        features: ["Companies House Reg", "Registered Office", "Share Certificates", "Corporation Tax"],
        icon: Globe,
        category: "International Business",
        bookingCategory: "Company Law Matters"
    },
    'netherlands-inc': {
        title: "Netherlands Incorporation",
        description: "Establish a Dutch BV for European market access and tax efficiency.",
        features: ["Notarial Deed", "Chamber of Commerce", "VAT Number", "Legal Address"],
        icon: Globe,
        category: "International Business",
        bookingCategory: "Company Law Matters"
    },
    'hk-inc': {
        title: "Hong Kong Company",
        description: "Gateway to China and Asia. Incorporation services for Hong Kong.",
        features: ["Company Registry", "Business Cert", "Company Secretary", "Significant Controllers"],
        icon: Globe,
        category: "International Business",
        bookingCategory: "Company Law Matters"
    },
    'dubai-inc': {
        title: "Dubai Company Incorporation",
        description: "Start a business in UAE Free Zones or Mainland.",
        features: ["Trade License", "Visa Assistance", "Office Setup", "Local Sponsor"],
        icon: Globe,
        category: "International Business",
        bookingCategory: "Company Law Matters"
    },
    'int-trademark': {
        title: "International Trademark",
        description: "Protect your brand globally via the Madrid Protocol or direct national filing.",
        features: ["WIPO Application", "Country Designation", "Global Protection", "Priority Claim"],
        icon: Award,
        category: "International Business",
        bookingCategory: "Trademark Lawyer"
    },

    // Name Search
    'name-search': {
        title: "Company Name Search",
        description: "Check availability of your desired company name across MCA database.",
        features: ["Name Availability", "Trademark Conflict", "Domain Check", "Reservation (RUN)"],
        icon: Search,
        category: "Company Name Search",
        bookingCategory: "Company Law Matters"
    },
    'change-name': {
        title: "Change Company Name",
        description: "Legal process to change the name of an existing Pvt Ltd or LLP.",
        features: ["Board Resolution", "MGT-14 Filing", "Central Govt Approval", "New Certificate"],
        icon: FileSignature,
        category: "Company Name Search",
        bookingCategory: "Company Law Matters"
    },
    'name-generator': {
        title: "Business Name Generator",
        description: "Creative assistance to find a unique and legally compliant business name.",
        features: ["Brandable Names", "Legal Check", "Domain Availability", "Availability Report"],
        icon: Star,
        category: "Company Name Search",
        bookingCategory: "Company Law Matters"
    },

    // Licenses
    'dsc': {
        title: "Digital Signature (DSC)",
        description: "Class 3 DSC for e-tendering, MCA filing, and Income Tax.",
        features: ["Class 3 Signing", "Encryption", "USB Token", "2-Year Validity"],
        icon: FileCheck,
        category: "Licenses",
        bookingCategory: "Company Law Matters"
    },
    'udyam': {
        title: "Udyam Registration",
        description: "Official MSME registration for small businesses to avail govt schemes.",
        features: ["Lifetime Validity", "Priority Lending", "Subsidies", "Free Registration"],
        icon: FileText,
        category: "Licenses",
        bookingCategory: "Company Law Matters"
    },
    'msme': {
        title: "MSME Registration",
        description: "Register as a Micro, Small, or Medium Enterprise.",
        features: ["Udyam Certificate", "Interest Subsidy", "Collateral Free Loans", "ISO Support"],
        icon: Building2,
        category: "Licenses",
        bookingCategory: "Company Law Matters"
    },
    'iso': {
        title: "ISO Certification",
        description: "Get ISO 9001 and other certifications to prove quality and standards.",
        features: ["Audit Support", "Documentation", "Certification", "Process Improvement"],
        icon: Award,
        category: "Licenses",
        bookingCategory: "Company Law Matters"
    },
    'fssai': {
        title: "FSSAI Food License",
        description: "Mandatory license for any food business operator in India.",
        features: ["Basic Registration", "State License", "Central License", "Health Guidelines"],
        icon: CheckCircle,
        category: "Licenses",
        bookingCategory: "Company Law Matters"
    },
    'iec': {
        title: "Import Export Code (IEC)",
        description: "Essential code for businesses involved in import and export.",
        features: ["DGFT Registration", "Lifetime Validity", "No Renewal", "Customs Requirement"],
        icon: Globe,
        category: "Licenses",
        bookingCategory: "Company Law Matters"
    },
    'apeda': {
        title: "APEDA Registration (RCMC)",
        description: "Export agricultural products with APEDA membership.",
        features: ["RCMC Issuance", "Export Subsidy", "Market Access", "Member Benefits"],
        icon: FileText,
        category: "Licenses",
        bookingCategory: "Company Law Matters"
    },
    'spice-board': {
        title: "Spice Board Registration",
        description: "Certificate of Registration as Exporter of Spices (CRES).",
        features: ["CRES Certificate", "Export Permit", "Sample Testing", "Auction Participation"],
        icon: FileText,
        category: "Licenses",
        bookingCategory: "Company Law Matters"
    },
    'fieo': {
        title: "FIEO Registration",
        description: "Federation of Indian Export Organisations membership.",
        features: ["RCMC", "Export Promotion", "Global Exposure", "Govt Incentives"],
        icon: Globe,
        category: "Licenses",
        bookingCategory: "Company Law Matters"
    },
    'legal-metrology': {
        title: "Legal Metrology (LMPC)",
        description: "Registration for importers/packers of pre-packaged commodities.",
        features: ["Importer Reg", "Packer Reg", "Model Approval", "Weight Verification"],
        icon: Scale,
        category: "Licenses",
        bookingCategory: "Company Law Matters"
    },
    'hallmark': {
        title: "BIS Hallmark Registration",
        description: "Mandatory for jewelers selling gold and silver artifacts.",
        features: ["Jeweler Registration", "Assaying Center", "Quality Cert", "Compliance"],
        icon: Award,
        category: "Licenses",
        bookingCategory: "Company Law Matters"
    },
    'bis': {
        title: "BIS Registration (ISI)",
        description: "Bureau of Indian Standards certification for product quality.",
        features: ["Product Testing", "Factory Audit", "ISI Mark", "FMCS"],
        icon: Shield,
        category: "Licenses",
        bookingCategory: "Company Law Matters"
    },
    'liquor': {
        title: "Liquor License",
        description: "State-specific license for selling or serving alcohol.",
        features: ["L-1 to L-10", "Bar License", "Retail Shop", "Excise Compliance"],
        icon: Award,
        category: "Licenses",
        bookingCategory: "Company Law Matters"
    },
    'clra': {
        title: "CLRA Registration",
        description: "Contract Labour (Regulation and Abolition) Act registration.",
        features: ["Principal Employer", "Contractor License", "Labour Compliance", "Statutory Registers"],
        icon: Users,
        category: "Licenses",
        bookingCategory: "Labour Lawyer"
    },
    'ad-code': {
        title: "AD Code Registration",
        description: "Authorized Dealer Code registration with Customs for exports.",
        features: ["Bank Letter", "Icegate Reg", "Port Registration", "Export Benefit"],
        icon: FileCheck,
        category: "Licenses",
        bookingCategory: "Company Law Matters"
    },
    'irdai': {
        title: "IRDAI Registration",
        description: "Registration for insurance agents, brokers, or web aggregators.",
        features: ["License Application", "Broker Reg", "Corporate Agent", "Compliance"],
        icon: Shield,
        category: "Licenses",
        bookingCategory: "Company Law Matters"
    },
    'drug-license': {
        title: "Drug & Cosmetic License",
        description: "Wholesale or retail drug license for pharmacy business.",
        features: ["Form 20/21", "Pharmacist Reg", "Premises Inspection", "Renewal"],
        icon: FileText,
        category: "Licenses",
        bookingCategory: "Company Law Matters"
    },
    'customs': {
        title: "Customs Clearance",
        description: "Legal support for customs disputes and clearance procedures.",
        features: ["CHA Support", "Duty Calculation", "Dispute Resolution", "Notice Reply"],
        icon: Globe,
        category: "Licenses",
        bookingCategory: "Company Law Matters"
    },

    // Web Development
    'web-dev': {
        title: "Web & E-Commerce Development",
        description: "Professional website and e-commerce store development for your business.",
        features: ["Business Website", "E-Commerce Store", "Payment Gateway", "SEO Optimization"],
        icon: Monitor,
        category: "Web Development",
        bookingCategory: "Company Law Matters"
    } // No comma here if it's the last item, but there is a }; closing the object
};

export const defaultService = {
    title: "Legal Service",
    description: "Professional legal consultation and representation for your needs. Connect with expert lawyers to resolve your legal issues effectively.",
    features: ["Expert Consultation", "Document Review", "Legal Representation", "Strategic Advice"],
    icon: Scale
};
