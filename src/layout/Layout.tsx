import React from 'react';
import { Navbar } from '../components/navbar/Navbar';
import { Footer } from '../components/footer/Footer';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen w-full bg-white dark:bg-black text-black dark:text-white transition-colors duration-200 font-sans flex flex-col">
            <Navbar />
            <main className="max-w-4xl mx-auto p-4 flex-grow w-full">
                {children}
            </main>
            <Footer />
        </div>
    );
};
