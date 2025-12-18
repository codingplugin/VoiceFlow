import { useState } from 'react';
import { useAudioRecorder } from '../../hooks/useAudioRecorder.ts';
import { WaveformVisualizer } from './WaveformVisualizer'; // Import

export const AudioRecorder = () => {
    const {
        isRecording,
        hasPermission,
        connectionStatus,
        transcript,
        startRecording,
        stopRecording,
        clearTranscript,
        updateTranscript,
        language,
        setLanguage,
        analyser // Destructure analyser
    } = useAudioRecorder();

    const [isCopied, setIsCopied] = useState(false);

    const languages = [
        { code: 'en-US', label: 'English' },
        { code: 'hi', label: 'Hindi' },
    ];

    const handleCopy = () => {
        if (!transcript) return;
        navigator.clipboard.writeText(transcript);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className="w-full max-w-6xl p-4 grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* LEFT COLUMN: CONTROLS */}
            <div className="bg-white dark:bg-black border-4 border-black dark:border-white comic-shadow p-6 flex flex-col justify-between min-h-[400px]">
                <div>
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6 border-b-2 border-black dark:border-white pb-2">
                        <span className="font-bold font-mono text-sm uppercase tracking-widest text-black dark:text-white">
                            CONTROLS
                        </span>
                        <div className={`w-3 h-3 border-2 border-black dark:border-white rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-300 dark:bg-gray-700'}`}></div>
                    </div>

                    {/* Language Selector */}
                    <div className="mb-6">
                        <label className="block text-xs font-mono font-bold uppercase mb-2 text-gray-600 dark:text-gray-400">
                            Language
                        </label>
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            disabled={isRecording}
                            className={`w-full p-2 border-2 border-black dark:border-white bg-white dark:bg-gray-900 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 ${isRecording ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {languages.map(lang => (
                                <option key={lang.code} value={lang.code}>
                                    {lang.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Main Button */}
                    <div className="flex flex-col items-center gap-6">
                        <div className="text-center space-y-2">
                            <h3 className="font-black text-2xl uppercase text-black dark:text-white">
                                {isRecording ? 'ON AIR' : 'STANDBY'}
                            </h3>
                            <p className="font-mono text-xs text-gray-600 dark:text-gray-400">
                                {isRecording ? 'Streaming Raw Audio...' : 'Waiting for Input'}
                            </p>
                        </div>

                        <button
                            onClick={isRecording ? stopRecording : startRecording}
                            className={`
                                relative group overflow-hidden px-8 py-4 w-full
                                border-4 border-black dark:border-white 
                                font-black uppercase tracking-wider text-lg
                                transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none
                                ${isRecording
                                    ? 'bg-red-500 text-white comic-shadow hover:bg-red-600'
                                    : 'bg-black text-white dark:bg-white dark:text-black comic-shadow hover:bg-gray-900 dark:hover:bg-gray-200'}
                            `}
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {isRecording ? (
                                    <>
                                        <div className="w-4 h-4 bg-white rounded-sm animate-spin"></div>
                                        STOP
                                    </>
                                ) : (
                                    <>
                                        START RECORDING
                                    </>
                                )}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Status */}
                <div className="flex flex-col gap-4">
                    <div className="space-y-1">
                        <div className="flex justify-between text-xs font-mono font-bold text-black dark:text-white">
                            <span>AUDIO SIGNAL</span>
                            <span className={isRecording ? "text-red-500 animate-pulse" : "text-gray-400"}>
                                {isRecording ? "LIVE" : "OFFLINE"}
                            </span>
                        </div>

                        <div className="h-16 border-2 border-black dark:border-white bg-gray-50 dark:bg-gray-800 w-full overflow-hidden relative flex items-center justify-center">
                            <WaveformVisualizer analyser={analyser} isRecording={isRecording} />
                        </div>
                    </div>

                    <div className="pt-4 border-t-2 border-dashed border-black dark:border-white text-center">
                        <span className={`font-mono text-xs font-bold ${hasPermission ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}`}>
                            MIC: {hasPermission ? 'OK' : '--'}
                        </span>
                        <span className="mx-2">|</span>
                        <span className={`font-mono text-xs font-bold ${connectionStatus.includes('Error') ? 'text-red-600' : (connectionStatus === 'Connected' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500')}`}>
                            SERVER: {connectionStatus.toUpperCase()}
                        </span>
                    </div>
                </div>
            </div>

            {/* RIGHT COLUMN: TRANSCRIPT */}
            <div className="bg-gray-100 dark:bg-gray-900 border-4 border-black dark:border-white comic-shadow flex flex-col min-h-[400px]">
                <div className="bg-black dark:bg-white text-white dark:text-black px-4 py-3 font-bold text-sm uppercase flex justify-between items-center border-b-4 border-black dark:border-white">
                    <span>LIVE TRANSCRIPT</span>
                    <div className="flex gap-4">
                        <button onClick={handleCopy} className="hover:text-gray-300 dark:hover:text-gray-600 transition-colors uppercase font-mono text-xs">
                            {isCopied ? "✓ COPIED" : "COPY"}
                        </button>
                        <button onClick={clearTranscript} className="hover:text-red-400 dark:hover:text-red-600 transition-colors uppercase font-mono text-xs">CLEAR</button>
                    </div>
                </div>

                <div className="flex-grow p-6 relative flex flex-col h-[500px]">
                    {transcript || isRecording ? (
                        <textarea
                            value={transcript}
                            onChange={(e) => updateTranscript(e.target.value)}
                            className="w-full h-full p-0 resize-none border-none outline-none bg-transparent font-mono text-lg text-black dark:text-white leading-relaxed placeholder-gray-400 dark:placeholder-gray-600"
                            placeholder="Start recording or type here..."
                            spellCheck={false}
                        />
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-600 space-y-2 opacity-50">
                            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                            </svg>
                            <span className="font-mono text-sm uppercase">Waiting for speech...</span>
                            {connectionStatus === "Connected" && (
                                <span className="text-xs animate-pulse">Streaming raw audio...</span>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
