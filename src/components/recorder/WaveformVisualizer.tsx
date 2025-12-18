import { useRef, useEffect } from 'react';

interface WaveformVisualizerProps {
    analyser: AnalyserNode | null;
    isRecording: boolean;
}

export const WaveformVisualizer = ({ analyser, isRecording }: WaveformVisualizerProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas dimensions
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const draw = () => {
            if (!analyser || !isRecording) {
                // Draw Flat Line
                ctx.clearRect(0, 0, rect.width, rect.height);
                ctx.lineWidth = 3;
                ctx.strokeStyle = '#e5e7eb'; // gray-200
                ctx.beginPath();
                ctx.moveTo(0, rect.height / 2);
                ctx.lineTo(rect.width, rect.height / 2);
                ctx.stroke();

                if (isRecording) {
                    animationRef.current = requestAnimationFrame(draw);
                }
                return;
            }

            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            analyser.getByteTimeDomainData(dataArray);

            ctx.clearRect(0, 0, rect.width, rect.height);
            ctx.lineWidth = 3;
            // Determine color based on system theme (simple check, or use CSS var)
            // Ideally we pass theme in, but let's stick to standard black (dark theme white via mix-blend or props? 
            // Let's us CSS colors.

            // Getting generic computed color from a helper element would be best, but hardcoding for now:
            const isDark = document.documentElement.classList.contains('dark');
            ctx.strokeStyle = isDark ? '#ffffff' : '#000000';

            ctx.beginPath();

            const sliceWidth = rect.width / bufferLength;
            let x = 0;
            const sensitivity = 3.5; // Amplify movement

            for (let i = 0; i < bufferLength; i++) {
                // normalized: -1 to 1 based on offset from 128 (silence)
                const normalized = (dataArray[i] - 128) / 128.0;
                // Apply sensitivity
                const amplified = normalized * sensitivity;

                // Map to canvas height (Center + Offset)
                const y = (rect.height / 2) + (amplified * (rect.height / 2));

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }

                x += sliceWidth;
            }

            ctx.lineTo(rect.width, rect.height / 2);
            ctx.stroke();

            animationRef.current = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [analyser, isRecording]);

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-12 bg-transparent"
        />
    );
};
