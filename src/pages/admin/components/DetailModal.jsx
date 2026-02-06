import React from 'react';
import { X } from 'lucide-react';

const DetailModal = ({ selectedItem, onClose, onAccept, activeTab }) => {
    if (!selectedItem) return null;

    // Define explicit order for fields
    const orderedFields = [
        { key: 'bookingId', label: 'Booking ID' },
        { key: 'name', label: 'Full Name' },
        { key: 'phoneNumber', label: 'Phone Number' },
        { key: 'email', label: 'Email Address' },
        { key: 'service', label: 'Service Requested' },
        { key: 'category', label: 'Category' },
        { key: 'description', label: 'Description/Notes' },
        { key: 'status', label: 'Current Status' },
        { key: 'city', label: 'City' },
        { key: 'state', label: 'State' },
        { key: 'createdAt', label: 'Submitted On', isDate: true },
        { key: 'assignedAt', label: 'Assigned On', isDate: true },
        { key: 'lawyerName', label: 'Assigned Lawyer' },
        { key: 'slot', label: 'Scheduled Slot' },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in" onClick={onClose}>
            <div className="bg-white p-8 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl m-4 relative" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={20} /></button>
                <h3 className="text-2xl font-serif font-bold text-navy mb-6 border-b border-gray-100 pb-4">
                    Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {orderedFields.map(({ key, label, isDate }) => {
                        let value = selectedItem[key];

                        // Handle naming mismatches
                        if (key === 'phoneNumber' && !value) value = selectedItem.phone;
                        if (key === 'service' && !value) value = selectedItem.subCategory;
                        if (key === 'slot' && !value) {
                            if (selectedItem.timeSlot) {
                                value = selectedItem.timeSlot;
                                if (selectedItem.date?.toDate) {
                                    value += ` (${selectedItem.date.toDate().toLocaleDateString()})`;
                                }
                            }
                        }

                        if (!value) return null; // Skip empty fields

                        return (
                            <div key={key} className={key === 'description' ? 'md:col-span-2' : ''}>
                                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-1">{label}</p>
                                <p className="text-navy font-medium text-sm break-words bg-gray-50 p-3 rounded-lg border border-gray-100">
                                    {isDate && value?.toDate ? value.toDate().toLocaleString() : value.toString()}
                                </p>
                            </div>
                        );
                    })}
                </div>
                <div className="mt-8 flex justify-end gap-4">
                    {/* Accept Button for Upcoming/Paid Bookings */}
                    {(selectedItem.status === 'upcoming' || selectedItem.status === 'paid') && activeTab === 'bookings' && onAccept && (
                        <button
                            onClick={() => {
                                onClose(); // Close detail first
                                onAccept(selectedItem);
                            }}
                            className="px-6 py-2 rounded-xl text-sm font-bold bg-navy text-white hover:bg-gold hover:text-navy transition-all shadow-md flex items-center gap-2"
                        >
                            Accept & Assign Counsel
                        </button>
                    )}
                    <button onClick={onClose} className="px-6 py-2 rounded-xl text-sm font-bold border border-gray-200 hover:bg-gray-50 transition-colors">Close</button>
                </div>
            </div>
        </div>
    );
};

export default DetailModal;
