
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PublicLayout = () => {
    return (
        <div className="min-h-screen font-sans bg-cream flex flex-col">
            <Navbar />
            <div className="flex-grow">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default PublicLayout;
