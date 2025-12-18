export class DeepgramService {
    private apiKey: string;
    private socket: WebSocket | null = null;
    private onTranscript: (text: string, isFinal: boolean) => void;
    private onStatusChange: (status: string) => void;

    constructor(
        onTranscript: (text: string, isFinal: boolean) => void,
        onStatusChange: (status: string) => void,
        apiKey: string
    ) {
        this.apiKey = apiKey;
        this.onTranscript = onTranscript;
        this.onStatusChange = onStatusChange;
        console.log("Deepgram Service Initialized");
    }

    connect(sampleRate: number, language: string) {
        if (this.socket) return;

        if (!this.apiKey) {
            const errorMsg = "Deepgram API Key is missing in environment variables!";
            console.error(errorMsg);
            this.onStatusChange("Error: Missing API Key");
            alert(errorMsg + " Please restart the terminal/server.");
            return;
        }

        // RAW AUDIO: Linear16 PCM
        // Simplified Logic: We only support English and Hindi now. 
        // both work perfectly with the fast 'nova-2' model.

        const params = `model=nova-2&language=${language}&smart_format=true&interim_results=true&encoding=linear16`;
        const url = `wss://api.deepgram.com/v1/listen?${params}&sample_rate=${sampleRate}`;

        console.log(`Connecting to Deepgram with sample_rate=${sampleRate}...`);
        this.onStatusChange("Connecting...");

        try {
            this.socket = new WebSocket(url, ['token', this.apiKey]);
        } catch (e) {
            console.error("WebSocket creation failed", e);
            this.onStatusChange("Error: Creation Failed");
            return;
        }

        this.socket.onopen = () => {
            console.log('Deepgram WebSocket Connected');
            this.onStatusChange("Connected");
        };

        this.socket.onmessage = (message) => {
            try {
                const received = JSON.parse(message.data);

                if (received.type === 'Metadata') {
                    console.log("Metadata received", received);
                    return;
                }

                const transcript = received.channel?.alternatives[0]?.transcript;

                if (transcript && received.is_final) {
                    // console.log("Final:", transcript);
                    this.onTranscript(transcript, true);
                } else if (transcript) {
                    this.onTranscript(transcript, false);
                }
            } catch (err) {
                console.error("Error parsing Deepgram message", err);
            }
        };

        this.socket.onerror = (error) => {
            console.error('Deepgram WebSocket Error', error);
            this.onStatusChange("Error: WebSocket Failure");
        };

        this.socket.onclose = (event) => {
            console.log('Deepgram WebSocket Closed', event.code, event.reason);
            if (event.code === 1000) {
                this.onStatusChange("Disconnected");
            } else {
                this.onStatusChange(`Closed: ${event.code}`);
            }
            this.socket = null;
        };
    }

    sendAudio(audioData: Blob | ArrayBuffer) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(audioData);
        }
    }

    disconnect() {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
    }
}
