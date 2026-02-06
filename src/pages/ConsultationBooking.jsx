import React, { useState, useEffect } from 'react';
import {
    User, FileText, Calendar, CreditCard, Check, ChevronRight, ChevronLeft,
    MapPin, Globe, Phone, Mail, MessageSquare, Shield, Clock
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { cities } from '../data/cities'; // Restore import

const ConsultationBooking = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        city: '',
        language: 'Tamil',
        category: '',
        subCategory: '',
        description: '',
        date: null,
        timeSlot: '',
    });

    // City Autocomplete State
    const [filteredCities, setFilteredCities] = useState([]);
    const [showCitySuggestions, setShowCitySuggestions] = useState(false);

    useEffect(() => {
        if (location.state) {
            try {
                const { name, email, phone, city, serviceName } = location.state;
                setFormData(prev => ({
                    ...prev,
                    name: name || '',
                    email: email || '',
                    phone: phone || '',
                    city: city || '',
                    category: serviceName || '',
                    subCategory: ''
                }));
            } catch (err) {
                console.error("Error parsing location state:", err);
            }
        }
    }, []);

    const handleCityChange = (e) => {
        const value = e.target.value;
        setFormData({ ...formData, city: value });

        if (value.length > 0 && Array.isArray(cities)) {
            const filtered = cities.filter(city =>
                city.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredCities(filtered);
            setShowCitySuggestions(true);
        } else {
            setShowCitySuggestions(false);
        }
    };

    const selectCity = (city) => {
        setFormData({ ...formData, city: city });
        setShowCitySuggestions(false);
    };

    const [errors, setErrors] = useState({});
    const [otpSent, setOtpSent] = useState(false);
    const [generatedOtp, setGeneratedOtp] = useState('');
    const [userOtp, setUserOtp] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);

    const steps = [
        { id: 1, name: 'Client Details', icon: User },
        { id: 2, name: 'Legal Issue', icon: FileText },
        { id: 3, name: 'Select Slot', icon: Calendar },
        { id: 4, name: 'Payment', icon: CreditCard },
    ];

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

    const getNext7Days = () => {
        const days = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date();
            d.setDate(d.getDate() + i);
            days.push(d);
        }
        return days;
    };

    const timeSlots = ['Forenoon', 'Afternoon', 'Evening'];

    const validateStep = (step) => {
        const newErrors = {};

        if (step === 1) {
            if (!formData.name.trim()) newErrors.name = 'Full Name is required';
            if (!formData.email.trim()) newErrors.email = 'Email Address is required';
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid Email Address';
            if (!formData.phone.trim()) newErrors.phone = 'Mobile Number is required';
            else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = 'Invalid Mobile Number';
            if (!formData.city.trim()) newErrors.city = 'City is required';
        }
        if (step === 2) {
            if (!formData.category) newErrors.category = 'Please select a category';
            if (!formData.subCategory) newErrors.subCategory = 'Please select a specific issue';
        }
        if (step === 3) {
            if (!formData.date) newErrors.date = 'Select a date';
            if (!formData.timeSlot) newErrors.timeSlot = 'Select a time slot';
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
            // Generate Custom Booking ID: DDMMYY-SERIAL
            const date = new Date();
            const d = String(date.getDate()).padStart(2, '0');
            const m = String(date.getMonth() + 1).padStart(2, '0');
            const y = String(date.getFullYear()).slice(-2);
            // Using last 4 digits of timestamp as a simple unique serial for now
            const serial = Date.now().toString().slice(-4);
            const bookingId = `${d}${m}${y}-${serial}`;

            console.log("Saving...", formData);
            await addDoc(collection(db, "bookings"), {
                ...formData,
                bookingId: bookingId,
                createdAt: serverTimestamp(),
                status: 'paid',
                amount: 299,
                paymentId: 'PAY_' + Date.now()
            });

            // Send Confirmation Email
            try {
                await fetch('/send-booking-confirmation', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        bookingId,
                        amount: 299,
                        ...formData
                    })
                });
            } catch (emailErr) {
                console.error("Failed to send confirmation email", emailErr);
            }

            alert(`Booking Confirmed! \nYour Booking ID is: ${bookingId}\n\nOur team will contact you shortly.`);
            navigate('/');
        } catch (error) {
            console.error("Booking Error:", error);
            alert("Error: " + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const sendWhatsAppOTP = () => {
        if (!formData.phone) return;
        setIsVerifying(true);
        setTimeout(() => {
            setIsVerifying(false);
            setOtpSent(true);
            alert(`OTP sent to ${formData.phone}`);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-cream py-8 md:py-12">
            <div className="container mx-auto px-4 md:px-8">
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-serif text-navy mb-3">Book Your Consultation</h1>
                    <p className="text-gray-600">Secure a 30-minute session.</p>
                </div>

                {/* Progress */}
                <div className="max-w-4xl mx-auto mb-10">
                    <div className="flex justify-between items-center relative">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 -z-0"></div>
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gold transition-all duration-300 -z-0" style={{ width: `${((currentStep - 1) / 3) * 100}%` }}></div>
                        {steps.map((step) => (
                            <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${currentStep >= step.id ? 'bg-navy text-gold ring-4 ring-cream' : 'bg-gray-200 text-gray-500'}`}>
                                    {currentStep > step.id ? <Check size={20} /> : <step.icon size={20} />}
                                </div>
                                <span className={`text-xs font-semibold ${currentStep >= step.id ? 'text-navy' : 'text-gray-400'}`}>{step.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
                    <div className="w-full lg:w-2/3 bg-white rounded-2xl shadow-xl p-6 md:p-8 min-h-[400px]">
                        {currentStep === 1 && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-serif text-navy flex items-center gap-2"><User size={24} className="text-gold" /> Personal Details</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <input type="text" placeholder="Name *" className={`w-full p-3 border rounded-lg ${errors.name ? 'border-red-500' : ''}`} value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <input type="email" placeholder="Email *" className={`w-full p-3 border rounded-lg ${errors.email ? 'border-red-500' : ''}`} value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                    </div>
                                    <div>
                                        <input type="tel" placeholder="Phone *" className={`w-full p-3 border rounded-lg ${errors.phone ? 'border-red-500' : ''}`} value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                    </div>
                                    <div className="relative">
                                        <input type="text" placeholder="City *" className={`w-full p-3 border rounded-lg ${errors.city ? 'border-red-500' : ''}`} value={formData.city} onChange={handleCityChange} onBlur={() => setTimeout(() => setShowCitySuggestions(false), 200)} />
                                        {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                                        {showCitySuggestions && (
                                            <div className="absolute z-10 w-full bg-white shadow-lg max-h-40 overflow-auto border mt-1">
                                                {filteredCities.map((c, i) => <div key={i} className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => selectCity(c)}>{c}</div>)}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-serif text-navy flex items-center gap-2"><FileText size={24} className="text-gold" /> Legal Details</h2>
                                <div className="flex flex-wrap gap-2">
                                    {legalIssuesData.map(i => (
                                        <button key={i.id} onClick={() => setFormData({ ...formData, category: i.label, subCategory: '' })} className={`px-4 py-2 rounded-full border ${formData.category === i.label ? 'bg-navy text-white' : 'bg-white'}`}>
                                            {i.label}
                                        </button>
                                    ))}
                                </div>
                                {errors.category && <p className="text-red-500 text-xs">{errors.category}</p>}

                                {formData.category && (
                                    <div className="bg-gray-50 p-4 rounded-xl">
                                        <div className="flex flex-wrap gap-2">
                                            {legalIssuesData.find(i => i.label === formData.category)?.subIssues?.map((s, idx) => (
                                                <button key={idx} onClick={() => setFormData({ ...formData, subCategory: s })} className={`px-3 py-2 rounded-lg border ${formData.subCategory === s ? 'bg-gold text-white' : 'bg-white'}`}>{s}</button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {errors.subCategory && <p className="text-red-500 text-xs">{errors.subCategory}</p>}

                                <div className="mt-4">
                                    <label className="block text-sm font-semibold text-navy mb-2">Description <span className="text-gray-400 font-normal">(Optional)</span></label>
                                    <textarea
                                        className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:border-gold"
                                        rows="4"
                                        placeholder="Briefly describe your issue..."
                                        maxLength={500}
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    ></textarea>
                                    <div className="text-right text-xs text-gray-400 mt-1">
                                        {formData.description.length}/500 characters
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-serif text-navy flex items-center gap-2"><Calendar size={24} className="text-gold" /> Date & Time</h2>
                                <div className="flex gap-3 overflow-auto pb-2">
                                    {getNext7Days().map((d, i) => (
                                        <button key={i} onClick={() => setFormData({ ...formData, date: d })} className={`p-3 border rounded-xl min-w-[80px] ${formData.date?.toDateString() === d.toDateString() ? 'bg-navy text-white' : 'bg-white'} ${errors.date ? 'border-red-500' : ''}`}>
                                            <div className="font-bold">{d.getDate()}</div>
                                            <div className="text-xs">{d.toLocaleDateString('en-US', { month: 'short' })}</div>
                                        </button>
                                    ))}
                                </div>
                                {errors.date && <p className="text-red-500 text-xs">{errors.date}</p>}

                                <div className="flex gap-3 flex-wrap">
                                    {timeSlots.map(t => (
                                        <button key={t} onClick={() => setFormData({ ...formData, timeSlot: t })} className={`px-4 py-2 border rounded-lg ${formData.timeSlot === t ? 'bg-gold text-white' : 'bg-white'} ${errors.timeSlot ? 'border-red-500' : ''}`}>{t}</button>
                                    ))}
                                </div>
                                {errors.timeSlot && <p className="text-red-500 text-xs">{errors.timeSlot}</p>}
                            </div>
                        )}

                        {currentStep === 4 && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-serif text-navy flex items-center gap-2"><Shield size={24} className="text-gold" /> Verify & Book</h2>

                                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                                    <h3 className="font-bold text-navy mb-2">Email Verification</h3>
                                    <p className="text-sm text-gray-500 mb-6">
                                        We will send a One-Time Password (OTP) to <strong>{formData.email}</strong> to verify your booking.
                                    </p>

                                    {!otpSent ? (
                                        <button
                                            onClick={async () => {
                                                const code = Math.floor(100000 + Math.random() * 900000).toString();
                                                setGeneratedOtp(code);
                                                setOtpSent(true);

                                                try {
                                                    // Request to Cloudflare Pages Function (functions/send-otp.js)
                                                    const res = await fetch('/send-otp', {
                                                        method: 'POST',
                                                        headers: { 'Content-Type': 'application/json' },
                                                        body: JSON.stringify({ email: formData.email, otp: code })
                                                    });

                                                    if (!res.ok) {
                                                        const errData = await res.json();
                                                        console.error("Resend Error Response:", errData);
                                                        // Show the actual error message from Resend (e.g. "From address is not allowed")
                                                        throw new Error(errData.message || errData.error || 'Failed to send OTP');
                                                    }

                                                    alert(`✨ Great! We've sent a verification code to ${formData.email}.\n\nPlease check your inbox (and spam folder) to verify your booking.`);
                                                } catch (error) {
                                                    console.error("Failed to send OTP", error);
                                                    alert(`Failed to send OTP: ${error.message}`);
                                                    setOtpSent(false); // Reset to allow retry
                                                }
                                            }}
                                            className="w-full bg-navy text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-all font-semibold"
                                        >
                                            Send OTP to Email
                                        </button>
                                    ) : (
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">Enter OTP</label>
                                                <input
                                                    type="text"
                                                    maxLength={6}
                                                    value={userOtp}
                                                    onChange={(e) => setUserOtp(e.target.value)}
                                                    className="w-full p-3 border rounded-lg text-center text-2xl tracking-widest font-bold"
                                                    placeholder="000000"
                                                />
                                            </div>
                                            <button
                                                onClick={() => {
                                                    if (userOtp === generatedOtp) {
                                                        setIsVerified(true);
                                                        handlePayment();
                                                    } else {
                                                        alert("Invalid OTP. Please try again.");
                                                    }
                                                }}
                                                className="w-full bg-gold text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-all font-bold shadow-md"
                                                disabled={isVerifying}
                                            >
                                                {isVerifying ? "Verifying..." : "Verify & Confirm Booking"}
                                            </button>
                                            <button
                                                onClick={() => setOtpSent(false)}
                                                className="w-full text-sm text-gray-500 hover:text-navy underline"
                                            >
                                                Resend OTP
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="flex justify-between mt-8 pt-6 border-t">
                            <button onClick={handlePrev} disabled={currentStep === 1} className="text-gray-500 disabled:opacity-50">Back</button>
                            {currentStep < 4 ?
                                <button onClick={handleNext} className="bg-navy text-white px-6 py-3 rounded-lg">Next Step</button> :
                                <button onClick={handlePayment} className="bg-gold text-white px-6 py-3 rounded-lg">Pay ₹299 & Book</button>
                            }
                        </div>
                    </div>

                    {/* RIGHT: Booking Summary Sticky Card */}
                    <div className="w-full lg:w-1/3 flex-shrink-0">
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
        </div>
    );
};

export default ConsultationBooking;
