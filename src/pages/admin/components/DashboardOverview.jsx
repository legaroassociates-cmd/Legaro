import React, { useState } from 'react';
import { Calendar, Users, Briefcase, CheckCircle, AlertCircle, Clock, TrendingUp } from 'lucide-react';

const DashboardOverview = ({ bookings, lawyers, partners, setActiveTab }) => {
    const [selectedSlot, setSelectedSlot] = useState(null); // { dateStr, session, bookings }
    return (
        <div className="space-y-8 animate-fade-in">
            {/* 1. KPI TILES - REALTIME METRICS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {/* Today's Consultations */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 group hover:shadow-lg transition-all relative overflow-hidden">
                    <div className="flex justify-between items-start mb-3">
                        <div className="w-10 h-10 rounded-xl bg-navy/5 text-navy flex items-center justify-center group-hover:bg-navy group-hover:text-gold transition-colors">
                            <Calendar size={20} />
                        </div>
                    </div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Today's Consultations</p>
                    <h3 className="text-2xl font-serif font-bold text-navy mt-1">
                        {bookings.filter(b => {
                            if (!b.date?.toDate) return false;
                            const today = new Date();
                            const d = b.date.toDate();
                            return d.getDate() === today.getDate() &&
                                d.getMonth() === today.getMonth() &&
                                d.getFullYear() === today.getFullYear();
                        }).length}
                    </h3>
                </div>

                {/* Legal Experts */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 group hover:shadow-lg transition-all relative overflow-hidden">
                    <div className="flex justify-between items-start mb-3">
                        <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold-dark flex items-center justify-center group-hover:bg-gold group-hover:text-white transition-colors">
                            <Users size={20} />
                        </div>
                    </div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Total Legal Experts</p>
                    <h3 className="text-2xl font-serif font-bold text-navy mt-1">{lawyers.length}</h3>
                </div>

                {/* Partnership Applications */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 group hover:shadow-lg transition-all relative overflow-hidden">
                    <div className="flex justify-between items-start mb-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                            <Briefcase size={20} />
                        </div>
                    </div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Total Partner Applications</p>
                    <h3 className="text-2xl font-serif font-bold text-navy mt-1">{partners.length}</h3>
                </div>

                {/* Onboarding Partners */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 group hover:shadow-lg transition-all relative overflow-hidden">
                    <div className="flex justify-between items-start mb-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                            <Clock size={20} />
                        </div>
                    </div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Total Onboarding candidates</p>
                    <h3 className="text-2xl font-serif font-bold text-navy mt-1">
                        {partners.filter(p => p.status === 'onboarding').length}
                    </h3>
                </div>

                {/* Assigned Bookings */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 group hover:shadow-lg transition-all relative overflow-hidden">
                    <div className="flex justify-between items-start mb-3">
                        <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-colors">
                            <CheckCircle size={20} />
                        </div>
                    </div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Total Assigned consultations</p>
                    <h3 className="text-2xl font-serif font-bold text-navy mt-1">
                        {bookings.filter(b => b.status === 'assigned' || b.lawyerId).length}
                    </h3>
                </div>

                {/* Unassigned Bookings */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 group hover:shadow-lg transition-all relative overflow-hidden border-l-4 border-l-orange-400">
                    <div className="flex justify-between items-start mb-3">
                        <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-colors">
                            <AlertCircle size={20} />
                        </div>
                    </div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Total Unassigned consultations</p>
                    <h3 className="text-2xl font-serif font-bold text-navy mt-1">
                        {bookings.filter(b => b.status === 'upcoming' && !b.lawyerId).length}
                    </h3>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 2. ACTIVITY TIMELINE (2/3 width) */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-navy flex items-center gap-3">
                            <Calendar size={20} className="text-gold" />
                            7-Day Booking Schedule
                        </h3>
                        <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-gray-400">
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-gold"></span> Booked</span>
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-gray-200"></span> Empty</span>
                        </div>
                    </div>

                    <div className="overflow-x-auto pb-2">
                        <div className="min-w-[600px]">
                            {/* Header Row */}
                            <div className="grid grid-cols-8 gap-3 mb-4">
                                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-end pb-1">Slot / Day</div>
                                {Array.from({ length: 7 }).map((_, i) => {
                                    const d = new Date();
                                    d.setDate(d.getDate() + i);
                                    return (
                                        <div key={i} className="text-center p-2 rounded-lg bg-gray-50/50">
                                            <div className="text-[10px] text-gray-400 font-bold uppercase mb-1">{d.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                                            <div className="text-sm font-bold text-navy">{d.getDate()}</div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Slots Rows */}
                            {['Morning', 'Afternoon', 'Evening'].map((slot, sIdx) => (
                                <div key={slot} className="grid grid-cols-8 gap-3 mb-3">
                                    <div className="py-2 text-[10px] font-bold text-navy uppercase tracking-wider flex items-center rounded-lg">
                                        {slot}
                                    </div>
                                    {Array.from({ length: 7 }).map((_, i) => {
                                        const d = new Date();
                                        d.setDate(d.getDate() + i);
                                        const dayStr = d.toLocaleDateString();

                                        // Mock Logic: Count bookings for this day/slot
                                        const count = bookings.filter(b => {
                                            if (!b.date?.toDate) return false;
                                            const bDate = b.date.toDate();
                                            const isDay = bDate.toDateString() === d.toDateString();

                                            // Match exact session (Morning, Afternoon, Evening)
                                            // Or handle specific assigned times by parsing if needed (simplified to session for now)
                                            const isSlot = b.timeSlot === slot;

                                            return isDay && isSlot;
                                        }).length;

                                        return (
                                            <div
                                                key={i}
                                                onClick={() => {
                                                    // Filter for this specific slot
                                                    const slotBookings = bookings.filter(b => {
                                                        if (!b.date?.toDate) return false;
                                                        const bDate = b.date.toDate();
                                                        return bDate.toDateString() === d.toDateString() && b.timeSlot === slot;
                                                    });

                                                    setSelectedSlot({
                                                        dateStr: d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
                                                        session: slot,
                                                        bookings: slotBookings
                                                    });
                                                }}
                                                className={`h-12 rounded-lg flex items-center justify-center transition-all relative group cursor-pointer ${count > 0
                                                    ? 'bg-gold text-navy shadow-md scale-100 hover:scale-105'
                                                    : 'bg-gray-50 text-gray-300 border border-gray-100 hover:border-gray-300 hover:bg-white'
                                                    } ${selectedSlot?.dateStr === d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }) && selectedSlot?.session === slot ? 'ring-2 ring-navy' : ''}`}
                                            >
                                                {count > 0 ? (
                                                    <span className="font-bold text-sm">{count}</span>
                                                ) : (
                                                    <span className="text-lg opacity-20">-</span>
                                                )}
                                                {count > 0 && (
                                                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-navy text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity z-10">
                                                        {count} Bookings
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 3. RECENT ACTIVITY (1/3 width) */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col">
                    <h3 className="text-lg font-bold text-navy mb-6 flex items-center gap-2">
                        <Clock size={20} className="text-gold" />
                        {selectedSlot ? `${selectedSlot.session} (${selectedSlot.dateStr})` : 'Recent Activity'}
                    </h3>
                    <div className="space-y-6 flex-1 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
                        {(selectedSlot ? selectedSlot.bookings : bookings.slice(0, 5)).map((b, i) => (
                            <div key={b.id || i} className="flex gap-4 group">
                                <div className="flex flex-col items-center">
                                    <div className="w-2 h-2 rounded-full bg-gold ring-4 ring-white shadow-sm z-10 group-hover:scale-125 transition-transform"></div>
                                    {i !== (selectedSlot ? selectedSlot.bookings.length : 5) - 1 && <div className="flex-1 w-px bg-gray-100 my-1"></div>}
                                </div>
                                <div className="pb-2 w-full">
                                    <div className="flex justify-between items-start">
                                        <p className="text-sm font-bold text-navy group-hover:text-gold-dark transition-colors">
                                            {b.category || 'Consultation'}
                                        </p>
                                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${b.status === 'upcoming' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                                            {b.status || 'New'}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                        Client: <span className="font-medium text-gray-700">{b.name || 'Guest'}</span>
                                    </p>
                                    <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                                        <Clock size={10} /> {b.slot || b.timeSlot || (b.createdAt?.toDate ? b.createdAt.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Time not set')}
                                    </p>
                                </div>
                            </div>
                        ))}
                        {(selectedSlot ? selectedSlot.bookings : bookings).length === 0 && (
                            <div className="text-center text-gray-400 text-sm py-10">
                                {selectedSlot ? 'No bookings this slot.' : 'No recent activity.'}
                            </div>
                        )}
                    </div>
                    <button
                        onClick={() => selectedSlot ? setSelectedSlot(null) : setActiveTab('bookings')}
                        className="w-full mt-6 py-3 border border-gray-200 text-navy text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-gray-50 transition-colors"
                    >
                        {selectedSlot ? 'Back to Recent Activity' : 'View All Activity'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;
