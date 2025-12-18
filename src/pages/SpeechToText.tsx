import { AudioRecorder } from "../components/recorder/AudioRecorder";

export const SpeechToText = () => {
    return (
        <div className="flex flex-col items-center justify-center space-y-8">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-black uppercase text-black dark:text-white mb-2">
                    Speech to Text
                </h1>
                <p className="font-mono text-gray-600 dark:text-gray-400">
                    Real-time transcription powered by Deepgram Nova-2
                </p>
            </div>

            <AudioRecorder />
        </div>
    );
};
