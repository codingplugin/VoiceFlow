import { useState, useRef, useEffect, useCallback } from 'react';
import { DeepgramService } from '../services/deepgram';

export interface UseAudioRecorderReturn {
    isRecording: boolean;
    hasPermission: boolean;
    connectionStatus: string;
    transcript: string;
    volume: number;
    startRecording: () => Promise<void>;
    stopRecording: () => void;
    clearTranscript: () => void;
    updateTranscript: (text: string) => void;
    language: string;
    setLanguage: (lang: string) => void;
    analyser: AnalyserNode | null;
}

export const useAudioRecorder = (): UseAudioRecorderReturn => {
    const [isRecording, setIsRecording] = useState(false);
    const [hasPermission, setHasPermission] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState("Idle");
    const [finalTranscript, setFinalTranscript] = useState("");
    const [interimTranscript, setInterimTranscript] = useState("");
    const [volume, setVolume] = useState(0);
    const [language, setLanguage] = useState("en-US"); // Default to English

    const deepgramRef = useRef<DeepgramService | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const processorRef = useRef<ScriptProcessorNode | null>(null);
    const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    const cleanupAudio = useCallback(() => {
        if (deepgramRef.current) deepgramRef.current.disconnect();

        if (processorRef.current) {
            processorRef.current.disconnect();
            processorRef.current.onaudioprocess = null;
            processorRef.current = null;
        }
        if (sourceRef.current) {
            sourceRef.current.disconnect();
            sourceRef.current = null;
        }
        if (analyserRef.current) {
            analyserRef.current.disconnect();
            analyserRef.current = null;
        }
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        if (audioContextRef.current) {
            audioContextRef.current.close().catch(console.error);
            audioContextRef.current = null;
        }
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    }, []);

    useEffect(() => {
        return () => {
            cleanupAudio();
        };
    }, [cleanupAudio]);

    const startRecording = async () => {
        try {
            cleanupAudio();

            const apiKey = localStorage.getItem('voiceflow_deepgram_api_key');
            if (!apiKey) {
                setConnectionStatus("Error: API Key Missing");
                alert("API Key not found! Please enter it in the settings.");
                return;
            }
            // Pass the key to the service if needed, but the DeepgramService might look for it.
            // Actually, we need to update how we pass it or ensure DeepgramService uses it.
            // Let's check DeepgramService next. For now, assuming we pass it or it needs to be set.

            // Initialize Deepgram
            deepgramRef.current = new DeepgramService(
                (text: string, isFinal: boolean) => {
                    if (isFinal) {
                        setFinalTranscript(prev => prev + " " + text);
                        setInterimTranscript("");
                    } else {
                        setInterimTranscript(text);
                    }
                },
                (status: string) => {
                    setConnectionStatus(status);
                },
                apiKey // Pass the key here
            );

            // High Quality Audio Constraints
            // We disable browser processing (echo cancellation, noise suppression) because 
            // it often aggressively filters out "background" audio like music or quiet speech.
            // Deepgram's own noise handling is usually superior for transcription.
            const constraints = {
                audio: {
                    echoCancellation: false,
                    noiseSuppression: false,
                    autoGainControl: false,
                    channelCount: 1
                }
            };

            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            streamRef.current = stream;
            setHasPermission(true);

            // Initialize AudioContext
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            const audioContext = new AudioContextClass();
            audioContextRef.current = audioContext;

            // CRITICAL: Ensure Context is running (fixes silent audio issues)
            if (audioContext.state === 'suspended') {
                await audioContext.resume();
            }

            const sampleRate = audioContext.sampleRate;


            deepgramRef.current.connect(sampleRate, language);

            // Setup Audio Routing
            const source = audioContext.createMediaStreamSource(stream);
            sourceRef.current = source;

            const processor = audioContext.createScriptProcessor(4096, 1, 1);
            processorRef.current = processor;

            const analyser = audioContext.createAnalyser();
            analyser.fftSize = 256;
            analyserRef.current = analyser;

            source.connect(analyser);
            source.connect(processor);

            // Connect to destination to ensure processor runs
            const gain = audioContext.createGain();
            gain.gain.value = 0;
            processor.connect(gain);
            gain.connect(audioContext.destination);

            // Audio Processing Loop
            processor.onaudioprocess = (e) => {
                const inputData = e.inputBuffer.getChannelData(0);
                const buffer = new Int16Array(inputData.length);
                for (let i = 0; i < inputData.length; i++) {
                    let s = Math.max(-1, Math.min(1, inputData[i]));
                    buffer[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
                }

                if (deepgramRef.current) {
                    deepgramRef.current.sendAudio(buffer.buffer);
                }
            };

            // Visualizer Loop
            const updateVolume = () => {
                if (analyserRef.current) {
                    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
                    analyserRef.current.getByteFrequencyData(dataArray);
                    const avg = dataArray.reduce((p, c) => p + c, 0) / dataArray.length;
                    setVolume(avg);
                }
                animationFrameRef.current = requestAnimationFrame(updateVolume);
            };
            updateVolume();

            setIsRecording(true);

        } catch (err) {
            console.error("Error accessing microphone:", err);
            setHasPermission(false);
            setConnectionStatus("Error: Mic Access");
            alert("Could not access microphone! Check system permissions.");
        }
    };

    const stopRecording = () => {
        setIsRecording(false);
        cleanupAudio();
        setVolume(0);
        setConnectionStatus("Disconnected");
    };

    const clearTranscript = () => {
        setFinalTranscript("");
        setInterimTranscript("");
    };

    const updateTranscript = (text: string) => {
        setFinalTranscript(text);
        setInterimTranscript(""); // Clear interim when manually updating to avoid duplication
    };

    const transcript = (finalTranscript + (interimTranscript ? " " + interimTranscript : "")).trim();

    return {
        isRecording,
        hasPermission,
        connectionStatus,
        transcript,
        volume,
        startRecording,
        stopRecording,
        clearTranscript,
        updateTranscript,
        language,
        setLanguage,
        analyser: analyserRef.current
    };
};
