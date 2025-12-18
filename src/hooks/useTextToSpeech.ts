import { useState } from 'react';

export interface Voice {
    id: string;
    name: string;
    gender: 'Male' | 'Female';
    accent: string;
}

const VOICES: Voice[] = [
    { id: 'aura-asteria-en', name: 'Asteria', gender: 'Female', accent: 'US' },
    { id: 'aura-luna-en', name: 'Luna', gender: 'Female', accent: 'US' },
    { id: 'aura-orion-en', name: 'Orion', gender: 'Male', accent: 'US' },
    { id: 'aura-arcas-en', name: 'Arcas', gender: 'Male', accent: 'US' },
    { id: 'aura-athena-en', name: 'Athena', gender: 'Female', accent: 'UK' },
    { id: 'aura-helios-en', name: 'Helios', gender: 'Male', accent: 'UK' }
];

export const useTextToSpeech = () => {
    const [text, setText] = useState("");
    const [selectedVoice, setSelectedVoice] = useState<string>(VOICES[0].id);
    const [isLoading, setIsLoading] = useState(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [previewAudio, setPreviewAudio] = useState<HTMLAudioElement | null>(null);
    const [isPlayingPreview, setIsPlayingPreview] = useState(false);
    const [previewingVoiceId, setPreviewingVoiceId] = useState<string | null>(null);

    const previewVoice = async (voiceId: string) => {
        // Handle Toggle Logic
        if (voiceId === previewingVoiceId && previewAudio) {
            if (isPlayingPreview) {
                previewAudio.pause();
                setIsPlayingPreview(false);
            } else {
                previewAudio.play();
                setIsPlayingPreview(true);
            }
            return;
        }

        // Stop existing audio if switching voices
        if (previewAudio) {
            previewAudio.pause();
            setIsPlayingPreview(false);
        }

        try {
            // Play from Local File (Optimization)
            const audio = new Audio(`/voices/${voiceId}.mp3`);

            audio.onended = () => {
                setIsPlayingPreview(false);
                setPreviewingVoiceId(null);
            };

            audio.onerror = (e) => {
                console.error("Audio playback error", e);
                // Fallback catch would go here if needed, but we assume files exist.
            };

            await audio.play();
            setPreviewAudio(audio);
            setPreviewingVoiceId(voiceId);
            setIsPlayingPreview(true);

        } catch (err) {
            console.error("Preview failed", err);
        }
    };

    const speak = async () => {
        if (!text.trim()) return;

        setIsLoading(true);
        setError(null);
        setAudioUrl(null);

        // Stop preview if running
        if (previewAudio) {
            previewAudio.pause();
            setIsPlayingPreview(false);
            setPreviewAudio(null);
            setPreviewingVoiceId(null);
        }

        try {
            // Retrieve key from LocalStorage to avoid hooking into Context conditionally inside async function
            const apiKey = localStorage.getItem('voiceflow_deepgram_api_key');
            if (!apiKey) throw new Error("API Key Missing. Please refresh.");

            const response = await fetch(`https://api.deepgram.com/v1/speak?model=${selectedVoice}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text })
            });

            if (!response.ok) {
                throw new Error("Failed to generate speech");
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            setAudioUrl(url);

            // Auto play
            // Auto play handled by the UI component now

        } catch (err: any) {
            console.error(err);
            setError(err.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        text,
        setText,
        voices: VOICES,
        selectedVoice,
        setSelectedVoice,
        speak,
        previewVoice,
        isPlayingPreview,
        previewingVoiceId,
        isLoading,
        audioUrl,
        error
    };
};
