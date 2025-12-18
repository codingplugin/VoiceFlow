import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface ApiKeyContextType {
    apiKey: string | null;
    setApiKey: (key: string) => void;
    clearApiKey: () => void;
}

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

const API_KEY_STORAGE_KEY = 'voiceflow_deepgram_api_key';

export const ApiKeyProvider = ({ children }: { children: ReactNode }) => {
    const [apiKey, setApiKeyState] = useState<string | null>(null);

    useEffect(() => {
        const storedKey = localStorage.getItem(API_KEY_STORAGE_KEY);
        if (storedKey) {
            setApiKeyState(storedKey);
        }
    }, []);

    const setApiKey = (key: string) => {
        localStorage.setItem(API_KEY_STORAGE_KEY, key);
        setApiKeyState(key);
    };

    const clearApiKey = () => {
        localStorage.removeItem(API_KEY_STORAGE_KEY);
        setApiKeyState(null);
    };

    return (
        <ApiKeyContext.Provider value={{ apiKey, setApiKey, clearApiKey }}>
            {children}
        </ApiKeyContext.Provider>
    );
};

export const useApiKey = () => {
    const context = useContext(ApiKeyContext);
    if (!context) {
        throw new Error("useApiKey must be used within an ApiKeyProvider");
    }
    return context;
};
