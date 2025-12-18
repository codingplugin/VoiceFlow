import { useState, useEffect } from 'react';
import { useApiKey } from '../../contexts/ApiKeyContext';

interface ApiKeyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ApiKeyModal = ({ isOpen, onClose }: ApiKeyModalProps) => {
    const { apiKey, setApiKey } = useApiKey();
    const [inputKey, setInputKey] = useState("");
    const [error, setError] = useState<string | null>(null);

    // Initial load
    useEffect(() => {
        if (apiKey) setInputKey(apiKey);
    }, [apiKey]);

    // Reset key input when modal closes or opens
    useEffect(() => {
        if (isOpen && apiKey) {
            setInputKey(apiKey);
        }
    }, [isOpen, apiKey]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!inputKey.trim()) {
            setError("API Key cannot be empty");
            return;
        }

        if (inputKey.length < 10) {
            setError("Invalid Key Format");
            return;
        }

        setApiKey(inputKey.trim());
        setError(null);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="relative bg-white dark:bg-black border-4 border-black dark:border-white comic-shadow max-w-md w-full p-8 animate-bounce-in">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-red-500 text-white w-8 h-8 font-black border-2 border-black flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                    ✕
                </button>

                <div className="text-center mb-6">
                    <h2 className="text-3xl font-black uppercase text-black dark:text-white mb-2">
                        API Settings
                    </h2>
                    <p className="font-mono text-xs text-gray-600 dark:text-gray-400">
                        Enter your Deepgram API Key to unlock features.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="password"
                            value={inputKey}
                            onChange={(e) => setInputKey(e.target.value)}
                            placeholder="Enter your Deepgram API Key"
                            className="w-full p-4 border-2 border-black dark:border-white bg-gray-50 dark:bg-gray-900 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            autoFocus
                        />
                        {error && (
                            <p className="text-red-500 font-bold text-xs mt-1 font-mono">
                                ⚠ {error}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-wider hover:translate-y-[1px] active:translate-y-[2px] transition-transform"
                    >
                        Save Key 💾
                    </button>

                    <div className="text-center mt-4">
                        <p className="text-[10px] text-gray-400 font-mono">
                            Your key is stored locally in your browser/device.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};
