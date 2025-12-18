# VoiceFlow - AI Audio Toolkit

VoiceFlow is a cross-platform application designed to provide seamless speech-to-text and text-to-speech capabilities using the Deepgram API. It is built as a modern web application that can also be compiled into a native desktop application using Tauri.

## Features

- **Real-time Speech to Text:** clear and accurate transcription globally powered by Deepgram's Nova-2 model.
- **Text to Speech:** Generate natural, human-like audio using Deepgram's Aura model.
- **Cross-Platform:** Runs as a standard website or a native Windows desktop application.
- **Privacy First:** The application uses a "Bring Your Own Key" architecture. API keys are stored locally in the user's browser or device and are never sent to our servers.
- **Custom Design System:** Features a unique, high-contrast "Comic" UI style with full Dark Mode support.

## Prerequisites

Before interacting with the codebase, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** (comes with Node.js)
- **Rust** (Required only if building the Desktop App)

## Installation and Setup

### 1. Clone the Repository

Open your terminal or command prompt and run:

```bash
git clone https://github.com/yourusername/voiceflow.git
cd voiceflow
```

### 2. Install Dependencies

Install the necessary JavaScript libraries:

```bash
npm install
```

### 3. Run the Web Application

To start the development server for the web version:

```bash
npm run dev
```

The application will launch at http://localhost:1420.

## Desktop Application (Tauri)

To build or run the application as a native Windows executable, you must have Rust installed and configured on your machine.

### Development Mode

Run the desktop app with hot-reloading:

```bash
npm run tauri dev
```

### Build for Production

To create a standalone installer (.msi or .exe):

```bash
npm run tauri build
```

The installer will be generated in `src-tauri/target/release/bundle/msi/`.

## Architecture & Design Decisions

### Technology Stack
- **Frontend:** React, TypeScript, Vite
- **Styling:** Tailwind CSS (centralized in `index.css`)
- **Desktop Framework:** Tauri (Rust backend)
- **AI Services:** Deepgram API (Nova-2 for STT, Aura for TTS)

### State Management
- **Context API:** Used for global state that rarely changes but is accessed everywhere, specifically the API Key management (`ApiKeyContext`).
- **Custom Hooks:** Business logic is separated from UI components. `useAudioRecorder` manages the WebSocket connection and audio stream, while `useTextToSpeech` handles API requests and audio playback.
- **Local Storage:** User preferences (API Key, Theme) are persisted locally to ensure a seamless experience across reloads.

### Audio Handling
- **WebSockets:** We use WebSockets for Speech-to-Text to ensure low-latency, real-time transcription.
- **Native Audio APIs:** The app utilizes the browser's `AudioContext` and `MediaRecorder` APIs for high-fidelity audio capture without external dependencies.
- **Optimization:** Voice previews in the TTS section are cached locally (MP3 files) to prevent unnecessary API usage and reduce latency.

## Known Limitations

1. **Internet Connection:** The application relies on the Deepgram API for processing, meaning it requires an active internet connection to function. Offline models are not currently supported.
2. **Browser Permissions:** When running as a web app, users must explicitly grant microphone permissions. In the desktop version, these permissions are handled natively by the OS.
3. **API Key Requirement:** To use the features, a valid Deepgram API key is required. This is a design choice to allow for a serverless, privacy-focused deployment.

## Contact

For support or inquiries, please visit the Contact page within the application or check the repository at GitHub.
