
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PublicLayout = () => {
    const location = useLocation();

    return (
        <div className="min-h-screen font-sans bg-cream flex flex-col">
            <Navbar />
            <div className="flex-grow">
                <Outlet />
            </div>
            {location.pathname !== '/' && <Footer />}
        </div>
    );
};

export default PublicLayout;
