import React, { useState, useEffect } from 'react';
import { db, storage } from '../../firebase';
import { collection, query, orderBy, onSnapshot, updateDoc, setDoc, doc, deleteDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, Users, FileText, MessageSquare, LogOut,
    Calendar, CheckCircle, Clock, Search, AlertCircle, RefreshCw,
    Briefcase, Plus, Trash2, Edit2, X, Filter, ChevronRight, TrendingUp, Shield
} from 'lucide-react';
import DashboardOverview from './components/DashboardOverview';
import DetailModal from './components/DetailModal';
import AssignmentModal from './components/AssignmentModal';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [bookings, setBookings] = useState([]);
    const [partners, setPartners] = useState([]);
    const [lawyers, setLawyers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date());

    // Lawyers Modal State
    const [isLawyerModalOpen, setIsLawyerModalOpen] = useState(false);
    const [currentLawyer, setCurrentLawyer] = useState(null); // If editing
    const [lawyerForm, setLawyerForm] = useState({ name: '', title: '', experience: '', bio: '', specialization: '', image: '', priority: 0 });

    // Filter States
    const [bookingFilter, setBookingFilter] = useState('all'); // all, upcoming, completed, missed
    const [partnerFilter, setPartnerFilter] = useState('all'); // all, new, onboarding, rejected
    const [searchQuery, setSearchQuery] = useState('');
    const [lawyerSort, setLawyerSort] = useState('priority'); // priority, experience, name

    // Detail & Assignment State
    const [selectedItem, setSelectedItem] = useState(null);
    const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);
    const [assignmentData, setAssignmentData] = useState({ lawyerId: '', slot: '' });

    const navigate = useNavigate();

    useEffect(() => {
        setSearchQuery('');
        setBookingFilter('all');
        setPartnerFilter('all');
        // We don't reset lawyerSort as it's a preference
    }, [activeTab]);

    useEffect(() => {
        // Clock
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);

        // Fetch Data
        const unsubBookings = onSnapshot(query(collection(db, 'bookings'), orderBy('createdAt', 'desc')), (snap) => {
            setBookings(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        });
        const unsubPartners = onSnapshot(query(collection(db, 'partners'), orderBy('createdAt', 'desc')), (snap) => {
            setPartners(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        });

        // Fetch Lawyers
        const unsubLawyers = onSnapshot(collection(db, 'lawyers'), (snap) => {
            setLawyers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
            setLoading(false);
        });

        return () => {
            clearInterval(timer);
            unsubBookings();
            unsubPartners();
            unsubLawyers();
        };
    }, []);

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            sessionStorage.removeItem('legaro_admin_session');
            navigate('/admin/login');
        }
    };

    const updateStatus = async (collectionName, id, newStatus) => {
        if (window.confirm(`Change status to '${newStatus}'?`)) {
            await updateDoc(doc(db, collectionName, id), { status: newStatus });
        }
    };

    // --- Lawyer CRUD ---
    const handleDeleteLawyer = async (id) => {
        if (window.confirm("Are you sure you want to delete this lawyer?")) {
            await deleteDoc(doc(db, 'lawyers', id));
        }
    };

    const handleSaveLawyer = async (e) => {
        e.preventDefault();
        try {
            const dataToSave = {
                ...lawyerForm,
                specialization: typeof lawyerForm.specialization === 'string' ? lawyerForm.specialization.split(',').map(s => s.trim()) : lawyerForm.specialization,
                priority: parseInt(lawyerForm.priority) || 0
            };

            if (currentLawyer) {
                // Update (using setDoc with merge is more robust if doc is missing)
                await setDoc(doc(db, 'lawyers', currentLawyer.id), dataToSave, { merge: true });
            } else {
                // Create
                await addDoc(collection(db, 'lawyers'), { ...dataToSave, createdAt: serverTimestamp() });
            }
            setIsLawyerModalOpen(false);
            setLawyerForm({ name: '', title: '', experience: '', bio: '', specialization: '', image: '', priority: 0 });
            setCurrentLawyer(null);
        } catch (error) {
            console.error("Error saving lawyer:", error);
            alert("Error saving lawyer.");
        }
    };

    const openLawyerModal = (lawyer = null) => {
        if (lawyer) {
            setCurrentLawyer(lawyer);
            setLawyerForm({
                ...lawyer,
                specialization: Array.isArray(lawyer.specialization) ? lawyer.specialization.join(', ') : lawyer.specialization,
                priority: lawyer.priority || 0
            });
        } else {
            setCurrentLawyer(null);
            setLawyerForm({ name: '', title: '', experience: '', bio: '', specialization: '', image: '', priority: 0 });
        }
        setIsLawyerModalOpen(true);
    };

    // --- Filtering Logic ---
    const getFilteredBookings = () => {
        let filtered = bookings;

        // 1. Status Filter
        if (bookingFilter !== 'all') {
            filtered = filtered.filter(b => b.status === bookingFilter);
        }

        // 2. Search Filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(b =>
                (b.name && b.name.toLowerCase().includes(query)) ||
                (b.bookingId && b.bookingId.toLowerCase().includes(query)) ||
                (b.phone && b.phone.includes(query)) ||
                (b.email && b.email.toLowerCase().includes(query))
            );
        }

        return filtered;
    };


    const getFilteredPartners = () => {
        let filtered = partners;
        if (partnerFilter !== 'all') {
            filtered = filtered.filter(p => p.status === partnerFilter);
        }
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(p =>
                (p.name && p.name.toLowerCase().includes(query)) ||
                (p.email && p.email.toLowerCase().includes(query))
            );
        }
        return filtered;
    };

    const getFilteredLawyers = () => {
        let filtered = lawyers;

        // 1. Search
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(l =>
                (l.name && l.name.toLowerCase().includes(query)) ||
                (l.specialization && Array.isArray(l.specialization) && l.specialization.join(' ').toLowerCase().includes(query)) ||
                (l.specialization && typeof l.specialization === 'string' && l.specialization.toLowerCase().includes(query))
            );
        }

        // 2. Sort
        return filtered.sort((a, b) => {
            if (lawyerSort === 'priority') {
                return (b.priority || 0) - (a.priority || 0);
            }
            if (lawyerSort === 'experience') {
                // Try to parse number from "15+ Years" -> 15
                const expA = parseInt(a.experience) || 0;
                const expB = parseInt(b.experience) || 0;
                return expB - expA;
            }
            if (lawyerSort === 'name') {
                return a.name.localeCompare(b.name);
            }
            return 0;
        });
    };

    // --- Modal Handlers ---
    const handleRowClick = (item) => {
        setSelectedItem(item);
    };

    const openAssignmentModal = (booking, e) => {
        if (e) e.stopPropagation();
        setAssignmentData({
            bookingId: booking.id,
            slot: '',
            lawyerId: booking.lawyerId || '',
            session: booking.timeSlot // Morning, Afternoon, or Evening
        });
        setIsAssignmentModalOpen(true);
    };

    const handleAssignLawyer = async () => {
        if (!assignmentData.bookingId || !assignmentData.lawyerId) return;
        try {
            await updateDoc(doc(db, 'bookings', assignmentData.bookingId), {
                lawyerId: assignmentData.lawyerId,
                slot: assignmentData.slot,
                status: 'assigned',
                assignedAt: serverTimestamp()
            });
            setIsAssignmentModalOpen(false);
            setAssignmentData({ lawyerId: '', slot: '' });
            alert("Booking assigned successfully!");
        } catch (error) {
            console.error("Error assigning lawyer:", error);
            alert("Failed to assign lawyer.");
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] flex font-sans text-navy">
            {/* Sidebar */}
            <div className="fixed h-full bg-navy text-white shadow-2xl z-50 flex flex-col transition-all duration-300 w-20 lg:w-72 group overflow-hidden border-r border-white/5">
                <div className="h-24 flex items-center px-6 border-b border-white/10 whitespace-nowrap bg-navy-dark">
                    <Shield size={32} className="text-gold flex-shrink-0" />
                    <div className="ml-4 opacity-0 lg:opacity-100 transition-opacity duration-300">
                        <h1 className="text-2xl font-serif text-gold font-bold tracking-wide">LEGARO</h1>
                        <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em]">Administration</p>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-3 py-8 flex flex-col">
                    {[
                        { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
                        { id: 'bookings', label: 'Consultations', icon: Calendar },
                        { id: 'lawyers', label: 'Manage Lawyers', icon: Users },
                        { id: 'partners', label: 'Partners', icon: Briefcase },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300 group/btn relative overflow-hidden ${activeTab === item.id
                                ? 'bg-gold text-navy shadow-[0_0_20px_rgba(251,191,36,0.3)] font-bold'
                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <item.icon size={22} className={`flex-shrink-0 transition-transform duration-300 ${activeTab === item.id ? 'scale-110' : 'group-hover/btn:scale-110'}`} />
                            <span className="opacity-0 lg:opacity-100 transition-opacity duration-300 text-sm tracking-wide">{item.label}</span>
                            {activeTab === item.id && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-navy rounded-l-full"></div>}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button onClick={handleLogout} className="flex items-center gap-4 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-xl transition-all w-full">
                        <LogOut size={20} />
                        <span className="opacity-0 lg:opacity-100 transition-opacity duration-300 font-medium">Logout</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="ml-20 lg:ml-72 flex-1 flex flex-col h-screen overflow-hidden">
                {/* Top Header */}
                <div className="bg-white/80 backdrop-blur-md px-8 py-6 flex justify-between items-center z-10 sticky top-0 border-b border-gray-100/50">
                    <div>
                        <h2 className="text-3xl font-serif font-bold text-navy capitalize animate-fade-in-up">{activeTab.replace('_', ' ')}</h2>
                        <p className="text-gray-500 text-sm mt-1">Manage your platform efficiently.</p>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-full shadow-sm border border-gray-100">
                            <Clock size={18} className="text-gold" />
                            <span className="font-mono text-sm text-gray-600 font-medium">
                                {currentTime.toLocaleDateString()}
                            </span>
                            <span className="w-px h-4 bg-gray-200"></span>
                            <span className="font-mono text-sm text-navy font-bold">
                                {currentTime.toLocaleTimeString()}
                            </span>
                        </div>
                        <div className="w-10 h-10 bg-navy rounded-full flex items-center justify-center text-gold font-bold shadow-lg ring-4 ring-gold/20">
                            A
                        </div>
                    </div>
                </div>

                {/* Dashboard Area */}
                <div className="flex-1 overflow-auto p-8 lg:p-10 space-y-8">

                    {/* --- DASHBOARD OVERVIEW TAB --- */}
                    {/* --- DASHBOARD OVERVIEW TAB --- */}
                    {activeTab === 'dashboard' && (
                        <DashboardOverview
                            bookings={bookings}
                            lawyers={lawyers}
                            partners={partners}
                            setActiveTab={setActiveTab}
                        />
                    )}

                    {/* Stats Overview (Grid for other tabs - Simplified) */}
                    {activeTab !== 'dashboard' && (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {/* Conditional Secondary Stats */}
                            {activeTab === 'bookings' && (
                                <div className="col-span-4 bg-navy/5 p-4 rounded-xl border border-navy/10 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-navy text-white p-2 rounded-lg"><Calendar size={20} /></div>
                                        <div>
                                            <p className="text-xs font-bold text-navy uppercase">Total Bookings</p>
                                            <p className="text-xl font-serif font-bold">{bookings.length}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 text-center">
                                        <div>
                                            <p className="text-[10px] text-gray-500 uppercase">Upcoming</p>
                                            <p className="font-bold text-navy">{bookings.filter(b => b.status === 'upcoming').length}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-500 uppercase">Completed</p>
                                            <p className="font-bold text-navy">{bookings.filter(b => b.status === 'completed').length}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                    }

                    {/* --- LAWYERS TAB --- */}
                    {
                        activeTab === 'lawyers' && (
                            <div className="space-y-8 animate-fade-in">
                                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                                    <div className="flex gap-4 items-center w-full md:w-auto">
                                        <h3 className="font-bold text-navy text-lg whitespace-nowrap">
                                            {getFilteredLawyers().length} Experts
                                        </h3>
                                    </div>

                                    <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                                        {/* Sort Dropdown */}
                                        <select
                                            value={lawyerSort}
                                            onChange={(e) => setLawyerSort(e.target.value)}
                                            className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white font-bold text-sm text-navy outline-none focus:border-gold hover:border-gray-300 transition-colors cursor-pointer"
                                        >
                                            <option value="priority">Sort by: Priority</option>
                                            <option value="experience">Sort by: Experience</option>
                                            <option value="name">Sort by: Name</option>
                                        </select>

                                        {/* Search Input */}
                                        <div className="relative w-full md:w-64">
                                            <input
                                                type="text"
                                                placeholder="Search Name or Specialization..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/10 outline-none text-sm font-medium"
                                            />
                                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        </div>

                                        <button onClick={() => openLawyerModal()} className="px-6 py-2.5 bg-navy text-white rounded-xl font-bold hover:bg-gold hover:text-navy transition-all shadow-lg flex items-center gap-2 whitespace-nowrap">
                                            <Plus size={18} /> Add New
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {getFilteredLawyers().map(lawyer => (
                                        <div key={lawyer.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative">
                                            <div className="h-56 overflow-hidden bg-gray-100 relative">
                                                {lawyer.image ? (
                                                    <img src={lawyer.image} alt={lawyer.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50">No Image</div>
                                                )}
                                                <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                                {/* Priority Badge */}
                                                {lawyer.priority > 0 && (
                                                    <div className="absolute top-3 left-3 bg-gold text-navy text-[10px] font-bold px-2 py-1 rounded shadow-lg flex items-center gap-1">
                                                        <TrendingUp size={10} /> Priority {lawyer.priority}
                                                    </div>
                                                )}

                                                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                                                    <button onClick={() => openLawyerModal(lawyer)} className="bg-white/90 p-2 rounded-full shadow-lg hover:text-gold-dark hover:bg-white transition-colors"><Edit2 size={16} /></button>
                                                    <button onClick={() => handleDeleteLawyer(lawyer.id)} className="bg-white/90 p-2 rounded-full shadow-lg hover:text-red-600 hover:bg-white transition-colors"><Trash2 size={16} /></button>
                                                </div>
                                            </div>
                                            <div className="p-5">
                                                <h4 className="font-serif font-bold text-lg text-navy truncate leading-tight" title={lawyer.name}>{lawyer.name}</h4>
                                                <p className="text-xs text-gold-dark font-bold uppercase tracking-wider mb-3 mt-1">{lawyer.title}</p>

                                                <div className="space-y-2">
                                                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{lawyer.bio}</p>
                                                    <div className="flex flex-wrap gap-1 mt-3">
                                                        {lawyer.specialization && (Array.isArray(lawyer.specialization) ? lawyer.specialization : []).slice(0, 2).map((s, i) => (
                                                            <span key={i} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded-md">{s}</span>
                                                        ))}
                                                        {(lawyer.specialization?.length > 2) && <span className="text-[10px] text-gray-400 px-1 py-1">+{lawyer.specialization.length - 2} more</span>}
                                                    </div>
                                                </div>

                                                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-medium text-gray-400">
                                                    <span>{lawyer.experience} Exp</span>
                                                    <span className="flex items-center gap-1 text-green-600"><CheckCircle size={12} /> Verified</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    }

                    {/* --- BOOKINGS TAB --- */}
                    {
                        activeTab === 'bookings' && (
                            <div className="space-y-6 animate-fade-in">
                                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                    <div className="flex gap-2 p-1 bg-white rounded-xl shadow-sm border border-gray-100 w-fit">
                                        {['all', 'upcoming', 'completed', 'missed'].map(status => (
                                            <button
                                                key={status}
                                                onClick={() => setBookingFilter(status)}
                                                className={`px-5 py-2 rounded-lg text-sm font-bold capitalize transition-all duration-300 ${bookingFilter === status ? 'bg-navy text-white shadow-md' : 'text-gray-400 hover:text-navy hover:bg-gray-50'}`}
                                            >
                                                {status}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Search Input */}
                                    <div className="relative w-full md:w-64">
                                        <input
                                            type="text"
                                            placeholder="Search by Name, ID..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/10 outline-none text-sm font-medium"
                                        />
                                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="grid grid-cols-12 gap-4 px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
                                        <div className="col-span-3">Client details</div>
                                        <div className="col-span-3">Category</div>
                                        <div className="col-span-2">Date</div>
                                        <div className="col-span-2">Status</div>
                                        <div className="col-span-2 text-right">Time Slot</div>
                                    </div>

                                    {getFilteredBookings().map(item => (
                                        <div
                                            key={item.id}
                                            onClick={() => handleRowClick(item)}
                                            className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-gold/30 transition-all duration-300 grid grid-cols-12 gap-4 items-center group cursor-pointer"
                                        >
                                            <div className="col-span-3">
                                                <div className="font-bold text-navy text-base">{item.name || 'Anonymous'}</div>
                                                <div className="text-gray-400 text-sm font-medium">{item.phone}</div>
                                            </div>
                                            <div className="col-span-3">
                                                <span className="bg-navy/5 text-navy px-3 py-1 rounded-lg text-sm font-medium border border-navy/10">{item.category}</span>
                                            </div>
                                            <div className="col-span-2 text-sm text-gray-500 font-medium">
                                                {item.createdAt?.toDate ? item.createdAt.toDate().toLocaleDateString() : 'N/A'}
                                            </div>
                                            <div className="col-span-2">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5
                                                ${item.status === 'completed' ? 'bg-green-100 text-green-700' :
                                                        item.status === 'missed' ? 'bg-red-100 text-red-700' :
                                                            item.status === 'assigned' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'completed' ? 'bg-green-600' : item.status === 'missed' ? 'bg-red-600' : item.status === 'assigned' ? 'bg-blue-600' : 'bg-amber-600'}`}></span>
                                                    {item.status}
                                                </span>
                                                {item.lawyerName && <div className="text-[10px] text-gray-400 mt-1 font-medium">w/ {item.lawyerName}</div>}
                                            </div>
                                            <div className="col-span-2 flex justify-end gap-2 items-center opacity-100" onClick={e => e.stopPropagation()}>
                                                {/* Time Slot Display */}
                                                <div className={`text-xs font-bold px-2 py-1 rounded bg-gray-50 border border-gray-100 text-navy whitespace-nowrap ${!item.slot && !item.timeSlot ? 'text-gray-400 italic' : ''}`}>
                                                    {item.slot ? item.slot.split(' - ')[0] : (item.timeSlot || 'Not Set')}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    }

                    {/* --- PARTNERS TAB --- */}
                    {
                        activeTab === 'partners' && (
                            <div className="space-y-6 animate-fade-in">
                                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                    <div className="flex gap-2 p-1 bg-white rounded-xl shadow-sm border border-gray-100 w-fit">
                                        {['all', 'new', 'onboarding', 'verified', 'rejected'].map(status => (
                                            <button
                                                key={status}
                                                onClick={() => setPartnerFilter(status)}
                                                className={`px-5 py-2 rounded-lg text-sm font-bold capitalize transition-all duration-300 ${partnerFilter === status ? 'bg-navy text-white shadow-md' : 'text-gray-400 hover:text-navy hover:bg-gray-50'}`}
                                            >
                                                {status}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Search Input */}
                                    <div className="relative w-full md:w-64">
                                        <input
                                            type="text"
                                            placeholder="Search Partner Name..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/10 outline-none text-sm font-medium"
                                        />
                                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {getFilteredPartners().map(item => (
                                        <div
                                            key={item.id}
                                            onClick={() => handleRowClick(item)}
                                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-gold/30 transition-all duration-300 group relative overflow-hidden cursor-pointer"
                                        >
                                            <div className="absolute top-0 left-0 w-1 h-full bg-navy group-hover:bg-gold transition-colors"></div>
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h4 className="font-bold text-navy text-lg">{item.name}</h4>
                                                    <p className="text-gray-400 text-sm">{item.email}</p>
                                                </div>
                                                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${item.status === 'new' ? 'border-amber-200 text-amber-600 bg-amber-50' :
                                                    'border-gray-200 text-gray-500 bg-gray-50'
                                                    }`}>
                                                    {item.status}
                                                </span>
                                            </div>
                                            <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600 mb-6 font-medium">
                                                {item.specialization}
                                            </div>
                                            <div className="flex gap-2" onClick={e => e.stopPropagation()}>
                                                <button onClick={() => updateStatus('partners', item.id, 'onboarding')} className="flex-1 bg-navy text-white py-2 rounded-lg text-sm font-bold hover:bg-navy-light transition-colors">Onboard</button>
                                                <button onClick={() => updateStatus('partners', item.id, 'rejected')} className="px-3 py-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors"><X size={18} /></button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    }



                </div >
            </div >

            {/* --- LAWYER MODAL --- */}
            {
                isLawyerModalOpen && (
                    <div className="fixed inset-0 bg-navy/80 z-[60] flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
                        <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden transform scale-100 transition-all animate-scale-up">
                            <div className="bg-navy p-6 flex justify-between items-center text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl translate-x-10 -translate-y-10"></div>
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-serif font-bold text-gold">{currentLawyer ? 'Edit Counsel Profile' : 'Onboard New Counsel'}</h3>
                                    <p className="text-sm text-gray-300 mt-1 opacity-80">Enter the details ensuring accuracy for the platform.</p>
                                </div>
                                <button onClick={() => setIsLawyerModalOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors relative z-10"><X size={20} /></button>
                            </div>

                            <form onSubmit={handleSaveLawyer} className="p-8 space-y-6 max-h-[80vh] overflow-y-auto">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-gold focus:ring-4 focus:ring-gold/10 outline-none transition-all placeholder:text-gray-300 font-medium"
                                            value={lawyerForm.name}
                                            onChange={e => setLawyerForm({ ...lawyerForm, name: e.target.value })}
                                            placeholder="e.g. Advocate N. Ramanujam"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">Professional Title</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-gold focus:ring-4 focus:ring-gold/10 outline-none transition-all placeholder:text-gray-300 font-medium"
                                            value={lawyerForm.title}
                                            onChange={e => setLawyerForm({ ...lawyerForm, title: e.target.value })}
                                            placeholder="e.g. Senior Counsel"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">Experience</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                className="w-full px-4 py-3 pl-10 rounded-xl bg-gray-50 border border-gray-200 focus:border-gold focus:ring-4 focus:ring-gold/10 outline-none transition-all placeholder:text-gray-300 font-medium"
                                                value={lawyerForm.experience}
                                                onChange={e => setLawyerForm({ ...lawyerForm, experience: e.target.value })}
                                                placeholder="15+ Years"
                                                required
                                            />
                                            <Briefcase size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">Specialization</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-gold focus:ring-4 focus:ring-gold/10 outline-none transition-all placeholder:text-gray-300 font-medium"
                                            value={lawyerForm.specialization}
                                            onChange={e => setLawyerForm({ ...lawyerForm, specialization: e.target.value })}
                                            placeholder="Civil, Criminal..."
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">Priority Score</label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                className="w-full px-4 py-3 pl-10 rounded-xl bg-gray-50 border border-gray-200 focus:border-gold focus:ring-4 focus:ring-gold/10 outline-none transition-all placeholder:text-gray-300 font-medium"
                                                value={lawyerForm.priority}
                                                onChange={e => setLawyerForm({ ...lawyerForm, priority: parseInt(e.target.value) || 0 })}
                                                placeholder="0"
                                            />
                                            <TrendingUp size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        </div>
                                        <p className="text-[10px] text-gray-400 mt-1.5 ml-1">Higher numbers will appear first in the directory.</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">Profile Image</label>
                                    <div className="flex items-center gap-6 p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-gold/50 transition-colors bg-gray-50/50">
                                        <div className="flex-1">
                                            <label className="cursor-pointer group flex flex-col items-center justify-center py-4">
                                                <div className="w-10 h-10 rounded-full bg-navy/5 flex items-center justify-center text-navy mb-2 group-hover:bg-navy group-hover:text-white transition-colors">
                                                    <Users size={20} />
                                                </div>
                                                <span className="text-sm font-bold text-navy group-hover:underline">Click to upload image</span>
                                                <span className="text-xs text-gray-400 mt-1">Max 5MB (JPG, PNG)</span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={async (e) => {
                                                        const file = e.target.files[0];
                                                        if (file) {
                                                            if (file.size > 5 * 1024 * 1024) {
                                                                alert("Image is too large. Please choose an image under 5MB.");
                                                                return;
                                                            }
                                                            try {
                                                                const confirmUpload = window.confirm("Upload this image?");
                                                                if (!confirmUpload) return;
                                                                const storageRef = ref(storage, `lawyers/${Date.now()}_${file.name}`);
                                                                await uploadBytes(storageRef, file);
                                                                const downloadURL = await getDownloadURL(storageRef);
                                                                setLawyerForm({ ...lawyerForm, image: downloadURL });
                                                            } catch (error) {
                                                                console.error("Upload failed", error);
                                                                alert("Image upload failed.");
                                                            }
                                                        }
                                                    }}
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>
                                        {lawyerForm.image && (
                                            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg relative group shrink-0">
                                                <img src={lawyerForm.image} alt="Preview" className="w-full h-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => setLawyerForm({ ...lawyerForm, image: '' })}
                                                    className="absolute inset-0 bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">Biography</label>
                                    <textarea
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-gold focus:ring-4 focus:ring-gold/10 outline-none transition-all placeholder:text-gray-300 min-h-[120px] resize-y font-medium text-sm leading-relaxed"
                                        value={lawyerForm.bio}
                                        onChange={e => setLawyerForm({ ...lawyerForm, bio: e.target.value })}
                                        placeholder="Enter a brief professional biography..."
                                        required
                                    ></textarea>
                                </div>

                                <div className="pt-2 flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsLawyerModalOpen(false)}
                                        className="flex-1 px-6 py-3.5 rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-[2] bg-navy text-white font-bold py-3.5 rounded-xl shadow-lg hover:bg-gold hover:text-navy hover:shadow-xl transition-all flex items-center justify-center gap-2"
                                    >
                                        <CheckCircle size={20} />
                                        {currentLawyer ? 'Update Profile' : 'Save Lawyer'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
            {/* --- DETAIL MODAL --- */}
            <DetailModal
                selectedItem={selectedItem}
                onClose={() => setSelectedItem(null)}
                activeTab={activeTab}
                onAccept={openAssignmentModal}
            />

            {/* --- ASSIGNMENT MODAL --- */}
            <AssignmentModal
                isOpen={isAssignmentModalOpen}
                onClose={() => setIsAssignmentModalOpen(false)}
                assignmentData={assignmentData}
                setAssignmentData={setAssignmentData}
                lawyers={lawyers}
                onAssign={handleAssignLawyer}
            />
        </div>
    );
};

export default AdminDashboard;
