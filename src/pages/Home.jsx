import React from 'react';
import Hero from '../components/Hero';
import useDocumentTitle from '../hooks/useDocumentTitle';

const Home = () => {
    useDocumentTitle('Legaro | Top Lawyers in Tamil Nadu');
    return (
        <div>
            <Hero />
        </div>
    );
};

export default Home;
