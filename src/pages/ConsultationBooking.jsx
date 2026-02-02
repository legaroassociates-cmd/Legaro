import React, { useState } from 'react';
import {
    User, FileText, Calendar, CreditCard, Check, ChevronRight, ChevronLeft,
    MapPin, Globe, Phone, Mail, MessageSquare, Shield, Clock, Sun,
    Home, Users, Gavel, AlertTriangle, ShoppingBag, Building2, Scale, FileSignature, Briefcase, Award
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const ConsultationBooking = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        city: '',
        language: 'Tamil',
        category: '', // Main Category
        subCategory: '', // Sub-problem
        description: '',
        date: null,
        timeSlot: '',
    });

    // Validation State
    const [errors, setErrors] = useState({});
    const [otpSent, setOtpSent] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);

    // Steps Configuration
    const steps = [
        { id: 1, name: 'Client Details', icon: User },
        { id: 2, name: 'Legal Issue', icon: FileText },
        { id: 3, name: 'Select Slot', icon: Calendar },
        { id: 4, name: 'Payment', icon: CreditCard },
    ];

    // Detailed Issue Data
    const legalIssuesData = [
        {
            id: 'legal-notices',
            label: 'Legal Notices',
            subIssues: [
                'Drafting a Legal Notice',
                'Legal Notice for Recovery of dues',
                'Cheque Bounce Notice',
                'Legal Notice Under Consumer Protection Act',
                'Other'
            ]
        },
        {
            id: 'property',
            label: 'Property Lawyer',
            subIssues: [
                'Land Acquisition Matters', 'Property Registration', 'Property Verification',
                'Estate Planning', 'Property Succession', 'Will Drafting and Registration',
                'Landlord / Tenant Disputes', 'RERA Consultation', 'Relinquishment Deed',
                'Power of Attorney', 'Gift Deed', 'Rental Tenant Notice',
                'Other'
            ]
        },
        {
            id: 'family',
            label: 'Family Lawyer',
            subIssues: [
                'Divorce & Matrimonial Consultation', 'Maintenance and Alimony',
                'Child Custody and Guardianship', 'Muslim Law',
                'Violence Against Women', 'Legal Heir',
                'Other'
            ]
        },
        {
            id: 'civil',
            label: 'Civil Lawyer',
            subIssues: [
                'Defamation Cases', 'Legal Notices', 'Cheque Bounce Cases',
                'Money Recovery Issues', 'Mediation / Arbitration', 'WRIT petition / PIL',
                'Loan Recovery / Bank Account Freeze / Unfreeze', 'E-Court Filing Procedures',
                'National Green Tribunal Cases', 'Debt Recovery Tribunal',
                'Motor Accident Claims / Traffic Challan', 'Cyber Crime / Complaint',
                'MSME Samadhan / MSME Recovery & Related Matters',
                'Insolvency & Bankruptcy', 'Rent Control Cases', 'Legal Retainer',
                'Other'
            ]
        },
        {
            id: 'criminal',
            label: 'Criminal Lawyer',
            subIssues: [
                'Criminal Bail Application',
                'NDPS (Narcotic Drugs and Psychotropic Substances Act)',
                'Criminal Trial Court Matters',
                'File a Criminal Complaint',
                'Other'
            ]
        },
        {
            id: 'consumer',
            label: 'Consumer Lawyer',
            subIssues: [
                'File a Consumer Case',
                'Consumer Law Consultation',
                'Other'
            ]
        },
        {
            id: 'company',
            label: 'Company Law Matters',
            subIssues: [
                'Legal Retainer', 'Political Party Registration', 'Setting up of a Business',
                'ESOP / Fundraising for Business', 'Business Debt Restructuring',
                'Drug & Cosmetic License', 'Legal Metrology', 'POSH Lawyer',
                'Business Contracts & Documents', 'Business Due Diligence',
                'Barcode License', 'BIS Registration', 'Other Licenses & Registration',
                'Other'
            ]
        },
        {
            id: 'constitutional',
            label: 'Constitutional Lawyer',
            subIssues: [
                'WRIT petition / PIL',
                'Constitutional Bail Application',
                'Government Disputes',
                'Other'
            ]
        },
        {
            id: 'documentation',
            label: 'Legal Documentation',
            subIssues: [
                'Business Contracts - NDA, SLA, Franchise',
                'Employment Contracts',
                'Real Estate Agreements',
                'Other Contracts & Agreements',
                'Other'
            ]
        },
        {
            id: 'labour',
            label: 'Labour Lawyer',
            subIssues: [
                'Employment Issues - Disputes',
                'Sexual Harassment - POSH',
                'CLRA - Labour Regulation',
                'Other'
            ]
        },
        {
            id: 'trademark',
            label: 'Trademark Lawyer',
            subIssues: [
                'Trademark', 'Copyright', 'Patent',
                'IP Infringement', 'IP Transfer', 'Hearing',
                'Other'
            ]
        },
        {
            id: 'others',
            label: 'Others',
            subIssues: [
                'Other Legal Issues', 'General Consultation', 'Not Sure'
            ]
        }
    ];

    // Helper: Next 7 Days Generator
    const getNext7Days = () => {
        const days = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date();
            d.setDate(d.getDate() + i);
            days.push(d);
        }
        return days;
    };

    // Helper: Time Slots (Broad Periods)
    const timeSlots = [
        'Forenoon', 'Afternoon', 'Evening'
    ];

    // Validation Logic
    const validateStep = (step) => {
        const newErrors = {};

        if (step === 1) {
            if (!formData.name.trim()) newErrors.name = 'Full Name is required';
            if (!formData.phone.trim()) newErrors.phone = 'Mobile Number is required';
            else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = 'Invalid Mobile Number';
            if (!formData.city.trim()) newErrors.city = 'City is required';
        }

        if (step === 2) {
            if (!formData.category) newErrors.category = 'Please select a category';
            if (!formData.subCategory) newErrors.subCategory = 'Please select a specific issue';
        }

        if (step === 3) {
            if (!formData.date) newErrors.date = 'Please select a date';
            if (!formData.timeSlot) newErrors.timeSlot = 'Please select a time slot';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep((prev) => Math.min(prev + 1, 4));
        }
    };

    const handlePrev = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

    const handlePayment = async () => {
        setIsSubmitting(true);
        try {
            await addDoc(collection(db, "bookings"), {
                ...formData,
                createdAt: serverTimestamp(),
                status: 'paid',
                amount: 299,
                paymentId: 'DUMMY_PAY_' + Date.now()
            });
            alert("Booking confirmed! We have received your request. Our team will connect with you shortly.");
            navigate('/');
        } catch (error) {
            console.error("Error booking consultation: ", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // WhatsApp Logic
    const sendWhatsAppOTP = () => {
        if (!formData.phone) return;
        setIsVerifying(true);
        setTimeout(() => {
            setIsVerifying(false);
            setOtpSent(true);
            alert(`Simulated: OTP sent to ${formData.phone} via WhatsApp!`);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-cream py-8 md:py-12">
            <div className="container mx-auto px-4 md:px-8">

                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-serif text-navy mb-3">Book Your Consultation</h1>
                    <p className="text-gray-600">Secure a 30-minute session with a verified legal expert.</p>
                </div>

                {/* Stepper */}
                <div className="max-w-4xl mx-auto mb-10">
                    <div className="flex justify-between items-center relative">
                        {/* Progress Bar Background */}
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 -z-0"></div>
                        {/* Active Progress Bar */}
                        <div
                            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gold transition-all duration-300 -z-0"
                            style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                        ></div>

                        {steps.map((step) => (
                            <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
                                <div
                                    className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-sm md:text-base transition-all duration-300 ${currentStep >= step.id ? 'bg-navy text-gold ring-4 ring-cream' : 'bg-gray-200 text-gray-500 ring-4 ring-cream'
                                        }`}
                                >
                                    {currentStep > step.id ? <Check size={20} /> : <step.icon size={20} />}
                                </div>
                                <span className={`text-xs md:text-sm font-semibold hidden md:block ${currentStep >= step.id ? 'text-navy' : 'text-gray-400'}`}>
                                    {step.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">

                    {/* LEFT: Step Content */}
                    <div className="flex-grow bg-white rounded-2xl shadow-xl p-4 md:p-8 border border-gray-100 min-h-[400px]">

                        {/* STEP 1: CLIENT DETAILS */}
                        {currentStep === 1 && (
                            <div className="animate-fade-in space-y-6">
                                <h2 className="text-xl font-serif text-navy mb-4 flex items-center gap-2">
                                    <User className="text-gold" size={24} /> Personal Details
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            className={`w-full px-4 py-3 rounded-lg border focus:ring-2 outline-none transition-all ${errors.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-gold focus:ring-gold/20'}`}
                                            placeholder="Enter your name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Mobile Number <span className="text-red-500">*</span></label>
                                        <input
                                            type="tel"
                                            className={`w-full px-4 py-3 rounded-lg border focus:ring-2 outline-none transition-all ${errors.phone ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-gold focus:ring-gold/20'}`}
                                            placeholder="+91"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">City <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                            <input
                                                type="text"
                                                className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 outline-none transition-all ${errors.city ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-gold focus:ring-gold/20'}`}
                                                placeholder="e.g. Chennai"
                                                value={formData.city}
                                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                            />
                                        </div>
                                        {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Preferred Language</label>
                                        <div className="relative">
                                            <Globe className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                            <select
                                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all appearance-none bg-white"
                                                value={formData.language}
                                                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                                            >
                                                <option>Tamil</option>
                                                <option>English</option>
                                                <option>Hindi</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 2: LEGAL ISSUE (TOP/BOTTOM SPLIT + MOBILE DROPDOWN) */}
                        {currentStep === 2 && (
                            <div className="animate-fade-in flex flex-col">
                                <h2 className="text-2xl font-serif text-navy mb-4 flex items-center gap-2">
                                    <FileText className="text-gold" /> Select Legal Details
                                </h2>

                                {/* MOBILE VIEW: Dropdowns */}
                                <div className="md:hidden space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                                        <div className="relative">
                                            <select
                                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all appearance-none bg-white font-medium text-navy"
                                                value={formData.category}
                                                onChange={(e) => setFormData({ ...formData, category: e.target.value, subCategory: '' })}
                                            >
                                                <option value="">-- Select Category --</option>
                                                {legalIssuesData.map((issue) => (
                                                    <option key={issue.id} value={issue.label}>{issue.label}</option>
                                                ))}
                                            </select>
                                            <ChevronRight className="absolute right-3 top-3.5 text-gray-400 rotate-90" size={18} />
                                        </div>
                                    </div>

                                    {formData.category && (
                                        <div className="animate-fade-in">
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Specific Issue</label>
                                            <div className="relative">
                                                <select
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all appearance-none bg-white font-medium text-navy"
                                                    value={formData.subCategory}
                                                    onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
                                                >
                                                    <option value="">-- Select Issue --</option>
                                                    {legalIssuesData.find(i => i.label === formData.category)?.subIssues.map((sub, idx) => (
                                                        <option key={idx} value={sub}>{sub}</option>
                                                    ))}
                                                </select>
                                                <ChevronRight className="absolute right-3 top-3.5 text-gray-400 rotate-90" size={18} />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* DESKTOP VIEW: Top/Bottom Split with Compact Buttons */}
                                <div className="hidden md:flex flex-col gap-6 flex-grow">

                                    {/* Top: Categories */}
                                    <div className="flex flex-col">
                                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">1. Select Category</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {legalIssuesData.map((issue) => (
                                                <button
                                                    key={issue.id}
                                                    onClick={() => setFormData({ ...formData, category: issue.label, subCategory: '' })}
                                                    className={`px-4 py-2 text-xs font-bold rounded-full border transition-all whitespace-nowrap ${formData.category === issue.label
                                                        ? 'bg-navy text-white border-navy shadow-md ring-2 ring-gold/100'
                                                        : 'bg-white text-gray-600 border-gray-300 hover:border-gold hover:text-navy hover:shadow-sm'
                                                        }`}
                                                >
                                                    {issue.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    {/* <div className="h-px bg-gray-100 w-full"></div> */}

                                    {/* Bottom: Sub-issues */}
                                    <div className="flex flex-col flex-grow">
                                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">2. Select Specific Issue</h3>
                                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 min-h-[100px]">
                                            {formData.category ? (
                                                <div className="flex flex-wrap gap-2">
                                                    {legalIssuesData.find(i => i.label === formData.category)?.subIssues.map((sub, idx) => (
                                                        <button
                                                            key={idx}
                                                            onClick={() => setFormData({ ...formData, subCategory: sub })}
                                                            className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all text-center ${formData.subCategory === sub
                                                                ? 'bg-gold text-white border-gold shadow-sm'
                                                                : 'bg-white text-gray-600 border-gray-00 hover:border-navy hover:text-navy hover:bg-white'
                                                                }`}
                                                        >
                                                            {sub}
                                                        </button>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-50 py-10">
                                                    <p className="text-sm font-medium">Select a category above to view specific services</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Description Field - Always visible but bottom */}
                                <div className="pt-6 border-t border-gray-100">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">3. Additional Details (Optional)</h3>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all text-sm"
                                        placeholder="Briefly describe your case..."
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    />
                                    {(errors.category || errors.subCategory) && (
                                        <p className="text-red-500 text-xs mt-2 text-center font-medium">Please select a Category and a Sub-issue to proceed.</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* STEP 3: SLOT SELECTION */}
                        {currentStep === 3 && (
                            <div className="animate-fade-in space-y-6">
                                <h2 className="text-2xl font-serif text-navy mb-4 flex items-center gap-2">
                                    <Calendar className="text-gold" /> Select Date & Time
                                </h2>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-3">Pick a Date <span className="text-red-500">*</span></label>
                                    <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                                        {getNext7Days().map((date, idx) => {
                                            const isSelected = formData.date?.toDateString() === date.toDateString();
                                            return (
                                                <button
                                                    key={idx}
                                                    onClick={() => setFormData({ ...formData, date: date })}
                                                    className={`flex-shrink-0 w-20 flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${isSelected
                                                        ? 'bg-navy text-white border-navy shadow-lg transform scale-105'
                                                        : 'bg-white border-gray-200 hover:border-gold'
                                                        }`}
                                                >
                                                    <span className="text-xs uppercase opacity-70 mb-1">{date.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                                                    <span className="text-xl font-bold">{date.getDate()}</span>
                                                    <span className="text-xs mt-1">{date.toLocaleDateString('en-US', { month: 'short' })}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                    {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-3">Pick a Time Slot <span className="text-red-500">*</span></label>
                                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                                        {timeSlots.map((slot) => (
                                            <button
                                                key={slot}
                                                onClick={() => setFormData({ ...formData, timeSlot: slot })}
                                                className={`py-2 px-1 rounded-lg text-sm font-medium border transition-all ${formData.timeSlot === slot
                                                    ? 'bg-gold text-white border-gold shadow-md'
                                                    : 'bg-white text-gray-600 border-gray-200 hover:border-navy hover:text-navy'
                                                    }`}
                                            >
                                                {slot}
                                            </button>
                                        ))}
                                    </div>
                                    {errors.timeSlot && <p className="text-red-500 text-xs mt-1">{errors.timeSlot}</p>}
                                </div>
                            </div>
                        )}

                        {/* STEP 4: PAYMENT */}
                        {currentStep === 4 && (
                            <div className="animate-fade-in space-y-6">
                                <h2 className="text-2xl font-serif text-navy mb-4 flex items-center gap-2">
                                    <Shield className="text-gold" /> Verification & Payment
                                </h2>

                                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                                    <div className="mb-6">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Verify Mobile Number</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="tel"
                                                value={formData.phone}
                                                readOnly
                                                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-gray-500"
                                            />
                                            <button
                                                onClick={sendWhatsAppOTP}
                                                disabled={isVerifying || otpSent}
                                                className={`px-6 rounded-lg font-bold text-sm whitespace-nowrap transition-all ${otpSent
                                                    ? 'bg-green-600 text-white cursor-default'
                                                    : 'bg-navy text-white hover:bg-opacity-90'
                                                    }`}
                                            >
                                                {isVerifying ? 'Sending...' : otpSent ? 'OTP Sent ✓' : 'Send WhatsApp OTP'}
                                            </button>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-2">
                                            We will send a One Time Password to your WhatsApp number.
                                        </p>
                                    </div>

                                    {otpSent && (
                                        <div className="mb-2 animate-fade-in">
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Enter OTP</label>
                                            <input
                                                type="text"
                                                placeholder="XXXX"
                                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all text-center tracking-widest text-lg"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-green-50 text-green-800 rounded-lg border border-green-200 text-sm">
                                    <Shield size={18} />
                                    <span className="font-semibold">Payments are 100% Secure & Refundable upon cancellation.</span>
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between mt-6 pt-6 border-t border-gray-100">
                            <button
                                onClick={handlePrev}
                                disabled={currentStep === 1}
                                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${currentStep === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-navy hover:bg-gray-100'
                                    }`}
                            >
                                <ChevronLeft size={20} /> Back
                            </button>

                            {currentStep < 4 ? (
                                <button
                                    onClick={handleNext}
                                    className="bg-navy text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:shadow-xl hover:bg-[#2a344a] transition-all flex items-center gap-2 ml-auto"
                                >
                                    Next Step <ChevronRight size={20} />
                                </button>
                            ) : (
                                <button
                                    onClick={handlePayment}
                                    disabled={isSubmitting}
                                    className="bg-gradient-to-r from-gold to-gold-dark text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 transform hover:-translate-y-1 ml-auto disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Processing...' : 'Pay ₹299 & Book'} <Check size={20} />
                                </button>
                            )}
                        </div>

                    </div>

                    {/* RIGHT: Booking Summary Sticky Card */}
                    <div className="lg:w-1/3">
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sticky top-24">
                            <h3 className="text-xl font-serif text-navy mb-4 border-b border-gray-100 pb-3">Booking Summary</h3>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <User className="text-gold mt-1" size={18} />
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase font-bold">Client</p>
                                        <p className="font-semibold text-gray-800">{formData.name || 'Guest User'}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <MessageSquare className="text-gold mt-1" size={18} />
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase font-bold">Issue Type</p>
                                        <p className="font-semibold text-gray-800">{formData.category || 'Not Selected'}</p>
                                        {formData.subCategory && <p className="text-xs text-gray-500 mt-1">{formData.subCategory}</p>}
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Clock className="text-gold mt-1" size={18} />
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase font-bold">Slot</p>
                                        <p className="font-semibold text-gray-800">
                                            {formData.date ? formData.date.toLocaleDateString() : 'Select Date'}
                                            <br />
                                            <span className="text-sm font-normal">{formData.timeSlot || '--:--'}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-4 border-t border-dashed border-gray-300">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-600">Consultation Fee</span>
                                    <span className="font-semibold">₹299</span>
                                </div>
                                <div className="flex justify-between items-center text-green-600 text-sm mb-4">
                                    <span>Platform Fee</span>
                                    <span>FREE</span>
                                </div>
                                <div className="flex justify-between items-center text-lg font-bold text-navy">
                                    <span>Total Pay</span>
                                    <span>₹299</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    );
};

export default ConsultationBooking;
