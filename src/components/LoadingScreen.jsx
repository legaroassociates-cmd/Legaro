import React, { useEffect, useState } from 'react';
import { Shield } from 'lucide-react';

const LoadingScreen = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return prev + 5;
            });
        }, 20); // Much faster animation (approx 0.4s-0.5s)

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="fixed inset-0 z-50 bg-navy flex flex-col items-center justify-center text-white">
            <div className="relative mb-8">
                {/* Pulsing Background */}
                <div className="absolute inset-0 bg-gold/20 rounded-full blur-xl animate-pulse"></div>

                {/* Logo Icon */}
                <div className="relative z-10 p-6 bg-white/5 rounded-full border border-gold/30 backdrop-blur-sm animate-bounce-slow">
                    <Shield size={64} className="text-gold" />
                </div>
            </div>

            {/* Brand Name */}
            <h1 className="text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gold to-white animate-shimmer mb-6 tracking-wider">
                LEGARO
            </h1>

            {/* Progress Bar Container */}
            <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden relative">
                {/* Filled Loading Bar */}
                <div
                    className="absolute top-0 left-0 h-full bg-gold transition-all duration-100 ease-out shadow-[0_0_10px_rgba(251,191,36,0.5)]"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

            {/* Tagline */}
            <p className="mt-4 text-xs font-medium text-gray-400 uppercase tracking-[0.2em] animate-fade-in">
                Legal Services Simplified
            </p>
        </div>
    );
};

export default LoadingScreen;
