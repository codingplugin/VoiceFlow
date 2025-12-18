import { useState, useEffect } from 'react';
import { useTextToSpeech } from "../hooks/useTextToSpeech";

export const TextToSpeech = () => {
    const {
        text,
        setText,
        voices,
        selectedVoice,
        setSelectedVoice,
        speak,
        previewVoice,
        isPlayingPreview,
        previewingVoiceId,
        isLoading,
        audioUrl,
        error
    } = useTextToSpeech();

    const [isGeneratedAudioPlaying, setIsGeneratedAudioPlaying] = useState(false);

    // Reset playing state when new audio is generated
    useEffect(() => {
        if (audioUrl) {
            setIsGeneratedAudioPlaying(true);
        }
    }, [audioUrl]);

    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
            <div className="text-center mb-4">
                <h1 className="text-4xl font-black uppercase text-black dark:text-white mb-2">
                    Text to Speech
                </h1>
                <p className="font-mono text-gray-600 dark:text-gray-400">
                    Generate lifelike audio from text using Deepgram Aura
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Panel: Voice Selection (Scrollable List) */}
                <div className="lg:col-span-4 flex flex-col gap-4">
                    <label className="block text-xs font-mono font-bold uppercase text-gray-600 dark:text-gray-400">
                        Select Voice
                    </label>
                    <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-2">
                        {voices.map(voice => (
                            <div
                                key={voice.id}
                                onClick={() => setSelectedVoice(voice.id)}
                                className={`
                                    relative p-4 border-2 cursor-pointer transition-all
                                    ${selectedVoice === voice.id
                                        ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white comic-shadow translate-x-1 translate-y-1 shadow-none'
                                        : 'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white text-black dark:text-white'}
                                `}
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="font-bold text-sm uppercase">{voice.name}</h3>
                                        <p className="text-xs font-mono opacity-70">{voice.gender} • {voice.accent}</p>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            previewVoice(voice.id);
                                        }}
                                        className={`w-8 h-8 flex items-center justify-center rounded-full border-2 border-black transition-transform hover:scale-110 ${previewingVoiceId === voice.id && isPlayingPreview
                                            ? 'bg-red-400 text-white'
                                            : 'bg-yellow-400 text-black'
                                            }`}
                                        title={previewingVoiceId === voice.id && isPlayingPreview ? "Pause Preview" : "Play Preview"}
                                    >
                                        {previewingVoiceId === voice.id && isPlayingPreview ? '⏸' : '▶'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Central Panel: Input & Controls */}
                <div className="lg:col-span-8 bg-white dark:bg-black border-4 border-black dark:border-white comic-shadow p-6 flex flex-col gap-6">

                    {/* Text Input */}
                    <div className="flex-grow flex flex-col">
                        <label className="block text-xs font-mono font-bold uppercase mb-2 text-gray-600 dark:text-gray-400">
                            Enter Text
                        </label>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Type something here to hear it spoken..."
                            className="w-full h-48 p-4 border-2 border-black dark:border-white bg-transparent font-mono text-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
                        />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-100 border-2 border-red-500 text-red-700 p-3 font-mono text-xs font-bold">
                            ERROR: {error}
                        </div>
                    )}
                    {/* Action Buttons */}
                    <div className="flex flex-col gap-6">
                        <button
                            onClick={speak}
                            disabled={isLoading || !text}
                            className={`
                                w-full py-6 px-4 border-4 border-black dark:border-white 
                                font-black uppercase tracking-wider text-xl
                                transition-all duration-150 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                                ${isLoading || !text
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-blue-500 text-white comic-shadow hover:bg-blue-600'}
                            `}
                        >
                            {isLoading ? "Generating..." : "SPEAK NOW"}
                        </button>

                        {/* Audio Player Card */}
                        {audioUrl && (
                            <div className="bg-yellow-400 border-4 border-black p-4 comic-shadow animate-bounce-in">
                                <h3 className="font-black text-black uppercase text-sm mb-2">Audio Generated!</h3>

                                <div className="flex items-center gap-4">
                                    {/* Custom Play Button */}
                                    <button
                                        onClick={() => {
                                            const audio = document.getElementById('generated-audio') as HTMLAudioElement;
                                            if (audio) {
                                                if (audio.paused) {
                                                    audio.play();
                                                } else {
                                                    audio.pause();
                                                }
                                            }
                                        }}
                                        className={`w-12 h-12 flex items-center justify-center border-2 border-white rounded-full transition-transform hover:scale-105 ${isGeneratedAudioPlaying ? 'bg-red-500 text-white' : 'bg-black text-white hover:bg-gray-800'}`}
                                    >
                                        {isGeneratedAudioPlaying ? '⏸' : '▶'}
                                    </button>

                                    <div className="flex-grow h-2 bg-black/10 rounded-full overflow-hidden">
                                        {/* Hidden Audio Element for Logic */}
                                        <audio
                                            id="generated-audio"
                                            src={audioUrl}
                                            autoPlay
                                            className="hidden"
                                            onPlay={() => setIsGeneratedAudioPlaying(true)}
                                            onPause={() => setIsGeneratedAudioPlaying(false)}
                                            onEnded={() => setIsGeneratedAudioPlaying(false)}
                                        />
                                        <div className={`h-full bg-black w-full ${isGeneratedAudioPlaying ? 'animate-pulse' : ''}`}></div>
                                    </div>

                                    <a
                                        href={audioUrl}
                                        download="voiceflow-audio.mp3"
                                        className="px-3 py-1 bg-white border-2 border-black font-bold text-xs hover:bg-gray-100"
                                    >
                                        DOWNLOAD
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
