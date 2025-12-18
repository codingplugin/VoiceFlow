import { Link } from 'react-router-dom';

export const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center space-y-24 py-12">

            {/* Hero Section */}
            <div className="text-center space-y-6 max-w-2xl bg-white dark:bg-black p-8 border-4 border-black dark:border-gray-600 comic-shadow transform rotate-1">
                <h1 className="text-6xl font-black uppercase text-black dark:text-white tracking-tighter transform -skew-x-6">
                    VoiceFlow
                </h1>
                <p className="font-mono text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    An advanced AI-powered audio suite for seamless communication.
                    Experience real-time, high-accuracy transcription and generate natural,
                    human-like speech instantly. Precision engineering for the modern web.
                </p>
                <div className="pt-4 flex justify-center gap-4">
                    <span className="inline-block px-3 py-1 bg-yellow-400 text-black font-bold border-2 border-black text-xs uppercase transform -rotate-2">
                        Fast
                    </span>
                    <span className="inline-block px-3 py-1 bg-blue-400 text-black font-bold border-2 border-black text-xs uppercase transform rotate-2">
                        Secure
                    </span>
                    <span className="inline-block px-3 py-1 bg-red-400 text-black font-bold border-2 border-black text-xs uppercase transform -rotate-1">
                        AI Powered
                    </span>
                </div>

                {/* Download Link */}
                <div className="pt-8">
                    <a
                        href="/downloads/VoiceFlow-Setup.exe"
                        download
                        className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-black border-4 border-black font-black uppercase tracking-wider py-3 px-6 text-lg transition-transform hover:-translate-y-1 comic-shadow"
                    >
                        <span>💾</span>
                        Download for Windows (x64)
                    </a>
                    <p className="text-xs font-mono mt-2 text-gray-500">v0.1.0 • Standalone Installer</p>
                </div>
            </div>

            {/* Quick Links / "Tools" Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">

                {/* STT Card */}
                <Link to="/speech-to-text" className="group">
                    <div className="bg-white dark:bg-gray-900 border-4 border-black dark:border-gray-600 p-8 h-full transition-all duration-200 group-hover:-translate-y-2 group-hover:comic-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-black uppercase text-black dark:text-white">Speech to Text</h2>
                            <div className="w-10 h-10 bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-bold text-xl rounded-full">
                                🎤
                            </div>
                        </div>
                        <p className="font-mono text-sm text-gray-600 dark:text-gray-400 mb-6">
                            Convert your spoken words into text in real-time. Supports English and Hindi with live waveform visualization.
                        </p>
                        <span className="inline-block font-bold underline decoration-4 decoration-yellow-400 underline-offset-4 group-hover:decoration-black dark:group-hover:decoration-white transition-all">
                            TRY IT NOW &rarr;
                        </span>
                    </div>
                </Link>

                {/* TTS Card */}
                <Link to="/text-to-speech" className="group">
                    <div className="bg-white dark:bg-gray-900 border-4 border-black dark:border-gray-600 p-8 h-full transition-all duration-200 group-hover:-translate-y-2 group-hover:comic-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-black uppercase text-black dark:text-white">Text to Speech</h2>
                            <div className="w-10 h-10 bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-bold text-xl rounded-full">
                                🗣️
                            </div>
                        </div>
                        <p className="font-mono text-sm text-gray-600 dark:text-gray-400 mb-6">
                            Generate high-quality, human-like AI speech from your text. Choose from multiple voices and listen instantly.
                        </p>
                        <span className="inline-block font-bold underline decoration-4 decoration-blue-400 underline-offset-4 group-hover:decoration-black dark:group-hover:decoration-white transition-all">
                            TRY IT NOW &rarr;
                        </span>
                    </div>
                </Link>

            </div>

            {/* How It Works Section */}
            <div className="w-full max-w-4xl space-y-8">
                <div className="text-center">
                    <h2 className="text-4xl font-black uppercase text-black dark:text-white mb-2 transform -skew-x-3">
                        How It Works
                    </h2>
                    <div className="h-2 w-24 bg-black dark:bg-white mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Step 1 */}
                    <div className="relative group">
                        <div className="absolute -inset-2 bg-yellow-400 opacity-20 group-hover:opacity-100 transition-opacity duration-300 transform rotate-2 border-2 border-black"></div>
                        <div className="relative bg-white dark:bg-black border-2 border-black dark:border-gray-600 p-6 h-full flex flex-col items-center text-center">
                            <div className="text-6xl mb-4 transform transition-transform group-hover:scale-110 duration-200">🎙️</div>
                            <h3 className="font-bold text-xl uppercase mb-2">Input</h3>
                            <p className="text-sm font-mono text-gray-600 dark:text-gray-400">
                                Capture high-fidelity audio or enter text directly into our secure interface.
                            </p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="relative group">
                        <div className="absolute -inset-2 bg-blue-400 opacity-20 group-hover:opacity-100 transition-opacity duration-300 transform -rotate-1 border-2 border-black"></div>
                        <div className="relative bg-white dark:bg-black border-2 border-black dark:border-gray-600 p-6 h-full flex flex-col items-center text-center">
                            <div className="text-6xl mb-4 transform transition-transform group-hover:scale-110 duration-200">⚡</div>
                            <h3 className="font-bold text-xl uppercase mb-2">Process</h3>
                            <p className="text-sm font-mono text-gray-600 dark:text-gray-400">
                                Deepgram's Nova-2 & Aura models analyze data with lightning-fast AI precision.
                            </p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="relative group">
                        <div className="absolute -inset-2 bg-red-400 opacity-20 group-hover:opacity-100 transition-opacity duration-300 transform rotate-1 border-2 border-black"></div>
                        <div className="relative bg-white dark:bg-black border-2 border-black dark:border-gray-600 p-6 h-full flex flex-col items-center text-center">
                            <div className="text-6xl mb-4 transform transition-transform group-hover:scale-110 duration-200">🔊</div>
                            <h3 className="font-bold text-xl uppercase mb-2">Output</h3>
                            <p className="text-sm font-mono text-gray-600 dark:text-gray-400">
                                Receive instant transcripts or stream lifelike speech synthesis immediately.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Architecture / Under the Hood */}
            <div className="w-full max-w-4xl bg-black dark:bg-gray-900 text-white dark:text-gray-100 p-8 border-4 border-black dark:border-gray-600 comic-shadow relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-9xl transform rotate-12 select-none group-hover:scale-110 transition-transform duration-500">
                    AI
                </div>

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h2 className="text-3xl font-black uppercase mb-4 decoration-wavy underline decoration-yellow-400 underline-offset-4">
                            Powered by Deepgram
                        </h2>
                        <p className="font-mono text-sm leading-relaxed mb-4 opacity-90">
                            VoiceFlow harnesses the raw power of <strong>Deepgram's API</strong>.
                            We utilize the <span className="text-yellow-400 dark:text-blue-600 font-bold">Nova-2 Model</span> for
                            industry-leading speech-to-text accuracy and the <span className="text-yellow-400 dark:text-blue-600 font-bold">Aura Model</span> for
                            human-level voice synthesis.
                        </p>
                        <ul className="text-xs font-bold font-mono space-y-2">
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                <span className="uppercase">WebSocket Interpretation</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                <span className="uppercase">Sub-200ms Latency</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                <span className="uppercase">End-to-End Encryption</span>
                            </li>
                        </ul>
                    </div>

                    {/* Visual representation of code/api */}
                    <div className="bg-gray-800 dark:bg-gray-100 p-4 rounded border-2 border-white dark:border-black font-mono text-xs">
                        <div className="flex gap-1.5 mb-3 border-b border-gray-600 dark:border-gray-300 pb-2">
                            <div className="w-2 h-2 rounded-full bg-red-400"></div>
                            <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                            <div className="w-2 h-2 rounded-full bg-green-400"></div>
                        </div>
                        <div className="space-y-1 text-green-400 dark:text-green-700">
                            <p><span className="text-purple-400 dark:text-purple-700">const</span> <span className="text-blue-400 dark:text-blue-700">connection</span> = deepgram.listen.live({`{`}</p>
                            <p className="pl-4">model: <span className="text-yellow-300 dark:text-orange-600">'nova-2'</span>,</p>
                            <p className="pl-4">smart_format: <span className="text-orange-400 dark:text-red-600">true</span>,</p>
                            <p className="pl-4">interim_results: <span className="text-orange-400 dark:text-red-600">true</span></p>
                            <p>{`}`});</p>
                            <p className="mt-2 opacity-50">// Connection Established...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
