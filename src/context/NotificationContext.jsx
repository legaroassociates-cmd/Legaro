import React, { createContext, useContext, useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const showNotification = (message, type = 'info', duration = 3000) => {
        const id = Date.now();
        setNotifications(prev => [...prev, { id, message, type, duration }]);

        // Auto remove
        setTimeout(() => {
            removeNotification(id);
        }, duration);
    };

    const removeNotification = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}

            {/* Toast Container */}
            <div className="fixed top-24 right-4 z-[100] flex flex-col gap-3 pointer-events-none">
                {notifications.map(notification => (
                    <div
                        key={notification.id}
                        className={`
                            pointer-events-auto transform transition-all duration-300 ease-in-out
                            flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl min-w-[300px] max-w-sm
                            border border-white/20 backdrop-blur-md animate-slide-in
                            ${notification.type === 'success' ? 'bg-green-600 text-white' :
                                notification.type === 'error' ? 'bg-red-600 text-white' :
                                    notification.type === 'warning' ? 'bg-amber-500 text-white' :
                                        'bg-navy text-white'}
                        `}
                    >
                        <div className="flex-shrink-0">
                            {notification.type === 'success' && <CheckCircle size={20} />}
                            {notification.type === 'error' && <AlertCircle size={20} />}
                            {notification.type === 'warning' && <AlertTriangle size={20} />}
                            {notification.type === 'info' && <Info size={20} />}
                        </div>
                        <p className="flex-1 text-sm font-medium">{notification.message}</p>
                        <button
                            onClick={() => removeNotification(notification.id)}
                            className="p-1 rounded-full hover:bg-white/20 transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>
                ))}
            </div>

            {/* Simple Slide In Animation Style */}
            <style>{`
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                .animate-slide-in {
                    animation: slideIn 0.3s ease-out forwards;
                }
            `}</style>
        </NotificationContext.Provider>
    );
};
