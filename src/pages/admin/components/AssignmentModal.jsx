import React from 'react';
import { X, Briefcase } from 'lucide-react';

const AssignmentModal = ({ isOpen, onClose, assignmentData, setAssignmentData, lawyers, onAssign, loading }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in" onClick={onClose}>
            <div className="bg-white p-8 rounded-2xl w-full max-w-lg shadow-2xl m-4 relative" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={20} /></button>

                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-navy/5 rounded-full flex items-center justify-center mx-auto mb-4 text-navy">
                        <Briefcase size={32} />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-navy">Assign Lawyer</h3>
                    <p className="text-gray-400 text-sm mt-2">Select a legal expert and time slot for this consultation.</p>
                </div>

                <div className="space-y-6">
                    {/* Lawyer Select */}
                    <div>
                        <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">Select Lawyer</label>
                        <select
                            className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 bg-white"
                            value={assignmentData.lawyerId}
                            onChange={(e) => setAssignmentData({ ...assignmentData, lawyerId: e.target.value })}
                        >
                            <option value="">-- Choose Expert --</option>
                            {lawyers.map(l => (
                                <option key={l.id} value={l.id}>{l.name} ({l.specialization?.[0] || 'General'})</option>
                            ))}
                        </select>
                    </div>

                    {/* Slot Select */}
                    <div>
                        <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                            Select Time Slot ({assignmentData.session || 'All Day'})
                        </label>
                        <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto custom-scrollbar p-1">
                            {(() => {
                                const allSlots = {
                                    'Morning': ['09:00 AM - 09:30 AM', '09:30 AM - 10:00 AM', '10:00 AM - 10:30 AM', '10:30 AM - 11:00 AM', '11:00 AM - 11:30 AM', '11:30 AM - 12:00 PM'],
                                    'Afternoon': ['01:00 PM - 01:30 PM', '01:30 PM - 02:00 PM', '02:00 PM - 02:30 PM', '02:30 PM - 03:00 PM', '03:00 PM - 03:30 PM', '03:30 PM - 04:00 PM', '04:00 PM - 04:30 PM', '04:30 PM - 05:00 PM'],
                                    'Evening': ['06:00 PM - 06:30 PM', '06:30 PM - 07:00 PM', '07:00 PM - 07:30 PM', '07:30 PM - 08:00 PM']
                                };

                                // Get slots for the requested session, or show all if undefined
                                const slotsToShow = allSlots[assignmentData.session] || [...allSlots.Morning, ...allSlots.Afternoon, ...allSlots.Evening];

                                return slotsToShow.map(slot => (
                                    <button
                                        key={slot}
                                        onClick={() => setAssignmentData({ ...assignmentData, slot: slot })}
                                        className={`p-2 text-[10px] font-bold rounded-lg border transition-all ${assignmentData.slot === slot
                                            ? 'bg-navy text-white border-navy'
                                            : 'bg-white text-gray-500 border-gray-100 hover:border-gray-300'
                                            }`}
                                    >
                                        {slot}
                                    </button>
                                ));
                            })()}
                        </div>
                    </div>

                    <button
                        onClick={onAssign}
                        disabled={!assignmentData.lawyerId || !assignmentData.slot || loading}
                        className="w-full py-4 bg-navy text-white rounded-xl font-bold hover:bg-gold hover:text-navy transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-4 flex justify-center items-center gap-2"
                    >
                        {loading ? 'Assigning...' : 'Confirm Assignment'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AssignmentModal;
