import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from "./layout/Layout";
import { Home } from "./pages/Home";
import { SpeechToText } from "./pages/SpeechToText";
import { TextToSpeech } from "./pages/TextToSpeech";
import { Privacy } from "./pages/Privacy";
import { Terms } from "./pages/Terms";
import { Contact } from "./pages/Contact";

import { ApiKeyProvider } from "./contexts/ApiKeyContext";


function App() {
  return (
    <ApiKeyProvider>

      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/speech-to-text" element={<SpeechToText />} />
            <Route path="/text-to-speech" element={<TextToSpeech />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Layout>
      </Router>
    </ApiKeyProvider>
  );
}

export default App;
