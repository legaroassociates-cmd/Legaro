import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import {
    Calendar, CreditCard, Shield, Clock, CheckCircle, User, MessageSquare, AlertCircle
} from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import useDocumentTitle from '../hooks/useDocumentTitle';

const ServiceBooking = () => {
    useDocumentTitle('Complete Your Booking - Legaro');
    const { showNotification } = useNotification();
    const navigate = useNavigate();
    const location = useLocation();

    // State
    const [step, setStep] = useState(1); // 1: Slot, 2: Payment
    const [formData, setFormData] = useState(null);
    const [bookingDate, setBookingDate] = useState(null);
    const [timeSlot, setTimeSlot] = useState('');

    // Payment/OTP State
    const [otpSent, setOtpSent] = useState(false);
    const [generatedOtp, setGeneratedOtp] = useState('');
    const [userOtp, setUserOtp] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (location.state) {
            setFormData(location.state);
        } else {
            showNotification('No booking details found. Redirecting...', 'error');
            navigate('/');
        }
    }, [location.state, navigate, showNotification]);

    if (!formData) return null;

    // Helpers
    const getNext7Days = () => {
        const days = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date();
            d.setDate(d.getDate() + i);
            days.push(d);
        }
        return days;
    };
    const timeSlots = ['Morning', 'Afternoon', 'Evening'];

    // Handlers
    const handleSlotSelection = () => {
        if (!bookingDate) {
            showNotification('Please select a date', 'error');
            return;
        }
        if (!timeSlot) {
            showNotification('Please select a time slot', 'error');
            return;
        }
        setStep(2);
    };

    const handleSendOTP = async () => {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOtp(code);
        setOtpSent(true);

        // Simulate API call
        // In production: await fetch('/send-otp', { ... })
        console.log(`[OTP] Sent to ${formData.email}: ${code}`);
        showNotification(`OTP sent to ${formData.email}`, 'success');

        // Alert for demo purposes since we don't have real backend
        alert(`DEMO: Your OTP is ${code}`);
    };

    const handleVerifyAndPay = async () => {
        if (userOtp !== generatedOtp) {
            showNotification('Invalid OTP. Please try again.', 'error');
            return;
        }

        setIsVerifying(true);
        setIsSubmitting(true);

        try {
            // Create Booking
            const dateStr = bookingDate.toLocaleDateString();
            const bookingId = `BK-${Date.now().toString().slice(-6)}`;

            await addDoc(collection(db, "bookings"), {
                ...formData,
                date: bookingDate,
                timeSlot: timeSlot,
                bookingId: bookingId,
                createdAt: serverTimestamp(),
                status: 'upcoming',
                paymentStatus: 'paid',
                amount: 299,
                verified: true
            });

            showNotification('Booking Confirmed Successfully!', 'success');
            navigate('/', { replace: true });

        } catch (error) {
            console.error(error);
            showNotification('Booking failed. Please try again.', 'error');
        } finally {
            setIsVerifying(false);
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-serif text-navy mb-2">Finalize Your Booking</h1>
                    <p className="text-gray-600">You are one step away from connecting with an expert.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* LEFT: Process Steps */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 flex-1">
                        {/* Step Indicator */}
                        <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-6">
                            <div className={`flex items-center gap-2 ${step === 1 ? 'text-navy font-bold' : 'text-green-600 font-bold'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 1 ? 'bg-navy text-white' : 'bg-green-100 text-green-600'}`}>
                                    {step > 1 ? <CheckCircle size={18} /> : 1}
                                </div>
                                <span className="hidden md:inline">Select Slot</span>
                            </div>
                            <div className="h-px bg-gray-200 flex-1"></div>
                            <div className={`flex items-center gap-2 ${step === 2 ? 'text-navy font-bold' : 'text-gray-400'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 2 ? 'bg-navy text-white' : 'bg-gray-100'}`}>2</div>
                                <span className="hidden md:inline">Verify & Pay</span>
                            </div>
                        </div>

                        {step === 1 && (
                            <div className="space-y-6 animate-fade-in">
                                <h2 className="text-xl font-serif text-navy flex items-center gap-2"><Calendar className="text-gold" /> Select Date & Time</h2>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-3">Available Dates</label>
                                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                        {getNext7Days().map((d, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setBookingDate(d)}
                                                className={`p-4 rounded-xl border min-w-[100px] transition-all
                                                    ${bookingDate?.toDateString() === d.toDateString()
                                                        ? 'bg-navy text-white border-navy shadow-md transform scale-105'
                                                        : 'bg-white border-gray-200 hover:border-gold/50'}`}
                                            >
                                                <div className="text-xs uppercase tracking-wider mb-1 opacity-80">{d.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                                                <div className="text-2xl font-serif font-bold">{d.getDate()}</div>
                                                <div className="text-xs opacity-80">{d.toLocaleDateString('en-US', { month: 'short' })}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-3">Preferred Time Slot</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {timeSlots.map(t => (
                                            <button
                                                key={t}
                                                onClick={() => setTimeSlot(t)}
                                                className={`py-3 px-4 rounded-xl border font-semibold transition-all
                                                    ${timeSlot === t
                                                        ? 'bg-gold text-navy border-gold shadow-md'
                                                        : 'bg-white border-gray-200 hover:border-gold/30 text-gray-600'}`}
                                            >
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    onClick={handleSlotSelection}
                                    className="w-full bg-navy text-white py-4 rounded-xl font-bold shadow-lg hover:bg-navy-light transition-all mt-4"
                                >
                                    Continue to Payment
                                </button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-6 animate-fade-in">
                                <h2 className="text-xl font-serif text-navy flex items-center gap-2"><Shield className="text-gold" /> Verify & Secure Booking</h2>

                                <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl">
                                    {!otpSent ? (
                                        <div className="text-center py-4">
                                            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-navy">
                                                <User size={32} />
                                            </div>
                                            <h3 className="font-bold text-lg mb-2">Verify Your Email</h3>
                                            <p className="text-gray-500 text-sm mb-6">We will send a code to <strong>{formData.email}</strong> to confirm this booking.</p>
                                            <button
                                                onClick={handleSendOTP}
                                                className="bg-navy text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
                                            >
                                                Send Verification Code
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center">
                                                <label className="text-sm font-bold text-gray-700">Enter OTP Code</label>
                                                <button onClick={() => setOtpSent(false)} className="text-xs text-navy underline">Change Email?</button>
                                            </div>
                                            <input
                                                type="text"
                                                maxLength={6}
                                                value={userOtp}
                                                onChange={(e) => setUserOtp(e.target.value)}
                                                className="w-full p-4 text-center text-3xl font-serif tracking-[0.5em] border border-gray-300 rounded-xl focus:border-gold outline-none bg-white"
                                                placeholder="000000"
                                            />
                                            <button
                                                onClick={handleVerifyAndPay}
                                                disabled={isSubmitting}
                                                className="w-full bg-green-600 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-green-700 transition-all flex items-center justify-center gap-2"
                                            >
                                                {isSubmitting ? 'Processing...' : `Pay ₹299 & Confirm`}
                                            </button>
                                            <p className="text-xs text-center text-gray-500 flex items-center justify-center gap-1">
                                                <CreditCard size={12} /> Secure Payment Gateway
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <button onClick={() => setStep(1)} className="text-gray-400 text-sm hover:text-navy transition-colors">
                                    Start Over
                                </button>
                            </div>
                        )}
                    </div>

                    {/* RIGHT: Summary Card */}
                    <div className="w-full lg:w-1/3">
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sticky top-8">
                            <h3 className="font-serif font-bold text-xl text-navy mb-6 pb-4 border-b border-gray-100">Booking Summary</h3>

                            <div className="space-y-4 mb-6">
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Service</p>
                                    <p className="font-medium text-navy">{formData.serviceName}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Date</p>
                                        <p className="font-medium text-navy">{bookingDate ? bookingDate.toLocaleDateString() : 'Not selected'}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Time</p>
                                        <p className="font-medium text-navy">{timeSlot || '--'}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Client</p>
                                    <p className="font-medium text-navy">{formData.name}</p>
                                    <p className="text-xs text-gray-500">{formData.phone}</p>
                                </div>
                            </div>

                            <div className="bg-[#FDFBF7] p-4 rounded-xl border border-dashed border-gold/30">
                                <div className="flex justify-between items-center mb-2 text-sm text-gray-600">
                                    <span>Consultation Fee</span>
                                    <span>₹299</span>
                                </div>
                                <div className="flex justify-between items-center text-lg font-bold text-navy pt-2 border-t border-gray-200">
                                    <span>Total Payable</span>
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

export default ServiceBooking;
