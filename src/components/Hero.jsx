import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div className="relative w-full">
            {/* 
        Main Hero Image
        - w-full: Stretches to full screen width.
        - h-auto: Maintains aspect ratio (height scales with width).
        - block: Removes bottom whitespace.
      */}
            <img
                src="/assets/hero-image.png"
                alt="Hero Background"
                className="w-full h-auto block"
            />

            {/* 
        Content Overlay 
        - Absolute positioning on top of the image.
        - Uses 'inset-0' to cover the same area.
        - Flexbox to center or align content as needed.
      */}
            <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4 md:px-16">

                    {/* Content Container - Matching previous alignment */}
                    <div className="md:w-[60%] lg:w-[50%]">

                        <h1 className="text-2xl md:text-5xl lg:text-[3.5rem] font-serif mb-2 md:mb-6 leading-[1.1] tracking-wide text-white drop-shadow-lg">
                            Connect with Top <br />
                            <span className="text-[#E5C585]">
                                Lawyers in Tamil Nadu
                            </span>
                        </h1>

                        <h2 className="text-sm md:text-2xl font-light mb-4 md:mb-8 text-white tracking-wide drop-shadow-md">
                            Book a 30-Minute Legal Consultation Online
                        </h2>

                        <div className="hidden md:flex flex-col gap-2 md:gap-4 mb-4 md:mb-10 pl-1">
                            <div className="flex items-start gap-3">
                                <span className="text-[#E5C585] text-xl font-bold mt-1 drop-shadow-md">✓</span>
                                <span className="text-lg opacity-95 font-light tracking-wide text-white drop-shadow-md">Get great legal advice from trusted, independent lawyers</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-[#E5C585] text-xl font-bold drop-shadow-md">✓</span>
                                <span className="text-lg opacity-95 font-light tracking-wide text-white drop-shadow-md">Professional Consultation</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-[#E5C585] text-xl font-bold drop-shadow-md">✓</span>
                                <span className="text-lg opacity-95 font-light tracking-wide text-white drop-shadow-md">Confidential & Secure</span>
                            </div>
                        </div>

                        <Link to="/book-consultation">
                            <button className="bg-gradient-to-r from-[#C5A065] via-[#F3E5AB] to-[#C5A065] text-[#1E2535] font-bold text-xs md:text-lg px-6 md:px-10 py-3 md:py-4 rounded-xl shadow-lg hover:shadow-2xl hover:brightness-105 transition-all transform hover:-translate-y-0.5 tracking-wide border border-[#C5A065]/30 scale-90 origin-left md:scale-100">
                                Book 30-Min Consultation @299
                            </button>
                        </Link>

                        {/* Tamil Tagline - Hidden on small mobile to avoid crowd, scaling on desktop */}
                        <div className="mt-4 md:mt-12 hidden md:block">
                            <p className="text-xl md:text-2xl font-bold text-navy drop-shadow-sm inline-block bg-cream/90 px-6 py-3 rounded-md shadow-lg">
                                உங்கள் வழக்கறிஞரை ஆன்லைனில் எளிதாக அணுகுங்கள்
                            </p>
                        </div>

                    </div>
                </div>
            </div>

            {/* Mobile-only fallback for Tagline if needed below image */}
            <div className="md:hidden bg-cream p-4 text-center border-t border-gold/30">
                <p className="text-base font-bold text-navy">
                    உங்கள் வழக்கறிஞரை ஆன்லைனில் எளிதாக அணுகுங்கள்
                </p>
            </div>
        </div>
    );
};

export default Hero;
