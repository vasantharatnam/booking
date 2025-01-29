// src/components/Layout/Footer.jsx

import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white p-4 mt-10">
            <div className="max-w-6xl mx-auto text-center">
                &copy; {new Date().getFullYear()} Train Booking System. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
