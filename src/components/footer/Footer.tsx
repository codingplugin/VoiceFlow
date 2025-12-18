import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <footer className="w-full border-t-4 border-black dark:border-gray-600 bg-white dark:bg-black py-8 mt-12">
            <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                    <span className="font-black text-xl tracking-tighter text-black dark:text-white uppercase">
                        VoiceFlow
                    </span>
                    <span className="text-xs font-mono bg-black text-white dark:bg-white dark:text-black px-2 py-0.5 transform -skew-x-12">
                        v1.0
                    </span>
                </div>

                <div className="flex gap-6 font-mono text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                    <Link to="/privacy" className="hover:text-black dark:hover:text-white hover:underline decoration-2 underline-offset-4 transition-all">
                        Privacy
                    </Link>
                    <Link to="/terms" className="hover:text-black dark:hover:text-white hover:underline decoration-2 underline-offset-4 transition-all">
                        Terms
                    </Link>
                    <Link to="/contact" className="hover:text-black dark:hover:text-white hover:underline decoration-2 underline-offset-4 transition-all">
                        Contact
                    </Link>
                </div>

                <div className="text-xs font-mono text-gray-500">
                    © {new Date().getFullYear()} VoiceFlow AI
                </div>
            </div>
        </footer>
    );
};
