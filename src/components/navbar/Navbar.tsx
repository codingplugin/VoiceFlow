import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from "../../hooks/useTheme";
import { ApiKeyModal } from '../modals/ApiKeyModal';

export const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const [isApiModalOpen, setIsApiModalOpen] = useState(false);

    return (
        <nav className="w-full border-b-4 border-black dark:border-white bg-white dark:bg-black transition-colors duration-200 sticky top-0 z-50">
            <div className="max-w-4xl mx-auto px-4 h-20 flex items-center justify-between">

                {/* Left Section: Logo & Nav */}
                <div className="flex items-center gap-8">
                    {/* Logo Section */}
                    <Link to="/" className="flex items-center gap-2 group cursor-pointer decoration-transparent">
                        <div className="w-10 h-10 bg-black dark:bg-white border-2 border-black dark:border-white flex items-center justify-center comic-shadow group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-none transition-all">
                            <span className="text-white dark:text-black font-bold text-xl italic">V</span>
                        </div>
                        <span className="font-black text-2xl tracking-tighter text-black dark:text-white uppercase transform -skew-x-6">VoiceFlow</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link to="/" className="font-mono font-bold uppercase text-sm hover:underline decoration-2 underline-offset-4 text-black dark:text-white">
                            Home
                        </Link>

                        {/* Tools Dropdown */}
                        <div className="relative group">
                            <button className="flex items-center gap-1 font-mono font-bold uppercase text-sm hover:underline decoration-2 underline-offset-4 text-black dark:text-white focus:outline-none">
                                Tools
                                <svg className="w-4 h-4 transform group-hover:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Dropdown Content */}
                            <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-black border-2 border-black dark:border-white comic-shadow opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col p-2 z-50">
                                <Link
                                    to="/speech-to-text"
                                    className="block px-4 py-2 font-mono text-sm font-bold text-black dark:text-white hover:bg-yellow-400 hover:text-black transition-colors mb-1"
                                >
                                    Speech to Text
                                </Link>
                                <Link
                                    to="/text-to-speech"
                                    className="block px-4 py-2 font-mono text-sm font-bold text-black dark:text-white hover:bg-blue-400 hover:text-black transition-colors"
                                >
                                    Text to Speech
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Section: API & Theme */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsApiModalOpen(true)}
                        className="p-2 border-2 border-black dark:border-gray-600 bg-green-400 dark:bg-green-600 text-black dark:text-white comic-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all font-bold font-mono text-xs uppercase"
                    >
                        API Key 🔑
                    </button>

                    <button
                        onClick={toggleTheme}
                        className="p-2 border-2 border-black dark:border-gray-600 bg-white dark:bg-black text-black dark:text-white comic-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                        aria-label="Toggle Theme"
                    >
                        {theme === 'light' ? (
                            <span className="font-bold text-xs uppercase px-2">Dark</span>
                        ) : (
                            <span className="font-bold text-xs uppercase px-2">Light</span>
                        )}
                    </button>
                </div>

                <ApiKeyModal isOpen={isApiModalOpen} onClose={() => setIsApiModalOpen(false)} />
            </div>
        </nav>
    );
};
